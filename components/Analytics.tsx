import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Only inject Vercel scripts when actually deployed on Vercel; locally they 503 and block document load.
const onVercel = !!process.env.VERCEL || !!process.env.NEXT_PUBLIC_VERCEL_URL;

export default function Analytics() {
  if (!onVercel) return null;
  return (
    <>
      <VercelAnalytics />
      <SpeedInsights />
    </>
  );
}
