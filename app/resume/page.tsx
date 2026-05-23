import type { Metadata } from 'next';
import { FiArrowUpRight, FiDownload } from 'react-icons/fi';

import Container from '@/components/Container';
import Link from '@/components/Link';
import { resume } from '@/data/resume';
import { siteMetadata } from '@/data/siteMetadata';

export const metadata: Metadata = {
  title: 'Resume',
  description: `${siteMetadata.name}, ${resume.role} at ${resume.company}. ${resume.summary}`,
};

const contactLinks = [
  { label: 'Email', href: `mailto:${siteMetadata.email}` },
  { label: 'LinkedIn', href: siteMetadata.linkedin },
  { label: 'GitHub', href: siteMetadata.github },
];

function SectionLabel({ children }: { children: string }) {
  return <h2 className="eyebrow border-b border-border pb-3 text-ink-faint">{children}</h2>;
}

export default function ResumePage() {
  return (
    <Container size="reading" className="py-16 sm:py-20">
      {/* Header */}
      <header>
        <p className="eyebrow">Resume</p>
        <h1 className="mt-4 font-display text-title font-medium text-ink">Nripesh Pradhan</h1>
        <p className="mt-3 text-lg text-ink-muted">
          {resume.role} · {resume.company} · {resume.location}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={siteMetadata.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-canvas transition-colors hover:bg-accent-hover"
          >
            <FiDownload size={15} />
            Download PDF
          </a>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {contactLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-ink-muted underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Summary */}
      <p className="mt-12 text-lg leading-relaxed text-ink">{resume.summary}</p>

      {/* At a glance */}
      <section className="mt-12">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
          {resume.metrics.map((metric) => (
            <div key={metric.label} className="bg-canvas px-5 py-6">
              <dt className="font-display text-2xl text-ink">
                {metric.value}
                <span className="ml-1 text-sm text-ink-faint">{metric.unit}</span>
              </dt>
              <dd className="mt-1.5 text-xs leading-relaxed text-ink-muted">{metric.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Selected impact */}
      <section className="mt-16">
        <SectionLabel>Selected impact</SectionLabel>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {resume.impact.map((item) => (
            <div
              key={item.title}
              className="flex flex-col rounded-xl border border-border bg-surface p-6"
            >
              <h3 className="font-display text-lg font-medium leading-snug text-ink">
                {item.title}
              </h3>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-muted">{item.detail}</p>
              {item.caseStudy && (
                <Link
                  href={`/work/${item.caseStudy}`}
                  className="group mt-4 inline-flex items-center gap-1 text-sm text-accent"
                >
                  Read the case study
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mt-16">
        <SectionLabel>Experience</SectionLabel>
        <div className="divide-y divide-border">
          {resume.experience.map((role) => (
            <div key={`${role.company}-${role.period}`} className="py-8">
              <p className="font-mono text-xs text-ink-faint">{role.period}</p>
              <h3 className="mt-2 font-display text-xl font-medium text-ink">{role.role}</h3>
              <p className="mt-0.5 text-sm text-ink-muted">{role.company}</p>
              <p className="mt-3 leading-relaxed text-ink-muted">{role.summary}</p>
              <ul className="mt-4 space-y-2.5">
                {role.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                    <span
                      aria-hidden
                      className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-accent"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {role.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-2.5 py-0.5 font-mono text-xs text-ink-muted"
                  >
                    {tag}
                  </span>
                ))}
                {role.caseStudy && (
                  <Link
                    href={`/work/${role.caseStudy}`}
                    className="group ml-1 inline-flex items-center gap-1 text-xs text-accent"
                  >
                    Case study
                    <FiArrowUpRight size={12} />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Systems shipped */}
      <section className="mt-16">
        <SectionLabel>Systems shipped</SectionLabel>
        <div className="mt-6 space-y-8">
          {resume.systems.map((group) => (
            <div key={group.category}>
              <p className="eyebrow mb-3">{group.category}</p>
              <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {group.items.map((system) => (
                  <div key={system.name} className="border-b border-border/60 pb-3">
                    {system.caseStudy ? (
                      <Link
                        href={`/work/${system.caseStudy}`}
                        className="font-display text-[0.95rem] text-ink transition-colors hover:text-accent"
                      >
                        {system.name}
                      </Link>
                    ) : (
                      <span className="font-display text-[0.95rem] text-ink">{system.name}</span>
                    )}
                    <p className="mt-1 text-xs leading-relaxed text-ink-muted">{system.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Toolbox */}
      <section className="mt-16">
        <SectionLabel>Toolbox</SectionLabel>
        <div className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2">
          {resume.skills.map((skill) => (
            <div key={skill.group}>
              <p className="eyebrow mb-1.5">{skill.group}</p>
              <p className="text-sm leading-relaxed text-ink">{skill.items.join(' · ')}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mt-16">
        <SectionLabel>Education</SectionLabel>
        <div className="mt-2 divide-y divide-border">
          {resume.education.map((entry) => (
            <div key={entry.school} className="flex items-baseline justify-between gap-4 py-4">
              <div>
                <p className="font-display text-base text-ink">{entry.school}</p>
                {entry.detail && <p className="mt-0.5 text-sm text-ink-muted">{entry.detail}</p>}
              </div>
              {entry.period && (
                <p className="shrink-0 font-mono text-xs text-ink-faint">{entry.period}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Writing pointer */}
      <section className="mt-16 rounded-xl border border-border bg-surface p-8">
        <p className="leading-relaxed text-ink-muted">
          Beyond the systems work, I write: essays on fintech and risk, the craft of building, and
          the books I keep turning over.
        </p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/writing" className="text-sm text-accent underline underline-offset-4">
            Read the writing
          </Link>
          <Link href="/work" className="text-sm text-accent underline underline-offset-4">
            See the case studies
          </Link>
        </div>
      </section>
    </Container>
  );
}
