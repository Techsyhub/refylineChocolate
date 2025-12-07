"use client";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart , clearCart} = useCart();

  // -------------------------
  // BILLING CALCULATIONS
  // -------------------------
  const DELIVERY_FEE =  250;

  let singleQty = 0;
  let hasDuo = false;
  let hasTrio = false;

  cart.forEach((item) => {
    if (item.id === "single-1") singleQty += item.qty;
    if (item.id === "duo-1") hasDuo = true;
    if (item.id === "trio-1") hasTrio = true;
  });

  let deliveryDiscount = 0;

  if (hasTrio) {
    deliveryDiscount = DELIVERY_FEE;
  } else if (hasDuo && (singleQty > 0 || hasTrio)) {
    deliveryDiscount = DELIVERY_FEE;
  } else if (hasDuo) {
    deliveryDiscount = DELIVERY_FEE * 0.75;
  } else if (singleQty === 2) {
    deliveryDiscount = DELIVERY_FEE * 0.75;
  } else if (singleQty >= 3) {
    deliveryDiscount = DELIVERY_FEE;
  }



  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.qty,
    0
  );

   const sellingPriceTotal = cart.reduce(
    (sum, item) => sum + Number(item.sellingPrice) * item.qty,
    0
  );

  const totalDiscount = cart.reduce(
    (sum, item) =>
      sum +
      (Number(item.sellingPrice) * item.qty -
        Number(item.price) * item.qty),
    0
  );
  const deliveryCost = DELIVERY_FEE - deliveryDiscount;
  const totalSaving = totalDiscount + deliveryDiscount;
  const totalAmount = subtotal - deliveryDiscount;

  // -------------------------
  // FORM HANDLE
  // -------------------------
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    postalCode: "",
    address: "",
    notes:"",
  });

  const onChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const confirmOrder = async() => {
    if (!form.fullName || !form.phone || !form.city || !form.address) {
      alert("Please fill all required fields.");
      return;
    }

    // Later you can send this to backend API route
    // console.log("Order placed:", { cart, form, totalAmount });
    
 //cart.reduce((acc: any, item: any) => acc + (item.price* item.qty), 0);
//  console.log("totalAmount", totalAmount);
//  console.log("cart first item", cart[0])

 
    const deliveryCharge = DELIVERY_FEE; // dynamic if needed
    const discountAmount = 0;

    const payload = {
      customer: form,
      items: cart,
      totalAmount:totalAmount,
      deliveryCharge,
      discountAmount,
      paymentMethod: "COD",
      notes: form.notes,
      logisticInfo: null,
      subtotal: subtotal,
      deliveryDiscount: deliveryDiscount
    };

    const res = await fetch("/api/orders/create", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("order response", data)
    if (data.success) {
      clearCart()
      // localStorage.removeItem("cart");
      // router.push(`/order-success?orderId=${data.order.id}`);
       alert("Order confirmed successfully!");
    router.push("/"); // redirect home
    } else {
      alert("Error creating order!");
    }

   
  };

  if (cart.length === 0) {
    return (
      <div className="p-5 pt-40 text-center">
        <h2 className="text-4xl text-gold font-bold">Your cart is empty</h2>
        <button
          onClick={() => router.push("/")}
          className="mt-4 bg-cocoa text-white px-6 py-2 rounded-full pointer hover:bg-gold transition-all duration-200"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl bg-cream rounded-2xl mt-15 mx-auto p-5">
      <h1 className="text-2xl font-bold text-cocoa mb-5">Checkout</h1>

      {/* BILL SUMMARY */}
      <div className="border rounded-lg p-4 mb-6 bg-white shadow">
        <h2 className="text-lg font-bold mb-3">Order Summary</h2>

        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>Rs {sellingPriceTotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Total Product Discount:</span>
            <span className="text-gold">-Rs {totalDiscount}</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery Discount:</span>
            <span className="text-gold">-Rs {deliveryDiscount}</span>
          </div>

          <div className="flex justify-between font-bold border-t pt-2">
            <span>Total Payable:</span>
            <span>Rs {totalAmount}</span>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="border rounded-lg p-4 mb-6 bg-white shadow">
        <h2 className="text-lg font-bold mb-4">Customer Details</h2>

        <div className="grid grid-cols-1 gap-4">
          <input
            name="fullName"
            placeholder="Full Name *"
            className="border p-3 rounded"
            value={form.fullName}
            onChange={onChange}
          />
          <input
            name="phone"
            placeholder="Phone *"
            className="border p-3 rounded"
            value={form.phone}
            onChange={onChange}
          />
          <input
            name="email"
            placeholder="Email"
            className="border p-3 rounded"
            value={form.email}
            onChange={onChange}
          />
          <input
            name="city"
            placeholder="City *"
            className="border p-3 rounded"
            value={form.city}
            onChange={onChange}
          />
          <input
            name="postalCode"
            placeholder="Postal Code"
            className="border p-3 rounded"
            value={form.postalCode}
            onChange={onChange}
          />
          <textarea
            name="address"
            placeholder="Full Address *"
            className="border p-3 rounded h-24"
            value={form.address}
            onChange={onChange}
          />
          <textarea
            name="note"
            placeholder="Additional Notes"
            className="border p-3 rounded h-24"
            value={form.notes}
            onChange={onChange}
          />
        </div>
      </div>

      {/* Payment Method */}
      <div className="border rounded-lg p-4 mb-6 bg-white shadow">
        <h2 className="text-lg font-bold mb-4">Payment Method</h2>

        <label className="flex items-center gap-2">
          <input type="radio" checked readOnly />
          <span>Cash on Delivery (COD)</span>
        </label>
      </div>

      {/* BUTTONS */}
      <div className="flex justify-between">
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 border rounded-full"
        >
          Back to Home
        </button>

        <button
          onClick={confirmOrder}
          className="px-6 py-3 bg-cocoa text-white rounded-full"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}
