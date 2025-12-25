import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/supabase/server";
import { createPackage } from "../actions";

export const runtime = "edge";

export default async function NewPackagePage() {
  const { ok, role } = await requireAdminUser();
  if (!ok || (role !== "marketing" && role !== "pimpinan")) redirect("/admin/login");

  return (
    <section className="mx-auto w-full max-w-4xl pb-20">
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-[0.25em] text-white/60 uppercase">Management</p>
        <h1 className="mt-2 text-3xl font-extrabold text-white">Tambah Paket Baru</h1>
        <p className="mt-2 text-sm text-white/70">Buat paket perjalanan wisata baru untuk ditampilkan di website.</p>
      </div>

      <form action={createPackage} className="space-y-8">
        {/* INFORMASI DASAR */}
        <div className="rounded-3xl bg-slate-900 p-8 shadow-xl border border-white/10">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-red-600 rounded-full"/> 1. Informasi Dasar
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-white/80 mb-2">Judul Paket</label>
              <input required name="title" placeholder="Contoh: Paket Study Tour Jogja" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-2">Slug (URL)</label>
              <input required name="slug" placeholder="contoh-paket-jogja" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-2">Lokasi</label>
              <input required name="location" placeholder="Yogyakarta" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-2">Durasi</label>
              <input required name="duration" placeholder="3 Hari 2 Malam" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-2">Harga Mulai (IDR)</label>
              <input required type="number" name="price_from" placeholder="1250000" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none transition" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-white/80 mb-2">URL Foto Utama (Hero Image)</label>
              <input required name="hero_image" placeholder="https://images.unsplash.com/..." className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none transition" />
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
              <textarea name="highlights" rows={4} placeholder="Hotel Bintang 3&#10;Makan 7x&#10;Free Guru" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-2">Inclusions / Fasilitas (Satu per baris)</label>
              <textarea name="inclusions" rows={4} placeholder="Bus pariwisata + crew&#10;Hotel + breakfast" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-2">Exclusions / Tidak Termasuk (Satu per baris)</label>
              <textarea name="exclusions" rows={4} placeholder="Pengeluaran pribadi&#10;Tambahan destinasi" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none transition" />
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
            placeholder="Day 1&#10;Briefing keberangkatan&#10;Perjalanan menuju lokasi&#10;&#10;Day 2&#10;Kunjungan edukasi&#10;Wisata budaya" 
            className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none transition font-mono text-sm" 
          />
        </div>

        {/* PENGATURAN */}
        <div className="rounded-3xl bg-slate-900 p-8 shadow-xl border border-white/10">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-purple-600 rounded-full"/> 4. Pengaturan
          </h2>
          <div className="flex items-center gap-3">
            <input type="checkbox" name="is_active" id="is_active" defaultChecked className="h-5 w-5 rounded border-white/10 bg-slate-950 text-red-600 focus:ring-red-500" />
            <label htmlFor="is_active" className="text-sm font-semibold text-white/80">Publikasikan paket ini (Tampilkan di website)</label>
          </div>
        </div>

        <div className="flex gap-4">
           <button type="submit" className="flex-1 py-5 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold text-lg shadow-lg hover:scale-[1.01] transition-transform active:scale-95">
              Simpan Paket Tour 🚀
           </button>
           <button type="button" onClick={() => window.history.back()} className="px-8 py-5 rounded-2xl bg-white/5 text-white font-bold border border-white/10 hover:bg-white/10 transition-colors">
              Batal
           </button>
        </div>
      </form>
    </section>
  );
}