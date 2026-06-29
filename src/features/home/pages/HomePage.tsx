import Link from "next/link";
import { PageShell } from "@/shared/ui/PageShell";

const links = [
  { href: "/restaurants", label: "Browse restaurants" },
  { href: "/cart", label: "View cart" },
  { href: "/orders", label: "Track orders" },
];

export function HomePage() {
  return (
    <PageShell
      eyebrow="Food Delivery"
      title="Customer frontend placeholder"
      description="Initial application shell for the customer ordering experience."
    >
      <nav className="placeholder-actions" aria-label="Primary navigation">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </PageShell>
  );
}
