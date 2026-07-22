import { Badge, Box, HStack, Heading, Image, Text } from "@chakra-ui/react";
import type { Restaurant } from "@/shared/model/Restaurant";

type RestaurantDetailProps = {
  restaurant: Restaurant;
};

export function RestaurantDetail({ restaurant }: RestaurantDetailProps) {
  return (
    <Box mb={8}>
      {restaurant.imageUrl ? (
        <Image
          alt={restaurant.name}
          borderRadius="md"
          height="280px"
          mb={4}
          objectFit="cover"
          src={restaurant.imageUrl}
          width="100%"
        />
      ) : null}

      <Heading mb={2} size="lg">
        {restaurant.name}
      </Heading>

      {restaurant.description ? (
        <Text color="fg.muted" fontSize="md" mb={3}>
          {restaurant.description}
        </Text>
      ) : null}

      <HStack gap={2} wrap="wrap">
        <Badge colorPalette={restaurant.isOpen ? "green" : "red"}>
          {restaurant.isOpen ? "Open" : "Closed"}
        </Badge>
        {restaurant.rating !== undefined ? <Badge colorPalette="yellow">⭐ {restaurant.rating}</Badge> : null}
      </HStack>
    </Box>
  );
}
