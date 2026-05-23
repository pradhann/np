import type { ReactNode } from 'react';

import Container from '@/components/Container';
import Prose from '@/components/Prose';

export default function PostLayout({
  eyebrow,
  title,
  summary,
  meta,
  children,
  footer,
}: {
  eyebrow?: string;
  title: string;
  summary?: string;
  meta?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <Container size="reading" className="py-16 sm:py-20">
      <article>
        <header className="border-b border-border pb-10">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="mt-4 font-display text-title font-medium text-ink">{title}</h1>
          {summary && <p className="mt-5 text-lg leading-relaxed text-ink-muted">{summary}</p>}
          {meta && (
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-ink-faint">
              {meta}
            </div>
          )}
        </header>
        <div className="mt-10">
          <Prose>{children}</Prose>
        </div>
        {footer}
      </article>
    </Container>
  );
}
