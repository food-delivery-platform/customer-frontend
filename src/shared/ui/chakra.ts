import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

export const chakraConfig = defineConfig({
  globalCss: {
    "html, body": {
      bg: "bg",
      color: "fg",
    },
    body: {
      colorPalette: "gray",
    },
  },
});

export const system = createSystem(defaultConfig, chakraConfig);
