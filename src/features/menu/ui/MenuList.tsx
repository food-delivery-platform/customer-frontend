import { Badge, Box, Button, Card, Heading, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { AddToCartButton } from "@/features/menu/ui/AddToCartButton";
import { formatCurrency } from "@/shared/lib/formatCurrency";
import type { MenuItem } from "@/shared/model/MenuItem";

type MenuListProps = {
  items: MenuItem[];
};

export function MenuList({ items }: MenuListProps) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
      {items.map((item) => (
        <Card.Root key={item.id} _hover={{ shadow: "lg" }}>
          <Card.Body>
            <Heading mb={2} size="sm">
              {item.name}
            </Heading>
            {item.description ? (
              <Text color="fg.muted" fontSize="sm" mb={2}>
                {item.description}
              </Text>
            ) : null}
            <HStack gap={2} mb={3} wrap="wrap">
              <Badge colorPalette={item.isAvailable ? "green" : "red"}>
                {item.isAvailable ? "Available" : "Unavailable"}
              </Badge>
              {item.category ? <Badge colorPalette="gray">{item.category.name}</Badge> : null}
              {item.spicyLevel ? <Badge colorPalette="orange">🌶️ {item.spicyLevel}/3</Badge> : null}
              {item.labels?.vegetarian ? <Badge colorPalette="green">Vegetarian</Badge> : null}
              {item.labels?.vegan ? <Badge colorPalette="green">Vegan</Badge> : null}
            </HStack>
            <Heading mb={3} size="md">
              {formatCurrency(item.price, item.currency)}
            </Heading>
            <Box display="flex" gap={2}>
              <AddToCartButton menuItem={item} />
              <Button asChild flex={1} size="sm" variant="outline">
                <NextLink href={`/menu_items/${item.id}`}>View</NextLink>
              </Button>
            </Box>
          </Card.Body>
        </Card.Root>
      ))}
    </SimpleGrid>
  );
}
