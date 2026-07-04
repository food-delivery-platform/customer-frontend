"use client";

import { Box, Container, Flex, HStack, Link as ChakraLink, Text } from "@chakra-ui/react";
import NextLink from "next/link";
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
            {actions}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
