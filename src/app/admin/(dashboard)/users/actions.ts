"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { requireAdminUser } from "@/lib/supabase/server";

export type AdminManagedRole = "marketing" | "tata_usaha" | "pimpinan" | "admin";

export type CreateUserInput = {
  email: string;
  password: string;
  fullName: string;
  role: AdminManagedRole;
};

export type CreateUserResult =
  | { ok: true; userId: string; message: string }
  | { ok: false; message: string };

export async function createUser(input: CreateUserInput): Promise<CreateUserResult> {
  const auth = await requireAdminUser();
  if (!auth.ok) return { ok: false, message: auth.message };
  if (auth.role !== "pimpinan") return { ok: false, message: "Forbidden: hanya Pimpinan." };

  const email = input.email?.trim().toLowerCase();
  const password = input.password;
  const fullName = input.fullName?.trim();
  const role = input.role;

  if (!email || !password || !fullName || !role) {
    return { ok: false, message: "Lengkapi Email, Password, Nama, dan Role." };
  }

  const supabase = createSupabaseAdmin();

  const { data: created, error: createError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (createError || !created?.user) {
    return { ok: false, message: createError?.message ?? "Gagal membuat user." };
  }

  const userId = created.user.id;

  const { error: adminUsersError } = await supabase
    .from("admin_users")
    .insert({ user_id: userId, role });

  if (adminUsersError) {
    return { ok: false, message: adminUsersError.message };
  }

  const { error: employeesError } = await supabase
    .from("employees")
    .insert({ name: fullName, role, status: "Active" });

  if (employeesError) {
    return { ok: false, message: employeesError.message };
  }

  revalidatePath("/admin/users");

  return { ok: true, userId, message: "User berhasil dibuat." };
}
