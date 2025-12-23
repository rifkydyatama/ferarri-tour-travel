import { Building2, PieChart, ReceiptText, Wallet, ArrowUpRight, TrendingUp } from "lucide-react";

// ... (Bagian data dummy & helper function formatIDR tetap sama seperti kode kamu sebelumnya)
type VendorPaymentRow = {
  vendorType: "Bus PO" | "Hotel";
  vendorName: string;
  service: string;
  dueDate: string;
  amount: number;
  status: "Belum Bayar" | "DP Dibayar" | "Lunas";
};

const vendorPayments: VendorPaymentRow[] = [
  {
    vendorType: "Bus PO",
    vendorName: "PO Harapan Jaya",
    service: "Sewa Bus (2 Unit) • Jogja",
    dueDate: "2025-12-27",
    amount: 35000000,
    status: "DP Dibayar",
  },
  {
    vendorType: "Hotel",
    vendorName: "Hotel Samudra",
    service: "Sewa Hotel (40 pax) • 2 malam",
    dueDate: "2025-12-26",
    amount: 28000000,
    status: "Belum Bayar",
  },
  {
    vendorType: "Bus PO",
    vendorName: "PO Bagong",
    service: "Sewa Bus (1 Unit) • Bromo",
    dueDate: "2025-12-25",
    amount: 18000000,
    status: "Lunas",
  },
  {
    vendorType: "Hotel",
    vendorName: "Hotel Nusantara",
    service: "Sewa Hotel (25 pax) • 1 malam",
    dueDate: "2025-12-28",
    amount: 14000000,
    status: "DP Dibayar",
  },
];

function formatIDR(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function statusBadgeClass(status: VendorPaymentRow["status"]) {
  switch (status) {
    case "Lunas":
      return "bg-leaf text-white";
    case "DP Dibayar":
      return "bg-sun text-slate-900";
    default:
      return "bg-ferrari text-white";
  }
}

export default function AdminDashboardPage() {
  const totalRevenue = 150_000_000;
  const busRentalCost = 70_000_000;
  const hotelRentalCost = 40_000_000;
  const vendorCost = busRentalCost + hotelRentalCost;
  const operationalCost = 20_000_000;
  const netProfit = totalRevenue - (vendorCost + operationalCost);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
           <h1 className="text-3xl font-black tracking-tighter text-slate-900">
             DASHBOARD
           </h1>
           <p className="text-slate-500 font-medium">Pantau performa bisnis real-time.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm text-sm font-bold text-slate-600">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
            Live Update
        </div>
      </div>

      {/* Stats Grid (Bento Style) */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Omset */}
        <div className="group relative overflow-hidden rounded-4xl bg-slate-900 p-6 shadow-xl transition hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-acid/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none group-hover:bg-acid/20 transition-colors" />
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
               <div className="p-3 rounded-2xl bg-white/10 text-acid">
                  <Wallet size={24} />
               </div>
               <span className="flex items-center gap-1 text-xs font-bold text-acid bg-acid/10 px-2 py-1 rounded-full">
                  +12% <TrendingUp size={12} />
               </span>
            </div>
            <p className="text-white/60 text-sm font-bold uppercase tracking-widest">Total Omset</p>
            <p className="text-2xl md:text-3xl font-black text-white mt-1">{formatIDR(totalRevenue)}</p>
          </div>
        </div>

        {/* Card 2: Vendor */}
        <div className="group relative overflow-hidden rounded-4xl bg-white p-6 shadow-sm border border-slate-200 transition hover:-translate-y-1 hover:shadow-lg">
          <div className="absolute top-0 right-0 w-32 h-32 bg-ocean/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
           <div className="flex justify-between items-start mb-4">
               <div className="p-3 rounded-2xl bg-ocean/10 text-ocean">
                  <Building2 size={24} />
               </div>
            </div>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Biaya Vendor</p>
            <p className="text-2xl md:text-3xl font-black text-slate-900 mt-1">{formatIDR(vendorCost)}</p>
        </div>

        {/* Card 3: Ops */}
        <div className="group relative overflow-hidden rounded-4xl bg-white p-6 shadow-sm border border-slate-200 transition hover:-translate-y-1 hover:shadow-lg">
           <div className="absolute top-0 right-0 w-32 h-32 bg-sun/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
           <div className="flex justify-between items-start mb-4">
               <div className="p-3 rounded-2xl bg-sun/10 text-sun-600">
                  <ReceiptText size={24} />
               </div>
            </div>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Operasional</p>
            <p className="text-2xl md:text-3xl font-black text-slate-900 mt-1">{formatIDR(operationalCost)}</p>
        </div>

        {/* Card 4: Profit */}
        <div className="group relative overflow-hidden rounded-4xl bg-linear-to-br from-ferrari to-red-600 p-6 shadow-xl transition hover:-translate-y-1">
           <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
           <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
               <div className="p-3 rounded-2xl bg-white/20 text-white">
                  <PieChart size={24} />
               </div>
            </div>
            <p className="text-white/80 text-sm font-bold uppercase tracking-widest">Laba Bersih</p>
            <p className="text-2xl md:text-3xl font-black text-white mt-1">{formatIDR(netProfit)}</p>
           </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Cost Breakdown */}
        <div className="lg:col-span-2 rounded-4xl bg-white p-8 border border-slate-200 shadow-sm">
           <h3 className="text-lg font-black text-slate-900 mb-6">COST BREAKDOWN</h3>
           
           {/* Custom Stacked Bar */}
           <div className="h-16 w-full rounded-2xl bg-slate-100 flex overflow-hidden mb-8 ring-4 ring-slate-50">
             <div className="h-full w-[46%] bg-slate-800 flex items-center justify-center text-white text-xs font-bold">BUS</div>
             <div className="h-full w-[27%] bg-ocean flex items-center justify-center text-white text-xs font-bold">HOTEL</div>
             <div className="h-full w-[13%] bg-sun flex items-center justify-center text-slate-900 text-xs font-bold">OPS</div>
             <div className="h-full w-[14%] bg-ferrari flex items-center justify-center text-white text-xs font-bold">$$$</div>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {[
                   { label: "Sewa Bus", val: busRentalCost, color: "bg-slate-800" },
                   { label: "Sewa Hotel", val: hotelRentalCost, color: "bg-ocean" },
                   { label: "Operasional", val: operationalCost, color: "bg-sun" },
                   { label: "Net Profit", val: netProfit, color: "bg-ferrari" },
               ].map((item) => (
                   <div key={item.label} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                       <div className={`w-3 h-3 rounded-full mb-2 ${item.color}`} />
                       <p className="text-xs text-slate-500 font-bold uppercase">{item.label}</p>
                       <p className="text-sm font-bold text-slate-900">{formatIDR(item.val)}</p>
                   </div>
               ))}
           </div>
        </div>

        {/* Quick Action / Mini List */}
        <div className="rounded-4xl bg-white p-8 border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center">
            <div className="w-20 h-20 bg-acid/20 rounded-full flex items-center justify-center mb-4">
                <ArrowUpRight className="w-10 h-10 text-acid-600" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">Buat Booking Baru</h3>
            <p className="text-slate-500 text-sm mb-6">Input data manual untuk klien yang booking via WhatsApp.</p>
            <button className="w-full py-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-ferrari transition-colors">
                + Tambah Booking
            </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-4xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
           <h3 className="text-lg font-black text-slate-900">UPCOMING PAYMENTS</h3>
           <button className="text-sm font-bold text-ferrari hover:underline">Lihat Semua</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-8 py-4 font-bold text-slate-500 uppercase text-xs tracking-wider">Vendor</th>
                <th className="px-8 py-4 font-bold text-slate-500 uppercase text-xs tracking-wider">Keterangan</th>
                <th className="px-8 py-4 font-bold text-slate-500 uppercase text-xs tracking-wider">Due Date</th>
                <th className="px-8 py-4 font-bold text-slate-500 uppercase text-xs tracking-wider">Nominal</th>
                <th className="px-8 py-4 font-bold text-slate-500 uppercase text-xs tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vendorPayments.map((row) => (
                <tr key={`${row.vendorType}-${row.vendorName}`} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-4">
                     <span className="font-bold text-slate-900 block">{row.vendorName}</span>
                     <span className="text-xs text-slate-500">{row.vendorType}</span>
                  </td>
                  <td className="px-8 py-4 text-slate-600 font-medium">{row.service}</td>
                  <td className="px-8 py-4 text-slate-600 font-mono">{row.dueDate}</td>
                  <td className="px-8 py-4 font-bold text-slate-900">{formatIDR(row.amount)}</td>
                  <td className="px-8 py-4">
                    <span className={`inline-flex items-center rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-wide ${statusBadgeClass(row.status)}`}>
                      {row.status}
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