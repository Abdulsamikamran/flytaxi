import type { Metadata } from "next";

import { FaqPage } from "@/features/faq/faq-page";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about FlyTaxi airport transfers.",
};

export default function Page() {
  return <FaqPage />;
}
