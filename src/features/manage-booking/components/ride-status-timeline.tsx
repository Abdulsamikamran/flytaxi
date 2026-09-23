"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

export const TRACK_STAGES = [
  { id: "assigned", label: "Assigned" },
  { id: "on-the-way", label: "On the Way" },
  { id: "arrived", label: "Arrived" },
  { id: "in-progress", label: "In Progress" },
  { id: "completed", label: "Completed" },
] as const;

export type TrackStageId = (typeof TRACK_STAGES)[number]["id"];

type RideStatusTimelineProps = {
  activeStage: TrackStageId;
  onStageChange?: (stage: TrackStageId) => void;
};

export function RideStatusTimeline({
  activeStage,
  onStageChange,
}: RideStatusTimelineProps) {
  const { t } = useLanguage();
  const isAllCompleted = activeStage === "completed";
  const activeIndex = TRACK_STAGES.findIndex((s) => s.id === activeStage);

  return (
    <div>
      <div className="relative flex items-center justify-between">
        {/* Background connector line */}
        <div className="absolute left-0 top-1/2 z-0 h-0.5 w-full -translate-y-1/2 bg-[#e2e8f0]" />

        {/* Completed connector line */}
        <div
          className={cn(
            "absolute left-0 top-1/2 z-0 h-0.5 -translate-y-1/2 transition-all duration-300",
            isAllCompleted ? "w-full bg-success" : "bg-primary",
          )}
          style={{
            width: isAllCompleted
              ? "100%"
              : `${(activeIndex / (TRACK_STAGES.length - 1)) * 100}%`,
          }}
        />

        {TRACK_STAGES.map((stage, index) => {
          const isCurrent = stage.id === activeStage;
          const isPassed = index < activeIndex;
          const isStageCompleted = isAllCompleted || isPassed;

          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => onStageChange?.(stage.id)}
              className="group relative z-10 flex cursor-pointer flex-col items-center focus:outline-hidden"
              aria-label={`Status: ${stage.label}`}
            >
              {/* Dot */}
              <div
                className={cn(
                  "flex items-center justify-center rounded-full transition-all duration-200",
                  isAllCompleted && "h-3 w-3 bg-success",
                  !isAllCompleted &&
                    isCurrent &&
                    "h-3.5 w-3.5 bg-primary ring-4 ring-primary/20",
                  !isAllCompleted &&
                    isPassed &&
                    "h-3 w-3 bg-primary",
                  !isAllCompleted &&
                    !isCurrent &&
                    !isPassed &&
                    "h-2.5 w-2.5 bg-[#cbd5e1]",
                )}
              />

              {/* Label below dot */}
              <span
                className={cn(
                  "absolute top-5 text-center text-xs font-semibold whitespace-nowrap transition-colors sm:text-sm",
                  isAllCompleted && "text-success",
                  !isAllCompleted && isCurrent && "font-bold text-primary",
                  !isAllCompleted && !isCurrent && "font-medium text-subtext",
                )}
              >
                {t(stage.label)}
              </span>
            </button>
          );
        })}
      </div>
      {/* Spacer for bottom labels */}
      <div className="h-8" />
    </div>
  );
}
