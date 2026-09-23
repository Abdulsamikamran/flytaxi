"use client";

import { FARE_INCLUSIONS } from "@/constants";
import { useLanguage } from "@/lib/i18n/language-context";

export function IncludedFarePills() {
  const { t } = useLanguage();
  return (
    <div className="rounded-xl border border-primary/20 bg-primary/[0.06] p-4 sm:p-5">
      <p className="text-sm font-semibold text-primary">
        {t("Included in your fare")}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {FARE_INCLUSIONS.map((item) => (
          <span
            key={item}
            className="rounded-full border border-primary/30 bg-white px-3 py-1.5 text-xs font-medium text-primary"
          >
            {t(item)}
          </span>
        ))}
      </div>
    </div>
  );
}
