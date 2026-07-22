import { httpClient } from "@/shared/api/httpClient";
import type { Category } from "@/shared/model/Category";
import type { MenuItem } from "@/shared/model/MenuItem";
import type { Restaurant } from "@/shared/model/Restaurant";

type GetRestaurantsResponseDto = {
  restaurants: Restaurant[];
};

export type RestaurantWithMenu = Restaurant & {
  categories: Category[];
  menuItems: MenuItem[];
};

type GetRestaurantResponseDto = {
  restaurant: RestaurantWithMenu;
};

export async function getRestaurants(init?: RequestInit): Promise<Restaurant[]> {
  const { restaurants } = await httpClient<GetRestaurantsResponseDto>("/restaurants", init);

  return restaurants;
}

export async function getRestaurant(
  restaurantId: string,
  init?: RequestInit,
): Promise<RestaurantWithMenu> {
  const { restaurant } = await httpClient<GetRestaurantResponseDto>(
    `/restaurants/${restaurantId}`,
    init,
  );

  return restaurant;
}
