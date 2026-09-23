"use client";

import type { FAQ_TABS } from "@/constants";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

export type FaqTabId = (typeof FAQ_TABS)[number]["id"];

type FaqTab = (typeof FAQ_TABS)[number];

type FaqTabsProps = {
  tabs: readonly FaqTab[];
  active: FaqTabId;
  onChange: (id: FaqTabId) => void;
};

export function FaqTabs({ tabs, active, onChange }: FaqTabsProps) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cn(
            "cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition-colors",
            active === tab.id
              ? "bg-primary text-white"
              : "border border-stroke bg-white text-subtext hover:text-primary-dark",
          )}
        >
          {t(tab.label)}
        </button>
      ))}
    </div>
  );
}
