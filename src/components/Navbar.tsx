"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type NavbarContent = {
  brandLabel: string;
  links: Array<{ label: string; href: string }>;
  cta: { label: string; href: string };
};

export default function Navbar({ content }: { content?: NavbarContent }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const brandLabel = content?.brandLabel ?? "FERRARI";
  const links = content?.links ?? [
    { label: "Tentang", href: "/#tentang" },
    { label: "Armada", href: "/#armada" },
    { label: "Destinasi", href: "/#destinasi" },
  ];
  const cta = content?.cta ?? { label: "Gas Booking 🚀", href: "/booking/bus" };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className={`
            relative flex items-center justify-between px-2 py-2 transition-all duration-300
            ${isScrolled 
              ? "w-full max-w-4xl rounded-full bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl shadow-black/5" 
              : "w-full max-w-6xl rounded-2xl bg-transparent"}
          `}
        >
          {/* Brand */}
          <Link href="/" className="pl-4 group relative flex items-center gap-2">
            <div className="absolute inset-0 bg-acid blur-xl opacity-0 transition-opacity group-hover:opacity-40 rounded-full" />
            <span className="relative text-xl font-black tracking-tighter italic">
              <span className="text-ferrari">{brandLabel}</span>
              <span className="text-slate-800">TOUR</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1 bg-white/50 p-1.5 rounded-full border border-white/50 backdrop-blur-md">
            {links.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-5 py-2 rounded-full text-sm font-bold text-slate-600 hover:bg-white hover:text-black hover:shadow-sm transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-2 pr-1">
            <Link
              href={cta.href}
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-bold text-white transition hover:scale-105 hover:bg-ferrari active:scale-95 shadow-lg shadow-ferrari/20"
            >
              {cta.label}
              <Sparkles className="w-4 h-4 text-acid" />
            </Link>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900"
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-x-4 top-24 z-40 rounded-3xl bg-white border border-slate-100 shadow-2xl p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {links.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-lg font-bold text-slate-800 py-2 border-b border-slate-100"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={cta.href}
                className="mt-2 flex items-center justify-center gap-2 w-full rounded-xl bg-ferrari py-4 text-white font-bold"
              >
                {cta.label}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}