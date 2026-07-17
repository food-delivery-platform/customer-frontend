import type { AxiosRequestConfig } from "axios";
import { httpClient } from "@/shared/api/httpClient";
import type { Restaurant } from "@/shared/model/Restaurant";

export function getRestaurants(config?: AxiosRequestConfig) {
  return httpClient<Restaurant[]>("/restaurants", config);
}

export function getRestaurant(restaurantId: string, config?: AxiosRequestConfig) {
  return httpClient<Restaurant>(`/restaurants/${restaurantId}`, config);
}
