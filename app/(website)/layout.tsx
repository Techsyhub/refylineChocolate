import Navbar from '@/app/components/Navbar'
import ParallaxChocolate from '@/app/components/ParallaxChocolate'
import Footer from '@/app/components/Footer'
import '@/app/globals.css'
import { CartProvider } from '@/app/context/CartContext'
import { CartDrawerProvider } from '@/app/context/CartDrawerContext'
import CartSidebar from '@/app/components/CardSideBar'
import { Toaster } from 'react-hot-toast';


export const metadata = {
  title: 'Refyline — Healthy Luxury Chocolate',
  description: 'Refyline product details',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
  
 
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
               <Toaster position="top-right" reverseOrder={false} />
            <Footer />
          </div>
</CartDrawerProvider>
        </CartProvider>
   
  );
}