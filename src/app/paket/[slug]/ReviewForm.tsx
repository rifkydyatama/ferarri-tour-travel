"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createReview } from "./actions";
import { Star } from "lucide-react";
import { useState } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 items-center justify-center rounded-xl bg-ferrari px-6 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:bg-slate-300"
    >
      {pending ? "Mengirim..." : "Kirim Ulasan"}
    </button>
  );
}

function StarRating({ currentRating, setRating }: { currentRating: number, setRating: (r: number) => void }) {
    const [hoverRating, setHoverRating] = useState(0);
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="p-1 transition"
          >
            <Star
              className={`h-6 w-6 ${
                (hoverRating || currentRating) >= star
                  ? "text-amber-400"
                  : "text-slate-300"
              }`}
              fill="currentColor"
            />
          </button>
        ))}
      </div>
    );
}

export default function ReviewForm({ packageId }: { packageId: string }) {
  const initialState = { error: null, errorDetails: null, success: false };
  const [state, dispatch] = useFormState(createReview, initialState);
  const [rating, setRating] = useState(0);

  return (
    <form action={dispatch} className="grid gap-4">
      <input type="hidden" name="package_id" value={packageId} />
      <input type="hidden" name="rating" value={rating} />
      
      <div>
        <label htmlFor="user_name" className="mb-2 block text-sm font-semibold text-slate-700">
            Nama Anda
        </label>
        <input
            id="user_name"
            name="user_name"
            type="text"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-800 placeholder:text-slate-400 focus:border-ferrari focus:ring-ferrari"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">Rating Anda</label>
        <StarRating currentRating={rating} setRating={setRating} />
      </div>

      <div>
        <label htmlFor="comment" className="mb-2 block text-sm font-semibold text-slate-700">
            Ulasan (Opsional)
        </label>
        <textarea
            id="comment"
            name="comment"
            rows={4}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-800 placeholder:text-slate-400 focus:border-ferrari focus:ring-ferrari"
        />
      </div>

      <div className="mt-2">
        <SubmitButton />
      </div>
      
      {state.error && <p className="mt-2 text-sm text-red-500">{state.error}</p>}
      {state.success && <p className="mt-2 text-sm text-leaf">Ulasan Anda berhasil dikirim!</p>}
    </form>
  );
}
