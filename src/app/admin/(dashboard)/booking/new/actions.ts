"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createSupabaseServerClient, requireAdminUser } from "@/lib/supabase/server";

export async function createBooking(formData: FormData): Promise<{ ok: false; error: string } | never> {
  const { ok, user, role } = await requireAdminUser();
  if (!ok || role !== "marketing") {
    return { ok: false, error: "Unauthorized" };
  }

  const clientName = (formData.get("client_name") ?? "").toString().trim();
  const destination = (formData.get("destination") ?? "").toString().trim();
  const tourDate = (formData.get("tour_date") ?? "").toString().trim();
  const paxRaw = (formData.get("pax_count") ?? "").toString().trim();

  if (!clientName) return { ok: false, error: "Client name is required" };
  if (!destination) return { ok: false, error: "Destination is required" };
  if (!tourDate) return { ok: false, error: "Tour date is required" };

  const paxCount = Number.parseInt(paxRaw, 10);
  if (Number.isNaN(paxCount) || paxCount <= 0) {
    return { ok: false, error: "Pax must be a positive number" };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Supabase client not initialized" };

  const { error } = await supabase.from("bookings").insert([
    {
      client_name: clientName,
      destination,
      tour_date: tourDate,
      pax_count: paxCount,
      status: "New",
      created_by: user.id,
    },
  ]);

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/admin");
  redirect("/admin");
}
