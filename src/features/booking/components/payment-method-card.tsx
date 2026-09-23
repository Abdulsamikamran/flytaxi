"use client";

import { Banknote, Check, CreditCard, Smartphone } from "lucide-react";

import type { PaymentMethod } from "@/features/booking/types/booking-state";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

type PaymentMethodCardProps = {
  id: PaymentMethod;
  label: string;
  description: string;
  badge: string;
  selected: boolean;
  onSelect: () => void;
  online?: boolean;
};

function PaymentIcon({ id }: { id: PaymentMethod }) {
  if (id === "cash") {
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
        <Banknote className="h-5 w-5 text-primary" />
      </span>
    );
  }
  if (id === "bit") {
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ff0066]/10 text-sm font-extrabold text-[#ff0066]">
        bit
      </span>
    );
  }
  if (id === "paybox") {
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-xs font-extrabold text-orange-500">
        pay
      </span>
    );
  }
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
      <CreditCard className="h-5 w-5 text-success" />
    </span>
  );
}

export function PaymentMethodCard({
  id,
  label,
  description,
  badge,
  selected,
  onSelect,
  online = false,
}: PaymentMethodCardProps) {
  const { t } = useLanguage();
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "relative flex w-full cursor-pointer items-center gap-4 rounded-xl border p-4 text-left transition",
        selected
          ? "border-primary bg-primary/[0.04] ring-1 ring-primary/20"
          : "border-stroke bg-white hover:border-primary/30",
      )}
    >
      <PaymentIcon id={id} />
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-primary-2">{t(label)}</p>
        <p className="mt-0.5 text-xs text-subtext">{t(description)}</p>
      </div>
      <span
        className={cn(
          "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide",
          online
            ? "bg-primary/10 text-primary"
            : "bg-[#f1f5f9] text-subtext",
        )}
      >
        {t(badge)}
      </span>
      {selected && (
        <span className="absolute bottom-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
          <Check className="h-3 w-3 text-white" strokeWidth={3} />
        </span>
      )}
      {id === "bit" && !selected && (
        <Smartphone className="absolute bottom-3 right-3 h-4 w-4 text-subtext/40" />
      )}
    </button>
  );
}
