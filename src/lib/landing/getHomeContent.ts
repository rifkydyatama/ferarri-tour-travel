import "server-only";

import type { HomeContent } from "./types";
import { defaultHomeContent } from "./defaultHomeContent";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeDeep<T>(base: T, override: unknown): T {
  if (!isPlainObject(base) || !isPlainObject(override)) return base;

  const out: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const baseValue = (base as Record<string, unknown>)[key];
    if (Array.isArray(baseValue)) {
      out[key] = Array.isArray(value) ? value : baseValue;
    } else if (isPlainObject(baseValue)) {
      out[key] = mergeDeep(baseValue, value);
    } else {
      out[key] = value ?? baseValue;
    }
  }
  return out as T;
}

export async function getHomeContent(): Promise<HomeContent> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) return defaultHomeContent;

  const { data, error } = await supabase
    .from("site_pages")
    .select("content")
    .eq("slug", "home")
    .maybeSingle();

  if (error || !data?.content || typeof data.content !== "object") {
    return defaultHomeContent;
  }

  return mergeDeep(defaultHomeContent, data.content);
}
