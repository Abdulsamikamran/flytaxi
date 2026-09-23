"use client";

import { Button } from "@/components/ui/button";
import { useBooking } from "@/features/booking/context/booking-context";
import { BookingBackButton } from "@/features/booking/components/booking-back-button";
import { BookingDisclaimer } from "@/features/booking/components/booking-disclaimer";
import { BookingFlowLayout } from "@/features/booking/components/booking-flow-layout";
import { BookingStepHeader } from "@/features/booking/components/booking-step-header";
import { BookingStepper } from "@/features/booking/components/booking-stepper";
import { DetailCard } from "@/features/booking/components/detail-card";
import { DetailRow } from "@/features/booking/components/detail-row";
import { DirectionBanner } from "@/features/booking/components/direction-banner";
import { TotalFareBar } from "@/features/booking/components/total-fare-bar";
import {
  formatBookingDate,
  formatBookingTime,
  formatLuggageSummary,
  formatPassengers,
  getDestinationAddress,
  getPickupAddress,
  getVehicleLabel,
} from "@/features/booking/lib/booking-formatters";
import {
  useBookingNavigation,
  useRequireFareCalculated,
} from "@/features/booking/hooks/use-booking-navigation";
import { useLanguage } from "@/lib/i18n/language-context";

export function ReviewStep() {
  const { booking } = useBooking();
  const { goTo } = useBookingNavigation();
  const { t } = useLanguage();
  useRequireFareCalculated();

  return (
    <BookingFlowLayout
      stepper={<BookingStepper currentStep={3} />}
      footer={<BookingDisclaimer />}
    >
      <BookingBackButton />

      <BookingStepHeader
        title="Review Your Booking"
        description="Please confirm all details before continuing"
      />

      <div className="mb-4">
        <DirectionBanner direction={booking.direction} />
      </div>

      <div className="space-y-4">
        <DetailCard title="ROUTE" editHref="/book/details">
          <DetailRow label="Pickup" value={getPickupAddress(booking)} />
          <DetailRow
            label="Destination"
            value={getDestinationAddress(booking)}
          />
        </DetailCard>

        <DetailCard title="DATE & TIME" editHref="/book/details">
          <DetailRow
            label="Date"
            value={formatBookingDate(booking.pickupDate)}
          />
          <DetailRow
            label="Time"
            value={formatBookingTime(booking.pickupTime)}
          />
        </DetailCard>

        <DetailCard title="PASSENGERS & VEHICLE" editHref="/book/details">
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
        </DetailCard>

        <TotalFareBar
          fareAmount={booking.fareAmount}
          subtext="Fixed price · VAT included"
          variant="bar"
        />

        <Button
          size="lg"
          className="h-12 w-full rounded-[10px]"
          onClick={() => goTo("/book/passenger")}
        >
          {t("Continue →")}
        </Button>
      </div>
    </BookingFlowLayout>
  );
}
