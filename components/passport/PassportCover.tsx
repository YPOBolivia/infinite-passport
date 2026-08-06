'use client';

import Image from 'next/image';
import { Member } from '@/lib/types';
import { formatDate, initials } from '@/lib/utils';

export default function PassportCover({ member, completionPct }: { member: Member; completionPct: number }) {
  return (
    <div className="perspective-[1400px] relative mx-auto w-full max-w-sm">
      <div className="relative aspect-[5/7] w-full overflow-hidden rounded-[20px] bg-navy-900 shadow-passport">
        {/* foil sheen sweep */}
        <div className="pointer-events-none absolute inset-0 animate-shimmer bg-foil-sheen bg-[length:250%_100%]" />
        <div className="paper-texture pointer-events-none absolute inset-0 opacity-60" />

        {/* border emboss */}
        <div className="absolute inset-3 rounded-[14px] border border-gold-400/40" />
        <div className="absolute inset-4 rounded-[10px] border border-gold-400/15" />

        <div className="relative flex h-full flex-col items-center justify-between p-8 text-ivory-100">
          <div className="flex flex-col items-center opacity-90">
            <Image src="/brand/ypo-horizontal-white.png" alt="YPO Bolivia Integrated" width={132} height={38} style={{ height: 20, width: 'auto' }} />
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold-400/70 bg-navy-800 font-display text-2xl text-gold-300">
              {initials(member.fullName)}
            </div>
            <h1 className="text-center font-display text-3xl italic leading-tight">Infinite<br />Passport</h1>
            <div className="mt-6 h-px w-16 bg-gold-400/50" />
            <p className="mt-4 font-display text-lg text-ivory-50">{member.fullName}</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-widest2 text-gold-300/70">
              Member since {formatDate(member.memberSince)}
            </p>
          </div>

          <div className="flex w-full items-center justify-between font-mono text-[10px] uppercase tracking-widest2 text-gold-300/70">
            <span>{member.city}, {member.country}</span>
            <span>{completionPct}% journey</span>
          </div>
        </div>
      </div>
    </div>
  );
}
