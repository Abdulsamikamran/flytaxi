"use client";

import { FigmaIcon } from "@/components/ui/figma-icon";
import { Button } from "@/components/ui/button";
import { figmaIcons } from "@/assets/figma-icons";
import {
  LUGGAGE_COUNT_OPTIONS,
  PASSENGER_OPTIONS,
} from "@/constants";
import { useBooking } from "@/features/booking/context/booking-context";
import { BookingBackButton } from "@/features/booking/components/booking-back-button";
import { BookingDisclaimer } from "@/features/booking/components/booking-disclaimer";
import { BookingFlowLayout } from "@/features/booking/components/booking-flow-layout";
import { BookingStepHeader } from "@/features/booking/components/booking-step-header";
import { BookingStepper } from "@/features/booking/components/booking-stepper";
import { DetailCard } from "@/features/booking/components/detail-card";
import { DetailRow } from "@/features/booking/components/detail-row";
import { FareSummaryBar } from "@/features/booking/components/fare-summary-bar";
import { VehicleTypePicker } from "@/features/booking/components/vehicle-type-picker";
import {
  formatPassengers,
  getDestinationAddress,
  getPickupAddress,
} from "@/features/booking/lib/booking-formatters";
import {
  useBookingNavigation,
  useRequireFareCalculated,
} from "@/features/booking/hooks/use-booking-navigation";
import { useLanguage } from "@/lib/i18n/language-context";

const inputClass =
  "mt-1.5 w-full cursor-pointer rounded-[10px] border border-stroke bg-white px-4 py-3 text-sm text-primary-2 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15";

const labelClass =
  "text-xs font-bold uppercase tracking-[0.72px] text-subtext";

export function DetailsStep() {
  const { booking, setBooking } = useBooking();
  const { goTo } = useBookingNavigation();
  const { t } = useLanguage();
  useRequireFareCalculated();

  return (
    <BookingFlowLayout
      stepper={<BookingStepper currentStep={2} />}
      footer={<BookingDisclaimer />}
    >
      <BookingBackButton />

      <BookingStepHeader
        title="Complete Your Booking"
        description="Review and complete your trip details"
      />

      <FareSummaryBar
        direction={booking.direction}
        fareAmount={booking.fareAmount}
      />

      <div className="space-y-4">
        <DetailCard title="ROUTE">
          <DetailRow label="From" value={getPickupAddress(booking)} />
          <DetailRow label="To" value={getDestinationAddress(booking)} />
        </DetailCard>

        <DetailCard title="DATE & TIME">
          <div className="grid gap-4 py-3 sm:grid-cols-2">
            <div>
              <label className={labelClass}>{t("PICKUP DATE")}</label>
              <input
                type="date"
                value={booking.pickupDate}
                onChange={(e) => setBooking({ pickupDate: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>{t("PICKUP TIME")}</label>
              <input
                type="time"
                value={booking.pickupTime}
                onChange={(e) => setBooking({ pickupTime: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>
        </DetailCard>

        <DetailCard title="PASSENGERS & VEHICLE">
          <div className="space-y-4 py-3">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>{t("PASSENGERS")}</label>
                <div className="relative mt-1.5">
                  <select
                    value={booking.passengers}
                    onChange={(e) =>
                      setBooking({ passengers: Number(e.target.value) })
                    }
                    className={`${inputClass} appearance-none pr-10`}
                  >
                    {PASSENGER_OPTIONS.map((count) => (
                      <option key={count} value={count}>
                        {formatPassengers(count)}
                      </option>
                    ))}
                  </select>
                  <FigmaIcon
                    src={figmaIcons.chevronDown}
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>{t("TROLLEY / CARRY-ON")}</label>
                <div className="relative mt-1.5">
                  <select
                    value={booking.luggage.carryon}
                    onChange={(e) =>
                      setBooking({
                        luggage: {
                          ...booking.luggage,
                          carryon: Number(e.target.value),
                        },
                      })
                    }
                    className={`${inputClass} appearance-none pr-10`}
                  >
                    {LUGGAGE_COUNT_OPTIONS.map((count) => (
                      <option key={count} value={count}>
                        {count}
                      </option>
                    ))}
                  </select>
                  <FigmaIcon
                    src={figmaIcons.chevronDown}
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
                  />
                </div>
              </div>
            </div>
            <div className="sm:w-1/2">
              <label className={labelClass}>{t("LARGE SUITCASE")}</label>
              <div className="relative mt-1.5">
                <select
                  value={booking.luggage.large}
                  onChange={(e) =>
                    setBooking({
                      luggage: {
                        ...booking.luggage,
                        large: Number(e.target.value),
                      },
                    })
                  }
                  className={`${inputClass} appearance-none pr-10`}
                >
                  {LUGGAGE_COUNT_OPTIONS.map((count) => (
                    <option key={count} value={count}>
                      {count}
                    </option>
                  ))}
                </select>
                <FigmaIcon
                  src={figmaIcons.chevronDown}
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
                />
              </div>
            </div>
            <VehicleTypePicker
              value={booking.vehicle}
              onChange={(vehicle) => setBooking({ vehicle })}
            />
          </div>
        </DetailCard>

        <Button
          size="lg"
          className="h-12 w-full rounded-[10px]"
          onClick={() => goTo("/book/review")}
        >
          {t("Continue →")}
        </Button>
      </div>
    </BookingFlowLayout>
  );
}
