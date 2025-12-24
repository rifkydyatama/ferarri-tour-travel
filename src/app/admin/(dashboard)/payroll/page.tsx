import { requireAdminUser } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import PayrollClient, { type EmployeeOption, type PayrollRow } from "./PayrollClient";

export const runtime = "edge";

async function loadPayroll(): Promise<{ data: PayrollRow[]; error?: string | null }> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return {
      data: [],
      error: "Admin client belum siap (SUPABASE_SERVICE_ROLE_KEY).",
    };
  }

  const { data, error } = await supabase
    .from("payroll_entries")
    .select("id, employee_name, period, amount, status, notes, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) return { data: [], error: error.message };

  return {
    data:
      data?.map((r) => ({
        id: String((r as { id: unknown }).id),
        employee_name: (r as { employee_name?: string | null }).employee_name ?? null,
        period: (r as { period?: string | null }).period ?? null,
        amount: (r as { amount?: number | null }).amount ?? null,
        status: (r as { status?: string | null }).status ?? null,
        notes: (r as { notes?: string | null }).notes ?? null,
        created_at: (r as { created_at?: string | null }).created_at ?? null,
      })) ?? [],
  };
}

async function loadEmployeeOptions(): Promise<{ data: EmployeeOption[]; error?: string | null }> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return {
      data: [],
      error: "Admin client belum siap (SUPABASE_SERVICE_ROLE_KEY).",
    };
  }

  const { data, error } = await supabase
    .from("employees")
    .select("name")
    .order("name", { ascending: true })
    .limit(200);

  if (error) return { data: [], error: error.message };

  const options =
    data?.map((r) => ({ name: String((r as { name?: string | null }).name ?? "").trim() }))
      ?.filter((o) => Boolean(o.name)) ?? [];

  return { data: options };
}

export default async function PayrollPage() {
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

  const [{ data, error }, { data: employeeOptions }] = await Promise.all([
    loadPayroll(),
    loadEmployeeOptions(),
  ]);

  return (
    <PayrollClient
      initialItems={data}
      initialError={error ?? null}
      employeeOptions={employeeOptions}
    />
  );
}
