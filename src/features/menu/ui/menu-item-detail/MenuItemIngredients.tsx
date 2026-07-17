import { Badge, Box, Text, Wrap } from "@chakra-ui/react";

type MenuItemIngredientsProps = {
  ingredients: string[];
};

export function MenuItemIngredients({ ingredients }: MenuItemIngredientsProps) {
  if (ingredients.length === 0) {
    return null;
  }

  return (
    <Box mb={6}>
      <Text fontWeight="semibold" mb={2}>
        Ingredients
      </Text>
      <Wrap gap={2}>
        {ingredients.map((ingredient) => (
          <Badge colorPalette="gray" key={ingredient}>
            {ingredient}
          </Badge>
        ))}
      </Wrap>
    </Box>
  );
}
