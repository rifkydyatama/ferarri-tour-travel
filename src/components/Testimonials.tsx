"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

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

function InitialAvatar({ name, accentBg }: { name: string; accentBg: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  return (
    <div className={"grid h-12 w-12 place-items-center rounded-2xl " + accentBg}>
      <span className="text-sm font-extrabold text-slate-900">{initials}</span>
    </div>
  );
}

export default function Testimonials({ content }: { content?: TestimonialsContent }) {
  const items = content?.items ?? [];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.25em] text-slate-500">
            {content?.eyebrow ?? "REVIEWS"}
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {content?.title ?? "Kata Mereka"}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            {content?.subtitle ??
              "Cerita singkat dari guru dan pembina yang sudah berangkat bersama."}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <motion.article
              key={t.name}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5"
            >
              <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-ferrari via-plum to-ocean" />

              <div className="flex items-center gap-4">
                <InitialAvatar name={t.name} accentBg={t.accentBg} />
                <div>
                  <p className="text-sm font-extrabold text-slate-900">{t.name}</p>
                  <p className="text-xs font-semibold text-slate-500">{t.role}</p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-700">“{t.quote}”</p>

              <div className="mt-6 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={"h-4 w-4 fill-current " + t.accent} />
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
