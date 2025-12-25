import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin, Clock, Tag } from "lucide-react";

// This type is defined inline for the component's props to ensure it only expects what it uses.
// This is safer than a shared, potentially inaccurate, manual type.
type PackageCardProps = {
  pkg: {
    id: any; // Add id to be used as key
    slug: string;
    hero_image: string;
    title: string;
    location: string;
    duration: string;
    price_from: number;
  };
};

function formatPrice(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function PackageCard({ pkg }: PackageCardProps) {
  return (
    <Link
      href={`/paket/${pkg.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-ferrari hover:shadow-lg hover:shadow-ferrari/10"
    >
      <div className="relative h-48 w-full">
        <Image
          src={pkg.hero_image || "/placeholder.jpg"}
          alt={`Gambar untuk ${pkg.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-0 right-0 m-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1">
          <ArrowUpRight className="h-5 w-5 text-slate-700" />
        </div>
      </div>
      <div className="p-5">
        <h3 className="mb-2 text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-ferrari">
          {pkg.title}
        </h3>

        <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-slate-400" />
            <span>{pkg.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-slate-400" />
            <span>{pkg.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-slate-400" />
            <span>Mulai dari {formatPrice(pkg.price_from)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
