import Footer from '@/app/components/Footer'
import '@/app/globals.css'
import { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';


export const metadata = {
  title: 'Refyline — Healthy Luxury Chocolate',
  description: 'Refyline product details',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (   
          <div className="relative z-10">
            {/* NAVBAR */}
               <nav className="absolute top-0 left-0 w-full z-20">
      <div className="
        max-w-7xl mx-auto px-6 py-4
        flex items-center justify-between
        pt-20
        text-white
      ">
        
        {/* LOGO */}
        <div className="absolute left-1/2 -translate-x-1/2">
        <Link href={"/home"}>
         <Image src={"/logo.png"} alt="Refyline-logo" width={250} height={100} />

        </Link>
        </div>

       

      </div>
    </nav>

            {/* MAIN CONTENT */}
            <main className="pt-28">
              {children} 
            </main>

            {/* FOOTER */}
               <Toaster position="top-right" reverseOrder={false} />
            <Footer />
          </div>
  );
}