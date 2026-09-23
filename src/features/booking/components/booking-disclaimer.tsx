"use client";

import { useLanguage } from "@/lib/i18n/language-context";

export function BookingDisclaimer() {
  const { t } = useLanguage();
  return (
    <p className="text-center text-sm text-subtext">
      {t("No account or payment required at this stage.")}
    </p>
  );
}
