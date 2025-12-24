import Link from "next/link";
import { redirect } from "next/navigation";
import { BarChart3, Camera, ClipboardPlus, FileText, MapPin } from "lucide-react";

import { createSupabaseServerClient, requireAdminUser } from "@/lib/supabase/server";
import TourLeaderPanel from "@/components/dashboard/TourLeaderPanel";

export const runtime = "edge";

function StatCard({ title, value, hint }: { title: string; value: string | number; hint?: string }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <div className="text-xs font-semibold tracking-[0.25em] text-slate-500">{title}</div>
      <div className="mt-3 text-4xl font-extrabold text-slate-900">{value}</div>
      {hint && <div className="mt-2 text-xs text-slate-500">{hint}</div>}
    </div>
  );
}

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

async function MarketingDashboard({ userId }: { userId: string }) {
  const supabase = await createSupabaseServerClient();

  if (supabase) {
    const { data, error } = await supabase
      .from("bookings")
      .select("id, client_name, destination")
      .eq("tour_leader_id", userId)
      .eq("status", "On Tour")
      .limit(1)
      .maybeSingle();

    if (!error && data) {
      return (
        <section className="mx-auto w-full max-w-2xl">
          <div className="space-y-6">
            <div className="rounded-3xl bg-linear-to-br from-red-600 via-red-500 to-orange-500 p-6 text-white shadow-lg">
              <div className="text-xs font-semibold tracking-[0.25em] uppercase text-white/80">Trip</div>
              <div className="mt-2 text-2xl font-extrabold tracking-tight">{data.client_name || "Active Tour"}</div>
              <p className="mt-2 text-sm text-white/85">On-tour tools at your fingertips.</p>
            </div>

            <TourLeaderPanel bookingId={data.id} clientName={data.client_name || "Active Tour"} destination={data.destination} />
          </div>
        </section>
      );
    }
  }

  return (
    <section className="mx-auto w-full max-w-5xl">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-balance text-2xl font-extrabold tracking-tight">Marketing Dashboard</h1>
          <p className="mt-2 text-sm text-white/70">Quick actions in a bento grid.</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Link
          href="/admin/booking/new"
          className={cx(
            "group relative overflow-hidden rounded-3xl p-6 text-white shadow-lg transition transform",
            "bg-linear-to-br from-red-600 via-pink-500 to-orange-500",
            "hover:scale-[1.02]",
          )}
        >
          <div className="absolute right-4 top-4 opacity-70">
            <ClipboardPlus className="h-12 w-12" />
          </div>
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-white/80">Booking</div>
          <div className="mt-3 text-2xl font-extrabold">Input Booking</div>
          <p className="mt-2 max-w-sm text-sm text-white/85">Create bookings in seconds.</p>
        </Link>

        <Link
          href="/admin/konten"
          className={cx(
            "group relative overflow-hidden rounded-3xl p-6 text-white shadow-lg transition transform",
            "bg-linear-to-br from-blue-600 via-indigo-500 to-cyan-400",
            "hover:scale-[1.02]",
          )}
        >
          <div className="absolute right-4 top-4 opacity-70">
            <FileText className="h-12 w-12" />
          </div>
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-white/80">Content</div>
          <div className="mt-3 text-2xl font-extrabold">Landing Content</div>
          <p className="mt-2 max-w-sm text-sm text-white/85">Edit homepage sections fast.</p>
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
    <section className="mx-auto w-full max-w-5xl">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-balance text-2xl font-extrabold tracking-tight text-white">Tata Usaha Dashboard</h1>
          <p className="mt-2 text-sm text-white/70">Clean stats with quick finance access.</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <StatCard
          title="INCOMING"
          value={incomingCount === null ? "—" : incomingCount}
          hint="Bookings with status Incoming"
        />

        <Link
          href="/admin/keuangan"
          className="rounded-2xl bg-white p-5 text-left text-slate-900 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold tracking-[0.2em] text-slate-500">FINANCE</div>
              <div className="mt-2 text-xl font-extrabold">Finance Report</div>
              <p className="mt-2 text-sm text-slate-600">Open summaries and reports.</p>
            </div>
            <BarChart3 className="h-10 w-10 text-slate-400" />
          </div>
        </Link>
      </div>
    </section>
  );
}

async function PimpinanDashboard() {
  const supabase = await createSupabaseServerClient();

  let totalBookings: number | null = null;
  if (supabase) {
    const { count, error } = await supabase.from("bookings").select("id", { count: "exact", head: true });
    totalBookings = error ? null : (count ?? 0);
  }

  return (
    <section className="mx-auto w-full max-w-5xl">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-balance text-2xl font-extrabold tracking-tight text-white">Executive Dashboard</h1>
          <p className="mt-2 text-sm text-white/70">High-level view and live monitoring placeholder.</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <StatCard title="TOTAL BOOKINGS" value={totalBookings === null ? "—" : totalBookings} />
        <StatCard title="STATUS" value="Live" hint="System online" />
      </div>

      <div className="mt-8 rounded-3xl bg-linear-to-br from-slate-900 via-slate-950 to-black p-6 ring-1 ring-white/10">
        <div className="text-sm font-semibold text-white/85">Live Map</div>
        <div className="mt-4 flex h-80 items-center justify-center rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_55%)] text-sm text-white/65">
          <div className="flex flex-col items-center gap-2">
            <div className="h-12 w-12 rounded-full border border-white/20" />
            <div className="text-xs uppercase tracking-[0.3em] text-white/60">Radar View</div>
          </div>
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
