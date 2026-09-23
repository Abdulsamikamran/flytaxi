"use client";

import { Logo } from "@/components/ui/logo";
import { APP_DESCRIPTION, FOOTER_LINKS } from "@/constants";
import { useLanguage } from "@/lib/i18n/language-context";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="overflow-hidden bg-primary-2 text-subtext">
      <div className="mx-auto max-w-[1347px] px-4 py-16 sm:px-6 lg:px-8 xl:px-[101px]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,220px)_repeat(4,minmax(0,1fr))] lg:gap-x-8 xl:gap-x-12 2xl:gap-x-[104px]">
          <div className="min-w-0 sm:col-span-2 lg:col-span-1">
            <Logo variant="footer" />
            <p className="mt-4 text-sm leading-[23.8px] text-subtext">
              {t(APP_DESCRIPTION)}
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title} className="min-w-0">
              <h4 className="text-[13px] font-bold uppercase tracking-[1.04px] text-footer-heading">
                {t(title)}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[14.4px] leading-[21.6px] text-subtext transition-colors hover:text-[#f8fbff]"
                    >
                      {t(link)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-white/[0.08] pt-10 text-center">
          <p className="mx-auto max-w-4xl text-pretty text-sm text-[#f8fbff] sm:text-base xl:text-xl">
            {t(
              "© 2026 FLYTAXI. All rights reserved. Israel's premium airport taxi service.",
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
