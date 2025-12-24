import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";
import { requireAdminUser } from "@/lib/supabase/server";
import {
  BookOpenCheck,
  BusFront,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  Map,
  Users,
  CalendarDays,
  Megaphone,
  Briefcase,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const runtime = "edge";

type NavItemProps = {
  href: string;
  icon: LucideIcon;
  label: string;
  disabled?: boolean;
};

// Helper NavItem (Tetap sama)
function NavItem({ href, icon: Icon, label, disabled = false }: NavItemProps) {
  if (disabled) {
    return (
      <button disabled className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-white/30 cursor-not-allowed">
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </button>
    );
  }
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-white/70 transition-all hover:bg-white/10 hover:text-white"
    >
      <Icon className="h-5 w-5 transition-colors group-hover:text-acid" />
      <span>{label}</span>
    </Link>
  );
}

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = await requireAdminUser();
  if (!auth.ok) {
    return <LoginForm nextPath="/admin" initialMessage={auth.message} />;
  }

  const { role, user } = auth;
  const isExecutive = role === "pimpinan" || role === "admin" || role === "superadmin";

  return (
    <div className="min-h-svh bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-72 bg-[#09090b] text-white z-20 hidden md:flex flex-col border-r border-white/5">
        <div className="p-6">
          <Link href="/" className="block group">
            <div className="text-2xl font-black tracking-tighter italic transition-opacity group-hover:opacity-80">
              <span className="text-ferrari">FERRARI</span>
              <span className="text-white">ADMIN</span>
            </div>
            <p className="text-xs text-white/40 font-mono mt-1 tracking-widest uppercase">
              Role: <span className="text-acid">{role.replace('_', ' ')}</span>
            </p>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">

          <div className="px-4 py-2 text-xs font-bold text-white/30 uppercase tracking-widest">Main</div>
          <NavItem href="/admin" icon={LayoutDashboard} label="Dashboard" />

          {(role === "marketing" || isExecutive) && (
            <>
              <div className="px-4 py-2 mt-6 text-xs font-bold text-white/30 uppercase tracking-widest">Marketing</div>
              <NavItem href="/admin/booking/new" icon={BookOpenCheck} label="Input Booking" />
              <NavItem href="/admin/konten" icon={FileText} label="Konten Landing" />
            </>
          )}

          {(role === "tata_usaha" || isExecutive) && (
            <>
              <div className="px-4 py-2 mt-6 text-xs font-bold text-white/30 uppercase tracking-widest">Tata Usaha</div>
              <NavItem href="/admin/keuangan" icon={CreditCard} label="Laporan Keuangan" />
            </>
          )}

          {isExecutive && (
            <>
              <div className="px-4 py-2 mt-6 text-xs font-bold text-white/30 uppercase tracking-widest">Pimpinan</div>
              <NavItem href="/admin/users" icon={Users} label="Manajemen User" />
            </>
          )}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-white/5">
           <div className="rounded-2xl bg-linear-to-br from-white/10 to-transparent p-4 border border-white/5">
              <div className="flex items-center gap-3 mb-3">
                 <div className="h-10 w-10 rounded-full bg-linear-to-tr from-ferrari to-purple flex items-center justify-center font-bold text-white text-sm">
                    {role.charAt(0).toUpperCase()}
                 </div>
                 <div className="overflow-hidden">
                    <p className="text-sm font-bold text-white truncate">{user.email?.split('@')[0]}</p>
                    <p className="text-xs text-white/50 truncate capitalize">{role.replace('_', ' ')}</p>
                 </div>
              </div>
              <Link
                href="/admin/logout"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-white/5 py-2 text-xs font-bold text-white/70 hover:bg-red-500/20 hover:text-red-400 transition-colors"
              >
                <LogOut className="h-3 w-3" />
                Sign Out
              </Link>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-72 min-w-0 flex flex-col min-h-svh">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-6 py-4 flex items-center justify-between">
          <div className="md:hidden font-black italic text-slate-900">FERRARI<span className="text-ferrari">ADMIN</span></div>
          <div className="hidden md:block">
             <h2 className="text-lg font-bold text-slate-900 capitalize">
               {isExecutive ? 'Executive Control Room' : `Dashboard ${role.replace('_', ' ')}`}
             </h2>
          </div>
          <div className="flex items-center gap-4">
             <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/> System Online
             </div>
             <button
              type="button"
              aria-label="Pengaturan"
              title="Pengaturan"
              className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
             >
                <Settings className="w-5 h-5" />
             </button>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-x-hidden">
            {children}
        </main>
      </div>
    </div>
  );
}