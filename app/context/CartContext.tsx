// "use client";
// import { createContext, useContext, useState, useEffect } from "react";

// export interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   qty: number;
// }

// export interface CartContextType {
//   cart: CartItem[];
//   cartCount: number;
//   addToCart: (product: CartItem, qty?: number) => void;
//   removeFromCart: (id: string) => void;
//   updateQty: (id: string, qty: number) => void;
// }
//  const CartContext = createContext<CartContextType | undefined>(undefined);



// export function CartProvider({ children }: { children: React.ReactNode }) {
//   const [cart, setCart] = useState<CartItem[]>([]);

  
//   // Load cart from localStorage
//   useEffect(() => {
//     const saved = localStorage.getItem("cart");
//     if (saved) setCart(JSON.parse(saved));
//   }, []);

//   // Save cart to localStorage
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   // Add Item
//   const addToCart = (product:CartItem, qty : number= 1) => {
//     setCart(prev => {
//       const exist = prev.find(i => i.id === product.id);
//       if (exist) {
//         return prev.map(i =>
//           i.id === product.id ? { ...i, qty: i.qty + qty } : i
//         );
//       }
//       return [...prev, { ...product, qty }];
//     });
//   };

//   // Remove Item
//   const removeFromCart = (id:string) => {
//     setCart(prev => prev.filter((i:CartItem) => i.id !== id));
//   };

//   // Update Qty
//   const updateQty = (id:string, qty:number) => {
//     setCart(prev =>
//       prev.map(i =>
//         i.id === id ? { ...i, qty: Math.max(1, qty) } : i
//       )
//     );
//   };

//   const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

//   return (
//     <CartContext.Provider value={{
//       cart,
//       cartCount,
//       addToCart,
//       removeFromCart,
//       updateQty
//     }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   return useContext(CartContext);
// }

"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// ----------------------
// 1) Types
// ----------------------
export type CartItem = {
  id: string;
  name: string;
  price: number;
  sellingPrice: number;
  image: string;
  qty: number;
};

export type CartContextType = {
  cart: CartItem[];
  cartCount: number;
  addToCart: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
};

// ----------------------
// 2) Create Context
// ----------------------
const CartContext = createContext<CartContextType | undefined>(undefined);

// ----------------------
// 3) Provider
// ----------------------
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  console.log(cart)

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add item
  const addToCart = (product: Omit<CartItem, "qty">, qty: number = 1) => {
    setCart(prev => {
      const exist = prev.find(i => i.id === product.id);
      if (exist) {
        return prev.map(i =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { ...product, qty }];
    });
  };

  // Remove
  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  // Update quantity
  const updateQty = (id: string, qty: number) => {
    setCart(prev =>
      prev.map(i =>
        i.id === id ? { ...i, qty: Math.max(1, qty) } : i
      )
    );
  };

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);


  const clearCart = () => {
  setCart([]);
  localStorage.removeItem("cart");
};

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ----------------------
// 4) Hook
// ----------------------
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
