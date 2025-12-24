"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { requireAdminUser } from "@/lib/supabase/server";

export type CreateTrackingInput = {
  armadaLabel: string;
  location: string;
  note: string;
};

export type TrackingResult =
  | { ok: true; message: string }
  | { ok: false; message: string };

function isAllowed(role: string) {
  return role === "tata_usaha" || role === "pimpinan" || role === "admin" || role === "superadmin";
}

export async function createTrackingEvent(input: CreateTrackingInput): Promise<TrackingResult> {
  const auth = await requireAdminUser();
  if (!auth.ok) return { ok: false, message: auth.message };
  if (!isAllowed(auth.role)) return { ok: false, message: "Forbidden." };

  const supabase = createSupabaseAdminClient();
  if (!supabase) return { ok: false, message: "Admin client belum siap (SUPABASE_SERVICE_ROLE_KEY)." };

  const armada_label = input.armadaLabel?.trim();
  const location = input.location?.trim();
  const note = input.note?.trim();

  if (!armada_label || !location || !note) {
    return { ok: false, message: "Armada, lokasi, dan catatan wajib diisi." };
  }

  const { error } = await supabase
    .from("armada_tracking_events")
    .insert({ armada_label, location, note, timestamp: new Date().toISOString() });

  if (error) return { ok: false, message: error.message };

  revalidatePath("/admin/tracking");
  revalidatePath("/admin");
  return { ok: true, message: "Tracking event berhasil ditambahkan." };
}
