import type { Metadata } from 'next';
import Image from 'next/image';

import Container from '@/components/Container';
import LinkButton from '@/components/LinkButton';
import Prose from '@/components/Prose';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Nripesh Pradhan, an engineer who builds intelligence, automation, and risk systems for fintech.',
};

const principles = [
  'Get the data layer right first. Everything downstream inherits its quality.',
  'Prefer systems you can open up. A vendor black box you cannot inspect is a liability dressed up as a convenience.',
  'Automate the judgment, not just the clicks. The value is in encoding the decision, not scripting the busywork.',
  'A noisy alert is worse than no alert. Every false positive spends trust you do not get back.',
  'Write it down. Explaining a system clearly is also how you find its flaws.',
];

export default function AboutPage() {
  return (
    <Container className="py-16 sm:py-20">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-[1fr_minmax(0,15rem)] sm:items-center sm:gap-14">
        <div className="order-1 sm:order-2">
          <Image
            src="/static/images/headshot.jpg"
            alt="Nripesh Pradhan"
            width={895}
            height={895}
            priority
            quality={92}
            sizes="(min-width: 640px) 15rem, 11rem"
            className="mx-auto h-44 w-44 rounded-full border border-border object-cover shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_30px_-14px_rgba(0,0,0,0.28)] sm:ml-auto sm:mr-0 sm:h-60 sm:w-60"
          />
        </div>
        <div className="order-2 sm:order-1">
          <p className="eyebrow">About</p>
          <h1 className="mt-4 font-display text-4xl font-medium leading-[1.05] text-ink sm:text-5xl">
            Hello, I&rsquo;m&nbsp;Nripesh.
          </h1>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-muted">
            I&rsquo;m an engineer who builds the systems fintech depends on: the pipelines that have
            to be right every time, the models that decide whether money moves, and the data layers
            everything else is built on.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <LinkButton href="/work">See the work</LinkButton>
            <LinkButton href="/contact" variant="outline">
              Get in touch
            </LinkButton>
          </div>
        </div>
      </div>

      <div className="mt-14 border-t border-border pt-12">
        <Prose className="max-w-reading">
          <h2>The path here</h2>
          <p>
            I studied mathematics and statistics at Grinnell College, with a detour through the
            Budapest Semesters in Mathematics. I started out in data-science consulting, building
            predictive analytics for Fortune 500 retailers, where I learned to turn a vague business
            problem into something a model can actually answer.
          </p>
          <p>
            In 2021 I joined Chipper Cash, a cross-border payments company, as a data scientist. The
            job was supposed to be analytics. It quickly became infrastructure. I led the
            company&rsquo;s move to dbt and designed the core financial data models that still power
            its analytics, dashboards, and internal tools, and I ended up running the
            data-transformations practice that more than fifteen engineers build on.
          </p>
          <p>
            From there the work moved steadily closer to the things that cost real money. As a tech
            lead on risk and growth I designed and shipped fraud-detection systems: a model that
            scores every new user for fraud risk, real-time transaction scoring, account-takeover
            defenses. Today, as Head of Risk Intelligence and Automations, I own fraud, compliance,
            and risk-data systems across seven markets, leading a small, AI-first team that has been
            replacing third-party vendors with in-house systems we fully understand and control.
          </p>

          <h2>What I&rsquo;ve built</h2>
          <p>
            Most of my favorite work has the same shape: take something slow, manual, and
            vendor-dependent, and turn it into a system that is fast, owned, and observable. A
            compliance platform that replaced a six-figure vendor contract. An onboarding-fraud
            model that blocks thousands of fraudulent referrals a day. An in-house identity stack
            (document verification, liveness, sanctions screening) that retired roughly $1.4M a year
            in vendor fees. A pipeline that reads partner fraud reports, understands them with an
            LLM, and acts in seconds instead of half an hour.
          </p>

          <h2>How I think about building</h2>
          <ul>
            {principles.map((principle) => (
              <li key={principle}>{principle}</li>
            ))}
          </ul>

          <h2>Outside the work</h2>
          <p>
            I think a lot about risk and uncertainty, which spills over into chess and poker. I
            follow football closely and recently fell in love with pickleball. I read broadly and
            eclectically, more flâneur than scholar. And I write: essays on the systems behind
            fintech and the craft of building, and, increasingly, on the books and ideas I cannot
            stop turning over.
          </p>
        </Prose>
      </div>
    </Container>
  );
}
