import type { HomeContent } from "./types";

export const defaultHomeContent: HomeContent = {
  navbar: {
    brandLabel: "FERRARI",
    links: [
      { label: "Why Us", href: "/#tentang" }, // Nunjuk ke Features
      { label: "Paket", href: "/#paket-pelajar" }, // Nunjuk ke StudentPackages
      { label: "Galeri", href: "/#armada" }, // Nunjuk ke Gallery
      { label: "Testi", href: "/#reviews" }, // Nunjuk ke Testimonials
    ],
    cta: { label: "Gas Booking 🚀", href: "/booking/bus" },
  },
  hero: {
    title: "MAKIN SERU BELAJARNYA",
    subtitle:
      "Bukan sekadar jalan-jalan. Ini pengalaman core memory buat siswa SD, SMP, SMA & Umum. Harga pelajar, fasilitas sultan.",
    primary: { label: "Cek Paket Hits", href: "/#paket-pelajar" },
    secondary: { label: "Chat Admin", href: "https://wa.me/" },
  },
  trustedBy: {
    eyebrow: "TRUSTED PARTNERS",
    title: "Geng Juara Kita",
    subtitle: "Sekolah hits yang sudah mempercayakan tripnya ke kami.",
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
    eyebrow: "KENAPA KAMI?",
    title: "Ferrari Jaya Group",
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
        title: "Harga Pelajar",
        description:
          "Paket hemat khusus sekolah tanpa mengurangi kualitas pelayanan.",
        icon: "Wallet",
        colorClass: "text-ferrari",
        bgClass: "bg-ferrari/10",
      },
      {
        title: "Bus Terbaru",
        description:
          "Kenyamanan & keselamatan siswa prioritas utama sepanjang perjalanan.",
        icon: "Bus",
        colorClass: "text-leaf",
        bgClass: "bg-leaf/10",
      },
    ],
  },
  packages: {
    eyebrow: "LET'S GO",
    title: "Pilih Petualanganmu",
    subtitle:
      "Fokus untuk sekolah: Study Tour, Kunjungan Industri SMK, dan Wisata Umum.",
    consultHref: "https://wa.me/",
    items: [
      {
        slug: "jogja",
        title: "Study Tour Jogja",
        subtitle: "Candi, museum, edukasi budaya + itinerary sekolah yang rapi.",
        badges: [
          { label: "SMP/MTs", className: "bg-sun text-slate-900" },
          { label: "SMA", className: "bg-ocean text-white" },
        ],
      },
      {
        slug: "industri",
        title: "Kunjungan Industri",
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
    eyebrow: "EASY PROCESS",
    title: "Cara Kerja Kami",
    subtitle: "Sat set wat wet, langsung berangkat.",
    steps: [
      { title: "Konsultasi", description: "Chat kebutuhan.", dotClass: "bg-ocean" },
      { title: "Penawaran", description: "Kami kirim proposal.", dotClass: "bg-ferrari" },
      { title: "Survey", description: "Cek unit bus.", dotClass: "bg-sun" },
      { title: "Deal & Gas", description: "Fix jadwal, berangkat!", dotClass: "bg-leaf" },
    ],
  },
  destinations: {
    eyebrow: "WISATA HITS",
    title: "Destinasi Populer",
    subtitle: "Pilih destinasi favorit dan mulai rencanakan perjalanan paling seru.",
    items: [
      {
        title: "Bali",
        price: "Rp 1.250.000",
        badge: "Best Seller",
        badgeClass: "bg-sun text-slate-900",
        gradientClass: "from-ferrari/60 via-plum/45 to-ocean/60",
        ctaLabel: "Cek Detail",
        ctaHref: "/#paket-pelajar",
      },
      {
        title: "Bromo",
        price: "Rp 950.000",
        badge: "New",
        badgeClass: "bg-leaf text-slate-900",
        gradientClass: "from-ocean/60 via-leaf/45 to-sun/55",
        ctaLabel: "Cek Detail",
        ctaHref: "/#paket-pelajar",
      },
      {
        title: "Lombok",
        price: "Rp 1.150.000",
        badge: "Family",
        badgeClass: "bg-plum text-white",
        gradientClass: "from-plum/60 via-ferrari/45 to-sun/55",
        ctaLabel: "Cek Detail",
        ctaHref: "/#paket-pelajar",
      },
    ],
  },
  gallery: {
    eyebrow: "OUR MOMENTS",
    title: "Dokumentasi Keseruan",
    subtitle: "Momen terbaik dari study tour, kunjungan industri, dan wisata rombongan.",
    items: [
      {
        src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
        caption: "SMAN 1 di Bali",
      },
      {
        src: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80",
        caption: "Study Tour di Jogja",
      },
      {
        src: "https://images.unsplash.com/photo-1529078155058-5d716f45d604?auto=format&fit=crop&w=800&q=80",
        caption: "Armada Bus Berangkat",
      },
      {
        src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
        caption: "Interior Nyaman",
      },
      {
        src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
        caption: "Kunjungan TVRI",
      },
      {
        src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
        caption: "Siswa Happy",
      },
    ],
  },
  testimonials: {
    eyebrow: "REVIEWS",
    title: "Apa Kata Mereka?",
    subtitle: "Jujur dari hati, no setting-setting club.",
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
    title: "JANGAN CUMA WACANA, AYO BERANGKAT!",
    description:
      "Kami bantu susun itinerary, izin, hingga laporan perjalanan. Guru tinggal terima beres.",
    whatsappHref: "https://wa.me/",
    secondary: { label: "Minta Proposal", href: "/#kontak" },
  },
  faq: {
    eyebrow: "FAQ",
    title: "Yang Sering Ditanyain",
    subtitle: "Pertanyaan seputar study tour dan teknis pembayaran.",
    items: [
      {
        q: "Bisa pembayaran bertahap?",
        a: "Bisa banget. Kami bantu skema DP + pelunasan yang fleksibel menyesuaikan kas sekolah.",
      },
      {
        q: "Kapasitas bus berapa?",
        a: "Ada Big Bus (50 seat) dan Medium Bus (30-35 seat). Semua unit terbaru dengan AC dingin & Karaoke.",
      },
      {
        q: "Apa sudah termasuk asuransi?",
        a: "Ya, keselamatan nomor satu. Paket kami opsional include asuransi perjalanan Jasa Raharja Putra.",
      },
    ],
  },
  footer: {
    description: "Partner perjalanan edukasi & wisata nomor satu untuk sekolah kekinian.",
    quickLinks: [
      { label: "Home", href: "/" },
      { label: "Why Us", href: "/#tentang" },
      { label: "Paket", href: "/#paket-pelajar" },
      { label: "Galeri", href: "/#armada" },
      { label: "Kontak", href: "/#kontak" },
    ],
    contact: {
      addressLabel: "Markas",
      address: "Jl. Ferrari No. 1, Jawa Timur",
      phoneLabel: "WhatsApp",
      phone: "+62 812-3456-7890",
      emailLabel: "Email",
      email: "booking@ferrarijaya.com",
    },
  },
};