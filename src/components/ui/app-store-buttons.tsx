"use client";

import { figmaIcons } from "@/assets/figma-icons";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

import { FigmaIcon } from "./figma-icon";

type AppStoreButtonsProps = {
  className?: string;
};

export function AppStoreButtons({ className }: AppStoreButtonsProps) {
  const { t } = useLanguage();
  return (
    <div className={cn("flex flex-wrap items-center gap-[9px]", className)}>
      <a
        href="#"
        className="flex h-[66px] w-[236px] max-w-full items-center justify-center gap-1 rounded-xl bg-white px-6 transition hover:bg-white/90"
      >
        <FigmaIcon src={figmaIcons.googlePlay} size={40} className="h-10 w-9" />
        <div className="text-left leading-tight text-[#050505]">
          <p className="text-[10px] font-medium uppercase">{t("Get it on")}</p>
          <p className="text-xl font-semibold">{t("Google Play")}</p>
        </div>
      </a>
      <a
        href="#"
        className="flex h-[66px] w-[236px] max-w-full items-center justify-center gap-1 rounded-xl bg-white px-6 transition hover:bg-white/90"
      >
        <FigmaIcon src={figmaIcons.apple} size={40} className="h-10 w-10" />
        <div className="text-left leading-tight text-[#050505]">
          <p className="text-[10px] font-medium uppercase">{t("Get it on")}</p>
          <p className="text-xl font-semibold">{t("Apple Store")}</p>
        </div>
      </a>
    </div>
  );
}
