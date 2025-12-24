"use client";

import { useState, useTransition } from "react";
import { createEmployee } from "./actions";

export default function KaryawanClient() {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-slate-900">Tambah Karyawan</h2>
            <p className="mt-1 text-sm text-slate-600">Opsional (butuh tabel employees di Supabase).</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setError(null);
              setOpen((v) => !v);
            }}
            className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
          >
            {open ? "Tutup" : "Tambah"}
          </button>
        </div>

        {open ? (
          <form
            className="mt-4 grid gap-3"
            action={(fd) => {
              setError(null);
              startTransition(async () => {
                const res = await createEmployee(fd);
                if (!res.ok) {
                  setError(res.error ?? "Gagal.");
                  return;
                }
                setOpen(false);
              });
            }}
          >
            <div className="grid gap-1">
              <label className="text-sm font-semibold text-slate-900">Nama</label>
              <input
                name="name"
                required
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
              />
            </div>
            <div className="grid gap-1">
              <label className="text-sm font-semibold text-slate-900">Role (opsional)</label>
              <input
                name="role"
                placeholder="Driver / Guide / Admin"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
              />
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <button
              type="submit"
              disabled={pending}
              className="inline-flex w-fit items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {pending ? "Menyimpan…" : "Simpan"}
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
}
