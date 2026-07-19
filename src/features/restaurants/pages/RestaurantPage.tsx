import NextLink from "next/link";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { getRestaurant } from "@/features/restaurants/api/restaurantsApi";
import { getRestaurantMenu } from "@/features/menu/api/menuApi";
import { MenuList } from "@/features/menu/ui/MenuList";
import { PageShell } from "@/shared/ui/PageShell";
import { RestaurantDetail } from "@/features/restaurants/ui/RestaurantDetail";

type RestaurantPageProps = {
  params: Promise<{
    restaurantId: string;
  }>;
};

export async function RestaurantPage({ params }: RestaurantPageProps) {
  const { restaurantId } = await params;

  let restaurant: Awaited<ReturnType<typeof getRestaurant>> | null = null;
  let items: Awaited<ReturnType<typeof getRestaurantMenu>> = [];
  let error: string | null = null;

  try {
    [restaurant, items] = await Promise.all([
      getRestaurant(restaurantId),
      getRestaurantMenu(restaurantId),
    ]);
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load restaurant";
  }

  if (error || !restaurant) {
    return (
      <PageShell
        description={error ?? "Restaurant not found."}
        eyebrow="Restaurant"
        title="Restaurant details"
      >
        <Button asChild variant="outline">
          <NextLink href="/restaurants">Back to restaurants</NextLink>
        </Button>
      </PageShell>
    );
  }

  return (
    <Box mx="auto" px={{ base: "4", md: "6" }} py="10" width="min(100%, 960px)">
      <Button asChild mb={4} variant="ghost">
        <NextLink href="/restaurants">← Back to restaurants</NextLink>
      </Button>

      <RestaurantDetail restaurant={restaurant} />

      <Heading mb={4} size="md">
        Menu
      </Heading>

      {items.length === 0 ? <Text color="fg.muted">No menu items available.</Text> : <MenuList items={items} />}
    </Box>
  );
}
