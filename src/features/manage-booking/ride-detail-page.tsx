"use client";

import Link from "next/link";
import { ArrowLeft, MapPin, User } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { DetailRow } from "@/features/booking/components/detail-row";
import { formatFare } from "@/features/booking/lib/booking-formatters";
import { getRideById } from "@/features/manage-booking/lib/rides-data";
import { useLanguage } from "@/lib/i18n/language-context";

type RideDetailPageProps = {
  rideId: string;
};

export function RideDetailPage({ rideId }: RideDetailPageProps) {
  const ride = getRideById(rideId);
  const { t } = useLanguage();

  if (!ride) {
    return (
      <PageShell>
        <section className="bg-background py-16 text-center">
          <p className="text-subtext">{t("Ride not found.")}</p>
          <Link href="/my-rides" className="mt-4 inline-block text-primary">
            {t("Back to My Rides")}
          </Link>
        </section>
      </PageShell>
    );
  }

  const driver = ride.driver;

  return (
    <PageShell>
      <section className="bg-background py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          {/* Outer container with large rounded corners */}
          <div className="rounded-[32px] border border-stroke/70 bg-[#f8fbff]/70 p-4 sm:p-8 lg:p-10 shadow-xs sm:rounded-[40px]">
            {/* White content container */}
            <div className="rounded-2xl border border-stroke bg-white p-6 shadow-sm sm:p-8">
              <Link
                href="/my-rides"
                className="mb-6 inline-flex cursor-pointer items-center gap-2 text-xl font-extrabold text-primary-2 transition hover:text-primary sm:text-2xl"
              >
                <ArrowLeft className="h-5 w-5 text-primary-2" />
                {t("My Rides")}
              </Link>

              {ride.driverAssigned && driver && (
                <div className="mb-6 rounded-xl border border-success/20 bg-success/5 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-success" />
                    <span className="font-semibold text-success">
                      {t("Driver Assigned")}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-subtext">
                    {t("Your driver is confirmed")}
                  </p>
                </div>
              )}

              {driver && (
                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-[0.72px] text-subtext">
                    {t("YOUR DRIVER")}
                  </p>
                  <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-center gap-4">
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-7 w-7 text-primary" />
                      </span>
                      <div>
                        <p className="text-lg font-bold text-primary-2">
                          {driver.name}
                        </p>
                        <p className="text-sm text-subtext">
                          {driver.rating} · {driver.trips} {t("trips")}
                        </p>
                        {driver.verified && (
                          <span className="mt-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                            {t("Verified Driver")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-4 border-t border-stroke pt-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.72px] text-subtext">
                        {t("Vehicle")}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-primary-2">
                        {driver.vehicle}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.72px] text-subtext">
                        {t("Color")}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-primary-2">
                        {driver.color}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.72px] text-subtext">
                        {t("License")}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-primary-2">
                        {driver.license}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.72px] text-subtext">
                  {t("TRIP DETAILS")}
                </p>
                <div className="mt-4 divide-y divide-stroke">
                  <DetailRow label="Direction" value={ride.from} />
                  <DetailRow label="Pickup" value={ride.pickup} />
                  <DetailRow label="Destination" value={ride.destination} />
                  <DetailRow label="Date" value={ride.date} />
                  <DetailRow label="Time" value={ride.time} />
                  {ride.flight && (
                    <DetailRow label="Flight" value={ride.flight} />
                  )}
                  <DetailRow label="Passengers" value={ride.passengers} />
                  <DetailRow label="Luggage" value={ride.luggage} />
                  <DetailRow label="Vehicle" value={ride.vehicle} />
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-stroke pt-4">
                  <span className="font-semibold text-primary-2">{t("Total Fare")}</span>
                  <span className="text-2xl font-extrabold text-primary-2">
                    {formatFare(ride.fareAmount)}
                  </span>
                </div>

                {ride.paymentDetail && (
                  <div className="mt-4 flex items-center justify-between rounded-xl border border-stroke bg-[#f8fafc] px-4 py-3">
                    <span className="text-sm text-subtext">{t("Payment Method")}</span>
                    <span className="text-sm font-semibold text-primary-2">
                      {ride.paymentDetail}
                    </span>
                  </div>
                )}
              </div>

              {ride.driverAssigned && (
                <Link
                  href={`/my-rides/${ride.id}/track`}
                  className="mt-6 block cursor-pointer"
                >
                  <Button
                    size="lg"
                    className="h-12 w-full cursor-pointer gap-2 rounded-[10px]"
                  >
                    <MapPin className="h-4 w-4" />
                    {t("Track Driver")}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
