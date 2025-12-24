import Link from "next/link";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import type { ReactNode } from "react";

export const runtime = "edge";

import { createSupabaseServerClient, requireAdminUser } from "@/lib/supabase/server";
import SidebarNav, { type SidebarSection } from "./SidebarNav";

export default async function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { ok, user, role } = await requireAdminUser();
  if (!ok) redirect("/admin/login");

  const sections: SidebarSection[] = [{
    title: "DASHBOARD",
    items: [{ href: "/admin", label: "Dashboard", icon: "dashboard" }],
  }];

  if (role === "marketing") {
    sections.push({
      title: "MARKETING",
      items: [
        { href: "/admin/booking/new", label: "Input Booking", icon: "booking" },
        { href: "/admin/konten", label: "Landing Content", icon: "content" },
      ],
    });
  }

  if (role === "tata_usaha") {
    sections.push({
      title: "FINANCE",
      items: [{ href: "/admin/keuangan", label: "Finance Report", icon: "finance" }],
    });
  }

  if (role === "pimpinan") {
    sections.push({
      title: "FINANCE",
      items: [{ href: "/admin/keuangan", label: "Finance Report", icon: "finance" }],
    });
    sections.push({
      title: "EXECUTIVE",
      items: [{ href: "/admin/users", label: "User Management", icon: "users" }],
    });
  }

  async function logout() {
    "use server";
    const supabase = await createSupabaseServerClient();
    await supabase?.auth.signOut();
    redirect("/admin/login");
  }

  return (
    <div className="min-h-svh bg-slate-950 text-white">
      <div className="mx-auto grid min-h-svh w-full max-w-7xl grid-cols-1 lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-white/10 bg-[#09090b] px-4 py-5 lg:border-b-0 lg:border-r">
          <div className="flex min-h-[calc(100svh-40px)] flex-col">
            <div className="px-3">
              <Link href="/admin" className="inline-flex items-baseline gap-2">
                <span className="text-2xl font-extrabold italic tracking-tight text-ferrari">
                  Ferrari
                </span>
                <span className="text-2xl font-extrabold italic tracking-tight text-white">
                  Admin
                </span>
              </Link>
              <div className="mt-2 text-xs font-semibold tracking-[0.25em] text-zinc-500">
                CONTROL CENTER
              </div>
            </div>

            <SidebarNav sections={sections} />

            <div className="mt-auto">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-bold text-white/90">
                      {user.email ?? user.id}
                    </div>
                    <div className="mt-1 text-xs text-zinc-500">Signed in</div>
                  </div>
                  <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold tracking-widest text-white/75">
                    {role}
                  </span>
                </div>

                <form action={logout} className="mt-4">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm font-semibold text-zinc-400 transition hover:bg-white/5 hover:text-white"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </form>
              </div>
            </div>
          </div>
        </aside>

        <main className="px-4 py-6 lg:px-8 lg:py-10">{children}</main>
      </div>
    </div>
  );
}
