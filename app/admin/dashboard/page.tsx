// import prisma from "@/app/libs/prisma";
// // import Analytics from "@/app/components/dashboard/AnalyticsOld";
// import OrderTable from "@/app/components/dashboard/OrderTable";
// import Analytics from "@/app/components/dashboard/analytics/AnalyticsSummary";
// import CityChart from "@/app/components/dashboard/analytics/CityChart";

// export default async function Dashboard() {
//   // Fetch analytics
//   const totalOrders = await prisma.order.count();
//   const totalCustomers = await prisma.customer.count();
//   const pendingOrders = await prisma.order.count({ where: { status: "PENDING" } });
//   const confirmedOrders = await prisma.order.count({ where: { status: "CONFIRMED" } });
//   const dispatchOrders = await prisma.order.count({ where: { status: "DISPATCHED" } });
//   const deliveredOrders = await prisma.order.count({ where: { status: "DELIVERED" } });
//   const cancelledOrders = await prisma.order.count({ where: { status: "CANCELLED" } });

//   // Fetch recent orders
//   const recentOrders = await prisma.order.findMany({
//     orderBy: { createdAt: "desc" },
//     take: 10,
//     include: { customer: true, items: true },
//   });

//   return (
//     <div className="p-6 space-y-6">
//       {/* <h1 className="text-2xl font-bold">Admin Dashboard</h1> */}

//       <Analytics
//         totalOrders={totalOrders}
//         totalCustomers={totalCustomers}
//         pendingOrders={pendingOrders}
//         confirmedOrders={confirmedOrders}
//         dispatchOrders= {dispatchOrders}
//         deliveredOrders= {deliveredOrders}
//         cancelledOrders = {cancelledOrders}
//       />


//       <OrderTable orders={recentOrders} />
//     </div>
//   );
// }



// app/admin/dashboard/page.tsx

import AnalyticsCards from "@/app/components/dashboard/analytics/AnalyticsCards";
import ProductChart from "@/app/components/dashboard/analytics/ProductChart";
import CityChart from "@/app/components/dashboard/analytics/CityChart";
import SalesSummary from "@/app/components/dashboard/analytics/SalesSummary";
import OrdersTable from "@/app/components/dashboard/OrderTable";
import { getSummaryCounts, getProductOrders, getOrdersByCity, getSalesAnalytics, getRecentOrders } from "@/app/libs/analytics";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: { from?: string; to?: string };
}) {
  // parse optional date range from query
  const from = searchParams?.from ? new Date(searchParams.from) : undefined;
  const to = searchParams?.to ? new Date(searchParams.to) : undefined;
  const range = { from, to };

  const [
    summary,
    products,
    cities,
    sales,
    recentOrders
  ] = await Promise.all([
    getSummaryCounts(range),
    getProductOrders(range),
    getOrdersByCity(range),
    getSalesAnalytics(range),
    getRecentOrders(20)
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <AnalyticsCards {...summary} />
 <div className="bg-white p-4 mt-4 rounded shadow">
          <h2 className="font-semibold mb-4">Sales Summary</h2>
          <SalesSummary metrics={sales} />
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="col-span-2 bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-4">Top Products (orders)</h2>
          <ProductChart data={products} />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-4">Orders by City</h2>
          <CityChart data={cities} />
        </div>
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6"> */}
       

        <div className="bg-white p-4 rounded shadow">
          {/* <h2 className="font-semibold mb-4">Recent Orders</h2> */}
          <OrdersTable orders={recentOrders} />
        </div>
      {/* </div> */}
    </div>
  );
}
