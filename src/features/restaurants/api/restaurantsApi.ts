import { httpClient } from "@/shared/api/httpClient";
import type { Restaurant } from "../model/restaurant";

export function getRestaurants() {
  return httpClient<Restaurant[]>("/restaurants");
}
