"use client";

import { Check } from "lucide-react";

import { figmaIcons } from "@/assets/figma-icons";
import { Button } from "@/components/ui/button";
import { FigmaIcon } from "@/components/ui/figma-icon";
import { useBooking } from "@/features/booking/context/booking-context";
import { BookingBackButton } from "@/features/booking/components/booking-back-button";
import { BookingDisclaimer } from "@/features/booking/components/booking-disclaimer";
import { BookingFlowLayout } from "@/features/booking/components/booking-flow-layout";
import { BookingStepHeader } from "@/features/booking/components/booking-step-header";
import { BookingStepper } from "@/features/booking/components/booking-stepper";
import { DetailRow } from "@/features/booking/components/detail-row";
import { IncludedFarePills } from "@/features/booking/components/included-fare-pills";
import {
  formatBookingDate,
  formatBookingTime,
  formatFare,
  formatLuggageSummary,
  formatPassengers,
  getDestinationAddress,
  getDirectionLabel,
  getDirectionShortLabel,
  getPickupAddress,
  getVehicleLabel,
} from "@/features/booking/lib/booking-formatters";
import { useBookingNavigation } from "@/features/booking/hooks/use-booking-navigation";
import { useLanguage } from "@/lib/i18n/language-context";

export function FareStep() {
  const { booking } = useBooking();
  const { goTo } = useBookingNavigation();
  const { t } = useLanguage();

  return (
    <BookingFlowLayout
      stepper={<BookingStepper currentStep={1} />}
      footer={<BookingDisclaimer />}
    >
      <BookingBackButton />

      <div className="mb-6 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-success/10 px-4 py-2 text-sm font-semibold text-success">
          <Check className="h-4 w-4" strokeWidth={3} />
          {t("Your fare is ready")}
        </span>
      </div>

      <BookingStepHeader
        title="Your Fare"
        description="Fixed price, no surprises, no surge pricing"
      />

      <div className="space-y-6">
        <div className="rounded-xl border border-stroke p-5">
          <p className="text-xs font-bold uppercase tracking-[0.72px] text-subtext">
            {t("TOTAL FARE")}
          </p>
          <p className="mt-2 text-4xl font-extrabold tracking-tight text-primary-2">
            {formatFare(booking.fareAmount)}
          </p>
          <p className="mt-1 text-xs text-subtext">
            {t("Fixed price · No credit card surcharge")}
          </p>
          <div className="mt-4 flex items-center gap-2 border-t border-stroke pt-4">
            <FigmaIcon
              src={
                booking.direction === "to"
                  ? figmaIcons.airplaneTo
                  : figmaIcons.airplaneFrom
              }
              size={18}
              className="h-[18px] w-[18px]"
            />
            <span className="text-sm font-medium text-primary-2">
              {getDirectionLabel(booking.direction)}
            </span>
          </div>
        </div>

        <div>
          <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.72px] text-subtext">
            {t("TRIP DETAILS")}
          </h2>
          <div className="divide-y divide-stroke rounded-xl border border-stroke px-4">
            <DetailRow
              label="Direction"
              value={getDirectionShortLabel(booking.direction)}
            />
            <DetailRow
              label="Pickup"
              value={getPickupAddress(booking)}
            />
            <DetailRow
              label="Destination"
              value={getDestinationAddress(booking)}
            />
            <DetailRow
              label="Date"
              value={formatBookingDate(booking.pickupDate)}
            />
            <DetailRow
              label="Time"
              value={formatBookingTime(booking.pickupTime)}
            />
            {booking.flightNumber && (
              <DetailRow label="Flight" value={booking.flightNumber} />
            )}
            <DetailRow
              label="Passengers"
              value={formatPassengers(booking.passengers)}
            />
            <DetailRow
              label="Luggage"
              value={formatLuggageSummary(booking.luggage)}
            />
            <DetailRow
              label="Vehicle"
              value={getVehicleLabel(booking.vehicle)}
            />
          </div>
        </div>

        <IncludedFarePills />

        <div className="flex flex-col gap-3">
          <Button
            size="lg"
            className="h-12 w-full rounded-[10px]"
            onClick={() => goTo("/book/details")}
          >
            {t("Continue Booking →")}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-12 w-full rounded-[10px]"
            onClick={() => goTo("/book/details")}
          >
            {t("Edit Trip")}
          </Button>
        </div>
      </div>
    </BookingFlowLayout>
  );
}
