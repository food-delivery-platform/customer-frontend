import { SimpleGrid, Text } from "@chakra-ui/react";
import { getRestaurants } from "@/features/restaurants/api/restaurantsApi";
import { RestaurantCard } from "@/features/restaurants/ui/RestaurantCard";
import { PageShell } from "@/shared/ui/PageShell";

export async function RestaurantsPage() {
  let restaurants: Awaited<ReturnType<typeof getRestaurants>> = [];
  let error: string | null = null;

  try {
    restaurants = await getRestaurants();
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load restaurants";
  }

  return (
    <PageShell
      description="Browse restaurants available for delivery."
      eyebrow="Restaurants"
      title="Restaurant listing"
    >
      {error ? (
        <Text color="fg.error">{error}</Text>
      ) : restaurants.length === 0 ? (
        <Text color="fg.muted">No restaurants found.</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </SimpleGrid>
      )}
    </PageShell>
  );
}
