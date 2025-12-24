"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

export default function TourLeaderPanel({
  bookingId,
  clientName,
  destination,
}: {
  bookingId: string;
  clientName: string;
  destination?: string | null;
}) {
  const [isScanning, setIsScanning] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function shareLocation() {
    setError(null);
    setMessage(null);

    if (!("geolocation" in navigator)) {
      setError("GPS tidak tersedia di perangkat ini.");
      return;
    }

    setIsScanning(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setIsScanning(false);
        setIsSending(true);
        try {
          const latitude = pos.coords.latitude;
          const longitude = pos.coords.longitude;

          const { submitLiveReport } = await import("@/app/admin/(dashboard)/actions");

          if (typeof submitLiveReport !== "function") {
            throw new Error("submitLiveReport belum tersedia");
          }

          const result = await submitLiveReport(bookingId, latitude, longitude);
          if (!result.ok) {
            throw new Error(result.error || "Gagal mengirim lokasi");
          }

          setMessage("Location Sent! ✅");
        } catch (err) {
          setError(err instanceof Error ? err.message : "Gagal mengirim lokasi");
        } finally {
          setIsSending(false);
        }
      },
      (geoErr) => {
        setIsScanning(false);
        setError(geoErr.message || "Tidak dapat mengambil lokasi");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 },
    );
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-lg backdrop-blur">
      <div className="space-y-1">
        <p className="text-xs font-semibold tracking-[0.25em] text-white/60">TOUR LEADER</p>
        <h1 className="text-2xl font-extrabold leading-tight text-white">{clientName}</h1>
        <p className="text-sm text-white/70">{destination || "Destination not set"}</p>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="text-sm font-semibold text-white/80">Live Tracking</div>
        <p className="mt-1 text-xs text-white/60">Bagikan lokasi langsung saat on-tour.</p>
      </div>

      <button
        type="button"
        onClick={shareLocation}
        disabled={isScanning || isSending}
        className="mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-red-600 to-orange-500 px-4 text-base font-extrabold text-white shadow-md transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <MapPin className="h-5 w-5" />
        {isScanning ? "Scanning GPS..." : isSending ? "Sending..." : "📍 SHARE LIVE LOCATION"}
      </button>

      {message && <p className="mt-3 text-center text-sm font-semibold text-green-300">{message}</p>}
      {error && <p className="mt-3 text-center text-sm font-semibold text-red-300">{error}</p>}
    </div>
  );
}
