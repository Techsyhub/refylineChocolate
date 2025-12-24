// app/api/admin/orders/route.ts
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = Number(url.searchParams.get("page") || "1");
    const limit = Number(url.searchParams.get("limit") || "20");
    const q = url.searchParams.get("q") || "";
    const status = url.searchParams.get("status") || "";
    const city = url.searchParams.get("city") || "";

    const where: any = {};
    if (q) {
      where.OR = [
        { trackingId: { contains: q } },
        { customer: { fullName: { contains: q } } },
        { customer: { phone: { contains: q } } },
      ];
    }
    if (status) where.status = status;
    if (city) where.customer = { city };

    const [total, orders] = await Promise.all([
      prisma.order.count({ where }),
      prisma.order.findMany({
        where,
        include: { customer: true, items: true },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    return NextResponse.json({ success: true, data: { total, page, limit, orders } });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 });
  }
}
