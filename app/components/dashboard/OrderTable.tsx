"use client";
import { DUO_BUNDLE, SINGLE_PRODUCT, TRIO_BUNDLE } from "@/app/constants/main";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Order } from "@prisma/client";
import EditOrderDrawer from "./EditOrderDrawer"; // drawer component we'll create
import { format } from "date-fns";

type OrderWithRelations = Order & { customer: any; status:string; items: any[] };

interface OrderTableProps {
  orders: any[];
}

 export default function OrdersTable({ initialOrders }: { initialOrders: OrderWithRelations[] }) {

    const [orders, setOrders] = useState<OrderWithRelations[]>(initialOrders || []);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [total, setTotal] = useState<number | null>(null);

  const [editingOrder, setEditingOrder] = useState<OrderWithRelations | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  async function load(pageToLoad = 1) {
    try {
      const params = new URLSearchParams();
      params.set("page", String(pageToLoad));
      params.set("limit", String(limit));
      if (query) params.set("q", query);
      if (statusFilter) params.set("status", statusFilter);
      const res = await fetch(`/api/orders?${params.toString()}`);
      const body = await res.json();
      if (body.success) {
        setOrders(body.data.orders);
        setTotal(body.data.total);
        setPage(body.data.page);
      } else {
        toast.error("Failed to load orders");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error");
    }
  }

  useEffect(() => {
    // initial load client-side
    if (!initialOrders) load();
    else setOrders(initialOrders);
  }, []);

  // search / filters
  useEffect(() => {
    const t = setTimeout(() => load(1), 400);
    return () => clearTimeout(t);
  }, [query, statusFilter]);

  const openEdit = (order: OrderWithRelations) => {
    console.log("order", order)
    setEditingOrder(order);
    setDrawerOpen(true);
  };

  // const onSave = (updatedOrder: OrderWithRelations) => {
  //   // replace in local state
  //   console.log("orders======", orders);
  //   console.log("updated order=====", updatedOrder)
  //   setOrders(prev => prev.map(o => (o.id === updatedOrder.id ? {
  //     ...o,  
  //     trackingId: updatedOrder.trackingId,
  //     logisticPartner: updatedOrder.logisticPartner,
  //     status: updatedOrder.status
  //   } : o)));
  //   setDrawerOpen(false);
  //   toast.success("Order updated");
  // };
 
 const onSave = async (updatedOrder: OrderWithRelations) => {
  try {
    // Call API to update order in DB
    const res = await fetch("/api/orders/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: updatedOrder.id,
        status: updatedOrder.status,
        trackingId: updatedOrder.trackingId,
        logisticPartner: updatedOrder.logisticPartner,
        logisticPrice: updatedOrder.logisticPrice, // only if you use it
      }),
    });

    const data = await res.json();

    if (!data.success) {
      toast.error(data.error || "Update failed");
      return;
    }

    const freshOrder = data.order; // ⬅ backend se fresh updated order

    // Update local state
    setOrders(prev =>
      prev.map(o =>
        o.id === freshOrder.id
          ? { ...o, ...freshOrder }
          : o
      )
    );

    toast.success("Order updated");
    setDrawerOpen(false);

  } catch (error) {
    console.log("Order update error:", error);
    toast.error("Update failed");
  }
};


  return (
    <>
   
     <h1 className="text-2xl font-bold">Recent Orders</h1>

     <div>
       <div className="flex gap-2 items-center mb-4">
         <input
           placeholder="Search by tracking, customer, phone..."
           value={query}
           onChange={(e) => setQuery(e.target.value)}
           className="border px-3 py-2 rounded w-80"
         />
         <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border px-3 py-2 rounded">
           <option value="">All statuses</option>
           <option value="PENDING">Pending</option>
           <option value="CONFIRMED">Confirmed</option>
           <option value="DISPATCHED">Dispatched</option>
           <option value="IN_TRANSIT">In Transit</option>
           <option value="DELIVERED">Delivered</option>
           <option value="CANCELLED">Cancelled</option>
         </select>
         <button onClick={() => load(1)} className="px-3 py-2 bg-blue-600 text-white rounded">Refresh</button>
       </div>

       {/* table */}
       <div className="overflow-x-auto">
         <table className="min-w-full border">
           <thead className="bg-gray-100">
             <tr>
               <th className="p-2 border">S.NO</th>
                 <th className="p-2 border">Order ID</th>
               <th className="p-2 border">Tracking ID</th>
               <th className="p-2 border">Customer</th>
               <th className="p-2 border">Phone</th>
               <th className="p-2 border">Items</th>    
                <th className="p-2 border">Notes</th>    
               <th className="p-2 border">Qty</th>
               <th className="p-2 border">Total Product Bill</th>
               <th className="p-2 border">Delivery Discount</th>
               <th className="p-2 border">City</th>
               <th className="p-2 border">Delivery Address</th>
               <th className="p-2 border">Logistic Partner</th>
               <th className="p-2 border">Logistic Delivery Fee</th>
                 <th className="p-2 border">Total Bill After Adding Logistic Standard Fee (250 PKR)</th>
               <th className="p-2 border">Payment Method</th>
               <th className="p-2 border">Logistic Fee</th>
               <th className="p-2 border">Status</th>
               <th className="p-2 border">Actions</th>
             </tr>
           </thead>
           <tbody>
             {orders.map((order,index) => {
               let totalQty = 0;
              // let totalQty = order.items.reduce((s, it: any) => s + (it.qty ?? 0), 0);
               return (
                 <tr key={order.id} className="text-center">
                   <td className="p-2 border">{index + 1}</td>
                   <td className="p-2 border">{order.orderNumber}</td>
                   <td className="p-2 border">{order.trackingId || "—"}</td>
                   <td className="p-2 border">{order.customer?.fullName}</td>
                   <td className="p-2 border">{order.customer?.phone}</td>
                 
                  <td className="p-2 w-60 border text-left">{order.items.map((item, index)=>{
                 
                 if(item.name === SINGLE_PRODUCT){
                  totalQty = totalQty+ item.qty
                 }else if(item.name === DUO_BUNDLE){
                  totalQty = totalQty + (item.qty * 2)
                 }else if(item.name === TRIO_BUNDLE){
                  totalQty = totalQty + (item.qty * 3)
                 }
               return (
              <div key={index+item.name}>
                <div className="text-sm  text-left flex items-center justify-between">
                  <p>{item.name}</p>    <p><span className="font-bold text-lg">{item.qty}</span> {item.name === DUO_BUNDLE?"x 2": item.name === TRIO_BUNDLE? "x 3": ""}</p>
                </div>           
              </div>
               
               
              )
              })}</td>
                   <td className="p-2 border">{order.note}</td>
                   <td className="p-2 border">{totalQty}</td>
                 <td className="p-2 border">{order.totalPayable}</td>
                <td className="p-2 border">{order.deliveryDiscount} PKR</td>
                <td className="p-2 border">{order.customer.city}</td>

              <td className="p-2 border">{order.customer.address}</td>
               <td className="p-2 border">{order.logisticPartner || "not assigned"}</td>
                <td className="p-2 border">{250-order.deliveryDiscount }</td>
                 <td className="p-2 border">{order.totalPayable +250-order.deliveryDiscount } PKR </td>
                   <td className="p-2 border">{order.paymentMethod}</td>
                   <td className="p-2 border">{order.logisticPrice ?? "—"} PKR</td>
                   <td className="p-2 border">{order.status}</td>
                   <td className="p-2 border">
                     <button className="px-2 py-1 mr-2 bg-yellow-500 text-white rounded" onClick={() => openEdit(order)}>Edit</button>
                     <button
                       className="px-2 py-1 bg-green-600 text-white rounded"
                       onClick={async () => {
                        //  generate receipt / print
                         const res = await fetch(`/api/orders/${order.id}/receipt`);
                         const blob = await res.blob();
                         const url = URL.createObjectURL(blob);
                         window.open(url, "_blank");
                       }}
                     >
                       Receipt
                     </button>
                   </td>
                 </tr>
               );
             })}
           </tbody>
         </table>
       </div>
</div>

  

      {/* pagination controls */}
      <div className="flex items-center gap-2 mt-3">
        <button disabled={page <= 1} onClick={() => load(page - 1)} className="px-3 py-1 border rounded">Prev</button>
        <span>Page {page} {total ? `of ${Math.ceil(total / limit)}` : ""}</span>
        <button disabled={total !== null && page >= Math.ceil((total ?? 0) / limit)} onClick={() => load(page + 1)} className="px-3 py-1 border rounded">Next</button>
      </div>

      <EditOrderDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        order={editingOrder}
        onSave={onSave}
        
      />
     </>
  );
}





