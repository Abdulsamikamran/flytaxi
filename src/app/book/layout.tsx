import { BookLayoutShell } from "@/features/booking/components/book-layout-shell";

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BookLayoutShell>{children}</BookLayoutShell>;
}
