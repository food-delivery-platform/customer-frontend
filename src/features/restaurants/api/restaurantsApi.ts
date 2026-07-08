import { httpClient } from "@/shared/api/httpClient";
import type { Restaurant } from "@/shared/model/Restaurant";

export function getRestaurants() {
  return httpClient<Restaurant[]>("/restaurants");
}
