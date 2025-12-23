"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";

type DestinationsContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: Array<{
    title: string;
    price: string;
    badge: string;
    badgeClass: string;
    gradientClass: string; // Bisa kita abaikan atau pakai sebagai overlay
    ctaLabel: string;
    ctaHref: string;
  }>;
};

export default function Destinations({ content }: { content?: DestinationsContent }) {
  const items = content?.items ?? [];

  return (
    <section id="destinasi" className="bg-white py-24 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-3 inline-block rounded-full bg-acid px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-900 shadow-sm transform -rotate-2">
            {content?.eyebrow ?? "WISATA HITS"}
          </span>
          <h2 className="text-4xl font-black tracking-tighter text-slate-900 sm:text-6xl">
            {content?.title ?? "DESTINASI POPULER"}
          </h2>
          <p className="mt-4 max-w-2xl text-lg font-medium text-slate-500">
            {content?.subtitle ?? "Spot foto terbaik, wahana seru, dan kenangan yang nggak bakal lupa."}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative h-100 overflow-hidden rounded-[2.5rem] bg-slate-200 shadow-lg"
            >
              {/* Image Placeholder (Ganti real image nanti) */}
              <div className="absolute inset-0 bg-slate-300 transition-transform duration-700 group-hover:scale-110" />
              <div className={`absolute inset-0 opacity-40 mix-blend-overlay transition-opacity group-hover:opacity-60 bg-linear-to-br ${item.gradientClass || "from-ferrari to-purple"}`} />
              
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

              {/* Price Tag Sticker */}
              <div className="absolute right-4 top-4 rotate-3 transform rounded-2xl bg-white px-4 py-2 font-black text-slate-900 shadow-xl transition-transform group-hover:rotate-6 group-hover:scale-110">
                <span className="text-xs font-bold text-slate-400 block -mb-1">Mulai</span>
                {item.price}
              </div>

              {/* Badge */}
              <div className="absolute left-4 top-4">
                 <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-white backdrop-blur-md ${item.badgeClass || "bg-black/30 border border-white/20"}`}>
                    {item.badge}
                 </span>
              </div>

              {/* Content Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-white/80 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">Indonesia</span>
                    </div>
                    <h3 className="text-3xl font-black uppercase leading-none text-white text-balance">
                      {item.title}
                    </h3>
                  </div>
                  
                  <Link
                    href={item.ctaHref}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-acid text-slate-900 transition-all hover:bg-white hover:scale-110 shadow-lg shadow-acid/20"
                  >
                    <ArrowUpRight className="h-6 w-6" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}