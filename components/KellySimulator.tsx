'use client';

import { useCallback, useMemo, useState } from 'react';

const P_WIN = 0.75;
const ROUNDS = 100;
const START = 100_000;
const BUST_FLOOR = 1; // below $1 we call it ruin

type Run = { values: number[]; busted: boolean };

function growthRate(f: number): number {
  if (f <= 0) return 0;
  if (f >= 1) return -Infinity;
  return P_WIN * Math.log(1 + f) + (1 - P_WIN) * Math.log(1 - f);
}

function simulateFraction(f: number): Run {
  const values: number[] = [START];
  let bankroll = START;
  let busted = false;
  for (let i = 0; i < ROUNDS; i += 1) {
    if (busted) {
      values.push(0);
      continue;
    }
    const win = Math.random() < P_WIN;
    bankroll = win ? bankroll * (1 + f) : bankroll * (1 - f);
    if (bankroll < BUST_FLOOR) {
      bankroll = 0;
      busted = true;
    }
    values.push(bankroll);
  }
  return { values, busted };
}

function simulateAmount(amount: number): Run {
  const values: number[] = [START];
  let bankroll = START;
  let busted = false;
  for (let i = 0; i < ROUNDS; i += 1) {
    if (busted) {
      values.push(0);
      continue;
    }
    const bet = Math.min(amount, bankroll);
    const win = Math.random() < P_WIN;
    bankroll = win ? bankroll + bet : bankroll - bet;
    if (bankroll < BUST_FLOOR) {
      bankroll = 0;
      busted = true;
    }
    values.push(bankroll);
  }
  return { values, busted };
}

const fmtMoney = (v: number): string => {
  if (v <= 0) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(v);
};

const fmtPow = (k: number): string => fmtMoney(10 ** k);

// ---- chart geometry ----
const W = 640;
const H = 300;
const PAD = { top: 14, right: 16, bottom: 26, left: 54 };

const xScale = (round: number) => PAD.left + (round / ROUNDS) * (W - PAD.left - PAD.right);

function pathFor(values: number[], y: (v: number) => number): string {
  return values
    .map((v, i) => `${i === 0 ? 'M' : 'L'}${xScale(i).toFixed(1)},${y(Math.max(v, 0)).toFixed(1)}`)
    .join('');
}

// ---- growth-rate curve geometry (fraction mode) ----
const GW = 640;
const GH = 190;
const GPAD = { top: 14, right: 16, bottom: 30, left: 54 };
const G_MIN = -0.35;
const G_MAX = 0.16;

const gx = (f: number) => GPAD.left + f * (GW - GPAD.left - GPAD.right);
const gy = (g: number) =>
  GH - GPAD.bottom - ((g - G_MIN) / (G_MAX - G_MIN)) * (GH - GPAD.top - GPAD.bottom);

// f where growth crosses zero for p = 0.75 (numerically ~0.8393)
const ZERO_CROSS = 0.8393;
const KELLY = 2 * P_WIN - 1; // 0.5

const growthPath = (() => {
  const pts: string[] = [];
  for (let i = 0; i <= 196; i += 1) {
    const f = (i / 196) * 0.98;
    const g = Math.max(growthRate(f), G_MIN);
    pts.push(`${i === 0 ? 'M' : 'L'}${gx(f).toFixed(1)},${gy(g).toFixed(1)}`);
  }
  return pts.join('');
})();

const FRACTION_PRESETS = [
  { f: 0.1, label: '10% · timid' },
  { f: 0.5, label: '50% · Kelly' },
  { f: 0.9, label: '90% · reckless' },
  { f: 1.0, label: '100% · all-in' },
];

const AMOUNT_PRESETS = [2_000, 10_000, 30_000, 100_000];

function useStats(runs: Run[]) {
  return useMemo(() => {
    if (runs.length === 0) return null;
    const finals = runs.map((r) => r.values[ROUNDS]).sort((a, b) => a - b);
    const mid = Math.floor(finals.length / 2);
    const median = finals.length % 2 ? finals[mid] : (finals[mid - 1] + finals[mid]) / 2;
    return {
      median,
      best: finals[finals.length - 1],
      worst: finals[0],
      busted: runs.filter((r) => r.busted).length,
      n: runs.length,
    };
  }, [runs]);
}

function RunButtons({ onRun, onClear }: { onRun: (n: number) => void; onClear: () => void }) {
  return (
    <>
      <button
        type="button"
        onClick={() => onRun(1)}
        className="rounded-full bg-accent px-4 py-1 font-mono text-xs font-medium text-canvas transition-colors hover:bg-accent-hover"
      >
        run once
      </button>
      <button
        type="button"
        onClick={() => onRun(25)}
        className="rounded-full border border-accent px-4 py-1 font-mono text-xs text-accent transition-colors hover:bg-accent hover:text-canvas"
      >
        run 25
      </button>
      <button
        type="button"
        onClick={onClear}
        className="rounded-full border border-border px-4 py-1 font-mono text-xs text-ink-muted transition-colors hover:border-ink/40"
      >
        clear
      </button>
    </>
  );
}

function StatsGrid({ stats }: { stats: ReturnType<typeof useStats> }) {
  const cells = [
    ['median', stats ? fmtMoney(stats.median) : '·'],
    ['best', stats ? fmtMoney(stats.best) : '·'],
    ['worst', stats ? fmtMoney(stats.worst) : '·'],
    ['ruined', stats ? `${stats.busted} / ${stats.n}` : '·'],
  ];
  return (
    <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
      {cells.map(([label, value]) => (
        <div key={label} className="bg-canvas px-4 py-3">
          <p className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">{label}</p>
          <p className="mt-0.5 font-display text-lg text-ink">{value}</p>
        </div>
      ))}
    </div>
  );
}

function Paths({ runs, y }: { runs: Run[]; y: (v: number) => number }) {
  return (
    <>
      {runs.map((run, i) => (
        <path
          key={i}
          d={pathFor(run.values, y)}
          fill="none"
          strokeWidth={1.4}
          pathLength={1}
          strokeDasharray={1}
          className={run.busted ? 'stroke-red-600/70' : 'stroke-accent/50'}
          style={{
            strokeDashoffset: 0,
            animation: 'kelly-draw 900ms ease-out both',
            animationDelay: `${(i % 25) * 25}ms`,
          }}
        />
      ))}
      {runs.length === 0 && (
        <text
          x={(PAD.left + W - PAD.right) / 2}
          y={(PAD.top + H - PAD.bottom) / 2}
          textAnchor="middle"
          className="fill-ink-faint font-mono"
          fontSize={12}
        >
          choose a bet and run the coin
        </text>
      )}
    </>
  );
}

const drawKeyframes = `
  @keyframes kelly-draw {
    from { stroke-dashoffset: 1; }
    to { stroke-dashoffset: 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    .not-prose path { animation: none !important; }
  }
`;

// ================= Amount mode =================
function AmountSimulator() {
  const [amount, setAmount] = useState(10_000);
  const [runs, setRuns] = useState<Run[]>([]);

  const doRuns = useCallback(
    (n: number) => {
      const fresh: Run[] = [];
      for (let i = 0; i < n; i += 1) fresh.push(simulateAmount(amount));
      setRuns((prev) => [...prev, ...fresh].slice(-60));
    },
    [amount]
  );
  const reset = useCallback(() => setRuns([]), []);
  const setAmt = useCallback((a: number) => {
    setAmount(a);
    setRuns([]);
  }, []);

  // linear scale with a nice rounded max
  const { y, ticks } = useMemo(() => {
    let maxVal = START * 2;
    for (const run of runs) for (const v of run.values) if (v > maxVal) maxVal = v;
    const rawStep = maxVal / 4;
    const pow = 10 ** Math.floor(Math.log10(rawStep));
    const step = Math.ceil(rawStep / pow) * pow;
    const top = step * 4;
    const yFn = (v: number) =>
      H - PAD.bottom - (Math.min(v, top) / top) * (H - PAD.top - PAD.bottom);
    return { y: yFn, ticks: [0, step, step * 2, step * 3, step * 4] };
  }, [runs]);

  const stats = useStats(runs);

  return (
    <div className="not-prose my-10 rounded-xl border border-border bg-surface p-5 sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink-faint">
          The 75% coin · $100K bankroll · 100 flips
        </p>
        <p className="font-mono text-xs text-ink-faint">bet the same amount every flip</p>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-3">
          <span className="font-mono text-sm text-ink">bet $</span>
          <input
            type="number"
            min={0}
            max={START}
            step={1000}
            value={amount}
            onChange={(e) =>
              setAmt(Math.max(0, Math.min(START, Math.round(Number(e.target.value) || 0))))
            }
            className="w-32 rounded-lg border border-border bg-canvas px-3 py-1.5 font-mono text-sm text-ink outline-none focus:border-accent"
            aria-label="Bet amount per flip in dollars"
          />
          <span className="font-mono text-sm text-ink-muted">/ flip</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {AMOUNT_PRESETS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAmt(a)}
              className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
                amount === a
                  ? 'border-accent text-accent'
                  : 'border-border text-ink-muted hover:border-accent hover:text-accent'
              }`}
            >
              {fmtMoney(a)}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <RunButtons onRun={doRuns} onClear={reset} />
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-6 h-auto w-full"
        role="img"
        aria-label="Bankroll over 100 flips at a fixed bet amount"
      >
        {ticks.map((t) => (
          <g key={t}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={y(t)}
              y2={y(t)}
              className="stroke-border"
              strokeWidth={1}
            />
            <text
              x={PAD.left - 8}
              y={y(t) + 3.5}
              textAnchor="end"
              className="fill-ink-faint font-mono"
              fontSize={10}
            >
              {fmtMoney(t)}
            </text>
          </g>
        ))}
        {[0, 25, 50, 75, 100].map((r) => (
          <text
            key={r}
            x={xScale(r)}
            y={H - 8}
            textAnchor="middle"
            className="fill-ink-faint font-mono"
            fontSize={10}
          >
            {r}
          </text>
        ))}
        <line
          x1={PAD.left}
          x2={W - PAD.right}
          y1={y(START)}
          y2={y(START)}
          className="stroke-ink-faint"
          strokeWidth={1}
          strokeDasharray="3 4"
        />
        <text
          x={W - PAD.right}
          y={y(START) - 5}
          textAnchor="end"
          className="fill-ink-faint font-mono"
          fontSize={10}
        >
          start $100K
        </text>
        <Paths runs={runs} y={y} />
      </svg>

      <StatsGrid stats={stats} />

      <p className="mt-3 font-mono text-xs text-ink-muted">
        each flip: +{fmtMoney(amount)} or −{fmtMoney(amount)} · expected +{fmtMoney(amount / 2)}
      </p>

      <style>{drawKeyframes}</style>
    </div>
  );
}

// ================= Fraction mode =================
function FractionSimulator() {
  const [fraction, setFraction] = useState(0.5);
  const [runs, setRuns] = useState<Run[]>([]);

  const doRuns = useCallback(
    (n: number) => {
      const fresh: Run[] = [];
      for (let i = 0; i < n; i += 1) fresh.push(simulateFraction(fraction));
      setRuns((prev) => [...prev, ...fresh].slice(-60));
    },
    [fraction]
  );
  const reset = useCallback(() => setRuns([]), []);
  const setF = useCallback((f: number) => {
    setFraction(f);
    setRuns([]);
  }, []);

  // log scale
  const { y, decades } = useMemo(() => {
    let maxVal = START * 10;
    for (const run of runs) for (const v of run.values) if (v > maxVal) maxVal = v;
    const hi = Math.ceil(Math.log10(maxVal));
    const lo = 0;
    const yFn = (v: number) => {
      const lv = Math.log10(Math.max(v, 10 ** lo));
      return H - PAD.bottom - ((lv - lo) / (hi - lo)) * (H - PAD.top - PAD.bottom);
    };
    const ds: number[] = [];
    for (let k = lo; k <= hi; k += Math.max(1, Math.ceil((hi - lo) / 6))) ds.push(k);
    return { y: yFn, decades: ds };
  }, [runs]);

  const stats = useStats(runs);
  const g = growthRate(fraction);
  const medianProjection = START * Math.exp(Math.max(g, -0.5) * ROUNDS);

  return (
    <div className="not-prose my-10 rounded-xl border border-border bg-surface p-5 sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink-faint">
          The 75% coin · $100K bankroll · 100 flips
        </p>
        <p className="font-mono text-xs text-ink-faint">bet the same fraction every flip</p>
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
        <label className="flex flex-1 items-center gap-4">
          <span className="w-36 shrink-0 font-mono text-sm text-ink">
            bet {(fraction * 100).toFixed(0)}% / flip
          </span>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={Math.round(fraction * 100)}
            onChange={(e) => setF(Number(e.target.value) / 100)}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border accent-accent"
            aria-label="Bet fraction per flip"
          />
        </label>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {FRACTION_PRESETS.map((p) => (
          <button
            key={p.f}
            type="button"
            onClick={() => setF(p.f)}
            className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
              Math.abs(fraction - p.f) < 0.005
                ? 'border-accent text-accent'
                : 'border-border text-ink-muted hover:border-accent hover:text-accent'
            }`}
          >
            {p.label}
          </button>
        ))}
        <span className="mx-1 hidden w-px bg-border sm:block" />
        <RunButtons onRun={doRuns} onClear={reset} />
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-6 h-auto w-full"
        role="img"
        aria-label="Bankroll over 100 flips, log scale"
      >
        {decades.map((k) => (
          <g key={k}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={y(10 ** k)}
              y2={y(10 ** k)}
              className="stroke-border"
              strokeWidth={1}
            />
            <text
              x={PAD.left - 8}
              y={y(10 ** k) + 3.5}
              textAnchor="end"
              className="fill-ink-faint font-mono"
              fontSize={10}
            >
              {fmtPow(k)}
            </text>
          </g>
        ))}
        {[0, 25, 50, 75, 100].map((r) => (
          <text
            key={r}
            x={xScale(r)}
            y={H - 8}
            textAnchor="middle"
            className="fill-ink-faint font-mono"
            fontSize={10}
          >
            {r}
          </text>
        ))}
        <line
          x1={PAD.left}
          x2={W - PAD.right}
          y1={y(START)}
          y2={y(START)}
          className="stroke-ink-faint"
          strokeWidth={1}
          strokeDasharray="3 4"
        />
        <text
          x={W - PAD.right}
          y={y(START) - 5}
          textAnchor="end"
          className="fill-ink-faint font-mono"
          fontSize={10}
        >
          start $100K
        </text>
        <Paths runs={runs} y={y} />
      </svg>

      <StatsGrid stats={stats} />

      {/* Growth-rate curve */}
      <p className="mt-8 font-mono text-xs uppercase tracking-[0.16em] text-ink-faint">
        Expected growth per flip, by bet fraction
      </p>
      <svg
        viewBox={`0 0 ${GW} ${GH}`}
        className="mt-3 h-auto w-full"
        role="img"
        aria-label="Expected log growth per flip as a function of bet fraction"
      >
        <rect
          x={gx(ZERO_CROSS)}
          y={GPAD.top}
          width={gx(0.98) - gx(ZERO_CROSS)}
          height={GH - GPAD.top - GPAD.bottom}
          className="fill-red-600/10"
        />
        <line
          x1={GPAD.left}
          x2={GW - GPAD.right}
          y1={gy(0)}
          y2={gy(0)}
          className="stroke-ink-faint"
          strokeWidth={1}
          strokeDasharray="3 4"
        />
        <text
          x={GPAD.left - 8}
          y={gy(0) + 3.5}
          textAnchor="end"
          className="fill-ink-faint font-mono"
          fontSize={10}
        >
          0
        </text>
        {[0, 0.25, 0.5, 0.75, 1].map((f) => (
          <text
            key={f}
            x={gx(Math.min(f, 0.98))}
            y={GH - 10}
            textAnchor="middle"
            className="fill-ink-faint font-mono"
            fontSize={10}
          >
            {(f * 100).toFixed(0)}%
          </text>
        ))}
        <path d={growthPath} fill="none" className="stroke-ink" strokeWidth={1.8} />
        <circle cx={gx(KELLY)} cy={gy(growthRate(KELLY))} r={4} className="fill-accent" />
        <text
          x={gx(KELLY)}
          y={gy(growthRate(KELLY)) - 10}
          textAnchor="middle"
          className="fill-accent font-mono"
          fontSize={11}
        >
          Kelly · 50%
        </text>
        <text
          x={gx(0.91)}
          y={GPAD.top + 14}
          textAnchor="middle"
          className="fill-red-600/80 font-mono"
          fontSize={10}
        >
          shrinks
        </text>
        <line
          x1={gx(Math.min(fraction, 0.98))}
          x2={gx(Math.min(fraction, 0.98))}
          y1={GPAD.top}
          y2={GH - GPAD.bottom}
          className="stroke-accent/60"
          strokeWidth={1.2}
        />
        <circle
          cx={gx(Math.min(fraction, 0.98))}
          cy={gy(Math.max(growthRate(fraction), G_MIN))}
          r={4.5}
          className="fill-canvas stroke-accent"
          strokeWidth={2}
        />
      </svg>
      <p className="mt-3 font-mono text-xs text-ink-muted">
        at {(fraction * 100).toFixed(0)}%: growth {g === -Infinity ? 'ruinous' : g.toFixed(4)} per
        flip · typical outcome after 100 flips {g === -Infinity ? '$0' : fmtMoney(medianProjection)}
      </p>

      <style>{drawKeyframes}</style>
    </div>
  );
}

export default function KellySimulator({ mode = 'fraction' }: { mode?: 'amount' | 'fraction' }) {
  return mode === 'amount' ? <AmountSimulator /> : <FractionSimulator />;
}
