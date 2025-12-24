"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function createEmployee(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();

  if (!name) {
    return { ok: false, error: "Nama wajib diisi." };
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return { ok: false, error: "Admin client belum siap (SUPABASE_SERVICE_ROLE_KEY)." };
  }

  const { error } = await supabase.from("employees").insert({ name, role: role || null, status: "active" });

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/karyawan");
  return { ok: true };
}
