"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type DestinationsContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: Array<{
    title: string;
    price: string;
    badge: string;
    badgeClass: string;
    gradientClass: string;
    ctaLabel: string;
    ctaHref: string;
  }>;
};

export default function Destinations({ content }: { content?: DestinationsContent }) {
  const items = content?.items ?? [];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold tracking-[0.25em] text-slate-500">
            {content?.eyebrow ?? "DESTINATIONS"}
          </p>
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              <span className="bg-linear-to-r from-ferrari via-plum to-ocean bg-clip-text text-transparent">
                {content?.title ?? "Popular Destinations"}
              </span>
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-slate-600">
            {content?.subtitle ??
              "Pilih destinasi favorit dan mulai rencanakan perjalanan paling seru."}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <motion.article
              key={item.title}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
              className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5"
            >
              <div className="relative">
                <div className="h-44 w-full bg-slate-100" />
                <div
                  className={
                    "absolute inset-0 bg-linear-to-br " + item.gradientClass
                  }
                />
                <div className="absolute left-5 top-5">
                  <span
                    className={
                      "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold " +
                      item.badgeClass
                    }
                  >
                    {item.badge}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {item.price}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    href={item.ctaHref}
                    className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    {item.ctaLabel}
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
