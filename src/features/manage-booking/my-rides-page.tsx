"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { RideCard } from "@/features/manage-booking/components/ride-card";
import { RideTabs } from "@/features/manage-booking/components/ride-tabs";
import { getRidesByTab } from "@/features/manage-booking/lib/rides-data";
import type { RideTab } from "@/features/manage-booking/types/ride";
import { useLanguage } from "@/lib/i18n/language-context";

function MyRidesContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<RideTab>(
    tabParam === "history" ? "history" : "upcoming",
  );

  useEffect(() => {
    if (tabParam === "history" || tabParam === "upcoming") {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const rides = getRidesByTab(activeTab);

  return (
    <PageShell>
      <section className="bg-background py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          {/* Outer container with large rounded corners */}
          <div className="rounded-[32px] border border-stroke/70 bg-[#f8fbff]/70 p-4 shadow-xs sm:rounded-[40px] sm:p-8 lg:p-10">
            {/* White content container */}
            <div className="rounded-2xl border border-stroke bg-white p-6 shadow-sm sm:p-8">
              <Link
                href="/"
                className="mb-6 inline-flex cursor-pointer items-center gap-2 text-xl font-extrabold text-primary-2 transition hover:text-primary sm:text-2xl"
              >
                <ArrowLeft className="h-5 w-5 text-primary-2" />
                {t("My Rides")}
              </Link>

              <div className="mb-6 flex justify-center">
                <RideTabs active={activeTab} onChange={setActiveTab} />
              </div>

              <div className="space-y-4">
                {rides.map((ride) => (
                  <RideCard key={`${ride.id}-${ride.tab}`} ride={ride} />
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <Link href="/#booking" className="cursor-pointer">
                  <Button
                    size="lg"
                    className="h-12 cursor-pointer rounded-[10px] px-8"
                  >
                    {t("Book Another Transfer")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export function MyRidesPage() {
  return (
    <Suspense fallback={null}>
      <MyRidesContent />
    </Suspense>
  );
}
