"use client";

import { Box, Button, Field, Heading, Input, Stack, Text, Textarea } from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import type { FormEvent } from "react";
import { createOrder, OrderServiceError } from "@/features/orders/api/ordersApi";
import type { CartItem } from "@/features/cart/model/cartItem";

type PlaceOrderSectionProps = {
  items: CartItem[];
  hasMultipleRestaurants: boolean;
  onOrderPlaced: () => void;
};

type AddressFormState = {
  street: string;
  city: string;
  postalCode: string;
  notes: string;
};

const EMPTY_ADDRESS: AddressFormState = { street: "", city: "", postalCode: "", notes: "" };

export function PlaceOrderSection({ items, hasMultipleRestaurants, onOrderPlaced }: PlaceOrderSectionProps) {
  const { data: session, status } = useSession();
  const [address, setAddress] = useState<AddressFormState>(EMPTY_ADDRESS);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);

  const isAuthenticated = status === "authenticated";
  const isAddressComplete = Boolean(address.street && address.city && address.postalCode);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!session?.customerId || hasMultipleRestaurants || !isAddressComplete) {
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const order = await createOrder(
        {
          customerId: session.customerId,
          restaurantId: items[0].restaurantId,
          items: items.map((item) => ({ menuItemId: item.menuItemId, quantity: item.quantity })),
          deliveryAddress: {
            street: address.street,
            city: address.city,
            postalCode: address.postalCode,
            notes: address.notes || null,
          },
        },
        session.googleIdToken,
      );

      setPlacedOrderId(order.orderId);
      setAddress(EMPTY_ADDRESS);
      onOrderPlaced();
    } catch (err) {
      setError(err instanceof OrderServiceError ? err.message : "Failed to place order.");
    } finally {
      setSubmitting(false);
    }
  }

  if (placedOrderId) {
    return (
      <Box borderRadius="md" borderWidth="1px" mt={6} p={4}>
        <Text color="fg.success" fontWeight="semibold">
          Order placed! Order ID: {placedOrderId}
        </Text>
      </Box>
    );
  }

  return (
    <Box borderRadius="md" borderWidth="1px" mt={6} p={4}>
      <Heading mb={4} size="sm">
        Delivery address
      </Heading>

      {!isAuthenticated ? (
        <Stack gap={3}>
          <Text color="fg.muted" fontSize="sm">
            Sign in to place an order.
          </Text>
          <Button
            alignSelf="flex-start"
            disabled={status === "loading"}
            onClick={() => void signIn("google")}
            variant="outline"
          >
            Sign in with Google
          </Button>
        </Stack>
      ) : (
        <form onSubmit={(e) => void handleSubmit(e)}>
          <Stack gap={3}>
            <Field.Root required>
              <Field.Label>Street</Field.Label>
              <Input
                onChange={(e) => setAddress((prev) => ({ ...prev, street: e.target.value }))}
                value={address.street}
              />
            </Field.Root>
            <Field.Root required>
              <Field.Label>City</Field.Label>
              <Input
                onChange={(e) => setAddress((prev) => ({ ...prev, city: e.target.value }))}
                value={address.city}
              />
            </Field.Root>
            <Field.Root required>
              <Field.Label>Postal code</Field.Label>
              <Input
                onChange={(e) => setAddress((prev) => ({ ...prev, postalCode: e.target.value }))}
                value={address.postalCode}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Delivery notes</Field.Label>
              <Textarea
                onChange={(e) => setAddress((prev) => ({ ...prev, notes: e.target.value }))}
                value={address.notes}
              />
            </Field.Root>

            {hasMultipleRestaurants ? (
              <Text color="fg.error" fontSize="sm">
                Your cart has items from multiple restaurants. Remove items from all but one
                restaurant to place an order.
              </Text>
            ) : null}

            {error ? (
              <Text color="fg.error" fontSize="sm">
                {error}
              </Text>
            ) : null}

            <Button
              alignSelf="flex-start"
              disabled={hasMultipleRestaurants || !isAddressComplete || submitting}
              loading={submitting}
              type="submit"
            >
              Place order
            </Button>
          </Stack>
        </form>
      )}
    </Box>
  );
}
