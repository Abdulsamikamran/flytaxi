"use client";

import { Check, Copy } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { figmaIcons } from "@/assets/figma-icons";
import { Button } from "@/components/ui/button";
import { FigmaIcon } from "@/components/ui/figma-icon";
import { PAYMENT_METHODS } from "@/constants";
import { useBooking } from "@/features/booking/context/booking-context";
import { BookingFlowLayout } from "@/features/booking/components/booking-flow-layout";
import { DetailRow } from "@/features/booking/components/detail-row";
import {
  formatBookingDate,
  formatBookingTime,
  formatFare,
  formatLuggageSummary,
  formatPassengers,
  getDestinationAddress,
  getDirectionLabel,
  getPickupAddress,
  getVehicleLabel,
} from "@/features/booking/lib/booking-formatters";
import { generateBookingReference } from "@/features/booking/lib/booking-reference";
import { useRequireFareCalculated } from "@/features/booking/hooks/use-booking-navigation";
import { useLanguage } from "@/lib/i18n/language-context";

function getPaymentLabel(method: string): string {
  return PAYMENT_METHODS.find((m) => m.id === method)?.label ?? method;
}

function maskContact(value: string): string {
  if (!value) return "your contact";
  if (value.includes("@")) {
    const [user, domain] = value.split("@");
    return `${user.slice(0, 2)}${"•".repeat(4)}@${domain}`;
  }
  if (value.length <= 4) return value;
  return `${value.slice(0, 3)}${"•".repeat(Math.min(value.length - 3, 6))}`;
}

export function ConfirmStep() {
  const { booking, setBooking } = useBooking();
  const { t } = useLanguage();
  useRequireFareCalculated();

  useEffect(() => {
    if (!booking.bookingReference) {
      setBooking({ bookingReference: generateBookingReference() });
    }
  }, [booking.bookingReference, setBooking]);

  const reference = booking.bookingReference || "FLY-2026-5488";
  const confirmationTarget = booking.email || booking.phone;

  const handleCopyReference = async () => {
    try {
      await navigator.clipboard.writeText(reference);
    } catch {
      // clipboard unavailable
    }
  };

  return (
    <BookingFlowLayout>
      <div className="mx-auto max-w-md py-4">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success">
            <Check className="h-8 w-8 text-white" strokeWidth={3} />
          </div>
          <h1 className="mt-6 text-2xl font-extrabold text-primary-2 sm:text-3xl">
            {t("Booking Confirmed!")}
          </h1>
          <p className="mt-2 text-sm text-subtext sm:text-base">
            {t("Your transfer has been booked successfully")}
          </p>

          <button
            type="button"
            onClick={handleCopyReference}
            className="ltr-content mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary/20"
          >
            {reference}
            <Copy className="h-4 w-4" />
          </button>
        </div>

        {booking.paymentMethod === "bit" && (
          <div className="mt-6 flex items-center gap-4 rounded-xl border border-amber-200/80 bg-amber-50 px-4 py-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-extrabold lowercase text-white">
              bit
            </span>
            <div>
              <p className="font-semibold text-primary-2">
                {t("Pay driver via Bit ·")} {formatFare(booking.fareAmount)}
              </p>
              <p className="mt-0.5 text-xs text-subtext">
                {t("Bit — Payment to driver")}
              </p>
            </div>
          </div>
        )}

        <div className="mt-4 rounded-xl border border-stroke p-4 sm:p-5">
          <p className="text-xs font-bold uppercase tracking-[0.72px] text-subtext">
            {t("TRIP DETAILS")}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <FigmaIcon
              src={
                booking.direction === "to"
                  ? figmaIcons.airplaneTo
                  : figmaIcons.airplaneFrom
              }
              size={18}
              className="h-[18px] w-[18px]"
            />
            <span className="text-sm font-semibold text-primary-2">
              {getDirectionLabel(booking.direction)}
            </span>
          </div>
          <div className="mt-3 divide-y divide-stroke">
            <DetailRow label="Pickup" value={getPickupAddress(booking)} />
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
          <div className="mt-4 flex items-center justify-between border-t border-stroke pt-4">
            <span className="font-semibold text-primary-2">{t("Total Fare")}</span>
            <span className="text-xl font-extrabold text-primary-2">
              {formatFare(booking.fareAmount)}
            </span>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-stroke p-4 sm:p-5">
          <p className="text-xs font-bold uppercase tracking-[0.72px] text-subtext">
            {t("CUSTOMER DETAIL")}
          </p>
          <div className="mt-3 space-y-2 text-sm">
            <p className="text-primary-2">
              <span className="text-subtext">{t("Name:")} </span>
              <span className="font-semibold">
                {booking.fullName || t("Guest")}
              </span>
            </p>
            <p className="text-primary-2">
              <span className="text-subtext">{t("Phone no:")} </span>
              <span className="font-semibold ltr-content">{booking.phone}</span>
            </p>
            {booking.paymentMethod !== "bit" && (
              <p className="text-primary-2">
                <span className="text-subtext">{t("Payment:")} </span>
                <span className="font-semibold">
                  {t(getPaymentLabel(booking.paymentMethod))}
                </span>
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Link href="/my-rides/FLY-2026-8847" className="block cursor-pointer">
            <Button size="lg" className="h-12 w-full rounded-[10px]">
              {t("View Booking")}
            </Button>
          </Link>
          <Link href="/" className="block cursor-pointer">
            <Button
              variant="outline"
              size="lg"
              className="h-12 w-full rounded-[10px]"
            >
              {t("Back to Home")}
            </Button>
          </Link>
        </div>

        {confirmationTarget && (
          <p className="mt-6 text-center text-xs text-subtext">
            {t("A confirmation has been sent to")} {maskContact(confirmationTarget)}
          </p>
        )}
      </div>
    </BookingFlowLayout>
  );
}
