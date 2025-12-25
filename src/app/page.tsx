import { createSupabaseServerClient } from "@/lib/supabase/server";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import StudentPackages from "@/components/StudentPackages";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ErrorDisplay from "@/components/ErrorDisplay";

export const runtime = "edge";

export default async function Home() {
  const supabase = await createSupabaseServerClient();
  
  if (!supabase) {
    return <ErrorDisplay message="Koneksi ke database gagal. Periksa konfigurasi server." />;
  }

  // Ambil konten dari CMS Database
  const { data: content, error } = await supabase
    .from("landing_content")
    .select("*")
    .single();
  
  // Gracefully handle error fetching content, but don't crash the page.
  // The page can still render with default text.
  if (error) {
    console.error("Error fetching landing page content:", error.message);
  }

  // Fallback jika database belum siap/kosong
  const heroTitle = content?.hero_title || "Jelajahi Dunia Bersama Ferrari Tour & Travel";
  const heroSubtitle = content?.hero_subtitle || "Sahabat perjalanan terbaik Anda untuk pengalaman tak terlupakan.";
  
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Dynamic Hero Section */}
      <div className="relative">
         <Hero 
            title={heroTitle}
            subtitle={heroSubtitle}
            ctaText={content?.hero_cta_text || "Pesan Sekarang"}
         />
      </div>

      <Features 
         f1Title={content?.feature_1_title} f1Desc={content?.feature_1_desc}
         f2Title={content?.feature_2_title} f2Desc={content?.feature_2_desc}
      />
      
      <StudentPackages />
      <Testimonials />
      <CallToAction />
      <Footer />
    </main>
  );
}