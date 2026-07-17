import { Badge, Box, Text, Wrap } from "@chakra-ui/react";
import type { MenuItem } from "@/shared/model/MenuItem";

type MenuItemLabelsProps = {
  labels: NonNullable<MenuItem["labels"]>;
};

export function MenuItemLabels({ labels }: MenuItemLabelsProps) {
  const hasLabels = Object.values(labels).some(Boolean);

  if (!hasLabels) {
    return null;
  }

  return (
    <Box mb={6}>
      <Text fontWeight="semibold" mb={2}>
        Labels
      </Text>
      <Wrap gap={2}>
        {Object.entries(labels).map(([label, value]) =>
          value ? (
            <Badge colorPalette="blue" key={label}>
              {label}
            </Badge>
          ) : null,
        )}
      </Wrap>
    </Box>
  );
}
