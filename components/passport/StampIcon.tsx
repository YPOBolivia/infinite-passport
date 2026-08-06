import { StampIconId } from '@/lib/types';

/**
 * Hand-drawn-style line icons used as the engraving inside each stamp.
 * Deliberately simple single-weight strokes — like a real customs die.
 */
export default function StampIcon({ id, className }: { id: StampIconId; className?: string }) {
  const props = {
    className,
    viewBox: '0 0 48 48',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (id) {
    case 'compass':
      return (
        <svg {...props}>
          <circle cx="24" cy="24" r="16" />
          <path d="M30 18l-4 10-10 4 4-10z" />
          <circle cx="24" cy="24" r="1.4" fill="currentColor" />
        </svg>
      );
    case 'handshake':
      return (
        <svg {...props}>
          <path d="M6 22l8-6 6 4 4-3 8 6" />
          <path d="M14 16l8 8-4 4-9-7" />
          <path d="M34 19l-9 9-3-2" />
        </svg>
      );
    case 'lotus':
      return (
        <svg {...props}>
          <path d="M24 34c-7 0-12-6-12-12 5 0 10 3 12 8 2-5 7-8 12-8 0 6-5 12-12 12z" />
          <path d="M24 34c0-9 0-16 0-22" />
          <path d="M14 20c3 0 7 2 10 6M34 20c-3 0-7 2-10 6" />
        </svg>
      );
    case 'crown':
      return (
        <svg {...props}>
          <path d="M8 32l-2-14 8 6 10-12 10 12 8-6-2 14z" />
          <path d="M8 32h32" />
        </svg>
      );
    case 'people':
      return (
        <svg {...props}>
          <circle cx="17" cy="17" r="5" />
          <circle cx="31" cy="17" r="5" />
          <path d="M7 36c1-6 5-10 10-10s9 4 10 10" />
          <path d="M21 36c1-6 5-10 10-10s9 4 10 10" />
        </svg>
      );
    case 'family-tree':
      return (
        <svg {...props}>
          <circle cx="24" cy="10" r="4" />
          <circle cx="12" cy="34" r="4" />
          <circle cx="36" cy="34" r="4" />
          <path d="M24 14v10M24 24l-12 6M24 24l12 6" />
        </svg>
      );
    case 'globe':
      return (
        <svg {...props}>
          <circle cx="24" cy="24" r="16" />
          <path d="M8 24h32M24 8c5 5 5 27 0 32M24 8c-5 5-5 27 0 32" />
        </svg>
      );
    case 'cake':
      return (
        <svg {...props}>
          <path d="M10 26h28v10H10z" />
          <path d="M10 26c0-4 4-4 4-8s-2-4-2-6M20 26c0-4 4-4 4-8s-2-4-2-6M30 26c0-4 4-4 4-8s-2-4-2-6" />
        </svg>
      );
    case 'infinity':
      return (
        <svg {...props}>
          <path d="M14 24c0-4 3-7 7-7s7 7 7 7-3 7-7 7-7-3-7-7z" />
          <path d="M28 24c0-4 3-7 7-7s7 7 7 7-3 7-7 7-7-3-7-7z" transform="translate(-6,0)" />
        </svg>
      );
    case 'key':
      return (
        <svg {...props}>
          <circle cx="16" cy="24" r="8" />
          <path d="M22 24h18M34 24v6M40 24v6" />
        </svg>
      );
    case 'wax-seal':
      return (
        <svg {...props}>
          <circle cx="24" cy="24" r="14" />
          <path d="M24 16v16M16 24h16" />
        </svg>
      );
    case 'podium':
      return (
        <svg {...props}>
          <path d="M14 40V20h20v20" />
          <path d="M24 20V8l6 4-6 4" />
        </svg>
      );
    case 'star':
      return (
        <svg {...props}>
          <path d="M24 8l4.5 10.5L40 20l-8 8 2 12-10-6-10 6 2-12-8-8 11.5-1.5z" />
        </svg>
      );
    case 'anchor':
      return (
        <svg {...props}>
          <circle cx="24" cy="10" r="4" />
          <path d="M24 14v24M14 26c0 7 5 12 10 12s10-5 10-12M12 20h8M28 20h8" />
        </svg>
      );
    case 'flame':
      return (
        <svg {...props}>
          <path d="M24 8c4 6-2 8-2 14 0-3 4-3 4 1 0 5-4 9-10 9-7 0-11-5-11-11 0-9 8-11 8-18 4 2 4 3 4 5 0-3 3-5 7 0z" />
        </svg>
      );
    case 'gavel':
      return (
        <svg {...props}>
          <path d="M28 10l10 10-4 4-10-10z" />
          <path d="M22 16l10 10-14 14-10-10z" />
          <path d="M8 40h16" />
        </svg>
      );
    case 'mask':
      return (
        <svg {...props}>
          <path d="M8 20c0-8 7-12 16-12s16 4 16 12-7 16-16 16-16-8-16-16z" />
          <circle cx="17" cy="20" r="2" fill="currentColor" />
          <circle cx="31" cy="20" r="2" fill="currentColor" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="24" cy="24" r="16" />
        </svg>
      );
  }
}
