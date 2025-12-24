import "server-only";

import { createServerClient } from "@supabase/ssr";
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

export async function requireAdminUser() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { ok: false as const, message: "Supabase env belum di-set." };
  }
  const { data, error } = await supabase.auth.getUser();

  if (error?.message?.includes("Invalid API key")) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const urlRef = projectRefFromSupabaseUrl(url);
    const keyDiag = diagnoseSupabaseJwtKey(anonKey);

    const mismatchHint =
      urlRef && keyDiag.projectRefFromIssuer && urlRef !== keyDiag.projectRefFromIssuer
        ? ` (URL ref: ${urlRef}, Key ref: ${keyDiag.projectRefFromIssuer})`
        : "";

    return {
      ok: false as const,
      message:
        "Konfigurasi Supabase tidak valid: Invalid API key. Pastikan NEXT_PUBLIC_SUPABASE_URL & NEXT_PUBLIC_SUPABASE_ANON_KEY berasal dari project Supabase yang sama dan tidak pakai tanda kutip/spasi." +
        mismatchHint,
    };
  }

  if (error || !data.user) {
    return { ok: false as const, message: "Unauthorized. Silakan login." };
  }

  const { data: adminRow, error: adminError } = await supabase
    .from("admin_users")
    .select("user_id, role")
    .eq("user_id", data.user.id)
    .maybeSingle();

  if (adminError) {
    return {
      ok: false as const,
      message:
        "Akses admin belum siap. Pastikan tabel 'admin_users' sudah dibuat di database Supabase.",
    };
  }

  if (!adminRow) {
    return {
      ok: false as const,
      message: "Akun ini belum terdaftar sebagai admin.",
    };
  }

  // Prefer role from admin_users row (if schema supports it). Fallback to user metadata.
  // Note: we select '*' above so older DB schemas (without 'role') won't error.
  const roleFromRow = normalizeAdminRole((adminRow as Record<string, unknown> | null)?.role);
  const roleFromAppMeta = normalizeAdminRole((data.user.app_metadata as Record<string, unknown> | null)?.role);
  const roleFromUserMeta = normalizeAdminRole((data.user.user_metadata as Record<string, unknown> | null)?.role);
  const role = roleFromRow ?? roleFromAppMeta ?? roleFromUserMeta ?? "admin";

  return { ok: true as const, user: data.user, role };
}
