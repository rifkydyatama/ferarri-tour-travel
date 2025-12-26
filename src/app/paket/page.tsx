import type { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PackageCard from "@/components/PackageCard";
import PackageFilters from "@/components/PackageFilters";
import ErrorDisplay from "@/components/ErrorDisplay";

export const metadata: Metadata = {
  title: "Semua Paket Tour",
};

type PackagesPageProps = {
  searchParams: {
    q?: string;
    location?: string;
  };
};

interface TourPackage {
  id: string;
  slug: string;
  title: string;
  location: string;
  duration: string;
  price_from: number;
  hero_image: string;
}

export default async function PackagesPage({ searchParams }: PackagesPageProps) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return <ErrorDisplay message="Koneksi ke database gagal. Periksa konfigurasi server." />;
  }

  const query = searchParams?.q;
  const location = searchParams?.location;

  // Build the query dynamically
  let packageQuery = supabase
    .from("tour_packages")
    .select("*")
    .eq("is_active", true);

  if (query) {
    // Using .or to search in title or location. Adjust as needed.
    packageQuery = packageQuery.or(`title.ilike.%${query}%,location.ilike.%${query}%`);
  }

  if (location) {
    packageQuery = packageQuery.eq("location", location);
  }

  // Fetch all packages based on filters
  const { data: packages, error } = await packageQuery.order("created_at", { ascending: false });

  // Fetch unique locations for the filter dropdown (this should not be filtered)
  const { data: locationsData, error: locationsError } = await supabase
    .from("tour_packages")
    .select("location")
    .eq("is_active", true);

  const uniqueLocations = locationsData
    ? [...new Set(locationsData.map((item: { location: string }) => item.location))].sort()
    : [];

  return (
    <div className="min-h-svh bg-white text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-14">
        <header className="max-w-3xl">
          <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">
            Jelajahi Semua{" "}
            <span className="bg-linear-to-r from-ferrari to-ocean bg-clip-text text-transparent">
              Paket Tur
            </span>
            <span className="block text-slate-900">Kami</span>
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
            Temukan petualangan Anda berikutnya. Kami menawarkan berbagai pilihan paket perjalanan yang dirancang untuk memberikan pengalaman tak terlupakan.
          </p>
        </header>

        <div className="mt-16">
          <PackageFilters locations={uniqueLocations} />

          {(error || locationsError) && <p className="text-center text-red-500">{error?.message || locationsError?.message}</p>}
          
          {!error && !packages?.length && (
            <div className="text-center text-slate-500 rounded-lg border-2 border-dashed border-slate-300 p-12">
                <h3 className="text-lg font-semibold text-slate-700">Hasil Tidak Ditemukan</h3>
                <p className="mt-2">Coba sesuaikan filter atau kata kunci pencarian Anda.</p>
            </div>
          )}

          {packages && packages.length > 0 && (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {(packages as TourPackage[]).map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
