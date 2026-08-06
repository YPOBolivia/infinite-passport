'use client';

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { STAMP_CATEGORIES } from '@/lib/types';
import Card from '@/components/ui/Card';

const demoParticipation = STAMP_CATEGORIES.filter((c) => c.id !== 'special').map((c) => ({
  name: c.label,
  members: Math.round(20 + Math.random() * 60),
}));

export default function AnalyticsPanel() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      <Card className="p-6">
        <p className="eyebrow">Active members</p>
        <p className="mt-2 font-display text-4xl text-navy-900 dark:text-ivory-50">142</p>
        <p className="mt-1 text-xs text-navy-900/50 dark:text-ivory-100/50">of 156 total chapter members</p>
      </Card>
      <Card className="p-6">
        <p className="eyebrow">Stamps awarded</p>
        <p className="mt-2 font-display text-4xl text-navy-900 dark:text-ivory-50">1,284</p>
        <p className="mt-1 text-xs text-navy-900/50 dark:text-ivory-100/50">this program year</p>
      </Card>
      <Card className="p-6">
        <p className="eyebrow">Avg. journey completion</p>
        <p className="mt-2 font-display text-4xl text-navy-900 dark:text-ivory-50">61%</p>
        <p className="mt-1 text-xs text-navy-900/50 dark:text-ivory-100/50">+8pts vs. last year</p>
      </Card>

      <Card className="col-span-1 p-6 sm:col-span-3">
        <p className="eyebrow mb-6">Participation by category</p>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={demoParticipation}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.08} vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: 'rgba(201,169,97,0.08)' }} />
              <Bar dataKey="members" fill="#C9A961" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
