'use client';
import { useState } from "react";

export default function ProductSlider() {
  const images = [
    "6.jpeg",
      "8.jpeg",
    "7.jpeg",
    "2.jpeg",
    "5.jpeg",
    // "3.jpeg",
    "4.jpeg",
  ];

  const [active, setActive] = useState(0);

  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="product-frame overflow-hidden card flex items-center justify-center h-[500px] md:h-[700px]">
        <img
          key={active}
          src={images[active]}
          alt="Refyline Product"
          className="w-full h-full object-cover bg-cream transition-all duration-500"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 mt-4 overflow-x-auto py-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`
              w-24 h-24 rounded-xl overflow-hidden border flex-shrink-0 
              transition-all 
              ${active === i ? "border-gold ring-2 ring-gold" : "border-gray-300"}
            `}
          >
            <img
              src={img}
              alt={`Refyline Thumbnail ${i}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
