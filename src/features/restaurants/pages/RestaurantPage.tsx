import NextLink from "next/link";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { getRestaurant } from "@/features/restaurants/api/restaurantsApi";
import { getRestaurantMenu } from "@/features/menu/api/menuApi";
import { MenuList } from "@/features/menu/ui/MenuList";
import { PageError } from "@/shared/ui/PageError";
import { RestaurantDetail } from "@/features/restaurants/ui/RestaurantDetail";
import type { MenuItem } from "@/shared/model/MenuItem";
import type { Restaurant } from "@/shared/model/Restaurant";

type RestaurantPageProps = {
  params: Promise<{
    restaurantId: string;
  }>;
};

type RestaurantPageData = {
  restaurant: Restaurant | null;
  items: MenuItem[];
  error: string | null;
};

async function loadRestaurantPageData(restaurantId: string): Promise<RestaurantPageData> {
  try {
    const [restaurant, items] = await Promise.all([
      getRestaurant(restaurantId),
      getRestaurantMenu(restaurantId),
    ]);

    return { restaurant, items, error: null };
  } catch (err) {
    return {
      restaurant: null,
      items: [],
      error: err instanceof Error ? err.message : "Failed to load restaurant",
    };
  }
}

export async function RestaurantPage({ params }: RestaurantPageProps) {
  const { restaurantId } = await params;
  const { restaurant, items, error } = await loadRestaurantPageData(restaurantId);

  if (error || !restaurant) {
    return (
      <PageError
        description={error ?? "Restaurant not found."}
        eyebrow="Restaurant"
        title="Restaurant details"
      />
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
