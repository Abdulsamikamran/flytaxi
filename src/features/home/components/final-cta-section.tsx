"use client";

import { AppStoreButtons } from "@/components/ui/app-store-buttons";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";

const CTA_GRADIENT =
  "linear-gradient(160.53deg, rgb(11, 31, 51) 0%, rgb(26, 58, 86) 100%)";

export function FinalCtaSection() {
  const { t } = useLanguage();
  return (
    <section
      className="py-16 sm:py-20 lg:py-[80px]"
      style={{ backgroundImage: CTA_GRADIENT }}
    >
      <div className="mx-auto flex max-w-[600px] flex-col items-center gap-[50px] px-4 text-center sm:px-6">
        <div>
          <h2 className="text-[32px] font-extrabold leading-tight tracking-[-1.38px] text-white sm:text-[46px] sm:leading-[69px]">
            {t("Ready to Book Your Transfer?")}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-white/[0.55]">
            {t("Get your fixed fare in seconds. No registration required.")}
          </p>
          <Button
            size="lg"
            className="mt-6 h-[57.5px] rounded-[10px] px-12 text-[17px] font-bold tracking-[-0.17px]"
          >
            {t("Get Your Fare Now")}
          </Button>
        </div>
        <AppStoreButtons className="justify-center" />
      </div>
    </section>
  );
}
