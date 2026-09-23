"use client";

import { User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useBooking } from "@/features/booking/context/booking-context";
import { BookingBackButton } from "@/features/booking/components/booking-back-button";
import { BookingFlowLayout } from "@/features/booking/components/booking-flow-layout";
import { BookingStepHeader } from "@/features/booking/components/booking-step-header";
import { BookingStepper } from "@/features/booking/components/booking-stepper";
import { formatFare } from "@/features/booking/lib/booking-formatters";
import {
  useBookingNavigation,
  useRequireFareCalculated,
} from "@/features/booking/hooks/use-booking-navigation";
import { useLanguage } from "@/lib/i18n/language-context";

const inputClass =
  "mt-1.5 w-full rounded-[10px] border border-stroke bg-white px-4 py-3 text-sm text-primary-2 placeholder:text-subtext/70 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15";

const labelClass =
  "text-xs font-bold uppercase tracking-[0.72px] text-subtext";

export function PassengerStep() {
  const { booking, setBooking } = useBooking();
  const { goTo } = useBookingNavigation();
  const { t } = useLanguage();
  useRequireFareCalculated();

  return (
    <BookingFlowLayout stepper={<BookingStepper currentStep={4} />}>
      <BookingBackButton />

      <BookingStepHeader
        title="Your Details"
        description="Complete your booking as a guest — no account required"
      />

      <div className="mb-6 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
          <User className="h-4 w-4" />
          {t("Guest Booking — No password needed")}
        </span>
      </div>

      <div className="space-y-4">
        {/* Form fields in an inner bordered card */}
        <div className="rounded-xl border border-stroke p-5 space-y-4">
          <div>
            <label className={labelClass}>
              {t("FULL NAME")} <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              placeholder={t("David Cohen")}
              value={booking.fullName}
              onChange={(e) => setBooking({ fullName: e.target.value })}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>
              {t("PHONE NUMBER")} <span className="text-primary">*</span>
            </label>
            <input
              type="tel"
              placeholder={t("+972 50 000 0000")}
              value={booking.phone}
              onChange={(e) => setBooking({ phone: e.target.value })}
              className={`${inputClass} ltr-content`}
              required
            />
            <p className="mt-1.5 text-xs text-subtext">
              {t("We'll send a verification code to this number")}
            </p>
          </div>

          <div>
            <label className={labelClass}>{t("EMAIL ADDRESS (OPTIONAL)")}</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={booking.email}
              onChange={(e) => setBooking({ email: e.target.value })}
              className={`${inputClass} ltr-content`}
            />
            <p className="mt-1.5 text-xs text-subtext">
              {t("For booking confirmation and receipt")}
            </p>
          </div>
        </div>

        {/* Separate dedicated box for Booking Total */}
        <div className="flex items-center justify-between rounded-xl border border-stroke p-4 sm:p-5">
          <span className="text-sm font-semibold text-primary-2">
            {t("Booking total")}
          </span>
          <span className="text-2xl font-extrabold text-primary">
            {formatFare(booking.fareAmount)}
          </span>
        </div>

        {/* Continue Button */}
        <Button
          size="lg"
          className="h-12 w-full rounded-[10px]"
          onClick={() => goTo("/book/verify")}
          disabled={
            !(booking.fullName ?? "").trim() || !(booking.phone ?? "").trim()
          }
        >
          {t("Continue →")}
        </Button>
      </div>
    </BookingFlowLayout>
  );
}
