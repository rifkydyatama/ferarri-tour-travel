"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { requireAdminUser } from "@/lib/supabase/server";

export type BookingStatus = "New" | "In Process" | "Ready" | "Done" | "Canceled";

export type CreateBookingInput = {
  clientName: string;
  destination: string;
  marketingPic?: string;
  status?: BookingStatus;
};

export type CreateBookingResult =
  | { ok: true; message: string }
  | { ok: false; message: string };

function isAllowed(role: string) {
  return role === "tata_usaha" || role === "marketing" || role === "pimpinan" || role === "admin" || role === "superadmin";
}

export async function createBooking(input: CreateBookingInput): Promise<CreateBookingResult> {
  const auth = await requireAdminUser();
  if (!auth.ok) return { ok: false, message: auth.message };
  if (!isAllowed(auth.role)) return { ok: false, message: "Forbidden." };

  const supabase = createSupabaseAdminClient();
  if (!supabase) return { ok: false, message: "Admin client belum siap (SUPABASE_SERVICE_ROLE_KEY)." };

  const client_name = input.clientName?.trim();
  const destination = input.destination?.trim();
  const marketing_pic = input.marketingPic?.trim() || null;
  const status: BookingStatus = input.status ?? "New";

  if (!client_name || !destination) {
    return { ok: false, message: "Nama client dan destinasi wajib diisi." };
  }

  const { error } = await supabase
    .from("bookings")
    .insert({ client_name, destination, marketing_pic, status });

  if (error) return { ok: false, message: error.message };

  revalidatePath("/admin/bookings");
  revalidatePath("/admin");
  return { ok: true, message: "Booking berhasil dibuat." };
}

export async function updateBookingStatus(id: string, status: BookingStatus): Promise<CreateBookingResult> {
  const auth = await requireAdminUser();
  if (!auth.ok) return { ok: false, message: auth.message };
  if (!isAllowed(auth.role)) return { ok: false, message: "Forbidden." };

  const supabase = createSupabaseAdminClient();
  if (!supabase) return { ok: false, message: "Admin client belum siap (SUPABASE_SERVICE_ROLE_KEY)." };

  const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
  if (error) return { ok: false, message: error.message };

  revalidatePath("/admin/bookings");
  revalidatePath("/admin");
  return { ok: true, message: "Status booking diupdate." };
}
