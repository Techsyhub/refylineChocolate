// interface AnalyticsProps {
//   totalOrders: number;
//   totalCustomers: number;
//   pendingOrders: number;
//   confirmedOrders: number;
//   dispatchOrders: number;
//   cancelledOrders: number;
//   deliveredOrders: number;
// }

// export default function Analytics({ totalOrders, totalCustomers, pendingOrders, confirmedOrders , cancelledOrders, dispatchOrders, deliveredOrders}: AnalyticsProps) {
//   return (
//     <>
//       <div className="grid grid-cols-4 gap-4">
//       <div className="p-4 bg-gold/80 rounded shadow">
//         <h2>Total Orders</h2>
//         <p className="text-xl font-bold">{totalOrders}</p>
//       </div>
//       <div className="p-4 bg-gold  rounded shadow">
//         <h2>Total Customers</h2>
//         <p className="text-xl font-bold">{totalCustomers}</p>
//       </div>
//       <div className="p-4 bg-yellow-100 rounded shadow">
//         <h2>Pending Orders</h2>
//         <p className="text-xl font-bold">{pendingOrders}</p>
//       </div>
//       <div className="p-4 bg-cocoa/80  text-cream rounded shadow">
//         <h2>Confirmed Orders</h2>
//         <p className="text-xl font-bold">{confirmedOrders}</p>
//       </div>
//     </div>
    
//      <div className="grid grid-cols-4 gap-4">
//       <div className="p-4 bg-gray-100 rounded shadow">
//         <h2>Cancelled Orders Orders</h2>
//         <p className="text-xl font-bold">{cancelledOrders}</p>
//       </div>
//       <div className="p-4 bg-blue-500 text-white rounded shadow">
//         <h2>Dispatched Orders</h2>
//         <p className="text-xl font-bold">{dispatchOrders}</p>
//       </div>
//       <div className="p-4 bg-green-700 text-white rounded shadow">
//         <h2>Completed Orders</h2>
//         <p className="text-xl font-bold">{deliveredOrders}</p>
//       </div>
//       {/* <div className="p-4 bg-gray-100 rounded shadow">
//         <h2>Confirmed Orders</h2>
//         <p className="text-xl font-bold">{confirmedOrders}</p>
//       </div> */}
//     </div>
//     </>
   
//   );
// }



// app/admin/dashboard/components/AnalyticsCards.tsx
export default function AnalyticsCards({
  totalOrders,
  totalCustomers,
  pendingOrders,
  confirmedOrders,
  dispatchOrders,
  cancelledOrders,
  deliveredOrders,
}: {
  totalOrders: number;
  totalCustomers: number;
  pendingOrders: number;
  confirmedOrders: number;
  dispatchOrders: number;
  cancelledOrders: number;
  deliveredOrders: number;
}) {
  return (
    // <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
    //   <div className="p-4 bg-white rounded shadow">
    //     <div className="text-sm text-gray-500">Total Orders</div>
    //     <div className="text-2xl font-bold">{totalOrders}</div>
    //   </div>

    //   <div className="p-4 bg-white rounded shadow">
    //     <div className="text-sm text-gray-500">Total Customers</div>
    //     <div className="text-2xl font-bold">{totalCustomers}</div>
    //   </div>

    //   <div className="p-4 bg-white rounded shadow">
    //     <div className="text-sm text-gray-500">Pending Orders</div>
    //     <div className="text-2xl font-bold">{pendingOrders}</div>
    //   </div>

    //   <div className="p-4 bg-white rounded shadow">
    //     <div className="text-sm text-gray-500">Confirmed Orders</div>
    //     <div className="text-2xl font-bold">{confirmedOrders}</div>
    //   </div>
    // </div>

    



    //  return (
    <div >
      <div className="grid grid-cols-4 gap-4">
      <div className="p-4 bg-gold/80 rounded shadow">
        <h2>Total Orders</h2>
        <p className="text-xl font-bold">{totalOrders}</p>
      </div>
      <div className="p-4 bg-gold  rounded shadow">
        <h2>Total Customers</h2>
        <p className="text-xl font-bold">{totalCustomers}</p>
      </div>
      <div className="p-4 bg-yellow-100 rounded shadow">
        <h2>Pending Orders</h2>
        <p className="text-xl font-bold">{pendingOrders}</p>
      </div>
      <div className="p-4 bg-cocoa/80  text-cream rounded shadow">
        <h2>Confirmed Orders</h2>
        <p className="text-xl font-bold">{confirmedOrders}</p>
      </div>
    </div>
    
     <div className="grid grid-cols-4 mt-4 gap-4">
      <div className="p-4 bg-gray-100 rounded shadow">
        <h2>Cancelled Orders Orders</h2>
        <p className="text-xl font-bold">{cancelledOrders}</p>
      </div>
      <div className="p-4 bg-blue-500 text-white rounded shadow">
        <h2>Dispatched Orders</h2>
        <p className="text-xl font-bold">{dispatchOrders}</p>
      </div>
      <div className="p-4 bg-green-700 text-white rounded shadow">
        <h2>Completed Orders</h2>
        <p className="text-xl font-bold">{deliveredOrders}</p>
      </div>
      {/* <div className="p-4 bg-gray-100 rounded shadow">
        <h2>Confirmed Orders</h2>
        <p className="text-xl font-bold">{confirmedOrders}</p>
      </div> */}
    </div>
    </div>
   
  );
}
