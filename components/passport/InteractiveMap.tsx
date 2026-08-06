'use client';

import { useState } from 'react';
import { StampInstance } from '@/lib/types';

// Minimal equirectangular projection — good enough for a stylised
// "stamps of the world" map without pulling in a mapping library.
const CITY_COORDS: Record<string, [number, number]> = {
  'La Paz': [-16.5, -68.15],
  'Santa Cruz': [-17.78, -63.18],
  Cochabamba: [-17.39, -66.16],
  Copacabana: [-16.17, -69.09],
  Miami: [25.76, -80.19],
  Lisbon: [38.72, -9.14],
  Barcelona: [41.39, 2.17],
};

function project(lat: number, lon: number, w: number, h: number) {
  const x = ((lon + 180) / 360) * w;
  const y = ((90 - lat) / 180) * h;
  return { x, y };
}

export default function InteractiveMap({ stamps }: { stamps: StampInstance[] }) {
  const [active, setActive] = useState<string | null>(null);
  const W = 600;
  const H = 300;

  const cityCounts = stamps.reduce<Record<string, number>>((acc, s) => {
    acc[s.city] = (acc[s.city] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-navy-900/8 bg-navy-900 dark:border-ivory-100/8">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        <rect width={W} height={H} fill="transparent" />
        {/* faint lat/long grid for texture */}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`h${i}`} x1={0} x2={W} y1={(i * H) / 6} y2={(i * H) / 6} stroke="#C9A961" strokeOpacity={0.06} />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`v${i}`} y1={0} y2={H} x1={(i * W) / 12} x2={(i * W) / 12} stroke="#C9A961" strokeOpacity={0.06} />
        ))}

        {Object.entries(cityCounts).map(([city, count]) => {
          const coords = CITY_COORDS[city];
          if (!coords) return null;
          const { x, y } = project(coords[0], coords[1], W, H);
          const r = 4 + Math.min(count, 5) * 1.5;
          return (
            <g key={city} onMouseEnter={() => setActive(city)} onMouseLeave={() => setActive(null)} className="cursor-pointer">
              <circle cx={x} cy={y} r={r + 6} fill="#C9A961" fillOpacity={active === city ? 0.18 : 0.08} />
              <circle cx={x} cy={y} r={r} fill="#C9A961" fillOpacity={0.85} />
              <circle cx={x} cy={y} r={r} fill="none" stroke="#F7F3E9" strokeOpacity={0.5} />
            </g>
          );
        })}
      </svg>

      {active && (
        <div className="absolute bottom-3 left-3 rounded-full bg-navy-950/80 px-3 py-1.5 font-mono text-[11px] text-ivory-100 backdrop-blur-sm">
          {active} · {cityCounts[active]} stamp{cityCounts[active] === 1 ? '' : 's'}
        </div>
      )}
    </div>
  );
}
