"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { motion } from "framer-motion";
import { KeyRound, Mail, ArrowRight, Loader2, AlertCircle } from "lucide-react";

type LoginFormProps = {
  nextPath?: string;
  initialMessage?: string;
};

export default function LoginForm({ nextPath = "/admin", initialMessage }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialMessage || "");

 const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
    } else {
      // PERBAIKAN: Gunakan window.location agar halaman refresh total
      // Ini memastikan cookie terbaca sempurna oleh server
      router.refresh(); 
      
      // Tunggu sebentar biar cookie tersimpan
      setTimeout(() => {
        window.location.href = nextPath; 
      }, 500);
    }
  };
  
  return (
    <div className="relative min-h-svh flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 h-125 w-125 rounded-full bg-ferrari/30 blur-[100px] mix-blend-screen animate-blob" />
        <div className="absolute bottom-0 right-1/4 h-125 w-125 rounded-full bg-acid/20 blur-[100px] mix-blend-screen animate-blob [animation-delay:2s]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md p-6"
      >
        <div className="overflow-hidden rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black tracking-tighter text-white mb-2">
                WELCOME <span className="text-acid">BACK!</span>
              </h1>
              <p className="text-white/60 text-sm">Masuk ke panel kendali Ferrari Tour.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/70 ml-1">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-3.5 h-5 w-5 text-white/50 group-focus-within:text-acid transition-colors" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@ferrari.com"
                    className="w-full rounded-xl bg-white/5 border border-white/10 py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:border-acid focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-acid transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/70 ml-1">Password</label>
                <div className="relative group">
                  <KeyRound className="absolute left-4 top-3.5 h-5 w-5 text-white/50 group-focus-within:text-acid transition-colors" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl bg-white/5 border border-white/10 py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:border-acid focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-acid transition-all"
                  />
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-xl bg-red-500/20 border border-red-500/50 p-3 text-sm text-red-200"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3.5 text-sm font-bold text-slate-900 transition-all hover:bg-acid hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 mt-6"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <span>{"Let's Go"}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </div>
          
          {/* Bottom Decor */}
          <div className="h-2 w-full bg-linear-to-r from-ferrari via-acid to-purple" />
        </div>
      </motion.div>
    </div>
  );
}