"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { requireAdminUser } from "@/lib/supabase/server";

export type CreateLiveReportInput = {
  reporterName: string;
  location: string;
  statusUpdate: string;
};

export type LiveReportResult =
  | { ok: true; message: string }
  | { ok: false; message: string };

function isAllowed(role: string) {
  return role === "marketing" || role === "pimpinan" || role === "admin" || role === "superadmin";
}

export async function createLiveReport(input: CreateLiveReportInput): Promise<LiveReportResult> {
  const auth = await requireAdminUser();
  if (!auth.ok) return { ok: false, message: auth.message };
  if (!isAllowed(auth.role)) return { ok: false, message: "Forbidden." };

  const supabase = createSupabaseAdminClient();
  if (!supabase) return { ok: false, message: "Admin client belum siap (SUPABASE_SERVICE_ROLE_KEY)." };

  const reporter_name = input.reporterName?.trim();
  const location = input.location?.trim();
  const status_update = input.statusUpdate?.trim();

  if (!reporter_name || !location || !status_update) {
    return { ok: false, message: "Nama, lokasi, dan update wajib diisi." };
  }

  const { error } = await supabase
    .from("tour_live_reports")
    .insert({ reporter_name, location, status_update, timestamp: new Date().toISOString() });

  if (error) return { ok: false, message: error.message };

  revalidatePath("/admin/live-report");
  revalidatePath("/admin");
  return { ok: true, message: "Live report berhasil dibuat." };
}
