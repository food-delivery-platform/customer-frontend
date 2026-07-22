import { Box, Stack, Text } from "@chakra-ui/react";
import type { MenuItem } from "@/shared/model/MenuItem";

type MenuItemNutritionProps = {
  nutrition: NonNullable<MenuItem["nutrition"]>;
};

export function MenuItemNutrition({ nutrition }: MenuItemNutritionProps) {
  return (
    <Box mb={6}>
      <Text fontWeight="semibold" mb={2}>
        Nutrition (per serving)
      </Text>
      <Stack color="fg.muted" fontSize="sm" gap={1}>
        {nutrition.calories ? <Text>🔥 Calories: {nutrition.calories}</Text> : null}
        {nutrition.protein ? <Text>🥚 Protein: {nutrition.protein}g</Text> : null}
        {nutrition.fat ? <Text>🧈 Fat: {nutrition.fat}g</Text> : null}
        {nutrition.carbs ? <Text>🍞 Carbs: {nutrition.carbs}g</Text> : null}
      </Stack>
    </Box>
  );
}
