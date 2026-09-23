"use client";

import { Car, Clock } from "lucide-react";

import { useLanguage } from "@/lib/i18n/language-context";

type TrackDriverMapProps = {
  driverName?: string;
  etaText?: string;
};

export function TrackDriverMap({
  driverName = "Moshe L.",
  etaText = "~12 min away",
}: TrackDriverMapProps) {
  const { t } = useLanguage();
  return (
    <div className="relative h-[280px] w-full overflow-hidden rounded-2xl border border-primary/15 bg-[#e6f2fd] sm:h-[340px] md:h-[380px]">
      {/* Subtle map decorative roads/curves */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Soft background road lines */}
        <path
          d="M -20,120 Q 200,80 500,160 T 1000,100"
          fill="none"
          stroke="#d3e7fc"
          strokeWidth="14"
        />
        <path
          d="M 100,-20 Q 250,200 450,450"
          fill="none"
          stroke="#d3e7fc"
          strokeWidth="10"
        />
        <path
          d="M 300,420 Q 600,280 850,-20"
          fill="none"
          stroke="#d3e7fc"
          strokeWidth="12"
        />
        <path
          d="M -30,300 C 180,260 400,340 700,280"
          fill="none"
          stroke="#d8ebfd"
          strokeWidth="8"
        />

        {/* Dashed route line from bottom-left to top-right */}
        <path
          d="M 140,320 C 320,290 560,200 780,100"
          fill="none"
          stroke="#70b5f9"
          strokeWidth="4.5"
          strokeDasharray="8 8"
          strokeLinecap="round"
        />
      </svg>

      {/* Floating ETA Pill */}
      <div className="absolute left-[50%] top-[14%] -translate-x-1/2">
        <div className="flex items-center gap-2 rounded-full border border-stroke/70 bg-white/95 px-3.5 py-1.5 shadow-md backdrop-blur-xs">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-amber-600">
            <Clock className="h-3.5 w-3.5" strokeWidth={2.5} />
          </div>
          <span className="text-xs font-bold text-primary-2 sm:text-sm">
            {etaText}
          </span>
        </div>
      </div>

      {/* Pickup Marker (Green) */}
      <div className="absolute left-[28%] top-[68%] -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center">
          <span className="rounded-full bg-[#10b981] px-2.5 py-0.5 text-[11px] font-bold text-white shadow-sm">
            {t("Pickup")}
          </span>
          <div className="mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#10b981]/25 ring-2 ring-[#10b981]/40">
            <div className="h-2 w-2 rounded-full bg-[#10b981] ring-1 ring-white" />
          </div>
        </div>
      </div>

      {/* Driver Location Marker (Moshe L.) */}
      <div className="absolute left-[39%] top-[60%] -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-primary text-white shadow-md">
            <Car className="h-4.5 w-4.5" />
          </div>
          <span className="mt-1 rounded-full border border-stroke/60 bg-white px-2 py-0.5 text-[11px] font-bold text-primary-2 shadow-xs">
            {driverName}
          </span>
        </div>
      </div>

      {/* Destination Marker (Red) */}
      <div className="absolute right-[20%] top-[24%] translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center">
          <span className="rounded-full bg-[#ef4444] px-2.5 py-0.5 text-[11px] font-bold text-white shadow-sm">
            {t("Destination")}
          </span>
          <div className="mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ef4444]/25 ring-2 ring-[#ef4444]/40">
            <div className="h-2 w-2 rounded-full bg-[#ef4444] ring-1 ring-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
