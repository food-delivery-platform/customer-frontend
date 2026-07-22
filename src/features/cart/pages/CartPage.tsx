"use client";

import NextLink from "next/link";
import { Box, Button, Heading, Table, Text } from "@chakra-ui/react";
import { CartQuantityInput } from "@/features/cart/ui/CartQuantityInput";
import { useCartStore } from "@/features/cart/model/cartStore";
import { formatCurrency } from "@/shared/lib/formatCurrency";
import { PageShell } from "@/shared/ui/PageShell";

export function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const restaurantIds = new Set(items.map((item) => item.restaurantId));
  const hasMultipleRestaurants = restaurantIds.size > 1;
  const currency = items[0]?.currency ?? "USD";

  if (items.length === 0) {
    return (
      <PageShell
        description="Your cart is empty."
        eyebrow="Cart"
        title="Shopping cart"
      >
        <Button asChild>
          <NextLink href="/restaurants">Continue shopping</NextLink>
        </Button>
      </PageShell>
    );
  }

  return (
    <Box mx="auto" px={{ base: "4", md: "6" }} py="10" width="min(100%, 720px)">
      <Heading mb={6} size="lg">
        Shopping cart
      </Heading>

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Item</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="right">Price</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="right">Quantity</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="right">Total</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Action</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item) => (
            <Table.Row key={item.menuItemId}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell textAlign="right">{formatCurrency(item.price, item.currency)}</Table.Cell>
              <Table.Cell textAlign="right">
                <CartQuantityInput
                  onCommit={(quantity) => updateQuantity(item.menuItemId, quantity)}
                  quantity={item.quantity}
                />
              </Table.Cell>
              <Table.Cell textAlign="right">
                {formatCurrency(item.price * item.quantity, item.currency)}
              </Table.Cell>
              <Table.Cell textAlign="center">
                <Button
                  colorPalette="red"
                  onClick={() => removeItem(item.menuItemId)}
                  size="sm"
                  variant="ghost"
                >
                  Remove
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Box display="flex" justifyContent="flex-end" mt={6}>
        <Heading size="md">Total: {formatCurrency(total, currency)}</Heading>
      </Box>

      <Box display="flex" gap={4} mt={6}>
        <Button asChild>
          <NextLink href="/restaurants">Continue shopping</NextLink>
        </Button>
        <Button colorPalette="red" onClick={clearCart} variant="outline">
          Clear cart
        </Button>
        <Button disabled ml="auto" title="Checkout coming soon">
          Place order
        </Button>
      </Box>

      {hasMultipleRestaurants ? (
        <Text color="fg.error" fontSize="sm" mt={2} textAlign="right">
          Your cart has items from multiple restaurants. Remove items from all but one restaurant
          to place an order.
        </Text>
      ) : null}
    </Box>
  );
}
