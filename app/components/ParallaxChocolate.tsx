'use client';

import { useEffect, useState } from "react";

export default function ParallaxChocolate() {
  const [offset, setOffset] = useState(10);

  useEffect(() => {
    const handleScroll = () => {
      // Move slower than scroll for a smooth parallax feel
      setOffset(window.scrollY * 0.25);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-screen -z-10 "
      style={{
        transform: `translateY(${offset}px)`,
        transition: 'transform 0.1s linear'
      }}
    >
      <img
        src="/chocolate-drip.png"
        alt="Chocolate dripping"
        className="w-full h-full"
      />
    </div>
  );
}
