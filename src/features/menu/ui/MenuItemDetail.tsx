import NextLink from "next/link";
import { Badge, Box, Button, Flex, HStack, Heading, Stack, Text, Wrap } from "@chakra-ui/react";
import { AddToCartButton } from "@/features/menu/ui/AddToCartButton";
import { formatCurrency } from "@/shared/lib/formatCurrency";
import type { MenuItem } from "@/shared/model/MenuItem";
import type { Restaurant } from "@/shared/model/Restaurant";

type MenuItemDetailProps = {
  item: MenuItem;
  restaurant: Restaurant;
};

export function MenuItemDetail({ item, restaurant }: MenuItemDetailProps) {
  const hasLabels = item.labels && Object.values(item.labels).some(Boolean);

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

      <Stack gap={4} mb={6}>
        <Flex align="center" justify="space-between">
          <Text fontWeight="semibold">Price</Text>
          <Heading size="md">{formatCurrency(item.price)}</Heading>
        </Flex>

        {item.category ? (
          <Flex align="center" justify="space-between">
            <Text fontWeight="semibold">Category</Text>
            <Text>{item.category}</Text>
          </Flex>
        ) : null}

        <Flex align="center" justify="space-between">
          <Text fontWeight="semibold">Status</Text>
          <Badge colorPalette={item.isAvailable ? "green" : "red"}>
            {item.isAvailable ? "Available" : "Unavailable"}
          </Badge>
        </Flex>

        {item.spicyLevel !== undefined ? (
          <Flex align="center" justify="space-between">
            <Text fontWeight="semibold">Spicy level</Text>
            <Text>{item.spicyLevel} / 3 🌶️</Text>
          </Flex>
        ) : null}
      </Stack>

      {item.ingredients && item.ingredients.length > 0 ? (
        <Box mb={6}>
          <Text fontWeight="semibold" mb={2}>
            Ingredients
          </Text>
          <Wrap gap={2}>
            {item.ingredients.map((ingredient) => (
              <Badge colorPalette="gray" key={ingredient}>
                {ingredient}
              </Badge>
            ))}
          </Wrap>
        </Box>
      ) : null}

      {hasLabels ? (
        <Box mb={6}>
          <Text fontWeight="semibold" mb={2}>
            Labels
          </Text>
          <Wrap gap={2}>
            {Object.entries(item.labels ?? {}).map(([label, value]) =>
              value ? (
                <Badge colorPalette="blue" key={label}>
                  {label}
                </Badge>
              ) : null,
            )}
          </Wrap>
        </Box>
      ) : null}

      {item.nutrition ? (
        <Box mb={6}>
          <Text fontWeight="semibold" mb={2}>
            Nutrition (per serving)
          </Text>
          <Stack color="fg.muted" fontSize="sm" gap={1}>
            {item.nutrition.calories ? <Text>🔥 Calories: {item.nutrition.calories}</Text> : null}
            {item.nutrition.protein ? <Text>🥚 Protein: {item.nutrition.protein}g</Text> : null}
            {item.nutrition.fat ? <Text>🧈 Fat: {item.nutrition.fat}g</Text> : null}
            {item.nutrition.carbs ? <Text>🍞 Carbs: {item.nutrition.carbs}g</Text> : null}
          </Stack>
        </Box>
      ) : null}

      {item.portion?.description ? (
        <Box mb={6}>
          <Text fontWeight="semibold" mb={2}>
            Portion
          </Text>
          <Text color="fg.muted">{item.portion.description}</Text>
        </Box>
      ) : null}

      <HStack gap={3}>
        <AddToCartButton menuItem={item} />
        <Button asChild variant="outline">
          <NextLink href={`/restaurants/${restaurant.id}`}>Close</NextLink>
        </Button>
      </HStack>
    </Box>
  );
}
