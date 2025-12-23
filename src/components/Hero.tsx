"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-svh overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-ferrari via-plum to-ocean" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-sun/40 blur-2xl animate-blob" />
        <div className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-leaf/35 blur-2xl animate-blob [animation-delay:2.5s]" />
        <div className="absolute -bottom-28 left-1/3 h-96 w-96 rounded-full bg-white/20 blur-2xl animate-blob [animation-delay:5s]" />
      </div>

      <div className="relative mx-auto flex min-h-svh max-w-6xl flex-col items-center justify-center px-6 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="text-balance text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          Liburan Seru Tanpa Ragu
        </motion.h1>

        <p className="mt-5 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">
          PT Ferrari Jaya Group — Tour & Travel. Energi penuh warna, pelayanan rapi, dan
          perjalanan yang bikin nagih.
        </p>

        <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white/90"
          >
            Cek Jadwal Bus
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-2xl border border-white/50 bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:border-white/80"
          >
            Paket Wisata
          </Link>
        </div>
      </div>
    </section>
  );
}
