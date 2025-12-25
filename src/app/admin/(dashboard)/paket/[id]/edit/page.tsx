import { notFound, redirect } from "next/navigation";
import { createSupabaseServerClient, requireAdminUser } from "@/lib/supabase/server";
import { updatePackage } from "../../actions";

export const runtime = "edge";

interface ItineraryItem {
  day: string;
  items: string[];
}

interface TourPackage {
  id: string;
  title: string;
  slug: string;
  location: string;
  duration: string;
  price_from: number;
  hero_image: string;
  highlights: string[] | null;
  inclusions: string[] | null;
  exclusions: string[] | null;
  itinerary: ItineraryItem[] | null;
  is_active: boolean;
}

export default async function EditPackagePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const { ok, role } = await requireAdminUser();
  if (!ok || (role !== "marketing" && role !== "pimpinan")) redirect("/admin/login");

  const supabase = await createSupabaseServerClient();
  const { data: pkg } = await supabase!
    .from("tour_packages")
    .select("*")
    .eq("id", id)
    .single<TourPackage>();

  if (!pkg) notFound();

  // Helper to format JSON arrays back to textarea string
  const arrayToText = (arr: string[] | null) => (Array.isArray(arr) ? arr.join("\n") : "");
  
  // Helper to format itinerary back to textarea string
  const itineraryToText = (itinerary: ItineraryItem[] | null) => {
    if (!Array.isArray(itinerary)) return "";
    return itinerary.map(item => `${item.day}\n${item.items.join("\n")}`).join("\n\n");
  };

  const updatePackageWithId = updatePackage.bind(null, id);

  return (
    <section className="mx-auto w-full max-w-4xl pb-20">
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-[0.25em] text-white/60 uppercase">Management</p>
        <h1 className="mt-2 text-3xl font-extrabold text-white">Edit Paket: {pkg.title}</h1>
        <p className="mt-2 text-sm text-white/70">Perbarui informasi paket perjalanan wisata.</p>
      </div>

      <form action={updatePackageWithId} className="space-y-8">
        {/* INFORMASI DASAR */}
        <div className="rounded-3xl bg-slate-900 p-8 shadow-xl border border-white/10">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-red-600 rounded-full"/> 1. Informasi Dasar
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-white/80 mb-2">Judul Paket</label>
              <input required name="title" defaultValue={pkg.title} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-2">Slug (URL)</label>
              <input required name="slug" defaultValue={pkg.slug} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-2">Lokasi</label>
              <input required name="location" defaultValue={pkg.location} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-2">Durasi</label>
              <input required name="duration" defaultValue={pkg.duration} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-2">Harga Mulai (IDR)</label>
              <input required type="number" name="price_from" defaultValue={pkg.price_from} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none transition" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-white/80 mb-2">URL Foto Utama (Hero Image)</label>
              <input required name="hero_image" defaultValue={pkg.hero_image} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none transition" />
            </div>
          </div>
        </div>

        {/* DETAIL PAKET */}
        <div className="rounded-3xl bg-slate-900 p-8 shadow-xl border border-white/10">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-blue-600 rounded-full"/> 2. Detail Paket
          </h2>
          <div className="grid gap-6">
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-2">Highlights (Satu per baris)</label>
              <textarea name="highlights" rows={4} defaultValue={arrayToText(pkg.highlights)} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-2">Inclusions / Fasilitas (Satu per baris)</label>
              <textarea name="inclusions" rows={4} defaultValue={arrayToText(pkg.inclusions)} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-2">Exclusions / Tidak Termasuk (Satu per baris)</label>
              <textarea name="exclusions" rows={4} defaultValue={arrayToText(pkg.exclusions)} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none transition" />
            </div>
          </div>
        </div>

        {/* ITINERARY */}
        <div className="rounded-3xl bg-slate-900 p-8 shadow-xl border border-white/10">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-green-600 rounded-full"/> 3. Itinerary / Rundown
          </h2>
          <p className="mb-4 text-sm text-white/50">Format: Baris pertama adalah Judul Hari, baris berikutnya adalah item kegiatan. Pisahkan antar hari dengan baris kosong.</p>
          <textarea 
            name="itinerary" 
            rows={10} 
            defaultValue={itineraryToText(pkg.itinerary)}
            className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none transition font-mono text-sm" 
          />
        </div>

        {/* PENGATURAN */}
        <div className="rounded-3xl bg-slate-900 p-8 shadow-xl border border-white/10">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-purple-600 rounded-full"/> 4. Pengaturan
          </h2>
          <div className="flex items-center gap-3">
            <input type="checkbox" name="is_active" id="is_active" defaultChecked={pkg.is_active} className="h-5 w-5 rounded border-white/10 bg-slate-950 text-red-600 focus:ring-red-500" />
            <label htmlFor="is_active" className="text-sm font-semibold text-white/80">Publikasikan paket ini (Tampilkan di website)</label>
          </div>
        </div>

        <div className="flex gap-4">
           <button type="submit" className="flex-1 py-5 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold text-lg shadow-lg hover:scale-[1.01] transition-transform active:scale-95">
              Simpan Perubahan 🚀
           </button>
           <button type="button" onClick={() => window.history.back()} className="px-8 py-5 rounded-2xl bg-white/5 text-white font-bold border border-white/10 hover:bg-white/10 transition-colors">
              Batal
           </button>
        </div>
      </form>
    </section>
  );
}