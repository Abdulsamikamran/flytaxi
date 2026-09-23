const HERO_GRADIENT =
  "linear-gradient(152.39deg, rgba(11, 31, 51, 0.98) 0%, rgba(11, 31, 51, 0.85) 50%, rgba(11, 35, 58, 0.7) 100%)";

type PageHeroProps = {
  badge?: string;
  title: string;
  description?: string;
  /** Inner pages (FAQ, Contact) use dark top half per Figma */
  variant?: "dark" | "light";
};

export function PageHero({
  badge,
  title,
  description,
  variant = "dark",
}: PageHeroProps) {
  if (variant === "light") {
    return (
      <section className="border-b border-stroke bg-background py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          {badge && (
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              {badge}
            </span>
          )}
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-primary-2 sm:text-4xl lg:text-[40px] lg:leading-[60px] lg:tracking-[-1.2px]">
            {title}
          </h1>
          {description && (
            <p className="mx-auto mt-4 max-w-xl text-base text-subtext sm:text-lg">
              {description}
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[#0b1f33] py-14 sm:py-16 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: HERO_GRADIENT }}
      />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        {badge && (
          <span className="inline-block rounded-full border border-primary/25 bg-primary/15 px-4 py-1.5 text-sm font-semibold text-primary">
            {badge}
          </span>
        )}
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[46px] lg:leading-[1.2] lg:tracking-[-1.38px]">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-4 max-w-xl text-base text-white/55 sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
