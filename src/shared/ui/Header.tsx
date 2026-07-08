"use client";

import { Avatar, Box, Button, Container, Flex, HStack, Link as ChakraLink, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import type { ReactNode } from "react";

export type HeaderNavLink = {
  href: string;
  label: string;
};

type HeaderProps = {
  brandLabel: string;
  homeHref?: string;
  links: HeaderNavLink[];
  actions?: ReactNode;
};

export function Header({ actions, brandLabel, homeHref = "/", links }: HeaderProps) {
  const { data: session, status } = useSession();
  const user = session?.user;
  const userName = user?.name ?? "Signed in";
  const userEmail = user?.email;
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  return (
    <Box as="header" bg="bg" borderBottomWidth="1px" borderColor="border">
      <Container maxW="100%" px={{ base: "4", md: "6" }}>
        <Flex
          align="center"
          direction="row"
          gap="6"
          justify="space-between"
          minH="72px"
          py="4"
        >
          <ChakraLink
            as={NextLink}
            color="fg"
            fontSize="lg"
            fontWeight="extrabold"
            href={homeHref}
            ml={{ base: "2", md: "4" }}
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            {brandLabel}
          </ChakraLink>
          <HStack align="center" flex="1" gap="3" justify="flex-end" minW="0" wrap="wrap">
            <HStack as="nav" aria-label="Primary navigation" gap="2" justify="flex-end" wrap="wrap">
              {links.map((link) => (
                <ChakraLink
                  as={NextLink}
                  borderRadius="md"
                  color="fg.muted"
                  fontSize="sm"
                  fontWeight="bold"
                  href={link.href}
                  key={link.href}
                  minH="10"
                  px="3"
                  textDecoration="none"
                  _hover={{ color: "fg", textDecoration: "none" }}
                  _focusVisible={{
                    color: "fg",
                    outline: "2px solid",
                    outlineColor: "currentColor",
                  }}
                >
                  <Text as="span">{link.label}</Text>
                </ChakraLink>
              ))}
            </HStack>
            {isAuthenticated ? (
              <HStack align="center" gap="3" minW="0">
                <Avatar.Root size="sm">
                  <Avatar.Image alt={userName} src={user?.image ?? undefined} />
                  <Avatar.Fallback name={userName} />
                </Avatar.Root>
                <VStack align="flex-start" gap="0" maxW={{ base: "44", md: "64" }} minW="0">
                  <Text as="span" color="fg" fontSize="sm" fontWeight="bold" lineClamp="1">
                    {userName}
                  </Text>
                  {userEmail ? (
                    <Text as="span" color="fg.muted" fontSize="xs" lineClamp="1">
                      {userEmail}
                    </Text>
                  ) : null}
                </VStack>
                <Button
                  colorPalette="gray"
                  onClick={() => void signOut()}
                  size="sm"
                  variant="ghost"
                >
                  Sign out
                </Button>
              </HStack>
            ) : (
              <Button
                colorPalette="gray"
                disabled={isLoading}
                onClick={() => void signIn("google")}
                size="sm"
                variant="outline"
              >
                Sign in with Google
              </Button>
            )}
            {actions}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
