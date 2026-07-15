import { ImageResponse } from 'next/og';

import { getWork } from '@/lib/posts';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Case study by Nripesh Pradhan';

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getWork(slug);
  const title = item?.title ?? 'Case study';
  const stack = item?.stack?.slice(0, 4).join(' · ') ?? '';

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
        NRIPESH PRADHAN · CASE STUDY
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 26,
          color: '#1a3d3a',
        }}
      >
        <div style={{ display: 'flex' }}>{stack}</div>
        <div style={{ display: 'flex' }}>nripeshpradhan.com</div>
      </div>
    </div>,
    size
  );
}
