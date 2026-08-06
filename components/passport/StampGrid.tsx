'use client';

import { useState } from 'react';
import { StampDefinition, StampInstance } from '@/lib/types';
import { STAMP_DEFINITIONS } from '@/lib/stamps';
import { STAMP_CATEGORIES } from '@/lib/types';
import Stamp from './Stamp';
import StampModal from './StampModal';

interface StampGridProps {
  stamps: StampInstance[];
}

export default function StampGrid({ stamps }: StampGridProps) {
  const [selected, setSelected] = useState<StampDefinition | null>(null);
  const earnedIds = new Set(stamps.map((s) => s.definitionId));

  const selectedInstance = selected ? stamps.find((s) => s.definitionId === selected.id) : undefined;

  return (
    <div className="space-y-12">
      {STAMP_CATEGORIES.map((cat) => {
        const defs = STAMP_DEFINITIONS.filter((d) => d.category === cat.id);
        const earnedCount = defs.filter((d) => earnedIds.has(d.id)).length;

        return (
          <section key={cat.id}>
            <div className="mb-5 flex items-baseline justify-between">
              <div>
                <h3 className="font-display text-xl italic text-navy-900 dark:text-ivory-50">{cat.label}</h3>
                <p className="text-xs text-navy-900/50 dark:text-ivory-100/50">{cat.blurb}</p>
              </div>
              <span className="font-mono text-xs text-navy-900/40 dark:text-ivory-100/40">
                {earnedCount}/{defs.length}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-x-2 gap-y-6 sm:grid-cols-4 md:grid-cols-6">
              {defs.map((def) => (
                <Stamp
                  key={def.id}
                  definition={def}
                  earned={earnedIds.has(def.id)}
                  onClick={() => setSelected(def)}
                />
              ))}
            </div>
          </section>
        );
      })}

      <StampModal definition={selected} instance={selectedInstance} onClose={() => setSelected(null)} />
    </div>
  );
}
