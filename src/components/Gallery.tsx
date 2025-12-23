"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type GalleryItem = {
  src: string;
  caption: string;
};

type GalleryContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: GalleryItem[];
};

function GalleryCard({ src, caption }: GalleryItem) {
  return (
    <motion.figure
      whileHover={{ y: -4 }}
      transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
      className="group relative mb-5 overflow-hidden rounded-3xl bg-slate-100 shadow-sm ring-1 ring-black/5"
      style={{ breakInside: "avoid" }}
    >
      <div className="relative">
        <Image
          src={src}
          alt={caption}
          width={1200}
          height={800}
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

export default function Gallery({ content }: { content?: GalleryContent }) {
  const items = content?.items ?? [];

  return (
    <section id="armada" className="bg-white scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.25em] text-slate-500">
            {content?.eyebrow ?? "GALLERY"}
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {content?.title ?? "Dokumentasi Keseruan"}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            {content?.subtitle ??
              "Momen terbaik dari study tour, kunjungan industri, dan wisata rombongan."}
          </p>
        </div>

        <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {items.map((item) => (
            <GalleryCard key={item.caption} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
