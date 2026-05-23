import { slugifyTag } from '@/lib/posts';

import Link from './Link';

export default function Tag({ text }: { text: string }) {
  return (
    <Link
      href={`/tags/${slugifyTag(text)}`}
      className="rounded-full border border-border px-2.5 py-0.5 font-mono text-xs text-ink-muted transition-colors hover:border-accent hover:text-accent"
    >
      {text}
    </Link>
  );
}
