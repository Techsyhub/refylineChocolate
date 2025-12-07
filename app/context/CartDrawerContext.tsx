"use client";

import { createContext, useContext, useState } from "react";

type CartDrawerContextType = {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartDrawerContext = createContext<CartDrawerContextType | undefined>(
  undefined
);

export function CartDrawerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <CartDrawerContext.Provider value={{ isOpen, openCart, closeCart }}>
      {children}
    </CartDrawerContext.Provider>
  );
}

export function useCartDrawer() {
  const ctx = useContext(CartDrawerContext);
  if (!ctx) throw new Error("useCartDrawer must be inside provider");
  return ctx;
}
