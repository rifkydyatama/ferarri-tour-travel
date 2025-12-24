"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { requireAdminUser } from "@/lib/supabase/server";

export type ArmadaStatus = "Active" | "Maintenance" | "Inactive";

export type CreateArmadaInput = {
  name: string;
  plateNumber?: string;
  capacity?: number;
  status?: ArmadaStatus;
};

export type ArmadaResult =
  | { ok: true; message: string }
  | { ok: false; message: string };

function isAllowed(role: string) {
  return role === "tata_usaha" || role === "pimpinan" || role === "admin" || role === "superadmin";
}

export async function createArmada(input: CreateArmadaInput): Promise<ArmadaResult> {
  const auth = await requireAdminUser();
  if (!auth.ok) return { ok: false, message: auth.message };
  if (!isAllowed(auth.role)) return { ok: false, message: "Forbidden." };

  const supabase = createSupabaseAdminClient();
  if (!supabase) return { ok: false, message: "Admin client belum siap (SUPABASE_SERVICE_ROLE_KEY)." };

  const name = input.name?.trim();
  const plate_number = input.plateNumber?.trim() || null;
  const capacity = Number.isFinite(input.capacity) ? input.capacity : null;
  const status: ArmadaStatus = input.status ?? "Active";

  if (!name) return { ok: false, message: "Nama armada wajib diisi." };

  const { error } = await supabase
    .from("armada")
    .insert({ name, plate_number, capacity, status });

  if (error) return { ok: false, message: error.message };

  revalidatePath("/admin/armada");
  revalidatePath("/admin");
  return { ok: true, message: "Armada berhasil ditambahkan." };
}

export async function updateArmadaStatus(id: string, status: ArmadaStatus): Promise<ArmadaResult> {
  const auth = await requireAdminUser();
  if (!auth.ok) return { ok: false, message: auth.message };
  if (!isAllowed(auth.role)) return { ok: false, message: "Forbidden." };

  const supabase = createSupabaseAdminClient();
  if (!supabase) return { ok: false, message: "Admin client belum siap (SUPABASE_SERVICE_ROLE_KEY)." };

  const { error } = await supabase.from("armada").update({ status }).eq("id", id);
  if (error) return { ok: false, message: error.message };

  revalidatePath("/admin/armada");
  revalidatePath("/admin");
  return { ok: true, message: "Status armada diupdate." };
}
