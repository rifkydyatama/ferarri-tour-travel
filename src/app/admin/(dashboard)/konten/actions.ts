"use server";

import { createSupabaseServerClient, requireAdminUser } from "@/lib/supabase/server";
import type { HomeContent } from "@/lib/landing/types";
import { revalidatePath } from "next/cache";

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
    console.error("Supabase Error:", error);
    throw new Error("Gagal menyimpan ke database. Cek log server.");
  }

  // 3. REVALIDATE CACHE (Penting!)
  // Ini bikin Next.js merender ulang halaman depan & admin konten
  // Jadi user di public langsung lihat perubahannya detik itu juga.
  revalidatePath("/"); 
  revalidatePath("/admin/konten");

  return { success: true };
}