"use client";

import NextLink from "next/link";
import { Box, Button, Heading, Input, Table, Text } from "@chakra-ui/react";
import { useCart } from "@/features/cart/ui/CartProvider";
import { formatCurrency } from "@/shared/lib/formatCurrency";
import { PageShell } from "@/shared/ui/PageShell";

export function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
              <Table.Cell textAlign="right">{formatCurrency(item.price)}</Table.Cell>
              <Table.Cell textAlign="right">
                <Input
                  min={1}
                  onChange={(e) => updateQuantity(item.menuItemId, Number(e.target.value))}
                  size="sm"
                  type="number"
                  value={item.quantity}
                  width="70px"
                />
              </Table.Cell>
              <Table.Cell textAlign="right">{formatCurrency(item.price * item.quantity)}</Table.Cell>
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
        <Heading size="md">Total: {formatCurrency(total)}</Heading>
      </Box>

      <Box display="flex" gap={4} mt={6}>
        <Button asChild>
          <NextLink href="/restaurants">Continue shopping</NextLink>
        </Button>
        <Button colorPalette="red" onClick={clearCart} variant="outline">
          Clear cart
        </Button>
        <Text color="fg.muted" fontSize="sm" ml="auto" my="auto">
          Checkout coming soon
        </Text>
      </Box>
    </Box>
  );
}
