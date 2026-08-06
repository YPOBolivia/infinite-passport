import { StampInstance } from '@/lib/types';
import { getStampDefinition } from '@/lib/stamps';
import { formatDate } from '@/lib/utils';
import StampIcon from './StampIcon';

export default function Timeline({ stamps }: { stamps: StampInstance[] }) {
  const sorted = [...stamps].sort((a, b) => (a.awardedAt < b.awardedAt ? 1 : -1));

  return (
    <ol className="relative space-y-8 border-l border-navy-900/10 pl-8 dark:border-ivory-100/10">
      {sorted.map((s) => {
        const def = getStampDefinition(s.definitionId);
        if (!def) return null;
        return (
          <li key={s.id} className="relative">
            <span className="absolute -left-[38px] flex h-6 w-6 items-center justify-center rounded-full border border-gold-400 bg-ivory-100 text-gold-500 dark:bg-navy-900">
              <StampIcon id={def.icon} className="h-3.5 w-3.5" />
            </span>
            <p className="font-mono text-[10px] uppercase tracking-widest2 text-navy-900/40 dark:text-ivory-100/40">
              {formatDate(s.awardedAt)}
            </p>
            <p className="mt-1 font-display text-base text-navy-900 dark:text-ivory-50">{def.name}</p>
            <p className="text-sm text-navy-900/60 dark:text-ivory-100/60">{s.city}, {s.country}</p>
          </li>
        );
      })}
    </ol>
  );
}
