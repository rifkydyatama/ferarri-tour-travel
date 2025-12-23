import type { HomeContent } from "./types";

export const defaultHomeContent: HomeContent = {
  navbar: {
    brandLabel: "FERRARI JAYA",
    links: [
      { label: "Tentang", href: "/#tentang" },
      { label: "Armada", href: "/#armada" },
      { label: "Kontak", href: "/#kontak" },
    ],
    cta: { label: "Booking Bus", href: "/booking/bus" },
  },
  hero: {
    title: "Partner Terbaik Study Tour & Wisata Sekolah",
    subtitle:
      "Mengajak siswa belajar sambil berwisata. Solusi lengkap untuk SD, SMP, SMA, SMK, dan Umum dengan harga pelajar.",
    primary: { label: "Lihat Paket Pelajar", href: "/#paket-pelajar" },
    secondary: { label: "Konsultasi Guru", href: "https://wa.me/" },
  },
  trustedBy: {
    eyebrow: "TRUSTED",
    title: "Dipercaya Oleh",
    subtitle:
      "Sekolah dan instansi yang mempercayakan perjalanan edukasi bersama kami.",
    schools: [
      "SMKN 1 Blitar",
      "MAN 2 Malang",
      "SMA 1 Kediri",
      "SMPN 3 Tulungagung",
      "SMK PGRI 2 Jombang",
      "MTsN 1 Pasuruan",
      "SMA Muhammadiyah 1",
      "SMKN 2 Probolinggo",
    ],
  },
  features: {
    eyebrow: "FEATURES",
    title: "Kenapa Ferrari Jaya Group",
    subtitle: "Desain layanan yang rapi, terasa cepat, dan tetap fun.",
    items: [
      {
        title: "Edukasi & Fun",
        description:
          "Program wisata yang mendidik — siswa belajar sambil menikmati perjalanan.",
        icon: "GraduationCap",
        colorClass: "text-ocean",
        bgClass: "bg-ocean/10",
      },
      {
        title: "Harga Ramah Pelajar",
        description:
          "Paket hemat khusus sekolah tanpa mengurangi kualitas pelayanan.",
        icon: "Wallet",
        colorClass: "text-ferrari",
        bgClass: "bg-ferrari/10",
      },
      {
        title: "Armada Bus Terbaru",
        description:
          "Kenyamanan & keselamatan siswa prioritas utama sepanjang perjalanan.",
        icon: "Bus",
        colorClass: "text-leaf",
        bgClass: "bg-leaf/10",
      },
    ],
  },
  packages: {
    eyebrow: "STUDY TOUR",
    title: "Paket Pelajar & Rombongan",
    subtitle:
      "Fokus untuk sekolah: Study Tour, Kunjungan Industri SMK, dan Wisata Umum.",
    consultHref: "https://wa.me/",
    items: [
      {
        slug: "jogja",
        title: "Paket Study Tour Jogja",
        subtitle: "Candi, museum, edukasi budaya + itinerary sekolah yang rapi.",
        badges: [
          { label: "SMP/MTs", className: "bg-sun text-slate-900" },
          { label: "SMA", className: "bg-ocean text-white" },
        ],
      },
      {
        slug: "industri",
        title: "Kunjungan Industri Surabaya",
        subtitle: "Program khusus SMK: kunjungan pabrik/instansi + dokumentasi.",
        badges: [{ label: "SMK", className: "bg-leaf text-slate-900" }],
      },
      {
        slug: "religi",
        title: "Wisata Religi Wali 5",
        subtitle: "Rute religi untuk rombongan sekolah maupun umum, nyaman & terarah.",
        badges: [
          { label: "Umum", className: "bg-plum text-white" },
          { label: "Best Seller", className: "bg-sun text-slate-900" },
        ],
      },
      {
        slug: "bromo",
        title: "Paket Wisata Bromo",
        subtitle:
          "Sunrise Bromo + spot ikonik, cocok untuk outing kelas & rombongan.",
        badges: [
          { label: "SMP/MTs", className: "bg-sun text-slate-900" },
          { label: "SMA/SMK", className: "bg-ocean text-white" },
        ],
      },
    ],
  },
  howItWorks: {
    eyebrow: "PROCESS",
    title: "Alur Pemesanan Mudah",
    subtitle:
      "Dari konsultasi sampai berangkat — jelas, cepat, dan enak untuk panitia sekolah.",
    steps: [
      { title: "Konsultasi", description: "Chat kebutuhan.", dotClass: "bg-ocean" },
      { title: "Penawaran", description: "Kami kirim proposal.", dotClass: "bg-ferrari" },
      { title: "Survey", description: "Cek unit bus.", dotClass: "bg-sun" },
      { title: "Deal & Berangkat", description: "Fix jadwal, berangkat!", dotClass: "bg-leaf" },
    ],
  },
  destinations: {
    eyebrow: "DESTINATIONS",
    title: "Popular Destinations",
    subtitle: "Pilih destinasi favorit dan mulai rencanakan perjalanan paling seru.",
    items: [
      {
        title: "Bali",
        price: "Mulai Rp 1.250.000",
        badge: "Best Seller",
        badgeClass: "bg-sun text-slate-900",
        gradientClass: "from-ferrari/60 via-plum/45 to-ocean/60",
        ctaLabel: "Lihat Paket",
        ctaHref: "/#paket-pelajar",
      },
      {
        title: "Bromo",
        price: "Mulai Rp 950.000",
        badge: "New",
        badgeClass: "bg-leaf text-slate-900",
        gradientClass: "from-ocean/60 via-leaf/45 to-sun/55",
        ctaLabel: "Lihat Paket",
        ctaHref: "/#paket-pelajar",
      },
      {
        title: "Lombok",
        price: "Mulai Rp 1.150.000",
        badge: "Family",
        badgeClass: "bg-plum text-white",
        gradientClass: "from-plum/60 via-ferrari/45 to-sun/55",
        ctaLabel: "Lihat Paket",
        ctaHref: "/#paket-pelajar",
      },
    ],
  },
  gallery: {
    eyebrow: "GALLERY",
    title: "Dokumentasi Keseruan",
    subtitle: "Momen terbaik dari study tour, kunjungan industri, dan wisata rombongan.",
    items: [
      {
        src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80",
        caption: "SMAN 1 di Bali",
      },
      {
        src: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=1600&q=80",
        caption: "Study Tour di Jogja",
      },
      {
        src: "https://images.unsplash.com/photo-1529078155058-5d716f45d604?auto=format&fit=crop&w=1600&q=80",
        caption: "Armada Bus Berangkat Pagi",
      },
      {
        src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=80",
        caption: "Kenyamanan di Dalam Bus",
      },
      {
        src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
        caption: "Kunjungan Industri TVRI",
      },
      {
        src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80",
        caption: "Rombongan Siswa Happy",
      },
    ],
  },
  testimonials: {
    eyebrow: "REVIEWS",
    title: "Kata Mereka",
    subtitle: "Cerita singkat dari guru dan pembina yang sudah berangkat bersama.",
    items: [
      {
        name: "Budi Santoso",
        role: "Guru Kesiswaan",
        quote:
          "Koordinasinya enak, itinerary rapi, dan anak-anak happy. Panitia sekolah jadi lebih tenang.",
        accent: "text-ocean",
        accentBg: "bg-ocean/10",
      },
      {
        name: "Siti Rahma",
        role: "Wakasek Kesiswaan",
        quote:
          "Harga ramah pelajar tapi tetap premium. Bus nyaman dan timnya sigap saat di lapangan.",
        accent: "text-ferrari",
        accentBg: "bg-ferrari/10",
      },
      {
        name: "Agus Pranoto",
        role: "Pembina OSIS",
        quote:
          "Kunjungan industri untuk SMK berjalan lancar. Dokumentasi dan rundown-nya detail.",
        accent: "text-sun",
        accentBg: "bg-sun/20",
      },
    ],
  },
  cta: {
    title: "Rencanakan Study Tour Tanpa Pusing!",
    description:
      "Kami bantu susun itinerary, izin, hingga laporan perjalanan. Guru tinggal terima beres.",
    whatsappHref: "https://wa.me/",
    secondary: { label: "Minta Proposal", href: "/#kontak" },
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently Asked Questions",
    subtitle: "Pertanyaan yang paling sering ditanyakan terkait study tour dan rombongan.",
    items: [
      {
        q: "Bisa pembayaran bertahap untuk study tour?",
        a: "Bisa. Umumnya kami bantu skema DP + pelunasan sebelum keberangkatan (menyesuaikan kebijakan sekolah dan jadwal trip).",
      },
      {
        q: "Kapasitas bus berapa dan konfigurasi tempat duduknya?",
        a: "Tergantung armada. Umumnya 40–50 seat. Kami rekomendasikan kapasitas sesuai jumlah siswa + pendamping agar tetap nyaman.",
      },
      {
        q: "Apakah sudah termasuk asuransi perjalanan?",
        a: "Bisa disiapkan sesuai paket. Kami jelaskan opsi asuransi dan cakupan sejak awal agar transparan untuk sekolah.",
      },
    ],
  },
  footer: {
    description: "Travel & Tour terpercaya untuk perjalanan yang seru, nyaman, dan penuh warna.",
    quickLinks: [
      { label: "Home", href: "/" },
      { label: "Tentang Kami", href: "/tentang-kami" },
      { label: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
      { label: "Packages", href: "/#paket-pelajar" },
      { label: "Fleet", href: "/#armada" },
      { label: "Contact", href: "/#kontak" },
    ],
    contact: {
      addressLabel: "Address",
      address: "Jl. Contoh Alamat No. 123, Indonesia",
      phoneLabel: "Phone",
      phone: "+62 8xx-xxxx-xxxx",
      emailLabel: "Email",
      email: "hello@ferrarijaya.co.id",
    },
  },
};
