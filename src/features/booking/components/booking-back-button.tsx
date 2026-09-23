"use client";

import { ArrowLeft } from "lucide-react";

import { useBookingNavigation } from "@/features/booking/hooks/use-booking-navigation";
import { useLanguage } from "@/lib/i18n/language-context";

export function BookingBackButton() {
  const { goBack } = useBookingNavigation();
  const { t, dir } = useLanguage();

  return (
    <button
      type="button"
      onClick={goBack}
      className="mb-6 inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-stroke bg-white px-3 py-1.5 text-sm font-semibold text-subtext transition hover:text-primary-dark"
    >
      <ArrowLeft
        className="h-4 w-4"
        style={dir === "rtl" ? { transform: "scaleX(-1)" } : undefined}
      />
      {t("Back")}
    </button>
  );
}
