"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

type FAQContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: Array<{ q: string; a: string }>;
};

export default function FAQ({ content }: { content?: FAQContent }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = content?.items ?? [];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-12">
            <span className="font-mono text-acid font-bold tracking-widest text-sm uppercase">FAQ</span>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                YANG SERING DITANYAIN
            </h2>
        </div>

        <div className="space-y-4">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`overflow-hidden rounded-3xl transition-all duration-300 ${
                  isOpen ? "bg-slate-900 text-white shadow-xl scale-[1.02]" : "bg-slate-50 text-slate-900 hover:bg-slate-100"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between px-8 py-6 text-left"
                >
                  <span className="text-lg font-bold tracking-tight">
                    {item.q}
                  </span>
                  <div className={`ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${isOpen ? "bg-acid text-black" : "bg-slate-200 text-slate-600"}`}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 pt-0 text-base leading-relaxed text-slate-300 font-medium border-t border-slate-700/50 mt-2">
                        <br/>
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