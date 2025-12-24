// // app/libs/analytics.ts
// import prisma from "@/app/libs/prisma";

// /**
//  * Accepts optional date range { from?: Date, to?: Date }
//  * Returns base metrics and lists for charts
//  */

// export type DateRange = { from?: Date | null; to?: Date | null };

// function normalizeRange(range?: DateRange) {
//   // If not provided, return undefineds
//   if (!range) return {};
//   const { from, to } = range;
//   return {
//     from: from ?? null,
//     to: to ?? null,
//   };
// }

// export async function getSummaryCounts(range?: DateRange) {
//   const { from, to } = normalizeRange(range);

//   // count orders by status
//   const statuses = await prisma.$queryRaw<
//     { status: string; count: bigint }[]
//   >`SELECT status, COUNT(*) as count FROM \`Order\`
//     ${from ? prisma.sql`WHERE createdAt >= ${from}` : prisma.sql``}
//     ${to ? prisma.sql`${from ? prisma.sql`AND` : prisma.sql`WHERE`} createdAt <= ${to}` : prisma.sql``}
//     GROUP BY status`;

//   // map statuses
//   const mapCounts: Record<string, number> = {};
//   statuses.forEach((r) => (mapCounts[r.status] = Number(r.count)));

//   const totalOrders = await prisma.order.count({
//     where: {
//       ...(from ? { createdAt: { gte: from } } : {}),
//       ...(to ? { createdAt: { lte: to } } : {}),
//     },
//   });

//   const totalCustomers = await prisma.customer.count({
//     where: {
//       ...(from ? { createdAt: { gte: from } } : {}),
//       ...(to ? { createdAt: { lte: to } } : {}),
//     },
//   });

//   return {
//     totalOrders,
//     totalCustomers,
//     pendingOrders: mapCounts["PENDING"] ?? 0,
//     confirmedOrders: mapCounts["CONFIRMED"] ?? 0,
//     dispatchOrders: mapCounts["DISPATCHED"] ?? 0,
//     cancelledOrders: mapCounts["CANCELLED"] ?? 0,
//     deliveredOrders: mapCounts["DELIVERED"] ?? 0,
//   };
// }

// /** Product orders: counts by productId (uses OrderItem table) */
// export async function getProductOrders(range?: DateRange) {
//   const { from, to } = normalizeRange(range);

//   // aggregate by productId and name (OrderItem stores name and productId)
//   const rows = await prisma.$queryRaw<
//     { productId: string; name: string; totalQty: bigint }[]
//   >`SELECT productId, name, SUM(qty) as totalQty
//     FROM OrderItem oi
//     JOIN \`Order\` o ON oi.orderId = o.id
//     ${from ? prisma.sql`WHERE o.createdAt >= ${from}` : prisma.sql``}
//     ${to ? prisma.sql`${from ? prisma.sql`AND` : prisma.sql`WHERE`} o.createdAt <= ${to}` : prisma.sql``}
//     GROUP BY productId, name
//     ORDER BY totalQty DESC
//     LIMIT 20;`;

//   return rows.map((r) => ({ productId: r.productId, name: r.name, totalQty: Number(r.totalQty) }));
// }

// /** Orders by city (demographics) */
// export async function getOrdersByCity(range?: DateRange) {
//   const { from, to } = normalizeRange(range);

//   const rows = await prisma.$queryRaw<
//     { city: string; cnt: bigint }[]
//   >`SELECT c.city, COUNT(*) as cnt
//     FROM \`Order\` o
//     JOIN Customer c ON o.customerId = c.id
//     ${from ? prisma.sql`WHERE o.createdAt >= ${from}` : prisma.sql``}
//     ${to ? prisma.sql`${from ? prisma.sql`AND` : prisma.sql`WHERE`} o.createdAt <= ${to}` : prisma.sql``}
//     GROUP BY c.city
//     ORDER BY cnt DESC
//     LIMIT 20;`;

//   return rows.map((r) => ({ city: r.city || "Unknown", count: Number(r.cnt) }));
// }

// /** Sales analytics - amounts by status and logistic payouts */
// export async function getSalesAnalytics(range?: DateRange) {
//   const { from, to } = normalizeRange(range);

//   // total sales by status (sum totalPayable)
//   const statusRows = await prisma.$queryRaw<
//     { status: string; sumAmount: number | null }[]
//   >`SELECT status, SUM(totalPayable) as sumAmount
//     FROM \`Order\` o
//     ${from ? prisma.sql`WHERE o.createdAt >= ${from}` : prisma.sql``}
//     ${to ? prisma.sql`${from ? prisma.sql`AND` : prisma.sql`WHERE`} o.createdAt <= ${to}` : prisma.sql``}
//     GROUP BY status;`;

//   const byStatus: Record<string, number> = {};
//   statusRows.forEach((r: any) => (byStatus[r.status] = Number(r.sumAmount ?? 0)));

//   // logistic payouts: sum of logisticPrice (amount paid to partner) and cash to collect from partner?
//   // Assuming logisticPrice = partnerDeliveryCost paid by you to partner, and paymentMethod COD implies partner collects cash?
//   // We'll compute:
//   // - logisticPayoutTotal = SUM(logisticPrice)
//   // - cashToCollectFromPartner = SUM(totalPayable WHERE paymentMethod='COD') - but depends on business rules
//   // We'll compute basic metrics; adjust business logic as needed.

//   const logisticRow = await prisma.$queryRaw<{ sumLogistic: number | null }[]>`SELECT SUM(logisticPrice) as sumLogistic FROM \`Order\`
//     ${from ? prisma.sql`WHERE createdAt >= ${from}` : prisma.sql``}
//     ${to ? prisma.sql`${from ? prisma.sql`AND` : prisma.sql`WHERE`} createdAt <= ${to}` : prisma.sql``};`;

//   const logisticPayoutTotal = Number((logisticRow[0] && (logisticRow[0] as any).sumLogistic) ?? 0);

//   // cash that delivery partner should give you (e.g., COD orders - partner EPS)
//   const codRow = await prisma.$queryRaw<{ sumCod: number | null }[]>`SELECT SUM(totalPayable) as sumCod FROM \`Order\` WHERE paymentMethod = 'COD'
//     ${from ? prisma.sql`AND createdAt >= ${from}` : prisma.sql``}
//     ${to ? prisma.sql`${from ? prisma.sql`AND` : prisma.sql`AND`} createdAt <= ${to}` : prisma.sql``};`;

//   const codTotal = Number((codRow[0] && (codRow[0] as any).sumCod) ?? 0);

//   // total sales
//   const totalRow = await prisma.$queryRaw<{ sumTotal: number | null }[]>`SELECT SUM(totalPayable) as sumTotal FROM \`Order\`
//     ${from ? prisma.sql`WHERE createdAt >= ${from}` : prisma.sql``}
//     ${to ? prisma.sql`${from ? prisma.sql`AND` : prisma.sql`WHERE`} createdAt <= ${to}` : prisma.sql``};`;

//   const totalSales = Number((totalRow[0] && (totalRow[0] as any).sumTotal) ?? 0);

//   return {
//     byStatus,
//     logisticPayoutTotal,
//     codTotal,
//     totalSales,
//   };
// }

// /** Recent orders list */
// export async function getRecentOrders(limit = 50) {
//   const orders = await prisma.order.findMany({
//     orderBy: { createdAt: "desc" },
//     take: limit,
//     include: { customer: true, items: true },
//   });
//   return orders;
// }


// app/libs/analytics.ts
import prisma from "@/app/libs/prisma";
import { DUO_BUNDLE, OUT_OF_CITY_LOGISTIC_1KG_FEE, OUT_OF_CITY_LOGISTIC_OVERHEAD_PERKG_FEE, SAME_CITY_LOGISTIC_1KG_FEE, SAME_CITY_LOGISTIC_OVERHEAD_PERKG_FEE, SINGLE_PRODUCT, TRIO_BUNDLE } from "../constants/main";

export type DateRange = { from?: Date | null; to?: Date | null };

function buildDateWhere(from?: Date | null, to?: Date | null) {
  let where = " ";
  const params: any[] = [];

  if (from) {
    where += "WHERE createdAt >= ? ";
    params.push(from);
  }
  if (to) {
    if (from) {
      where += "AND createdAt <= ? ";
    } else {
      where += "WHERE createdAt <= ? ";
    }
    params.push(to);
  }

  return { where, params };
}

export async function getSummaryCounts(range?: DateRange) {
  const from = range?.from || null;
  const to = range?.to || null;
  const { where, params } = buildDateWhere(from, to);

  const statuses = await prisma.$queryRawUnsafe<
    { status: string; count: number }[]
  >(`SELECT status, COUNT(*) as count FROM \`Order\` ${where} GROUP BY status`, ...params);

  const mapCounts: Record<string, number> = {};
  statuses.forEach((r) => (mapCounts[r.status] = Number(r.count)));

  const totalOrders = await prisma.order.count({
    where: {
      ...(from ? { createdAt: { gte: from } } : {}),
      ...(to ? { createdAt: { lte: to } } : {}),
    },
  });

  const totalCustomers = await prisma.customer.count({
    where: {
      ...(from ? { createdAt: { gte: from } } : {}),
      ...(to ? { createdAt: { lte: to } } : {}),
    },
  });

  return {
    totalOrders,
    totalCustomers,
    pendingOrders: mapCounts["PENDING"] ?? 0,
    confirmedOrders: mapCounts["CONFIRMED"] ?? 0,
    dispatchOrders: mapCounts["DISPATCHED"] ?? 0,
    cancelledOrders: mapCounts["CANCELLED"] ?? 0,
    deliveredOrders: mapCounts["DELIVERED"] ?? 0,
  };
}


export async function getProductOrders(range?: DateRange) {
  const from = range?.from || null;
  const to = range?.to || null;
  const { where, params } = buildDateWhere(from, to);

  const rows = await prisma.$queryRawUnsafe<
    { productId: string; name: string; totalQty: number }[]
  >(
    `SELECT oi.productId, oi.name, SUM(oi.qty) as totalQty
     FROM OrderItem oi
     JOIN \`Order\` o ON oi.orderId = o.id
     ${where}
     GROUP BY oi.productId, oi.name
     ORDER BY totalQty DESC
     LIMIT 20`,
    ...params
  );

  return rows.map((r) => ({
    productId: r.productId,
    name: r.name,
    totalQty: Number(r.totalQty),
  }));
}


export async function getOrdersByCity(range?: DateRange) {
  const from = range?.from || null;
  const to = range?.to || null;
  const { where, params } = buildDateWhere(from, to);

  const rows = await prisma.$queryRawUnsafe<
    { city: string; cnt: number }[]
  >(
    `SELECT c.city, COUNT(*) as cnt
     FROM \`Order\` o
     JOIN Customer c ON o.customerId = c.id
     ${where}
     GROUP BY c.city
     ORDER BY cnt DESC
     LIMIT 20`,
    ...params
  );

  return rows.map((r) => ({
    city: r.city || "Unknown",
    count: Number(r.cnt),
  }));
}


export async function getSalesAnalytics(range?: DateRange) {
  const from = range?.from || null;
  const to = range?.to || null;
  const { where, params } = buildDateWhere(from, to);

  const statusRows = await prisma.$queryRawUnsafe<
    { status: string; sumAmount: number }[]
  >(
    `SELECT status, SUM(totalPayable) as sumAmount
     FROM \`Order\` o
     ${where}
     GROUP BY status`,
    ...params
  );

  const byStatus: Record<string, number> = {};
  statusRows.forEach((r) => (byStatus[r.status] = Number(r.sumAmount || 0)));

  const logistic = await prisma.$queryRawUnsafe<
    { sumLogistic: number }[]
  >(
    `SELECT SUM(logisticPrice) as sumLogistic FROM \`Order\` ${where}`,
    ...params
  );

  const logisticPayoutTotal = Number(logistic[0]?.sumLogistic || 0);

  const cod = await prisma.$queryRawUnsafe<
    { sumCod: number }[]
  >(
    `SELECT SUM(totalPayable) as sumCod FROM \`Order\`
     WHERE paymentMethod='COD'
     ${from ? "AND createdAt >= ?" : ""}
     ${to ? "AND createdAt <= ?" : ""}`,
    ...(from ? [from] : []),
    ...(to ? [to] : [])
  );

  const codTotal = Number(cod[0]?.sumCod || 0);

  const totalSalesRow = await prisma.$queryRawUnsafe<
    { sumTotal: number }[]
  >(
    `SELECT SUM(totalPayable) as sumTotal FROM \`Order\` ${where}`,
    ...params
  );

  const totalSales = Number(totalSalesRow[0]?.sumTotal || 0);

  return {
    byStatus,
    logisticPayoutTotal,
    codTotal,
    totalSales,
  };
}


export async function getRecentOrders(limit = 50) {
  return prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    include: { customer: true, items: true },
  });
}


export function getProductWeight(productId: string) {
  switch (productId) {
    case SINGLE_PRODUCT:
      return 250; // grams
    case DUO_BUNDLE:
      return 500;
    case TRIO_BUNDLE:
      return 750;
    default:
      return 250;
  }
}


export function calculateTotalOrderWeight(items) {
  let total = 0;

  for (const item of items) {
    const w = getProductWeight(item.name);
    total += w * item.qty;
  }

  return total; // grams
}


export function gramsToKg(totalGrams: number) {
  return Math.ceil(totalGrams / 1000);
}


// export function calculateLogisticPrice(weightKg: number, city: string) {
//   const isSameCity = city.trim().toLowerCase() === "karachi";

//   if (isSameCity) {
//     // Same City
//     if (weightKg <= 1) return SAME_CITY_LOGISTIC_1KG_FEE;
//     return SAME_CITY_LOGISTIC_1KG_FEE + (weightKg - 1) * SAME_CITY_LOGISTIC_OVERHEAD_PERKG_FEE;
//   } else {
//     // Out of city (Overnight)
//     if (weightKg <= 1) return OUT_OF_CITY_LOGISTIC_1KG_FEE;
//     return 250 + (weightKg - 1) * OUT_OF_CITY_LOGISTIC_OVERHEAD_PERKG_FEE;
//   }
// }


export function calculateLogisticPrice(items:any, city:string) {
  let totalWeight = 0;

  for (const item of items) {
    let weight = 0;

    if (item.name === SINGLE_PRODUCT) weight = 250;  //250gm is the weight of single box
    if (item.name === DUO_BUNDLE) weight = 500;
    if (item.name === TRIO_BUNDLE) weight = 750;

    totalWeight += weight * item.qty;
  }

  const totalKg = Math.ceil(totalWeight / 1000); // convert to KG and round up


  // SAME CITY (Karachi)
  if (city.toLowerCase() === "karachi") {
    const firstKg = 160;
    const additional = 70;

    if (totalKg <= 1) return firstKg;

    return firstKg + (totalKg - 1) * additional;
  }

  // OUT OF CITY (OVERNIGHT)
  const firstKgON = 250;
  const additionalON = 130;

  if (totalKg <= 1) return firstKgON;

  return firstKgON + (totalKg - 1) * additionalON;
}

