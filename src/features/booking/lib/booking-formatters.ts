import { VEHICLE_TYPES } from "@/constants";
import { localeRef } from "@/lib/i18n/locale-store";
import {
  AIRPORT_TERMINAL,
  type BookingDirection,
  type BookingState,
} from "@/features/booking/types/booking-state";

function isHebrew(): boolean {
  return localeRef.current === "he";
}

export function getDirectionLabel(direction: BookingDirection): string {
  if (isHebrew()) {
    return direction === "to"
      ? "לשדה התעופה בן גוריון"
      : "משדה התעופה בן גוריון";
  }
  return direction === "to"
    ? "To Ben Gurion Airport"
    : "From Ben Gurion Airport";
}

export function getDirectionShortLabel(direction: BookingDirection): string {
  if (isHebrew()) {
    return direction === "to" ? "לשדה התעופה" : "משדה התעופה";
  }
  return direction === "to" ? "To Airport" : "From Airport";
}

export function getPickupAddress(state: BookingState): string {
  return state.direction === "to"
    ? state.pickupAddress
    : AIRPORT_TERMINAL;
}

export function getDestinationAddress(state: BookingState): string {
  return state.direction === "to"
    ? AIRPORT_TERMINAL
    : state.dropoffAddress;
}

export function formatBookingDate(isoDate: string): string {
  if (!isoDate) return "";
  const date = new Date(`${isoDate}T12:00:00`);
  return date.toLocaleDateString(isHebrew() ? "he-IL" : "en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatBookingTime(time: string): string {
  return time || "";
}

export function formatPassengers(count: number): string {
  if (isHebrew()) {
    return `${count} ${count === 1 ? "מבוגר" : "מבוגרים"}`;
  }
  return `${count} adult${count === 1 ? "" : "s"}`;
}

export function formatLuggageSummary(luggage: BookingState["luggage"]): string {
  const parts: string[] = [];
  if (isHebrew()) {
    if (luggage.carryon > 0) {
      parts.push(`טרולי / מזוודת יד: ${luggage.carryon}`);
    }
    if (luggage.large > 0) {
      parts.push(`מזוודה גדולה: ${luggage.large}`);
    }
    return parts.join(" · ") || "ללא";
  }
  if (luggage.carryon > 0) {
    parts.push(`Trolley / Carry-on: ${luggage.carryon}`);
  }
  if (luggage.large > 0) {
    parts.push(`Large Suitcase: ${luggage.large}`);
  }
  return parts.join(" · ") || "None";
}

export function getVehicleLabel(vehicleId: string): string {
  if (isHebrew()) {
    const hebrewLabels: Record<string, string> = {
      standard: "סדאן סטנדרטי",
      premium: "סדאן פרימיום",
      van: "ואן / מיניבוס",
    };
    return hebrewLabels[vehicleId] ?? "סדאן סטנדרטי";
  }
  return (
    VEHICLE_TYPES.find((v) => v.id === vehicleId)?.label ?? "Standard Sedan"
  );
}

export function formatFare(amount: number): string {
  return `₪${amount}`;
}
