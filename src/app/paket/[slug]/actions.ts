"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { z } from "zod";

const ReviewSchema = z.object({
  package_id: z.string().uuid(),
  user_name: z.string().min(2, { message: "Nama harus diisi." }),
  rating: z.coerce.number().min(1).max(5),
  comment: z.string().optional(),
});

export async function createReview(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { error: "Supabase client not initialized." };
  
  // A simple auth check, in a real app you might want to ensure the user is logged in
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Anda harus login untuk memberikan ulasan." };
  }

  const validatedFields = ReviewSchema.safeParse({
    package_id: formData.get("package_id"),
    user_name: formData.get("user_name"),
    rating: formData.get("rating"),
    comment: formData.get("comment"),
  });

  if (!validatedFields.success) {
    return {
      error: "Data tidak valid.",
      errorDetails: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { package_id, user_name, rating, comment } = validatedFields.data;

  const { error } = await supabase.from("tour_reviews").insert({
    package_id,
    user_name,
    rating,
    comment,
    // In a real app with user profiles, you would use user.id
    // user_id: user.id 
  });

  if (error) {
    console.error("Error creating review:", error);
    return { error: "Gagal menyimpan ulasan. Silakan coba lagi." };
  }

  // Revalidate the package page to show the new review
  const { data: pkg } = await supabase.from("tour_packages").select("slug").eq("id", package_id).single();
  if (pkg?.slug) {
    revalidatePath(`/paket/${pkg.slug}`);
  }

  return { success: true };
}
