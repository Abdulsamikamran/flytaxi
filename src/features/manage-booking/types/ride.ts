export type RideStatus = "confirmed" | "completed" | "cancelled";

export type RideTab = "upcoming" | "history";

export type RideDriver = {
  name: string;
  rating: number;
  trips: number;
  verified: boolean;
  vehicle: string;
  color: string;
  license: string;
};

export type Ride = {
  id: string;
  tab: RideTab;
  status: RideStatus;
  direction: string;
  from: string;
  to: string;
  pickup: string;
  destination: string;
  dateTime: string;
  date: string;
  time: string;
  flight?: string;
  passengers: string;
  luggage: string;
  vehicle: string;
  payment: string;
  paymentDetail?: string;
  fareAmount: number;
  driver?: RideDriver;
  driverAssigned?: boolean;
};
