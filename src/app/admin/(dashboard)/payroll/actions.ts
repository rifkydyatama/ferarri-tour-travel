"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { requireAdminUser } from "@/lib/supabase/server";

export type PayrollStatus = "Draft" | "Paid";

export type CreatePayrollInput = {
  employeeName: string;
  period: string; // YYYY-MM
  amount: number;
  notes?: string;
  status?: PayrollStatus;
};

export type PayrollResult =
  | { ok: true; message: string }
  | { ok: false; message: string };

function isAllowed(role: string) {
  return role === "tata_usaha" || role === "pimpinan" || role === "admin" || role === "superadmin";
}

export async function createPayrollEntry(input: CreatePayrollInput): Promise<PayrollResult> {
  const auth = await requireAdminUser();
  if (!auth.ok) return { ok: false, message: auth.message };
  if (!isAllowed(auth.role)) return { ok: false, message: "Forbidden." };

  const supabase = createSupabaseAdminClient();
  if (!supabase) return { ok: false, message: "Admin client belum siap (SUPABASE_SERVICE_ROLE_KEY)." };

  const employee_name = input.employeeName?.trim();
  const period = input.period?.trim();
  const amount = input.amount;
  const notes = input.notes?.trim() || null;
  const status: PayrollStatus = input.status ?? "Draft";

  if (!employee_name || !period) return { ok: false, message: "Nama karyawan dan periode wajib diisi." };
  if (!Number.isFinite(amount) || amount <= 0) return { ok: false, message: "Nominal harus angka > 0." };

  const { error } = await supabase
    .from("payroll_entries")
    .insert({ employee_name, period, amount, notes, status });

  if (error) return { ok: false, message: error.message };

  revalidatePath("/admin/payroll");
  revalidatePath("/admin");
  return { ok: true, message: "Payroll entry berhasil dibuat." };
}

export async function updatePayrollStatus(id: string, status: PayrollStatus): Promise<PayrollResult> {
  const auth = await requireAdminUser();
  if (!auth.ok) return { ok: false, message: auth.message };
  if (!isAllowed(auth.role)) return { ok: false, message: "Forbidden." };

  const supabase = createSupabaseAdminClient();
  if (!supabase) return { ok: false, message: "Admin client belum siap (SUPABASE_SERVICE_ROLE_KEY)." };

  const { error } = await supabase.from("payroll_entries").update({ status }).eq("id", id);
  if (error) return { ok: false, message: error.message };

  revalidatePath("/admin/payroll");
  revalidatePath("/admin");
  return { ok: true, message: "Status payroll diupdate." };
}
