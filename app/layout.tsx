// import Navbar from './components/Navbar';
// import ParallaxChocolate from './components/ParallaxChocolate';
// import './globals.css';

// export const metadata = {
//   title: 'Refyline — Healthy Luxury Chocolate',
//   description: 'Refyline product details',
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <head>
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Inter:wght@300;400;600;700&family=Pacifico&display=swap" rel="stylesheet" />
//       </head>

//       <body>
//         <div className="min-h-screen text-accent relative">

//           {/* PARALLAX BG */}
//           <ParallaxChocolate />

//           {/* NAVBAR */}
//           <Navbar />

//           {/* PAGE CONTENT */}
//           <main className="relative z-10 pt-28">
//             {children}
//           </main>
          
//         </div>
//       </body>
//     </html>
//   );
// }


import Navbar from './components/Navbar';
import ParallaxChocolate from './components/ParallaxChocolate';
import Footer from './components/Footer';
import './globals.css';

export const metadata = {
  title: 'Refyline — Healthy Luxury Chocolate',
  description: 'Refyline product details',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Inter:wght@300;400;600;700&family=Pacifico&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="text-accent bg-cream relative">
        
        {/* PARALLAX BACKGROUND */}
        <ParallaxChocolate />

        {/* OVERLAY CONTENT */}
        <div className="relative z-10">

          {/* NAVBAR */}
          <Navbar />

          {/* MAIN CONTENT */}
          <main className="pt-28">
            {children}
          </main>

          {/* GRADIENT TRANSITION INTO FOOTER */}
          <div className="h-24 from-transparent to-cocoa"></div>

          {/* FOOTER */}
          <Footer />
        </div>

      </body>
    </html>
  );
}

