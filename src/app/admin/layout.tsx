import Link from "next/link";
import {
  BookOpenCheck,
  BusFront,
  ChartNoAxesCombined,
  CreditCard,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-svh bg-gray-50 text-slate-900">
      <aside className="fixed inset-y-0 left-0 w-64 bg-slate-900 text-white">
        <div className="flex h-full flex-col">
          <div className="border-b border-white/10 px-5 py-5">
            <div className="text-lg font-extrabold tracking-tight">
              <span className="bg-linear-to-r from-ferrari to-sun bg-clip-text text-transparent">
                Ferrari Jaya
              </span>
              <span className="ml-2 text-white/80">Admin</span>
            </div>
            <p className="mt-2 text-xs leading-5 text-white/55">
              Dashboard internal untuk kelola booking & statistik.
            </p>
          </div>

          <nav className="flex-1 px-3 py-4">
            <div className="grid gap-1">
              <Link
                href="/admin"
                className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                <LayoutDashboard className="h-4 w-4 text-ocean" />
                Dashboard
              </Link>

              <Link
                href="#"
                className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                <BookOpenCheck className="h-4 w-4 text-sun" />
                Booking Masuk
              </Link>

              <Link
                href="#"
                className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                <BusFront className="h-4 w-4 text-leaf" />
                Manajemen Armada
              </Link>

              <Link
                href="#"
                className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                <CreditCard className="h-4 w-4 text-ferrari" />
                Laporan Keuangan
              </Link>

              <Link
                href="#"
                className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                <LogOut className="h-4 w-4 text-white/70" />
                Logout
              </Link>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
                  <ChartNoAxesCombined className="h-5 w-5 text-ocean" />
                </div>
                <div>
                  <p className="text-sm font-bold">Ringkasan</p>
                  <p className="text-xs text-white/60">Pantau performa harian.</p>
                </div>
              </div>
            </div>
          </nav>

          <div className="border-t border-white/10 px-5 py-4 text-xs text-white/50">
            © {new Date().getFullYear()} Ferrari Jaya Group
          </div>
        </div>
      </aside>

      <div className="pl-64">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div>
              <p className="text-sm font-semibold text-slate-600">Selamat Datang, Admin</p>
              <p className="text-xs text-slate-500">Kelola booking dan pantau aktivitas terbaru.</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-bold text-slate-900">Admin</p>
                <p className="text-xs text-slate-500">Ferrari Jaya Group</p>
              </div>
              <div
                className="grid h-10 w-10 place-items-center rounded-full bg-ferrari text-sm font-extrabold text-white"
                aria-label="Avatar Admin"
              >
                A
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
