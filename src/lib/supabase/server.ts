import "server-only";

import { createServerClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { diagnoseSupabaseJwtKey, projectRefFromSupabaseUrl } from "./diagnostics";

export type AdminRole =
  | "superadmin"
  | "admin"
  | "marketing"
  | "tata_usaha"
  | "pimpinan"
  | "content"
  | "finance"
  | "ops"
  | "viewer";

function normalizeAdminRole(value: unknown): AdminRole | undefined {
  if (typeof value !== "string") return undefined;
  const v = value.trim().toLowerCase();
  if (!v) return undefined;
  if (
    v === "superadmin" ||
    v === "admin" ||
    v === "marketing" ||
    v === "tata_usaha" ||
    v === "pimpinan" ||
    v === "content" ||
    v === "finance" ||
    v === "ops" ||
    v === "viewer"
  ) {
    return v;
  }
  return "admin";
}

export async function createSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
        for (const { name, value, options } of cookiesToSet) {
          cookieStore.set(name, value, options);
        }
      },
    },
  });
}

export async function requireAdminUser(): Promise<{ ok: boolean; user: User; role: string }> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { ok: false, user: null as unknown as User, role: "" };
  }
  const { data, error } = await supabase.auth.getSession();

  if (error?.message?.includes("Invalid API key")) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const urlRef = projectRefFromSupabaseUrl(url);
    const keyDiag = diagnoseSupabaseJwtKey(anonKey);

    return { ok: false, user: null as unknown as User, role: "" };
  }

  const sessionUser = data.session?.user;
  if (error || !sessionUser) {
    return { ok: false, user: null as unknown as User, role: "" };
  }

  const { data: adminRow, error: adminError } = await supabase
    .from("admin_users")
    .select("role")
    .eq("user_id", sessionUser.id)
    .maybeSingle();

  if (adminError) {
    return { ok: false, user: sessionUser, role: "" };
  }

  if (!adminRow) {
    return { ok: false, user: sessionUser, role: "" };
  }

  const role = normalizeAdminRole((adminRow as Record<string, unknown> | null)?.role) ?? "";

  return { ok: true, user: sessionUser, role };
}
