"use client";

import { figmaIcons } from "@/assets/figma-icons";
import { FigmaIcon } from "@/components/ui/figma-icon";
import { WHY_CHOOSE } from "@/constants";
import { useLanguage } from "@/lib/i18n/language-context";

export function WhyChooseSection() {
  const { t } = useLanguage();
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-[80px]">
      <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-[32px] font-extrabold tracking-[-1.2px] text-primary-2 sm:text-[40px] sm:leading-[60px]">
          {t("Why Choose FLYTAXI?")}
        </h2>

        <div className="mt-[52px] grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/[0.07] bg-primary/[0.13] p-6 text-center"
            >
              <div className="flex justify-center">
                {"icon" in item && item.icon ? (
                  <FigmaIcon
                    src={item.icon}
                    size={45}
                    className="h-[45px] w-[45px]"
                  />
                ) : (
                  <span className="text-4xl leading-[54px]" role="img" aria-hidden>
                    📱
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-base font-bold text-primary-2">
                {t(item.title)}
              </h3>
              <p className="mt-2 text-[13px] leading-[21.45px] text-primary-2">
                {t(item.description)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
