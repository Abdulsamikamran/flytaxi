import { BitPaymentStep } from "@/features/booking/components/bit-payment-step";

export const metadata = {
  title: "Pay with Bit | FLYTAXI",
  description: "Complete your Bit payment for your airport transfer.",
};

export default function BitPaymentPage() {
  return <BitPaymentStep />;
}
