import type { Locale } from "./translations";

/**
 * Lightweight non-React mutable ref for the current locale.
 * Read by locale-aware formatter helpers (e.g. booking-formatters.ts)
 * that run outside React render but need the active language.
 * Kept in sync by LanguageProvider on every locale change.
 */
export const localeRef: { current: Locale } = { current: "en" };
