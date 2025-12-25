"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, MapPin } from "lucide-react";

type PackageFiltersProps = {
  locations: string[];
};

export default function PackageFilters({ locations }: PackageFiltersProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleLocationChange = (location: string) => {
    const params = new URLSearchParams(searchParams);
    if (location) {
      params.set("location", location);
    } else {
      params.delete("location");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-12 grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-3">
      <div className="relative">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          id="search"
          type="text"
          placeholder="Cari paket (cth: Bromo, Jogja)"
          className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-4 text-slate-800 placeholder:text-slate-400 focus:border-ferrari focus:ring-ferrari"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("q")?.toString()}
        />
      </div>

      <div className="relative">
        <label htmlFor="location" className="sr-only">
          Location
        </label>
        <MapPin className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <select
          id="location"
          className="w-full appearance-none rounded-lg border border-slate-300 bg-white py-2 pl-10 pr-4 text-slate-800 focus:border-ferrari focus:ring-ferrari"
          onChange={(e) => handleLocationChange(e.target.value)}
          defaultValue={searchParams.get("location")?.toString()}
        >
          <option value="">Semua Lokasi</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Placeholder for future filters e.g. price */}
      <div className="hidden md:block">
        {/* <p className="text-sm text-slate-500">Filter lain akan datang!</p> */}
      </div>
    </div>
  );
}

