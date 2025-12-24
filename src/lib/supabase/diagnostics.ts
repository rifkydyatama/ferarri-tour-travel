import "server-only";

function base64UrlDecode(input: string) {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  return Buffer.from(padded, "base64").toString("utf8");
}

export type SupabaseKeyDiagnostics = {
  keyPresent: boolean;
  keyLooksLikeJwt: boolean;
  issuer?: string;
  projectRefFromIssuer?: string;
  error?: string;
};

export function diagnoseSupabaseJwtKey(key: string | undefined | null): SupabaseKeyDiagnostics {
  if (!key) {
    return { keyPresent: false, keyLooksLikeJwt: false };
  }

  const parts = key.split(".");
  if (parts.length < 2) {
    return { keyPresent: true, keyLooksLikeJwt: false, error: "Key is not a JWT." };
  }

  try {
    const payloadJson = base64UrlDecode(parts[1]);
    const payload = JSON.parse(payloadJson) as { iss?: string };

    const issuer = payload.iss;
    let projectRefFromIssuer: string | undefined;
    if (issuer) {
      const match = issuer.match(/^https:\/\/([a-z0-9-]+)\.supabase\.co\//i);
      projectRefFromIssuer = match?.[1];
    }

    return {
      keyPresent: true,
      keyLooksLikeJwt: true,
      issuer,
      projectRefFromIssuer,
    };
  } catch (error) {
    return {
      keyPresent: true,
      keyLooksLikeJwt: true,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export function projectRefFromSupabaseUrl(url: string | undefined | null): string | undefined {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    const match = parsed.hostname.match(/^([a-z0-9-]+)\.supabase\.co$/i);
    return match?.[1];
  } catch {
    return undefined;
  }
}
