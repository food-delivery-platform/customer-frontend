import type { Metadata } from "next";
import "@/shared/ui/globals.css";

export const metadata: Metadata = {
  title: "Customer Food Delivery",
  description: "Customer frontend for browsing restaurants, managing a cart, and tracking orders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
