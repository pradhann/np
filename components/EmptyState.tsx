import type { ReactNode } from 'react';

export default function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-border px-8 py-20 text-center">
      <p className="font-display text-xl text-ink">{title}</p>
      {children && <div className="mt-3 text-sm leading-relaxed text-ink-muted">{children}</div>}
    </div>
  );
}
