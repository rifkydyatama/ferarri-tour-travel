"use server";

import { createSupabaseServerClient, requireAdminUser } from "@/lib/supabase/server";
import type { HomeContent } from "@/lib/landing/types";
import { revalidatePath } from "next/cache";
import { diagnoseSupabaseJwtKey, projectRefFromSupabaseUrl } from "@/lib/supabase/diagnostics";

export async function updateHomeContent(newContent: HomeContent) {
  // 1. SECURITY CHECK: Pastikan user adalah Admin
  const auth = await requireAdminUser();
  if (!auth.ok) {
    throw new Error(auth.message); // Akan muncul di toast error dashboard
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    throw new Error("Koneksi Supabase tidak tersedia.");
  }

  // 2. SIMPAN KE DATABASE (site_pages)
  // Kita pakai slug 'home' sebagai identifier halaman depan
  const { error } = await supabase
    .from("site_pages")
    .upsert(
      { 
        slug: "home", 
        content: newContent,
        updated_at: new Date().toISOString() 
      },
      { onConflict: "slug" } // Jika slug 'home' sudah ada, lakukan update
    );

  if (error) {
    if (error.message?.includes("Invalid API key")) {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      const urlRef = projectRefFromSupabaseUrl(url);
      const keyDiag = diagnoseSupabaseJwtKey(anonKey);

      const mismatchHint =
        urlRef && keyDiag.projectRefFromIssuer && urlRef !== keyDiag.projectRefFromIssuer
          ? ` (URL ref: ${urlRef}, Key ref: ${keyDiag.projectRefFromIssuer})`
          : "";

      throw new Error(
        "Konfigurasi Supabase tidak valid: Invalid API key. Pastikan NEXT_PUBLIC_SUPABASE_URL & NEXT_PUBLIC_SUPABASE_ANON_KEY berasal dari project Supabase yang sama dan tidak pakai tanda kutip/spasi." +
          mismatchHint,
      );
    }

    throw new Error(`Gagal menyimpan ke database: ${error.message}`);
  }

  // 3. REVALIDATE CACHE (Penting!)
  // Ini bikin Next.js merender ulang halaman depan & admin konten
  // Jadi user di public langsung lihat perubahannya detik itu juga.
  revalidatePath("/"); 
  revalidatePath("/admin/konten");

  return { success: true };
}