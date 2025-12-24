"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { ClipboardSignature, LayoutDashboard, LucideSquareAsterisk, ShoppingBag, UserCircle2Icon } from "lucide-react";
import Image from "next/image";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();


  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!res.ok) throw new Error("Logout failed");

      toast.success("Logged out successfully");
      router.replace("/auth/admin_login"); // or "/login"
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex h-screen overflow-x-hidden bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white w-20 p-6 transition-all duration-300 ${
          sidebarOpen ? "block" : "hidden"
        } md:block`}
      >
        {/* <h2 className="text-2xl font-bold mb-6">Admin Panel</h2> */}
        <nav className="flex items-center  justify-center flex-col gap-3">
          <Link
            href="/admin/dashboard"
            className="py-2 px-3 rounded text-white hover:bg-gray-700"
          >
            <LayoutDashboard size={20}/>
          </Link>
          <Link
            href="/admin/orders"
            className="py-2 px-3 rounded hover:bg-gray-700"
          >
          <ClipboardSignature size={20}/>
          </Link>
          <Link
            href="/admin/customers"
            className="py-2 px-3 rounded hover:bg-gray-700"
          >
            <UserCircle2Icon size={20}/>
          </Link>
            <Link
            href="/admin/reviews"
            className="py-2 px-3 rounded hover:bg-gray-700"
          >
            <LucideSquareAsterisk size={20}/>
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex w-[95%] flex-col">
        {/* Navbar */}
        <header className="bg-white p-4 flex  justify-between items-center shadow">
          <button
            className="md:hidden px-2 py-1 bg-gray-800 text-white rounded"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "Close" : "Menu"}
          </button>
          <h1 className="text-xl font-bold">Admin Panel</h1>
          {/* <Image src={"/logo.png"} width={150} height={80} alt="logo" /> */}
          <button onClick={handleLogout} className="px-3 py-1 bg-red-500 text-white rounded">
            Logout
          </button>
        </header>
        <Toaster position="top-right" />
        {/* Page content */}
        <main className="p-6 overflow-y-auto flex-1">{children}</main>
      </div>
    </div>
  );
}
