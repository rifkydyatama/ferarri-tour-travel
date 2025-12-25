"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function createPackage(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) throw new Error("Supabase client not initialized");

  const highlights = formData.get("highlights")?.toString().split("\n").filter(Boolean) || [];
  const inclusions = formData.get("inclusions")?.toString().split("\n").filter(Boolean) || [];
  const exclusions = formData.get("exclusions")?.toString().split("\n").filter(Boolean) || [];
  
  // Basic itinerary parsing (could be improved with a proper UI builder)
  const itineraryRaw = formData.get("itinerary")?.toString() || "";
  const itinerary = itineraryRaw.split("\n\n").map((block, idx) => {
    const lines = block.split("\n");
    return {
      day: lines[0] || `Day ${idx + 1}`,
      items: lines.slice(1).filter(Boolean),
    };
  });

  const pkgData = {
    slug: formData.get("slug") as string,
    title: formData.get("title") as string,
    location: formData.get("location") as string,
    duration: formData.get("duration") as string,
    price_from: parseInt(formData.get("price_from") as string),
    hero_image: formData.get("hero_image") as string,
    highlights,
    inclusions,
    exclusions,
    itinerary,
    is_active: formData.get("is_active") === "on",
  };

  const { error } = await supabase.from("tour_packages").insert(pkgData);

  if (error) {
    console.error("Error creating package:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/paket");
  revalidatePath("/");
  redirect("/admin/paket");
}

export async function updatePackage(id: string, formData: FormData) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) throw new Error("Supabase client not initialized");

  const highlights = formData.get("highlights")?.toString().split("\n").filter(Boolean) || [];
  const inclusions = formData.get("inclusions")?.toString().split("\n").filter(Boolean) || [];
  const exclusions = formData.get("exclusions")?.toString().split("\n").filter(Boolean) || [];
  
  const itineraryRaw = formData.get("itinerary")?.toString() || "";
  const itinerary = itineraryRaw.split("\n\n").map((block, idx) => {
    const lines = block.split("\n");
    return {
      day: lines[0] || `Day ${idx + 1}`,
      items: lines.slice(1).filter(Boolean),
    };
  });

  const pkgData = {
    slug: formData.get("slug") as string,
    title: formData.get("title") as string,
    location: formData.get("location") as string,
    duration: formData.get("duration") as string,
    price_from: parseInt(formData.get("price_from") as string),
    hero_image: formData.get("hero_image") as string,
    highlights,
    inclusions,
    exclusions,
    itinerary,
    is_active: formData.get("is_active") === "on",
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("tour_packages").update(pkgData).eq("id", id);

  if (error) {
    console.error("Error updating package:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/paket");
  revalidatePath(`/paket/${pkgData.slug}`);
  revalidatePath("/");
  redirect("/admin/paket");
}

export async function deletePackage(id: string) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) throw new Error("Supabase client not initialized");

  const { error } = await supabase.from("tour_packages").delete().eq("id", id);

  if (error) {
    console.error("Error deleting package:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/paket");
  revalidatePath("/");
}