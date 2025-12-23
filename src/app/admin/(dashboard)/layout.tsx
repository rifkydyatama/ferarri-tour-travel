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
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Helper component untuk menu item biar kodenya rapi
type NavItemProps = {
  href: string;
  icon: LucideIcon;
  label: string;
  disabled?: boolean;
};

function NavItem({ href, icon: Icon, label, disabled = false }: NavItemProps) {
  if (disabled) {
    return (
      <button disabled className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-white/30 cursor-not-allowed">
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </button>
    );
  }
  
  // Logic active sederhana (bisa dipercanggih pake usePathname di client component, tapi ini server component)
  // Kita buat style umum dulu
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-white/70 transition-all hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-acid/5"
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
            <p className="text-xs text-white/40 font-mono mt-1 tracking-widest">INTERNAL DASHBOARD</p>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          <div className="px-4 py-2 text-xs font-bold text-white/30 uppercase tracking-widest">Main Menu</div>
          <NavItem href="/admin" icon={LayoutDashboard} label="Dashboard" />
          <NavItem href="/admin/konten" icon={FileText} label="Konten Landing" />
          
          <div className="px-4 py-2 mt-6 text-xs font-bold text-white/30 uppercase tracking-widest">Operasional</div>
          <NavItem href="#" icon={BookOpenCheck} label="Booking Masuk" disabled />
          <NavItem href="#" icon={BusFront} label="Manajemen Armada" disabled />
          <NavItem href="/admin/keuangan" icon={CreditCard} label="Laporan Keuangan" />
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="rounded-2xl bg-linear-to-br from-white/10 to-transparent p-4 border border-white/5">
              <div className="flex items-center gap-3 mb-3">
                 <div className="h-10 w-10 rounded-full bg-linear-to-tr from-ferrari to-purple flex items-center justify-center font-bold text-white text-sm">
                    AD
                 </div>
                 <div className="overflow-hidden">
                    <p className="text-sm font-bold text-white truncate">Super Admin</p>
                    <p className="text-xs text-white/50 truncate">admin@ferrari.com</p>
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
        {/* Header Mobile/Desktop */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-6 py-4 flex items-center justify-between">
          <div className="md:hidden font-black italic text-slate-900">FERRARI<span className="text-ferrari">ADMIN</span></div>
          
          <div className="hidden md:block">
             <h2 className="text-lg font-bold text-slate-900">Overview</h2>
          </div>

          <div className="flex items-center gap-4">
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