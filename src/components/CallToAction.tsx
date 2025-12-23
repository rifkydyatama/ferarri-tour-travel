"use client";

import Link from "next/link";

export default function CallToAction() {
  const whatsappHref = "https://wa.me/";
  const proposalHref = "#";

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-linear-to-r from-ferrari to-sun px-8 py-12 text-white shadow-sm sm:px-12 sm:py-14">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-10 -top-10 h-44 w-44 rounded-full bg-white/15 blur-2xl" />
            <div className="absolute -right-16 top-6 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute bottom-[-5rem] left-1/3 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          </div>

          <div className="relative flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
            <div className="max-w-2xl">
              <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
                Rencanakan Study Tour Tanpa Pusing!
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/90 sm:text-base">
                Kami bantu susun itinerary, izin, hingga laporan perjalanan. Guru tinggal terima beres.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Link
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-ferrari shadow-sm transition hover:bg-white/90"
              >
                Konsultasi WA
              </Link>

              <Link
                href={proposalHref}
                className="inline-flex items-center justify-center rounded-full border border-white/60 bg-transparent px-7 py-3 text-sm font-semibold text-white transition hover:border-white/80"
              >
                Download Proposal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
