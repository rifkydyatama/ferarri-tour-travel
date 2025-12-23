"use client";

import { motion } from "framer-motion";

type TrustedByContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  schools: string[];
};

export default function TrustedBy({ content }: { content?: TrustedByContent }) {
  const schools = content?.schools ?? [];
  const items = [...schools, ...schools];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-slate-500">
              {content?.eyebrow ?? "TRUSTED"}
            </p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              {content?.title ?? "Dipercaya Oleh"}
            </h2>
          </div>
          <p className="hidden max-w-md text-sm leading-7 text-slate-600 sm:block">
            {content?.subtitle ??
              "Sekolah dan instansi yang mempercayakan perjalanan edukasi bersama kami."}
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl bg-slate-50 ring-1 ring-black/5">
          <div className="relative py-6">
            <motion.div
              className="flex w-max gap-4 px-6"
              animate={{ x: [0, "-50%"] }}
              transition={{ ease: "linear", duration: 22, repeat: Infinity }}
            >
              {items.map((name, idx) => (
                <div
                  key={`${name}-${idx}`}
                  className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 grayscale transition hover:grayscale-0"
                >
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-linear-to-br from-ferrari via-plum to-ocean">
                    <span className="text-xs font-extrabold text-white">FJ</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-600 transition group-hover:text-slate-900">
                    {name}
                  </span>
                </div>
              ))}
            </motion.div>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-linear-to-r from-slate-50 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-linear-to-l from-slate-50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
