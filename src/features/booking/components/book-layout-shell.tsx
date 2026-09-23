"use client";

import { PageShell } from "@/components/layout/page-shell";
import { BookingProvider } from "@/features/booking/context/booking-context";

type BookLayoutShellProps = {
  children: React.ReactNode;
};

export function BookLayoutShell({ children }: BookLayoutShellProps) {
  return (
    <BookingProvider>
      <PageShell>{children}</PageShell>
    </BookingProvider>
  );
}
