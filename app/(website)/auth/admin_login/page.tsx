"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

     if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    setLoading(true);

    const res = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({ email, password, action:"login" }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (data.success) {
       setLoading(false);
       // set cookie in response
      // localStorage.setItem("token", data.token); // store JWT
      router.push("/admin/dashboard");
    } else {
       setLoading(false);
      toast.error(data.error || "Invalid credentials");
      // alert(data.error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-cream mt-20 p-6 border rounded">
      <h1 className="text-2xl text-center mb-4">Admin Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <button 
        type="submit" 
        disabled={loading}
        className="bg-cocoa text-white p-2 rounded"
        >{loading ? "Logging in..." : "Login"}</button>
      </form>
    </div>
  );
}
