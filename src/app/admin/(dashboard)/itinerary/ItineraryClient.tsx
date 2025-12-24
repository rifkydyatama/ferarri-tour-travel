"use client";

import { useMemo, useState, useTransition } from "react";
import { createItinerary, updateItineraryStatus, type ItineraryStatus } from "./actions";

export type ItineraryRow = {
  id: string;
  title: string | null;
  start_date: string | null;
  end_date: string | null;
  status: string | null;
  notes?: string | null;
  created_at?: string | null;
};

type Props = {
  initialItems: ItineraryRow[];
  initialError?: string | null;
};

const STATUS_OPTIONS: ItineraryStatus[] = ["Draft", "Published", "Archived"];

export default function ItineraryClient({ initialItems, initialError }: Props) {
  const [isPending, startTransition] = useTransition();
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");

  const items = useMemo(() => initialItems ?? [], [initialItems]);

  function closeModal() {
    setModalOpen(false);
    setMessage(null);
    setTitle("");
    setStartDate("");
    setEndDate("");
    setNotes("");
  }

  function submitCreate() {
    setMessage(null);
    startTransition(async () => {
      const res = await createItinerary({ title, startDate, endDate, notes });
      if (!res.ok) {
        setMessage(res.message);
        return;
      }
      closeModal();
    });
  }

  function onChangeStatus(id: string, status: ItineraryStatus) {
    setMessage(null);
    startTransition(async () => {
      const res = await updateItineraryStatus(id, status);
      setMessage(res.message);
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Jadwal & Itinerary</h1>
          <p className="mt-1 text-sm text-slate-500">Kelola itinerary tour (draft/publish).</p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
        >
          + Buat Itinerary
        </button>
      </div>

      {(initialError || message) && (
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-900">Info</p>
          <p className="mt-1 text-sm text-slate-600">{initialError ?? message}</p>
          {initialError?.includes("itineraries") && (
            <p className="mt-2 text-xs text-slate-500">
              Pastikan tabel <span className="font-mono">itineraries</span> ada di Supabase.
            </p>
          )}
        </div>
      )}

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-sm font-bold text-slate-900">Daftar Itinerary</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4">Judul</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-6 text-slate-500">
                    Belum ada data.
                  </td>
                </tr>
              ) : (
                items.map((it) => (
                  <tr key={it.id} className="hover:bg-slate-50/60">
                    <td className="px-6 py-4 font-medium text-slate-900">{it.title ?? "-"}</td>
                    <td className="px-6 py-4 text-slate-700">
                      {(it.start_date || "-") + " → " + (it.end_date || "-")}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 outline-none focus:border-slate-400"
                        value={(it.status ?? "Draft") as ItineraryStatus}
                        onChange={(e) => onChangeStatus(it.id, e.target.value as ItineraryStatus)}
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
                <h3 className="text-lg font-black text-slate-900">Buat Itinerary</h3>
                <p className="mt-0.5 text-xs text-slate-500">Buat draft itinerary baru.</p>
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
                <label className="block text-xs font-bold text-slate-600 mb-1">Judul</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                  placeholder="Contoh: Tour Jogja 3D2N"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Start Date (opsional)</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">End Date (opsional)</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Catatan (opsional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[120px] w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                  placeholder="Rute, hotel, titik kumpul, dll"
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
