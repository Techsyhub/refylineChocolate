import prisma from "@/app/libs/prisma";

interface OrderDetailProps {
  params: { id: string };
}

export default async function OrderDetail({ params }: OrderDetailProps) {
  const order = await prisma.order.findUnique({
    where: { id: Number(params.id) },
    include: { customer: true, items: true, statusTimeline: true },
  });

  if (!order) return <p>Order not found</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Order #{order.id}</h1>
      <h2 className="font-semibold">Customer: {order.customer.fullName}</h2>
      <h3>Total: {order.totalPayable}</h3>
      <h3>Status: {order.status}</h3>

      <div className="mt-4">
        <h3 className="font-semibold">Items</h3>
        <ul>
          {order.items.map((item) => (
            <li key={item.id}>
              {item.name} - {item.qty} x {item.sellingPrice}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">Update Order Status / Logistic Info</h3>
        {/* You can add a form here to update order status & logistic details */}
      </div>
    </div>
  );
}
