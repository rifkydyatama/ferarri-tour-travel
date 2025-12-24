import { requireAdminUser } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import ArmadaClient, { type ArmadaRow } from "./ArmadaClient";

export const runtime = "edge";

async function loadArmada(): Promise<{ data: ArmadaRow[]; error?: string | null }> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return {
      data: [],
      error: "Admin client belum siap (SUPABASE_SERVICE_ROLE_KEY).",
    };
  }

  const { data, error } = await supabase
    .from("armada")
    .select("id, name, plate_number, capacity, status, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) return { data: [], error: error.message };

  return {
    data:
      data?.map((r) => ({
        id: String((r as { id: unknown }).id),
        name: (r as { name?: string | null }).name ?? null,
        plate_number: (r as { plate_number?: string | null }).plate_number ?? null,
        capacity: (r as { capacity?: number | null }).capacity ?? null,
        status: (r as { status?: string | null }).status ?? null,
        created_at: (r as { created_at?: string | null }).created_at ?? null,
      })) ?? [],
  };
}

export default async function ArmadaPage() {
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

  const { data, error } = await loadArmada();
  return <ArmadaClient initialItems={data} initialError={error ?? null} />;
}
