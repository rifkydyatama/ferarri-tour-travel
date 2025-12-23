"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

type NavbarContent = {
  brandLabel: string;
  links: Array<{ label: string; href: string }>;
  cta: { label: string; href: string };
};

export default function Navbar({ content }: { content?: NavbarContent }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const brandLabel = content?.brandLabel ?? "FERRARI JAYA";
  const links = content?.links ?? [
    { label: "Tentang", href: "/#tentang" },
    { label: "Armada", href: "/#armada" },
    { label: "Kontak", href: "/#kontak" },
  ];
  const cta = content?.cta ?? { label: "Booking Bus", href: "/booking/bus" };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isMobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobileOpen]);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={
          "transition-all " +
          (isScrolled
            ? "bg-white/95 shadow-sm backdrop-blur supports-backdrop-filter:bg-white/80"
            : "bg-transparent")
        }
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-extrabold tracking-tight">
            <span className="bg-linear-to-r from-ferrari to-sun bg-clip-text text-transparent">
              {brandLabel}
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-semibold text-slate-700 transition hover:text-slate-950"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href={cta.href}
              className="inline-flex items-center justify-center rounded-2xl bg-ferrari px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95"
            >
              {cta.label}
            </Link>
          </div>

          <button
            type="button"
            aria-label={isMobileOpen ? "Tutup menu" : "Buka menu"}
            aria-controls="mobile-menu"
            onClick={() => setIsMobileOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-xl p-2 text-slate-900 md:hidden"
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        <div
          id="mobile-menu"
          className={
            "md:hidden " +
            (isMobileOpen ? "block" : "hidden")
          }
        >
          <div className="mx-auto max-w-6xl px-6 pb-5">
            <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
              <div className="grid gap-1 p-2">
                {links.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="px-2 pt-2">
                  <Link
                    href={cta.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-ferrari px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95"
                  >
                    {cta.label}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
