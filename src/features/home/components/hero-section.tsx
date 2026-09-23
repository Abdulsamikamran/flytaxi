"use client";

import { figmaIcons } from "@/assets/figma-icons";
import { AppStoreButtons } from "@/components/ui/app-store-buttons";
import { FigmaIcon } from "@/components/ui/figma-icon";
import { HERO_FEATURES } from "@/constants";
import { useLanguage } from "@/lib/i18n/language-context";

import { BookingWidget } from "./booking-widget";

const HERO_GRADIENT =
  "linear-gradient(152.39deg, rgba(11, 31, 51, 0.98) 0%, rgba(11, 31, 51, 0.75) 60%, rgba(11, 35, 58, 0.582) 70%, rgba(12, 41, 71, 0.415) 80%, rgba(14, 56, 100, 0.248) 90%, rgba(16, 76, 138, 0.164) 95%, rgba(18, 96, 177, 0.122) 97.5%, rgba(22, 136, 255, 0.08) 100%)";

export function HeroSection() {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-[#0b1f33]">
      {/*
        Background layers match Figma node 3239:5679.
        Do NOT use a PNG export of the whole hero section as a bg image —
        that bakes in text and creates ghost copy behind the content.
        Map texture (3239:5680) is omitted until the map-only asset is exported.
      */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: HERO_GRADIENT }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(22,136,255,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1354px] px-4 py-12 pb-24 sm:px-6 sm:py-16 sm:pb-28 lg:px-8 lg:py-20 lg:pb-32 xl:px-[90px] xl:py-12 xl:pb-36">
        <div className="flex flex-col items-stretch gap-10 lg:grid lg:grid-cols-[minmax(0,1.3fr)_minmax(360px,1fr)] lg:items-center lg:gap-8 xl:gap-12 2xl:gap-[117px]">
          <div className="w-full min-w-0">
            <div className="mb-2 inline-flex h-9 max-w-full items-center gap-1.5 rounded-full border border-primary/25 bg-primary/[0.14] px-2.5 py-1 lg:h-[38px] xl:h-[41px]">
              <FigmaIcon src={figmaIcons.badgeCar}  />
              <span className="truncate text-sm font-semibold text-primary sm:text-base xl:text-xl">
                {t("Ben Gurion Airport Transfer")}
              </span>
            </div>

            <div className="flex flex-col gap-10 lg:gap-8 xl:gap-16">
              <div className="flex flex-col gap-5 lg:gap-4 xl:gap-[25px]">
                <div className="flex flex-col gap-3 lg:gap-4 xl:gap-5">
                  <h1 className="text-[32px] font-extrabold leading-tight text-white sm:text-[40px] lg:text-[34px] lg:leading-[1.2] xl:text-[44px] 2xl:text-[48px] 2xl:leading-[1.15]">
                    {t("Your Premium Transfer To & From Ben Gurion Airport")}
                  </h1>
                  <p className="text-base text-white sm:text-lg lg:text-base xl:text-lg">
                    {t("Fixed fares. No surprises. Book in minutes.")}
                  </p>
                </div>

                <ul className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                  {HERO_FEATURES.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-1.5 text-sm text-white/60 sm:text-base lg:text-sm xl:text-xl"
                    >
                      <FigmaIcon
                        src={figmaIcons.tick}
                        size={36}
                        className="h-7 w-7 shrink-0 xl:h-9 xl:w-9"
                      />
                      {t(feature)}
                    </li>
                  ))}
                </ul>
              </div>

              <AppStoreButtons />
            </div>
          </div>

          <div className="w-full min-w-0">
            <BookingWidget />
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center gap-1.5 opacity-40 sm:mt-24 lg:absolute lg:bottom-12 lg:mt-0 lg:left-1/2 lg:-translate-x-1/2 xl:bottom-16">
          <span className="text-base font-semibold uppercase tracking-[1.1px] text-white">
            {t("Scroll to explore")}
          </span>
          <FigmaIcon src={figmaIcons.scrollDown} size={16} className="h-4 w-4" />
        </div>
      </div>
    </section>
  );
}
