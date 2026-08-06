import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export default function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-navy-900/8 bg-ivory-50/80 backdrop-blur-sm shadow-sm',
        'dark:border-ivory-100/8 dark:bg-navy-800/60',
        className
      )}
      {...props}
    />
  );
}
