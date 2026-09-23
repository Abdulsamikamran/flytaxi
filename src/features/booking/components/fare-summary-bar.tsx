import { figmaIcons } from "@/assets/figma-icons";
import { FigmaIcon } from "@/components/ui/figma-icon";
import {
  formatFare,
  getDirectionLabel,
} from "@/features/booking/lib/booking-formatters";
import type { BookingDirection } from "@/features/booking/types/booking-state";

type FareSummaryBarProps = {
  direction: BookingDirection;
  fareAmount: number;
};

export function FareSummaryBar({
  direction,
  fareAmount,
}: FareSummaryBarProps) {
  const icon =
    direction === "to" ? figmaIcons.airplaneTo : figmaIcons.airplaneFrom;

  return (
    <div className="mb-6 flex items-center justify-between gap-4 rounded-[10px] border border-primary/20 bg-primary/[0.08] px-4 py-3">
      <div className="flex min-w-0 items-center gap-2.5">
        <FigmaIcon src={icon} size={20} className="h-5 w-5 shrink-0" />
        <span className="truncate text-sm font-semibold text-primary-2">
          {getDirectionLabel(direction)}
        </span>
      </div>
      <span className="shrink-0 text-lg font-bold text-success">
        {formatFare(fareAmount)}
      </span>
    </div>
  );
}
