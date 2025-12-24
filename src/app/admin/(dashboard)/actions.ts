"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient, requireAdminUser } from "@/lib/supabase/server";

// Action untuk update manual (teks)
export async function updateTourLocation(bookingId: string, location: string, status: string) {
  const { ok, user } = await requireAdminUser();
  if (!ok) return { ok: false, error: "Unauthorized" } as const;

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Supabase client error" } as const;

  // Kita simpan nama lokasi di column location_name (sesuai schema)
  const { error } = await supabase.from("tour_live_reports").insert([
    {
      booking_id: bookingId,
      location_name: location, // Perbaikan disini
      status_update: status,
      reporter_id: user.id,
    },
  ]);

  if (error) return { ok: false, error: error.message } as const;
  revalidatePath("/admin");
  return { ok: true } as const;
}

// Action untuk GPS Otomatis (Lat/Long)
export async function submitLiveReport(
  bookingId: string,
  latitude: number,
  longitude: number,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const { ok, user } = await requireAdminUser();
  if (!ok) return { ok: false, error: "Unauthorized" };

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Supabase client error" };

  // Perbaikan: Simpan ke kolom latitude & longitude yang benar
  const { error } = await supabase.from("tour_live_reports").insert([
    {
      booking_id: bookingId,
      latitude: latitude,   // Masuk ke kolom float8
      longitude: longitude, // Masuk ke kolom float8
      status_update: "Live GPS Update ",
      reporter_id: user.id,
    },
  ]);

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin");
  return { ok: true };
}"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient, requireAdminUser } from "@/lib/supabase/server";

// Action untuk update manual (teks)
export async function updateTourLocation(bookingId: string, location: string, status: string) {
  const { ok, user } = await requireAdminUser();
  if (!ok) return { ok: false, error: "Unauthorized" } as const;

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Supabase client error" } as const;

  // Kita simpan nama lokasi di column location_name (sesuai schema)
  const { error } = await supabase.from("tour_live_reports").insert([
    {
      booking_id: bookingId,
      location_name: location, // Perbaikan disini
      status_update: status,
      reporter_id: user.id,
    },
  ]);

  if (error) return { ok: false, error: error.message } as const;
  revalidatePath("/admin");
  return { ok: true } as const;
}

// Action untuk GPS Otomatis (Lat/Long)
export async function submitLiveReport(
  bookingId: string,
  latitude: number,
  longitude: number,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const { ok, user } = await requireAdminUser();
  if (!ok) return { ok: false, error: "Unauthorized" };

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Supabase client error" };

  // Perbaikan: Simpan ke kolom latitude & longitude yang benar
  const { error } = await supabase.from("tour_live_reports").insert([
    {
      booking_id: bookingId,
      latitude: latitude,   // Masuk ke kolom float8
      longitude: longitude, // Masuk ke kolom float8
      status_update: "Live GPS Update",
      reporter_id: user.id,
    },
  ]);

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin");
  return { ok: true };
}