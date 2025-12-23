"use client";

import { Armchair } from "lucide-react";

type SeatStatus = "available" | "selected" | "booked";

type BusSeatMapProps = {
  rows?: number;
  bookedSeats?: string[];
  selectedSeats?: string[];
  onSelectedSeatsChange?: (seats: string[]) => void;
};

function buildSeatLabel(rowIndex: number, colIndex: number) {
  const row = rowIndex + 1;
  const letters = ["A", "B", "C", "D"];
  return `${row}${letters[colIndex]}`;
}

function SeatButton({
  label,
  status,
  onClick,
}: {
  label: string;
  status: SeatStatus;
  onClick: () => void;
}) {
  const isDisabled = status === "booked";

  const base =
    "group relative flex w-full items-center justify-center gap-2 rounded-2xl border px-2 py-2 text-xs font-semibold transition sm:px-3 sm:py-3 sm:text-sm";

  const styles: Record<SeatStatus, string> = {
    available: "bg-white border-slate-200 hover:border-ocean hover:shadow-sm",
    selected: "bg-ferrari border-ferrari text-white shadow-sm",
    booked: "bg-slate-200 border-slate-200 text-slate-500 cursor-not-allowed",
  };

  const iconStyles: Record<SeatStatus, string> = {
    available: "text-slate-400 group-hover:text-ocean",
    selected: "text-white",
    booked: "text-slate-400",
  };

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      className={base + " " + styles[status]}
    >
      <Armchair className={"h-4 w-4 " + iconStyles[status]} />
      <span className={status === "selected" ? "text-white" : "text-inherit"}>
        {label}
      </span>
    </button>
  );
}

export default function BusSeatMap({
  rows = 10,
  bookedSeats = ["1A", "1B", "3C", "4D", "6A", "7B", "8C"],
  selectedSeats = [],
  onSelectedSeatsChange,
}: BusSeatMapProps) {
  const booked = new Set(bookedSeats);
  const selected = new Set(selectedSeats);

  const toggleSeat = (seatLabel: string) => {
    if (booked.has(seatLabel)) return;

    const next = new Set(selected);
    if (next.has(seatLabel)) next.delete(seatLabel);
    else next.add(seatLabel);

    const nextList = Array.from(next).sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true })
    );
    onSelectedSeatsChange?.(nextList);
  };

  const getStatus = (seatLabel: string): SeatStatus => {
    if (booked.has(seatLabel)) return "booked";
    if (selected.has(seatLabel)) return "selected";
    return "available";
  };

  return (
    <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.25em] text-slate-500">
            SEAT MAP
          </p>
          <h2 className="mt-2 text-xl font-extrabold tracking-tight text-slate-900">
            Denah Kursi Bus (2-2)
          </h2>
        </div>
        <div className="rounded-2xl bg-ocean/10 px-4 py-2 text-xs font-semibold text-ocean">
          Pintu Depan
        </div>
      </div>

      <div className="mt-6 grid gap-2 sm:gap-3">
        {Array.from({ length: rows }).map((_, rowIndex) => {
          const seatA = buildSeatLabel(rowIndex, 0);
          const seatB = buildSeatLabel(rowIndex, 1);
          const seatC = buildSeatLabel(rowIndex, 2);
          const seatD = buildSeatLabel(rowIndex, 3);

          return (
            <div key={rowIndex} className="grid grid-cols-5 gap-2 sm:gap-3">
              <SeatButton
                label={seatA}
                status={getStatus(seatA)}
                onClick={() => toggleSeat(seatA)}
              />
              <SeatButton
                label={seatB}
                status={getStatus(seatB)}
                onClick={() => toggleSeat(seatB)}
              />

              <div className="flex items-center justify-center">
                <div className="h-9 w-2 rounded-full bg-slate-100 sm:h-10" />
              </div>

              <SeatButton
                label={seatC}
                status={getStatus(seatC)}
                onClick={() => toggleSeat(seatC)}
              />
              <SeatButton
                label={seatD}
                status={getStatus(seatD)}
                onClick={() => toggleSeat(seatD)}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-3xl bg-slate-50 p-5">
        <h3 className="text-sm font-extrabold tracking-tight text-slate-900">Legend</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded-lg border border-slate-200 bg-white" />
            <span className="text-sm text-slate-700">Available</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded-lg bg-ferrari" />
            <span className="text-sm text-slate-700">Selected</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded-lg bg-slate-200" />
            <span className="text-sm text-slate-700">Booked</span>
          </div>
        </div>
      </div>
    </div>
  );
}
