import { createSupabaseServerClient, requireAdminUser } from "@/lib/supabase/server";
import { 
   TrendingUp,
   Bus,
   UserCheck,
   CalendarClock,
   FileOutput,
   Radio,
} from "lucide-react";
import Link from "next/link";

type BookingRow = {
   id: string | number;
   status?: string | null;
   client_name?: string | null;
   destination?: string | null;
   marketing_pic?: string | null;
};

type LiveReportRow = {
   id: string | number;
   reporter_name?: string | null;
   timestamp?: string | number | null;
   location?: string | null;
   status_update?: string | null;
};

type EmployeeRow = {
   id: string | number;
   name?: string | null;
};


export default async function AdminDashboardPage() {
  const auth = await requireAdminUser();
  if (!auth.ok) return null;
  const { role } = auth;
  const supabase = await createSupabaseServerClient();

  // === DATA FETCHING (Semua Role Butuh Data Tertentu) ===
   const { data: bookings } = (await supabase?.from("bookings").select("*").limit(5)) ?? {
      data: [] as BookingRow[],
   };
   const { data: liveReports } =
      (await supabase?.from("tour_live_reports").select("*").order("timestamp", { ascending: false }).limit(3)) ??
      { data: [] as LiveReportRow[] };
   const { data: employees } = (await supabase?.from("employees").select("*").limit(5)) ?? {
      data: [] as EmployeeRow[],
   };

  // =========================================================
  // 1. DASHBOARD MARKETING (Fokus: Live Report & Booking)
  // =========================================================
  if (role === 'marketing') {
    return (
      <div className="space-y-8 animate-in fade-in">
         <div className="p-8 rounded-[2.5rem] bg-gradient-to-r from-ferrari to-red-600 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
               <h1 className="text-3xl font-black mb-2">Halo, Marketing Team! 👋</h1>
               <p className="opacity-90 max-w-xl">
                 Jangan lupa update <b>Live Report</b> saat mendampingi tamu. Laporanmu dipantau langsung oleh Pimpinan & TU.
               </p>
               <div className="mt-6 flex gap-3">
                  <button className="px-6 py-3 bg-white text-ferrari font-bold rounded-full hover:bg-slate-100 transition flex items-center gap-2">
                     <Radio className="w-4 h-4" /> Update Live Report
                  </button>
                  <button className="px-6 py-3 bg-black/20 text-white font-bold rounded-full hover:bg-black/30 transition flex items-center gap-2">
                     + Input Booking Baru
                  </button>
               </div>
            </div>
         </div>

         {/* Status Booking */}
         <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
               <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CalendarClock className="w-5 h-5 text-ferrari" /> Booking Sedang Proses (TU)
               </h3>
               <div className="space-y-3">
                  {bookings
                    ?.filter((b) => b.status === "New" || b.status === "In Process")
                    .map((b) => (
                     <div key={b.id} className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center">
                        <div>
                           <p className="font-bold text-slate-900">{b.client_name ?? "-"}</p>
                           <p className="text-xs text-slate-500">Ke: {b.destination ?? "-"}</p>
                        </div>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">
                           {b.status ?? "-"}
                        </span>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    );
  }

  // =========================================================
  // 2. DASHBOARD TATA USAHA (Fokus: Pipeline & Admin)
  // =========================================================
  if (role === 'tata_usaha') {
    return (
       <div className="space-y-8 animate-in fade-in">
          {/* Header Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="p-6 bg-white rounded-[2rem] border border-slate-200 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Booking Masuk</p>
                <p className="text-3xl font-black text-slate-900 mt-2">{bookings?.filter(b => b.status === 'New').length}</p>
             </div>
             <div className="p-6 bg-white rounded-[2rem] border border-slate-200 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Siap Jalan</p>
                <p className="text-3xl font-black text-slate-900 mt-2">{bookings?.filter(b => b.status === 'Ready').length}</p>
             </div>
             <div className="p-6 bg-slate-900 text-white rounded-[2rem] shadow-sm">
                <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Total Karyawan</p>
                <p className="text-3xl font-black mt-2">{employees?.length}</p>
             </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
             {/* Kolom 1: Pipeline Booking */}
             <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-xl font-black text-slate-900">PIPELINE BOOKING</h3>
                   <span className="text-xs font-bold text-ferrari bg-ferrari/10 px-3 py-1 rounded-full">Perlu Tindakan</span>
                </div>
                <div className="space-y-4">
                   {bookings?.map((b) => (
                      <div key={b.id} className="group p-5 bg-slate-50 hover:bg-white border border-slate-100 hover:border-ferrari/30 rounded-2xl transition-all flex justify-between items-center">
                         <div className="flex items-center gap-4">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                                b.status === "New" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                              }`}
                            >
                               {(b.client_name?.trim()?.[0] ?? "-").toUpperCase()}
                            </div>
                            <div>
                               <p className="font-bold text-slate-900">{b.client_name ?? "-"}</p>
                               <p className="text-xs text-slate-500">
                                 Destinasi: {b.destination ?? "-"} • {b.marketing_pic ?? "-"}
                               </p>
                            </div>
                         </div>
                         <div className="flex gap-2">
                            {b.status === "New" && (
                               <button className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-ferrari transition">
                                  Buat Itinerary
                               </button>
                            )}
                            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50">
                               Detail
                            </button>
                         </div>
                      </div>
                   ))}
                </div>
             </div>

             {/* Kolom 2: Quick Actions */}
             <div className="space-y-6">
                <div className="bg-white p-6 rounded-[2rem] border border-slate-200">
                   <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
                   <div className="space-y-2">
                      <button className="w-full text-left px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 font-bold text-sm text-slate-700 flex items-center gap-3">
                         <CalendarClock className="w-4 h-4 text-ferrari" /> Susun Jadwal Bus
                      </button>
                      <button className="w-full text-left px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 font-bold text-sm text-slate-700 flex items-center gap-3">
                         <FileOutput className="w-4 h-4 text-ferrari" /> Cetak Invoice
                      </button>
                      <button className="w-full text-left px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 font-bold text-sm text-slate-700 flex items-center gap-3">
                         <UserCheck className="w-4 h-4 text-ferrari" /> Input Gaji Karyawan
                      </button>
                   </div>
                </div>
             </div>
          </div>
       </div>
    );
  }

  // =========================================================
  // 3. DASHBOARD PIMPINAN (Fokus: Kontrol Penuh & Live)
  // =========================================================
  // Logic Pimpinan dapat semua akses + Map
  return (
    <div className="space-y-8 animate-in fade-in">
       {/* Section Peta Live Tracking (Visualisasi) */}
       <div className="relative w-full h-80 bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl group">
          {/* Dummy Map UI */}
          <div className="absolute inset-0 opacity-40 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
          
          <div className="absolute bottom-0 left-0 p-8 w-full">
             <div className="flex justify-between items-end">
                <div>
                   <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/50 text-red-200 text-xs font-bold uppercase tracking-widest mb-2 animate-pulse">
                      <Radio className="w-3 h-3" /> Live Tracking Armada
                   </span>
                   <h2 className="text-3xl font-black text-white">CONTROL CENTER</h2>
                   <p className="text-slate-400 mt-1">3 Armada sedang bertugas di lapangan.</p>
                </div>
                <button className="px-6 py-3 bg-white text-slate-900 font-bold rounded-full hover:bg-acid hover:text-slate-900 transition">
                   Buka Peta Fullscreen
                </button>
             </div>
          </div>

          {/* Floating Bus Indicator (Dummy) */}
          <div className="absolute top-1/3 left-1/4">
             <div className="relative group/pin cursor-pointer">
                <div className="w-12 h-12 bg-ferrari rounded-full flex items-center justify-center text-white shadow-lg shadow-ferrari/50 animate-bounce">
                   <Bus className="w-6 h-6" />
                </div>
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white px-3 py-2 rounded-xl shadow-xl w-40 text-center opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none">
                   <p className="text-xs font-bold text-slate-900">Bus Pariwisata 01</p>
                   <p className="text-[10px] text-slate-500">Lokasi: Tol Cipali</p>
                </div>
             </div>
          </div>
       </div>

       <div className="grid lg:grid-cols-2 gap-8">
          {/* Laporan Karyawan (Live Report Feed) */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-lg text-slate-900">FEED LAPANGAN</h3>
                <Link href="#" className="text-sm font-bold text-ferrari">Lihat Semua</Link>
             </div>
             <div className="space-y-6">
                {liveReports?.map((log) => (
                   <div key={log.id} className="flex gap-4">
                      <div className="flex flex-col items-center gap-1">
                         <div className="w-2 h-2 rounded-full bg-ferrari" />
                         <div className="w-0.5 h-full bg-slate-100" />
                      </div>
                      <div className="pb-6">
                         <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-slate-900 text-sm">{log.reporter_name ?? "-"}</span>
                            <span className="text-xs text-slate-400">
                              • {log.timestamp ? new Date(log.timestamp).toLocaleTimeString("id-ID") : "-"}
                            </span>
                         </div>
                         <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-sm text-slate-600">
                            <p className="mb-2">
                              <span className="font-bold text-slate-800">[{log.location ?? "-"}]</span>{" "}
                              {log.status_update ?? "-"}
                            </p>
                            {/* Jika ada foto, bisa ditampilkan disini */}
                         </div>
                      </div>
                   </div>
                ))}
                {liveReports?.length === 0 && <p className="text-slate-400 italic">Belum ada laporan masuk hari ini.</p>}
             </div>
          </div>

          {/* Financial Overview (Simplified) */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-center text-center">
             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                <TrendingUp className="w-10 h-10" />
             </div>
             <h3 className="text-4xl font-black text-slate-900 mb-2">PROFIT MONITOR</h3>
             <p className="text-slate-500 mb-8">Pantau kesehatan finansial perusahaan secara real-time dari modul Tata Usaha.</p>
             <Link href="/admin/keuangan" className="w-full py-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-ferrari transition-colors">
                Buka Laporan Keuangan Lengkap
             </Link>
          </div>
       </div>
    </div>
  );
}