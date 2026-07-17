import NextLink from "next/link";
import { Box, Button, HStack, Heading, Text } from "@chakra-ui/react";
import { AddToCartButton } from "@/features/menu/ui/AddToCartButton";
import { MenuItemIngredients } from "@/features/menu/ui/menu-item-detail/MenuItemIngredients";
import { MenuItemLabels } from "@/features/menu/ui/menu-item-detail/MenuItemLabels";
import { MenuItemNutrition } from "@/features/menu/ui/menu-item-detail/MenuItemNutrition";
import { MenuItemOverview } from "@/features/menu/ui/menu-item-detail/MenuItemOverview";
import { MenuItemPortion } from "@/features/menu/ui/menu-item-detail/MenuItemPortion";
import type { MenuItem } from "@/shared/model/MenuItem";
import type { Restaurant } from "@/shared/model/Restaurant";

type MenuItemDetailProps = {
  item: MenuItem;
  restaurant: Restaurant;
};

export function MenuItemDetail({ item, restaurant }: MenuItemDetailProps) {
  return (
    <Box mx="auto" px={{ base: "4", md: "6" }} py="10" width="min(100%, 640px)">
      <Button asChild mb={4} variant="ghost">
        <NextLink href={`/restaurants/${restaurant.id}`}>← Back to {restaurant.name}</NextLink>
      </Button>

      <Heading mb={2} size="lg">
        {item.name}
      </Heading>

      {item.description ? (
        <Text color="fg.muted" fontSize="md" mb={4}>
          {item.description}
        </Text>
      ) : null}

      <MenuItemOverview item={item} />

      {item.ingredients && item.ingredients.length > 0 ? (
        <MenuItemIngredients ingredients={item.ingredients} />
      ) : null}

      {item.labels ? <MenuItemLabels labels={item.labels} /> : null}

      {item.nutrition ? <MenuItemNutrition nutrition={item.nutrition} /> : null}

      {item.portion?.description ? <MenuItemPortion description={item.portion.description} /> : null}

      <HStack gap={3}>
        <AddToCartButton menuItem={item} />
        <Button asChild variant="outline">
          <NextLink href={`/restaurants/${restaurant.id}`}>Close</NextLink>
        </Button>
      </HStack>
    </Box>
  );
}
