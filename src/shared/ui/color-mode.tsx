"use client";

import { ClientOnly, IconButton, createIcon } from "@chakra-ui/react";
import { ThemeProvider, useTheme } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

type ColorMode = "light" | "dark";

export function ColorModeProvider(props: ThemeProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
      {...props}
    />
  );
}

export function useColorMode() {
  const { resolvedTheme, setTheme } = useTheme();
  const colorMode: ColorMode = resolvedTheme === "dark" ? "dark" : "light";

  return {
    colorMode,
    setColorMode: setTheme,
    toggleColorMode: () => {
      setTheme(colorMode === "dark" ? "light" : "dark");
    },
  };
}

export function useColorModeValue<T>(light: T, dark: T) {
  return useColorMode().colorMode === "dark" ? dark : light;
}

function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  const nextColorMode = colorMode === "dark" ? "light" : "dark";

  return (
    <IconButton
      aria-label={`Switch to ${nextColorMode} mode`}
      color="inherit"
      colorPalette="gray"
      onClick={toggleColorMode}
      size="sm"
      variant="ghost"
    >
      {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  );
}

export function ColorModeButton() {
  return (
    <ClientOnly
      fallback={
        <IconButton
          aria-label="Toggle color mode"
          color="inherit"
          colorPalette="gray"
          disabled
          size="sm"
          variant="ghost"
        />
      }
    >
      <ColorModeToggle />
    </ClientOnly>
  );
}

const MoonIcon = createIcon({
  displayName: "MoonIcon",
  path: (
    <path
      d="M12 3a6 6 0 0 0 9 7.5A9 9 0 1 1 12 3Z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  ),
});

const SunIcon = createIcon({
  displayName: "SunIcon",
  path: (
    <>
      <circle cx="12" cy="12" fill="none" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M12 2v2" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      <path d="M12 20v2" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      <path d="m4.93 4.93 1.41 1.41" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      <path d="m17.66 17.66 1.41 1.41" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      <path d="M2 12h2" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      <path d="M20 12h2" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      <path d="m6.34 17.66-1.41 1.41" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      <path d="m19.07 4.93-1.41 1.41" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </>
  ),
});
