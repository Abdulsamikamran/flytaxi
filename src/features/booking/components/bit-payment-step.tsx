"use client";

import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useBooking } from "@/features/booking/context/booking-context";
import { BookingBackButton } from "@/features/booking/components/booking-back-button";
import { BookingFlowLayout } from "@/features/booking/components/booking-flow-layout";
import { BookingStepper } from "@/features/booking/components/booking-stepper";
import { DetailRow } from "@/features/booking/components/detail-row";
import {
  formatBookingDate,
  formatBookingTime,
  formatFare,
  getDestinationAddress,
  getPickupAddress,
} from "@/features/booking/lib/booking-formatters";
import { generateBookingReference } from "@/features/booking/lib/booking-reference";
import {
  useBookingNavigation,
  useRequireFareCalculated,
  useRequireOtpVerified,
} from "@/features/booking/hooks/use-booking-navigation";
import { useLanguage } from "@/lib/i18n/language-context";

const BIT_STEPS = [
  "Your booking is confirmed immediately",
  "Driver's Bit payment details will be shared before the ride",
  (amount: number, t: (text: string) => string) =>
    `${t("Send")} ${formatFare(amount)} ${t("via Bit to your driver")}`,
  "Payment goes directly to the driver",
] as const;

export function BitPaymentStep() {
  const { booking, setBooking } = useBooking();
  const { goTo } = useBookingNavigation();
  const { t } = useLanguage();
  useRequireFareCalculated();
  useRequireOtpVerified();

  const handleConfirm = () => {
    setBooking({
      bookingReference:
        booking.bookingReference ?? generateBookingReference(),
    });
    goTo("/book/confirm");
  };

  return (
    <BookingFlowLayout stepper={<BookingStepper allCompleted />}>
      <BookingBackButton />

      <div className="mx-auto max-w-md py-2">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
            <span className="text-lg font-extrabold lowercase text-white">
              bit
            </span>
          </div>
          <h1 className="mt-6 text-2xl font-extrabold text-primary-2">
            {t("Pay with Bit")}
          </h1>
          <p className="mt-2 text-sm text-subtext">
            {t("Pay directly to your driver via Bit app")}
          </p>
        </div>

        <div className="mt-8 rounded-xl border border-stroke p-5 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.72px] text-subtext">
            {t("AMOUNT TO PAY VIA BIT")}
          </p>
          <p className="mt-2 text-4xl font-extrabold text-primary">
            {formatFare(booking.fareAmount)}
          </p>
          <p className="mt-1 text-xs text-subtext">
            {t("Paid directly to driver via Bit")}
          </p>
        </div>

        <div className="mt-4 rounded-xl border border-stroke bg-[#f8fafc] px-4">
          <DetailRow label="From" value={getPickupAddress(booking)} />
          <DetailRow label="To" value={getDestinationAddress(booking)} />
          <DetailRow
            label="Date"
            value={formatBookingDate(booking.pickupDate)}
          />
          <DetailRow
            label="Time"
            value={formatBookingTime(booking.pickupTime)}
          />
        </div>

        <div className="mt-4 rounded-xl border border-primary/20 bg-primary/[0.04] p-4">
          <p className="text-sm font-semibold text-primary">
            {t("How Bit payment works")}
          </p>
          <ul className="mt-3 space-y-2">
            {BIT_STEPS.map((step, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-subtext"
              >
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                  strokeWidth={3}
                />
                <span>
                  {typeof step === "function"
                    ? step(booking.fareAmount, t)
                    : t(step)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <Button
          size="lg"
          className="mt-6 h-12 w-full gap-2 rounded-[10px]"
          onClick={handleConfirm}
        >
          {t("Confirm Booking with Bit")}
          <Check className="h-4 w-4" strokeWidth={3} />
        </Button>
      </div>
    </BookingFlowLayout>
  );
}
