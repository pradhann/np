import type { Metadata } from 'next';
import { FiArrowUpRight } from 'react-icons/fi';

import Container from '@/components/Container';
import Link from '@/components/Link';
import PageHeader from '@/components/PageHeader';
import { siteMetadata } from '@/data/siteMetadata';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Nripesh Pradhan.',
};

const methods = [
  { label: 'Email', value: siteMetadata.email, href: `mailto:${siteMetadata.email}` },
  {
    label: 'LinkedIn',
    value: `linkedin.com/in/${siteMetadata.linkedinHandle}`,
    href: siteMetadata.linkedin,
  },
  {
    label: 'GitHub',
    value: `github.com/${siteMetadata.githubHandle}`,
    href: siteMetadata.github,
  },
];

export default function ContactPage() {
  return (
    <Container size="reading" className="py-16 sm:py-20">
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        intro="I’m always glad to talk about production ML, LLM systems and evals, fraud and risk, or the craft of building. A role, a collaboration, a founder working on a hard fintech problem, or a good argument about Dostoevsky all qualify. I read everything and usually reply within a couple of days."
      />
      <div className="mt-4 divide-y divide-border">
        {methods.map((method) => (
          <Link
            key={method.label}
            href={method.href}
            className="group flex items-center justify-between gap-6 py-6"
          >
            <div>
              <p className="eyebrow mb-1.5">{method.label}</p>
              <p className="font-display text-xl text-ink transition-colors group-hover:text-accent">
                {method.value}
              </p>
            </div>
            <FiArrowUpRight
              className="shrink-0 text-ink-faint transition-colors group-hover:text-accent"
              size={20}
            />
          </Link>
        ))}
      </div>
    </Container>
  );
}
