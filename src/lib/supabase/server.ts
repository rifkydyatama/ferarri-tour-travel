import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { diagnoseSupabaseJwtKey, projectRefFromSupabaseUrl } from "./diagnostics";

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
    .select("user_id")
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

  return { ok: true as const, user: data.user };
}
