"use client";

import { motion } from "framer-motion";

type GalleryItem = {
  src: string;
  caption: string;
};

const ITEMS: GalleryItem[] = [
  {
    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80",
    caption: "SMAN 1 di Bali",
  },
  {
    src: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=1600&q=80",
    caption: "Study Tour di Jogja",
  },
  {
    src: "https://images.unsplash.com/photo-1529078155058-5d716f45d604?auto=format&fit=crop&w=1600&q=80",
    caption: "Armada Bus Berangkat Pagi",
  },
  {
    src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=80",
    caption: "Kenyamanan di Dalam Bus",
  },
  {
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
    caption: "Kunjungan Industri TVRI",
  },
  {
    src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80",
    caption: "Rombongan Siswa Happy",
  },
];

function GalleryCard({ src, caption }: GalleryItem) {
  return (
    <motion.figure
      whileHover={{ y: -4 }}
      transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
      className="group relative mb-5 overflow-hidden rounded-3xl bg-slate-100 shadow-sm ring-1 ring-black/5"
      style={{ breakInside: "avoid" }}
    >
      <div className="relative">
        <img
          src={src}
          alt={caption}
          className="h-auto w-full origin-center scale-100 object-cover transition-transform duration-300 ease-out group-hover:scale-[1.06]"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/60 via-slate-950/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
          <div className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {caption}
          </div>
        </div>
      </div>
    </motion.figure>
  );
}

export default function Gallery() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.25em] text-slate-500">GALLERY</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Dokumentasi Keseruan
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Momen terbaik dari study tour, kunjungan industri, dan wisata rombongan.
          </p>
        </div>

        <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {ITEMS.map((item) => (
            <GalleryCard key={item.caption} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
