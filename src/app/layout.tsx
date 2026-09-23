import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Rubik } from "next/font/google";

import { APP_DESCRIPTION, APP_NAME } from "@/constants";
import { LanguageProvider } from "@/lib/i18n/language-context";

import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Rubik supports Hebrew glyphs and is used automatically when dir="rtl"
// (see globals.css) so Hebrew text keeps a matching, legible typeface.
const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin", "hebrew"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} — Premium Airport Transfers`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${plusJakarta.variable} ${rubik.variable} h-full scroll-smooth`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
