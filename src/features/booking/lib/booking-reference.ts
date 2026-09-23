export function generateBookingReference(): string {
  const year = new Date().getFullYear();
  const num = Math.floor(1000 + Math.random() * 9000);
  return `FLY-${year}-${num}`;
}
