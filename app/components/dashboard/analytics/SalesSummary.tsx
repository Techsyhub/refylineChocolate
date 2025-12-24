// import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

// export default function SalesTrendChart({ data }) {
//   return (
//     <div className="p-4 bg-white rounded shadow">
//       <h2 className="font-bold mb-2">Sales Trend</h2>

//       <LineChart width={600} height={300} data={data}>
//         <XAxis dataKey="date" />
//         <YAxis />
//         <Tooltip />
//         <Line type="monotone" dataKey="total" />
//       </LineChart>
//     </div>
//   );
// }



// app/admin/dashboard/components/SalesSummary.tsx
export default function SalesSummary({ metrics }: { metrics: { byStatus: Record<string, number>; logisticPayoutTotal: number; codTotal: number; totalSales: number } }) {
  const { byStatus, logisticPayoutTotal, codTotal, totalSales } = metrics;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Total Sales</div>
          <div className="text-xl font-bold">PKR {totalSales.toLocaleString()}</div>
        </div>
        <div className="p-3 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Logistic Payouts (to partner)</div>
          <div className="text-xl font-bold">PKR {logisticPayoutTotal.toLocaleString()}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-white rounded shadow">
          <div className="text-sm text-gray-500">COD Total (cash with partner)</div>
          <div className="text-xl font-bold">PKR {codTotal.toLocaleString()}</div>
        </div>

        <div className="p-3 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Sales by status</div>
          <ul className="mt-2">
            {Object.entries(byStatus).map(([k, v]) => (
              <li key={k} className="flex justify-between">
                <span className="capitalize">{k.toLowerCase()}</span>
                <span>PKR {Number(v).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
