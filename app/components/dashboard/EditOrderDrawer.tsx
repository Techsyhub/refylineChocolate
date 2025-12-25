// "use client";

// import { useState, useEffect } from "react";
// import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";

// type Order = {
//   id: number;
//   status: OrderStatus;
//   trackingId?: string | null;
//   logisticPartner?: string | null;
// };

// type OrderStatus = "PENDING" | "CONFIRMED" | "DISPATCHED" | "IN_TRANSIT" | "DELIVERED" | "CANCELLED" | "RETURNED";
// type OrderWithRelations = Order & { customer: any; status: OrderStatus; items: any[] };

// interface EditOrderDrawerProps {
//   open: boolean;
//   onClose: () => void;
//   order: Order | null;
//   onSave: (updatedOrder: OrderWithRelations) => void;
// }
// export default function EditOrderDrawer({ open, onClose, order, onSave }: EditOrderDrawerProps) {
//   // Prevent crash when order is null
//   const [trackingId, setTrackingId] = useState("");
//   const [partner, setPartner] = useState("");
//   const [status, setStatus] = useState<OrderStatus>("PENDING");

//   // hydrate fields when order changes
//   useEffect(() => {
//     if (order) {
//       setTrackingId(order.trackingId || "");
//       setPartner(order.logisticPartner || "");
//       setStatus(order.status || "");
//     }
//   }, [order]);

//   if (!order) return null;

//   // Allowed statuses mapping
//   const statusOptions: Record<OrderStatus, OrderStatus[]> = {
//     PENDING: ["PENDING", "CONFIRMED", "CANCELLED"],
//     CONFIRMED: ["CONFIRMED", "DISPATCHED", "IN_TRANSIT"],
//     DISPATCHED: ["DISPATCHED", "IN_TRANSIT", "DELIVERED", "RETURNED"],
//     DELIVERED: ["DELIVERED"],
//     IN_TRANSIT: ["IN_TRANSIT", "DELIVERED", "RETURNED"],
//     CANCELLED: ["CANCELLED"],
//     RETURNED: ["RETURNED"],
//   };


//   const handleSave = () => {
//     onSave({
//       id: order.id,
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
//             <label className="text-sm  font-semibold">Status</label>
//             {/* <Select  value={status} onValueChange={setStatus}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select status" />
//               </SelectTrigger>
//               <SelectContent  className="bg-white text-black">
//                 {(statusOptions[order.status] || []).map((s) => (
//                   <SelectItem className="bg-white text-black focus:bg-gray-200"   key={s} value={s}>{s}</SelectItem>
//                 ))}
//               </SelectContent>
//             </Select> */}
//             <Select
//               value={status}
//               onValueChange={(value:OrderStatus) => setStatus(value)}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select status" />
//               </SelectTrigger>
//               <SelectContent className="bg-white text-black">
//                 {(statusOptions[order.status] || []).map((s) => (
//                   <SelectItem
//                     className="bg-white text-black focus:bg-gray-200"
//                     key={s}
//                     value={s}
//                   >
//                     {s}
//                   </SelectItem>
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


"use client";

import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { Order, OrderStatus, OrderUpdatePayload } from "@/app/types";



/* =======================
   TYPES (CLIENT SAFE)
======================= */



interface EditOrderDrawerProps {
  open: boolean;
  onClose: () => void;
  order: OrderUpdatePayload | null;
  onSave: (updatedOrder: {
    id: number;
    status: OrderStatus;
    trackingId?: string;
    logisticPartner?: string;
  }) => void;
}

/* =======================
   COMPONENT
======================= */

export default function EditOrderDrawer({
  open,
  onClose,
  order,
  onSave,
}: EditOrderDrawerProps) {
  const [trackingId, setTrackingId] = useState("");
  const [partner, setPartner] = useState("");
  const [status, setStatus] = useState<OrderStatus>("PENDING");

  /* hydrate when order changes */
  useEffect(() => {
    if (!order) return;

    setTrackingId(order.trackingId ?? "");
    setPartner(order.logisticPartner ?? "");
    setStatus(order.status); // ✅ no empty string
  }, [order]);

  if (!order) return null;

  /* Allowed transitions */
  const statusOptions: Record<OrderStatus, OrderStatus[]> = {
    PENDING: ["PENDING", "CONFIRMED", "CANCELLED"],
    CONFIRMED: ["CONFIRMED", "DISPATCHED", "IN_TRANSIT"],
    DISPATCHED: ["DISPATCHED", "IN_TRANSIT", "DELIVERED", "RETURNED"],
    IN_TRANSIT: ["IN_TRANSIT", "DELIVERED", "RETURNED"],
    DELIVERED: ["DELIVERED"],
    CANCELLED: ["CANCELLED"],
    RETURNED: ["RETURNED"],
  };

  const handleSave = () => {
    onSave({
      id: order.id,
      trackingId,
      logisticPartner: partner,
      status, // ✅ RETURNED allowed
    });
  };

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="p-6">
        <DrawerHeader>
          <DrawerTitle>Edit Order</DrawerTitle>
        </DrawerHeader>

        <div className="space-y-4 mt-4">
          {/* Tracking ID */}
          <div>
            <label className="text-sm font-semibold">Tracking ID</label>
            <Input
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
            />
          </div>

          {/* Logistic Partner */}
          <div>
            <label className="text-sm font-semibold">Logistic Partner</label>
            <Input
              value={partner}
              onChange={(e) => setPartner(e.target.value)}
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-semibold">Status</label>

            <Select
              value={status}
              onValueChange={(value) =>
                setStatus(value as OrderStatus) // ✅ correct cast
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>

              <SelectContent className="bg-white text-black">
                {statusOptions[order.status].map((s) => (
                  <SelectItem
                    key={s}
                    value={s}
                    className="bg-white text-black focus:bg-gray-200"
                  >
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleSave} className="w-full">
            Save
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
