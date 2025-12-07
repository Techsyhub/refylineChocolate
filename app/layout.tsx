
// import Navbar from './components/Navbar';
// import ParallaxChocolate from './components/ParallaxChocolate';
// import Footer from './components/Footer';
// import './globals.css';
// import { CartProvider } from './context/CartContext';

// export const metadata = {
//   title: 'Refyline — Healthy Luxury Chocolate',
//   description: 'Refyline product details',
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <head>
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link
//           href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Inter:wght@300;400;600;700&family=Pacifico&display=swap"
//           rel="stylesheet"
//         />
//       </head>

//       <body className="text-accent bg-cream relative">
//          <CartProvider>
        
//         <>
//         {/* PARALLAX BACKGROUND */}
//         <ParallaxChocolate />

//         {/* OVERLAY CONTENT */}
          
//         <div className="relative z-10">

//           {/* NAVBAR */}
//           <Navbar />

//           {/* MAIN CONTENT */}
//           <main className="pt-28">
//             {children}
//           </main>

//           {/* GRADIENT TRANSITION INTO FOOTER */}
//           <div className="h-24 from-transparent to-cocoa"></div>

//           {/* FOOTER */}
//           <Footer />
//         </div>
//         </>
//         </CartProvider>
//       </body>
//     </html>
//   );
// }


import Navbar from './components/Navbar'
import ParallaxChocolate from './components/ParallaxChocolate'
import Footer from './components/Footer'
import './globals.css'
import { CartProvider } from './context/CartContext'
import { CartDrawerProvider } from './context/CartDrawerContext'
import CartSidebar from './components/CardSideBar'

export const metadata = {
  title: 'Refyline — Healthy Luxury Chocolate',
  description: 'Refyline product details',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-accent bg-cream relative">
        <CartProvider>
              <CartDrawerProvider>

          {/* PARALLAX BACKGROUND */}
          <ParallaxChocolate />

          <div className="relative z-10">
            {/* NAVBAR */}
            <Navbar />

            {/* MAIN CONTENT */}
            <main className="pt-28">
              {children}
              <CartSidebar />
            </main>

            {/* FOOTER */}
            <Footer />
          </div>
</CartDrawerProvider>
        </CartProvider>
      </body>
    </html>
  );
}
