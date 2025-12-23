import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan Perjalanan",
};

const toc = [
  { href: "#booking-dp", label: "Booking & Down Payment (DP)" },
  { href: "#reschedule-cancellation", label: "Reschedule & Pembatalan" },
  { href: "#force-majeure", label: "Force Majeure" },
] as const;

export default function TermsPage() {
  return (
    <div className="min-h-svh bg-white text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-14">
        <header className="max-w-3xl">
          <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">
            Syarat &{" "}
            <span className="bg-linear-to-r from-ferrari to-ocean bg-clip-text text-transparent">
              Ketentuan
            </span>
            <span className="block text-slate-900">Perjalanan</span>
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
            Halaman ini merangkum aturan umum untuk pemesanan, perubahan jadwal, dan kondisi khusus.
            Detail final dapat menyesuaikan penawaran/kontrak perjalanan.
          </p>
        </header>

        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <aside className="md:col-span-4 lg:col-span-3">
            <div className="md:sticky md:top-24">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold tracking-[0.2em] text-slate-700">DAFTAR ISI</p>
                <nav className="mt-4 grid gap-2 text-sm">
                  {toc.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="rounded-lg px-3 py-2 text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          <section className="md:col-span-8 lg:col-span-9">
            <div className="space-y-10">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2
                  id="booking-dp"
                  className="scroll-mt-28 text-xl font-bold tracking-tight md:text-2xl"
                >
                  Booking & Down Payment (DP)
                </h2>
                <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600 md:text-base">
                  <p>
                    Pemesanan dianggap tercatat setelah terjadi kesepakatan tertulis (chat/email)
                    atau dokumen penawaran disetujui.
                  </p>
                  <ul className="list-disc pl-5">
                    <li>
                      DP diperlukan untuk mengunci tanggal keberangkatan dan alokasi armada/akomodasi.
                    </li>
                    <li>
                      Sisa pembayaran mengikuti jadwal yang disepakati pada penawaran/kontrak.
                    </li>
                    <li>
                      Perubahan jumlah peserta atau komponen itinerary dapat mempengaruhi harga.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2
                  id="reschedule-cancellation"
                  className="scroll-mt-28 text-xl font-bold tracking-tight md:text-2xl"
                >
                  Reschedule & Kebijakan Pembatalan
                </h2>
                <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600 md:text-base">
                  <p>
                    Kami memahami kebutuhan sekolah bisa berubah. Namun reschedule/pembatalan dapat
                    berdampak pada biaya pihak ketiga (transport, hotel, tiket, dan lain-lain).
                  </p>
                  <ul className="list-disc pl-5">
                    <li>
                      Permintaan reschedule dilakukan secepatnya agar ketersediaan armada dan vendor
                      masih memungkinkan.
                    </li>
                    <li>
                      Biaya pembatalan dapat berlaku sesuai ketentuan vendor dan progres pemesanan.
                    </li>
                    <li>
                      Jika terdapat komponen non-refundable (mis. tiket tertentu), biayanya mengikuti
                      kebijakan penerbit.
                    </li>
                  </ul>
                  <p className="text-slate-500">
                    Untuk transparansi, rincian biaya reschedule/pembatalan akan diinformasikan
                    sebelum diproses.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2
                  id="force-majeure"
                  className="scroll-mt-28 text-xl font-bold tracking-tight md:text-2xl"
                >
                  Force Majeure
                </h2>
                <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600 md:text-base">
                  <p>
                    Force majeure mencakup kondisi di luar kendali yang mempengaruhi pelaksanaan
                    perjalanan, misalnya bencana alam, kebijakan pemerintah, gangguan transportasi
                    massal, atau situasi keamanan.
                  </p>
                  <ul className="list-disc pl-5">
                    <li>
                      Kami akan mengupayakan solusi terbaik: penyesuaian jadwal, penyesuaian rute,
                      atau alternatif layanan.
                    </li>
                    <li>
                      Pengembalian dana/penyesuaian biaya mengikuti kebijakan vendor dan komponen
                      yang sudah terbayar.
                    </li>
                    <li>
                      Keputusan akhir akan mengutamakan keselamatan peserta dan kepatuhan regulasi.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
                <p className="text-sm leading-7 text-slate-600">
                  Jika Anda membutuhkan versi syarat & ketentuan yang lebih formal (untuk lampiran
                  dokumen sekolah), kami bisa siapkan berdasarkan paket dan tanggal keberangkatan.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
