import type { Metadata } from 'next';

import CaseStudyCard from '@/components/CaseStudyCard';
import Container from '@/components/Container';
import EmptyState from '@/components/EmptyState';
import Link from '@/components/Link';
import PageHeader from '@/components/PageHeader';
import { publishedWork } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Case studies of production ML, LLM systems, and risk infrastructure designed and shipped for fintech at scale.',
};

type Group = { id: string; name: string; description: string; slugs: string[] };

const GROUPS: Group[] = [
  {
    id: 'screengpt',
    name: 'ScreenGPT',
    description:
      'An LLM system for sanctions screening, in three parts: the architecture, the evals that earned its trust, and what production taught us.',
    slugs: ['screengpt-the-system', 'screengpt-trusting-an-llm', 'screengpt-in-production'],
  },
  {
    id: 'fraud',
    name: 'Fraud',
    description:
      'The recurring shapes of consumer-fintech fraud: a field guide to the archetypes, a deep dive on the one that hid inside real growth, and the automation that runs the fraud desk.',
    slugs: [
      'the-fraud-archetypes',
      'catching-fraud-that-looked-like-growth',
      'automating-the-fraud-desk',
    ],
  },
  {
    id: 'compliance-platform',
    name: 'The compliance platform',
    description:
      'Replacing a $250K/year vendor with an in-house platform: the decision, the architecture, and the detection rules that power it.',
    slugs: [
      'replacing-a-compliance-vendor',
      'designing-the-compliance-platform',
      'standardizing-detection-rules',
    ],
  },
  {
    id: 'data-platform',
    name: 'Data platform',
    description: 'The dbt runtime and the data layer everything else is built on.',
    slugs: ['replacing-dbt-cloud'],
  },
];

export default function WorkPage() {
  const bySlug = new Map(publishedWork.map((w) => [w.slug, w]));
  const grouped = GROUPS.map((group) => ({
    ...group,
    items: group.slugs.map((slug) => bySlug.get(slug)).filter(Boolean),
  })).filter((g) => g.items.length > 0);

  const groupedSlugs = new Set(GROUPS.flatMap((g) => g.slugs));
  const ungrouped = publishedWork.filter((w) => !groupedSlugs.has(w.slug));

  const hasAny = grouped.length > 0 || ungrouped.length > 0;

  return (
    <Container className="py-16 sm:py-20">
      <PageHeader
        eyebrow="Work"
        title="Selected case studies"
        intro="Case studies of systems I designed and shipped at Chipper Cash: the problem each one solved, the architecture behind it, and what changed once it was running in production."
      />
      {hasAny ? (
        <>
          <nav className="mt-8 flex flex-wrap gap-2" aria-label="Jump to series">
            {grouped.map((group) => (
              <a
                key={group.id}
                href={`#${group.id}`}
                className="rounded-full border border-border px-3 py-1 font-mono text-xs text-ink-muted transition-colors hover:border-accent hover:text-accent"
              >
                {group.name} · {group.items.length}
              </a>
            ))}
          </nav>
          <div className="mt-12 space-y-16">
            {grouped.map((group) => (
              <section key={group.id} id={group.id} aria-label={group.name}>
                <header className="border-b border-border pb-4">
                  <p className="eyebrow mb-2">
                    {group.items.length > 1
                      ? `Series · ${group.items.length} case studies`
                      : 'Case study'}
                  </p>
                  <h2 className="font-display text-3xl font-medium text-ink">{group.name}</h2>
                  <p className="mt-2 max-w-prose text-sm leading-relaxed text-ink-muted">
                    {group.description}
                  </p>
                </header>
                <div className="divide-y divide-border">
                  {group.items.map(
                    (item, index) =>
                      item && (
                        <CaseStudyCard
                          key={item.slug}
                          work={item}
                          eyebrow={
                            group.items.length > 1
                              ? [`Part ${index + 1} of ${group.items.length}`, item.period]
                                  .filter(Boolean)
                                  .join(' · ')
                              : item.period
                          }
                        />
                      )
                  )}
                </div>
              </section>
            ))}
            {ungrouped.length > 0 && (
              <section id="more" aria-label="More case studies">
                <header className="border-b border-border pb-4">
                  <p className="eyebrow mb-2">Standalone</p>
                  <h2 className="font-display text-3xl font-medium text-ink">More case studies</h2>
                </header>
                <div className="divide-y divide-border">
                  {ungrouped.map((item) => (
                    <CaseStudyCard key={item.slug} work={item} eyebrow={item.period} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </>
      ) : (
        <div className="mt-12">
          <EmptyState title="Case studies are being written.">
            Detailed write-ups are in progress. The{' '}
            <Link href="/resume" className="text-accent underline">
              resume
            </Link>{' '}
            has the condensed version of what I&rsquo;ve built.
          </EmptyState>
        </div>
      )}
    </Container>
  );
}
