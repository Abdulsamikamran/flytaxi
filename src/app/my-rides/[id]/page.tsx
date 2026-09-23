import { RideDetailPage } from "@/features/manage-booking/ride-detail-page";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  return {
    title: `${id} | My Rides | FLYTAXI`,
    description: "View your ride details and track your driver.",
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <RideDetailPage rideId={decodeURIComponent(id)} />;
}
