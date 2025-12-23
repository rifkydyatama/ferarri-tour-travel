import type { Metadata } from "next";
import {
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  Megaphone,
  ShieldCheck,
  Sparkles,
  GraduationCap,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Tentang Ferrari Jaya Group",
};

const values = [
  {
    title: "Pelayanan Prima",
    description:
      "Respon cepat, komunikasi jelas, dan eksekusi rapi dari awal booking hingga tiba kembali di sekolah.",
    Icon: Sparkles,
    accent: "from-ferrari to-sun",
  },
  {
    title: "Edukasi",
    description:
      "Perjalanan bukan sekadar jalan-jalan—kami bantu susun itinerary yang edukatif dan berkesan.",
    Icon: GraduationCap,
    accent: "from-ocean to-leaf",
  },
  {
    title: "Keselamatan",
    description:
      "Armada terawat, kru berpengalaman, dan SOP yang konsisten untuk perjalanan yang aman.",
    Icon: ShieldCheck,
    accent: "from-plum to-ocean",
  },
] as const;

const team = [
  {
    name: "Andi Saputra",
    role: "CEO",
    Icon: BadgeCheck,
    highlight: "bg-ferrari/10 text-ferrari",
    initials: "AS",
  },
  {
    name: "Siti Nur Aulia",
    role: "Head of Ops",
    Icon: BriefcaseBusiness,
    highlight: "bg-ocean/10 text-ocean",
    initials: "SNA",
  },
  {
    name: "Rangga Prakoso",
    role: "Marketing",
    Icon: Megaphone,
    highlight: "bg-sun/20 text-slate-900",
    initials: "RP",
  },
] as const;

const legalItems = [
  "Perizinan Kemenhub (sesuai ketentuan yang berlaku)",
  "SIUP",
  "NPWP",
] as const;

export default function AboutPage() {
  return (
    <div className="min-h-svh bg-white text-slate-900">
      <Navbar />

      <main>
        <header className="relative overflow-hidden border-b border-slate-200">
          <div className="absolute inset-0">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-ferrari/15 blur-2xl" />
            <div className="absolute -right-24 top-6 h-72 w-72 rounded-full bg-ocean/15 blur-2xl" />
            <div className="absolute left-1/2 top-40 h-72 w-72 -translate-x-1/2 rounded-full bg-sun/20 blur-2xl" />
          </div>

          <div className="relative mx-auto max-w-6xl px-6 py-14">
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700">
              <span className="h-1.5 w-1.5 rounded-full bg-ferrari" />
              Vibrant School Tour • Ferrari Jaya Group
            </p>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">
              Tentang{" "}
              <span className="bg-linear-to-r from-ferrari to-ocean bg-clip-text text-transparent">
                Ferrari Jaya Group
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              Partner perjalanan study tour yang fokus pada pengalaman seru, itinerary yang rapi, dan
              operasional yang aman.
            </p>
          </div>
        </header>

        <section className="mx-auto max-w-6xl px-6 py-14" id="story">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Cerita Kami</h2>
              <p className="mt-4 leading-7 text-slate-600">
                Ferrari Jaya Group berdiri sejak 2015 dan telah melayani ribuan sekolah untuk
                perjalanan edukasi, study tour, dan wisata kelompok. Dari satu rute sederhana, kami
                berkembang menjadi tim yang mengutamakan ketepatan jadwal, kenyamanan, dan keamanan
                perjalanan.
              </p>
              <p className="mt-4 leading-7 text-slate-600">
                Hari ini, kami terus meningkatkan standar layanan—mulai dari perencanaan, pengawalan
                operasional, hingga dukungan selama di lapangan.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="grid gap-4">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-800">Sejak</p>
                  <p className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">2015</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-800">Fokus</p>
                  <p className="mt-1 text-base text-slate-600">
                    Study tour sekolah • Perjalanan kelompok • Layanan end-to-end
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-800">Nilai Utama</p>
                  <p className="mt-1 text-base text-slate-600">
                    Pelayanan prima, edukasi, dan keselamatan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50/70">
          <div className="mx-auto max-w-6xl px-6 py-14" id="vision-mission">
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                  Visi & Misi
                </h2>
                <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                  Kami membangun perjalanan sekolah yang seru, terstruktur, dan aman—dengan
                  pengalaman yang selalu terasa “vibrant”.
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {values.map(({ title, description, Icon, accent }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-r ${accent} text-white`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-14" id="team">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Tim Inti</h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Tiga peran kunci yang memastikan rencana perjalanan berjalan rapi, aman, dan tetap seru.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {team.map(({ name, role, Icon, highlight, initials }) => (
              <div
                key={role}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-sm font-extrabold text-white"
                      aria-hidden="true"
                    >
                      {initials}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{name}</p>
                      <p className="mt-0.5 text-sm text-slate-600">{role}</p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${highlight}`}
                  >
                    <Icon className="h-4 w-4" />
                    Key Role
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  Mengawal standar layanan, koordinasi tim, dan komunikasi agar perjalanan sekolah
                  berjalan sesuai rencana.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-50/70">
          <div className="mx-auto max-w-6xl px-6 py-14" id="legal">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Legal & Perizinan</h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Kami berkomitmen menjalankan operasional sesuai ketentuan dan regulasi yang berlaku.
            </p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <ul className="grid gap-4 md:grid-cols-2">
                {legalItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-leaf" />
                    <span className="text-sm leading-6 text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-xs leading-6 text-slate-500">
                Catatan: detail nomor dokumen/sertifikat dapat diberikan saat proses penawaran atau
                permintaan resmi.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
