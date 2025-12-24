import Link from "next/link";
import { requireAdminUser } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "edge";

type Params = { id: string };

export default async function BookingDetailPage({ params }: { params: Promise<Params> }) {
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

  const { id } = await params;

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-black text-slate-900">Booking</h1>
        <p className="mt-2 text-sm text-slate-600">Admin client belum siap (SUPABASE_SERVICE_ROLE_KEY).</p>
      </div>
    );
  }

  const { data, error } = await supabase
    .from("bookings")
    .select("id, client_name, destination, marketing_pic, status, created_at")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    return (
      <div className="space-y-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-xl font-black text-slate-900">Booking Tidak Ditemukan</h1>
          <p className="mt-2 text-sm text-slate-600">{error?.message ?? "Data tidak ada."}</p>
        </div>
        <Link href="/admin/bookings" className="text-sm font-bold text-ferrari">
          Kembali ke Booking
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">Detail Booking</h1>
            <p className="mt-1 text-sm text-slate-500">ID: <span className="font-mono">{String((data as { id: unknown }).id)}</span></p>
          </div>
          <Link
            href="/admin/bookings"
            className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
          >
            Kembali
          </Link>
        </div>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
            <dt className="text-xs font-bold uppercase tracking-widest text-slate-500">Client</dt>
            <dd className="mt-1 text-sm font-bold text-slate-900">{(data as { client_name?: string | null }).client_name ?? "-"}</dd>
          </div>
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
            <dt className="text-xs font-bold uppercase tracking-widest text-slate-500">Destinasi</dt>
            <dd className="mt-1 text-sm font-bold text-slate-900">{(data as { destination?: string | null }).destination ?? "-"}</dd>
          </div>
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
            <dt className="text-xs font-bold uppercase tracking-widest text-slate-500">Marketing PIC</dt>
            <dd className="mt-1 text-sm font-bold text-slate-900">{(data as { marketing_pic?: string | null }).marketing_pic ?? "-"}</dd>
          </div>
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
            <dt className="text-xs font-bold uppercase tracking-widest text-slate-500">Status</dt>
            <dd className="mt-1 text-sm font-bold text-slate-900">{(data as { status?: string | null }).status ?? "-"}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
