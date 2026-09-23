"use client";

import Link from "next/link";

import { figmaIcons } from "@/assets/figma-icons";
import { Button } from "@/components/ui/button";
import { FigmaIcon } from "@/components/ui/figma-icon";
import { RideStatusBadge } from "@/features/manage-booking/components/ride-status-badge";
import { formatFare } from "@/features/booking/lib/booking-formatters";
import type { Ride } from "@/features/manage-booking/types/ride";
import { useLanguage } from "@/lib/i18n/language-context";

type RideCardProps = {
  ride: Ride;
};

function RideDetailRow({ label, value }: { label: string; value: string }) {
  const { t } = useLanguage();
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <span className="text-sm text-subtext">{t(label)}</span>
      <span className="max-w-[55%] text-right text-sm font-semibold text-primary-2">
        {value}
      </span>
    </div>
  );
}

export function RideCard({ ride }: RideCardProps) {
  const { t } = useLanguage();
  const showViewDetails = ride.tab === "upcoming" && ride.status === "confirmed";

  return (
    <article className="rounded-2xl border border-stroke bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <FigmaIcon
            src={figmaIcons.airplaneFrom}
            size={20}
            className="h-5 w-5 shrink-0"
          />
          <span className="font-bold text-primary-2">{ride.id}</span>
        </div>
        <RideStatusBadge status={ride.status} />
      </div>

      <div className="mt-4 divide-y divide-stroke">
        <RideDetailRow label="From" value={ride.from} />
        <RideDetailRow label="To" value={ride.to} />
        <RideDetailRow label="Date & Time" value={ride.dateTime} />
        <RideDetailRow label="Payment" value={ride.payment} />
      </div>

      <div className="mt-4 flex items-center justify-between gap-4 border-t border-stroke pt-4">
        <span className="text-2xl font-extrabold text-primary-2">
          {formatFare(ride.fareAmount)}
        </span>
        {showViewDetails && (
          <Link href={`/my-rides/${ride.id}`} className="cursor-pointer">
            <Button size="sm" className="cursor-pointer rounded-[10px] px-5">
              {t("View Details")}
            </Button>
          </Link>
        )}
      </div>
    </article>
  );
}
