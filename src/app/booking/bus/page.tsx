"use client";

import { useMemo, useState } from "react";
import BusSeatMap from "@/components/BusSeatMap";

export default function BusBookingPage() {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const [route, setRoute] = useState("Surabaya → Malang");
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));

  const [passengerName, setPassengerName] = useState("");
  const [passengerPhone, setPassengerPhone] = useState("");
  const [passengerEmail, setPassengerEmail] = useState("");

  const pricePerSeat = 175000;

  const totalPrice = useMemo(() => {
    return selectedSeats.length * pricePerSeat;
  }, [selectedSeats.length]);

  const formattedTotal = useMemo(() => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(totalPrice);
  }, [totalPrice]);

  return (
    <div className="min-h-svh bg-white text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-14">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.25em] text-slate-500">
            BOOKING BUS
          </p>
          <h1 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            <span className="bg-linear-to-r from-ferrari via-plum to-ocean bg-clip-text text-transparent">
              Pilih Kursi Keberangkatan
            </span>
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Pilih kursi favoritmu, isi data penumpang, lalu lanjut pembayaran.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-start">
          <BusSeatMap
            rows={10}
            bookedSeats={["1A", "1B", "2C", "3D", "6A", "7B", "8C"]}
            selectedSeats={selectedSeats}
            onSelectedSeatsChange={setSelectedSeats}
          />

          <div className="grid gap-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Booking Summary
              </h2>

              <div className="mt-5 grid gap-4">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">Route</span>
                  <select
                    value={route}
                    onChange={(e) => setRoute(e.target.value)}
                    className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-ocean"
                  >
                    <option>Surabaya → Malang</option>
                    <option>Malang → Surabaya</option>
                    <option>Surabaya → Banyuwangi</option>
                  </select>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">Date</span>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-ocean"
                  />
                </label>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-700">Seats</p>
                      <p className="mt-1 text-sm text-slate-600">
                        {selectedSeats.length > 0
                          ? selectedSeats.join(", ")
                          : "Belum ada kursi dipilih"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold tracking-[0.25em] text-slate-500">
                        TOTAL
                      </p>
                      <p className="mt-1 text-lg font-extrabold text-slate-900">
                        {formattedTotal}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Data Penumpang
              </h2>

              <div className="mt-5 grid gap-4">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">Nama</span>
                  <input
                    value={passengerName}
                    onChange={(e) => setPassengerName(e.target.value)}
                    placeholder="Nama sesuai KTP"
                    className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-ocean"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">No. HP</span>
                  <input
                    value={passengerPhone}
                    onChange={(e) => setPassengerPhone(e.target.value)}
                    placeholder="08xxxxxxxxxx"
                    inputMode="tel"
                    className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-ocean"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">Email</span>
                  <input
                    value={passengerEmail}
                    onChange={(e) => setPassengerEmail(e.target.value)}
                    placeholder="nama@email.com"
                    inputMode="email"
                    className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-ocean"
                  />
                </label>

                <button
                  type="button"
                  disabled={selectedSeats.length === 0}
                  className={
                    "mt-2 inline-flex h-12 items-center justify-center rounded-2xl px-6 text-sm font-extrabold text-white transition " +
                    (selectedSeats.length === 0
                      ? "cursor-not-allowed bg-slate-300"
                      : "bg-linear-to-r from-ferrari to-sun hover:opacity-95")
                  }
                >
                  Lanjut Pembayaran
                </button>

                <p className="text-xs leading-6 text-slate-500">
                  Dengan melanjutkan, kamu setuju dengan syarat & ketentuan. (Demo UI)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
