"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { requireAdminUser } from "@/lib/supabase/server";

export type ItineraryStatus = "Draft" | "Published" | "Archived";

export type CreateItineraryInput = {
  title: string;
  startDate?: string;
  endDate?: string;
  notes?: string;
  status?: ItineraryStatus;
};

export type ItineraryResult =
  | { ok: true; message: string }
  | { ok: false; message: string };

function isAllowed(role: string) {
  return role === "tata_usaha" || role === "pimpinan" || role === "admin" || role === "superadmin";
}

export async function createItinerary(input: CreateItineraryInput): Promise<ItineraryResult> {
  const auth = await requireAdminUser();
  if (!auth.ok) return { ok: false, message: auth.message };
  if (!isAllowed(auth.role)) return { ok: false, message: "Forbidden." };

  const supabase = createSupabaseAdminClient();
  if (!supabase) return { ok: false, message: "Admin client belum siap (SUPABASE_SERVICE_ROLE_KEY)." };

  const title = input.title?.trim();
  const start_date = input.startDate?.trim() || null;
  const end_date = input.endDate?.trim() || null;
  const notes = input.notes?.trim() || null;
  const status: ItineraryStatus = input.status ?? "Draft";

  if (!title) return { ok: false, message: "Judul itinerary wajib diisi." };

  const { error } = await supabase
    .from("itineraries")
    .insert({ title, start_date, end_date, notes, status });

  if (error) return { ok: false, message: error.message };

  revalidatePath("/admin/itinerary");
  revalidatePath("/admin");
  return { ok: true, message: "Itinerary berhasil dibuat." };
}

export async function updateItineraryStatus(id: string, status: ItineraryStatus): Promise<ItineraryResult> {
  const auth = await requireAdminUser();
  if (!auth.ok) return { ok: false, message: auth.message };
  if (!isAllowed(auth.role)) return { ok: false, message: "Forbidden." };

  const supabase = createSupabaseAdminClient();
  if (!supabase) return { ok: false, message: "Admin client belum siap (SUPABASE_SERVICE_ROLE_KEY)." };

  const { error } = await supabase.from("itineraries").update({ status }).eq("id", id);
  if (error) return { ok: false, message: error.message };

  revalidatePath("/admin/itinerary");
  revalidatePath("/admin");
  return { ok: true, message: "Status itinerary diupdate." };
}
