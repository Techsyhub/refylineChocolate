// import { useState } from 'react';

// export default function Tabs(){
//   const tabs = [
//     {id:'details', label:'Details'},
//     {id:'how', label:'How it Works'},
//     {id:'use', label:'How To Use'},
//     {id:'ingredients', label:'Ingredients'},
//   ];
//   const [active, setActive] = useState('details');

//   return (
//     <div className="mt-6">
//       <div className="flex gap-6 border-b border-gray-200 pb-3">
//         {tabs.map(t=>(
//           <button key={t.id} onClick={()=>setActive(t.id)} className={`pb-2 ${active===t.id ? 'border-b-2 border-gold text-cocoa' : 'text-gray-500'}`}>
//             {t.label}
//           </button>
//         ))}
//       </div>

//       <div className="mt-4 text-gray-700">
//         {active==='details' && <p className='text-sm md:text-base'>Premium cocoa nibs blended with organic nuts and natural sweeteners. Nutrient dense and crafted for taste.</p>}
//         {active==='how' && <p className='text-sm md:text-base'>The formula uses cold-pressed oils and low-temperature tempering to preserve nutrients and flavor.</p>}
//         {active==='use' && <p className='text-sm md:text-base'>Consume 1 bar daily as a snack, best alongside warm tea or coffee.</p>}
//         {active==='ingredients' && <p className='text-sm md:text-base'>Sourced cocoa, organic almonds, coconut sugar, chia seeds, natural vanilla.</p>}
//       </div>
//     </div>
//   );
// }


// 'use client';

// import { useState } from 'react';
// import {
//   Info,
//   Sparkles,
//   Hand,
//   CheckCircle2,
//   Leaf,
//   ShieldAlert
// } from 'lucide-react';

// export default function Tabs() {
//   const tabs = [
//     { id: 'details', label: 'Details' },
//     { id: 'how', label: 'How it Works' },
//     { id: 'use', label: 'How To Use' },
//     { id: 'ingredients', label: 'Ingredients' },
//   ];

//   const [active, setActive] = useState('details');

//   return (
//     <div className="mt-6">
//       {/* TABS */}
//       <div className="flex gap-6 border-b border-gray-300 pb-3">
//         {tabs.map((t) => (
//           <button
//             key={t.id}
//             onClick={() => setActive(t.id)}
//             className={`pb-2 transition-all
//               ${active === t.id
//                 ? 'border-b-2 border-gold text-cocoa font-semibold'
//                 : 'text-gray-500 hover:text-cocoa'
//               }`}
//           >
//             {t.label}
//           </button>
//         ))}
//       </div>

//       {/* CONTENT */}
//       <div className="mt-6 text-gray-700 space-y-5 leading-relaxed">

//         {/* DETAILS */}
//         {active === 'details' && (
//           <div className="space-y-3">
//             <div className="flex items-start gap-2">
//               <Info size={20} className="text-gold mt-1" />
//               <p className='text-sm md:text-base'>
//                 Refyline <strong>NutriBites</strong> are handcrafted premium
//                 energy bites made from <strong>100% natural ingredients</strong> —
//                 including dates, walnuts, seeds, and antioxidant-rich cocoa.
//               </p>
//             </div>

//             <div className="flex items-start gap-2">
//               <CheckCircle2 size={20} className="text-gold mt-1" />
//               <p className='text-sm md:text-base'>
//                 Every bite delivers clean energy, improved focus, and deep nourishment
//                 without refined sugar or preservatives.
//               </p>
//             </div>

//             <div className="flex items-start gap-2">
//               <CheckCircle2 size={20} className="text-gold mt-1" />
//               <p className='text-sm md:text-base'>
//                 Each box contains <strong>8 NutriBites (250g)</strong> — crafted to
//                 elevate your daily wellness ritual.
//               </p>
//             </div>
//           </div>
//         )}

//         {/* HOW IT WORKS */}
//         {active === 'how' && (
//           <div className="space-y-4">
//             <div className="flex items-center gap-2">
//               <Sparkles size={20} className="text-gold" />
//               <h3 className="font-semibold text-cocoa">The Refyline Method</h3>
//             </div>

//             <p className='text-sm md:text-base'>
//               NutriBites are produced using a <strong>cold-process technique</strong>
//               that preserves natural nutrients, healthy fats, minerals, and antioxidants.
//             </p>

//             <ul className="space-y-3">
//               {[
//                 'Dates provide slow-release natural glucose.',
//                 'Walnuts give Omega-3 for brain & heart health.',
//                 'Seeds add fiber, magnesium, and minerals.',
//                 'Dark chocolate boosts antioxidants and rich flavor.'
//               ].map((item, i) => (
//                 <li key={i} className="flex items-start gap-2">
//                   <CheckCircle2 size={18} className="text-gold mt-1" />
//                   {item}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* HOW TO USE */}
//         {active === 'use' && (
//           <div className="space-y-4">
//             <div className="flex items-center gap-2">
//               <Hand size={20} className="text-gold" />
//               <h3 className="font-semibold text-cocoa">Daily Usage Guide</h3>
//             </div>

//             <ul className="space-y-2">
//               <li className="flex items-start gap-2">
//                 <CheckCircle2 size={18} className="text-gold mt-1" />
//                 <strong>Kids (4+):</strong> 1 NutriBite
//               </li>
//               <li className="flex items-start gap-2">
//                 <CheckCircle2 size={18} className="text-gold mt-1" />
//                 <strong>Adults:</strong> 1–2 NutriBites
//               </li>
//               <li className="flex items-start gap-2">
//                 <CheckCircle2 size={18} className="text-gold mt-1" />
//                 <strong>Athletes:</strong> 2–3 NutriBites
//               </li>
//               <li className="flex items-start gap-2">
//                 <CheckCircle2 size={18} className="text-gold mt-1" />
//                 <strong>Diabetics:</strong> Max 1 NutriBite (count as carb serving)
//               </li>
//             </ul>

//             <p className='text-sm md:text-base'>
//               For the <strong>best texture and crunch</strong>, enjoy your NutriBites
//               slightly chilled.
//             </p>

//             <div className="flex items-start gap-2 text-red-600">
//               <ShieldAlert size={18} className="mt-1" />
//               <p className="text-sm">
//                 For children under 4 years, crush or blend the NutriBite to prevent choking.
//               </p>
//             </div>
//           </div>
//         )}

//         {/* INGREDIENTS */}
//         {active === 'ingredients' && (
//           <div className="space-y-3">
//             <div className="flex items-center gap-2">
//               <Leaf size={20} className="text-gold" />
//               <h3 className="font-semibold text-cocoa">100% Natural Ingredients</h3>
//             </div>

//             <ul className="space-y-2">
//               {[
//                 'Premium Dates (Natural sweetness)',
//                 'Walnuts (Omega-3 rich)',
//                 'Almonds (Protein + healthy fats)',
//                 'Pumpkin Seeds (Magnesium)',
//                 'Sesame & Flax Seeds (Fiber + minerals)',
//                 'Dark Chocolate & Cocoa (Antioxidants)',
//                 'Cinnamon (Metabolism support)'
//               ].map((item, i) => (
//                 <li key={i} className="flex items-start gap-2">
//                   <Leaf size={18} className="text-gold mt-1" />
//                   {item}
//                 </li>
//               ))}
//             </ul>

//             <div className="flex items-start gap-2 text-red-600 mt-2">
//               <ShieldAlert size={18} className="mt-1" />
//               <p className="text-sm">Contains nuts & seeds. Not suitable for nut allergies.</p>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }


// 'use client';

// import { useState } from 'react';
// import {
//   Info,
//   Sparkles,
//   Hand,
//   CheckCircle2,
//   Leaf,
//   ShieldAlert,
//   HeartPulse,
//   Brain,
//   Dumbbell,
//   Baby,
//   User,
//   ShieldCheck
// } from 'lucide-react';

// export default function Tabs() {
//   const tabs = [
//     { id: 'details', label: 'Details' },
//     { id: 'benefits', label: 'Benefits' },
//     // { id: 'how', label: 'How it Works' },
//     { id: 'use', label: 'How To Use' },
//     { id: 'ingredients', label: 'Ingredients' },
//   ];

//   const [active, setActive] = useState('details');

//   return (
//     <div className="mt-6">
//       {/* TABS */}
//       <div className="flex gap-6 border-b border-gray-300 pb-3 overflow-x-auto">
//         {tabs.map((t) => (
//           <button
//             key={t.id}
//             onClick={() => setActive(t.id)}
//             className={`pb-2 whitespace-nowrap transition-all
//               ${active === t.id
//                 ? 'border-b-2 border-gold text-cocoa font-semibold'
//                 : 'text-gray-500 hover:text-cocoa'
//               }`}
//           >
//             {t.label}
//           </button>
//         ))}
//       </div>

//       {/* CONTENT */}
//       <div className="mt-6 text-gray-700 space-y-5 leading-relaxed">

//         {/* DETAILS */}
//         {active === 'details' && (
//           <div className="space-y-3">
//             <div className="flex items-start gap-2">
//               <Info size={20} className="text-gold mt-1" />
//               <p className='text-sm md:text-base'>
//                 Refyline <strong>NutriBites</strong> are handcrafted premium
//                 energy bites made from <strong>100% natural ingredients</strong>.
//               </p>
//             </div>

//             <div className="flex items-start gap-2">
//               <CheckCircle2 size={20} className="text-gold mt-1" />
//               <p className='text-sm md:text-base'>
//                 Nutrient-dense blend of dates, nuts, seeds & dark chocolate —
//                 designed for clean energy & daily nourishment.
//               </p>
//             </div>

//             <div className="flex items-start gap-2">
//               <CheckCircle2 size={20} className="text-gold mt-1" />
//               <p className='text-sm md:text-base'>
//                 Each box contains <strong>8 NutriBites (250g)</strong>.
//               </p>
//             </div>
//           </div>
//         )}

//         {/* BENEFITS TABLE */}
//         {active === 'benefits' && (
//           <div className="space-y-6">

//             <h3 className="text-xl font-semibold text-cocoa flex items-center gap-2">
//               <HeartPulse className="text-gold" size={22} />
//               Daily Benefits by Lifestyle
//             </h3>

//             <div className="overflow-hidden rounded-xl bg-white shadow-md border border-gold/20">
//               <table className="w-full text-left">
//                 <thead className="bg-gold text-black font-semibold">
//                   <tr>
//                     <th className="py-3 px-4">Demographic</th>
//                     <th className="py-3 px-4">Daily Dose</th>
//                     <th className="py-3 px-4">Primary Benefits</th>
//                   </tr>
//                 </thead>

//                 <tbody className="text-gray-700">

//                   <tr className="border-b border-gray-200">
//                     <td className="py-4 px-4 flex items-center gap-2">
//                       <Baby size={18} className="text-gold" />
//                       Kids (4+ years)
//                     </td>
//                     <td className="py-4 px-4">1 NutriBite</td>
//                     <td className="py-4 px-4">Growth, concentration, stronger bones</td>
//                   </tr>

//                   <tr className="border-b border-gray-200">
//                     <td className="py-4 px-4 flex items-center gap-2">
//                       <User size={18} className="text-gold" />
//                       Youngsters & Men
//                     </td>
//                     <td className="py-4 px-4">1–2 NutriBites</td>
//                     <td className="py-4 px-4">Energy, stamina, muscle support</td>
//                   </tr>

//                   <tr className="border-b border-gray-200">
//                     <td className="py-4 px-4 flex items-center gap-2">
//                       <Sparkles size={18} className="text-gold" />
//                       Women
//                     </td>
//                     <td className="py-4 px-4">1–2 NutriBites</td>
//                     <td className="py-4 px-4">Skin glow, hormonal balance, iron support</td>
//                   </tr>

//                   <tr className="border-b border-gray-200">
//                     <td className="py-4 px-4 flex items-center gap-2">
//                       <Brain size={18} className="text-gold" />
//                       Elderly
//                     </td>
//                     <td className="py-4 px-4">1 NutriBite</td>
//                     <td className="py-4 px-4">Cognitive support, nutrient density</td>
//                   </tr>

//                   <tr className="border-b border-gray-200">
//                     <td className="py-4 px-4 flex items-center gap-2">
//                       <ShieldCheck size={18} className="text-gold" />
//                       Diabetic
//                     </td>
//                     <td className="py-4 px-4">Max 1 NutriBite</td>
//                     <td className="py-4 px-4">Stable sugar levels (count as carb serving)</td>
//                   </tr>

//                   <tr>
//                     <td className="py-4 px-4 flex items-center gap-2">
//                       <Dumbbell size={18} className="text-gold" />
//                       Athletes
//                     </td>
//                     <td className="py-4 px-4">2–3 NutriBites</td>
//                     <td className="py-4 px-4">Recovery, strength, high energy fuel</td>
//                   </tr>

//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* HOW IT WORKS */}
//         {/* {active === 'how' && (
//           <div className="space-y-4">
//             <div className="flex items-center gap-2">
//               <Sparkles size={20} className="text-gold" />
//               <h3 className="font-semibold text-cocoa">The Refyline Method</h3>
//             </div>

//             <p className='text-sm md:text-base'>
//               NutriBites are crafted using a <strong>cold-press technique</strong> to preserve maximum nutrients & natural sweetness.
//             </p>

//             <ul className="space-y-3">
//               {[
//                 'Slow-release natural energy from dates',
//                 'Omega-3 from walnuts for brain & heart',
//                 'Fiber-rich seeds for digestion',
//                 'Antioxidants from dark chocolate'
//               ].map((item, i) => (
//                 <li key={i} className="flex items-start gap-2">
//                   <CheckCircle2 size={18} className="text-gold mt-1" />
//                   {item}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )} */}

//         {/* HOW TO USE */}
//         {active === 'use' && (
//           <div className="space-y-4">
//             <div className="flex items-center gap-2">
//               <Hand size={20} className="text-gold" />
//               <h3 className="font-semibold text-cocoa">Daily Usage Guide</h3>
//             </div>

//             <p className='text-sm md:text-base'>For best texture & crispness, enjoy chilled.</p>

//             <ul className="space-y-2">
//               <li className="flex items-start gap-2">
//                 <CheckCircle2 size={18} className="text-gold mt-1" />
//                 Ideal as a mid-day snack or pre-workout fuel.
//               </li>
//             </ul>
//           </div>
//         )}

//         {/* INGREDIENTS */}
//         {active === 'ingredients' && (
//           <div className="space-y-3">
//             <div className="flex items-center gap-2">
//               <Leaf size={20} className="text-gold" />
//               <h3 className="font-semibold text-cocoa">100% Natural Ingredients</h3>
//             </div>

//             <ul className="space-y-2">
//               {[
//                 'Premium Dates',
//                 'Walnuts (Omega-3 rich)',
//                 'Almonds',
//                 'Flaxseed & Pumpkin Seeds',
//                 'Sesame Seeds',
//                 'Dark Chocolate & Cocoa',
//                 'Cinnamon'
//               ].map((item, i) => (
//                 <li key={i} className="flex items-start gap-2">
//                   <Leaf size={18} className="text-gold mt-1" />
//                   {item}
//                 </li>
//               ))}
//             </ul>

//             <div className="flex items-start gap-2 text-red-600 mt-2">
//               <ShieldAlert size={18} className="mt-1" />
//               <p className="text-sm">Contains nuts & seeds. Avoid if allergic.</p>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import { Leaf, Flame, Brain, Shield, Heart, Droplets } from 'lucide-react';
import {
  Info,
  Sparkles,
  Hand,
  CheckCircle2,
 
  ShieldAlert,
  HeartPulse,
  Dumbbell,
  Baby,
  User,
  ShieldCheck
} from 'lucide-react';

export default function Tabs() {
  const tabs = [
    { id: 'story', label: 'The Refyline Story' },
    // { id: 'how', label: 'How It Works' },
    // { id: 'use', label: 'How To Use' },
    { id: 'benefits', label: 'Benefits & Usage' },

    { id: 'ingredients', label: 'Ingredients' },
  ];

  const [active, setActive] = useState('story');

  return (
    <div className="mt-8">
      {/* TAB BUTTONS */}
      <div className="flex gap-6 border-b border-gray-300 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`pb-2 whitespace-nowrap z-10  ${
              active === t.id
                ? 'border-b-4 border-gold text-cocoa font-semibold'
                : 'text-gray-500 hover:text-cocoa'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="mt-6 px-4 md:px-0 text-gray-700 leading-relaxed space-y-4">

        {/* BRAND STORY */}
        {active === 'story' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-cocoa">Pakistan’s First Healthy Chocolate Ritual</h2>

            <p className='text-sm md:text-base'>
              There was a time when cravings meant guilt. When “healthy snacks” meant compromises.  
              And when Pakistan had no premium chocolate brand of its own — one that was clean,
              honest, beautifully crafted, and made for every age, every lifestyle, every home.
            </p>

            <p className='text-sm md:text-base'>
              So we created <span className="font-semibold text-cocoa">Refyline</span> — a brand born from the belief that
              <span className="font-semibold"> health and taste should never compete.</span>
            </p>

            <p className='text-sm md:text-base'>
              Our NutriBites are handcrafted in small batches using pure dates, nuts, superseeds,
              and rich cocoa — indulgent in flavor yet nourishing for daily wellness.
            </p>

            <p className='text-sm md:text-base'>
              This isn’t just a snack. It’s a ritual — a moment of calm, a mother’s love, a 
              guilt-free treat for diabetics, a partner for your harmonal balance fight and a reliable energy source for students, professionals, athletes, and elders.
            </p>

            <p className="font-semibold text-cocoa">
              Refyline isn’t something you simply eat.  
              It’s something you feel — a healthy future wrapped in chocolate.
            </p>
          </div>
        )}

        {/* HOW IT WORKS */}
        {/* {active === 'how' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-cocoa">How It Works</h2>

            <p className='text-sm md:text-base'>
              Refyline NutriBites are crafted using a low-temperature process that preserves the natural
              nutrients of dates, nuts, and superseeds. Unlike commercial chocolates, we use no
              refined sugar, no preservatives, and no artificial flavors.
            </p>

            <p className='text-sm md:text-base'>
              Every bite provides slow-release energy, brain-boosting Omega-3 fats, essential minerals,
              and antioxidant-rich cocoa — giving your body nourishment that lasts.
            </p>
          </div>
        )} */}

        {/* Benifits And Usage*/}
        {/* {active === 'benefits' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-cocoa">Benifits & Usage</h2>

          
   
           <div className="space-y-6">

             <h3 className="text-xl font-semibold text-cocoa flex items-center gap-2">
               <HeartPulse className="text-gold" size={22} />
               Daily Benefits by Lifestyle
             </h3>

             <div className="overflow-hidden rounded-xl bg-white shadow-md border border-gold/20">
               <table className="w-full text-left">
                 <thead className="bg-gold text-black font-semibold">
                   <tr>
                     <th className="py-3 px-4">Demographic</th>
                     <th className="py-3 px-4">Daily Dose</th>
                     <th className="py-3 px-4">Primary Benefits</th>
                   </tr>
                 </thead>

                 <tbody className="text-gray-700">

                   <tr className="border-b border-gray-200">
                     <td className="py-4 px-4 flex items-center gap-2">
                       <Baby size={18} className="text-gold" />
                       Kids (4+ years)
                     </td>
                     <td className="py-4 px-4">1 NutriBite</td>
                     <td className="py-4 px-4">Growth, concentration, stronger bones</td>
                   </tr>

                   <tr className="border-b border-gray-200">
                     <td className="py-4 px-4 flex items-center gap-2">
                       <User size={18} className="text-gold" />
                       Youngsters & Men
                     </td>
                     <td className="py-4 px-4">1–2 NutriBites</td>
                     <td className="py-4 px-4">Energy, stamina, muscle support</td>
                   </tr>

                   <tr className="border-b border-gray-200">
                     <td className="py-4 px-4 flex items-center gap-2">
                       <Sparkles size={18} className="text-gold" />
                       Women
                     </td>
                     <td className="py-4 px-4">1–2 NutriBites</td>
                     <td className="py-4 px-4">Skin glow, hormonal balance, iron support</td>
                   </tr>

                   <tr className="border-b border-gray-200">
                     <td className="py-4 px-4 flex items-center gap-2">
                       <Brain size={18} className="text-gold" />
                       Elderly
                     </td>
                     <td className="py-4 px-4">1 NutriBite</td>
                     <td className="py-4 px-4">Cognitive support, nutrient density</td>
                   </tr>

                   <tr className="border-b border-gray-200">
                     <td className="py-4 px-4 flex items-center gap-2">
                       <ShieldCheck size={18} className="text-gold" />
                       Diabetic
                     </td>
                     <td className="py-4 px-4">Max 1 NutriBite</td>
                     <td className="py-4 px-4">Stable sugar levels (count as carb serving)</td>
                   </tr>

                   <tr>
                     <td className="py-4 px-4 flex items-center gap-2">
                       <Dumbbell size={18} className="text-gold" />
                       Athletes
                     </td>
                     <td className="py-4 px-4">2–3 NutriBites</td>
                     <td className="py-4 px-4">Recovery, strength, high energy fuel</td>
                   </tr>

                 </tbody>
               </table>
             </div>
           </div>
         
          </div>
        )} */}

        {/* INGREDIENTS */}
        {active === 'ingredients' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-cocoa">Premium Ingredient Story</h2>

            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <Leaf className="text-gold mt-1" />
                <p className='text-sm md:text-base'><strong>Premium Dates</strong> — Natural sweetness rich in fiber & minerals.</p>
              </div>

              <div className="flex gap-3 items-start">
                <Brain className="text-gold mt-1" />
                <p className='text-sm md:text-base'><strong>Walnuts & Almonds</strong> — Omega-3, Vitamin-E & healthy fats for brain and heart health.</p>
              </div>

              <div className="flex gap-3 items-start">
                <Shield className="text-gold mt-1" />
                <p className='text-sm md:text-base'><strong>Pumpkin, Sesame & Flax Seeds</strong> — Strengthen immunity and digestion.</p>
              </div>

              <div className="flex gap-3 items-start">
                <Flame className="text-gold mt-1" />
                <p className='text-sm md:text-base'><strong>Dark Chocolate & Pure Cocoa</strong> — Deep, antioxidant-rich, signature Refyline taste.</p>
              </div>

              <div className="flex gap-3 items-start">
                <Droplets className="text-gold mt-1" />
                <p className='text-sm md:text-base'><strong>Cinnamon & Natural Notes</strong> — Warm, soothing finish with natural aromatics.</p>
              </div>

              <p className="text-sm text-gray-600 pt-2">
                No preservatives. No refined sugar. No artificial flavors.  
                Just clean luxury — the kind your body will thank you for.
              </p>
            </div>
          </div>
        )}

        {/* BENEFITS TABLE */}
        {active === 'benefits' && (
          <div>
            <h2 className="text-xl font-semibold text-cocoa mb-4">Benefits & Usage</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-cream text-cocoa border-b">
                    <th className="p-3 text-left">Demographic</th>
                    <th className="p-3 text-left">Daily Dose</th>
                    <th className="p-3 text-left">Primary Benefits</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b bg-gold/10">
                    <td className="p-3">Kids (4+ years)</td>
                    <td className="p-3">1 NutriBite</td>
                    <td className="p-3">Improves focus & supports healthy growth.</td>
                  </tr>
                  <tr className="border-b ">
                    <td className="p-3">Youngsters & Men</td>
                    <td className="p-3">1–2 NutriBites</td>
                    <td className="p-3">Sustained energy & muscle support.</td>
                  </tr>
                  <tr className="border-b bg-gold/10">
                    <td className="p-3">Women</td>
                    <td className="p-3">1–2 NutriBites</td>
                    <td className="p-3">Hormonal balance & skin health.</td>
                  </tr>
                  <tr className="border-b ">
                    <td className="p-3">Elderly</td>
                    <td className="p-3">1 NutriBite</td>
                    <td className="p-3">Easy nutrient density to support daily strength.</td>
                  </tr>
                  <tr className="border-b bg-gold/10">
                    <td className="p-3">Diabetics</td>
                    <td className="p-3">Max 1 NutriBite</td>
                    <td className="p-3">Slow sugar absorption due to high fiber.</td>
                  </tr>
                  <tr >
                    <td className="p-3">Athletes</td>
                    <td className="p-3">2–3 NutriBites</td>
                    <td className="p-3">Recovery fuel & sustained stamina.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
