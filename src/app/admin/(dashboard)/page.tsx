import Link from "next/link";
import { redirect } from "next/navigation";
import { BarChart3, ClipboardPlus, FileText } from "lucide-react";
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

// --- MARKETING DASHBOARD ---
async function MarketingDashboard({ userId }: { userId: string }) {
  const supabase = await createSupabaseServerClient();
  
  if (supabase) {
    // Cek apakah user sedang bertugas (On Tour)
    const { data, error } = await supabase
      .from("bookings")
      .select("id, client_name, destination")
      .eq("tour_leader_id", userId)
      .eq("status", "On Tour") // Pastikan status ini sesuai saat ditugaskan TU
      .limit(1)
      .maybeSingle();

    if (!error && data) {
      // TAMPILAN MODE LAPANGAN (TOUR LEADER)
      return (
        <section className="mx-auto w-full max-w-2xl">
          <div className="space-y-6">
            <div className="rounded-3xl bg-gradient-to-br from-red-600 via-red-500 to-orange-500 p-6 text-white shadow-lg animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center gap-2 mb-2">
                 <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
                 </span>
                 <div className="text-xs font-bold tracking-[0.25em] uppercase text-white/90">LIVE DUTY MODE</div>
              </div>
              <div className="text-3xl font-extrabold tracking-tight">{data.client_name}</div>
              <p className="mt-1 text-lg font-medium text-white/90">Destination: {data.destination}</p>
            </div>
            
            {/* Panel GPS & Upload Foto */}
            <TourLeaderPanel bookingId={data.id} clientName={data.client_name} />
          </div>
        </section>
      );
    }
  }

  // TAMPILAN MODE KANTOR (OFFICE)
  return (
    <section className="mx-auto w-full max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-white">Marketing Dashboard</h1>
        <p className="mt-2 text-sm text-white/70">Welcome back. Manage your bookings and content here.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Link
          href="/admin/booking/new"
          className={cx(
            "group relative overflow-hidden rounded-3xl p-8 text-white shadow-lg transition transform",
            "bg-gradient-to-br from-red-600 via-pink-600 to-orange-500",
            "hover:scale-[1.02] hover:shadow-xl",
          )}
        >
          <div className="absolute right-0 top-0 p-6 opacity-50 group-hover:opacity-100 transition-opacity">
            <ClipboardPlus className="h-16 w-16 text-white mix-blend-overlay" />
          </div>
          <div className="relative z-10">
             <div className="text-xs font-bold uppercase tracking-[0.25em] text-white/80 mb-2">ACTION</div>
             <div className="text-3xl font-extrabold">Input Booking</div>
             <p className="mt-2 text-white/90 font-medium">Create new client order</p>
          </div>
        </Link>

        <Link
          href="/admin/konten"
          className={cx(
            "group relative overflow-hidden rounded-3xl p-8 text-white shadow-lg transition transform",
            "bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500",
            "hover:scale-[1.02] hover:shadow-xl",
          )}
        >
           <div className="absolute right-0 top-0 p-6 opacity-50 group-hover:opacity-100 transition-opacity">
            <FileText className="h-16 w-16 text-white mix-blend-overlay" />
          </div>
          <div className="relative z-10">
             <div className="text-xs font-bold uppercase tracking-[0.25em] text-white/80 mb-2">CMS</div>
             <div className="text-3xl font-extrabold">Landing Content</div>
             <p className="mt-2 text-white/90 font-medium">Edit website promo</p>
          </div>
        </Link>
      </div>
    </section>
  );
}

// --- TATA USAHA DASHBOARD ---
async function TataUsahaDashboard() {
  const supabase = await createSupabaseServerClient();

  let newBookingCount: number | null = null;
  if (supabase) {
    // PERBAIKAN: Hitung status 'New', bukan 'Incoming'
    const { count, error } = await supabase
      .from("bookings")
      .select("id", { count: "exact", head: true })
      .eq("status", "New");

    newBookingCount = error ? null : (count ?? 0);
  }

  return (
    <section className="mx-auto w-full max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-white">Tata Usaha Dashboard</h1>
        <p className="mt-2 text-sm text-white/70">Overview of operations and finance.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <StatCard
          title="NEW BOOKINGS"
          value={newBookingCount === null ? "—" : newBookingCount}
          hint="Waiting for assignment"
        />

        <Link
          href="/admin/keuangan"
          className="rounded-2xl bg-white p-6 text-left text-slate-900 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-lg group"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold tracking-[0.2em] text-slate-400 group-hover:text-ferrari transition-colors">SHORTCUT</div>
              <div className="mt-2 text-2xl font-extrabold">Finance Report</div>
              <p className="mt-2 text-sm text-slate-600">Manage income & expenses.</p>
            </div>
            <BarChart3 className="h-12 w-12 text-slate-300 group-hover:text-ferrari transition-colors" />
          </div>
        </Link>
      </div>
    </section>
  );
}

// --- PIMPINAN DASHBOARD ---
async function PimpinanDashboard() {
  const supabase = await createSupabaseServerClient();

  let totalBookings: number | null = null;
  if (supabase) {
    const { count, error } = await supabase.from("bookings").select("id", { count: "exact", head: true });
    totalBookings = error ? null : (count ?? 0);
  }

  return (
    <section className="mx-auto w-full max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-white">Executive Dashboard</h1>
        <p className="mt-2 text-sm text-white/70">Real-time monitoring & reports.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
            <StatCard title="TOTAL BOOKINGS" value={totalBookings === null ? "—" : totalBookings} hint="All time records" />
        </div>
        <div className="sm:col-span-2">
            <StatCard title="SYSTEM STATUS" value="Online" hint="Database connected" />
        </div>
      </div>

      <div className="mt-8 rounded-3xl bg-slate-900 p-8 border border-white/10 shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-[url('/globe.svg')] opacity-10 bg-cover bg-center"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-64 text-center">
            <div className="h-16 w-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4 animate-pulse">
                <div className="h-8 w-8 rounded-full bg-red-500"></div>
            </div>
            <h3 className="text-xl font-bold text-white">Live Tracking Map</h3>
            <p className="text-slate-400 mt-2 max-w-md">
                (Fitur Peta Interaktif akan muncul di sini setelah armada mulai mengirim data GPS)
            </p>
        </div>
      </div>
    </section>
  );
}

// --- MAIN PAGE COMPONENT ---
export default async function AdminDashboardPage() {
  const { ok, user, role } = await requireAdminUser();
  if (!ok) redirect("/admin/login");

  if (role === "marketing") return <MarketingDashboard userId={user.id} />;
  if (role === "tata_usaha") return <TataUsahaDashboard />;
  if (role === "pimpinan") return <PimpinanDashboard />;

  return (
    <section className="mx-auto w-full max-w-3xl">
       <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-200">
          <h1 className="text-xl font-bold">Access Limited</h1>
          <p>Role anda <strong>{role}</strong> belum memiliki dashboard khusus.</p>
       </div>
    </section>
  );
}