"use client";

import { useId, useMemo, useState, useTransition } from "react";
import { CheckCircle2, Loader2, UserRound } from "lucide-react";

import { assignTourLeader } from "./actions";

export type BookingItem = {
  id: string;
  client_name: string | null;
  destination: string | null;
  tour_date: string | null;
};

export type AdminUserItem = {
  user_id: string;
  role: string | null;
};

function formatDate(value: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

export default function AssignList({ bookings, users }: { bookings: BookingItem[]; users: AdminUserItem[] }) {
  const options = useMemo(() => {
    return users.map((u) => ({
      value: u.user_id,
      label: `${u.user_id.slice(0, 8)}${u.role ? ` • ${u.role}` : ""}`,
    }));
  }, [users]);

  if (!bookings.length) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
        Tidak ada booking berstatus New.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {bookings.map((booking) => (
        <Card key={booking.id} booking={booking} options={options} />
      ))}
    </div>
  );
}

function Card({
  booking,
  options,
}: {
  booking: BookingItem;
  options: { value: string; label: string }[];
}) {
  const selectId = useId();
  const [selected, setSelected] = useState<string>(options[0]?.value ?? "");
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">Booking</div>
          <div className="mt-1 text-lg font-extrabold text-white">{booking.client_name || "No Name"}</div>
          <div className="text-sm text-white/70">{booking.destination || "—"}</div>
        </div>
        <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/70">
          {formatDate(booking.tour_date)}
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        <label htmlFor={selectId} className="text-xs font-semibold text-white/70">
          Assign to
        </label>
        <div className="relative">
          <select
            id={selectId}
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="h-11 w-full appearance-none rounded-xl border border-white/10 bg-white/10 px-4 pr-10 text-sm font-semibold text-white outline-none transition focus:border-white/30 focus:bg-white/15"
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="text-slate-900">
                {opt.label}
              </option>
            ))}
          </select>
          <UserRound className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
        </div>
      </div>

      <button
        type="button"
        disabled={isPending || !selected}
        onClick={() => {
          setMessage(null);
          startTransition(async () => {
            const result = await assignTourLeader(booking.id, selected);
            if (result.ok) {
              setMessage("Assigned & dispatched");
            } else {
              setMessage(result.error ?? "Failed to assign");
            }
          });
        }}
        className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white/90 px-4 text-sm font-bold text-slate-900 shadow-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
        {isPending ? "Assigning..." : "Assign & Dispatch"}
      </button>

      {message && <p className="mt-2 text-center text-xs font-semibold text-white/80">{message}</p>}
    </div>
  );
}
