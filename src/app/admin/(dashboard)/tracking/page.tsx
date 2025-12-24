import { requireAdminUser } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import TrackingClient, { type ArmadaOption, type TrackingRow } from "./TrackingClient";

export const runtime = "edge";

async function loadTracking(): Promise<{ data: TrackingRow[]; error?: string | null }> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return {
      data: [],
      error: "Admin client belum siap (SUPABASE_SERVICE_ROLE_KEY).",
    };
  }

  const { data, error } = await supabase
    .from("armada_tracking_events")
    .select("id, armada_label, location, note, timestamp")
    .order("timestamp", { ascending: false })
    .limit(50);

  if (error) return { data: [], error: error.message };

  return {
    data:
      data?.map((r) => ({
        id: String((r as { id: unknown }).id),
        armada_label: (r as { armada_label?: string | null }).armada_label ?? null,
        location: (r as { location?: string | null }).location ?? null,
        note: (r as { note?: string | null }).note ?? null,
        timestamp: (r as { timestamp?: string | null }).timestamp ?? null,
      })) ?? [],
  };
}

async function loadArmadaOptions(): Promise<{ data: ArmadaOption[]; error?: string | null }> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return {
      data: [],
      error: "Admin client belum siap (SUPABASE_SERVICE_ROLE_KEY).",
    };
  }

  const { data, error } = await supabase
    .from("armada")
    .select("name, plate_number")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) return { data: [], error: error.message };

  const options =
    data?.map((r) => {
      const name = (r as { name?: string | null }).name ?? "";
      const plate = (r as { plate_number?: string | null }).plate_number ?? null;
      const label = plate ? `${name} (${plate})` : name;
      return { label: label.trim() };
    })?.filter((o) => Boolean(o.label)) ?? [];

  return { data: options };
}

export default async function TrackingPage() {
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

  const [{ data, error }, { data: armadaOptions }] = await Promise.all([
    loadTracking(),
    loadArmadaOptions(),
  ]);

  return <TrackingClient initialEvents={data} initialError={error ?? null} armadaOptions={armadaOptions} />;
}
