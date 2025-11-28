"use client";
import { useState } from 'react';
import Tabs from './Tabs';
import ReviewsList from './ReviewsList';
import ReviewStepper from './ReviewStepper';
import clsx from 'clsx';
import ProductSlider from './ProductSlider';
import { ShoppingCart } from 'lucide-react';

export default function ProductDetails() {
  const [qty, setQty] = useState(1);
  const [showStepper, setShowStepper] = useState(false);

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      {/* top grid */}
      <div className="grid md:grid-cols-2 gap-8 items-start space-y-5 mt-10
  bg-cream 
  border border-[#e8d7c5]
  shadow-[0_8px_30px_rgba(0,0,0,0.08)]
  rounded-2xl p-8
  z-20">
        {/* left: hero */}
        {/* <div>
          <div className="product-frame overflow-hidden flex items-center justify-center card">
            <img src="/nutriball_1.png" alt="Product" className="max-h-fit object-cover" />
          </div>

          <div className="flex gap-3 mt-4 overflow-x-auto">
            {[1,2,3,4,5].map((i) => (
              <button key={i} className="w-20 h-20 rounded-full overflow-hidden border card flex-shrink-0">
                <img src={`/thumb-${i}.png`} alt={`thumb-${i}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div> */}
        <ProductSlider />

        {/* right: details */}
        <div
        // className='  relative'
        >
          <h1 className="text-3xl md:text-4xl font-black font-serif text-gold">
            Refyline — Healthy Chocolate NutriBar
          </h1>

          <div className="flex items-center gap-6">
            <div>
              <div className="flex items-center gap-2 text-gold">
                <div className="text-xl">★★★★★</div>
                <div className="text-sm text-accent">(287)</div>
              </div>
              <div className="text-3xl font-semibold text-cocoa mt-2">Rs. 1,450</div>
              <div className="text-sm line-through text-gray-400">Rs. 2,200</div>
            </div>

            <div className="ml-auto">
              <div className="flex gap-2 text-xs text-gray-600">
                <span className="px-2 py-1 border rounded">Trusted</span>
                <span className="px-2 py-1 border rounded">Ships Nationwide</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-2 border rounded p-2">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3">-</button>
              <div className="px-4 font-semibold">{qty}</div>
              <button onClick={() => setQty(q => q + 1)} className="px-3">+</button>
            </div>

            <button className="btn-gold px-6 py-3 rounded-full">Add to cart</button>
            <button className="px-6 py-3 border rounded-full">Buy now</button>
          </div>

          <Tabs />
        </div>

      </div>

      {/* promotional band */}
      {/* <section className="mt-12 grid md:grid-cols-2 gap-6 items-center bg-[linear-gradient(90deg,#f0f2e9,#eef4ea)] p-8 rounded-xl">
        <div>
          <h3 className="text-xl font-semibold text-cocoa">Proven To Improve Instantly & Over-Time</h3>
          <p className="mt-3 text-gray-700">Brightness, Smoothness, Signs Of Tiredness, & Hydration — nutrient rich chocolate for glow & radiance.</p>
        </div>
        <img src="/promo.png" alt="promo" className="w-full max-w-sm object-contain mx-auto" />
      </section> */}


      {/* PREMIUM BUNDLE OFFERS SECTION */}
      {/* <section className="mt-20 relative px-6 py-16 bg-gradient-to-br from-[#f7f5ef] to-[#ecefe6] rounded-3xl overflow-hidden">

  soft background glow
  <div className="absolute -top-20 -left-20 w-72 h-72 bg-gold/20 blur-3xl rounded-full"></div>
  <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-cocoa/10 blur-3xl rounded-full"></div>

  <h2 className="text-center text-3xl font-bold text-cocoa mb-3 tracking-wide">
    Refyline Signature Bundles
  </h2>
  <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12">
    Elevate your healthy chocolate ritual with our handcrafted bundles — 
    made for sharing, gifting, and upgrading your daily wellness routine.
  </p>

  <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">

    DUO BUNDLE
    <div className="group relative bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] 
                    p-8 flex flex-col items-center transform transition duration-300 hover:-translate-y-2 hover:shadow-xl">
      
      Ribbon
      <div className="absolute top-4 left-4 bg-gold text-black text-xs font-semibold px-3 py-1 rounded-md shadow">
        Save Rs 100
      </div>

<div className="absolute top-6 left-0">
  <div className="
    bg-gradient-to-r from-[#C89B3C] to-[#F2D78D]
    text-black font-semibold text-xs
    py-1.5 px-4 pr-6
    shadow-[0_3px_6px_rgba(0,0,0,0.15)]
    rounded-r-full
    relative
  ">
    Save Rs 100

    Folded Edge
    <span className="
      absolute top-1/2 -right-2 -translate-y-1/2
      w-3 h-3
      bg-[#D8B45A]
      rotate-45
      shadow-[2px_2px_4px_rgba(0,0,0,0.15)]
    "></span>
  </div>
</div>

      <img
        src="/duo.png"
        alt="Duo Bundle"
        className="w-48 h-48 object-contain transition duration-300 group-hover:scale-105"
      />

      <h3 className="text-2xl font-semibold text-cocoa mt-5">
        Duo Delight Bundle
      </h3>
      <p className="text-gray-600 text-sm mt-2 mb-4 text-center">
        A perfect balance of taste & wellness — ideal for couples or daily snacking.
      </p>

      <p className="text-xl font-bold text-cocoa mb-6">Rs 1,150</p>

      <button className="w-full bg-cocoa text-white py-3 rounded-lg font-medium 
                         hover:bg-cocoa/90 transition shadow-md">
        Add to Cart
      </button>
    </div>

    TRIO BUNDLE
    <div className="group relative bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] 
                    p-8 flex flex-col items-center transform transition duration-300 hover:-translate-y-2 hover:shadow-xl">

      Ribbon
      <div className="absolute top-4 left-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-md shadow">
        Free Delivery
      </div>

      <img
        src="/trio.png"
        alt="Trio Bundle"
        className="w-52 h-52 object-contain transition duration-300 group-hover:scale-105"
      />

      <h3 className="text-2xl font-semibold text-cocoa mt-5">
        Family Trio Pack
      </h3>
      <p className="text-gray-600 text-sm mt-2 mb-4 text-center">
        A wholesome triple pack made for families, gifting, and weekly rituals.
      </p>

      <p className="text-xl font-bold text-cocoa mb-6">Rs 1,650</p>

      <button className="w-full bg-cocoa text-white py-3 rounded-lg font-medium 
                         hover:bg-cocoa/90 transition shadow-md">
        Add to Cart
      </button>
    </div>

  </div>
</section> */}

      <section className="mt-20 relative px-6 py-16 bg-gradient-to-br from-[#f7f5ef] to-[#ecefe6] rounded-3xl overflow-hidden">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2
            className='text-3xl md:text-4xl font-black font-serif text-gold'
          //className="text-3xl md:text-4xl font-bold text-cocoa"
          >Refyline Signature Bundles</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Elevate your healthy chocolate ritual with our handcrafted bundles —
            made for sharing, gifting, and upgrading your daily wellness routine.
          </p>
        </div>

        {/* Bundle Cards */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* DUO BUNDLE */}
          <div className=" p-6 px-8 relative overflow-hidden">
            {/* Product Image */}
            <div className="flex justify-center">
              <img
                src="/nutriball_1.png"
                alt="Duo Bundle"
                className="w-56 h-auto object-contain rounded-t-2xl"
              />
            </div>

            {/* Golden Ribbon */}
            <div className="flex justify-center -mt-52">
              <img
                src="/duo-bundle2.png"
                alt="Save Rs 100"
                className="w-96 select-none pointer-events-none"
              />
            </div>

            {/* Content */}
            <div className="text-center -mt-20">
              <h3 className="text-2xl font-semibold text-cocoa">The Perfect Pair</h3>
              <p className="text-gray-600 mt-2">
                A perfect balance for healthy indulgence perfect for couples.
                Share the indulgence with your special someone. Get 75% OFF your delivery!
              </p>

              <p className="text-xl font-bold text-cocoa mt-4">PKR 2,800 Only</p>

              {/* CTA */}
              <div className="flex items-center ml-10 gap-4 mt-3">

                {/* QTY SELECTOR */}
                <div className="flex items-center gap-2 border rounded-full px-3 py-2">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="px-3 text-xl font-bold"
                  >
                    -
                  </button>

                  <div className="px-4 font-semibold text-lg">{qty}</div>

                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="px-3 text-xl font-bold"
                  >
                    +
                  </button>
                </div>

                {/* ADD TO CART (ICON BUTTON) */}
                <button
                  className="
      flex items-center gap-2
      px-6 py-2.5 outline-1
      outline-cocoa text-cocoa
      rounded-full
      shadow-md
      hover:bg-cocoa hover:text-gold transition

    "
                >
                  <ShoppingCart size={24} />

                </button>

                {/* BUY NOW (GOLD BUTTON) */}
                <button
                  className="
      px-6 py-3
      rounded-full
      bg-gold text-black
      font-semibold
      shadow-lg
      hover:brightness-90 transition
    "
                >
                  Buy Now
                </button>
              </div>

              {/* <div className="flex items-center gap-4 mt-3">
    <div className="flex items-center gap-2 border rounded p-2">
      <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3">-</button>
      <div className="px-4 font-semibold">{qty}</div>
      <button onClick={() => setQty(q => q + 1)} className="px-3">+</button>
    </div>

    <button className="btn-gold px-6 py-3 rounded-full">Add to cart</button>
    <button className="px-6 py-3 border rounded-full">Buy now</button>
  </div> */}
              {/* <button className="mt-5 w-full bg-cocoa text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#4a2615] transition">
          Add to Cart
        </button> */}
            </div>
          </div>

          <div className=" p-6 px-8 relative overflow-hidden">
            {/* Product Image */}
            <div className="flex justify-center">
              <img
                src="/nutriball_1.png"
                alt="Duo Bundle"
                className="w-56 h-auto object-contain rounded-t-2xl"
              />
            </div>

            {/* Golden Ribbon */}
            <div className="flex justify-center -mt-52">
              <img
                src="/trio-bundle.png"
                alt="Save Rs 100"
                className="w-96 select-none pointer-events-none"
              />
            </div>

            {/* Content */}
            <div className="text-center -mt-20">
              <h3 className="text-2xl font-semibold text-cocoa">The Ultimate Value</h3>
              <p className="text-gray-600 mt-2">
                A wholesome triple pack made for families, gifting, and weekly rituals.
                For family gatherings—indulge three times over and we’ll cover the delivery. FREE SHIPPING!
              </p>

              <p className="text-xl font-bold text-cocoa mt-4">PKR 4350 Only</p>

              {/* CTA */}
              <div className="flex items-center ml-10 gap-4 mt-3">

                {/* QTY SELECTOR */}
                <div className="flex items-center gap-2 border rounded-full px-3 py-2">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="px-3 text-xl font-bold"
                  >
                    -
                  </button>

                  <div className="px-4 font-semibold text-lg">{qty}</div>

                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="px-3 text-xl font-bold"
                  >
                    +
                  </button>
                </div>

                {/* ADD TO CART (ICON BUTTON) */}
                <button
                  className="
      flex items-center gap-2
      px-6 py-2.5 outline-1
      outline-cocoa text-cocoa
      rounded-full
      shadow-md
      hover:bg-cocoa hover:text-gold transition

    "
                >
                  <ShoppingCart size={24} />

                </button>

                {/* BUY NOW (GOLD BUTTON) */}
                <button
                  className="
      px-6 py-3
      rounded-full
      bg-gold text-black
      font-semibold
      shadow-lg
      hover:brightness-90 transition
    "
                >
                  Buy Now
                </button>
              </div>
              {/* <div className="flex items-center gap-4 mt-3">
    <div className="flex items-center gap-2 border rounded p-2">
      <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3">-</button>
      <div className="px-4 font-semibold">{qty}</div>
      <button onClick={() => setQty(q => q + 1)} className="px-3">+</button>
    </div>

    <button className="btn-gold px-6 py-3 rounded-full">Add to cart</button>
    <button className="px-6 py-3 border rounded-full">Buy now</button>
  </div> */}
            </div>
          </div>

          {/* TRIO BUNDLE */}


        </div>
      </section>


      {/* Reviews list */}
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl text-gold font-semibold">Customer Reviews</h2>
          <button onClick={() => setShowStepper(true)} className="btn-gold px-5 py-2 rounded-full">Write a review</button>
        </div>

        <ReviewsList />
      </section>

      {showStepper && <ReviewStepper onClose={() => setShowStepper(false)} />}
    </main>
  );
}
