'use client';

import { useState } from 'react';
import { Search, Stamp as StampIcon } from 'lucide-react';
import { Member } from '@/lib/types';
import { formatDate, initials } from '@/lib/utils';
import Card from '@/components/ui/Card';

interface MemberTableProps {
  members: Member[];
  onAssignStamp: (member: Member) => void;
}

export default function MemberTable({ members, onAssignStamp }: MemberTableProps) {
  const [query, setQuery] = useState('');

  const filtered = members.filter((m) =>
    `${m.fullName} ${m.email} ${m.chapter}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center gap-2 border-b border-navy-900/8 p-4 dark:border-ivory-100/8">
        <Search size={16} className="text-navy-900/40 dark:text-ivory-100/40" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search members by name, email or chapter…"
          className="w-full bg-transparent text-sm outline-none placeholder:text-navy-900/30 dark:placeholder:text-ivory-100/30"
        />
      </div>

      <div className="divide-y divide-navy-900/6 dark:divide-ivory-100/6">
        {filtered.map((m) => (
          <div key={m.id} className="flex items-center justify-between gap-4 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 font-mono text-xs text-ivory-50 dark:bg-gold-400 dark:text-navy-950">
                {initials(m.fullName)}
              </div>
              <div>
                <p className="text-sm font-medium text-navy-900 dark:text-ivory-50">{m.fullName}</p>
                <p className="text-xs text-navy-900/50 dark:text-ivory-100/50">
                  {m.chapter} · member since {formatDate(m.memberSince)}
                </p>
              </div>
            </div>
            <button
              onClick={() => onAssignStamp(m)}
              className="flex items-center gap-1.5 rounded-full border border-navy-900/15 px-3 py-1.5 text-xs font-medium text-navy-900/70 hover:border-gold-400 hover:text-navy-900 dark:border-ivory-100/15 dark:text-ivory-100/70 dark:hover:border-gold-400 dark:hover:text-ivory-50"
            >
              <StampIcon size={12} /> Assign stamp
            </button>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="p-8 text-center text-sm text-navy-900/40 dark:text-ivory-100/40">No members match &ldquo;{query}&rdquo;.</p>
        )}
      </div>
    </Card>
  );
}
