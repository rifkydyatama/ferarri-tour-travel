import { notFound } from "next/navigation";
import Link from "next/link";
import {
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Download,
  MessageCircle,
  XCircle,
} from "lucide-react";

type PackageData = {
  slug: string;
  title: string;
  location: string;
  duration: string;
  priceFrom: number;
  heroImage: string;
  highlights: string[];
  itinerary: Array<{ day: string; items: string[] }>;
  inclusions: string[];
  exclusions: string[];
};

const PACKAGES: Record<string, PackageData> = {
  jogja: {
    slug: "jogja",
    title: "Paket Study Tour Jogja",
    location: "Yogyakarta",
    duration: "3 Hari 2 Malam",
    priceFrom: 1250000,
    heroImage:
      "https://images.unsplash.com/photo-1523540939399-141cbff6a8d7?auto=format&fit=crop&w=2200&q=80",
    highlights: [
      "Hotel Bintang 3",
      "Makan 7x",
      "Free Guru",
      "Dokumentasi & Rundown Rapi",
    ],
    itinerary: [
      {
        day: "Day 1",
        items: [
          "Briefing keberangkatan + pembagian seat",
          "Perjalanan menuju Jogja",
          "Check-in hotel + makan malam",
          "Malam: agenda bebas terarah",
        ],
      },
      {
        day: "Day 2",
        items: [
          "Kunjungan edukasi (museum/edutainment)",
          "Wisata budaya + pusat oleh-oleh",
          "Makan siang + makan malam",
          "Evaluasi & rekap panitia",
        ],
      },
      {
        day: "Day 3",
        items: [
          "Check-out + persiapan pulang",
          "Stop lokasi wisata ringan",
          "Kembali ke kota asal",
        ],
      },
    ],
    inclusions: [
      "Bus pariwisata + crew",
      "Hotel + breakfast",
      "Makan sesuai program",
      "Tiket objek sesuai itinerary",
      "Koordinator lapangan",
    ],
    exclusions: [
      "Pengeluaran pribadi",
      "Tambahan destinasi di luar program",
      "Biaya medis di luar asuransi (jika tidak dipilih)",
    ],
  },
  bromo: {
    slug: "bromo",
    title: "Paket Wisata Bromo",
    location: "Bromo",
    duration: "2 Hari 1 Malam",
    priceFrom: 950000,
    heroImage:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=2200&q=80",
    highlights: [
      "Sunrise View Point",
      "Jeep Bromo (Opsional)",
      "Rundown Sekolah",
      "Harga Ramah Pelajar",
    ],
    itinerary: [
      {
        day: "Day 1",
        items: [
          "Keberangkatan sore/malam",
          "Transit + briefing keselamatan",
          "Check-in + istirahat",
        ],
      },
      {
        day: "Day 2",
        items: [
          "Sunrise Bromo",
          "Pasir Berbisik + Kawah (menyesuaikan kondisi)",
          "Sarapan + persiapan pulang",
          "Kembali ke kota asal",
        ],
      },
    ],
    inclusions: [
      "Bus pariwisata + crew",
      "Penginapan (sesuai paket)",
      "Konsumsi sesuai program",
      "Koordinator lapangan",
    ],
    exclusions: [
      "Jeep Bromo (jika tidak termasuk paket)",
      "Tiket objek tambahan di luar program",
      "Pengeluaran pribadi",
    ],
  },
};

function formatIDR(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = PACKAGES[slug];
  if (!pkg) notFound();

  const waHref = "https://wa.me/";
  const pdfHref = `/itinerary-${pkg.slug}.pdf`;

  return (
    <div className="min-h-svh bg-white text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={pkg.heroImage}
            alt={pkg.title}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-slate-950/25 to-slate-950/10" />
          <div className="absolute inset-0 bg-linear-to-r from-ferrari/20 via-plum/10 to-ocean/20" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <div className="max-w-3xl text-white">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold backdrop-blur">
                <CalendarDays className="h-4 w-4" />
                {pkg.duration}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold backdrop-blur">
                <BadgeCheck className="h-4 w-4" />
                Cocok untuk Sekolah
              </span>
            </div>

            <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
              {pkg.title}
            </h1>
            <p className="mt-3 text-sm text-white/85 sm:text-base">
              {pkg.location} • Harga mulai {formatIDR(pkg.priceFrom)} / siswa
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white/90"
              >
                Tanya Ketersediaan
              </Link>
              <Link
                href="#content"
                className="inline-flex items-center justify-center rounded-2xl border border-white/50 bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:border-white/80"
              >
                Lihat Detail
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section id="content" className="mx-auto max-w-6xl px-6 py-12 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          {/* Left */}
          <div className="grid gap-8">
            {/* Highlights */}
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Highlights
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {pkg.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                    <CheckCircle2 className="h-5 w-5 text-leaf" />
                    <span className="text-sm font-semibold text-slate-800">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Itinerary timeline */}
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Itinerary
              </h2>

              <div className="mt-6 grid gap-6">
                {pkg.itinerary.map((dayBlock, idx) => (
                  <div key={dayBlock.day} className="relative">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="grid h-10 w-10 place-items-center rounded-full bg-ocean text-sm font-extrabold text-white">
                          {idx + 1}
                        </div>
                        {idx !== pkg.itinerary.length - 1 && (
                          <div className="absolute left-1/2 top-10 h-[calc(100%-2.5rem)] w-0.5 -translate-x-1/2 bg-slate-200" />
                        )}
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-extrabold text-slate-900">{dayBlock.day}</p>
                        <ul className="mt-3 grid gap-2">
                          {dayBlock.items.map((item) => (
                            <li key={item} className="text-sm leading-7 text-slate-600">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions / Exclusions */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                  Inclusions
                </h2>
                <ul className="mt-5 grid gap-3">
                  {pkg.inclusions.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-leaf" />
                      <span className="text-sm leading-7 text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                  Exclusions
                </h2>
                <ul className="mt-5 grid gap-3">
                  {pkg.exclusions.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <XCircle className="mt-0.5 h-5 w-5 text-ferrari" />
                      <span className="text-sm leading-7 text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <p className="text-xs font-semibold tracking-[0.25em] text-slate-500">PRICE</p>
              <div className="mt-3 flex items-end justify-between gap-4">
                <div>
                  <p className="text-2xl font-extrabold tracking-tight text-slate-900">
                    {formatIDR(pkg.priceFrom)}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">Mulai per siswa</p>
                </div>
                <div className="rounded-2xl bg-leaf/10 px-3 py-2 text-xs font-semibold text-leaf">
                  Konsultasi Gratis
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                <Link
                  href={pdfHref}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 transition hover:border-ocean"
                >
                  <Download className="h-4 w-4" />
                  Download Itinerary PDF
                </Link>

                <Link
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-ferrari px-5 text-sm font-extrabold text-white transition hover:opacity-95"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat WhatsApp
                </Link>
              </div>

              <p className="mt-5 text-xs leading-6 text-slate-500">
                Catatan: halaman ini menggunakan mock data untuk demo UI.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
