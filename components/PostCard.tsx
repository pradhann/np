import { formatDate } from '@/lib/dates';
import type { Post } from '@/lib/posts';

import Link from './Link';

export default function PostCard({
  post,
  showSeries = true,
  displayTitle,
}: {
  post: Post;
  showSeries?: boolean;
  displayTitle?: string;
}) {
  return (
    <article>
      <Link href={`/writing/${post.slug}`} className="group block py-8">
        {showSeries && post.series && <p className="eyebrow mb-2">{post.series}</p>}
        <div className="flex items-center gap-2 font-mono text-xs text-ink-faint">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h3 className="mt-2.5 font-display text-xl font-medium text-ink transition-colors group-hover:text-accent">
          {displayTitle ?? post.title}
        </h3>
        {post.summary && (
          <p className="mt-2 max-w-prose leading-relaxed text-ink-muted">{post.summary}</p>
        )}
      </Link>
    </article>
  );
}
