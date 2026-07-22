import { getMenuItem } from "@/features/menu/api/menuApi";
import { getRestaurant } from "@/features/restaurants/api/restaurantsApi";
import { MenuItemDetail } from "@/features/menu/ui/MenuItemDetail";
import { PageError } from "@/shared/ui/PageError";

type MenuItemPageProps = {
  params: Promise<{
    menuItemId: string;
  }>;
};

export async function MenuItemPage({ params }: MenuItemPageProps) {
  const { menuItemId } = await params;

  let item: Awaited<ReturnType<typeof getMenuItem>> | null = null;
  let restaurant: Awaited<ReturnType<typeof getRestaurant>> | null = null;
  let error: string | null = null;

  try {
    item = await getMenuItem(menuItemId);
    restaurant = await getRestaurant(item.restaurantId);
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load menu item";
  }

  if (error || !item || !restaurant) {
    return (
      <PageError
        description={error ?? "Menu item not found."}
        eyebrow="Menu item"
        title="Dish details"
      />
    );
  }

  return <MenuItemDetail item={item} restaurant={restaurant} />;
}
