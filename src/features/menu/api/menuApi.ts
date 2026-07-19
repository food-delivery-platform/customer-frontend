import { httpClient } from "@/shared/api/httpClient";
import type { MenuItem } from "@/shared/model/MenuItem";

export function getRestaurantMenu(restaurantId: string, init?: RequestInit): Promise<MenuItem[]> {
  return httpClient<MenuItem[]>(`/restaurants/${restaurantId}/menu`, init);
}

export function getMenuItem(menuItemId: string, init?: RequestInit): Promise<MenuItem> {
  return httpClient<MenuItem>(`/menu-items/${menuItemId}`, init);
}
