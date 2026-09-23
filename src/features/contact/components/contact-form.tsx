"use client";

import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";

const inputClass =
  "mt-1.5 w-full rounded-[10px] border border-stroke bg-white px-4 py-3 text-sm text-primary-2 placeholder:text-subtext/70 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15";

const labelClass =
  "text-xs font-semibold uppercase tracking-[0.72px] text-subtext";

export function ContactForm() {
  const { t } = useLanguage();
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <label className={labelClass}>
          {t("Full Name")}
          <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          placeholder={t("David Cohen")}
          className={inputClass}
          required
        />
      </div>

      <div className="mt-4">
        <label className={labelClass}>
          {t("Phone")}
          <span className="text-primary">*</span>
        </label>
        <input
          type="tel"
          placeholder={t("+972 50 000 0000")}
          className={`${inputClass} ltr-content`}
          required
        />
      </div>

      <div className="mt-4">
        <label className={labelClass}>{t("Email")}</label>
        <input
          type="email"
          placeholder="you@example.com"
          className={`${inputClass} ltr-content`}
        />
      </div>

      <div className="mt-4">
        <label className={labelClass}>
          {t("Message")}
          <span className="text-primary">*</span>
        </label>
        <textarea
          rows={5}
          placeholder={t("How can we help you?")}
          className={`${inputClass} resize-none`}
          required
        />
      </div>

      <Button type="submit" size="lg" className="mt-6 gap-2 rounded-[10px]">
        <Send className="h-4 w-4" />
        {t("Send Message")}
      </Button>
    </form>
  );
}
