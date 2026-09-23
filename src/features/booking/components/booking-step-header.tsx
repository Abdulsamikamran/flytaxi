"use client";

import { useLanguage } from "@/lib/i18n/language-context";

type BookingStepHeaderProps = {
  title: string;
  description: string;
};

export function BookingStepHeader({
  title,
  description,
}: BookingStepHeaderProps) {
  const { t } = useLanguage();
  return (
    <div className="mb-6 text-center">
      <h1 className="text-2xl font-extrabold tracking-tight text-primary-2 sm:text-3xl">
        {t(title)}
      </h1>
      <p className="mt-2 text-sm text-subtext sm:text-base">{t(description)}</p>
    </div>
  );
}
