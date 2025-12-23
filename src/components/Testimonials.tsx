"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  accent: string;
  accentBg: string;
};

type TestimonialsContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: Testimonial[];
};

export default function Testimonials({ content }: { content?: TestimonialsContent }) {
  const items = content?.items ?? [];

  return (
    <section id="reviews" className="bg-white py-24 overflow-hidden scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 mb-6">
            APA KATA MEREKA?
          </h2>
          <p className="text-xl font-medium text-slate-500">
            Jujur dari hati, no setting-setting club.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <motion.div
              key={t.name}
              whileHover={{ y: -8 }}
              className="relative flex flex-col justify-between rounded-[2rem] bg-slate-50 p-8 transition-all hover:bg-white hover:shadow-xl border border-transparent hover:border-slate-100"
            >
              <Quote className={`absolute top-8 right-8 h-12 w-12 opacity-10 ${t.accent.replace('fill-', 'text-')}`} />
              
              <div>
                <p className="mb-8 text-lg font-medium leading-relaxed text-slate-700">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-slate-200 pt-6">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full font-black text-slate-900 ${t.accentBg}`}>
                    {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{t.name}</p>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}