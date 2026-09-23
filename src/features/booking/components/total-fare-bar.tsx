"use client";

import { formatFare } from "@/features/booking/lib/booking-formatters";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

type TotalFareBarProps = {
  fareAmount: number;
  subtext?: string;
  variant?: "boxed" | "bar";
  directionLabel?: string;
  showDirection?: boolean;
};

export function TotalFareBar({
  fareAmount,
  subtext = "Fixed price · VAT included",
  variant = "bar",
  directionLabel,
  showDirection = false,
}: TotalFareBarProps) {
  const { t } = useLanguage();
  return (
    <div
      className={cn(
        variant === "boxed"
          ? "rounded-xl border border-stroke p-5"
          : "rounded-xl border border-primary/20 bg-primary/[0.06] p-5",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.72px] text-subtext">
            {t("TOTAL FARE")}
          </p>
          <p className="mt-1 text-xs text-subtext">{t(subtext)}</p>
        </div>
        <p className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          {formatFare(fareAmount)}
        </p>
      </div>
      {showDirection && directionLabel && (
        <div className="mt-4 flex items-center gap-2 border-t border-stroke pt-4">
          <span className="text-sm text-subtext">{t(directionLabel)}</span>
        </div>
      )}
    </div>
  );
}
