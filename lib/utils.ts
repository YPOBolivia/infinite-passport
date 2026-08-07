import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Formats a date for display as a plain calendar date — "01 Jul 2026" —
 * regardless of the viewer's timezone. Stamps are awarded "on a date",
 * not at an exact moment, so we deliberately ignore the time/timezone
 * portion of the stored value instead of letting the browser convert
 * it to local time (which can shift the date shown by a day for
 * anyone west of UTC, like Bolivia).
 */
export function formatDate(iso: string): string {
  const datePart = iso.slice(0, 10); // "YYYY-MM-DD"
  const [y, m, d] = datePart.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function initials(name: string): string {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

/** Deterministic pseudo-random rotation per stamp id, so stamps look
 *  hand-pressed but never re-shuffle on re-render. */
export function stampRotation(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash << 5) - hash + seed.charCodeAt(i);
  return ((hash % 14) - 7) as number; // -7deg..7deg
}
