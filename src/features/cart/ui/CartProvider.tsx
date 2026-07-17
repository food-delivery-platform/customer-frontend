"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { CartItem } from "../model/cartItem";

const CART_STORAGE_KEY = "cart";

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);

    if (stored) {
      try {
        // Synchronizing with localStorage on mount (react.dev/learn/you-might-not-need-an-effect#fetching-data).
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setItems(JSON.parse(stored) as CartItem[]);
      } catch {
        setItems([]);
      }
    }

    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isMounted]);

  function addItem(item: Omit<CartItem, "quantity">, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.menuItemId === item.menuItemId);

      if (existing) {
        return prev.map((i) =>
          i.menuItemId === item.menuItemId ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }

      return [...prev, { ...item, quantity }];
    });
  }

  function removeItem(menuItemId: string) {
    setItems((prev) => prev.filter((i) => i.menuItemId !== menuItemId));
  }

  function updateQuantity(menuItemId: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(menuItemId);
      return;
    }

    setItems((prev) =>
      prev.map((i) => (i.menuItemId === menuItemId ? { ...i, quantity } : i)),
    );
  }

  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
