import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { requireAdminUser } from "@/lib/supabase/server";
import UsersClient, { type UserRow } from "./UsersClient";

export const runtime = "edge";

async function loadUsers(): Promise<UserRow[]> {
  const supabase = createSupabaseAdmin();

  const { data: adminUsers } = await supabase
    .from("admin_users")
    .select("user_id, role")
    .order("user_id", { ascending: true });

  const { data: usersData } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 200,
  });

  const usersById = new Map(usersData?.users?.map((u) => [u.id, u]) ?? []);

  return (
    adminUsers?.map((row) => {
      const u = usersById.get(row.user_id);
      return {
        userId: row.user_id,
        email: u?.email ?? null,
        role: (row as { role?: string | null }).role ?? null,
      };
    }) ?? []
  );
}

export default async function UsersPage() {
  const auth = await requireAdminUser();
  if (!auth.ok) return null;

  if (auth.role !== "pimpinan") {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-black text-slate-900">Akses Ditolak</h1>
        <p className="mt-2 text-sm text-slate-600">
          Halaman ini hanya bisa diakses oleh role <span className="font-bold">pimpinan</span>.
        </p>
      </div>
    );
  }

  const initialUsers = await loadUsers();
  return <UsersClient initialUsers={initialUsers} />;
}
