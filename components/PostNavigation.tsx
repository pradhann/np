import Link from './Link';

type Adjacent = { slug: string; title: string };

export default function PostNavigation({ prev, next }: { prev?: Adjacent; next?: Adjacent }) {
  if (!prev && !next) return null;

  return (
    <nav className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
      {prev ? (
        <Link href={`/writing/${prev.slug}`} className="group block">
          <span className="eyebrow">Previous</span>
          <span className="mt-1.5 block font-display text-lg text-ink transition-colors group-hover:text-accent">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={`/writing/${next.slug}`} className="group block sm:text-right">
          <span className="eyebrow">Next</span>
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
