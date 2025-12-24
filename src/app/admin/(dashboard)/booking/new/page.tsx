"use client";

import { useState, useTransition } from "react";

import { createBooking } from "./actions";

export default function NewBookingPage() {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-100 sm:p-8">
        <div className="mb-6">
          <p className="text-xs font-semibold tracking-[0.25em] text-slate-500">NEW BOOKING</p>
          <h1 className="mt-2 text-2xl font-extrabold text-slate-900">Input Booking</h1>
          <p className="mt-2 text-sm text-slate-600">Fill the details to create a new booking.</p>
        </div>

        <form
          className="grid gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            setMessage(null);

            startTransition(async () => {
              const result = await createBooking(formData);
              if (result && result.ok === false) {
                setMessage(result.error);
              }
            });
          }}
        >
          <div className="grid gap-2">
            <label htmlFor="client_name" className="text-sm font-semibold text-slate-700">
              Client Name
            </label>
            <input
              id="client_name"
              name="client_name"
              type="text"
              required
              className="h-12 rounded-xl border border-slate-200 px-4 text-base text-slate-900 outline-none ring-0 transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              placeholder="e.g., SMAN 1 Jakarta"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="destination" className="text-sm font-semibold text-slate-700">
              Destination
            </label>
            <input
              id="destination"
              name="destination"
              type="text"
              required
              className="h-12 rounded-xl border border-slate-200 px-4 text-base text-slate-900 outline-none ring-0 transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              placeholder="e.g., Bali"
            />
          </div>

          <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
            <div className="grid gap-2">
              <label htmlFor="tour_date" className="text-sm font-semibold text-slate-700">
                Tour Date
              </label>
              <input
                id="tour_date"
                name="tour_date"
                type="date"
                required
                className="h-12 rounded-xl border border-slate-200 px-4 text-base text-slate-900 outline-none ring-0 transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="pax_count" className="text-sm font-semibold text-slate-700">
                Pax
              </label>
              <input
                id="pax_count"
                name="pax_count"
                type="number"
                min="1"
                required
                className="h-12 rounded-xl border border-slate-200 px-4 text-base text-slate-900 outline-none ring-0 transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                placeholder="e.g., 40"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-xl bg-linear-to-r from-red-600 to-orange-500 px-5 text-base font-bold text-white shadow-md transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? "Processing..." : "Create Booking"}
          </button>

          {message && (
            <p className="text-center text-sm font-semibold text-red-500">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
