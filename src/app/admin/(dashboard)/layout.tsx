import Link from "next/link";
import { redirect } from "next/navigation";
import { ClipboardPlus, FileText, LayoutDashboard, LogOut, Users, Wallet } from "lucide-react";
import type { ComponentType, ReactNode } from "react";

import { createSupabaseServerClient, requireAdminUser } from "@/lib/supabase/server";

type NavItem = {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { ok, user, role } = await requireAdminUser();
  if (!ok) redirect("/admin/login");

  const items: NavItem[] = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  ];

  if (role === "marketing") {
    items.push(
      { href: "/admin/booking/new", label: "Input Booking", icon: ClipboardPlus },
      { href: "/admin/konten", label: "Landing Content", icon: FileText },
    );
  }

  if (role === "tata_usaha") {
    items.push({ href: "/admin/keuangan", label: "Finance Report", icon: Wallet });
  }

  if (role === "pimpinan") {
    items.push(
      { href: "/admin/keuangan", label: "Finance Report", icon: Wallet },
      { href: "/admin/users", label: "User Management", icon: Users },
    );
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
        <aside className="border-b border-white/10 px-4 py-5 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-extrabold tracking-tight">Admin Dashboard</div>
              <div className="mt-1 text-xs text-white/60">{user.email ?? user.id}</div>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70">
              {role}
            </span>
          </div>

          <nav className="mt-6 grid gap-1">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-2xl border border-transparent px-3 py-2 text-sm font-semibold text-white/80 transition hover:border-white/10 hover:bg-white/5 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <form action={logout} className="mt-8">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </form>
        </aside>

        <main className="px-4 py-6 lg:px-8 lg:py-10">{children}</main>
      </div>
    </div>
  );
}
