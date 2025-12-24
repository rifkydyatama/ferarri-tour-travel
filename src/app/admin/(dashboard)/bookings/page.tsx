import { requireAdminUser } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import BookingsClient, { type BookingRow } from "./BookingsClient";

export const runtime = "edge";

async function loadBookings(): Promise<{ data: BookingRow[]; error?: string | null }> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return {
      data: [],
      error: "Admin client belum siap (SUPABASE_SERVICE_ROLE_KEY).",
    };
  }

  const { data, error } = await supabase
    .from("bookings")
    .select("id, client_name, destination, marketing_pic, status, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) return { data: [], error: error.message };

  return {
    data:
      data?.map((r) => ({
        id: String((r as { id: unknown }).id),
        client_name: (r as { client_name?: string | null }).client_name ?? null,
        destination: (r as { destination?: string | null }).destination ?? null,
        marketing_pic: (r as { marketing_pic?: string | null }).marketing_pic ?? null,
        status: (r as { status?: string | null }).status ?? null,
        created_at: (r as { created_at?: string | null }).created_at ?? null,
      })) ?? [],
  };
}

export default async function BookingsPage() {
  const auth = await requireAdminUser();
  if (!auth.ok) return null;

  const allowed =
    auth.role === "marketing" ||
    auth.role === "tata_usaha" ||
    auth.role === "pimpinan" ||
    auth.role === "admin" ||
    auth.role === "superadmin";

  if (!allowed) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-black text-slate-900">Akses Ditolak</h1>
        <p className="mt-2 text-sm text-slate-600">Halaman ini tidak tersedia untuk role kamu.</p>
      </div>
    );
  }

  const { data, error } = await loadBookings();
  return <BookingsClient initialBookings={data} initialError={error ?? null} />;
}
