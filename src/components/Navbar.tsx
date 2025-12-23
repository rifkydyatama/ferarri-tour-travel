"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
              FERRARI JAYA
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="#"
              className="text-sm font-semibold text-slate-700 transition hover:text-slate-950"
            >
              Tentang
            </Link>
            <Link
              href="#"
              className="text-sm font-semibold text-slate-700 transition hover:text-slate-950"
            >
              Armada
            </Link>
            <Link
              href="#"
              className="text-sm font-semibold text-slate-700 transition hover:text-slate-950"
            >
              Kontak
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-2xl bg-ferrari px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95"
            >
              Booking Bus
            </Link>
          </div>

          <button
            type="button"
            aria-label="Menu"
            className="inline-flex items-center justify-center rounded-xl p-2 text-slate-900 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </div>
    </header>
  );
}
