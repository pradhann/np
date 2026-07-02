import type { Work } from '@/lib/posts';

import Link from './Link';

export default function CaseStudyCard({ work, eyebrow }: { work: Work; eyebrow?: string }) {
  const meta = eyebrow ?? [work.company, work.period].filter(Boolean).join(' · ');

  return (
    <article>
      <Link href={`/work/${work.slug}`} className="group block py-8">
        {meta && <div className="eyebrow">{meta}</div>}
        <h3 className="mt-3 font-display text-2xl font-medium text-ink transition-colors group-hover:text-accent">
          {work.title}
        </h3>
        <p className="mt-2.5 max-w-prose leading-relaxed text-ink-muted">{work.summary}</p>
        {work.stack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {work.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border px-2.5 py-0.5 font-mono text-xs text-ink-muted"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </Link>
    </article>
  );
}
