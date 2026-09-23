import { figmaIcons } from "@/assets/figma-icons";
import { FigmaIcon } from "@/components/ui/figma-icon";
import type { BookingDirection } from "@/features/booking/types/booking-state";
import { getDirectionLabel } from "@/features/booking/lib/booking-formatters";

type DirectionBannerProps = {
  direction: BookingDirection;
};

export function DirectionBanner({ direction }: DirectionBannerProps) {
  const icon =
    direction === "to" ? figmaIcons.airplaneTo : figmaIcons.airplaneFrom;

  return (
    <div className="mb-6 flex items-center gap-2.5 rounded-[10px] border border-primary/20 bg-primary/[0.08] px-4 py-3">
      <FigmaIcon src={icon} size={20} className="h-5 w-5 shrink-0" />
      <span className="text-sm font-semibold text-primary-2">
        {getDirectionLabel(direction)}
      </span>
    </div>
  );
}
