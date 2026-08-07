'use client';

import { JourneyStats, STAMP_CATEGORIES } from '@/lib/types';
import ProgressRing from '@/components/ui/ProgressRing';
import Card from '@/components/ui/Card';
import { useContent } from '@/contexts/ContentContext';

export default function JourneyProgress({ stats }: { stats: JourneyStats }) {
  const { get } = useContent();

  return (
    <Card className="p-6 sm:p-8">
      <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
        <ProgressRing percent={stats.completionPct} label="Journey" size={128} />

        <div className="flex-1 space-y-3">
          <div className="mb-1 flex items-baseline justify-between">
            <h3 className="font-display text-lg italic text-navy-900 dark:text-ivory-50">This year&apos;s journey</h3>
            <span className="font-mono text-xs text-navy-900/50 dark:text-ivory-100/50">
              {stats.totalExperiences} experiences
            </span>
          </div>

          {STAMP_CATEGORIES.filter((c) => c.id !== 'special').map((cat) => {
            const cs = stats.byCategory[cat.id];
            const pct = cs.total ? Math.round((cs.earned / cs.total) * 100) : 0;
            return (
              <div key={cat.id} className="flex items-center gap-3">
                <span className="w-24 shrink-0 text-xs text-navy-900/60 dark:text-ivory-100/60">{get(`${cat.id}_label`)}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-navy-900/8 dark:bg-ivory-100/8">
                  <div
                    className="h-full rounded-full bg-gold-400 transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-8 shrink-0 text-right font-mono text-[11px] text-navy-900/40 dark:text-ivory-100/40">
                  {cs.earned}/{cs.total}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
