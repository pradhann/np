import CaseStudyCard from '@/components/CaseStudyCard';
import Container from '@/components/Container';
import EmptyState from '@/components/EmptyState';
import Link from '@/components/Link';
import LinkButton from '@/components/LinkButton';
import PostCard from '@/components/PostCard';
import SectionHeading from '@/components/SectionHeading';
import { siteMetadata } from '@/data/siteMetadata';
import { featuredWork, publishedPosts } from '@/lib/posts';

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteMetadata.name,
  url: siteMetadata.siteUrl,
  jobTitle: 'Head of Risk Intelligence & Automations',
  worksFor: { '@type': 'Organization', name: 'Chipper Cash' },
  description: siteMetadata.description,
  sameAs: [siteMetadata.github, siteMetadata.linkedin],
};

const stats = [
  { value: '7+ years', label: 'building production ML systems' },
  { value: '148K+ alerts', label: 'adjudicated by an LLM pipeline I built' },
  { value: '$1.4M+ / yr', label: 'in fraud losses prevented by one ML model' },
];

export default function HomePage() {
  const work = featuredWork.slice(0, 3);
  const posts = publishedPosts.slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Container className="pb-14 pt-24 sm:pb-16 sm:pt-32">
        <div className="max-w-3xl">
          <p className="eyebrow">ML engineer &amp; systems builder · San Francisco</p>
          <h1 className="mt-6 font-display text-display font-medium text-ink">
            I build the intelligence and automation that fintech runs on.
          </h1>
          <p className="mt-7 max-w-prose text-lg leading-relaxed text-ink-muted">
            I lead Risk Intelligence &amp; Automations at Chipper Cash, where I design and ship the
            production side of ML: fraud models, LLM pipelines with real evals, and real-time
            scoring that moves money or stops it. I also write about systems, risk, and the books I
            cannot stop turning over.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <LinkButton href="/work">See the work</LinkButton>
            <LinkButton href="/resume" variant="outline">
              Resume
            </LinkButton>
          </div>
        </div>
      </Container>

      <Container>
        <dl className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.value} className="bg-canvas px-6 py-7">
              <dt className="font-display text-2xl text-ink">{stat.value}</dt>
              <dd className="mt-1 text-sm text-ink-muted">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </Container>

      <Container className="pt-24">
        <SectionHeading
          eyebrow="Selected work"
          title="Systems I’ve designed and shipped"
          link={work.length ? { href: '/work', label: 'All work' } : undefined}
        />
        {work.length ? (
          <div className="divide-y divide-border">
            {work.map((item) => (
              <CaseStudyCard key={item.slug} work={item} />
            ))}
          </div>
        ) : (
          <div className="pt-8">
            <EmptyState title="Case studies are being written.">
              Detailed write-ups of what I&rsquo;ve built are on the way. In the meantime, the{' '}
              <Link href="/resume" className="text-accent underline">
                resume
              </Link>{' '}
              has the short version.
            </EmptyState>
          </div>
        )}
      </Container>

      <Container className="pt-24">
        <SectionHeading
          eyebrow="Writing"
          title="Recent essays"
          link={posts.length ? { href: '/writing', label: 'All writing' } : undefined}
        />
        {posts.length ? (
          <div className="divide-y divide-border">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="pt-8">
            <EmptyState title="Essays are in the works.">
              I&rsquo;m writing a series on the systems behind modern fintech: fraud, risk, and
              money movement. Check back soon.
            </EmptyState>
          </div>
        )}
      </Container>

      <Container className="pt-24">
        <div className="rounded-2xl border border-border bg-surface px-8 py-12 sm:px-14">
          <h2 className="font-display text-2xl font-medium text-ink">Building something hard?</h2>
          <p className="mt-3 max-w-prose leading-relaxed text-ink-muted">
            If you are working on fraud, risk, or an LLM system that has to hold up in production, I
            would like to hear about it.
          </p>
          <div className="mt-7">
            <LinkButton href="/contact">Get in touch</LinkButton>
          </div>
        </div>
      </Container>
    </>
  );
}
