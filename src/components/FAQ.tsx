"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Bisa pembayaran bertahap untuk study tour?",
    a: "Bisa. Umumnya kami bantu skema DP + pelunasan sebelum keberangkatan (menyesuaikan kebijakan sekolah dan jadwal trip).",
  },
  {
    q: "Kapasitas bus berapa dan konfigurasi tempat duduknya?",
    a: "Tergantung armada. Umumnya 40–50 seat. Kami rekomendasikan kapasitas sesuai jumlah siswa + pendamping agar tetap nyaman.",
  },
  {
    q: "Apakah sudah termasuk asuransi perjalanan?",
    a: "Bisa disiapkan sesuai paket. Kami jelaskan opsi asuransi dan cakupan sejak awal agar transparan untuk sekolah.",
  },
] as const;

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.25em] text-slate-500">FAQ</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Pertanyaan yang paling sering ditanyakan terkait study tour dan rombongan.
          </p>
        </div>

        <div className="mt-10 grid gap-4">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={item.q}
                className="rounded-3xl bg-white shadow-sm ring-1 ring-black/5"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-sm font-extrabold tracking-tight text-slate-900 sm:text-base">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={
                      "h-5 w-5 text-slate-500 transition " +
                      (isOpen ? "rotate-180" : "rotate-0")
                    }
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-sm leading-7 text-slate-600">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
