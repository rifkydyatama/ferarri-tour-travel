"use client";

import { useMemo, useState, useTransition } from "react";
import { createPayrollEntry, updatePayrollStatus, type PayrollStatus } from "./actions";

export type PayrollRow = {
  id: string;
  employee_name: string | null;
  period: string | null;
  amount: number | null;
  status: string | null;
  notes?: string | null;
  created_at?: string | null;
};

export type EmployeeOption = {
  name: string;
};

type Props = {
  initialItems: PayrollRow[];
  initialError?: string | null;
  employeeOptions?: EmployeeOption[];
};

const STATUS_OPTIONS: PayrollStatus[] = ["Draft", "Paid"];

export default function PayrollClient({ initialItems, initialError, employeeOptions }: Props) {
  const [isPending, startTransition] = useTransition();
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [employeeName, setEmployeeName] = useState("");
  const [period, setPeriod] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");

  const items = useMemo(() => initialItems ?? [], [initialItems]);
  const options = useMemo(() => employeeOptions ?? [], [employeeOptions]);

  function closeModal() {
    setModalOpen(false);
    setMessage(null);
    setEmployeeName("");
    setPeriod("");
    setAmount("");
    setNotes("");
  }

  function submitCreate() {
    setMessage(null);
    startTransition(async () => {
      const amt = Number(amount);
      const res = await createPayrollEntry({ employeeName, period, amount: amt, notes });
      if (!res.ok) {
        setMessage(res.message);
        return;
      }
      closeModal();
    });
  }

  function onChangeStatus(id: string, status: PayrollStatus) {
    setMessage(null);
    startTransition(async () => {
      const res = await updatePayrollStatus(id, status);
      setMessage(res.message);
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Payroll</h1>
          <p className="mt-1 text-sm text-slate-500">Catat payroll karyawan per periode.</p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
        >
          + Buat Payroll
        </button>
      </div>

      {(initialError || message) && (
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-900">Info</p>
          <p className="mt-1 text-sm text-slate-600">{initialError ?? message}</p>
          {initialError?.includes("payroll_entries") && (
            <p className="mt-2 text-xs text-slate-500">
              Pastikan tabel <span className="font-mono">payroll_entries</span> ada di Supabase.
            </p>
          )}
        </div>
      )}

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-sm font-bold text-slate-900">Daftar Payroll</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4">Karyawan</th>
                <th className="px-6 py-4">Periode</th>
                <th className="px-6 py-4">Nominal</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-6 text-slate-500">
                    Belum ada data.
                  </td>
                </tr>
              ) : (
                items.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/60">
                    <td className="px-6 py-4 font-medium text-slate-900">{p.employee_name ?? "-"}</td>
                    <td className="px-6 py-4 text-slate-700">{p.period ?? "-"}</td>
                    <td className="px-6 py-4 text-slate-700">
                      {typeof p.amount === "number" ? p.amount.toLocaleString("id-ID") : "-"}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 outline-none focus:border-slate-400"
                        value={(p.status ?? "Draft") as PayrollStatus}
                        onChange={(e) => onChangeStatus(p.id, e.target.value as PayrollStatus)}
                        disabled={isPending}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white shadow-xl border border-slate-200">
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">Buat Payroll</h3>
                <p className="mt-0.5 text-xs text-slate-500">Input payroll karyawan.</p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl px-3 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100"
                aria-label="Tutup"
                title="Tutup"
              >
                ✕
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Nama Karyawan</label>
                {options.length > 0 ? (
                  <select
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-slate-400"
                    disabled={isPending}
                  >
                    <option value="">Pilih karyawan…</option>
                    {options.map((o) => (
                      <option key={o.name} value={o.name}>
                        {o.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                    placeholder="Nama"
                  />
                )}
                {options.length === 0 ? (
                  <p className="mt-2 text-xs text-slate-500">Opsional: tambah karyawan dulu di menu Karyawan supaya bisa pilih dari dropdown.</p>
                ) : null}
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Periode</label>
                  <input
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                    placeholder="2025-12"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Nominal</label>
                  <input
                    inputMode="numeric"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                    placeholder="1500000"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Catatan (opsional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[120px] w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                  placeholder="Catatan payroll"
                />
              </div>
              {message && (
                <div className="rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-700">
                  {message}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-6 py-4">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100"
                disabled={isPending}
              >
                Batal
              </button>
              <button
                type="button"
                onClick={submitCreate}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800 disabled:opacity-60"
                disabled={isPending}
              >
                {isPending ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
