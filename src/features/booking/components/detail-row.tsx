"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

type DetailRowProps = {
  label: string;
  value: string;
  className?: string;
};

export function DetailRow({ label, value, className }: DetailRowProps) {
  const { t } = useLanguage();
  return (
    <div
      className={cn(
        "flex flex-col gap-1 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4",
        className,
      )}
    >
      <span className="text-sm text-subtext">{t(label)}</span>
      <span className="text-sm font-semibold text-primary-2 sm:max-w-[60%] sm:text-right">
        {t(value)}
      </span>
    </div>
  );
}
