"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser"; // Import yang benar

export default function LoginForm({
  nextPath,
  initialMessage,
}: {
  nextPath: string;
  initialMessage?: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(initialMessage ?? null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const safeNextPath = useMemo(() => {
    return typeof nextPath === "string" && nextPath.startsWith("/") ? nextPath : "/admin";
  }, [nextPath]);

  const isDisabled = useMemo(() => {
    return !email.trim() || !password.trim() || isPending;
  }, [email, password, isPending]);

  return (
    <div className="relative min-h-svh overflow-hidden bg-slate-950 text-white">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-ferrari/35 blur-3xl" />
        <div className="absolute -right-28 top-24 h-96 w-96 rounded-full bg-ocean/30 blur-3xl" />
        <div className="absolute -bottom-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-sun/25 blur-3xl" />
        <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-950/70 to-slate-950" />
      </div>

      <div className="relative mx-auto grid min-h-svh max-w-6xl items-center px-6 py-14 lg:grid-cols-2 lg:gap-10">
        {/* Left Side (Desktop Only) */}
        <div className="hidden lg:block">
          <p className="text-xs font-semibold tracking-[0.25em] text-white/70">FERRARI JAYA GROUP</p>
          <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight">
            Admin Access
            <span className="block bg-linear-to-r from-ferrari to-sun bg-clip-text text-transparent">
              Fast. Focused. Secure.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/75">
            Login untuk mengelola konten landing page dan dashboard internal.
          </p>
        </div>

        {/* Right Side (Login Form) */}
        <div className="mx-auto w-full max-w-md">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 shadow-sm backdrop-blur">
            <div className="text-center">
              <div className="text-lg font-extrabold tracking-tight">
                <span className="bg-linear-to-r from-ferrari to-sun bg-clip-text text-transparent">
                  Ferrari Jaya
                </span>
                <span className="ml-2 text-white/85">Login</span>
              </div>
              <p className="mt-3 text-sm leading-7 text-white/70">Masuk untuk lanjut.</p>
            </div>

            <form
              className="mt-7 grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                setMessage(null);
                setIsSuccess(false);

                startTransition(async () => {
                  try {
                    // PERBAIKAN 1: Gunakan nama fungsi yang benar
                    const supabase = createSupabaseBrowserClient();
                    
                    const { error } = await supabase.auth.signInWithPassword({
                      email: email.trim(),
                      password,
                    });

                    if (error) {
                      setMessage(error.message);
                      return;
                    }

                    setIsSuccess(true);
                    setMessage("Login berhasil. Mengalihkan...");

                    // PERBAIKAN 2: Hard Reload untuk memastikan Admin Layout membaca session baru
                    router.refresh();
                    setTimeout(() => {
                      window.location.href = safeNextPath;
                    }, 500);

                  } catch (err) {
                    if (err instanceof Error) {
                      if (
                        err.message.includes("Missing NEXT_PUBLIC_SUPABASE_URL") ||
                        err.message.includes("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY")
                      ) {
                        setMessage(
                          "Konfigurasi Supabase belum diset di Environment Variables (NEXT_PUBLIC_SUPABASE_URL & NEXT_PUBLIC_SUPABASE_ANON_KEY). Set di Cloudflare Pages lalu redeploy.",
                        );
                        return;
                      }

                      setMessage(err.message);
                      return;
                    }

                    setMessage("Login gagal.");
                  }
                });
              }}
            >
              <div className="grid gap-2">
                <label htmlFor="login-email" className="text-sm font-semibold text-white/85">
                  Email
                </label>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-ocean transition-colors"
                  placeholder="admin@ferrari.com"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="login-password" className="text-sm font-semibold text-white/85">
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-ocean transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={isDisabled}
                className={
                  "mt-2 inline-flex h-11 items-center justify-center rounded-2xl px-5 text-sm font-semibold transition " +
                  (isDisabled
                    ? "cursor-not-allowed bg-white/10 text-white/50"
                    : "bg-ferrari text-white hover:opacity-95")
                }
              >
                {isPending ? "Memproses…" : "Masuk"}
              </button>

              {message && (
                <p className={`text-sm font-semibold text-center ${isSuccess ? "text-green-400" : "text-red-400"}`}>
                  {message}
                </p>
              )}
            </form>
          </div>
          <p className="mt-6 text-center text-xs text-white/50">© {new Date().getFullYear()} Ferrari Jaya Group</p>
        </div>
      </div>
    </div>
  );
}