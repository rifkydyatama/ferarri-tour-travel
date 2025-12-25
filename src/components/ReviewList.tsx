import { Star, UserCircle } from "lucide-react";

// Define a more flexible type directly in the props
type ReviewListItem = {
    id: string;
    user_name: string;
    rating: number;
    comment: string | null;
    created_at: string;
}

function StarDisplay({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={`h-4 w-4 ${
                        i < rating ? "text-amber-400" : "text-slate-300"
                    }`}
                    fill="currentColor"
                />
            ))}
        </div>
    );
}

export default function ReviewList({ reviews }: { reviews: ReviewListItem[] }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-black/5">
        <p className="text-sm text-slate-500">Belum ada ulasan untuk paket ini. Jadilah yang pertama!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {reviews.map((review) => (
        <div key={review.id} className="flex items-start gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <UserCircle className="h-10 w-10 text-slate-400" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-semibold text-slate-800">{review.user_name}</p>
                    <p className="text-xs text-slate-500">
                        {new Date(review.created_at).toLocaleDateString("id-ID", {
                            year: 'numeric', month: 'long', day: 'numeric'
                        })}
                    </p>
                </div>
                <StarDisplay rating={review.rating} />
            </div>
            {review.comment && (
                <p className="mt-3 text-sm leading-7 text-slate-600">{review.comment}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
