type InnerPageHeroProps = {
  badge: string;
  title: string;
  description: string;
  /** contact = white bg; faq = light blue bg (#f8fbff) */
  variant: "contact" | "faq";
};

export function InnerPageHero({
  badge,
  title,
  description,
  variant,
}: InnerPageHeroProps) {
  const isContact = variant === "contact";

  return (
    <section
      className={
        isContact
          ? "border-b border-stroke bg-white py-12 sm:py-14 lg:py-16"
          : "border-b border-stroke bg-background py-12 sm:py-14 lg:py-16"
      }
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
          {badge}
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-primary-2 sm:text-4xl lg:text-[40px] lg:leading-[1.2] lg:tracking-[-1.2px]">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-subtext sm:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
