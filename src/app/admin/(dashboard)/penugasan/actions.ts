"use server";

import { revalidatePath } from "next/cache";

import { createSupabaseServerClient, requireAdminUser } from "@/lib/supabase/server";

export async function assignTourLeader(bookingId: string, userId: string) {
  const { ok, role } = await requireAdminUser();
  if (!ok || !["tata_usaha", "pimpinan"].includes(role)) {
    return { ok: false, error: "Unauthorized" } as const;
  }

  if (!bookingId || !userId) {
    return { ok: false, error: "Missing booking or user" } as const;
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Supabase client not initialized" } as const;

  const { error } = await supabase
    .from("bookings")
    .update({ tour_leader_id: userId, status: "On Tour" })
    .eq("id", bookingId);

  if (error) {
    return { ok: false, error: error.message } as const;
  }

  revalidatePath("/admin");
  return { ok: true } as const;
}
