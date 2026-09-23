export type BookingDirection = "to" | "from";

export type BookingLuggage = {
  carryon: number;
  large: number;
};

export type PaymentMethod = "cash" | "bit" | "paybox" | "card";

export type BookingState = {
  direction: BookingDirection;
  pickupAddress: string;
  dropoffAddress: string;
  flightNumber: string;
  pickupDate: string;
  pickupTime: string;
  passengers: number;
  luggage: BookingLuggage;
  vehicle: string;
  fareCalculated: boolean;
  fareAmount: number;
  fullName: string;
  phone: string;
  email: string;
  paymentMethod: PaymentMethod;
  otpVerified: boolean;
  bookingReference: string;
};

export const AIRPORT_TERMINAL = "Ben Gurion Airport, Terminal 3";

export const DEFAULT_BOOKING_STATE: BookingState = {
  direction: "to",
  pickupAddress: "Tel Aviv - Dizengoff St 55, Tel Aviv-Yafo",
  dropoffAddress: AIRPORT_TERMINAL,
  flightNumber: "LY315",
  pickupDate: "2026-09-17",
  pickupTime: "14:56",
  passengers: 1,
  luggage: { carryon: 1, large: 1 },
  vehicle: "standard",
  fareCalculated: true,
  fareAmount: 280,
  fullName: "",
  phone: "",
  email: "",
  paymentMethod: "bit",
  otpVerified: false,
  bookingReference: "",
};
