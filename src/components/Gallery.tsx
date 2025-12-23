"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram } from "lucide-react";

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

function GalleryCard({ src, caption, index }: GalleryItem & { index: number }) {
  // Random rotation for scrapbook effect
  const rotateVal = index % 2 === 0 ? 2 : -2;

  return (
    <motion.figure
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
      initial={{ rotate: rotateVal }}
      className="group relative mb-8 overflow-hidden rounded-3xl border-[6px] border-white bg-white shadow-lg transition-all"
      style={{ breakInside: "avoid" }}
    >
      <div className="relative overflow-hidden rounded-xl bg-slate-200">
        <Image
          src={src}
          alt={caption}
          width={600}
          height={400}
          className="h-auto w-full scale-100 object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Caption Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="font-bold text-white text-lg tracking-tight px-4 text-center">
            {caption}
          </span>
        </div>
      </div>
    </motion.figure>
  );
}

export default function Gallery({ content }: { content?: GalleryContent }) {
  const items = content?.items ?? [];

  return (
    <section id="galeri" className="bg-slate-50 py-24 scroll-mt-24 border-t border-slate-200">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
                <span className="text-ferrari font-black tracking-widest text-sm uppercase mb-2 block">Our Moments</span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900">
                    DOKUMENTASI SERU 📸
                </h2>
                <p className="mt-4 text-lg font-medium text-slate-600">
                    Bukan sekadar jalan-jalan, tapi bikin kenangan core memory!
                </p>
            </div>
            <a 
                href="https://instagram.com" 
              target="_blank"
              rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 font-bold text-slate-900 shadow-sm hover:text-pink-600 hover:border-pink-200 hover:bg-pink-50 transition-colors"
            >
                <Instagram className="w-5 h-5" />
                <span>Follow Kami</span>
            </a>
        </div>

        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 space-y-6">
          {items.map((item, idx) => (
            <GalleryCard key={item.caption} {...item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}