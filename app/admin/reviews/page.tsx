'use client';
import { useEffect, useState } from "react";

type ReviewWithFiles = {
  id: number;
  rating: number;
  comment?: string;
  customerFirstName: string;
  customerLastName?: string;
  customerEmail: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  files: { id: number; url: string; type: "IMAGE" | "VIDEO" }[];
  createdAt: string;
};

export default function AdminReviews() {
  const [reviews, setReviews] = useState<ReviewWithFiles[]>([]);

  useEffect(() => {
    fetch("/api/reviews/admin")
      .then(res => res.json())
      .then(data => setReviews(data.reviews));
  }, []);

  async function updateStatus(reviewId: number, status: "APPROVED" | "REJECTED") {
    const res = await fetch(`/api/reviews/${reviewId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, status } : r));
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr>
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Customer</th>
            <th className="border px-2 py-1">Rating</th>
            <th className="border px-2 py-1">Comment</th>
            <th className="border px-2 py-1">Files</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(r => (
            <tr key={r.id}>
              <td className="border px-2 py-1">{r.id}</td>
              <td className="border px-2 py-1">{r.customerFirstName} {r.customerLastName} <br /> {r.customerEmail}</td>
              <td className="border px-2 py-1">{r.rating}★</td>
              <td className="border px-2 py-1">{r.comment}</td>
              <td className="border px-2 py-1">
                {r.files.map(f => f.type === "IMAGE" ? <img key={f.id} src={f.url} className="w-16 h-16 object-cover mr-2 inline-block" /> : <video key={f.id} src={f.url} className="w-32 h-20 mr-2 inline-block" controls />)}
              </td>
              <td className="border px-2 py-1">{r.status}</td>
              <td className="border px-2 py-1 flex gap-2">
                {r.status === "PENDING" && (
                  <>
                    <button onClick={() => updateStatus(r.id, "APPROVED")} className="px-2 py-1 bg-green-600 text-white rounded">Approve</button>
                    <button onClick={() => updateStatus(r.id, "REJECTED")} className="px-2 py-1 bg-red-600 text-white rounded">Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
