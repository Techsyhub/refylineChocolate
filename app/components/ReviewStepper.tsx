
'use client';
import { useState } from 'react';

export default function ReviewStepper({ onClose } : { onClose: ()=>void }) {
  const [step,setStep] = useState(1);
  const [rating,setRating] = useState(0);
  const [files,setFiles] = useState<File[]>([]);
  const [text,setText] = useState('');
  const [first,setFirst] = useState('');
  const [last,setLast] = useState('');
  const [email,setEmail] = useState('');

  function onFiles(e: React.ChangeEvent<HTMLInputElement>){
    if(!e.target.files) return;
    setFiles(prev=>prev.concat(Array.from(e.target.files)));
  }
  function remove(i:number){ setFiles(prev=>prev.filter((_,idx)=>idx!==i)); }

  async function submit(){
    const payload = { rating, text, first, last, email, files: files.map(f=>f.name) };
    try {
      await fetch('/api/reviews', { method:'POST', body: JSON.stringify(payload), headers:{'Content-Type':'application/json'}});
      alert('Review submitted (mock)');
      onClose();
    } catch(err){
      console.error(err);
      alert('Submit failed');
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-amber-950/85 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-cream w-full bg-white max-w-3xl rounded-2xl p-6 relative">
        <button className="absolute top-4 right-4 text-xl" onClick={onClose}>✕</button>

        <div className="flex justify-center gap-3 mb-6">
          {[1,2,3,4].map(s=> <div key={s} className={`w-20 h-2 rounded ${step>=s ? 'bg-amber-950' : 'bg-gray-200'}`} />)}
        </div>

        {step===1 && (
          <div className="text-center">
            <h3 className="text-2xl font-semibold">How would you rate this item?</h3>
            <div className="text-4xl text-gold mt-4">
              {[1,2,3,4,5].map(s=> <button key={s} className={rating>=s ? 'opacity-100' : 'opacity-40'} onClick={()=>setRating(s)}>★</button>)}
            </div>
            <div className="flex justify-end mt-6"><button onClick={()=>setStep(2)} className="btn-gold px-6 py-2 rounded">Next</button></div>
          </div>
        )}

        {step===2 && (
          <div className="text-center">
            <h3 className="text-2xl font-semibold">Add photos / video</h3>
            <input type="file" accept="image/*,video/*" multiple onChange={onFiles} className="mt-4"/>
            <div className="flex gap-2 mt-4 flex-wrap justify-center">
              {files.map((f,idx)=>(
                <div key={idx} className="w-24 h-24 bg-white rounded relative flex items-center justify-center border">
                  <div className="text-xs text-center">{f.name}</div>
                  <button onClick={()=>remove(idx)} className="absolute top-1 right-1 bg-white rounded-full p-1 text-xs">×</button>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <button onClick={()=>setStep(1)} className="px-4 py-2 border rounded">Back</button>
              <div className="flex gap-3">
                <button onClick={()=>{ setFiles([]); setStep(3); }} className="px-4 py-2 border rounded">Skip</button>
                <button onClick={()=>setStep(3)} className="btn-gold px-6 py-2 rounded">Next</button>
              </div>
            </div>
          </div>
        )}

        {step===3 && (
          <div className="text-center">
            <h3 className="text-2xl font-semibold">Tell us more</h3>
            <textarea value={text} onChange={(e)=>setText(e.target.value)} className="w-full max-w-2xl h-40 p-3 border rounded mt-4" />
            <div className="flex justify-between mt-6">
              <button onClick={()=>setStep(2)} className="px-4 py-2 border rounded">Back</button>
              <button onClick={()=>setStep(4)} className="btn-gold px-6 py-2 rounded">Next</button>
            </div>
          </div>
        )}

        {step===4 && (
          <div className="text-center">
            <h3 className="text-2xl font-semibold">Your Info</h3>
            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto mt-4">
              <input placeholder="First name *" value={first} onChange={(e)=>setFirst(e.target.value)} className="p-3 border rounded" />
              <input placeholder="Last name" value={last} onChange={(e)=>setLast(e.target.value)} className="p-3 border rounded" />
              <div className="col-span-2"><input placeholder="Email *" value={email} onChange={(e)=>setEmail(e.target.value)} className="p-3 border rounded w-full" /></div>
            </div>
            <div className="flex justify-between mt-6">
              <button onClick={()=>setStep(3)} className="px-4 py-2 border rounded">Back</button>
              <button onClick={submit} className="btn-gold px-6 py-2 rounded">Submit</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
