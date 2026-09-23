"use client";

import { STATS } from "@/constants";
import { useLanguage } from "@/lib/i18n/language-context";

export function StatsBar() {
  const { t } = useLanguage();
  return (
    <section className=" bg-primary-dark py-8 sm:py-10 text-white">
      <div className="mx-auto  max-w-7xl flex  items-center justify-center ">
      

            <p className="text-3xl font-extrabold text-[#1688FF]  sm:text-4xl">
              24/6
            </p>
          

        
      </div>
    </section>
  );
}
