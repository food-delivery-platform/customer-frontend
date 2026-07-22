import { Badge, Card, HStack, Heading, Image, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import type { Restaurant } from "@/shared/model/Restaurant";

type RestaurantCardProps = {
  restaurant: Restaurant;
};

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Card.Root asChild _hover={{ shadow: "lg" }}>
      <NextLink href={`/restaurants/${restaurant.id}`}>
        {restaurant.imageUrl ? (
          <Image alt={restaurant.name} height="180px" objectFit="cover" src={restaurant.imageUrl} />
        ) : null}
        <Card.Body>
          <Heading mb={2} size="sm">
            {restaurant.name}
          </Heading>
          {restaurant.description ? (
            <Text color="fg.muted" fontSize="sm" mb={2}>
              {restaurant.description}
            </Text>
          ) : null}
          <HStack gap={2} wrap="wrap">
            <Badge colorPalette={restaurant.isOpen ? "green" : "red"}>
              {restaurant.isOpen ? "Open" : "Closed"}
            </Badge>
            {restaurant.rating !== undefined ? (
              <Text fontSize="sm" fontWeight="semibold">
                ⭐ {restaurant.rating}
              </Text>
            ) : null}
          </HStack>
        </Card.Body>
      </NextLink>
    </Card.Root>
  );
}
