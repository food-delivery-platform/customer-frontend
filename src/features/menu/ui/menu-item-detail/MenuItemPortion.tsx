import { Box, Text } from "@chakra-ui/react";

type MenuItemPortionProps = {
  description: string;
};

export function MenuItemPortion({ description }: MenuItemPortionProps) {
  return (
    <Box mb={6}>
      <Text fontWeight="semibold" mb={2}>
        Portion
      </Text>
      <Text color="fg.muted">{description}</Text>
    </Box>
  );
}
