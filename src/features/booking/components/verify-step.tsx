"use client";

import { Smartphone } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useBooking } from "@/features/booking/context/booking-context";
import { BookingBackButton } from "@/features/booking/components/booking-back-button";
import { BookingFlowLayout } from "@/features/booking/components/booking-flow-layout";
import { BookingStepper } from "@/features/booking/components/booking-stepper";
import { OtpInput } from "@/features/booking/components/otp-input";
import {
  useBookingNavigation,
  useRequireFareCalculated,
} from "@/features/booking/hooks/use-booking-navigation";
import { useLanguage } from "@/lib/i18n/language-context";

function maskPhone(phone: string): string {
  if (!phone) return "your phone";
  if (phone.length <= 4) return phone;
  return `${phone.slice(0, 3)}${"•".repeat(Math.min(phone.length - 3, 6))}`;
}

export function VerifyStep() {
  const { booking, setBooking } = useBooking();
  const { goTo } = useBookingNavigation();
  const [otp, setOtp] = useState("");
  const [resendSeconds, setResendSeconds] = useState(25);
  const { t, locale } = useLanguage();
  useRequireFareCalculated();

  useEffect(() => {
    if (resendSeconds <= 0) return;
    const timer = window.setInterval(() => {
      setResendSeconds((s) => Math.max(0, s - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [resendSeconds]);

  const handleVerify = () => {
    setBooking({ otpVerified: true });
    goTo("/book/payment");
  };

  return (
    <BookingFlowLayout stepper={<BookingStepper currentStep={5} />}>
      <BookingBackButton />

      <div className="mx-auto max-w-md py-4 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <Smartphone className="h-7 w-7 text-primary" />
        </div>

        <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-primary-2">
          {t("Verify Your Number")}
        </h1>
        <p className="mt-2 text-sm text-subtext">
          {t("We sent a 6-digit code to")}{" "}
          <span className="font-semibold text-primary-2 ltr-content">
            {maskPhone(booking.phone)}
          </span>
        </p>

        <div className="mt-8">
          <OtpInput value={otp} onChange={setOtp} />
        </div>

        <p className="mt-4 text-sm text-subtext">
          {resendSeconds > 0 ? (
            <>
              {t("Resend code in")} {resendSeconds}
              {locale === "he" ? " שנ׳" : "s"}
            </>
          ) : (
            <button
              type="button"
              className="cursor-pointer font-semibold text-primary hover:underline"
              onClick={() => setResendSeconds(25)}
            >
              {t("Resend code")}
            </button>
          )}
        </p>

        <Button
          size="lg"
          className="mt-6 h-12 w-full rounded-[10px]"
          onClick={handleVerify}
          disabled={otp.length < 6}
        >
          {t("Verify & Continue")}
        </Button>

        <div className="mt-6 rounded-xl bg-[#f1f5f9] px-4 py-3 text-left text-xs leading-relaxed text-subtext">
          {t(
            "SMS verification is used to confirm your identity and associate this booking with your phone number for future access. No password is required.",
          )}
        </div>
      </div>
    </BookingFlowLayout>
  );
}
