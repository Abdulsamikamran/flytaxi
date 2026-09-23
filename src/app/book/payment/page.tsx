import { PaymentStep } from "@/features/booking/components/payment-step";

export const metadata = {
  title: "Select Payment Method | FLYTAXI",
  description: "Choose how you'd like to pay for your airport transfer.",
};

export default function PaymentPage() {
  return <PaymentStep />;
}
