"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CartItem } from "./cartItem";

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.menuItemId === item.menuItemId);

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.menuItemId === item.menuItemId ? { ...i, quantity: i.quantity + quantity } : i,
              ),
            };
          }

          return { items: [...state.items, { ...item, quantity }] };
        }),

      removeItem: (menuItemId) =>
        set((state) => ({ items: state.items.filter((i) => i.menuItemId !== menuItemId) })),

      updateQuantity: (menuItemId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((i) => i.menuItemId !== menuItemId) };
          }

          return {
            items: state.items.map((i) => (i.menuItemId === menuItemId ? { ...i, quantity } : i)),
          };
        }),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
