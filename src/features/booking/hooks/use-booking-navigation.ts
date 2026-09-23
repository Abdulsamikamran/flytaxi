"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { useBooking } from "@/features/booking/context/booking-context";
import { BOOKING_STEPS } from "@/constants";

function getConfirmBackPath(paymentMethod: string): string {
  return paymentMethod === "bit" ? "/book/bit" : "/book/payment";
}

export function useCurrentBookingStep(): number {
  const pathname = usePathname();
  if (pathname.startsWith("/book/payment") || pathname.startsWith("/book/confirm")) {
    return 5;
  }
  return (
    BOOKING_STEPS.find((step) => pathname.startsWith(step.path))?.id ?? 1
  );
}

export function useBookingNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { booking } = useBooking();
  const currentStep = useCurrentBookingStep();

  const goTo = (path: string) => router.push(path);

  const goBack = () => {
    if (pathname.startsWith("/book/payment")) {
      router.push("/book/verify");
      return;
    }
    if (pathname.startsWith("/book/bit")) {
      router.push("/book/payment");
      return;
    }
    if (pathname.startsWith("/book/confirm")) {
      router.push(getConfirmBackPath(booking.paymentMethod));
      return;
    }

    const index = BOOKING_STEPS.findIndex((step) =>
      pathname.startsWith(step.path),
    );
    if (index > 0) {
      router.push(BOOKING_STEPS[index - 1].path);
      return;
    }
    router.push("/");
  };

  const previousStepPath =
    BOOKING_STEPS.find((step) => step.id === currentStep - 1)?.path ?? "/";

  return { currentStep, goTo, goBack, previousStepPath, booking };
}

export function useRequireFareCalculated(redirectTo = "/book/fare") {
  const router = useRouter();
  const { booking } = useBooking();

  useEffect(() => {
    if (!booking.fareCalculated) {
      router.replace(redirectTo);
    }
  }, [booking.fareCalculated, redirectTo, router]);
}

export function useRequireOtpVerified(redirectTo = "/book/verify") {
  const router = useRouter();
  const pathname = usePathname();
  const { booking } = useBooking();

  useEffect(() => {
    if (
      pathname.startsWith("/book/payment") &&
      !booking.otpVerified
    ) {
      router.replace(redirectTo);
    }
  }, [booking.otpVerified, pathname, redirectTo, router]);
}
