"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { createBooking, updateBookingStatus, type BookingStatus } from "./actions";

export type BookingRow = {
  id: string;
  client_name: string | null;
  destination: string | null;
  marketing_pic: string | null;
  status: string | null;
  created_at?: string | null;
};

type Props = {
  initialBookings: BookingRow[];
  initialError?: string | null;
};

const STATUS_OPTIONS: BookingStatus[] = ["New", "In Process", "Ready", "Done", "Canceled"];

export default function BookingsClient({ initialBookings, initialError }: Props) {
  const [isPending, startTransition] = useTransition();
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [clientName, setClientName] = useState("");
  const [destination, setDestination] = useState("");
  const [marketingPic, setMarketingPic] = useState("");

  const bookings = useMemo(() => initialBookings ?? [], [initialBookings]);

  function closeModal() {
    setModalOpen(false);
    setMessage(null);
    setClientName("");
    setDestination("");
    setMarketingPic("");
  }

  function submitCreate() {
    setMessage(null);
    startTransition(async () => {
      const res = await createBooking({ clientName, destination, marketingPic });
      if (!res.ok) {
        setMessage(res.message);
        return;
      }
      closeModal();
    });
  }

  function onChangeStatus(id: string, status: BookingStatus) {
    setMessage(null);
    startTransition(async () => {
      const res = await updateBookingStatus(id, status);
      setMessage(res.message);
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Booking</h1>
          <p className="mt-1 text-sm text-slate-500">Input dan pantau booking.</p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
        >
          + Input Booking
        </button>
      </div>

      {(initialError || message) && (
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-900">Info</p>
          <p className="mt-1 text-sm text-slate-600">{initialError ?? message}</p>
          {initialError?.includes("bookings") && (
            <p className="mt-2 text-xs text-slate-500">
              Pastikan tabel <span className="font-mono">bookings</span> ada di Supabase.
            </p>
          )}
        </div>
      )}

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-sm font-bold text-slate-900">Daftar Booking</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Destinasi</th>
                <th className="px-6 py-4">Marketing</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-6 text-slate-500">
                    Belum ada data.
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/60">
                    <td className="px-6 py-4 font-medium text-slate-900">{b.client_name ?? "-"}</td>
                    <td className="px-6 py-4 text-slate-700">{b.destination ?? "-"}</td>
                    <td className="px-6 py-4 text-slate-600">{b.marketing_pic ?? "-"}</td>
                    <td className="px-6 py-4">
                      <select
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 outline-none focus:border-slate-400"
                        value={(b.status ?? "New") as BookingStatus}
                        onChange={(e) => onChangeStatus(b.id, e.target.value as BookingStatus)}
                        disabled={isPending}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/bookings/${b.id}`}
                        className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                      >
                        Detail
                      </Link>
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
                <h3 className="text-lg font-black text-slate-900">Input Booking</h3>
                <p className="mt-0.5 text-xs text-slate-500">Masukkan data awal booking.</p>
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
                <label className="block text-xs font-bold text-slate-600 mb-1">Nama Client</label>
                <input
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                  placeholder="Contoh: SMAN 1 Blitar"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Destinasi</label>
                <input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                  placeholder="Contoh: Jogja"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Marketing PIC</label>
                <input
                  value={marketingPic}
                  onChange={(e) => setMarketingPic(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                  placeholder="Nama PIC (opsional)"
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
