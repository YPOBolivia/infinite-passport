'use client';

import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';

interface LogoProps {
  orientation?: 'horizontal' | 'vertical';
  /** Force a specific mark color regardless of theme — used on fixed-color
   *  surfaces like the (always-navy) passport cover. */
  variant?: 'auto' | 'blue' | 'black' | 'white';
  className?: string;
  height?: number;
}

const SOURCES = {
  horizontal: {
    blue: '/brand/ypo-horizontal-blue.png',
    black: '/brand/ypo-horizontal-black.png',
    white: '/brand/ypo-horizontal-white.png',
  },
  vertical: {
    blue: '/brand/ypo-vertical-blue.png',
    black: '/brand/ypo-vertical-black.png',
    white: '/brand/ypo-vertical-white.png',
  },
};

const RATIO = { horizontal: 1374 / 400, vertical: 1 };

/**
 * The official YPO Bolivia Integrated mark. In `auto` mode it follows the
 * app theme: navy-on-transparent for light surfaces, white-on-transparent
 * for dark surfaces — so it always sits correctly on Infinite Passport's
 * navy/ivory paper without a manual toggle at each call site.
 */
export default function Logo({ orientation = 'horizontal', variant = 'auto', className, height = 28 }: LogoProps) {
  const { theme } = useTheme();
  const resolved = variant === 'auto' ? (theme === 'dark' ? 'white' : 'blue') : variant;
  const src = SOURCES[orientation][resolved];
  const width = Math.round(height * RATIO[orientation]);

  return (
    <Image
      src={src}
      alt="YPO Bolivia Integrated"
      width={width}
      height={height}
      priority
      className={className}
      style={{ height, width: 'auto' }}
    />
  );
}
