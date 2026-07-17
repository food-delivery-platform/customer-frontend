import { Badge, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { formatCurrency } from "@/shared/lib/formatCurrency";
import type { MenuItem } from "@/shared/model/MenuItem";

type MenuItemOverviewProps = {
  item: MenuItem;
};

export function MenuItemOverview({ item }: MenuItemOverviewProps) {
  return (
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
  );
}
