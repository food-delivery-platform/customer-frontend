import { httpClient } from "@/shared/api/httpClient";
import type { MenuItem } from "../model/menuItem";

export function getRestaurantMenu(restaurantId: string) {
  return httpClient<MenuItem[]>(`/restaurants/${restaurantId}/menu`);
}
