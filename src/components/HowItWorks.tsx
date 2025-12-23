"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    title: "Konsultasi",
    description: "Chat kebutuhan.",
    dotClass: "bg-ocean",
  },
  {
    title: "Penawaran",
    description: "Kami kirim proposal.",
    dotClass: "bg-ferrari",
  },
  {
    title: "Survey",
    description: "Cek unit bus.",
    dotClass: "bg-sun",
  },
  {
    title: "Deal & Berangkat",
    description: "Fix jadwal, berangkat!",
    dotClass: "bg-leaf",
  },
] as const;

export default function HowItWorks() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.25em] text-slate-500">PROCESS</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Alur Pemesanan Mudah
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Dari konsultasi sampai berangkat — jelas, cepat, dan enak untuk panitia sekolah.
          </p>
        </div>

        <div className="mt-10 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
          <div className="relative">
            <div className="pointer-events-none absolute left-6 right-6 top-6 hidden h-0.5 bg-slate-200 md:block" />

            <div className="grid gap-6 md:grid-cols-4">
              {STEPS.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1], delay: index * 0.05 }}
                  className="relative"
                >
                  <div className="flex items-start gap-4 md:flex-col md:items-start">
                    <div className="relative">
                      <div className={"grid h-12 w-12 place-items-center rounded-full text-sm font-extrabold text-white " + step.dotClass}>
                        {index + 1}
                      </div>
                      <div className="absolute inset-0 rounded-full ring-4 ring-white/70" />
                    </div>

                    <div>
                      <h3 className="text-base font-extrabold tracking-tight text-slate-900">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm leading-7 text-slate-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
