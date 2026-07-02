import type { Metadata } from 'next';

import Container from '@/components/Container';
import EmptyState from '@/components/EmptyState';
import Link from '@/components/Link';
import PageHeader from '@/components/PageHeader';
import PostCard from '@/components/PostCard';
import { publishedPosts, slugifyTag } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Essays on the books and ideas I keep turning over.',
};

type SeriesDef = { name: string; description: string };

const SERIES: SeriesDef[] = [
  {
    name: 'Brothers Karamazov',
    description:
      "A weekly engagement with Dostoevsky's last novel, January through March 2026. The arc through Ivan's Grand Inquisitor, the devil that visits him, and Alyosha's quiet answer at the end.",
  },
  {
    name: 'Crime and Punishment',
    description:
      "Essays from a weekly reading group on Dostoevsky's Crime and Punishment, April through May 2024.",
  },
  {
    name: 'Demons',
    description:
      "Essays from a reading group on Dostoevsky's Demons, May through June 2024. On Kirillov's nihilism, Stavrogin's contradictions, and the future the novel saw coming.",
  },
  {
    name: 'Against the Gods',
    description:
      "A three-part series inspired by Peter L. Bernstein's history of risk. From fatalism to portfolio theory, and the frontiers we still cannot model.",
  },
  {
    name: 'I See Satan',
    description:
      "A two-part field guide to René Girard's mimetic theory. On desire, scapegoats, and the moment victims started to testify.",
  },
];

const byDateAsc = (a: { date: string }, b: { date: string }) =>
  a.date < b.date ? -1 : a.date > b.date ? 1 : 0;

const byDateDesc = (a: { date: string }, b: { date: string }) =>
  a.date < b.date ? 1 : a.date > b.date ? -1 : 0;

export default function WritingPage() {
  const grouped = SERIES.map((series) => ({
    ...series,
    posts: publishedPosts.filter((p) => p.series === series.name).sort(byDateAsc),
  })).filter((g) => g.posts.length > 0);

  const orphans = publishedPosts
    .filter((p) => !p.series || !SERIES.some((s) => s.name === p.series))
    .sort(byDateDesc);

  const hasAny = grouped.length > 0 || orphans.length > 0;

  return (
    <Container className="py-16 sm:py-20">
      <PageHeader
        eyebrow="Writing"
        title="Essays & notes"
        intro="Essays on the books and ideas I keep turning over. Notes, musings, and glimpses of how I think, the world from where I stand."
      />
      {hasAny ? (
        <>
          <nav className="mt-8 flex flex-wrap gap-2" aria-label="Jump to series">
            {grouped.map((group) => (
              <a
                key={group.name}
                href={`#${slugifyTag(group.name)}`}
                className="rounded-full border border-border px-3 py-1 font-mono text-xs text-ink-muted transition-colors hover:border-accent hover:text-accent"
              >
                {group.name} · {group.posts.length}
              </a>
            ))}
            {orphans.length > 0 && (
              <a
                href="#essays"
                className="rounded-full border border-border px-3 py-1 font-mono text-xs text-ink-muted transition-colors hover:border-accent hover:text-accent"
              >
                Essays · {orphans.length}
              </a>
            )}
          </nav>
          <div className="mt-12 space-y-16">
            {grouped.map((group) => (
              <section key={group.name} id={slugifyTag(group.name)}>
                <header className="border-b border-border pb-4">
                  <p className="eyebrow mb-2">
                    Series · {group.posts.length} {group.posts.length === 1 ? 'essay' : 'essays'}
                  </p>
                  <h2 className="font-display text-3xl font-medium text-ink">{group.name}</h2>
                  <p className="mt-2 max-w-prose text-sm leading-relaxed text-ink-muted">
                    {group.description}
                  </p>
                </header>
                <div className="divide-y divide-border">
                  {group.posts.map((post) => (
                    <PostCard
                      key={post.slug}
                      post={post}
                      showSeries={false}
                      displayTitle={
                        post.title.startsWith(`${group.name}:`)
                          ? post.title.slice(group.name.length + 1).trim()
                          : undefined
                      }
                    />
                  ))}
                </div>
              </section>
            ))}
            {orphans.length > 0 && (
              <section id="essays">
                <header className="border-b border-border pb-4">
                  <p className="eyebrow mb-2">Standalone</p>
                  <h2 className="font-display text-3xl font-medium text-ink">Essays</h2>
                  <p className="mt-2 max-w-prose text-sm leading-relaxed text-ink-muted">
                    Standalone pieces, not part of a series.
                  </p>
                </header>
                <div className="divide-y divide-border">
                  {orphans.map((post) => (
                    <PostCard key={post.slug} post={post} showSeries={false} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </>
      ) : (
        <div className="mt-12">
          <EmptyState title="The first essays are on the way.">
            Until they land, take a look at the{' '}
            <Link href="/work" className="text-accent underline">
              work
            </Link>
            .
          </EmptyState>
        </div>
      )}
    </Container>
  );
}
