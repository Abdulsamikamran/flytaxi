"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { InnerPageHero } from "@/components/ui/inner-page-hero";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO } from "@/constants";
import { useLanguage } from "@/lib/i18n/language-context";

import { ContactForm } from "./components/contact-form";

const CONTACT_ROWS = [
  {
    icon: Phone,
    label: "Phone",
    value: CONTACT_INFO.phone,
    note: CONTACT_INFO.phoneNote,
    href: `tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: CONTACT_INFO.email,
    note: CONTACT_INFO.emailNote,
    href: `mailto:${CONTACT_INFO.email}`,
  },
  {
    icon: MapPin,
    label: "Service Area",
    value: CONTACT_INFO.serviceArea,
    note: CONTACT_INFO.serviceAreaNote,
  },
] as const;

export function ContactPage() {
  const { t } = useLanguage();
  return (
    <PageShell>
      <InnerPageHero
        variant="contact"
        badge={t("Get in Touch")}
        title={t("Contact FLYTAXI")}
        description={t("Questions, special requests, or need help with a booking?")}
      />

      <section className="bg-background py-12 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <h2 className="text-xl font-bold text-primary-2 sm:text-2xl">
              {t("Contact Information")}
            </h2>

            <ul className="mt-8 space-y-8">
              {CONTACT_ROWS.map((row) => (
                <li key={row.label} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <row.icon className="h-5 w-5 text-primary" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.72px] text-subtext">
                      {t(row.label)}
                    </p>
                    {"href" in row && row.href ? (
                      <a
                        href={row.href}
                        className="ltr-content mt-1 block text-base font-bold text-primary-2 hover:text-primary"
                      >
                        {t(row.value)}
                      </a>
                    ) : (
                      <p className="mt-1 text-base font-bold text-primary-2">
                        {t(row.value)}
                      </p>
                    )}
                    <p className="mt-0.5 text-sm text-subtext">{t(row.note)}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t border-stroke pt-8">
              <p className="text-sm font-semibold uppercase tracking-[0.72px] text-subtext">
                {t("Quick Actions")}
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <Link href="/#booking">
                  <Button size="lg" className="h-12 w-full rounded-[10px]">
                    {t("Book a Transfer")}
                  </Button>
                </Link>
                <Link href="/faq">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 w-full rounded-[10px]"
                  >
                    {t("View FAQ")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-primary-2 sm:text-2xl">
              {t("Send a Message")}
            </h2>
            <div className="mt-6 rounded-2xl border border-stroke bg-white p-6 shadow-sm sm:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
