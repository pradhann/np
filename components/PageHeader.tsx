import type { ReactNode } from 'react';

export default function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
}) {
  return (
    <header className="border-b border-border pb-10">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className="mt-4 font-display text-title font-medium text-ink">{title}</h1>
      {intro && <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-muted">{intro}</p>}
    </header>
  );
}
