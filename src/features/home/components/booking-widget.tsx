"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { figmaIcons } from "@/assets/figma-icons";
import { Button } from "@/components/ui/button";
import { FigmaIcon } from "@/components/ui/figma-icon";
import { LUGGAGE_TYPES, PASSENGER_OPTIONS, VEHICLE_TYPES } from "@/constants";
import { formatPassengers } from "@/features/booking/lib/booking-formatters";
import { mergeBookingState } from "@/features/booking/lib/booking-storage";
import {
  AIRPORT_TERMINAL,
  type BookingDirection,
} from "@/features/booking/types/booking-state";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

const labelClass =
  "text-xs font-semibold uppercase tracking-[0.72px] text-white/50";

const inputClass =
  "mt-0.5 w-full rounded-[10px] border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-medium text-white placeholder:text-white/30 outline-none focus:border-primary/50";

const selectClass =
  "booking-widget-select mt-0.5 w-full cursor-pointer appearance-none rounded-[10px] border border-white/10 bg-white/[0.06] px-3 py-2 pr-10 text-sm font-medium text-white outline-none focus:border-primary/50";

export function BookingWidget() {
  const router = useRouter();
  const { t } = useLanguage();
  const [direction, setDirection] = useState<BookingDirection>("to");
  const [vehicle, setVehicle] = useState("standard");
  const [pickupAddress, setPickupAddress] = useState(
    "Tel Aviv - Dizengoff St 55, Tel Aviv-Yafo",
  );
  const [dropoffAddress, setDropoffAddress] = useState("");
  const [flightNumber, setFlightNumber] = useState("LY315");
  const [pickupDate, setPickupDate] = useState("2026-10-15");
  const [pickupTime, setPickupTime] = useState("14:30");
  const [passengers, setPassengers] = useState(2);
  const [luggage, setLuggage] = useState<Record<string, number>>({
    carryon: 1,
    large: 1,
  });

  const updateLuggage = (id: string, delta: number) => {
    setLuggage((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] ?? 0) + delta),
    }));
  };

  const isFrom = direction === "from";

  const handleCalculatePrice = () => {
    mergeBookingState({
      direction,
      pickupAddress: isFrom ? AIRPORT_TERMINAL : pickupAddress,
      dropoffAddress: isFrom ? dropoffAddress : AIRPORT_TERMINAL,
      flightNumber,
      pickupDate,
      pickupTime,
      passengers,
      luggage: {
        carryon: luggage.carryon ?? 0,
        large: luggage.large ?? 0,
      },
      vehicle,
      fareCalculated: true,
      fareAmount: 280,
    });
    router.push("/book/fare");
  };

  return (
    <div
      id="booking"
      className="w-full max-w-[544px] rounded-[20px] border border-primary/[0.01] bg-[rgba(18,45,72,0.6)] p-3.5 shadow-[0_0_40px_rgba(22,136,255,0.11)] backdrop-blur-[16px] sm:p-4"
    >
      {/* Direction tabs */}
      <div className="flex h-10 rounded-[10px] bg-white/[0.05] p-0.5">
        {(
          [
            {
              id: "to" as const,
              label: "To Ben Gurion Airport",
              short: "To Airport",
              icon: figmaIcons.airplaneTo,
            },
            {
              id: "from" as const,
              label: "From Ben Gurion Airport",
              short: "From Airport",
              icon: figmaIcons.airplaneFrom,
            },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setDirection(tab.id)}
            className={cn(
              "flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-[9px] px-2.5 py-1 text-xs font-bold tracking-[-0.13px] transition sm:text-sm",
              direction === tab.id
                ? "bg-primary text-white"
                : "text-white/50 hover:text-white/70",
            )}
          >
            <FigmaIcon src={tab.icon} size={28} className="h-7 w-7" />
            <span className="hidden sm:inline">{t(tab.label)}</span>
            <span className="sm:hidden">{t(tab.short)}</span>
          </button>
        ))}
      </div>

      {/* Fixed terminal */}
      <div className="mt-2 flex items-center gap-2 rounded-[10px] border border-primary/20 bg-primary/[0.08] px-3 py-1">
        <FigmaIcon src={figmaIcons.mapPinDest} size={16} className="h-4 w-4 shrink-0" />
        <p className="truncate text-xs text-white/70">
          {isFrom
            ? t("Pickup: Ben Gurion Airport, Terminal 3")
            : t("Destination: Ben Gurion Airport, Terminal 3")}
        </p>
      </div>

      {/* Flight + address */}
      <div className="mt-2 space-y-1.5">
        {isFrom && (
          <div>
            <label className={labelClass}>{t("Flight Number")}</label>
            <input
              type="text"
              placeholder={t("e.g. LY315")}
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
              className={inputClass}
            />
          </div>
        )}

        <div>
          <label className={labelClass}>
            {isFrom ? t("Drop-off Address") : t("Pickup Address")}
          </label>
          <div className="relative mt-0.5">
            <FigmaIcon
              src={figmaIcons.search}
              size={16}
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
            />
            <input
              type="text"
              placeholder={t("Search or enter address")}
              value={isFrom ? dropoffAddress : pickupAddress}
              onChange={(e) =>
                isFrom
                  ? setDropoffAddress(e.target.value)
                  : setPickupAddress(e.target.value)
              }
              className={`${inputClass} mt-0 pl-9 pr-3`}
            />
          </div>
          {!isFrom && (
            <button
              type="button"
              className="mt-0.5 inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-primary"
            >
              <FigmaIcon src={figmaIcons.gps} size={13} className="h-[13px] w-[13px]" />
              {t("Use Current Location")}
            </button>
          )}
        </div>
      </div>

      {/* Date · time · passengers */}
      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
        <div>
          <label className={labelClass}>
            {isFrom ? t("Arrival Date") : t("Pickup Date")}
          </label>
          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            {isFrom ? t("Arrival Time") : t("Pickup Time")}
          </label>
          <input
            type="time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>
        <div className="col-span-2 sm:col-span-1">
          <label className={labelClass}>{t("Passengers")}</label>
          <div className="relative mt-0.5">
            <select
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
              className={selectClass}
            >
              {PASSENGER_OPTIONS.map((count) => (
                <option key={count} value={count} className="text-primary-2">
                  {formatPassengers(count)}
                </option>
              ))}
            </select>
            <FigmaIcon
              src={figmaIcons.chevronDown}
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 rtl:right-auto rtl:left-3"
            />
          </div>
        </div>

      {/* Luggage — side-by-side compact counters */}
      <div className="mt-2">
        <label className={labelClass}>{t("Luggage")}</label>
        <div className="flex flex-col gap-1.5">
          {LUGGAGE_TYPES.map((item) => (
            <div
              key={item.id}
              className="flex h-10 items-center justify-between gap-2 rounded-[10px] border border-white/10 bg-white/[0.06] px-3"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[rgba(234,244,254,0.28)]">
                  <FigmaIcon src={figmaIcons.luggage} size={18} className="h-[18px] w-[18px]" />
                </span>
                <span className="truncate text-xs font-bold leading-tight text-background">
                  {t(item.label)}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateLuggage(item.id, -1)}
                  className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg bg-[rgba(234,244,254,0.28)] transition hover:bg-[rgba(234,244,254,0.4)]"
                  aria-label={`Decrease ${item.label}`}
                >
                  <FigmaIcon src={figmaIcons.minus} size={14} className="h-3.5 w-3.5" />
                </button>
                <span className="w-3.5 text-center text-sm font-bold text-background">
                  {luggage[item.id]}
                </span>
                <button
                  type="button"
                  onClick={() => updateLuggage(item.id, 1)}
                  className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg bg-primary transition hover:bg-[#1270d4]"
                  aria-label={`Increase ${item.label}`}
                >
                  <FigmaIcon src={figmaIcons.plus} size={14} className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vehicle type */}
      <div className="mt-2">
        <label className={labelClass}>{t("Vehicle Type")}</label>
        <div className="mt-1 grid grid-cols-3 gap-1.5">
          {VEHICLE_TYPES.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setVehicle(v.id)}
              className={cn(
                "flex cursor-pointer flex-col items-center rounded-[9px] border px-2 py-1.5 transition",
                vehicle === v.id
                  ? "border-primary bg-primary/[0.12]"
                  : "border-white/10 bg-white/[0.03]",
              )}
            >
              <FigmaIcon src={v.icon} size={24} className="h-6 w-6" />
              <span
                className={cn(
                  "mt-0.5 text-center text-[11px] font-bold leading-tight",
                  vehicle === v.id ? "text-primary" : "text-white/60",
                )}
              >
                {t(v.label)}
              </span>
            </button>
          ))}
        </div>
      </div>

      <Button
        type="button"
        onClick={handleCalculatePrice}
        className="mt-3 h-10 w-full cursor-pointer rounded-[10px] text-sm font-bold tracking-[-0.16px]"
      >
        {t("Calculate Price")}
      </Button>
      <p className="mt-1 text-center text-xs leading-snug text-white/30">
        {isFrom
          ? t("Please enter flight number, drop-off address, date and time")
          : t("Please enter address, date and time")}
      </p>
    </div>
  );
}
