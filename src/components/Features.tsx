"use client";

import { motion } from "framer-motion";
import { Bus, Shield, Wallet } from "lucide-react";

const FEATURES = [
  {
    title: "Premium Fleet",
    description: "Armada nyaman, bersih, dan siap perjalanan jauh.",
    Icon: Bus,
    colorClass: "text-ferrari",
    bgClass: "bg-ferrari/10",
  },
  {
    title: "Best Price",
    description: "Harga bersaing dengan layanan yang tetap premium.",
    Icon: Wallet,
    colorClass: "text-ocean",
    bgClass: "bg-ocean/10",
  },
  {
    title: "Safety First",
    description: "Standar keamanan dan kru berpengalaman untuk setiap trip.",
    Icon: Shield,
    colorClass: "text-leaf",
    bgClass: "bg-leaf/10",
  },
] as const;

export default function Features() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.25em] text-slate-500">
            FEATURES
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Kenapa Ferrari Jaya Group
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Desain layanan yang rapi, terasa cepat, dan tetap fun.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {FEATURES.map(({ title, description, Icon, colorClass, bgClass }) => (
            <motion.article
              key={title}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5"
            >
              <div className="flex items-center gap-4">
                <div className={"grid h-12 w-12 place-items-center rounded-2xl " + bgClass}>
                  <Icon className={"h-6 w-6 " + colorClass} />
                </div>
                <h3 className="text-lg font-bold tracking-tight text-slate-900">
                  {title}
                </h3>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">{description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
