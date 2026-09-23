type BookingFlowLayoutProps = {
  stepper?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function BookingFlowLayout({
  stepper,
  children,
  footer,
}: BookingFlowLayoutProps) {
  return (
    <section className="bg-background py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* Outer light container with large rounded corners and generous padding */}
        <div className="rounded-[32px] border border-stroke/70 bg-[#f8fbff]/70 p-4 sm:p-8 lg:p-10 shadow-xs sm:rounded-[40px]">
          {/* Standalone white stepper card at the top */}
          {stepper && (
            <div className="mb-6 rounded-2xl border border-stroke bg-white px-4 py-4.5 shadow-sm sm:px-8">
              {stepper}
            </div>
          )}

          {/* Main content white card */}
          <div className="rounded-2xl border border-stroke bg-white p-6 shadow-sm sm:p-8">
            {children}
          </div>

          {/* Footer disclaimer */}
          {footer && <div className="mt-6 text-center">{footer}</div>}
        </div>
      </div>
    </section>
  );
}
