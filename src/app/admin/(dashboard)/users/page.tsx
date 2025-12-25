import { redirect } from "next/navigation";

import { createSupabaseServerClient, requireAdminUser } from "@/lib/supabase/server";
import UserList from "./UserList";
import { AdminUser } from "./types";

export const runtime = "edge";

export default async function UserManagementPage() {
  const { ok, role } = await requireAdminUser();
  if (!ok || role !== "pimpinan") redirect("/admin/login");

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return (
      <section className="mx-auto w-full max-w-5xl">
        <h1 className="text-2xl font-extrabold text-white">User Management</h1>
        <p className="mt-2 text-sm text-white/70">Supabase client not available.</p>
      </section>
    );
  }

  const { data: usersData, error } = await supabase.from("admin_users").select("*");

  if (error) {
    return (
      <section className="mx-auto w-full max-w-5xl">
        <h1 className="text-2xl font-extrabold text-white">User Management</h1>
        <p className="mt-2 text-sm text-white/70">Error fetching users: {error.message}</p>
      </section>
    );
  }

  const users: AdminUser[] = usersData ?? [];

  return (
    <section className="mx-auto w-full max-w-6xl">
      <div className="mb-6">
        <p className="text-xs font-semibold tracking-[0.25em] text-white/60">EXECUTIVE</p>
        <h1 className="mt-2 text-2xl font-extrabold text-white">User Management</h1>
        <p className="mt-2 text-sm text-white/70">Add, edit, or remove admin users.</p>
      </div>

      <UserList users={users} />
    </section>
  );
}
