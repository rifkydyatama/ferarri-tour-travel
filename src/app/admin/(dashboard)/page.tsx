import { Building2, PieChart, ReceiptText, Wallet } from "lucide-react";

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
      return "bg-leaf/15 text-slate-900 ring-1 ring-leaf/30";
    case "DP Dibayar":
      return "bg-ocean/15 text-slate-900 ring-1 ring-ocean/30";
    default:
      return "bg-[var(--color-ferrari)]/10 text-slate-900 ring-1 ring-[var(--color-ferrari)]/25";
  }
}

export default function AdminDashboardPage() {
  // Example numbers (Tour Organizer model)
  const totalRevenue = 150_000_000;
  const busRentalCost = 70_000_000;
  const hotelRentalCost = 40_000_000;
  const vendorCost = busRentalCost + hotelRentalCost;
  const operationalCost = 20_000_000; // tickets, catering, crew
  const netProfit = totalRevenue - (vendorCost + operationalCost);

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
          Dashboard — Tour Organizer
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Model bisnis: sewa bus & hotel (vendor), operasional dikelola internal.
        </p>
      </section>

      {/* Financial Overview */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-slate-500">TOTAL OMSET</p>
              <p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
                {formatIDR(totalRevenue)}
              </p>
              <p className="mt-1 text-xs text-slate-500">Total revenue dari klien</p>
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-ferrari/10">
              <Wallet className="h-5 w-5 text-ferrari" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-slate-500">BIAYA VENDOR (SEWA)</p>
              <p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
                {formatIDR(vendorCost)}
              </p>
              <p className="mt-1 text-xs text-slate-500">Sewa bus + sewa hotel</p>
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-slate-50">
              <Building2 className="h-5 w-5 text-slate-700" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-slate-500">BIAYA OPERASIONAL</p>
              <p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
                {formatIDR(operationalCost)}
              </p>
              <p className="mt-1 text-xs text-slate-500">Tiket, catering, crew</p>
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-slate-50">
              <ReceiptText className="h-5 w-5 text-slate-700" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-slate-500">LABA BERSIH</p>
              <p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
                {formatIDR(netProfit)}
              </p>
              <p className="mt-1 text-xs text-slate-600">Revenue - (Vendor + Ops)</p>
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-white">
              <PieChart className="h-5 w-5 text-ferrari" />
            </div>
          </div>
        </div>
      </section>

      {/* Cost Breakdown (stacked bar) */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-extrabold tracking-tight text-slate-900">
              Cost Breakdown
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Visual alokasi omset (tanpa chart library)
            </p>
          </div>
          <div className="text-xs font-semibold text-slate-500">
            Basis: {formatIDR(totalRevenue)}
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          <div className="flex h-10 w-full">
            <div
              className="h-full w-[46.6667%] bg-ferrari"
              title={`Sewa Bus: ${formatIDR(busRentalCost)}`}
            />
            <div
              className="h-full w-[26.6667%] bg-ocean"
              title={`Sewa Hotel: ${formatIDR(hotelRentalCost)}`}
            />
            <div
              className="h-full w-[13.3333%] bg-sun"
              title={`Operasional: ${formatIDR(operationalCost)}`}
            />
            <div
              className="h-full w-[13.3333%] bg-leaf"
              title={`Profit: ${formatIDR(netProfit)}`}
            />
          </div>
        </div>

        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-ferrari" />
              <span className="font-semibold text-slate-900">Sewa Bus</span>
            </div>
            <span className="text-slate-600">{formatIDR(busRentalCost)}</span>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-ocean" />
              <span className="font-semibold text-slate-900">Sewa Hotel</span>
            </div>
            <span className="text-slate-600">{formatIDR(hotelRentalCost)}</span>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-sun" />
              <span className="font-semibold text-slate-900">Operasional</span>
            </div>
            <span className="text-slate-600">{formatIDR(operationalCost)}</span>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-leaf" />
              <span className="font-semibold text-slate-900">Profit</span>
            </div>
            <span className="text-slate-600">{formatIDR(netProfit)}</span>
          </div>
        </div>
      </section>

      {/* Vendor Status Table */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-base font-extrabold tracking-tight text-slate-900">
            Vendor Status (Pembayaran Mendatang)
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Gabungan PO bus dan hotel untuk jadwal pembayaran upcoming
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold tracking-[0.2em] text-slate-600">
              <tr>
                <th className="px-6 py-3">Vendor</th>
                <th className="px-6 py-3">Nama</th>
                <th className="px-6 py-3">Layanan</th>
                <th className="px-6 py-3">Jatuh Tempo</th>
                <th className="px-6 py-3">Nominal</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {vendorPayments.map((row) => (
                <tr
                  key={`${row.vendorType}-${row.vendorName}-${row.dueDate}`}
                  className="transition hover:bg-slate-50/70"
                >
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold text-slate-900 ring-1 ring-slate-900/10">
                      {row.vendorType}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-900">{row.vendorName}</td>
                  <td className="px-6 py-4 text-slate-700">{row.service}</td>
                  <td className="px-6 py-4 text-slate-600">{row.dueDate}</td>
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    {formatIDR(row.amount)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusBadgeClass(
                        row.status
                      )}`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
