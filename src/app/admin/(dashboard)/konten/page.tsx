import { redirect } from "next/navigation";
import { createSupabaseServerClient, requireAdminUser } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export const runtime = "edge";

export default async function LandingContentPage() {
  const { ok, role } = await requireAdminUser();
  if (!ok || (role !== "marketing" && role !== "pimpinan")) redirect("/admin/login");

  const supabase = await createSupabaseServerClient();
  const { data: content } = await supabase!.from("landing_content").select("*").single();

  // Server Action untuk simpan perubahan
  async function updateContent(formData: FormData) {
    "use server";
    const supabase = await createSupabaseServerClient();
    
    const updates = {
      hero_title: formData.get("hero_title"),
      hero_subtitle: formData.get("hero_subtitle"),
      hero_cta_text: formData.get("hero_cta_text"),
      feature_1_title: formData.get("feature_1_title"),
      feature_1_desc: formData.get("feature_1_desc"),
      feature_2_title: formData.get("feature_2_title"),
      feature_2_desc: formData.get("feature_2_desc"),
      updated_at: new Date().toISOString(),
    };

    await supabase!.from("landing_content").update(updates).eq("id", 1);
    revalidatePath("/"); // Refresh Homepage Asli
    revalidatePath("/admin/konten");
  }

  return (
    <section className="mx-auto w-full max-w-4xl pb-20">
      <div className="mb-8 flex items-center justify-between">
        <div>
           <p className="text-xs font-semibold tracking-[0.25em] text-white/60">CMS ENTERPRISE</p>
           <h1 className="mt-2 text-2xl font-extrabold text-white">Homepage Editor</h1>
           <p className="mt-2 text-sm text-white/70">Ubah tampilan website utama secara real-time.</p>
        </div>
        <div className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold animate-pulse">
           LIVE SYSTEM
        </div>
      </div>

      <form action={updateContent} className="space-y-8">
        {/* HERO SECTION */}
        <div className="rounded-3xl bg-slate-900 p-8 shadow-xl border border-white/10">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-red-600 rounded-full"/> 1. Hero Section (Banner Utama)
          </h2>
          <div className="grid gap-6">
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-2">Judul Besar (Headline)</label>
              <input name="hero_title" defaultValue={content?.hero_title} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-2">Sub-Judul (Deskripsi Pendek)</label>
              <textarea name="hero_subtitle" defaultValue={content?.hero_subtitle} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none transition h-24" />
            </div>
             <div>
              <label className="block text-sm font-semibold text-white/80 mb-2">Teks Tombol (CTA)</label>
              <input name="hero_cta_text" defaultValue={content?.hero_cta_text} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none transition" />
            </div>
          </div>
        </div>

        {/* FEATURES SECTION */}
        <div className="rounded-3xl bg-slate-900 p-8 shadow-xl border border-white/10">
           <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-blue-600 rounded-full"/> 2. Fitur Unggulan
          </h2>
           <div className="grid gap-6 md:grid-cols-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-white/5">
                 <label className="block text-xs font-bold text-white/50 mb-2 uppercase tracking-wider">Fitur 1</label>
                 <input name="feature_1_title" defaultValue={content?.feature_1_title} className="w-full bg-transparent border-b border-white/10 p-2 text-white font-bold mb-2 focus:border-blue-500 outline-none" placeholder="Judul" />
                 <input name="feature_1_desc" defaultValue={content?.feature_1_desc} className="w-full bg-transparent p-2 text-sm text-white/70 focus:text-white outline-none" placeholder="Deskripsi" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-white/5">
                 <label className="block text-xs font-bold text-white/50 mb-2 uppercase tracking-wider">Fitur 2</label>
                 <input name="feature_2_title" defaultValue={content?.feature_2_title} className="w-full bg-transparent border-b border-white/10 p-2 text-white font-bold mb-2 focus:border-blue-500 outline-none" placeholder="Judul" />
                 <input name="feature_2_desc" defaultValue={content?.feature_2_desc} className="w-full bg-transparent p-2 text-sm text-white/70 focus:text-white outline-none" placeholder="Deskripsi" />
              </div>
           </div>
        </div>

        <button type="submit" className="w-full py-5 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold text-lg shadow-lg hover:scale-[1.01] transition-transform active:scale-95">
           Simpan Perubahan Website 🚀
        </button>
      </form>
    </section>
  );
}