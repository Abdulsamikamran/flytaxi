"use client";

import type { RideTab } from "@/features/manage-booking/types/ride";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

type RideTabsProps = {
  active: RideTab;
  onChange: (tab: RideTab) => void;
};

export function RideTabs({ active, onChange }: RideTabsProps) {
  const { t } = useLanguage();
  return (
    <div className="inline-flex rounded-full bg-[#f1f5f9] p-1">
      {(
        [
          { id: "upcoming" as const, label: "Upcoming" },
          { id: "history" as const, label: "History" },
        ] as const
      ).map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cn(
            "cursor-pointer rounded-full px-6 py-2 text-sm font-semibold transition-colors",
            active === tab.id
              ? "bg-primary text-white shadow-sm"
              : "text-subtext hover:text-primary-dark",
          )}
        >
          {t(tab.label)}
        </button>
      ))}
    </div>
  );
}
