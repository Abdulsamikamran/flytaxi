"use client";

import { Check } from "lucide-react";

import { figmaIcons } from "@/assets/figma-icons";
import { Button } from "@/components/ui/button";
import { FigmaIcon } from "@/components/ui/figma-icon";
import { SERVICES } from "@/constants";
import { useLanguage } from "@/lib/i18n/language-context";

export function ServicesSection() {
  const { t } = useLanguage();
  return (
    <section id="services" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-primary-dark sm:text-4xl lg:text-5xl">
            {t("Airport Transfer Services")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-subtext sm:text-lg">
            {t("Direct, fixed-price transfers to and from Ben Gurion Airport")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {SERVICES.map((service) => (
            <article
              key={service.title}
              className="rounded-2xl border border-stroke bg-background p-6 sm:p-8"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <FigmaIcon
                  src={figmaIcons.airplaneTo}
                  size={28}
                  className="h-7 w-7"
                />
              </div>
              <h3 className="mt-6 text-xl font-bold text-primary-dark sm:text-2xl">
                {t(service.title)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-subtext sm:text-base">
                {t(service.description)}
              </p>
              <ul className="mt-6 space-y-3">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-sm text-primary-dark sm:text-base"
                  >
                    <Check className="h-4 w-4 shrink-0 text-success" strokeWidth={3} />
                    {t(feature)}
                  </li>
                ))}
              </ul>
              <Button className="mt-8 w-full sm:w-auto">{t(service.cta)}</Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
