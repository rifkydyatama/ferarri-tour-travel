"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKeyhole, ShieldCheck, Zap } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function AdminLoginForm({ nextPath }: { nextPath: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const isDisabled = useMemo(() => {
    return !email.trim() || !password.trim() || isPending;
  }, [email, password, isPending]);

  return (
    <div className="relative min-h-svh overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute -left-36 -top-40 h-130 w-130 rounded-full bg-ferrari/25 blur-3xl" />
        <div className="absolute -right-48 top-24 h-130 w-130 rounded-full bg-ocean/25 blur-3xl" />
        <div className="absolute -bottom-55 left-1/2 h-140 w-140 -translate-x-1/2 rounded-full bg-plum/20 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-8 px-6 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80">
            <ShieldCheck className="h-4 w-4 text-leaf" />
            Secure Admin Access
          </div>

          <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
            <span className="bg-linear-to-r from-ferrari via-sun to-ocean bg-clip-text text-transparent">
              Ferrari Jaya
            </span>{" "}
            Admin
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
            Login dulu untuk masuk dashboard. Halaman ini dipisah dari area admin supaya akses
            terlihat rapi dan terasa lebih profesional.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-sm font-bold">
                <Zap className="h-4 w-4 text-sun" />
                Cepat
              </div>
              <p className="mt-2 text-xs leading-5 text-white/65">
                Masuk, kelola konten, dan publish lebih gesit.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-sm font-bold">
                <LockKeyhole className="h-4 w-4 text-ocean" />
                Private
              </div>
              <p className="mt-2 text-xs leading-5 text-white/65">
                Area admin diproteksi session Supabase.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-sm font-bold">
                <ShieldCheck className="h-4 w-4 text-leaf" />
                Terkontrol
              </div>
              <p className="mt-2 text-xs leading-5 text-white/65">
                Redirect otomatis balik ke halaman tujuan.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm backdrop-blur sm:p-8">
          <div className="rounded-3xl bg-white p-6 text-slate-900 shadow-sm ring-1 ring-black/10 sm:p-8">
            <div>
              <p className="text-xs font-bold tracking-[0.25em] text-slate-500">LOGIN</p>
              <h2 className="mt-3 text-xl font-extrabold tracking-tight sm:text-2xl">
                Masuk ke Dashboard
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Gunakan akun admin yang dibuat di Supabase Auth.
              </p>
            </div>

            <form
              className="mt-7 grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                setMessage(null);
                startTransition(async () => {
                  try {
                    const supabase = createSupabaseBrowserClient();
                    const { error } = await supabase.auth.signInWithPassword({
                      email: email.trim(),
                      password,
                    });
                    if (error) {
                      setMessage(error.message);
                      return;
                    }
                    router.replace(nextPath || "/admin");
                    router.refresh();
                  } catch (err) {
                    setMessage(err instanceof Error ? err.message : "Login gagal.");
                  }
                });
              }}
            >
              <div className="grid gap-2">
                <label htmlFor="admin-email" className="text-sm font-semibold text-slate-700">
                  Email
                </label>
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-ocean"
                  placeholder="admin@domain.com"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="admin-password" className="text-sm font-semibold text-slate-700">
                  Password
                </label>
                <input
                  id="admin-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-ocean"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={isDisabled}
                className={
                  "mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold transition " +
                  (isDisabled
                    ? "cursor-not-allowed bg-slate-200 text-slate-500"
                    : "bg-ferrari text-white hover:opacity-95")
                }
              >
                {isPending ? "Masuk…" : "Masuk"}
                <ArrowRight className="h-4 w-4" />
              </button>

              {message && <p className="text-sm font-semibold text-slate-700">{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
