import { PageShell } from "@/components/layout/page-shell";

import { FinalCtaSection } from "./components/final-cta-section";
import { HeroSection } from "./components/hero-section";
import { HowItWorksSection } from "./components/how-it-works-section";
import { PopularRoutesSection } from "./components/popular-routes-section";
import { ServicesSection } from "./components/services-section";
import { StatsBar } from "./components/stats-bar";
import { WhyChooseSection } from "./components/why-choose-section";

export function HomePage() {
  return (
    <PageShell>
      <HeroSection />
      <StatsBar />
      <HowItWorksSection />
      <ServicesSection />
      <PopularRoutesSection />
      <WhyChooseSection />
      <FinalCtaSection />
    </PageShell>
  );
}
