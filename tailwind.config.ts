import type { Config } from 'tailwindcss';

// ─────────────────────────────────────────────────────────────
// Infinite Passport — Design Token System
// Palette: Deep Navy (ink) + Ivory (paper) + Gold (foil)
// Category inks are desaturated jewel tones — each reads like a
// different colour of stamp ink a customs officer might carry.
// ─────────────────────────────────────────────────────────────
const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Exact YPO Bolivia brand navy (#041E42) anchors the 900 step;
        // surrounding stops are tuned around it for the passport's tonal range.
        navy: {
          950: '#020D1D',
          900: '#041E42',
          800: '#0B2C56',
          700: '#163A6B',
          600: '#234B82',
          500: '#345E98',
        },
        ivory: {
          50: '#FFFFFD',
          100: '#FBF8F0',
          200: '#F7F3E9',
          300: '#EFE8D6',
          400: '#E3D8BC',
        },
        gold: {
          200: '#F1E2B0',
          300: '#E4C97C',
          400: '#C9A961',
          500: '#B4924A',
          600: '#8B7355',
          foil: '#D9BE7C',
        },
        ink: {
          learning: '#3B4E7A',
          network: '#B0562E',
          forum: '#8B2E4A',
          family: '#2E6B70',
          regional: '#4C7A5C',
          global: '#6B4C7A',
          governance: '#B4924A',
          special: '#8B2E2E',
        },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      boxShadow: {
        emboss: 'inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.35)',
        'emboss-light': 'inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(139,115,85,0.25)',
        passport: '0 30px 60px -15px rgba(7,11,24,0.5), 0 10px 20px -8px rgba(7,11,24,0.35)',
        stamp: '0 1px 2px rgba(0,0,0,0.15)',
        'gold-glow': '0 0 0 1px rgba(201,169,97,0.4), 0 8px 30px -8px rgba(201,169,97,0.35)',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
        'foil-sheen': 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.35) 45%, rgba(255,255,255,0.05) 55%, transparent 70%)',
      },
      keyframes: {
        'stamp-down': {
          '0%': { transform: 'scale(2.4) rotate(var(--stamp-rot, -8deg))', opacity: '0' },
          '55%': { transform: 'scale(0.94) rotate(var(--stamp-rot, -8deg))', opacity: '1' },
          '70%': { transform: 'scale(1.04) rotate(var(--stamp-rot, -8deg))' },
          '100%': { transform: 'scale(1) rotate(var(--stamp-rot, -8deg))', opacity: '1' },
        },
        'ink-bleed': {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '0.5', transform: 'scale(1)' },
        },
        'page-turn': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(-8deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'rise-fade': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'stamp-down': 'stamp-down 0.7s cubic-bezier(.2,1.6,.4,1) forwards',
        'ink-bleed': 'ink-bleed 0.9s ease-out forwards',
        shimmer: 'shimmer 2.4s linear infinite',
        'rise-fade': 'rise-fade 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;
