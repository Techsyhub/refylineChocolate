// import { PieChart, Pie, Tooltip, Cell } from "recharts";

// export default function ProductChart({ data }) {
//   return (
//     <div className="p-4 bg-white rounded shadow">
//       <h2 className="font-bold mb-2">Product Wise Orders</h2>

//       <PieChart width={400} height={300}>
//         <Pie data={data} dataKey="totalOrders" nameKey="productName" cx="50%" cy="50%" outerRadius={100}>
//           {data.map((_, i) => (<Cell key={i} />))}
//         </Pie>
//         <Tooltip />
//       </PieChart>
//     </div>
//   );
// }


// app/admin/dashboard/components/ProductChart.client.tsx
"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ProductChart({ data }: { data: { productId: string; name: string; totalQty: number }[] }) {
  // recharts expects array of { name, value }
  const chartData = data.map(d => ({ name: d.name, value: d.totalQty }));

  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#1f6feb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
