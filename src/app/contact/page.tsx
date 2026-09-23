import type { Metadata } from "next";

import { ContactPage } from "@/features/contact/contact-page";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with FlyTaxi for booking support and inquiries.",
};

export default function Page() {
  return <ContactPage />;
}
