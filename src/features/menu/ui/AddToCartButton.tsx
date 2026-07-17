"use client";

import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { useCart } from "@/features/cart/ui/CartProvider";
import type { MenuItem } from "@/shared/model/MenuItem";

type AddToCartButtonProps = {
  menuItem: MenuItem;
};

export function AddToCartButton({ menuItem }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addItem({ menuItemId: menuItem.id, name: menuItem.name, price: menuItem.price });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <Button
      colorPalette={added ? "green" : "gray"}
      disabled={!menuItem.isAvailable}
      flex={1}
      onClick={handleAddToCart}
      opacity={menuItem.isAvailable ? 1 : 0.5}
      size="sm"
      title={menuItem.isAvailable ? undefined : "This item is unavailable"}
    >
      {!menuItem.isAvailable ? "Unavailable" : added ? "Added" : "Add to cart"}
    </Button>
  );
}
