"use client";

import Link from "next/link";

import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

type DetailCardProps = {
  title: string;
  children: React.ReactNode;
  editHref?: string;
  className?: string;
};

export function DetailCard({
  title,
  children,
  editHref,
  className,
}: DetailCardProps) {
  const { t } = useLanguage();
  return (
    <div
      className={cn(
        "rounded-xl border border-stroke bg-white p-4 sm:p-5",
        className,
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-xs font-bold uppercase tracking-[0.72px] text-subtext">
          {t(title)}
        </h3>
        {editHref && (
          <Link
            href={editHref}
            className="cursor-pointer text-xs font-semibold text-primary hover:underline"
          >
            {t("Edit")}
          </Link>
        )}
      </div>
      <div className="divide-y divide-stroke">{children}</div>
    </div>
  );
}
