import { ImageResponse } from 'next/og';

export const alt = 'Nripesh Pradhan, builder of intelligence and automation systems for fintech';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
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
      <div style={{ display: 'flex', fontSize: 26, letterSpacing: 6, color: '#8e897f' }}>
        NRIPESH PRADHAN
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 68,
          color: '#1c1b19',
          lineHeight: 1.18,
          maxWidth: 1000,
          letterSpacing: -1,
        }}
      >
        I build the intelligence and automation that fintech runs on.
      </div>
      <div style={{ display: 'flex', fontSize: 28, color: '#1a3d3a' }}>
        Engineer &amp; systems builder · nripeshpradhan.com
      </div>
    </div>,
    size
  );
}
