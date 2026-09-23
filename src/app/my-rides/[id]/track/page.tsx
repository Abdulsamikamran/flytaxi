import { TrackDriverPage } from "@/features/manage-booking/track-driver-page";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  return {
    title: `Track Driver | ${id} | FLYTAXI`,
    description: "Track your assigned FLYTAXI driver in real-time.",
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <TrackDriverPage rideId={decodeURIComponent(id)} />;
}
