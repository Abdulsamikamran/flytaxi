import { Check } from "lucide-react";

import { BOOKING_STEPS } from "@/constants";
import { cn } from "@/lib/utils";

type BookingStepperProps = {
  currentStep?: number;
  allCompleted?: boolean;
};

export function BookingStepper({
  currentStep = 5,
  allCompleted = false,
}: BookingStepperProps) {
  return (
    <div className="flex items-center justify-center">
      {BOOKING_STEPS.map((step, index) => {
        const isCompleted = allCompleted || step.id < currentStep;
        const isActive = !allCompleted && step.id === currentStep;
        const isLast = index === BOOKING_STEPS.length - 1;

        return (
          <div key={step.id} className="flex items-center">
            <div
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors",
                isCompleted && "bg-success text-white",
                isActive && "bg-primary text-white",
                !isCompleted &&
                  !isActive &&
                  "border border-stroke bg-white text-subtext",
              )}
              aria-current={isActive ? "step" : undefined}
            >
              {isCompleted ? (
                <Check className="h-4 w-4" strokeWidth={3} />
              ) : (
                step.id
              )}
            </div>
            {!isLast && (
              <div
                className={cn(
                  "h-0.5 w-7 sm:w-12 lg:w-14",
                  isCompleted ? "bg-success" : "bg-stroke",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
