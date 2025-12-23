import { ArrowDownRight, ArrowUpRight, Banknote, Calendar, Download, Filter } from "lucide-react";

export default function KeuanganPage() {
  // Dummy Data Transaksi
  const transactions = [
    { id: "TRX-001", date: "23 Des 2025", desc: "Pelunasan SMAN 1 Blitar", type: "in", amount: 45000000, status: "Verified" },
    { id: "TRX-002", date: "22 Des 2025", desc: "DP Bus PO Harapan Jaya", type: "out", amount: 15000000, status: "Success" },
    { id: "TRX-003", date: "20 Des 2025", desc: "DP SMPN 3 Tulungagung", type: "in", amount: 10000000, status: "Verified" },
    { id: "TRX-004", date: "19 Des 2025", desc: "Biaya Makan Crew", type: "out", amount: 2500000, status: "Pending" },
    { id: "TRX-005", date: "18 Des 2025", desc: "Pelunasan Hotel Jogja", type: "out", amount: 28000000, status: "Success" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
           <h1 className="text-3xl font-black tracking-tighter text-slate-900">
             KEUANGAN
           </h1>
           <p className="text-slate-500 font-medium">Laporan arus kas masuk & keluar perusahaan.</p>
        </div>
        <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50">
                <Calendar className="w-4 h-4" /> Des 2025
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 shadow-lg shadow-slate-900/20">
                <Download className="w-4 h-4" /> Export Excel
            </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
         <div className="p-6 rounded-[2rem] bg-slate-900 text-white shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-acid/20 rounded-full blur-2xl -mt-10 -mr-10 pointer-events-none" />
             <p className="text-white/60 font-bold text-xs uppercase tracking-widest mb-1">Total Saldo Kas</p>
             <h3 className="text-3xl font-black tracking-tight">Rp 158.450.000</h3>
             <div className="mt-4 flex items-center gap-2 text-acid text-xs font-bold">
                 <span className="bg-acid/10 px-2 py-1 rounded-full">+12% vs bulan lalu</span>
             </div>
         </div>

         <div className="p-6 rounded-[2rem] bg-white border border-slate-200 shadow-sm relative overflow-hidden">
             <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-green-50 rounded-2xl text-green-600">
                    <ArrowDownRight className="w-6 h-6" />
                </div>
             </div>
             <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">Pemasukan (Des)</p>
             <h3 className="text-2xl font-black text-slate-900">Rp 85.000.000</h3>
         </div>

         <div className="p-6 rounded-[2rem] bg-white border border-slate-200 shadow-sm relative overflow-hidden">
             <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-red-50 rounded-2xl text-red-600">
                    <ArrowUpRight className="w-6 h-6" />
                </div>
             </div>
             <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">Pengeluaran (Des)</p>
             <h3 className="text-2xl font-black text-slate-900">Rp 45.500.000</h3>
         </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden">
         <div className="p-6 border-b border-slate-100 flex items-center justify-between">
             <h3 className="font-bold text-lg text-slate-900">Riwayat Transaksi</h3>
             <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
                 <Filter className="w-5 h-5" />
             </button>
         </div>
         <div className="overflow-x-auto">
             <table className="w-full text-sm text-left">
                 <thead className="bg-slate-50 text-xs text-slate-500 uppercase font-bold tracking-wider">
                     <tr>
                         <th className="px-6 py-4">ID & Tanggal</th>
                         <th className="px-6 py-4">Keterangan</th>
                         <th className="px-6 py-4">Tipe</th>
                         <th className="px-6 py-4">Nominal</th>
                         <th className="px-6 py-4">Status</th>
                     </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                     {transactions.map((trx) => (
                         <tr key={trx.id} className="hover:bg-slate-50/80 transition-colors">
                             <td className="px-6 py-4">
                                 <span className="block font-bold text-slate-900">{trx.id}</span>
                                 <span className="text-xs text-slate-500">{trx.date}</span>
                             </td>
                             <td className="px-6 py-4 font-medium text-slate-700">
                                 {trx.desc}
                             </td>
                             <td className="px-6 py-4">
                                 {trx.type === "in" ? (
                                     <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-lg text-xs font-bold">
                                         <ArrowDownRight className="w-3 h-3" /> Masuk
                                     </span>
                                 ) : (
                                     <span className="inline-flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded-lg text-xs font-bold">
                                         <ArrowUpRight className="w-3 h-3" /> Keluar
                                     </span>
                                 )}
                             </td>
                             <td className="px-6 py-4 font-bold text-slate-900">
                                 Rp {new Intl.NumberFormat("id-ID").format(trx.amount)}
                             </td>
                             <td className="px-6 py-4">
                                 <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                     trx.status === "Success" || trx.status === "Verified" 
                                     ? "bg-slate-900 text-white" 
                                     : "bg-amber-100 text-amber-700"
                                 }`}>
                                     {trx.status}
                                 </span>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </table>
         </div>
      </div>

    </div>
  );
}