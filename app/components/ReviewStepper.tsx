'use client';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function ReviewStepper({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [text, setText] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');

  function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const file = e.target.files[0];
    if (!file) return;

    // Validate type
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      toast.error('Only images or videos allowed');
      return;
    }

    // Validate size (25MB max)
    if (file.size > 25 * 1024 * 1024) {
      toast.error('File size cannot exceed 25MB');
      return;
    }

    setFiles([file]); // replace previous file
  }


  


  async function submit() {
    // Email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email');
      return;
    }

    const base64Files = await Promise.all(
    files.map(file => new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file); // converts to base64
    }))
  );

    const payload = { rating, text, first, last, email, files: base64Files };

    try {
      await fetch('/api/reviews/add', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      });
      toast.success('Thank You For Sharing your Feedback With US.');
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Submit failed');
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-amber-950/85 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl p-6 relative">
        <button className="absolute top-4 right-4 text-xl" onClick={onClose}>✕</button>

        {/* Stepper */}
        <div className="flex justify-center gap-3 mb-6">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`w-20 h-2 rounded ${step >= s ? 'bg-amber-950' : 'bg-gray-200'}`} />
          ))}
        </div>

        {/* Step 1: Rating */}
        {step === 1 && (
          <div className="text-center">
            <h3 className="text-2xl font-semibold">How would you rate this item?</h3>
            <div className="text-4xl text-gold mt-4">
              {[1, 2, 3, 4, 5].map(s => (
                <button key={s} className={rating >= s ? 'opacity-100' : 'opacity-40'} onClick={() => setRating(s)}>★</button>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <button onClick={() => setStep(2)} className="btn-gold px-6 py-2 rounded">Next</button>
            </div>
          </div>
        )}

        {/* Step 2: File Upload */}
        {step === 2 && (
          <div className="text-center">
            <h3 className="text-2xl font-semibold">Add photos / video</h3>
            
            {!files.length ? (
              <label className="mt-4 inline-flex items-center justify-center w-40 h-40 border-2 border-dashed border-gray-400 cursor-pointer rounded-md">
                <span className="text-3xl font-bold">+</span>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={onFiles}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="mt-4 w-40 h-40 relative">
                {files[0].type.startsWith('image/') ? (
                  <img
                    src={URL.createObjectURL(files[0])}
                    alt="preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <video
                    src={URL.createObjectURL(files[0])}
                    className="w-full h-full rounded-md"
                    controls
                  />
                )}
                <button
                  onClick={() => setFiles([])}
                  className="absolute top-1 right-1 bg-white rounded-full p-1 text-xs border"
                >×</button>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button onClick={() => setStep(1)} className="px-4 py-2 border rounded">Back</button>
              <div className="flex gap-3">
                <button onClick={() => { setFiles([]); setStep(3); }} className="px-4 py-2 border rounded">Skip</button>
                <button onClick={() => setStep(3)} className="btn-gold px-6 py-2 rounded">Next</button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Comment */}
        {step === 3 && (
          <div className="text-center">
            <h3 className="text-2xl font-semibold">Tell us more</h3>
            <textarea value={text} onChange={e => setText(e.target.value)} className="w-full max-w-2xl h-40 p-3 border rounded mt-4" />
            <div className="flex justify-between mt-6">
              <button onClick={() => setStep(2)} className="px-4 py-2 border rounded">Back</button>
              <button onClick={() => setStep(4)} className="btn-gold px-6 py-2 rounded">Next</button>
            </div>
          </div>
        )}

        {/* Step 4: Customer Info */}
        {step === 4 && (
          <div className="text-center">
            <h3 className="text-2xl font-semibold">Your Info</h3>
            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto mt-4">
              <input placeholder="First name *" value={first} onChange={e => setFirst(e.target.value)} className="p-3 border rounded" />
              <input placeholder="Last name" value={last} onChange={e => setLast(e.target.value)} className="p-3 border rounded" />
              <div className="col-span-2">
                <input placeholder="Email *" value={email} onChange={e => setEmail(e.target.value)} className="p-3 border rounded w-full" />
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button onClick={() => setStep(3)} className="px-4 py-2 border rounded">Back</button>
              <button onClick={submit} className="btn-gold px-6 py-2 rounded">Submit</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
