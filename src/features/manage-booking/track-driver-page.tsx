"use client";

import Link from "next/link";
import { ArrowLeft, Car, Star } from "lucide-react";
import { useState } from "react";

import { figmaIcons } from "@/assets/figma-icons";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { FigmaIcon } from "@/components/ui/figma-icon";
import {
  RideStatusTimeline,
  type TrackStageId,
} from "@/features/manage-booking/components/ride-status-timeline";
import { TrackDriverMap } from "@/features/manage-booking/components/track-driver-map";
import { getRideById } from "@/features/manage-booking/lib/rides-data";
import { useLanguage } from "@/lib/i18n/language-context";

type TrackDriverPageProps = {
  rideId: string;
};

export function TrackDriverPage({ rideId }: TrackDriverPageProps) {
  const ride = getRideById(rideId);
  const initialStage: TrackStageId =
    ride?.status === "completed" ? "completed" : "assigned";
  const [stage, setStage] = useState<TrackStageId>(initialStage);
  const { t, dir } = useLanguage();

  if (!ride) {
    return (
      <PageShell>
        <section className="bg-background py-16 text-center">
          <p className="text-subtext">{t("Ride not found.")}</p>
          <Link
            href="/my-rides"
            className="mt-4 inline-block font-semibold text-primary"
          >
            {t("Back to My Rides")}
          </Link>
        </section>
      </PageShell>
    );
  }

  const driver = ride.driver;
  const isCompleted = stage === "completed";

  return (
    <PageShell>
      <section className="bg-background py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          {/* Outer container with large rounded corners matching booking shell */}
          <div className="rounded-[32px] border border-stroke/70 bg-[#f8fbff]/70 p-4 shadow-xs sm:rounded-[40px] sm:p-8 lg:p-10">
            {/* White card container */}
            <div className="rounded-2xl border border-stroke bg-white p-5 shadow-sm sm:p-7">
              {/* Header Row */}
              <div className="mb-5 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Link
                    href={`/my-rides/${ride.id}`}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-primary-2 transition hover:bg-slate-100"
                    aria-label={t("Back to ride details")}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Link>
                  <div>
                    <h1 className="text-xl font-extrabold tracking-tight text-primary-2 sm:text-2xl">
                      {t("Track Your Driver")}
                    </h1>
                    <p className="mt-0.5 text-xs font-medium text-subtext">
                      {ride.id}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  <Car className="h-3.5 w-3.5 text-[#ef4444]" />
                  <span>{t("Driver Assigned")}</span>
                </div>
              </div>

              {/* Map Section */}
              <TrackDriverMap
                driverName={
                  driver?.name
                    ? `${driver.name.split(" ")[0]} L.`
                    : "Moshe L."
                }
                etaText={isCompleted ? t("Trip Completed") : t("~12 min away")}
              />

              {/* Ride Status Section */}
              <div className="mt-6 border-b border-stroke pb-5">
                <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.72px] text-subtext">
                  {t("RIDE STATUS")}
                </h2>
                <RideStatusTimeline
                  activeStage={stage}
                  onStageChange={setStage}
                />
              </div>

              {/* Driver Profile Row */}
              {driver && (
                <div className="flex items-center justify-between gap-4 py-4">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary/20 bg-primary/10">
                      <FigmaIcon
                        src={figmaIcons.pilot}
                        size={32}
                        className="h-8 w-8"
                      />
                    </div>
                    <div>
                      <p className="text-base font-bold text-primary-2 sm:text-lg">
                        {driver.name}
                      </p>
                      <p className="mt-0.5 text-xs text-subtext sm:text-sm">
                        {driver.vehicle} · {driver.color} · {driver.license}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1 text-sm font-bold text-amber-500 sm:text-base">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <span>{driver.rating}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-subtext">
                      {driver.trips} {t("trips")}
                    </p>
                  </div>
                </div>
              )}

              {/* Route Summary Row */}
              <div className="border-t border-stroke pt-4">
                <p className="text-xs font-medium text-primary-2 sm:text-sm">
                  {ride.from}{" "}
                  <span className="mx-1 text-subtext">
                    {dir === "rtl" ? "←" : "→"}
                  </span>{" "}
                  {ride.destination}
                </p>
              </div>

              {/* Action Button: Displays when Completed (matches Image 2) */}
              {isCompleted && (
                <Link
                  href="/my-rides?tab=history"
                  className="mt-6 block cursor-pointer"
                >
                  <Button
                    size="lg"
                    className="h-12 w-full cursor-pointer rounded-[10px]"
                  >
                    {t("View History")}
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
