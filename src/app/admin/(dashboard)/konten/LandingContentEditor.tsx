"use client";

import { useMemo, useState, useTransition } from "react";
import { saveHomeContent } from "./actions";

export default function LandingContentEditor({ initialJson }: { initialJson: string }) {
  const [jsonText, setJsonText] = useState(initialJson);
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<string | null>(null);

  const isValidJson = useMemo(() => {
    try {
      const parsed = JSON.parse(jsonText);
      return typeof parsed === "object" && parsed !== null && !Array.isArray(parsed);
    } catch {
      return false;
    }
  }, [jsonText]);

  return (
    <div className="grid gap-4">
      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
              Konten Landing Page
            </h1>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Edit JSON untuk mengontrol semua section di halaman utama. Simpan akan langsung update
              data di Supabase (slug: <span className="font-semibold">home</span>).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={
                "rounded-full px-3 py-1 text-xs font-semibold " +
                (isValidJson ? "bg-leaf/15 text-slate-900" : "bg-ferrari/15 text-slate-900")
              }
            >
              {isValidJson ? "JSON OK" : "JSON Error"}
            </span>
            <button
              type="button"
              disabled={!isValidJson || isPending}
              onClick={() => {
                setStatus(null);
                startTransition(async () => {
                  const res = await saveHomeContent(jsonText);
                  setStatus(res.message);
                });
              }}
              className={
                "inline-flex items-center justify-center rounded-2xl px-5 py-2.5 text-sm font-semibold transition " +
                (!isValidJson || isPending
                  ? "cursor-not-allowed bg-slate-200 text-slate-500"
                  : "bg-ferrari text-white hover:opacity-95")
              }
            >
              {isPending ? "Menyimpan…" : "Simpan"}
            </button>
          </div>
        </div>

        <div className="mt-6">
          <label htmlFor="home-content-json" className="sr-only">
            JSON konten landing page
          </label>
          <textarea
            id="home-content-json"
            aria-label="JSON konten landing page"
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            spellCheck={false}
            className="h-130 w-full resize-y rounded-2xl border border-slate-200 bg-white p-4 font-mono text-xs leading-5 text-slate-900 outline-none focus:border-ocean"
          />
        </div>

        {status && <p className="mt-4 text-sm font-semibold text-slate-700">{status}</p>}
      </div>
    </div>
  );
}
