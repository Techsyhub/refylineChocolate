'use client';

import { reviews } from "../constants/reviews";

export default function ReviewsList(){
  // const dummy = Array.from({length:12}, (_,i) => ({
  //   id:i, name:`Customer ${i+1}`, text:`This product is wonderful — example review ${i+1}`, rating: Math.floor(Math.random()*2)+4
  // }));

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      {reviews.map(r=>(
       <article key={r.id} className="card p-4">
          <div className="flex items-center justify-between">
    <div className="text-gold">
      {Array.from({ length: r.rating }).map((_, i) => (
        <span key={i}>★</span>
      ))}
    </div>

  </div>

    <div className="text-normal font-semibold  text-primary">{r.name}</div>


  <p className="mt-2 text-sm text-gray-700">{r.review}</p>
</article>

      ))}
    </div>
  );
}
