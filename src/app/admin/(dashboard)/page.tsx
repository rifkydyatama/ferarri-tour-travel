import Link from "next/link";
import { createSupabaseServerClient, requireAdminUser } from "@/lib/supabase/server";
import { Banknote, Bus, Camera, ClipboardPlus, LayoutPanelTop, MapPin, TrendingUp } from "lucide-react";

export const runtime = "edge";

type OnTourBooking = {
  id: string | number;
  client_name?: string | null;
  destination?: string | null;
  status?: string | null;
};

type TrackingEvent = {
  id: string | number;
  armada_label?: string | null;
  location?: string | null;
  note?: string | null;
  timestamp?: string | null;
};

export default async function AdminDashboardPage() {
  const auth = await requireAdminUser();
  if (!auth.ok) return null;

  const { role, user } = auth;
  const supabase = await createSupabaseServerClient();

  // =========================================================
  // MARKETING
  // =========================================================
  if (role === "marketing") {
    let onTourBooking: OnTourBooking | null = null;

    if (supabase) {
      const { data } = await supabase
        .from("bookings")
        .select("id, client_name, destination, status")
        .eq("tour_leader_id", user.id)
        .eq("status", "On Tour")
        .maybeSingle();

      onTourBooking = (data as OnTourBooking | null) ?? null;
    }

    // Mode Lapangan
    if (onTourBooking) {
      return (
        <div className="mx-auto w-full max-w-lg space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Live Tour Mode</p>
                <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900">LIVE TOUR MODE</h1>
                <p className="mt-2 text-sm font-semibold text-slate-600">
                  Pastikan update lokasi & dokumentasi saat tour.
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <Bus className="h-6 w-6" />
              </div>
            </div>

            <div className="mt-5 rounded-3xl bg-slate-50 p-5">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">Trip Info</p>
              <p className="mt-2 text-base font-black text-slate-900">{onTourBooking.client_name ?? "-"}</p>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                Destinasi: {onTourBooking.destination ?? "-"}
              </p>
              <p className="mt-1 text-xs font-bold text-slate-400">Booking ID: {String(onTourBooking.id)}</p>
            </div>
          </div>

          <div className="grid gap-3">
            <Link
              href="/admin/tracking"
              className="flex items-center justify-between rounded-3xl bg-slate-900 px-5 py-5 text-white shadow-sm"
            >
              <div>
                <p className="text-sm font-black">Update Lokasi</p>
                <p className="mt-0.5 text-xs text-white/70">Catat posisi armada terbaru</p>
              </div>
              <MapPin className="h-6 w-6" />
            </Link>

            <Link
              href="/admin/live-report"
              className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white px-5 py-5 text-slate-900 shadow-sm"
            >
              <div>
                <p className="text-sm font-black">Upload Foto</p>
                <p className="mt-0.5 text-xs text-slate-500">Kirim update dokumentasi</p>
              </div>
              <Camera className="h-6 w-6" />
            </Link>
          </div>
        </div>
      );
    }

    // Mode Kantor
    return (
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">Marketing</p>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900">Dashboard Marketing</h1>
          <p className="mt-2 text-sm text-slate-600">Pilih aksi cepat untuk kerja kantor.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/admin/bookings"
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black text-slate-900">Input Booking Baru</p>
                <p className="mt-1 text-xs text-slate-500">Masukkan data booking awal</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <ClipboardPlus className="h-6 w-6" />
              </div>
            </div>
          </Link>

          <Link
            href="/admin/konten"
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black text-slate-900">Edit Landing Page</p>
                <p className="mt-1 text-xs text-slate-500">Kelola konten website</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <LayoutPanelTop className="h-6 w-6" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }

  // =========================================================
  // TATA USAHA
  // =========================================================
  if (role === "tata_usaha") {
    let bookingMasuk = 0;
    if (supabase) {
      const { count } = await supabase
        .from("bookings")
        .select("id", { count: "exact", head: true })
        .eq("status", "New");
      bookingMasuk = count ?? 0;
    }

    return (
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">Tata Usaha</p>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900">Dashboard Tata Usaha</h1>
          <p className="mt-2 text-sm text-slate-600">Ringkasan operasional dan shortcut.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Booking Masuk</p>
                <p className="mt-2 text-4xl font-black text-slate-900">{bookingMasuk}</p>
                <p className="mt-2 text-sm text-slate-600">Status: New</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <Bus className="h-6 w-6" />
              </div>
            </div>
          </div>

          <Link
            href="/admin/keuangan"
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black text-slate-900">Laporan Keuangan</p>
                <p className="mt-1 text-xs text-slate-500">Lihat cashflow & laporan</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <Banknote className="h-6 w-6" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }

  // =========================================================
  // PIMPINAN (Executive)
  // =========================================================
  if (role === "pimpinan") {
    let onTourCount = 0;
    let latestTracking: TrackingEvent[] = [];

    if (supabase) {
      const [{ count }, { data }] = await Promise.all([
        supabase.from("bookings").select("id", { count: "exact", head: true }).eq("status", "On Tour"),
        supabase
          .from("armada_tracking_events")
          .select("id, armada_label, location, note, timestamp")
          .order("timestamp", { ascending: false })
          .limit(5),
      ]);
      onTourCount = count ?? 0;
      latestTracking = (data as TrackingEvent[] | null) ?? [];
    }

    return (
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">Pimpinan</p>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900">Dashboard Eksekutif</h1>
          <p className="mt-2 text-sm text-slate-600">Stats keuangan dan peta live tracking.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href="/admin/keuangan"
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Stats Keuangan</p>
                <p className="mt-2 text-lg font-black text-slate-900">Buka Laporan Keuangan</p>
                <p className="mt-1 text-xs text-slate-500">Cashflow, pemasukan, pengeluaran</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </Link>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Tour Berjalan</p>
                <p className="mt-2 text-4xl font-black text-slate-900">{onTourCount}</p>
                <p className="mt-2 text-sm text-slate-600">Status booking: On Tour</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <Bus className="h-6 w-6" />
              </div>
            </div>
          </div>

          <Link
            href="/admin/tracking"
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Peta Live Tracking</p>
                <p className="mt-2 text-lg font-black text-slate-900">Buka Tracking</p>
                <p className="mt-1 text-xs text-slate-500">Pantau update armada terbaru</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <MapPin className="h-6 w-6" />
              </div>
            </div>
          </Link>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-6 py-4">
            <h2 className="text-sm font-black text-slate-900">Live Tracking (Terbaru)</h2>
            <Link href="/admin/tracking" className="text-sm font-bold text-slate-900 hover:underline">
              Lihat Semua
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {latestTracking.length === 0 ? (
              <div className="px-6 py-8 text-sm text-slate-500">Belum ada data tracking.</div>
            ) : (
              latestTracking.map((e) => (
                <div key={String(e.id)} className="px-6 py-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-black text-slate-900">{e.armada_label ?? "-"}</p>
                    <p className="text-xs font-bold text-slate-400">
                      {e.timestamp ? new Date(e.timestamp).toLocaleString("id-ID") : "-"}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">
                    <span className="font-black text-slate-900">[{e.location ?? "-"}]</span> {e.note ?? "-"}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-xl font-black text-slate-900">Dashboard</h1>
      <p className="mt-2 text-sm text-slate-600">Role kamu: {role}</p>
    </div>
  );
}