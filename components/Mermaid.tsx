'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';

let counter = 0;

export default function Mermaid({ chart }: { chart: string }) {
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const idRef = useRef(`mermaid-${(counter += 1)}`);

  useEffect(() => {
    let active = true;
    setFailed(false);

    (async () => {
      try {
        const mermaid = (await import('mermaid')).default;
        const dark = resolvedTheme === 'dark';
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'loose',
          theme: 'base',
          // Brand palette (mermaid renders into SVG, so tokens must be literal).
          themeVariables: dark
            ? {
                primaryColor: '#24231d',
                primaryTextColor: '#ece8df',
                primaryBorderColor: '#4a4738',
                lineColor: '#a59f92',
                secondaryColor: '#1c1b16',
                tertiaryColor: '#141310',
                edgeLabelBackground: '#141310',
                clusterBkg: '#1c1b16',
                clusterBorder: '#302e26',
                fontSize: '15px',
              }
            : {
                primaryColor: '#fffefa',
                primaryTextColor: '#1c1b19',
                primaryBorderColor: '#d5cfc2',
                lineColor: '#78725f',
                secondaryColor: '#f4f1e9',
                tertiaryColor: '#faf8f4',
                edgeLabelBackground: '#faf8f4',
                clusterBkg: '#f4f1e9',
                clusterBorder: '#e4dfd5',
                fontSize: '15px',
              },
          fontFamily: 'var(--font-sans), sans-serif',
        });
        const { svg } = await mermaid.render(idRef.current, chart.trim());
        if (active) setSvg(svg);
      } catch {
        if (active) setFailed(true);
      }
    })();

    return () => {
      active = false;
    };
  }, [chart, resolvedTheme]);

  if (failed) {
    return <pre className="mermaid-diagram text-sm text-ink-muted">{chart.trim()}</pre>;
  }
  if (!svg) {
    return <div className="mermaid-diagram min-h-[6rem] animate-pulse" aria-hidden />;
  }
  return <div className="mermaid-diagram" dangerouslySetInnerHTML={{ __html: svg }} />;
}
