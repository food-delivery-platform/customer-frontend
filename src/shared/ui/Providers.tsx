"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import { CartProvider } from "@/features/cart/ui/CartProvider";
import { system } from "@/shared/ui/chakra";
import { ColorModeProvider } from "@/shared/ui/color-mode";
import { EmotionRegistry } from "@/shared/ui/EmotionRegistry";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <EmotionRegistry>
        <ChakraProvider value={system}>
          <ColorModeProvider>
            <CartProvider>{children}</CartProvider>
          </ColorModeProvider>
        </ChakraProvider>
      </EmotionRegistry>
    </SessionProvider>
  );
}
