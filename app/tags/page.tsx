import type { Metadata } from 'next';

import Container from '@/components/Container';
import EmptyState from '@/components/EmptyState';
import Link from '@/components/Link';
import PageHeader from '@/components/PageHeader';
import { getAllTags, getTagDisplayNames } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Tags',
  description: 'Browse writing by topic.',
};

export default function TagsPage() {
  const tags = getAllTags();
  const names = getTagDisplayNames();
  const sorted = Object.keys(tags).sort((a, b) => tags[b] - tags[a]);

  return (
    <Container className="py-16 sm:py-20">
      <PageHeader eyebrow="Tags" title="Browse by topic" />
      {sorted.length ? (
        <div className="mt-8 flex flex-wrap gap-3">
          {sorted.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="rounded-full border border-border px-3 py-1 font-mono text-xs text-ink-muted transition-colors hover:border-accent hover:text-accent"
            >
              {names[tag] ?? tag} <span className="ml-1 text-ink-faint">{tags[tag]}</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-12">
          <EmptyState title="No tags yet.">
            Topics will appear here once the first essays are published.
          </EmptyState>
        </div>
      )}
    </Container>
  );
}
