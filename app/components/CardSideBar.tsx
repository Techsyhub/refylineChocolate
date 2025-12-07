// "use client";
// import { motion } from "framer-motion";
// import { useCart } from "@/app/context/CartContext";
// import { X, ShoppingCart, Trash2 } from "lucide-react";
// import { useState } from "react";
// import { useCartDrawer } from "@/app/context/CartDrawerContext";

// export default function CartSidebar() {
//   const { cart, cartCount, updateQty, removeFromCart } = useCart();
// //   const [open, setOpen] = useState(false);
//   const { isOpen, closeCart, openCart } = useCartDrawer();


//   return (
//     <>
//       {/* Cart Button */}
//       <button onClick={() => openCart()} className="relative p-2">
//         <ShoppingCart size={26} />
//         {cartCount > 0 && (
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//             {cartCount}
//           </span>
//         )}
//       </button>

//       {/* Sidebar Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40"
//           onClick={() => closeCart()}
//         />
//       )}

//       {/* Sidebar */}
//       <motion.div
//         initial={{ x: "100%" }}
//         animate={{ x: isOpen ? 0 : "100%" }}
//         transition={{ type: "tween", duration: 0.3 }}
//         className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 p-5 flex flex-col"
//       >
//         <div className="flex justify-between items-center mb-5">
//           <h2 className="text-xl text-cocoa font-bold">Cart Details</h2>
//           <button onClick={() => closeCart()}>
//             <X size={24} className="text-cocoa" />
//           </button>
//         </div>

//         {/* Empty Cart */}
//         {cart.length === 0 && (
//           <p className="text-gray-500">Your cart is empty.</p>
//         )}

//         {/* Cart Items */}
//         <div className="flex-1 overflow-y-auto space-y-4">
//           {cart.map((item) => (
//             <div
//               key={item.id}
//               className="border rounded-lg p-3 flex items-center gap-3"
//             >
//               <img
//                 src={item.image || "/placeholder.png"}
//                 className="w-20 h-25 object-cover rounded"
//               />

//               <div className="flex-1">
//                 <h3 className="text-cocoa font-bold">{item.name}</h3>
//                 <div className="flex items-center gap-2">
//                 <p className=" text-xs text-slate-500 line-through font-medium"> Was Rs {Number(item.sellingPrice) * Number(item.qty)}</p>
//                 <p className=" text-gold font-medium">Rs {Number(item.price) * Number(item.qty)}</p>
//                 </div>
//                 <p className="text-xs font-medium text-cocoa">Save Rs {(Number(item.sellingPrice) * Number(item.qty)-(Number(item.price) * Number(item.qty)))}</p>
               
                

//                 {/* Quantity Controls */}
//                 <div className="flex items-center gap-2 mt-2">
//                   <button
//                     className="px-2 border rounded"
//                     onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}
//                   >
//                     -
//                   </button>
//                   <span className="px-3">{item.qty}</span>
//                   <button
//                     className="px-2 border rounded"
//                     onClick={() => updateQty(item.id, item.qty + 1)}
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               {/* Remove */}
//               <button
//                 className="text-red-500"
//                 onClick={() => removeFromCart(item.id)}
//               >
//                 <Trash2 size={22}/>
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Checkout Button */}
//         {cart.length > 0 && (
//           <button className="bg-cocoa text-cream font-bold w-full py-3 rounded-full mt-4">
//             Checkout
//           </button>
//         )}
//       </motion.div>
//     </>
//   );
// }


"use client";
import { motion } from "framer-motion";
import { useCart } from "@/app/context/CartContext";
import { X, ShoppingCart, Trash2 } from "lucide-react";
import { useCartDrawer } from "@/app/context/CartDrawerContext";
import { useRouter } from "next/navigation";

export default function CartSidebar() {
  const { cart, cartCount, updateQty, removeFromCart } = useCart();
  const { isOpen, closeCart, openCart } = useCartDrawer();

  // --------------------------
  // CALCULATIONS
  // --------------------------

//   const DELIVERY_FEE = 250;

//   const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);

//   // Product Discount
//   const totalDiscount =
//     cart.reduce(
//       (sum, item) =>
//         sum +
//         (Number(item.sellingPrice) * item.qty -
//           Number(item.price) * item.qty),
//       0
//     );

//   // Delivery Discount Logic
//   let deliveryDiscount = 0;

//   if (totalItems === 1) {
//     deliveryDiscount = DELIVERY_FEE * 0.75; // 75% off
//   } else if (totalItems >= 4) {
//     deliveryDiscount = DELIVERY_FEE; // 100% free delivery
//   }

//   // Payable delivery cost
//   const deliveryCost = DELIVERY_FEE - deliveryDiscount;

//   // Total amount for items
//   const subtotal = cart.reduce(
//     (sum, item) => sum + Number(item.price) * item.qty,
//     0
//   );

//   // Total saving
//   const totalSaving = totalDiscount + deliveryDiscount;

//   // Final amount to pay
//   const totalAmount = subtotal + deliveryCost;

const router = useRouter()

// DELIVERY FEE
const DELIVERY_FEE = 250;

// Count product types
let singleQty = 0;
let hasDuo = false;
let hasTrio = false;

cart.forEach((item) => {
  if (item.id === "single-1") singleQty += item.qty;
  if (item.id === "duo-1") hasDuo = true;
  if (item.id === "trio-1") hasTrio = true;
});

// ----------------------------
// DELIVERY DISCOUNT LOGIC
// ----------------------------
let deliveryDiscount = 0;

// 3) If user buys Trio → always 100% off
if (hasTrio) {
  deliveryDiscount = DELIVERY_FEE;

// 4) If user buys Duo + ANY other product → 100% off
} else if (hasDuo && (singleQty > 0 || hasTrio )) {
  deliveryDiscount = DELIVERY_FEE;

// 1) If user buys Duo alone → 75% off
} else if (hasDuo) {
  deliveryDiscount = DELIVERY_FEE * 0.75;

// 2) If user buys 2 single products → 75% off
} else if (singleQty === 2) {
  deliveryDiscount = DELIVERY_FEE * 0.75;

// 5) If user buys 3 single products → 100% off
} else if (singleQty >= 3) {
  deliveryDiscount = DELIVERY_FEE;
}

// Final delivery cost
const deliveryCost = DELIVERY_FEE - deliveryDiscount;

// ----------------------------
// PRODUCT DISCOUNT ALREADY CORRECT
// ----------------------------
const totalDiscount = cart.reduce(
  (sum, item) =>
    sum +
    (Number(item.sellingPrice) * item.qty -
      Number(item.price) * item.qty),
  0
);

// SUBTOTAL
const subtotal = cart.reduce(
  (sum, item) => sum + Number(item.price) * item.qty,
  0
);

// TOTAL SAVING
const totalSaving = totalDiscount + deliveryDiscount;

// FINAL AMOUNT
const totalAmount = subtotal + deliveryCost;


  return (
    <>
      {/* Cart Button */}
      {/* <button onClick={() => openCart()} className="relative p-2">
        <ShoppingCart size={26} />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {cartCount}
          </span>
        )}
      </button> */}

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => closeCart()}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 p-5 flex flex-col"
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl text-cocoa font-bold">Cart Details</h2>
          <button onClick={() => closeCart()}>
            <X size={24} className="text-cocoa" />
          </button>
        </div>

        {/* Empty */}
        {cart.length === 0 && (
          <p className="text-gray-500">Your cart is empty.</p>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-3 flex items-center gap-3"
            >
              <img
                src={item.image || "/placeholder.png"}
                className="w-20 h-20 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="text-cocoa font-bold">{item.name}</h3>

                <div className="flex items-center gap-2">
                  <p className="text-xs text-slate-500 line-through font-medium">
                    Was Rs {Number(item.sellingPrice) * item.qty}
                  </p>
                  <p className="text-gold font-medium">
                    Rs {Number(item.price) * item.qty}
                  </p>
                </div>

                <p className="text-xs font-medium text-cocoa">
                  Save Rs{" "}
                  {Number(item.sellingPrice) * item.qty -
                    Number(item.price) * item.qty}
                </p>

                {/* Qty Controls */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    className="px-2 border rounded"
                    onClick={() =>
                      updateQty(item.id, Math.max(1, item.qty - 1))
                    }
                  >
                    -
                  </button>
                  <span className="px-3">{item.qty}</span>
                  <button
                    className="px-2 border rounded"
                    onClick={() => updateQty(item.id, item.qty + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Remove */}
              <button
                className="text-red-500"
                onClick={() => removeFromCart(item.id)}
              >
                <Trash2 size={22} />
              </button>
            </div>
          ))}
        </div>

        {/* Pricing Summary */}
        {cart.length > 0 && (
          <div className="border-t pt-4 mt-4 space-y-2 text-sm text-cocoa font-medium">
            <div className="flex justify-between">
              <span>Price Discount:</span>
              <span>Rs {totalDiscount}</span>
            </div>

            <div className="flex justify-between">
              <span>
                {deliveryDiscount===0? "Delivery Charges": "Delivery Discount"}{" "}
                {deliveryDiscount === 0? "": deliveryDiscount === DELIVERY_FEE? "(Free Delivery)":"(75% Off)"}
                :
              </span>
              <span>Rs {deliveryDiscount === 0 ? DELIVERY_FEE: deliveryDiscount}</span>
            </div>

            <div className="flex justify-between font-semibold text-gold">
              <span>Total Saving:</span>
              <span>Rs {totalSaving}</span>
            </div>

            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total Amount:</span>
              <span>Rs {totalAmount}</span>
            </div>
          </div>
        )}

        {/* Checkout */}
        {cart.length > 0 && (
          <button
          onClick={()=> router.push("/checkout") }
          className="bg-cocoa text-cream font-bold w-full py-3 rounded-full mt-4">
            Checkout
          </button>
        )}
      </motion.div>
    </>
  );
}
