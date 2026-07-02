import Link from './Link';

type Adjacent = { slug: string; title: string };

export default function PostNavigation({
  prev,
  next,
  basePath = '/writing',
  prevLabel = 'Previous',
  nextLabel = 'Next',
}: {
  prev?: Adjacent;
  next?: Adjacent;
  basePath?: string;
  prevLabel?: string;
  nextLabel?: string;
}) {
  if (!prev && !next) return null;

  return (
    <nav className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
      {prev ? (
        <Link href={`${basePath}/${prev.slug}`} className="group block">
          <span className="eyebrow">{prevLabel}</span>
          <span className="mt-1.5 block font-display text-lg text-ink transition-colors group-hover:text-accent">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={`${basePath}/${next.slug}`} className="group block sm:text-right">
          <span className="eyebrow">{nextLabel}</span>
          <span className="mt-1.5 block font-display text-lg text-ink transition-colors group-hover:text-accent">
            {next.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
