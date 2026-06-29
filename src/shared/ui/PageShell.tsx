import type { ReactNode } from "react";

type PageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function PageShell({ eyebrow, title, description, children }: PageShellProps) {
  return (
    <main className="page-shell">
      <p className="page-shell__eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="page-shell__description">{description}</p>
      {children ? <div className="page-shell__content">{children}</div> : null}
    </main>
  );
}
