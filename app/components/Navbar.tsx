'use client';

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  // You can replace this with your global cart state later
  const [cartCount] = useState(3); 

  return (
    <nav className="absolute top-0 left-0 w-full z-20">
      <div className="
        max-w-7xl mx-auto px-6 py-4
        flex items-center justify-between
        pt-20
        text-white
      ">
        
        {/* LOGO */}
        <div className="absolute left-1/2 -translate-x-1/2">
         <Image src={"/logo.png"} alt="Refyline-logo" width={250} height={100} />
        </div>

        {/* CART ICON */}
        <div className="relative ml-auto cursor-pointer">
          <ShoppingBag size={26} className="text-white" />

          {/* BADGE */}
          {cartCount > 0 && (
            <span className="
              absolute -top-2 -right-2
              bg-gold text-black text-xs font-bold
              w-5 h-5 rounded-full 
              flex items-center justify-center
              shadow
            ">
              {cartCount}
            </span>
          )}
        </div>

      </div>
    </nav>
  );
}
