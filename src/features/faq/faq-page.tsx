"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { PageShell } from "@/components/layout/page-shell";
import { InnerPageHero } from "@/components/ui/inner-page-hero";
import { Button } from "@/components/ui/button";
import { FAQ_ITEMS, FAQ_TABS } from "@/constants";
import { useLanguage } from "@/lib/i18n/language-context";

import { FaqAccordion } from "./components/faq-accordion";
import { FaqTabs, type FaqTabId } from "./components/faq-tabs";

export function FaqPage() {
  const [activeTab, setActiveTab] = useState<FaqTabId>("all");
  const { t } = useLanguage();

  const visibleItems = useMemo(() => {
    if (activeTab === "all") return [...FAQ_ITEMS];
    return FAQ_ITEMS.filter((item) => item.category === activeTab);
  }, [activeTab]);

  return (
    <PageShell>
      <InnerPageHero
        variant="faq"
        badge={t("FAQ")}
        title={t("Frequently Asked Questions")}
        description={t("Everything you need to know about FLYTAXI transfers")}
      />

      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <FaqTabs tabs={FAQ_TABS} active={activeTab} onChange={setActiveTab} />
          <div className="mt-8 sm:mt-10">
            <FaqAccordion items={visibleItems} key={activeTab} />
          </div>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <div className="rounded-2xl border border-stroke bg-white p-8 text-center shadow-sm sm:p-10">
            <h2 className="text-xl font-bold text-primary-2 sm:text-2xl">
              {t("Still have questions?")}
            </h2>
            <p className="mt-2 text-sm text-subtext sm:text-base">
              {t("Our team is here to help.")}
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto">
                  {t("Contact Us")}
                </Button>
              </Link>
              <Link href="/#booking">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  {t("Book a Transfer")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
