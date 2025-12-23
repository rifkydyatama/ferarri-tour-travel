"use server";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { requireAdminUser } from "@/lib/supabase/server";

export async function saveHomeContent(jsonText: string) {
  const auth = await requireAdminUser();
  if (!auth.ok) {
    return { ok: false as const, message: auth.message };
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return { ok: false as const, message: "Supabase env belum di-set." };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    return { ok: false as const, message: "JSON tidak valid." };
  }

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return { ok: false as const, message: "Root JSON harus object." };
  }

  const { error } = await supabase
    .from("site_pages")
    .upsert({ slug: "home", content: parsed }, { onConflict: "slug" });

  if (error) {
    return { ok: false as const, message: error.message };
  }

  return { ok: true as const, message: "Tersimpan." };
}
