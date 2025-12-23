import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { defaultHomeContent } from "./defaultHomeContent";
import type { HomeContent } from "./types";

export async function getHomeContent(): Promise<HomeContent> {
  const supabase = await createSupabaseServerClient();

  // Jika env belum set atau client gagal init, fallback ke default
  if (!supabase) return defaultHomeContent;

  try {
    // Ambil row dengan slug 'home' dari tabel site_pages
    const { data, error } = await supabase
      .from("site_pages")
      .select("content")
      .eq("slug", "home")
      .single();

    if (error || !data) {
      // Jika belum ada data di DB, pakai default dulu
      return defaultHomeContent;
    }

    // Return data dari DB
    return data.content as HomeContent;
  } catch (err) {
    console.error("Error fetching home content:", err);
    return defaultHomeContent;
  }
}