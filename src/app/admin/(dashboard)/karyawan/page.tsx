import Link from "next/link";
import { requireAdminUser } from "@/lib/supabase/server";
import KaryawanClient from "./KaryawanClient";

export const runtime = "edge";

export default async function KaryawanPage() {
  const auth = await requireAdminUser();
  if (!auth.ok) return null;

  const allowed = auth.role === "tata_usaha" || auth.role === "pimpinan" || auth.role === "admin" || auth.role === "superadmin";

  if (!allowed) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-black text-slate-900">Akses Ditolak</h1>
        <p className="mt-2 text-sm text-slate-600">Halaman ini hanya untuk Tata Usaha/Executive.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-black text-slate-900">Laporan Karyawan</h1>
        <p className="mt-2 text-sm text-slate-600">
          Modul ini masih tahap scaffolding. Nanti bisa dihubungkan ke tabel employees dan absensi.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/admin/payroll"
            className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
          >
            Payroll
          </Link>
          <Link
            href="/admin/users"
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900"
          >
            Manajemen User
          </Link>
        </div>
      </div>

      <KaryawanClient />
    </div>
  );
}
