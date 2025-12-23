"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

type HeroContent = {
  title: string;
  subtitle: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};

export default function Hero({ content }: { content?: HeroContent }) {
  const title = content?.title ?? "STUDY TOUR LEVEL UP!";
  const subtitle = content?.subtitle ?? "Bukan sekadar jalan-jalan. Ini pengalaman core memory buat siswa SD, SMP, SMA & Umum. Harga pelajar, fasilitas sultan.";
  const primary = content?.primary ?? { label: "Cek Paket Hits", href: "/#paket-pelajar" };
  const secondary = content?.secondary ?? { label: "Chat Admin", href: "https://wa.me/" };

  return (
    <section className="relative min-h-[110svh] flex flex-col items-center justify-center overflow-hidden bg-white pt-20">
      
      {/* Background Gradients (The Aura) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-300/30 rounded-full blur-[100px] mix-blend-multiply animate-blob" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-acid/30 rounded-full blur-[100px] mix-blend-multiply animate-blob [animation-delay:2s]" />
        <div className="absolute -bottom-32 left-1/2 w-[600px] h-[600px] bg-ferrari/10 rounded-full blur-[120px] mix-blend-multiply animate-blob [animation-delay:4s]" />
      </div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        
        {/* Badge Gen Alpha */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/50 backdrop-blur-sm px-4 py-1.5 mb-8 shadow-sm"
        >
          <span className="flex h-2 w-2 rounded-full bg-ferrari animate-pulse" />
          <span className="text-xs font-bold tracking-wide uppercase text-slate-600">
            #1 Pilihan Sekolah Kekinian
          </span>
        </motion.div>

        {/* Massive Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-balance text-6xl font-black tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl text-slate-900"
        >
          MAKIN <span className="bg-gradient-to-r from-ferrari via-pink-500 to-purple-600 bg-clip-text text-transparent">SERU</span>
          <br />
          <span className="relative inline-block">
            BELAJARNYA
            <motion.span 
              className="absolute -right-8 -top-8 text-acid"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              <Star className="w-12 h-12 fill-acid stroke-black" strokeWidth={1} />
            </motion.span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-8 max-w-2xl text-lg font-medium leading-relaxed text-slate-600 sm:text-xl"
        >
          {subtitle}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href={primary.href}
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-slate-900 px-8 py-4 text-base font-bold text-white transition-all hover:bg-slate-800 hover:ring-4 hover:ring-slate-200"
          >
            <span>{primary.label}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href={secondary.href}
            target="_blank"
            className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-900 transition-all hover:border-ferrari hover:text-ferrari hover:bg-ferrari/5"
          >
            {secondary.label}
          </Link>
        </motion.div>
      </div>
      
      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}