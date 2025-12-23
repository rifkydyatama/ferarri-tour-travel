"use client";

import { useMemo, useState } from "react";
import {
  BadgeCheck,
  Banknote,
  Building2,
  CalendarDays,
  CreditCard,
  FileText,
  HandCoins,
  PiggyBank,
  ReceiptText,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";

type TabKey = "pl" | "cashflow" | "ap";

type VendorInvoice = {
  vendorName: string;
  projectRef: string;
  dueDate: string;
  amount: number;
};

const invoices: VendorInvoice[] = [
  {
    vendorName: "PO Harapan Jaya",
    projectRef: "PRJ-JOGJA-2412",
    dueDate: "2025-12-27",
    amount: 18_500_000,
  },
  {
    vendorName: "Hotel Samudra",
    projectRef: "PRJ-JOGJA-2412",
    dueDate: "2025-12-26",
    amount: 12_000_000,
  },
  {
    vendorName: "PO Bagong",
    projectRef: "PRJ-BROMO-2412",
    dueDate: "2025-12-29",
    amount: 9_750_000,
  },
  {
    vendorName: "Hotel Nusantara",
    projectRef: "PRJ-BROMO-2412",
    dueDate: "2025-12-28",
    amount: 7_500_000,
  },
  {
    vendorName: "PO Sejahtera Transport",
    projectRef: "PRJ-INDUSTRI-2412",
    dueDate: "2025-12-30",
    amount: 11_250_000,
  },
];

function formatIDR(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition " +
        (active
          ? "bg-ferrari text-white"
          : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50")
      }
    >
      {label}
    </button>
  );
}

export default function FinancialReportPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("pl");

  // Example Tour Organizer numbers
  const grossRevenue = 150_000_000;
  const vendorCost = 110_000_000; // COGS: sewa bus + sewa hotel
  const grossProfit = grossRevenue - vendorCost;
  const operationalExpenses = 20_000_000; // tickets, catering, crew (internal)
  const netProfit = grossProfit - operationalExpenses;

  const expenseBreakdown = useMemo(
    () =>
      [
        {
          name: "Sewa Bus (Vendor)",
          amount: 70_000_000,
          tone: "expense" as const,
        },
        {
          name: "Sewa Hotel (Vendor)",
          amount: 40_000_000,
          tone: "expense" as const,
        },
        {
          name: "Tiket Wisata (Ops)",
          amount: 8_000_000,
          tone: "expense" as const,
        },
        {
          name: "Catering / Konsumsi (Ops)",
          amount: 7_000_000,
          tone: "expense" as const,
        },
        {
          name: "Crew & Handling (Ops)",
          amount: 5_000_000,
          tone: "expense" as const,
        },
      ],
    []
  );

  const totalAP = useMemo(() => invoices.reduce((sum, inv) => sum + inv.amount, 0), []);

  return (
    <div className="space-y-8">
      <header>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-slate-500">ADMIN • KEUANGAN</p>
            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
              Financial Report
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Laporan keuangan untuk model Tour Organizer: vendor (bus + hotel) dan operasional
              internal.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
            <CalendarDays className="h-4 w-4 text-ferrari" />
            Periode: Bulan berjalan
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <TabButton
            label="Ringkasan Laba/Rugi"
            active={activeTab === "pl"}
            onClick={() => setActiveTab("pl")}
          />
          <TabButton
            label="Arus Kas (Cashflow)"
            active={activeTab === "cashflow"}
            onClick={() => setActiveTab("cashflow")}
          />
          <TabButton
            label="Hutang Vendor (AP)"
            active={activeTab === "ap"}
            onClick={() => setActiveTab("ap")}
          />
        </div>
      </header>

      {activeTab === "pl" && (
        <section className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-50">
                  <FileText className="h-5 w-5 text-ferrari" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold tracking-tight text-slate-900">
                    Profit & Loss
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">Ringkasan laba/rugi</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                <BadgeCheck className="h-4 w-4 text-leaf" />
                Professional accounting view
              </div>
            </div>

            <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold tracking-[0.2em] text-slate-500">GROSS REVENUE</p>
                    <p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
                      {formatIDR(grossRevenue)}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">Total omset dari klien</p>
                  </div>
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-ferrari/10">
                    <Wallet className="h-5 w-5 text-ferrari" />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold tracking-[0.2em] text-slate-500">VENDOR COST (COGS)</p>
                    <p className="mt-2 text-2xl font-extrabold tracking-tight text-ferrari">
                      {formatIDR(vendorCost)}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">Sewa bus + sewa hotel</p>
                  </div>
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-slate-50">
                    <Building2 className="h-5 w-5 text-slate-700" />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold tracking-[0.2em] text-slate-500">GROSS PROFIT</p>
                    <p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
                      {formatIDR(grossProfit)}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">Revenue - COGS</p>
                  </div>
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-leaf/10">
                    <TrendingUp className="h-5 w-5 text-leaf" />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold tracking-[0.2em] text-slate-500">NET PROFIT</p>
                    <p className="mt-2 text-2xl font-extrabold tracking-tight text-leaf">
                      {formatIDR(netProfit)}
                    </p>
                    <p className="mt-1 text-xs text-slate-600">Gross profit - operasional</p>
                  </div>
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-white">
                    <PiggyBank className="h-5 w-5 text-leaf" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-extrabold tracking-tight text-slate-900">
                  Rincian Pengeluaran
                </h3>
                <p className="mt-1 text-sm text-slate-600">Daftar teks (tanpa chart library)</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                <ReceiptText className="h-4 w-4 text-ferrari" />
                Total: {formatIDR(vendorCost + operationalExpenses)}
              </div>
            </div>

            <ul className="mt-5 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
              {expenseBreakdown.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between gap-4 px-5 py-4"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="mt-1 text-xs text-slate-500">Expense</p>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-ferrari">
                      {formatIDR(item.amount)}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">Outflow</p>
                  </div>
                </li>
              ))}

              <li className="flex items-center justify-between gap-4 bg-slate-50 px-5 py-4">
                <div>
                  <p className="font-extrabold text-slate-900">Laba Bersih</p>
                  <p className="mt-1 text-xs text-slate-500">Profit</p>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-leaf">{formatIDR(netProfit)}</p>
                  <p className="mt-1 text-xs text-slate-500">Net</p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      )}

      {activeTab === "cashflow" && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-base font-extrabold tracking-tight text-slate-900">
                Arus Kas (Cashflow)
              </h2>
              <p className="mt-1 text-sm text-slate-600">Placeholder ringkas untuk alur kas masuk/keluar.</p>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-50">
              <Banknote className="h-5 w-5 text-ferrari" />
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-bold tracking-[0.2em] text-slate-500">CASH IN</p>
              <p className="mt-2 text-2xl font-extrabold tracking-tight text-leaf">
                {formatIDR(120_000_000)}
              </p>
              <p className="mt-1 text-xs text-slate-500">Pembayaran klien (DP + pelunasan)</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-bold tracking-[0.2em] text-slate-500">CASH OUT</p>
              <p className="mt-2 text-2xl font-extrabold tracking-tight text-ferrari">
                {formatIDR(95_000_000)}
              </p>
              <p className="mt-1 text-xs text-slate-500">Vendor + operasional</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-bold tracking-[0.2em] text-slate-500">NET CASH</p>
              <p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
                {formatIDR(25_000_000)}
              </p>
              <p className="mt-1 text-xs text-slate-600">Saldo bersih bulan berjalan</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">Catatan</p>
                <p className="mt-1 text-sm text-slate-600">
                  Tab ini bisa diisi detail transaksi masuk/keluar (bank, kas, escrow) saat data
                  sudah tersedia.
                </p>
              </div>
              <TrendingDown className="h-5 w-5 text-slate-500" />
            </div>
          </div>
        </section>
      )}

      {activeTab === "ap" && (
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-50">
                <HandCoins className="h-5 w-5 text-ferrari" />
              </div>
              <div>
                <h2 className="text-base font-extrabold tracking-tight text-slate-900">
                  Hutang Vendor (Accounts Payable)
                </h2>
                <p className="mt-1 text-sm text-slate-600">Unpaid vendor invoices</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
              <CreditCard className="h-4 w-4 text-ferrari" />
              Total AP: {formatIDR(totalAP)}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-bold tracking-[0.2em] text-slate-600">
                <tr>
                  <th className="px-6 py-3">Vendor Name</th>
                  <th className="px-6 py-3">Project Ref</th>
                  <th className="px-6 py-3">Due Date</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {invoices.map((inv) => (
                  <tr
                    key={`${inv.vendorName}-${inv.projectRef}-${inv.dueDate}`}
                    className="transition hover:bg-slate-50/70"
                  >
                    <td className="px-6 py-4 font-semibold text-slate-900">{inv.vendorName}</td>
                    <td className="px-6 py-4 text-slate-700">{inv.projectRef}</td>
                    <td className="px-6 py-4 text-slate-600">{inv.dueDate}</td>
                    <td className="px-6 py-4 font-extrabold text-ferrari">
                      {formatIDR(inv.amount)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-xl bg-ferrari px-4 py-2 text-xs font-semibold text-white transition hover:opacity-95"
                      >
                        Pay Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
