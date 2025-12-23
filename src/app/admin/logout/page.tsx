"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function AdminLogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      try {
        const supabase = createSupabaseBrowserClient();
        await supabase.auth.signOut();
      } finally {
        router.replace("/login");
        router.refresh();
      }
    };
    void run();
  }, [router]);

  return (
    <div className="min-h-svh bg-gray-50 text-slate-900">
      <div className="mx-auto max-w-lg px-6 py-14">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
          <p className="text-sm font-semibold text-slate-700">Logout…</p>
        </div>
      </div>
    </div>
  );
}
