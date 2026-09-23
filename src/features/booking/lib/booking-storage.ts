import {
  DEFAULT_BOOKING_STATE,
  type BookingState,
} from "@/features/booking/types/booking-state";

const STORAGE_KEY = "flytaxi-booking-state";

export function loadBookingState(): BookingState {
  if (typeof window === "undefined") return DEFAULT_BOOKING_STATE;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_BOOKING_STATE;
    const parsed = JSON.parse(raw) as Partial<BookingState>;
    return {
      ...DEFAULT_BOOKING_STATE,
      ...parsed,
      fullName: parsed.fullName ?? "",
      phone: parsed.phone ?? "",
      email: parsed.email ?? "",
      bookingReference: parsed.bookingReference ?? "",
      luggage: {
        ...DEFAULT_BOOKING_STATE.luggage,
        ...parsed.luggage,
      },
    };
  } catch {
    return DEFAULT_BOOKING_STATE;
  }
}

export function saveBookingState(state: BookingState): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function mergeBookingState(partial: Partial<BookingState>): BookingState {
  const next = { ...loadBookingState(), ...partial };
  saveBookingState(next);
  return next;
}
