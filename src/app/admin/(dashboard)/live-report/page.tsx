import { requireAdminUser } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import LiveReportClient, { type LiveReportRow } from "./LiveReportClient";

export const runtime = "edge";

async function loadReports(): Promise<{ data: LiveReportRow[]; error?: string | null }> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return {
      data: [],
      error: "Admin client belum siap (SUPABASE_SERVICE_ROLE_KEY).",
    };
  }

  const { data, error } = await supabase
    .from("tour_live_reports")
    .select("id, reporter_name, location, status_update, timestamp")
    .order("timestamp", { ascending: false })
    .limit(50);

  if (error) return { data: [], error: error.message };

  return {
    data:
      data?.map((r) => ({
        id: String((r as { id: unknown }).id),
        reporter_name: (r as { reporter_name?: string | null }).reporter_name ?? null,
        location: (r as { location?: string | null }).location ?? null,
        status_update: (r as { status_update?: string | null }).status_update ?? null,
        timestamp: (r as { timestamp?: string | null }).timestamp ?? null,
      })) ?? [],
  };
}

export default async function LiveReportPage() {
  const auth = await requireAdminUser();
  if (!auth.ok) return null;

  const allowed = auth.role === "marketing" || auth.role === "pimpinan" || auth.role === "admin" || auth.role === "superadmin";

  if (!allowed) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-black text-slate-900">Akses Ditolak</h1>
        <p className="mt-2 text-sm text-slate-600">Halaman ini hanya untuk Marketing/Executive.</p>
      </div>
    );
  }

  const { data, error } = await loadReports();
  return <LiveReportClient initialReports={data} initialError={error ?? null} />;
}
