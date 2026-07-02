import type { Metadata } from 'next';
import Image from 'next/image';

import Container from '@/components/Container';
import Link from '@/components/Link';
import LinkButton from '@/components/LinkButton';
import Prose from '@/components/Prose';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Nripesh Pradhan builds production ML and LLM systems for fintech: models that move money, pipelines with real evals, and the data layer underneath.',
};

const principles = [
  'An LLM system without an eval is a demo. Build the golden dataset before you build the pipeline.',
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
          <h1 className="mt-4 font-display text-title font-medium text-ink">
            Hello, I&rsquo;m&nbsp;Nripesh.
          </h1>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-muted">
            I build production ML and LLM systems for fintech: models that decide in real time
            whether money moves, LLM pipelines that hold up under real evals, and the data layer
            everything else stands on.
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
            From there the work moved steadily closer to the things that cost real money. As a
            staff-level tech lead on risk I designed and shipped the fraud-detection stack: a model
            that scores every new user, real-time transaction scoring, account-takeover defenses.
            Today, as Head of Risk Intelligence and Automations, I lead a small team building ML and
            LLM systems across seven markets, replacing vendor black boxes with systems we can open
            up, measure, and trust.
          </p>

          <h2>What I&rsquo;ve built</h2>
          <p>
            Most of my favorite work has the same shape: take something slow, manual, and
            vendor-dependent, and turn it into a system that is fast, owned, and measured.{' '}
            <Link href="/work/screengpt-the-system">
              An LLM pipeline that adjudicates watchlist alerts
            </Link>
            , evaluated against a double-blind golden dataset before it touched a single real case,
            then run over a 148,000-alert backlog at four cents a decision.{' '}
            <Link href="/work/catching-fraud-that-looked-like-growth">
              A fraud model that blocks six thousand bad signups a day
            </Link>
            .{' '}
            <Link href="/work/automating-the-fraud-desk">
              A pipeline that reads partner fraud reports with an LLM and acts in twenty seconds
              instead of thirty minutes
            </Link>
            .{' '}
            <Link href="/work/replacing-a-compliance-vendor">
              A platform that replaced a six-figure vendor contract
            </Link>
            . The pattern I care about is the middle step: you do not ship a model because it demos
            well, you ship it because you built the eval that proves it.
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
            follow football closely and recently fell in love with pickleball. And I read seriously
            and eclectically, and write <Link href="/writing">essays</Link> on the books I keep
            turning over, because explaining a book clearly turns out to be a lot like explaining a
            system. It is how you find out what you actually think.
          </p>
          <p>
            Right now I am deep in LLM evals and the question of when to trust a model with a real
            decision. If you are working on the same problems,{' '}
            <Link href="/contact">I would like to hear from you</Link>.
          </p>
        </Prose>
      </div>
    </Container>
  );
}
