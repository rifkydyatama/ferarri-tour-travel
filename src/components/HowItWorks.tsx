"use client";

import { motion } from "framer-motion";

type HowItWorksContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  steps: Array<{ title: string; description: string; dotClass: string }>;
};

export default function HowItWorks({ content }: { content?: HowItWorksContent }) {
  const steps = content?.steps ?? [];

  return (
    <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-acid rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-ferrari rounded-full blur-[128px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-acid font-mono text-sm font-bold tracking-widest uppercase">EASY PROCESS</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tighter">
            CARA KERJA KAMI
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-4 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-white/10 rounded-full" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative flex flex-col items-center text-center md:items-start md:text-left"
            >
              {/* Number Blob */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-acid blur-xl opacity-20 animate-pulse" />
                <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-3xl bg-white/10 border border-white/20 backdrop-blur-md shadow-xl text-4xl font-black text-white transform rotate-3 transition-transform hover:rotate-0">
                  {index + 1}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-400">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}