"use client";

import { useMemo, useState, useTransition } from "react";
import { createArmada, updateArmadaStatus, type ArmadaStatus } from "./actions";

export type ArmadaRow = {
  id: string;
  name: string | null;
  plate_number: string | null;
  capacity: number | null;
  status: string | null;
  created_at?: string | null;
};

type Props = {
  initialItems: ArmadaRow[];
  initialError?: string | null;
};

const STATUS_OPTIONS: ArmadaStatus[] = ["Active", "Maintenance", "Inactive"];

export default function ArmadaClient({ initialItems, initialError }: Props) {
  const [isPending, startTransition] = useTransition();
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [capacity, setCapacity] = useState("");

  const items = useMemo(() => initialItems ?? [], [initialItems]);

  function closeModal() {
    setModalOpen(false);
    setMessage(null);
    setName("");
    setPlateNumber("");
    setCapacity("");
  }

  function submitCreate() {
    setMessage(null);
    startTransition(async () => {
      const cap = capacity.trim() ? Number(capacity) : undefined;
      const res = await createArmada({ name, plateNumber, capacity: cap });
      if (!res.ok) {
        setMessage(res.message);
        return;
      }
      closeModal();
    });
  }

  function onChangeStatus(id: string, status: ArmadaStatus) {
    setMessage(null);
    startTransition(async () => {
      const res = await updateArmadaStatus(id, status);
      setMessage(res.message);
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Manajemen Armada</h1>
          <p className="mt-1 text-sm text-slate-500">Kelola daftar armada dan statusnya.</p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
        >
          + Tambah Armada
        </button>
      </div>

      {(initialError || message) && (
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-900">Info</p>
          <p className="mt-1 text-sm text-slate-600">{initialError ?? message}</p>
          {initialError?.includes("armada") && (
            <p className="mt-2 text-xs text-slate-500">
              Pastikan tabel <span className="font-mono">armada</span> ada di Supabase.
            </p>
          )}
        </div>
      )}

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-sm font-bold text-slate-900">Daftar Armada</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4">Nama</th>
                <th className="px-6 py-4">Plat</th>
                <th className="px-6 py-4">Kapasitas</th>
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
                items.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/60">
                    <td className="px-6 py-4 font-medium text-slate-900">{a.name ?? "-"}</td>
                    <td className="px-6 py-4 text-slate-700">{a.plate_number ?? "-"}</td>
                    <td className="px-6 py-4 text-slate-700">{typeof a.capacity === "number" ? a.capacity : "-"}</td>
                    <td className="px-6 py-4">
                      <select
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 outline-none focus:border-slate-400"
                        value={(a.status ?? "Active") as ArmadaStatus}
                        onChange={(e) => onChangeStatus(a.id, e.target.value as ArmadaStatus)}
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
                <h3 className="text-lg font-black text-slate-900">Tambah Armada</h3>
                <p className="mt-0.5 text-xs text-slate-500">Input kendaraan baru.</p>
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
                <label className="block text-xs font-bold text-slate-600 mb-1">Nama Armada</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                  placeholder="Contoh: Bus Pariwisata 01"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Plat Nomor (opsional)</label>
                  <input
                    value={plateNumber}
                    onChange={(e) => setPlateNumber(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                    placeholder="B 1234 ABC"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Kapasitas (opsional)</label>
                  <input
                    inputMode="numeric"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                    placeholder="40"
                  />
                </div>
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
