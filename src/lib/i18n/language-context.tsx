"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { localeRef } from "./locale-store";
import { isRtl, translate, type Locale } from "./translations";

const STORAGE_KEY = "flytaxi-locale";

type LanguageContextValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (text: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  // Restore saved preference on mount (client only).
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "he") {
        localeRef.current = stored;
        setLocaleState(stored);
      }
    } catch {
      // localStorage unavailable — default to English
    }
  }, []);

  // Sync <html> lang/dir + persist whenever locale changes.
  useEffect(() => {
    localeRef.current = locale;
    document.documentElement.lang = locale;
    document.documentElement.dir = isRtl(locale) ? "rtl" : "ltr";
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // ignore write failures (private browsing, etc.)
    }
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    localeRef.current = next;
    setLocaleState(next);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "he" : "en");
  }, [locale, setLocale]);

  const t = useCallback((text: string) => translate(text, locale), [locale]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      dir: isRtl(locale) ? "rtl" : "ltr",
      setLocale,
      toggleLocale,
      t,
    }),
    [locale, setLocale, toggleLocale, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
