import './globals.css'

export const metadata = {
  title: 'Refyline — Healthy Luxury Chocolate',
  description: 'Refyline product details',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-accent bg-cream relative"  suppressHydrationWarning>
       {children}
      </body>
    </html>
  );
}
