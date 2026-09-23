"use client";

import { VEHICLE_TYPES } from "@/constants";
import { FigmaIcon } from "@/components/ui/figma-icon";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

const VEHICLE_CAPACITIES: Record<string, string> = {
  standard: "1–4 pax",
  premium: "1–4 pax",
  van: "5–8 pax",
};

type VehicleTypePickerProps = {
  value: string;
  onChange: (vehicleId: string) => void;
};

export function VehicleTypePicker({ value, onChange }: VehicleTypePickerProps) {
  const { t } = useLanguage();
  return (
    <div>
      <p className="mb-2.5 text-xs font-bold uppercase tracking-[0.72px] text-subtext">
        {t("VEHICLE TYPE")}
      </p>
      <div className="grid grid-cols-3 gap-2.5">
        {VEHICLE_TYPES.map((vehicle) => {
          const displayLabel =
            vehicle.id === "van"
              ? "Van / Minibus"
              : vehicle.id === "premium"
                ? "Premium"
                : "Standard";
          return (
            <button
              key={vehicle.id}
              type="button"
              onClick={() => onChange(vehicle.id)}
              className={cn(
                "flex cursor-pointer flex-col items-center rounded-[10px] border px-2 py-3 transition",
                value === vehicle.id
                  ? "border-primary bg-primary/[0.08]"
                  : "border-stroke bg-white hover:border-primary/30",
              )}
            >
              <FigmaIcon src={vehicle.icon} size={28} className="h-7 w-7" />
              <span
                className={cn(
                  "mt-2 text-center text-[11px] font-bold leading-tight",
                  value === vehicle.id ? "text-primary" : "text-primary-2",
                )}
              >
                {t(displayLabel)}
              </span>
              <span className="mt-0.5 text-[10px] text-subtext">
                {VEHICLE_CAPACITIES[vehicle.id]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
