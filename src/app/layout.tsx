import type { Metadata } from "next";
import "@/shared/ui/globals.css";
import { Header, type HeaderNavLink } from "@/shared/ui/Header";
import { ColorModeButton } from "@/shared/ui/color-mode";
import { Providers } from "@/shared/ui/Providers";

export const metadata: Metadata = {
  title: "Customer Food Delivery",
  description: "Customer frontend for browsing restaurants, managing a cart, and tracking orders.",
};

const navigationLinks: HeaderNavLink[] = [
  { href: "/restaurants", label: "Restaurants" },
  { href: "/orders", label: "Order History" },
  { href: "/cart", label: "Cart" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Header actions={<ColorModeButton />} brandLabel="Food Delivery" links={navigationLinks} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
