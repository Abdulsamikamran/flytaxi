"use client";

import { Globe, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { NAV_LINKS } from "@/constants";
import { useLanguage } from "@/lib/i18n/language-context";
import { getToggleLocaleLabel } from "@/lib/i18n/translations";
import { cn } from "@/lib/utils";

function isLinkActive(pathname: string, href: string) {
  // Home scroll anchors — scroll only, never show as selected
  if (href.startsWith("/#")) {
    return false;
  }
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isManageBookingActive(pathname: string) {
  return pathname.startsWith("/my-rides");
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { locale, toggleLocale, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-stroke bg-white/95 shadow-[0_1px_8px_rgba(11,31,51,0.06)] backdrop-blur-md">
      <div className="mx-auto flex h-[72px]  items-center justify-between gap-4 px-4 sm:px-6 lg:px-20">
        <Logo variant="header" />

        <nav className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map((link) => {
            const active = isLinkActive(pathname, link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-subtext hover:text-primary-dark",
                )}
              >
                {t(link.label)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={toggleLocale}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#f1f5f9] px-3 py-1.5 text-sm font-semibold text-subtext transition hover:bg-[#e6edf5]"
            aria-label={t("Language")}
          >
            <Globe className="h-4 w-4" />
            {getToggleLocaleLabel(locale)}
          </button>
          <Link href="/my-rides">
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "hidden cursor-pointer lg:inline-flex",
                isManageBookingActive(pathname) &&
                  "border-primary/30 bg-primary/10 text-primary",
              )}
            >
              {t("Manage Booking")}
            </Button>
          </Link>
          <Link href="/#booking">
            <Button size="sm" className="cursor-pointer">
              {t("Book Now")}
            </Button>
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex cursor-pointer rounded-lg p-2 text-primary-dark md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-stroke bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const active = isLinkActive(pathname, link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm font-semibold",
                    active ? "bg-primary/15 text-primary" : "text-subtext",
                  )}
                >
                  {t(link.label)}
                </Link>
              );
            })}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <button
              type="button"
              onClick={toggleLocale}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-[#f1f5f9] px-3 py-2.5 text-sm font-semibold text-subtext"
            >
              <Globe className="h-4 w-4" />
              {getToggleLocaleLabel(locale)}
            </button>
            <Link
              href="/my-rides"
              className="w-full"
              onClick={() => setMobileOpen(false)}
            >
              <Button
                variant="outline"
                className={cn(
                  "w-full",
                  isManageBookingActive(pathname) &&
                    "border-primary/30 bg-primary/10 text-primary",
                )}
              >
                {t("Manage Booking")}
              </Button>
            </Link>
            <Link href="/#booking" className="w-full" onClick={() => setMobileOpen(false)}>
              <Button className="w-full">{t("Book Now")}</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
