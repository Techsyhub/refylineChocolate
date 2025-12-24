// import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

// export default function CityChart({ data }) {
//   return (
//     <div className="p-4 bg-white rounded shadow">
//       <h2 className="font-bold mb-2">Orders by City</h2>

//       <BarChart width={500} height={300} data={data}>
//         <XAxis dataKey="city" />
//         <YAxis />
//         <Tooltip />
//         <Bar dataKey="totalOrders" />
//       </BarChart>
//     </div>
//   );
// }


// app/admin/dashboard/components/CityChart.client.tsx
"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a4de6c", "#d0ed57"];

export default function CityChart({ data }: { data: { city: string; count: number }[] }) {
  const chartData = data.map(d => ({ name: d.city, value: d.count }));
  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90}>
            {chartData.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
