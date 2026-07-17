import type { AxiosRequestConfig } from "axios";
import { httpClient } from "@/shared/api/httpClient";
import type { MenuItem } from "@/shared/model/MenuItem";

export function getRestaurantMenu(
  restaurantId: string,
  config?: AxiosRequestConfig,
): Promise<MenuItem[]> {
  return httpClient<MenuItem[]>(`/restaurants/${restaurantId}/menu`, config);
}

export function getMenuItem(menuItemId: string, config?: AxiosRequestConfig): Promise<MenuItem> {
  return httpClient<MenuItem>(`/menu-items/${menuItemId}`, config);
}
