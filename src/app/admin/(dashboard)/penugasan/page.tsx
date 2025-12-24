import { redirect } from "next/navigation";

import { createSupabaseServerClient, requireAdminUser } from "@/lib/supabase/server";

import AssignList, { type AdminUserItem, type BookingItem } from "./AssignList";

export const runtime = "edge";

export default async function TourAssignmentPage() {
  const { ok, role } = await requireAdminUser();
  if (!ok || role !== "tata_usaha") redirect("/admin/login");

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return (
      <section className="mx-auto w-full max-w-5xl">
        <h1 className="text-2xl font-extrabold text-white">Tour Assignment</h1>
        <p className="mt-2 text-sm text-white/70">Supabase client not available.</p>
      </section>
    );
  }

  const { data: bookingsData } = await supabase
    .from("bookings")
    .select("id, client_name, destination, tour_date")
    .eq("status", "New")
    .order("tour_date", { ascending: true });

  const { data: adminUsers } = await supabase
    .from("admin_users")
    .select("user_id, role")
    .order("user_id", { ascending: true });

  const bookings: BookingItem[] = bookingsData ?? [];
  const users: AdminUserItem[] = adminUsers ?? [];

  return (
    <section className="mx-auto w-full max-w-6xl">
      <div className="mb-6">
        <p className="text-xs font-semibold tracking-[0.25em] text-white/60">PENUGASAN</p>
        <h1 className="mt-2 text-2xl font-extrabold text-white">Tour Assignment</h1>
        <p className="mt-2 text-sm text-white/70">Assign tour leaders to new bookings.</p>
      </div>

      <AssignList bookings={bookings} users={users} />
    </section>
  );
}