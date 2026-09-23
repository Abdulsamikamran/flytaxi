"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  loadBookingState,
  saveBookingState,
} from "@/features/booking/lib/booking-storage";
import {
  DEFAULT_BOOKING_STATE,
  type BookingState,
} from "@/features/booking/types/booking-state";

type BookingContextValue = {
  booking: BookingState;
  setBooking: (partial: Partial<BookingState>) => void;
  resetBooking: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [booking, setBookingState] = useState<BookingState>(DEFAULT_BOOKING_STATE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setBookingState(loadBookingState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveBookingState(booking);
  }, [booking, hydrated]);

  const setBooking = useCallback((partial: Partial<BookingState>) => {
    setBookingState((prev) => ({ ...prev, ...partial }));
  }, []);

  const resetBooking = useCallback(() => {
    setBookingState(DEFAULT_BOOKING_STATE);
    saveBookingState(DEFAULT_BOOKING_STATE);
  }, []);

  const value = useMemo(
    () => ({ booking, setBooking, resetBooking }),
    [booking, setBooking, resetBooking],
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return ctx;
}
