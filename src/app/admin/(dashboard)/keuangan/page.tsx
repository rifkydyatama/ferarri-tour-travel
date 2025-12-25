import Link from "next/link";
import { createSupabaseServerClient, requireAdminUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const runtime = "edge";

// Define interfaces for type safety
interface Payment {
  amount: number;
}

interface BookingWithPayments {
  id: string;
  client_name: string;
  destination: string;
  tour_date: string;
  total_price: number;
  payments: Payment[];
}

export default async function KeuanganPage() {
  const { ok } = await requireAdminUser();
  if (!ok) redirect("/admin/login");

  const supabase = await createSupabaseServerClient();
  
  // Ambil semua booking dengan pembayaran
  const { data: bookings } = await supabase!
    .from("bookings")
    .select("*, payments(amount)")
    .order("created_at", { ascending: false });

  // Server Action: Input Pembayaran (Inline di sini biar praktis)
  async function addPayment(formData: FormData) {
    "use server";
    const supabase = await createSupabaseServerClient();
    const bookingId = formData.get("booking_id") as string;
    const amount = Number(formData.get("amount"));
    const type = formData.get("type") as string;
    
    await supabase!.from("payments").insert([{
      booking_id: bookingId,
      amount: amount,
      payment_type: type
    }]);

    // Update status booking kalau lunas (bisa ditambah logika hitung)
    redirect("/admin/keuangan"); 
  }

  return (
    <section className="mx-auto w-full max-w-7xl">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.25em] text-white/60">FINANCE DEPARTMENT</p>
          <h1 className="mt-2 text-3xl font-black text-white">Laporan & Kasir</h1>
          <p className="mt-2 text-white/70">Kelola pembayaran masuk dan cetak invoice.</p>
        </div>
      </div>

      <div className="rounded-2xl bg-white shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="p-4 font-bold">KLIEN / ROMBONGAN</th>
                <th className="p-4 font-bold">TOTAL KONTRAK</th>
                <th className="p-4 font-bold">SUDAH BAYAR</th>
                <th className="p-4 font-bold">SISA (PIUTANG)</th>
                <th className="p-4 font-bold text-center">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(bookings as BookingWithPayments[])?.map((item) => {
                const totalBayar = item.payments?.reduce((acc: number, curr: Payment) => acc + curr.amount, 0) || 0;
                const sisa = (item.total_price || 0) - totalBayar;
                const lunas = sisa <= 0 && item.total_price > 0;

                return (
                  <tr key={item.id} className="hover:bg-slate-50 transition">
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{item.client_name}</div>
                      <div className="text-xs text-slate-500">{item.destination} • {format(new Date(item.tour_date), "dd MMM yyyy", {locale: id})}</div>
                    </td>
                    <td className="p-4 font-mono font-medium">
                      Rp {(item.total_price || 0).toLocaleString("id-ID")}
                    </td>
                    <td className="p-4 font-mono text-green-600 font-bold">
                      Rp {totalBayar.toLocaleString("id-ID")}
                    </td>
                    <td className="p-4 font-mono text-red-600 font-bold">
                      Rp {sisa.toLocaleString("id-ID")}
                    </td>
                    <td className="p-4 text-center space-x-2">
                      {/* Tombol Invoice */}
                      <Link 
                        href={`/admin/invoice/${item.id}`} 
                        className="inline-block rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
                        target="_blank"
                      >
                        📄 Invoice
                      </Link>

                      {/* Modal Input Bayar (Simple Trigger) */}
                      {!lunas && (
                        <form action={addPayment} className="inline-flex items-center gap-2">
                           <input type="hidden" name="booking_id" value={item.id} />
                           <input name="amount" type="number" placeholder="Rp..." className="w-24 rounded border border-slate-300 px-2 py-1 text-xs" required />
                           <select name="type" className="rounded border border-slate-300 px-2 py-1 text-xs" required>
                             <option value="DP">DP</option>
                             <option value="Termin">Termin</option>
                             <option value="Pelunasan">Pelunasan</option>
                           </select>
                           <button className="rounded bg-green-600 px-2 py-1 text-xs font-bold text-white hover:bg-green-700">
                             + Bayar
                           </button>
                        </form>
                      )}
                      {lunas && <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">LUNAS ✅</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}