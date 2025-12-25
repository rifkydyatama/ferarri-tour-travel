import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Plus, Package, MapPin, Clock, Tag, Eye, Edit, Trash2 } from "lucide-react";
import { createSupabaseServerClient, requireAdminUser } from "@/lib/supabase/server";

export const runtime = "edge";

interface TourPackage {
  id: string;
  hero_image: string;
  title: string;
  location: string;
  is_active: boolean;
  duration: string;
  price_from: number;
  slug: string;
}

function formatIDR(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function AdminPackagesPage() {
  const { ok, role } = await requireAdminUser();
  if (!ok || (role !== "marketing" && role !== "pimpinan")) redirect("/admin/login");

  const supabase = await createSupabaseServerClient();
  const { data: packages, error } = await supabase!
    .from("tour_packages")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <section className="mx-auto w-full max-w-6xl">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.25em] text-white/60 uppercase">Management</p>
          <h1 className="mt-2 text-3xl font-extrabold text-white">Paket Tour</h1>
          <p className="mt-2 text-sm text-white/70">Kelola daftar paket perjalanan wisata sekolah.</p>
        </div>
        
        <Link
          href="/admin/paket/new"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02] active:scale-95"
        >
          <Plus className="h-5 w-5" />
          Tambah Paket Baru
        </Link>
      </div>

      {error ? (
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 text-red-200">
          Gagal mengambil data paket: {error.message}
        </div>
      ) : packages && packages.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(packages as TourPackage[]).map((pkg) => (
            <div key={pkg.id} className="group relative overflow-hidden rounded-3xl bg-slate-900 border border-white/10 shadow-xl transition hover:border-white/20">
              {/* Image Preview */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image 
                  src={pkg.hero_image} 
                  alt={pkg.title} 
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-white/90">
                    <MapPin className="h-3 w-3 text-red-500" />
                    {pkg.location}
                  </div>
                </div>
                {!pkg.is_active && (
                  <div className="absolute top-4 right-4 rounded-full bg-slate-950/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 backdrop-blur">
                    Draft
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-white line-clamp-1">{pkg.title}</h3>
                
                <div className="mt-4 flex flex-wrap gap-4 text-xs text-white/60">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {pkg.duration}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Tag className="h-3.5 w-3.5" />
                    {formatIDR(pkg.price_from)}
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2">
                  <Link
                    href={`/paket/${pkg.slug}`}
                    target="_blank"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-xs font-bold text-white transition hover:bg-white/10"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Pratinjau
                  </Link>
                  <Link
                    href={`/admin/paket/${pkg.id}/edit`}
                    className="inline-flex items-center justify-center rounded-xl bg-white/5 p-2 text-white transition hover:bg-white/10"
                  >
                    <Edit className="h-4 w-4 text-blue-400" />
                  </Link>
                  <button
                    className="inline-flex items-center justify-center rounded-xl bg-white/5 p-2 text-white transition hover:bg-white/10"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-white/10 py-20 text-center">
          <div className="rounded-full bg-white/5 p-6 text-white/20">
            <Package className="h-12 w-12" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-white">Belum ada paket</h3>
          <p className="mt-2 text-sm text-white/50">Mulai dengan membuat paket tour pertama Anda.</p>
          <Link
            href="/admin/paket/new"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-2 text-sm font-bold text-slate-900 transition hover:bg-white/90"
          >
            <Plus className="h-4 w-4" />
            Tambah Paket
          </Link>
        </div>
      )}
    </section>
  );
}