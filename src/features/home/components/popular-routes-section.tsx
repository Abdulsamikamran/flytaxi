"use client";

import { ArrowRight, MapPin } from "lucide-react";

import { POPULAR_ROUTES } from "@/constants";
import { useLanguage } from "@/lib/i18n/language-context";

export function PopularRoutesSection() {
  const { t, dir } = useLanguage();
  return (
    <section id="popular-routes" className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-primary-dark sm:text-4xl lg:text-5xl">
            {t("Popular Routes")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-subtext sm:text-lg">
            {t("Click any route to pre-fill your booking")}
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {POPULAR_ROUTES.map((route) => (
            <button
              key={`${route.from}-${route.to}`}
              type="button"
              className="group flex items-center gap-4 rounded-xl border border-stroke bg-white p-4 text-left transition hover:border-primary/30 hover:shadow-md sm:p-5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <MapPin className="h-4 w-4 text-primary" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-primary-dark">
                  {t(route.from)}
                </p>
                <p className="flex items-center gap-1 truncate text-sm text-subtext">
                  <ArrowRight
                    className="h-3.5 w-3.5 shrink-0"
                    style={dir === "rtl" ? { transform: "scaleX(-1)" } : undefined}
                  />
                  {t(route.to)}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {t("Live fare")}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
