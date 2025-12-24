// // 'use client';

// // import { reviews } from "../constants/reviews";

// // export default function ReviewsList(){
// //   // const dummy = Array.from({length:12}, (_,i) => ({
// //   //   id:i, name:`Customer ${i+1}`, text:`This product is wonderful — example review ${i+1}`, rating: Math.floor(Math.random()*2)+4
// //   // }));

// //   return (
// //     <div className="grid md:grid-cols-2 gap-6 mt-6">
// //       {reviews.map(r=>(
// //        <article key={r.id} className="card p-4">
// //           <div className="flex items-center justify-between">
// //     <div className="text-gold">
// //       {Array.from({ length: r.rating }).map((_, i) => (
// //         <span key={i}>★</span>
// //       ))}
// //     </div>

// //   </div>

// //     <div className="text-normal font-semibold  text-primary">{r.name}</div>


// //   <p className="mt-2 text-sm text-gray-700">{r.review}</p>
// // </article>

// //       ))}
// //     </div>
// //   );
// // }


// 'use client';
// import { useEffect, useState } from "react";

// type Review = {
//   id: number;
//   rating: number;
//   comment?: string;
//   customerFirstName: string;
//   customerLastName?: string;
//   createdAt: string;
// };

// // Number of reviews to fetch per page
// const PAGE_SIZE = 4;

// export default function ReviewsList() {
//   const [reviews, setReviews] = useState<Review[]>([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false);

//   async function fetchReviews(page: number) {
//     setLoading(true);
//     try {
//       const res = await fetch(`/api/reviews?status=APPROVED&page=${page}&limit=${PAGE_SIZE}`);
//       const data = await res.json();

//       if (data.reviews.length < PAGE_SIZE) {
//         setHasMore(false); // no more reviews to load
//       }

//       setReviews(prev => [...prev, ...data.reviews]);
//     } catch (err) {
//       console.error("Failed to fetch reviews:", err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchReviews(page);
//   }, [page]);

//   return (
//     <div className="mt-6">
//       <div className="grid md:grid-cols-2 gap-6">
//         {reviews.map(r => (
//           <article key={r.id} className="card p-4 border rounded-lg shadow-sm">
//             <div className="flex items-center justify-between">
//               <div className="text-gold">
//                 {Array.from({ length: r.rating }).map((_, i) => (
//                   <span key={i}>★</span>
//                 ))}
//               </div>
//               <div className="text-sm text-gray-400">
//                 {new Date(r.createdAt).toLocaleDateString()}
//               </div>
//             </div>

//             <div className="text-normal font-semibold text-primary mt-2">
//               {r.customerFirstName} {r.customerLastName || ""}
//             </div>

        
//             <p className="mt-2 text-sm text-gray-700">{r.comment}</p>
//           </article>
//         ))}
//       </div>

//       {hasMore && (
//         <div className="flex justify-center mt-6">
//           <button
//             className="px-4 py-2 border rounded hover:bg-gray-100"
//             onClick={() => setPage(prev => prev + 1)}
//             disabled={loading}
//           >
//             {loading ? "Loading..." : "Load More"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }



'use client';
import Image from "next/image";
import { useEffect, useState } from "react";

type ReviewFile = {
  id: number;
  url: string;
  type: "IMAGE" | "VIDEO";
};

type Review = {
  id: number;
  rating: number;
  comment?: string;
  customerFirstName: string;
  customerLastName?: string;
  createdAt: string;
  files?: ReviewFile[];
};

const PAGE_SIZE = 4;

export default function ReviewsList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  async function fetchReviews(page: number) {
    setLoading(true);
    try {
      const res = await fetch(`/api/reviews?status=APPROVED&page=${page}&limit=${PAGE_SIZE}`);
      const data = await res.json();
      console.log(data)

      if (data.reviews.length < PAGE_SIZE) {
        setHasMore(false);
      }

      setReviews(prev => [...prev, ...data.reviews]);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReviews(page);
  }, [page]);

  return (
    <div className="mt-6">
      <div className="grid md:grid-cols-2 gap-6">
        {reviews.map(r => (
          <article key={r.id} className="card p-4 border rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-gold">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <div className="text-sm text-gray-400">
                {new Date(r.createdAt).toLocaleDateString()}
              </div>
            </div>

            <div className="text-normal font-semibold text-primary mt-2">
              {r.customerFirstName} {r.customerLastName || ""}
            </div>
            <p className="mt-2 text-sm text-gray-700">{r.comment}</p>

           
            {/* Render uploaded files */}
            {r.files && r.files.length > 0 && (
              <div className=" flex flex-wrap gap-2">
                {r.files.map((f,i) => 
                  f.type === "IMAGE" ? (
                   <div key={f.id+r.createdAt+i}>
                     <Image
                      key={f.id}
                      src={f.url}
                      className="-mt-8 object-cover rounded"
                      alt="review image"
                      width={200}
                      height={200}
                    />
                    </div>
                  ) : (
                    <video
                      key={f.id}
                      src={f.url}
                      className="w-32 h-24 rounded"
                      controls
                    />
                  )
                )}
              </div>
            )}

          </article>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            className="px-4 py-2 border rounded hover:bg-gray-100"
            onClick={() => setPage(prev => prev + 1)}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}


