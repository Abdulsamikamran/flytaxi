"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: readonly FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useLanguage();

  return (
    <div className="divide-y divide-stroke border-y border-stroke bg-white">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 px-1 py-5 text-left sm:px-2"
              aria-expanded={isOpen}
            >
              <span className="text-base font-semibold text-primary-2 sm:text-lg">
                {t(item.question)}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-subtext transition-transform",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            {isOpen && (
              <div className="pb-5 pr-8">
                <p className="text-sm leading-relaxed text-subtext sm:text-base">
                  {t(item.answer)}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
