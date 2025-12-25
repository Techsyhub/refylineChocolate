import OrderTable from "@/app/components/dashboard/OrderTable";
import { getRecentOrders } from "@/app/libs/analytics";

export default async function OrdersList() {
  // Fetch orders from DB
  const recentOrders = await getRecentOrders(50);

  return <OrderTable initialOrders={recentOrders} />;
}
