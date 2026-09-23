type SplitPageLayoutProps = {
  hero: React.ReactNode;
  children: React.ReactNode;
};

/**
 * Figma pattern for FAQ / Contact pages (3231:4212, 3231:3835):
 * dark navy hero on top, white content area below — not a full-page white bg.
 */
export function SplitPageLayout({ hero, children }: SplitPageLayoutProps) {
  return (
    <>
      {hero}
      <section className="bg-white py-12 sm:py-16 lg:py-20">{children}</section>
    </>
  );
}
