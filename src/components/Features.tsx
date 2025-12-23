"use client";

import { motion } from "framer-motion";
import { Bus, GraduationCap, Wallet, Star } from "lucide-react";

type FeatureItem = {
  title: string;
  description: string;
  icon: "GraduationCap" | "Wallet" | "Bus";
  colorClass: string;
  bgClass: string;
};

type FeaturesContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: FeatureItem[];
};

const ICONS = {
  GraduationCap,
  Wallet,
  Bus,
} as const;

export default function Features({ content }: { content?: FeaturesContent }) {
  // Fallback icons mapping for styling
  const STYLE_MAP = [
    { border: "hover:border-acid", shadow: "hover:shadow-acid/30", iconColor: "text-acid" },
    { border: "hover:border-purple", shadow: "hover:shadow-purple/30", iconColor: "text-purple" },
    { border: "hover:border-ferrari", shadow: "hover:shadow-ferrari/30", iconColor: "text-ferrari" },
  ];

  return (
    <section id="tentang" className="bg-slate-50 relative py-20 scroll-mt-24 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-acid/10 rounded-full blur-3xl mix-blend-multiply pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-purple/10 rounded-full blur-3xl mix-blend-multiply pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="max-w-3xl mb-12">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 mb-4">
            KENAPA HARUS <span className="text-transparent bg-clip-text bg-linear-to-r from-ferrari to-purple">FERRARI?</span>
          </h2>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            {content?.subtitle ?? "Bukan travel biasa. Kita bikin standar baru buat trip sekolah yang anti-boring, aman, dan pastinya aesthetic buat story IG."}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {(content?.items ?? []).map(({ title, description, icon }, idx) => {
            const Icon = ICONS[icon] ?? Star;
            const style = STYLE_MAP[idx % STYLE_MAP.length];
            
            return (
              <motion.div
                key={title}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group relative overflow-hidden rounded-4xl bg-white p-8 shadow-sm border border-slate-100 transition-all duration-300 ${style.border} ${style.shadow} hover:shadow-xl`}
              >
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-slate-50 transition-colors group-hover:bg-slate-100" />
                
                <div className="relative">
                  <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white shadow-lg transition-transform group-hover:rotate-12`}>
                    <Icon className={`h-7 w-7 ${style.iconColor}`} />
                  </div>
                  
                  <h3 className="text-2xl font-black tracking-tight text-slate-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-slate-900 group-hover:to-slate-600">
                    {title}
                  </h3>
                  <p className="text-base font-medium leading-relaxed text-slate-500">
                    {description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}