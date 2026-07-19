import { httpClient } from "@/shared/api/httpClient";
import type { Restaurant } from "@/shared/model/Restaurant";

export function getRestaurants(init?: RequestInit) {
  return httpClient<Restaurant[]>("/restaurants", init);
}

export function getRestaurant(restaurantId: string, init?: RequestInit) {
  return httpClient<Restaurant>(`/restaurants/${restaurantId}`, init);
}
