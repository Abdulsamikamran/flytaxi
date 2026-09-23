"use client";

import type { RideStatus } from "@/features/manage-booking/types/ride";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<
  RideStatus,
  { label: string; className: string }
> = {
  confirmed: {
    label: "Confirmed",
    className: "bg-success/10 text-success",
  },
  completed: {
    label: "Completed",
    className: "bg-success/10 text-success",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-500/10 text-red-600",
  },
};

type RideStatusBadgeProps = {
  status: RideStatus;
};

export function RideStatusBadge({ status }: RideStatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  const { t } = useLanguage();
  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-xs font-semibold",
        config.className,
      )}
    >
      {t(config.label)}
    </span>
  );
}
