"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { BookingBackButton } from "@/features/booking/components/booking-back-button";
import { BookingFlowLayout } from "@/features/booking/components/booking-flow-layout";
import { BookingStepper } from "@/features/booking/components/booking-stepper";
import { useRequireFareCalculated } from "@/features/booking/hooks/use-booking-navigation";

type BookingStubStepProps = {
  step: number;
  title: string;
  description: string;
};

export function BookingStubStep({
  step,
  title,
  description,
}: BookingStubStepProps) {
  useRequireFareCalculated();

  return (
    <BookingFlowLayout>
      <BookingStepper currentStep={step} />
      <BookingBackButton />

      <div className="py-8 text-center">
        <h1 className="text-2xl font-extrabold text-primary-2">{title}</h1>
        <p className="mt-3 text-subtext">{description}</p>
        <p className="mt-2 text-sm text-subtext">
          This step will be implemented when design screenshots are provided.
        </p>
        <Link href="/book/review" className="mt-6 inline-block">
          <Button variant="outline">Back to Review</Button>
        </Link>
      </div>
    </BookingFlowLayout>
  );
}
