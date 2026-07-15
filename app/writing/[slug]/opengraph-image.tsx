import { ImageResponse } from 'next/og';

import { getPost } from '@/lib/posts';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Essay by Nripesh Pradhan';

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? 'Essay';
  const eyebrow = post?.series ? `WRITING · ${post.series.toUpperCase()}` : 'WRITING';

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#faf8f4',
        padding: 84,
      }}
    >
      <div style={{ display: 'flex', fontSize: 24, letterSpacing: 6, color: '#78725f' }}>
        {eyebrow}
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: title.length > 45 ? 58 : 68,
          color: '#1c1b19',
          lineHeight: 1.15,
          maxWidth: 1010,
          letterSpacing: -1,
        }}
      >
        {title}
      </div>
      <div style={{ display: 'flex', fontSize: 26, color: '#1a3d3a' }}>
        Nripesh Pradhan · nripeshpradhan.com
      </div>
    </div>,
    size
  );
}
