import Link from "next/link";
import Image from "next/image";

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
}

export default function Hero({ title, subtitle, ctaText = "Hubungi Kami" }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-900 pt-16 md:pt-20 lg:pt-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=2021&q=80"
          alt="Travel Background"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-900/60 to-slate-50" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 lg:px-8 lg:pb-24 lg:pt-32">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block">{title}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 sm:text-xl">
            {subtitle}
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/paket/bali"
              className="rounded-full bg-red-600 px-8 py-4 text-base font-bold text-white shadow-lg transition hover:bg-red-700 hover:scale-105"
            >
              {ctaText}
            </Link>
            <Link
              href="/tentang-kami"
              className="rounded-full bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Tentang Kami
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}