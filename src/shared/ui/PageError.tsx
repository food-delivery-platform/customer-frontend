import NextLink from "next/link";
import { Button } from "@chakra-ui/react";
import { PageShell } from "@/shared/ui/PageShell";

type PageErrorProps = {
  eyebrow: string;
  title: string;
  description: string;
  backHref?: string;
  backLabel?: string;
};

export function PageError({
  eyebrow,
  title,
  description,
  backHref = "/restaurants",
  backLabel = "Back to restaurants",
}: PageErrorProps) {
  return (
    <PageShell description={description} eyebrow={eyebrow} title={title}>
      <Button asChild variant="outline">
        <NextLink href={backHref}>{backLabel}</NextLink>
      </Button>
    </PageShell>
  );
}
