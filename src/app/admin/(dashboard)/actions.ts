"use server";

import { revalidatePath } from "next/cache";

import { createSupabaseServerClient, requireAdminUser } from "@/lib/supabase/server";

export async function updateTourLocation(bookingId: string, location: string, status: string) {
  const { ok, user } = await requireAdminUser();
  if (!ok) {
    return { ok: false, error: "Unauthorized" } as const;
  }

  if (!bookingId || !location || !status) {
    return { ok: false, error: "Missing booking, location, or status" } as const;
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Supabase client not initialized" } as const;

  const { error } = await supabase.from("tour_live_reports").insert([
    {
      booking_id: bookingId,
      location,
      status_update: status,
      reporter_id: user.id,
    },
  ]);

  if (error) {
    return { ok: false, error: error.message } as const;
  }

  revalidatePath("/admin");
  return { ok: true } as const;
}

export async function submitLiveReport(
  bookingId: string,
  latitude: number,
  longitude: number,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const { ok, user } = await requireAdminUser();
  if (!ok) return { ok: false, error: "Unauthorized" };

  if (!bookingId || Number.isNaN(latitude) || Number.isNaN(longitude)) {
    return { ok: false, error: "Missing booking or coordinates" };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Supabase client not initialized" };

  const { error } = await supabase.from("tour_live_reports").insert([
    {
      booking_id: bookingId,
      location: `${latitude},${longitude}`,
      status_update: "Location update",
      reporter_id: user.id,
    },
  ]);

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/admin");
  return { ok: true };
}
