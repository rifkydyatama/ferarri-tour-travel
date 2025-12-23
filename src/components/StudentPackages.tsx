"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type StudentPackagesContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  consultHref: string;
  items: Array<{
    slug: string;
    title: string;
    subtitle: string;
    badges: Array<{ label: string; className: string }>;
  }>;
};

export default function StudentPackages({ content }: { content?: StudentPackagesContent }) {
  const items = content?.items ?? [];

  return (
    <section id="paket-pelajar" className="bg-white py-24 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="font-mono text-acid font-bold tracking-widest uppercase mb-2 block">Let's Go!</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900">
              PILIH PETUALANGANMU
            </h2>
          </div>
          <Link 
            href={content?.consultHref ?? "#"}
            className="hidden md:inline-flex items-center gap-2 font-bold text-slate-900 border-b-2 border-acid pb-1 hover:text-ferrari hover:border-ferrari transition-colors"
          >
            Custom Paket Sendiri <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {items.map((pkg, i) => (
            <motion.div
              key={pkg.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative flex flex-col justify-between rounded-[2.5rem] bg-slate-50 p-2 transition-all hover:bg-black hover:shadow-2xl hover:shadow-ferrari/20"
            >
              <div className="rounded-[2rem] bg-white p-6 h-full border border-slate-100 group-hover:border-transparent transition-colors">
                <div className="flex flex-wrap gap-2 mb-6">
                  {pkg.badges.map((b) => (
                    <span
                      key={b.label}
                      className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-600 group-hover:bg-ferrari/10 group-hover:text-ferrari"
                    >
                      {b.label}
                    </span>
                  ))}
                </div>

                <h3 className="mb-2 text-2xl font-black tracking-tight text-slate-900 group-hover:text-ferrari transition-colors">
                  {pkg.title}
                </h3>
                <p className="text-sm font-medium leading-relaxed text-slate-500 mb-8">
                  {pkg.subtitle}
                </p>

                <div className="mt-auto grid grid-cols-2 gap-3">
                  <Link
                    href={`/paket/${pkg.slug}`}
                    className="flex items-center justify-center rounded-xl bg-slate-100 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-200"
                  >
                    Detail
                  </Link>
                  <Link
                    href={content?.consultHref ?? "https://wa.me/"}
                    className="flex items-center justify-center rounded-xl bg-ferrari py-3 text-sm font-bold text-white transition hover:bg-red-600 shadow-lg shadow-ferrari/20"
                  >
                    Gas Booking
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}