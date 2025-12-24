import Link from "next/link";
import { redirect } from "next/navigation";

import { createSupabaseServerClient, requireAdminUser } from "@/lib/supabase/server";

async function MarketingDashboard({ userId }: { userId: string }) {
  const supabase = await createSupabaseServerClient();

  let isOnTour = false;
  if (supabase) {
    const { data, error } = await supabase
      .from("bookings")
      .select("id")
      .eq("tour_leader_id", userId)
      .eq("status", "On Tour")
      .limit(1);

    isOnTour = !error && (data?.length ?? 0) > 0;
  }

  if (isOnTour) {
    return (
      <section className="mx-auto w-full max-w-xl">
        <h1 className="text-balance text-2xl font-extrabold tracking-tight">Mobile Tour Leader Panel</h1>
        <p className="mt-2 text-sm text-white/70">
          Akses cepat untuk update saat sedang on-tour.
        </p>

        <div className="mt-6 grid gap-4">
          <button
            type="button"
            className="h-14 w-full rounded-2xl bg-white text-sm font-extrabold text-slate-950 transition hover:opacity-95"
          >
            Update Location
          </button>
          <button
            type="button"
            className="h-14 w-full rounded-2xl bg-white/10 text-sm font-extrabold text-white transition hover:bg-white/15"
          >
            Upload Photo
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-3xl">
      <h1 className="text-balance text-2xl font-extrabold tracking-tight">Office Dashboard</h1>
      <p className="mt-2 text-sm text-white/70">Shortcut untuk tugas kantor.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/booking/new"
          className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm font-semibold text-white/85 transition hover:bg-white/10"
        >
          <div className="text-base font-extrabold">Input Booking</div>
          <div className="mt-2 text-xs text-white/60">Buat booking baru dengan cepat</div>
        </Link>
      </div>
    </section>
  );
}

async function TataUsahaDashboard() {
  const supabase = await createSupabaseServerClient();

  let incomingCount: number | null = null;
  if (supabase) {
    const { count, error } = await supabase
      .from("bookings")
      .select("id", { count: "exact", head: true })
      .eq("status", "Incoming");

    incomingCount = error ? null : (count ?? 0);
  }

  return (
    <section className="mx-auto w-full max-w-3xl">
      <h1 className="text-balance text-2xl font-extrabold tracking-tight">Tata Usaha Dashboard</h1>
      <p className="mt-2 text-sm text-white/70">Ringkasan singkat dan akses ke laporan keuangan.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-xs font-semibold tracking-[0.2em] text-white/55">INCOMING BOOKINGS</div>
          <div className="mt-3 text-3xl font-extrabold">
            {incomingCount === null ? "—" : incomingCount}
          </div>
          <div className="mt-2 text-xs text-white/60">Status = Incoming</div>
        </div>

        <Link
          href="/admin/keuangan"
          className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm font-semibold text-white/85 transition hover:bg-white/10"
        >
          <div className="text-base font-extrabold">Finance Report</div>
          <div className="mt-2 text-xs text-white/60">Buka ringkasan dan laporan</div>
        </Link>
      </div>
    </section>
  );
}

function PimpinanDashboard() {
  return (
    <section className="mx-auto w-full max-w-4xl">
      <h1 className="text-balance text-2xl font-extrabold tracking-tight">Executive Dashboard</h1>
      <p className="mt-2 text-sm text-white/70">Ringkasan pimpinan dan placeholder live monitoring.</p>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-sm font-semibold text-white/85">Live Map</div>
        <div className="mt-4 flex h-72 items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/5 text-sm text-white/55">
          Live Map placeholder
        </div>
      </div>
    </section>
  );
}

export default async function AdminDashboardPage() {
  const { ok, user, role } = await requireAdminUser();
  if (!ok) redirect("/admin/login");

  if (role === "marketing") {
    return <MarketingDashboard userId={user.id} />;
  }

  if (role === "tata_usaha") {
    return <TataUsahaDashboard />;
  }

  if (role === "pimpinan") {
    return <PimpinanDashboard />;
  }

  return (
    <section className="mx-auto w-full max-w-3xl">
      <h1 className="text-balance text-2xl font-extrabold tracking-tight">Dashboard</h1>
      <p className="mt-2 text-sm text-white/70">Role: {role}</p>
    </section>
  );
}
