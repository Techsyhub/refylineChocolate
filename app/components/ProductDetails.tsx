"use client";
import { useState } from 'react';
import Tabs from './Tabs';
import ReviewsList from './ReviewsList';
import ReviewStepper from './ReviewStepper';
import clsx from 'clsx';
import ProductSlider from './ProductSlider';
import { ShoppingCart } from 'lucide-react';
import { useCart } from "../context/CartContext";
import { useCartDrawer } from "../context/CartDrawerContext";


  const singleProduct = {
    id: "single-1",
    name: "Refyline Healthy NutriBar",
    sellingPrice:1950 ,
    price: 1450,
    image: "/nutriball_1.png",
  };

  const duoBundle = {
    id: "duo-1",
    name: "The Perfect Pair",
    sellingPrice:3900 ,
    price: 2800,
    image: "/nutriball_1.png",
  };

  const trioBundle = {
    id: "trio-1",
    name: "Trio Family Pack",
    sellingPrice:5850 ,
    price: 4350,
    image: "/nutriball_1.png",
  };

export default function ProductDetails() {
  const { addToCart, cart, updateQty } = useCart();
  const { openCart } = useCartDrawer();
  const [qty, setQty] = useState(1);
  const [duoQty, setDuoQty] = useState(1);
  const [trioQty, setTrioQty] = useState(1);
  const singleInCart = cart.find(i => i.id === singleProduct.id);
  const singleValue = singleInCart ? singleInCart.qty : qty;

  const duoInCart = cart.find(i => i.id === duoBundle.id); 
  const duoValue = duoInCart ? duoInCart.qty : duoQty;

  const trioInCart = cart.find(i => i.id === trioBundle.id);
  const trioValue = trioInCart ? trioInCart.qty : trioQty;


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
            {singleProduct.name}
          </h1>

          <div className="flex items-center gap-6">
            <div>
              <div className="flex items-center gap-2 text-gold">
                <div className="text-xl">★★★★★</div>
                <div className="text-sm text-accent">(287)</div>
              </div>
              <div className="text-3xl font-semibold text-cocoa mt-2">Rs. {singleProduct.price}</div>
              <div className="text-sm line-through text-gray-400">Rs. {singleProduct.sellingPrice}</div>
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
              <button onClick={() => {
                const newQty = Math.max(1, singleValue - 1);
                singleInCart ? updateQty(singleProduct.id, newQty) : setQty(newQty);
              }} className="px-3">-</button>
              <div className="px-4 font-semibold">{singleValue}</div>
              <button onClick={() => {
                const newQty = singleValue + 1;
                singleInCart ? updateQty(singleProduct.id, newQty) :  addToCart( singleProduct,1);
              }} className="px-3">+</button>
            </div>
 {/* <button
                onClick={()=>openCart()}
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

                </button> */}
            <button 
            onClick={()=>openCart()}
            className="btn-gold px-6 py-3 flex items-center justify-center gap-2 text-cocoa hover:opacity-85 rounded-full"
            //  onClick={() => {
            //    const newQty = Math.max(1, singleValue + 1);
            //         singleInCart ? updateQty(singleProduct.id, newQty) : addToCart( singleProduct,newQty);
            // }}
            >
               <ShoppingCart className='text-black' size={22} />

              <p className='text-black font-semibold'>View Cart</p>
            </button>
            {/* <button className="px-6 py-3 border rounded-full">Buy now</button> */}
          </div>

          <Tabs />
        </div>

      </div>


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
              <h3 className="text-2xl font-semibold text-cocoa">{duoBundle.name}</h3>
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
                  onClick={() => {
                    const newQty = Math.max(1, duoValue - 1);
                    duoInCart ? updateQty(duoBundle.id, newQty) : setDuoQty(newQty);
                  }}
                    className="px-3 text-xl font-bold"
                  >
                    -
                  </button>

                  <div className="px-4 font-semibold text-lg">{duoValue}</div>

                  <button
                    onClick={() => {
                    const newQty = Math.max(1, duoValue + 1);
                    duoInCart ? updateQty(duoBundle.id, newQty) : addToCart(duoBundle,1);
                  }}
                    className="px-3 text-xl font-bold"
                  >
                    +
                  </button>
                </div>

                {/* ADD TO CART (ICON BUTTON) */}
                <button
                onClick={()=>openCart()}
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
                   onClick={() => {
                      const newQty = Math.max(1, trioValue - 1);
                      trioInCart ? updateQty(trioBundle.id, newQty) : setTrioQty(newQty);
                    }}
                    className="px-3 text-xl font-bold"
                  >
                    -
                  </button>

                  <div className="px-4 font-semibold text-lg">{trioValue}</div>

                  <button
                   onClick={() => {
                      const newQty = trioValue + 1;
                      trioInCart ? updateQty(trioBundle.id, newQty) :addToCart(trioBundle, 1);
                     
                    }}
                    className="px-3 text-xl font-bold"
                  >
                    +
                  </button>
                </div>

                {/* ADD TO CART (ICON BUTTON) */}
                <button
                onClick={()=>openCart()}
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
