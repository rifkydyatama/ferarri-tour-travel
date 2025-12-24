"use client";

import { useMemo, useState, useTransition } from "react";
import { createLiveReport } from "./actions";

export type LiveReportRow = {
  id: string;
  reporter_name: string | null;
  location: string | null;
  status_update: string | null;
  timestamp: string | null;
};

type Props = {
  initialReports: LiveReportRow[];
  initialError?: string | null;
};

export default function LiveReportClient({ initialReports, initialError }: Props) {
  const [isPending, startTransition] = useTransition();
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [reporterName, setReporterName] = useState("");
  const [location, setLocation] = useState("");
  const [statusUpdate, setStatusUpdate] = useState("");

  const reports = useMemo(() => initialReports ?? [], [initialReports]);

  function closeModal() {
    setModalOpen(false);
    setMessage(null);
    setReporterName("");
    setLocation("");
    setStatusUpdate("");
  }

  function submitCreate() {
    setMessage(null);
    startTransition(async () => {
      const res = await createLiveReport({ reporterName, location, statusUpdate });
      if (!res.ok) {
        setMessage(res.message);
        return;
      }
      closeModal();
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Live Tour Report</h1>
          <p className="mt-1 text-sm text-slate-500">Update kondisi perjalanan secara real-time.</p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
        >
          + Buat Live Report
        </button>
      </div>

      {(initialError || message) && (
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-900">Info</p>
          <p className="mt-1 text-sm text-slate-600">{initialError ?? message}</p>
          {initialError?.includes("tour_live_reports") && (
            <p className="mt-2 text-xs text-slate-500">
              Pastikan tabel <span className="font-mono">tour_live_reports</span> ada di Supabase.
            </p>
          )}
        </div>
      )}

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-sm font-bold text-slate-900">Feed</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {reports.length === 0 ? (
            <div className="px-6 py-8 text-sm text-slate-500">Belum ada laporan.</div>
          ) : (
            reports.map((r) => (
              <div key={r.id} className="px-6 py-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-bold text-slate-900">{r.reporter_name ?? "-"}</p>
                  <p className="text-xs text-slate-500">
                    {r.timestamp ? new Date(r.timestamp).toLocaleString("id-ID") : "-"}
                  </p>
                </div>
                <p className="mt-1 text-sm text-slate-600">
                  <span className="font-bold text-slate-900">[{r.location ?? "-"}]</span> {r.status_update ?? "-"}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white shadow-xl border border-slate-200">
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">Buat Live Report</h3>
                <p className="mt-0.5 text-xs text-slate-500">Update terbaru selama tour.</p>
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
                <label className="block text-xs font-bold text-slate-600 mb-1">Nama Reporter</label>
                <input
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                  placeholder="Nama"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Lokasi</label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                  placeholder="Contoh: Tol Cipali"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Update</label>
                <textarea
                  value={statusUpdate}
                  onChange={(e) => setStatusUpdate(e.target.value)}
                  className="min-h-[120px] w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                  placeholder="Update kondisi tour..."
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
