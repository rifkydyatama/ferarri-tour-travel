"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const isDisabled = useMemo(() => {
    return !email.trim() || !password.trim() || isPending;
  }, [email, password, isPending]);

  return (
    <div className="min-h-svh bg-slate-950 text-white">
      <div className="mx-auto grid min-h-svh w-full max-w-7xl grid-cols-1 lg:grid-cols-2">
        {/* Left: Premium welcome panel (desktop only) */}
        <div className="relative hidden overflow-hidden border-r border-white/10 lg:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-slate-950" />
          <div className="pointer-events-none absolute inset-0 opacity-70">
            <div className="absolute -left-20 -top-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -right-24 top-24 h-[28rem] w-[28rem] rounded-full bg-red-600/15 blur-3xl" />
            <div className="absolute -bottom-40 left-1/3 h-[34rem] w-[34rem] rounded-full bg-orange-500/10 blur-3xl" />
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.14) 1px, transparent 0)",
                backgroundSize: "18px 18px",
              }}
            />
          </div>

          <div className="relative flex w-full flex-col justify-between p-12">
            <div>
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wide text-white/80 backdrop-blur">
                Premium Travel Admin
              </div>
              <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight">
                Welcome back to Ferrari Tour &amp; Travel Control Center
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-7 text-white/70">
                Secure access for operations, finance, and leadership. Manage bookings, track tours,
                and keep everything on schedule.
              </p>
            </div>

            <div className="max-w-xl">
              <p className="text-sm font-semibold text-white/80">“Everything feels effortless.”</p>
              <p className="mt-2 text-sm leading-7 text-white/60">
                A control center built to match premium travel operations—fast, reliable, and
                professional.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Login form */}
        <div className="relative flex items-center justify-center px-6 py-12">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-black" />
          </div>

          <div className="relative w-full max-w-md">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7 shadow-sm backdrop-blur sm:p-9">
              <div className="text-center">
                <div className="text-xs font-semibold tracking-[0.25em] text-white/60">ADMIN SIGN IN</div>
                <h2 className="mt-4 text-2xl font-extrabold tracking-tight">Control Center</h2>
                <p className="mt-2 text-sm leading-7 text-white/70">Sign in to continue.</p>
              </div>

              <form
                className="mt-8 grid gap-5"
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

                      router.replace("/admin");
                      router.refresh();
                    } catch (err) {
                      setMessage(err instanceof Error ? err.message : "Sign in failed.");
                    }
                  });
                }}
              >
                <div className="grid gap-2">
                  <label htmlFor="admin-login-email" className="text-sm font-semibold text-white/80">
                    Email
                  </label>
                  <input
                    id="admin-login-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@domain.com"
                    className="h-14 w-full rounded-xl border border-white/10 bg-white/5 px-5 text-base text-white outline-none placeholder:text-white/35 transition focus:border-white/25 focus:bg-white/10"
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="admin-login-password" className="text-sm font-semibold text-white/80">
                    Password
                  </label>
                  <input
                    id="admin-login-password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-14 w-full rounded-xl border border-white/10 bg-white/5 px-5 text-base text-white outline-none placeholder:text-white/35 transition focus:border-white/25 focus:bg-white/10"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isDisabled}
                  className={
                    "mt-1 inline-flex h-14 w-full items-center justify-center rounded-xl px-6 text-base font-bold transition " +
                    (isDisabled
                      ? "cursor-not-allowed bg-white/10 text-white/45"
                      : "bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-sm hover:opacity-95")
                  }
                >
                  {isPending ? "Signing in…" : "Sign In"}
                </button>

                {message && <p className="text-center text-sm font-semibold text-red-300">{message}</p>}
              </form>
            </div>

            <p className="mt-6 text-center text-xs text-white/40">© {new Date().getFullYear()} Ferrari Tour &amp; Travel</p>
          </div>
        </div>
      </div>
    </div>
  );
}

