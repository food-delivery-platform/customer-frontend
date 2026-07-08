import axios from "axios";

import type { MenuItem } from "@/shared/model/MenuItem";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export async function getRestaurantMenu(restaurantId: string): Promise<MenuItem[]> {
  const response = await axios.get<MenuItem[]>(
    `${API_BASE_URL}/restaurants/${restaurantId}/menu`,
  );

  return response.data;
}
