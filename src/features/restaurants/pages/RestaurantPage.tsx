import { PageShell } from "@/shared/ui/PageShell";

type RestaurantPageProps = {
  params: Promise<{
    restaurantId: string;
  }>;
};

export async function RestaurantPage({ params }: RestaurantPageProps) {
  const { restaurantId } = await params;

  return (
    <PageShell
      eyebrow="Restaurant"
      title="Restaurant details"
      description={`Menu and restaurant details for "${restaurantId}" will be implemented here.`}
    />
  );
}
