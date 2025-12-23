import Link from "next/link";
import { BusFront, Map } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-svh bg-white text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
              <span className="h-1.5 w-1.5 rounded-full bg-ferrari" />
              Error 404
            </p>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">
              Waduh!{" "}
              <span className="bg-linear-to-r from-ferrari to-ocean bg-clip-text text-transparent">
                Tujuan Tidak Ditemukan.
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
              Sepertinya bus kita salah belok. Yuk kembali ke beranda dan pilih rute perjalanan yang
              benar.
            </p>

            <div className="mt-8">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-xl bg-ferrari px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-ferrari/90"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-ferrari/15 blur-2xl" />
            <div className="absolute -right-10 top-10 h-40 w-40 rounded-full bg-ocean/15 blur-2xl" />
            <div className="absolute left-1/2 bottom-0 h-40 w-40 -translate-x-1/2 rounded-full bg-sun/20 blur-2xl" />

            <div className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                  <Map className="h-4 w-4 text-ocean" />
                  Peta Rute
                </div>
                <div className="text-xs font-semibold text-slate-500">Status: Nyasar</div>
              </div>

              <div className="mt-8 grid place-items-center">
                <div className="relative grid place-items-center">
                  <div className="h-56 w-56 rounded-full border-2 border-dashed border-slate-200" />
                  <div className="absolute -left-3 top-10 h-2.5 w-2.5 rounded-full bg-ocean" />
                  <div className="absolute right-10 bottom-8 h-2.5 w-2.5 rounded-full bg-ferrari" />

                  <div className="absolute grid place-items-center rounded-3xl bg-linear-to-r from-ferrari to-sun p-4 text-white shadow-sm">
                    <BusFront className="h-10 w-10" />
                  </div>
                </div>

                <p className="mt-6 text-sm leading-6 text-slate-600">
                  Tip: cek kembali URL atau kembali ke halaman utama.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
