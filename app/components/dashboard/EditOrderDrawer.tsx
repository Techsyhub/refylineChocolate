// app/admin/dashboard/orders/EditOrderDrawer.tsx

// "use client";

// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// export default function EditOrderDrawer({ open, onClose, order, onSaved }: any) {
//   const [status, setStatus] = useState(order?.status ?? "");
//   const [trackingId, setTrackingId] = useState(order?.trackingId ?? "");
//   const [logisticPartner, setLogisticPartner] = useState(order?.logisticPartner ?? "");
//   const [logisticPrice, setLogisticPrice] = useState(order?.logisticPrice ?? "");

//   useEffect(() => {
//     setStatus(order?.status ?? "");
//     setTrackingId(order?.trackingId ?? "");
//     setLogisticPartner(order?.logisticPartner ?? "");
//     setLogisticPrice(order?.logisticPrice ?? "");
//   }, [order]);

//   if (!open) return null;

//   const save = async () => {
//     try {
//       const res = await fetch("/api/orders/update", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           orderId: order.id,
//           status,
//           trackingId,
//           logisticPartner,
//           logisticPrice: logisticPrice ? Number(logisticPrice) : null,
//         }),
//       });
//       const body = await res.json();
//       if (body.success) {
//         onSaved(body.order);
//         toast.success("Saved");
//       } else {
//         toast.error(body.error || "Save failed");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Network error");
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-40 flex">
//       {/* overlay */}
//       <div onClick={onClose} className="absolute inset-0 bg-black/40"></div>

//       {/* drawer */}
//       <div className="ml-auto w-full md:w-[520px] z-50 bg-white h-full p-6 overflow-auto shadow-lg">
//         <h2 className="text-xl font-bold mb-4">Edit Order #{order?.id}</h2>

//         <label className="block mb-2">
//           <div className="text-sm mb-1">Status</div>
//           <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 rounded w-full">
//             <option value="PENDING">PENDING</option>
//             <option value="CONFIRMED">CONFIRMED</option>
//             <option value="DISPATCHED">DISPATCHED</option>
//             <option value="IN_TRANSIT">IN_TRANSIT</option>
//             <option value="DELIVERED">DELIVERED</option>
//             <option value="CANCELLED">CANCELLED</option>
//           </select>
//         </label>

//         <label className="block mb-2">
//           <div className="text-sm mb-1">Tracking ID</div>
//           <input value={trackingId ?? ""} onChange={(e) => setTrackingId(e.target.value)} className="border p-2 rounded w-full" />
//         </label>

//         <label className="block mb-2">
//           <div className="text-sm mb-1">Logistic Partner</div>
//           <input value={logisticPartner ?? ""} onChange={(e) => setLogisticPartner(e.target.value)} className="border p-2 rounded w-full" />
//         </label>

//         <label className="block mb-4">
//           <div className="text-sm mb-1">Logistic Price</div>
//           <input type="number" value={logisticPrice ?? ""} onChange={(e) => setLogisticPrice(e.target.value)} className="border p-2 rounded w-full" />
//         </label>

//         <div className="flex gap-2">
//           <button className="bg-gray-200 px-4 py-2 rounded" onClick={onClose}>Cancel</button>
//           <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={save}>Save</button>
//         </div>

//         {/* Order summary (printable) */}
//         <div id="order-summary" className="mt-6">
//           <h3 className="text-lg font-semibold mb-2">Order Summary (Preview)</h3>
//           <div className="border p-3">
//             <p><strong>Order ID:</strong> {order?.id}</p>
//             <p><strong>Customer:</strong> {order?.customer?.fullName}</p>
//             <p><strong>Phone:</strong> {order?.customer?.phone}</p>
//             <p><strong>Tracking ID:</strong> {trackingId}</p>
//             <p><strong>Logistic Partner:</strong> {logisticPartner}</p>
//             <p><strong>Status:</strong> {status}</p>
//             <div className="mt-2">
//               <h4 className="font-semibold">Items</h4>
//               <ul>
//                 {order?.items?.map((it:any) => (
//                   <li key={it.id}>{it.name} — {it.qty} × {it.sellingPrice}</li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           <div className="flex gap-2 mt-3">
//             <button onClick={() => window.print()} className="px-3 py-2 bg-green-600 text-white rounded">Print (Browser)</button>
//             <button onClick={async () => {
//               // generate PDF
//               const el = document.getElementById("order-summary");
//               if (!el) return;
//               // use html2canvas + jspdf
//               // lazy import to avoid server issues
//               const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import("html2canvas"), import("jspdf")]);
//               const canvas = await html2canvas(el as HTMLElement);
//               const imgData = canvas.toDataURL("image/png");
//               const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [canvas.width, canvas.height] });
//               pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
//               pdf.save(`order-${order.id}.pdf`);
//             }} className="px-3 py-2 bg-indigo-600 text-white rounded">Download PDF</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { DUO_BUNDLE, SINGLE_PRODUCT, TRIO_BUNDLE } from "@/app/constants/product";
// import Link from "next/link";

// interface OrderTableProps {
//   orders: any[];
// }

// export default function OrderTable({ orders }: OrderTableProps) {
//   return (
//     <>
   
//      <h1 className="text-2xl font-bold">Recent Orders</h1>
//     <div className="overflow-x-scroll mt-6">
//       <table className="min-w-full border">
//         <thead className="bg-gray-200">
//           <tr>
//             {/* <th className="p-2 border">Order ID</th> */}
//              <th className="p-2 border">Order TrackingID</th>
//             <th className="p-2 border">Customer</th>
//             <th className="p-2 border">Phone</th>
//             <th className="p-2 border">Order Items</th>
//             <th className="p-2 border">Quantity</th>
//             <th className="p-2 border">Total</th>
//                 <th className="p-2 border">Payment Method</th>
//             <th className="p-2 border">Delivery Discount</th>
//              <th className="p-2 border">City</th>
//             <th className="p-2 border">Delivery Address</th>
//             <th className="p-2 border">Logistic Partner</th>
//             <th className="p-2 border">Logistic Delivery Fee</th>
//             <th className="p-2 border">Status</th>
//             {/* <th className="p-2 border">Actions</th> */}
//           </tr>
//         </thead>
//         <tbody className="text-sm">
//           {orders.map((order) => {
//              let totalChocolates = 0;
//             return(

//             <tr key={order.id} className="text-center">
//               {/* <td className="p-2 border">{order.id}</td> */}
//               <td className="p-2 border">{order.trackingId}</td>
//               <td className="p-2 border">{order.customer.fullName}</td>
//               <td className="p-2 border">{order.customer.phone}</td>
//               <td className="p-2 w-50 border">{order.items.map((item, index)=>{
                 
//                  if(item.name === SINGLE_PRODUCT){
//                   totalChocolates = totalChocolates+ item.qty
//                  }else if(item.name === DUO_BUNDLE){
//                   totalChocolates = totalChocolates + (item.qty * 2)
//                  }else if(item.name === TRIO_BUNDLE){
//                   totalChocolates = totalChocolates + (item.qty * 3)
//                  }
//                return (
//               <div key={index+item.name}>
//                 <div className="text-sm  text-left flex items-center justify-between">
//                   <p>{item.name}</p>    <p><span className="font-bold text-lg">{item.qty}</span> {item.name === DUO_BUNDLE?"x 2": item.name === TRIO_BUNDLE? "x 3": ""}</p>
//                 </div>           
//               </div>
               
               
//               )
//               })}</td>
//                 <td className="p-2 border">{totalChocolates}</td>
//               <td className="p-2 border">{order.totalPayable} PKR </td>
//                  <td className="p-2 border">{order.paymentMethod}</td>
//                 <td className="p-2 border">{order.deliveryDiscount} PKR</td>
//                 <td className="p-2 border">{order.customer.city}</td>

//               <td className="p-2 border">{order.customer.address}</td>
//                <td className="p-2 border">{order.logisticPartner || "not assigned"}</td>
//                 <td className="p-2 border">{order.logisticPrice|| "not assigned"}</td>
//                  <td className="p-2 border">{order.status}</td>
//               {/* <td className="p-2 border">

//                 <Link href={`/admin/dashboard/orders/${order.id}`} className="text-blue-500 underline">
//                   View
//                 </Link>
//               </td> */}
//             </tr>
//           )
            
            
//           })}
//         </tbody>
//       </table>
//     </div>
//      </>
//   );
// }







// import { DUO_BUNDLE, SINGLE_PRODUCT, TRIO_BUNDLE } from "@/app/constants/product";

// interface OrderTableProps {
//   orders: any[];
// }

// export default function OrderTable({ orders }: OrderTableProps) {
//   return (
//     <>
//       <h1 className="text-2xl font-bold">Orders List</h1>

//       <div className="overflow-x-auto mt-6">
//         <table className="min-w-full border">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="p-2 border">Tracking ID</th>
//               <th className="p-2 border">Customer</th>
//               <th className="p-2 border">Phone</th>
//               <th className="p-2 border">Items</th>
//               <th className="p-2 border">Qty</th>
//               <th className="p-2 border">Total</th>
//               <th className="p-2 border">Payment</th>
//               <th className="p-2 border">Delivery Discount</th>
//               <th className="p-2 border">City</th>
//               <th className="p-2 border">Address</th>
//               <th className="p-2 border">Partner</th>
//               <th className="p-2 border">Logistic Fee</th>
//               <th className="p-2 border">Status</th>
//             </tr>
//           </thead>

//           <tbody className="text-sm">
//             {orders.map((order) => {
//               let totalChocolates = 0;

//               return (
//                 <tr key={order.id} className="text-center">
//                   <td className="p-2 border">{order.trackingId}</td>
//                   <td className="p-2 border">{order.customer.fullName}</td>
//                   <td className="p-2 border">{order.customer.phone}</td>

//                   <td className="p-2 border w-56 text-left">
//                     {order.items.map((item, index) => {
//                       if (item.name === SINGLE_PRODUCT) totalChocolates += item.qty;
//                       if (item.name === DUO_BUNDLE) totalChocolates += item.qty * 2;
//                       if (item.name === TRIO_BUNDLE) totalChocolates += item.qty * 3;

//                       return (
//                         <div key={`${order.id}-${item.id}-${index}`}>
//                           <div className="flex justify-between">
//                             <p>{item.name}</p>
//                             <p>
//                               <span className="font-bold">{item.qty}</span>{" "}
//                               {item.name === DUO_BUNDLE
//                                 ? "x2"
//                                 : item.name === TRIO_BUNDLE
//                                 ? "x3"
//                                 : ""}
//                             </p>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </td>

//                   <td className="p-2 border">{totalChocolates}</td>
//                   <td className="p-2 border">{order.totalPayable} PKR</td>
//                   <td className="p-2 border">{order.paymentMethod}</td>
//                   <td className="p-2 border">{order.deliveryDiscount} PKR</td>
//                   <td className="p-2 border">{order.customer.city}</td>
//                   <td className="p-2 border">{order.customer.address}</td>
//                   <td className="p-2 border">{order.logisticPartner || "N/A"}</td>
//                   <td className="p-2 border">{order.logisticPrice || "N/A"}</td>
//                   <td className="p-2 border">{order.status}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }




// "use client";

// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { Order } from "@prisma/client";
// import EditOrderDrawer from "./EditOrderDrawer"; // drawer component we'll create
// import { format } from "date-fns";

// type OrderWithRelations = Order & { customer: any; items: any[] };

// export default function OrdersTable({ initialOrders }: { initialOrders: OrderWithRelations[] }) {
//   const [orders, setOrders] = useState<OrderWithRelations[]>(initialOrders || []);
//   const [page, setPage] = useState(1);
//   const [limit] = useState(20);
//   const [query, setQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [total, setTotal] = useState<number | null>(null);

//   const [editingOrder, setEditingOrder] = useState<OrderWithRelations | null>(null);
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   async function load(pageToLoad = 1) {
//     try {
//       const params = new URLSearchParams();
//       params.set("page", String(pageToLoad));
//       params.set("limit", String(limit));
//       if (query) params.set("q", query);
//       if (statusFilter) params.set("status", statusFilter);
//       const res = await fetch(`/api/orders?${params.toString()}`);
//       const body = await res.json();
//       if (body.success) {
//         setOrders(body.data.orders);
//         setTotal(body.data.total);
//         setPage(body.data.page);
//       } else {
//         toast.error("Failed to load orders");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Network error");
//     }
//   }

//   useEffect(() => {
//     // initial load client-side
//     if (!initialOrders) load();
//     else setOrders(initialOrders);
//   }, []);

//   // search / filters
//   useEffect(() => {
//     const t = setTimeout(() => load(1), 400);
//     return () => clearTimeout(t);
//   }, [query, statusFilter]);

//   const openEdit = (order: OrderWithRelations) => {
//     setEditingOrder(order);
//     setDrawerOpen(true);
//   };

//   const onSave = (updatedOrder: OrderWithRelations) => {
//     // replace in local state
//     setOrders(prev => prev.map(o => (o.id === updatedOrder.id ? updatedOrder : o)));
//     setDrawerOpen(false);
//     toast.success("Order updated");
//   };

//   return (
//     <div>
//       <div className="flex gap-2 items-center mb-4">
//         <input
//           placeholder="Search by tracking, customer, phone..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           className="border px-3 py-2 rounded w-80"
//         />
//         <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border px-3 py-2 rounded">
//           <option value="">All statuses</option>
//           <option value="PENDING">Pending</option>
//           <option value="CONFIRMED">Confirmed</option>
//           <option value="DISPATCHED">Dispatched</option>
//           <option value="IN_TRANSIT">In Transit</option>
//           <option value="DELIVERED">Delivered</option>
//           <option value="CANCELLED">Cancelled</option>
//         </select>
//         <button onClick={() => load(1)} className="px-3 py-2 bg-blue-600 text-white rounded">Refresh</button>
//       </div>

//       {/* table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full border">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2 border">Tracking</th>
//               <th className="p-2 border">Customer</th>
//               <th className="p-2 border">Phone</th>
//               <th className="p-2 border">Items</th>
//               <th className="p-2 border">Qty</th>
//               <th className="p-2 border">Total</th>
//               <th className="p-2 border">Logistic Fee</th>
//               <th className="p-2 border">Status</th>
//               <th className="p-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => {
//               let totalQty = order.items.reduce((s, it: any) => s + (it.qty ?? 0), 0);
//               return (
//                 <tr key={order.id} className="text-center">
//                   <td className="p-2 border">{order.trackingId || "—"}</td>
//                   <td className="p-2 border">{order.customer?.fullName}</td>
//                   <td className="p-2 border">{order.customer?.phone}</td>
//                   <td className="p-2 border text-left">
//                     {order.items.map((it) => <div key={`${order.id}-${it.id}`}>{it.name} <small>×{it.qty}</small></div>)}
//                   </td>
//                   <td className="p-2 border">{totalQty}</td>
//                   <td className="p-2 border">{order.totalPayable}</td>
//                   <td className="p-2 border">{order.logisticPrice ?? "—"}</td>
//                   <td className="p-2 border">{order.status}</td>
//                   <td className="p-2 border">
//                     <button className="px-2 py-1 mr-2 bg-yellow-500 text-white rounded" onClick={() => openEdit(order)}>Edit</button>
//                     <button
//                       className="px-2 py-1 bg-green-600 text-white rounded"
//                       onClick={async () => {
//                         // generate receipt / print
//                         const res = await fetch(`/api/orders/${order.id}/receipt`);
//                         const blob = await res.blob();
//                         const url = URL.createObjectURL(blob);
//                         window.open(url, "_blank");
//                       }}
//                     >
//                       Receipt
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* pagination controls */}
//       <div className="flex items-center gap-2 mt-3">
//         <button disabled={page <= 1} onClick={() => load(page - 1)} className="px-3 py-1 border rounded">Prev</button>
//         <span>Page {page} {total ? `of ${Math.ceil(total / limit)}` : ""}</span>
//         <button disabled={total !== null && page >= Math.ceil((total ?? 0) / limit)} onClick={() => load(page + 1)} className="px-3 py-1 border rounded">Next</button>
//       </div>

//       <EditOrderDrawer
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         order={editingOrder}
//         onSaved={onSave}
//       />
//     </div>
//   );
// }



// "use client";

// import { useState } from "react";
// import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";

// export default function EditOrderDrawer({ open, onClose, order, onSave }) {
//   const [trackingId, setTrackingId] = useState(order?.trackingId || "");
//   const [partner, setPartner] = useState(order?.logisticPartner || "");
//   const [status, setStatus] = useState(order?.status || "");

//   const statusOptions = {
//     pending: ["confirmed", "cancelled"],
//     confirmed: ["dispatched"],
//     dispatched: ["delivered", "returned"],
//     delivered: ["DELIVERED"],
//   };

//   const handleSave = () => {
//     onSave({
//       ...order,
//       trackingId,
//       logisticPartner: partner,
//       status,
//     });
//   };

//   return (
//     <Drawer open={open} onOpenChange={onClose}>
//       <DrawerContent className="p-6">
//         <DrawerHeader>
//           <DrawerTitle>Edit Order</DrawerTitle>
//         </DrawerHeader>

//         <div className="space-y-4 mt-4">
//           <div>
//             <label className="text-sm font-semibold">Tracking ID</label>
//             <Input value={trackingId} onChange={(e) => setTrackingId(e.target.value)} />
//           </div>

//           <div>
//             <label className="text-sm font-semibold">Logistic Partner</label>
//             <Input value={partner} onChange={(e) => setPartner(e.target.value)} />
//           </div>

//           <div>
//             <label className="text-sm font-semibold">Status</label>
//             <Select onValueChange={setStatus} value={status}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select status" />
//               </SelectTrigger>
//               <SelectContent>
//                 {statusOptions[order.status]?.map((s) => (
//                   <SelectItem key={s} value={s}>{s}</SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <Button onClick={handleSave} className="w-full">Save</Button>
//         </div>
//       </DrawerContent>
//     </Drawer>
//   );
// }



// "use client";

// import { useState, useEffect } from "react";
// import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";

// export default function EditOrderDrawer({ open, onClose, order, onSave }) {
  
//   // Prevent crash on first render
//   if (!order) return null;

//   const [trackingId, setTrackingId] = useState(order.trackingId || "");
//   const [partner, setPartner] = useState(order.logisticPartner || "");
//   const [status, setStatus] = useState(order.status || "");

//   // Update state when a new order is opened
//   useEffect(() => {
//     if (order) {
//       setTrackingId(order.trackingId || "");
//       setPartner(order.logisticPartner || "");
//       setStatus(order.status || "");
//     }
//   }, [order]);

//   const statusOptions: Record<string, string[]> = {
//     PENDING: ["CONFIRMED", "CANCELLED"],
//     CONFIRMED: ["DISPATCHED"],
//     DISPATCHED: ["DELIVERED", "RETURNED"],
//     DELIVERED: ["DELIVERED"],
//     RETURNED: [],
//     CANCELLED: [],
//   };

//   const handleSave = () => {
//     const updated = {
//       ...order,
//       trackingId,
//       logisticPartner: partner,
//       status,
//     };
//     onSave(updated);
//   };

//   return (
//     <Drawer open={open} onOpenChange={onClose}>
//       <DrawerContent className="p-6">
//         <DrawerHeader>
//           <DrawerTitle>Edit Order</DrawerTitle>
//         </DrawerHeader>

//         <div className="space-y-4 mt-4">

//           {/* Tracking ID */}
//           <div>
//             <label className="text-sm font-semibold">Tracking ID</label>
//             <Input value={trackingId} onChange={(e) => setTrackingId(e.target.value)} />
//           </div>

//           {/* Partner */}
//           <div>
//             <label className="text-sm font-semibold">Logistic Partner</label>
//             <Input value={partner} onChange={(e) => setPartner(e.target.value)} />
//           </div>

//           {/* Status */}
//           <div>
//             <label className="text-sm font-semibold">Status</label>
//             <Select value={status} onValueChange={setStatus}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select status" />
//               </SelectTrigger>

//               <SelectContent>
//                 {statusOptions[order.status]?.map((s) => (
//                   <SelectItem key={s} value={s}>
//                     {s}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <Button onClick={handleSave} className="w-full">
//             Save
//           </Button>
//         </div>
//       </DrawerContent>
//     </Drawer>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";

export default function EditOrderDrawer({ open, onClose, order, onSave }) {
  // Prevent crash when order is null
  const [trackingId, setTrackingId] = useState("");
  const [partner, setPartner] = useState("");
  const [status, setStatus] = useState("");

  // hydrate fields when order changes
  useEffect(() => {
    if (order) {
      setTrackingId(order.trackingId || "");
      setPartner(order.logisticPartner || "");
      setStatus(order.status || "");
    }
  }, [order]);

  if (!order) return null;

  // Allowed statuses mapping
  const statusOptions: Record<string, string[]> = {
    PENDING: ["PENDING","CONFIRMED", "CANCELLED"],
    CONFIRMED: ["CONFIRMED","DISPATCHED"],
    DISPATCHED: ["DISPATCHED","DELIVERED", "RETURNED"],
    DELIVERED: ["DELIVERED"],
  };

  const handleSave = () => {
    onSave({
      id: order.id,
      trackingId,
      logisticPartner: partner,
      status,
    });

  };

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="p-6">
        <DrawerHeader>
          <DrawerTitle>Edit Order</DrawerTitle>
        </DrawerHeader>

        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-semibold">Tracking ID</label>
            <Input value={trackingId} onChange={(e) => setTrackingId(e.target.value)} />
          </div>

          <div>
            <label className="text-sm font-semibold">Logistic Partner</label>
            <Input value={partner} onChange={(e) => setPartner(e.target.value)} />
          </div>

          <div>
            <label className="text-sm  font-semibold">Status</label>
            <Select  value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent  className="bg-white text-black">
                {(statusOptions[order.status] || []).map((s) => (
                  <SelectItem className="bg-white text-black focus:bg-gray-200"   key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleSave} className="w-full">Save</Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
