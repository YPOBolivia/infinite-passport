'use client';

import { motion } from 'framer-motion';
import { StampDefinition } from '@/lib/types';
import { stampRotation, cn } from '@/lib/utils';
import StampIcon from './StampIcon';

interface StampProps {
  definition: StampDefinition;
  earned: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  animateIn?: boolean;
}

const INK_CLASS: Record<string, string> = {
  learning: 'text-ink-learning',
  connection: 'text-ink-connection',
  wellness: 'text-ink-wellness',
  leadership: 'text-ink-leadership',
  community: 'text-ink-community',
  family: 'text-ink-family',
  global: 'text-ink-global',
  special: 'text-ink-special',
};

const SIZE_MAP = { sm: 72, md: 104, lg: 152 };

export default function Stamp({ definition, earned, onClick, size = 'md', animateIn = false }: StampProps) {
  const rotation = stampRotation(definition.id);
  const px = SIZE_MAP[size];
  const inkClass = INK_CLASS[definition.category] ?? 'text-gold-500';
  const isHidden = definition.secret && !earned;

  return (
    <motion.button
      onClick={onClick}
      type="button"
      aria-label={isHidden ? 'Secret stamp — not yet unlocked' : `${definition.name} stamp`}
      style={{ '--stamp-rot': `${rotation}deg`, width: px, height: px } as React.CSSProperties}
      className={cn(
        'group relative shrink-0 rounded-full transition-transform duration-300',
        earned ? 'cursor-pointer hover:scale-105' : 'cursor-default',
        animateIn && earned && 'animate-stamp-down'
      )}
      whileTap={earned ? { scale: 0.95 } : undefined}
    >
      <div
        className={cn(
          'relative flex h-full w-full items-center justify-center rounded-full border-[1.5px] p-3',
          earned
            ? cn('border-current bg-ivory-50/40 shadow-stamp dark:bg-navy-900/30', inkClass)
            : 'border-dashed border-navy-900/15 text-navy-900/20 dark:border-ivory-100/12 dark:text-ivory-100/15'
        )}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {/* inner ring — like a real stamp die */}
        <div className={cn('absolute inset-1.5 rounded-full border', earned ? 'border-current opacity-40' : 'border-transparent')} />

        {isHidden ? (
          <StampIcon id="mask" className="h-1/2 w-1/2 opacity-40" />
        ) : (
          <StampIcon id={definition.icon} className="h-1/2 w-1/2" />
        )}

        {definition.rare && earned && (
          <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-gold-400 shadow-gold-glow" />
        )}
      </div>

      {size !== 'sm' && (
        <span
          className={cn(
            'mt-2 block truncate text-center font-mono text-[10px] uppercase tracking-widest2',
            earned ? 'text-navy-900/70 dark:text-ivory-100/70' : 'text-navy-900/25 dark:text-ivory-100/20'
          )}
        >
          {isHidden ? '???' : definition.name}
        </span>
      )}
    </motion.button>
  );
}
