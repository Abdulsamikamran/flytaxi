"use client";

import { Check } from "lucide-react";

import { figmaIcons } from "@/assets/figma-icons";
import { Button } from "@/components/ui/button";
import { FigmaIcon } from "@/components/ui/figma-icon";
import { HOW_IT_WORKS_STEPS } from "@/constants";
import { useLanguage } from "@/lib/i18n/language-context";

function StepIcon({ icon }: { icon: (typeof HOW_IT_WORKS_STEPS)[number]["icon"] }) {
  if (icon === "plane") {
    return (
      <FigmaIcon src={figmaIcons.airplaneTo} size={24} className="h-6 w-6" />
    );
  }
  if (icon === "fare") {
    return <span className="text-xl font-bold text-white">₪</span>;
  }
  return <Check className="h-6 w-6 text-white" strokeWidth={3} />;
}

export function HowItWorksSection() {
  const { t } = useLanguage();
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary">
            {t("3 Simple Steps")}
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-primary-dark sm:text-4xl lg:text-5xl">
            {t("How It Works")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-subtext sm:text-lg">
            {t("From first click to confirmed booking in minutes")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <article
              key={step.step}
              className="relative rounded-2xl border border-stroke bg-white p-6 shadow-sm sm:p-8"
            >
              <span className="absolute right-6 top-4 text-5xl font-extrabold text-primary/30 sm:text-6xl">
                {step.step}
              </span>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                <StepIcon icon={step.icon} />
              </div>
              <h3 className="mt-5 text-xl font-bold text-primary-dark">
                {t(step.title)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-subtext sm:text-base">
                {t(step.description)}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="px-8">
            {t("Calculate Your Fare Now")}
          </Button>
        </div>
      </div>
    </section>
  );
}
