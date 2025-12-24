import { requireAdminUser } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import ItineraryClient, { type ItineraryRow } from "./ItineraryClient";

export const runtime = "edge";

async function loadItineraries(): Promise<{ data: ItineraryRow[]; error?: string | null }> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return {
      data: [],
      error: "Admin client belum siap (SUPABASE_SERVICE_ROLE_KEY).",
    };
  }

  const { data, error } = await supabase
    .from("itineraries")
    .select("id, title, start_date, end_date, status, notes, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) return { data: [], error: error.message };

  return {
    data:
      data?.map((r) => ({
        id: String((r as { id: unknown }).id),
        title: (r as { title?: string | null }).title ?? null,
        start_date: (r as { start_date?: string | null }).start_date ?? null,
        end_date: (r as { end_date?: string | null }).end_date ?? null,
        status: (r as { status?: string | null }).status ?? null,
        notes: (r as { notes?: string | null }).notes ?? null,
        created_at: (r as { created_at?: string | null }).created_at ?? null,
      })) ?? [],
  };
}

export default async function ItineraryPage() {
  const auth = await requireAdminUser();
  if (!auth.ok) return null;

  const allowed =
    auth.role === "tata_usaha" ||
    auth.role === "pimpinan" ||
    auth.role === "admin" ||
    auth.role === "superadmin";

  if (!allowed) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-black text-slate-900">Akses Ditolak</h1>
        <p className="mt-2 text-sm text-slate-600">Halaman ini hanya untuk Tata Usaha/Executive.</p>
      </div>
    );
  }

  const { data, error } = await loadItineraries();
  return <ItineraryClient initialItems={data} initialError={error ?? null} />;
}
