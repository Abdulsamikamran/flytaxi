"use client";

import { Button } from "@/components/ui/button";
import { PAYMENT_METHODS } from "@/constants";
import { useBooking } from "@/features/booking/context/booking-context";
import { BookingBackButton } from "@/features/booking/components/booking-back-button";
import { BookingFlowLayout } from "@/features/booking/components/booking-flow-layout";
import { BookingStepHeader } from "@/features/booking/components/booking-step-header";
import { BookingStepper } from "@/features/booking/components/booking-stepper";
import { PaymentMethodCard } from "@/features/booking/components/payment-method-card";
import {
  formatFare,
  getDirectionLabel,
} from "@/features/booking/lib/booking-formatters";
import type { PaymentMethod } from "@/features/booking/types/booking-state";
import {
  useBookingNavigation,
  useRequireFareCalculated,
  useRequireOtpVerified,
} from "@/features/booking/hooks/use-booking-navigation";
import { useLanguage } from "@/lib/i18n/language-context";

export function PaymentStep() {
  const { booking, setBooking } = useBooking();
  const { goTo } = useBookingNavigation();
  const { t } = useLanguage();
  useRequireFareCalculated();
  useRequireOtpVerified();

  const driverMethods = PAYMENT_METHODS.filter((m) => m.section === "driver");
  const onlineMethods = PAYMENT_METHODS.filter((m) => m.section === "online");

  const handleContinue = () => {
    if (booking.paymentMethod === "bit") {
      goTo("/book/bit");
      return;
    }
    goTo("/book/confirm");
  };

  return (
    <BookingFlowLayout stepper={<BookingStepper currentStep={5} />}>
      <BookingBackButton />

      <BookingStepHeader
        title="Select Payment Method"
        description="Choose how you'd like to pay for your transfer"
      />

      <div className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-stroke px-4 py-4 sm:px-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.72px] text-subtext">
            {t("BOOKING TOTAL")}
          </p>
          <p className="mt-1 text-xs font-medium text-subtext sm:text-sm">
            {getDirectionLabel(booking.direction)}
          </p>
        </div>
        <p className="text-2xl font-extrabold text-primary">
          {formatFare(booking.fareAmount)}
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.72px] text-subtext">
            {t("PAY DIRECTLY TO DRIVER")}
          </p>
          <div className="space-y-3">
            {driverMethods.map((method) => (
              <PaymentMethodCard
                key={method.id}
                id={method.id}
                label={method.label}
                description={method.description}
                badge={method.badge}
                selected={booking.paymentMethod === method.id}
                onSelect={() =>
                  setBooking({ paymentMethod: method.id as PaymentMethod })
                }
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.72px] text-subtext">
            {t("SECURE ONLINE PAYMENT")}
          </p>
          <div className="space-y-3">
            {onlineMethods.map((method) => (
              <PaymentMethodCard
                key={method.id}
                id={method.id}
                label={method.label}
                description={method.description}
                badge={method.badge}
                selected={booking.paymentMethod === method.id}
                online
                onSelect={() =>
                  setBooking({ paymentMethod: method.id as PaymentMethod })
                }
              />
            ))}
          </div>
        </div>

        <Button
          size="lg"
          className="h-12 w-full rounded-[10px]"
          onClick={handleContinue}
        >
          {t("Continue to Payment →")}
        </Button>
      </div>
    </BookingFlowLayout>
  );
}
