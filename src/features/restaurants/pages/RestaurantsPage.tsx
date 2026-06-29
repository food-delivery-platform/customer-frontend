import Link from "next/link";
import { PageShell } from "@/shared/ui/PageShell";

export function RestaurantsPage() {
  return (
    <PageShell
      eyebrow="Restaurants"
      title="Restaurant listing"
      description="Restaurant discovery will be implemented here."
    >
      <Link className="placeholder-link" href="/restaurants/demo-restaurant">
        Open sample restaurant
      </Link>
    </PageShell>
  );
}
