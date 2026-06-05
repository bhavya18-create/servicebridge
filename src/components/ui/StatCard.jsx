import CountUpLib from 'react-countup';
import { GlassCard } from './GlassCard';

const CountUp = CountUpLib?.default || CountUpLib;

export function StatCard({ title, value, suffix }) {
  return (
    <GlassCard hover className="group">
      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{title}</p>
      <h3 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
        <CountUp end={value} duration={2} />
        {suffix}
      </h3>
      <div className="mt-4 h-px w-full bg-gradient-to-r from-blue-500/0 via-blue-500/40 to-violet-500/0 opacity-0 transition-opacity group-hover:opacity-100" />
    </GlassCard>
  );
}
