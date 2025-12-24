import { createSupabaseServerClient, requireAdminUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { id as ind } from "date-fns/locale";

export const runtime = "edge";

// Helper Format Rupiah
const formatRupiah = (number: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

export default async function InvoicePage({ params }: { params: { id: string } }) {
  const { ok } = await requireAdminUser();
  if (!ok) redirect("/admin/login");

  const supabase = await createSupabaseServerClient();
  const { id } = await params; // Akses params (Next.js 15)

  // Ambil Data Booking & Payment
  const { data: booking } = await supabase!
    .from("bookings")
    .select("*, payments(*)")
    .eq("id", id)
    .single();

  if (!booking) return <div>Data tidak ditemukan</div>;

  const totalBayar = booking.payments?.reduce((acc: number, curr: any) => acc + curr.amount, 0) || 0;
  const sisaTagihan = booking.total_price - totalBayar;

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-900 print:bg-white print:p-0">
      {/* Tombol Print (Hilang saat diprint) */}
      <div className="mx-auto mb-8 max-w-4xl text-right print:hidden">
        <button
          className="rounded-lg bg-slate-900 px-6 py-2 font-bold text-white hover:bg-slate-800"
          onClick={() => typeof window !== 'undefined' && window.print()}
        >
          🖨️ Cetak Invoice / Save PDF
        </button>
      </div>

      {/* KERTAS INVOICE */}
      <div className="mx-auto max-w-4xl bg-white p-12 shadow-xl print:shadow-none">
        {/* HEADER */}
        <div className="flex justify-between border-b-2 border-red-600 pb-8">
          <div>
             <h1 className="text-4xl font-black text-red-600 italic">FERRARI</h1>
             <p className="text-sm font-bold tracking-widest text-slate-500">TOUR & TRAVEL</p>
             <div className="mt-4 text-sm text-slate-600">
               Jl. Raya Pariwisata No. 1, Indonesia<br/>
               ferraritour@email.com | (021) 555-0123
             </div>
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-bold text-slate-300">INVOICE</h2>
            <p className="font-mono text-lg font-bold text-slate-900">#{booking.id.slice(0, 8).toUpperCase()}</p>
            <p className="text-sm text-slate-500 mt-1">Tanggal: {format(new Date(), "dd MMMM yyyy", { locale: ind })}</p>
          </div>
        </div>

        {/* CLIENT INFO */}
        <div className="mt-8 grid grid-cols-2 gap-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Kepada Yth:</p>
            <h3 className="text-xl font-bold">{booking.client_name}</h3>
            <p className="text-slate-600">Tujuan: {booking.destination}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Status Pembayaran:</p>
            <div className={`mt-1 inline-block rounded-full px-4 py-1 text-sm font-bold ${
              sisaTagihan <= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}>
              {sisaTagihan <= 0 ? "LUNAS" : "BELUM LUNAS"}
            </div>
          </div>
        </div>

        {/* TABEL RINCIAN */}
        <div className="mt-12">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-300">
                <th className="py-4 font-bold text-slate-600">Deskripsi</th>
                <th className="py-4 text-right font-bold text-slate-600">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-4">
                  <p className="font-bold">Paket Wisata {booking.destination}</p>
                  <p className="text-sm text-slate-500">{format(new Date(booking.tour_date), "dd MMMM yyyy", { locale: ind })} • {booking.pax_count} Pax</p>
                </td>
                <td className="py-4 text-right font-bold text-slate-900">
                  {formatRupiah(booking.total_price)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* TOTAL & PEMBAYARAN */}
        <div className="mt-8 flex justify-end">
          <div className="w-1/2 space-y-3">
            <div className="flex justify-between text-slate-600">
              <span>Total Tagihan</span>
              <span>{formatRupiah(booking.total_price)}</span>
            </div>
            <div className="flex justify-between font-bold text-green-600">
              <span>Sudah Dibayar (Masuk)</span>
              <span>- {formatRupiah(totalBayar)}</span>
            </div>
            <div className="border-t border-slate-300 pt-3 flex justify-between text-xl font-black text-slate-900">
              <span>Sisa Kekurangan</span>
              <span>{formatRupiah(sisaTagihan)}</span>
            </div>
          </div>
        </div>

        {/* HISTORY PEMBAYARAN */}
        <div className="mt-12 rounded-xl bg-slate-50 p-6">
          <h4 className="font-bold text-slate-700 mb-4">Riwayat Pembayaran Masuk</h4>
          {booking.payments && booking.payments.length > 0 ? (
            <ul className="space-y-2">
              {booking.payments.map((pay: any) => (
                <li key={pay.id} className="flex justify-between text-sm border-b border-slate-200 pb-2 last:border-0">
                  <span>{format(new Date(pay.payment_date), "dd/MM/yyyy")} — <span className="font-bold">{pay.payment_type}</span></span>
                  <span className="font-mono">{formatRupiah(pay.amount)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-400 italic">Belum ada pembayaran tercatat.</p>
          )}
        </div>

        {/* FOOTER */}
        <div className="mt-16 text-center text-xs text-slate-400">
          <p>Terima kasih telah mempercayakan perjalanan Anda kepada Ferrari Tour & Travel.</p>
          <p>Dokumen ini sah dan dicetak otomatis oleh sistem.</p>
        </div>
      </div>
    </div>
  );
}