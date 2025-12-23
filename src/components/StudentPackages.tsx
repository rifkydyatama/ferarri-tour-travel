"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type PackageItem = {
  slug: string;
  title: string;
  subtitle: string;
  badges: Array<{ label: string; className: string }>;
};

const packages: PackageItem[] = [
  {
    slug: "jogja",
    title: "Paket Study Tour Jogja",
    subtitle: "Candi, museum, edukasi budaya + itinerary sekolah yang rapi.",
    badges: [
      { label: "SMP/MTs", className: "bg-sun text-slate-900" },
      { label: "SMA", className: "bg-ocean text-white" },
    ],
  },
  {
    slug: "industri",
    title: "Kunjungan Industri Surabaya",
    subtitle: "Program khusus SMK: kunjungan pabrik/instansi + dokumentasi.",
    badges: [{ label: "SMK", className: "bg-leaf text-slate-900" }],
  },
  {
    slug: "religi",
    title: "Wisata Religi Wali 5",
    subtitle: "Rute religi untuk rombongan sekolah maupun umum, nyaman & terarah.",
    badges: [
      { label: "Umum", className: "bg-plum text-white" },
      { label: "Best Seller", className: "bg-sun text-slate-900" },
    ],
  },
  {
    slug: "bromo",
    title: "Paket Wisata Bromo",
    subtitle: "Sunrise Bromo + spot ikonik, cocok untuk outing kelas & rombongan.",
    badges: [
      { label: "SMP/MTs", className: "bg-sun text-slate-900" },
      { label: "SMA/SMK", className: "bg-ocean text-white" },
    ],
  },
];

export default function StudentPackages() {
  return (
    <section id="paket-pelajar" className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold tracking-[0.25em] text-slate-500">
            STUDY TOUR
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Paket Pelajar & Rombongan
          </h2>
          <p className="max-w-2xl text-base leading-7 text-slate-600">
            Fokus untuk sekolah: Study Tour, Kunjungan Industri SMK, dan Wisata
            Umum.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {packages.map((pkg) => (
            <motion.article
              key={pkg.slug}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5"
            >
              <div className="flex flex-wrap items-center gap-2">
                {pkg.badges.map((b) => (
                  <span
                    key={b.label}
                    className={
                      "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold " +
                      b.className
                    }
                  >
                    {b.label}
                  </span>
                ))}
              </div>

              <h3 className="mt-4 text-lg font-extrabold tracking-tight text-slate-900">
                {pkg.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {pkg.subtitle}
              </p>

              <div className="mt-6 flex items-center gap-3">
                <Link
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl bg-ferrari px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95"
                >
                  Konsultasi
                </Link>

                <Link
                  href={`/paket/${pkg.slug}`}
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-ocean"
                >
                  Detail
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}