'use client';

import { useState } from 'react';
import { Bell, FileDown } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Sidebar, { AdminTab } from '@/components/layout/Sidebar';
import MemberTable from '@/components/admin/MemberTable';
import StampAssigner from '@/components/admin/StampAssigner';
import AnalyticsPanel from '@/components/admin/AnalyticsPanel';
import EventForm from '@/components/admin/EventForm';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { allMembers } from '@/lib/mock-data';
import { Member } from '@/lib/types';

export default function AdminPage() {
  const [tab, setTab] = useState<AdminTab>('members');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  return (
    <div className="min-h-screen bg-ivory-200 dark:bg-navy-950">
      <Navbar />

      <div className="mx-auto flex max-w-6xl flex-col sm:flex-row">
        <Sidebar active={tab} onChange={setTab} />

        <main className="flex-1 space-y-6 px-5 py-8 sm:px-8">
          <div>
            <p className="eyebrow">Chapter Manager</p>
            <h1 className="font-display text-2xl italic text-navy-900 dark:text-ivory-50">
              {tab === 'members' && 'Members'}
              {tab === 'events' && 'Events'}
              {tab === 'stamps' && 'Stamp management'}
              {tab === 'analytics' && 'Analytics'}
              {tab === 'notifications' && 'Notifications'}
              {tab === 'reports' && 'Reports'}
            </h1>
          </div>

          {tab === 'members' && (
            <div className="space-y-6">
              <MemberTable members={allMembers} onAssignStamp={setSelectedMember} />
              {selectedMember && <StampAssigner member={selectedMember} onClose={() => setSelectedMember(null)} />}
            </div>
          )}

          {tab === 'events' && <EventForm />}

          {tab === 'stamps' && (
            <Card className="p-6">
              <p className="eyebrow mb-2">Custom stamps</p>
              <p className="mb-4 text-sm text-navy-900/60 dark:text-ivory-100/60">
                Design a one-off stamp for a chapter milestone — it becomes selectable in Assign Stamp immediately.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input placeholder="Stamp name" className="rounded-lg border border-navy-900/12 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-gold-400 dark:border-ivory-100/12" />
                <input placeholder="Description" className="rounded-lg border border-navy-900/12 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-gold-400 dark:border-ivory-100/12" />
              </div>
              <Button className="mt-4">Create stamp</Button>
            </Card>
          )}

          {tab === 'analytics' && <AnalyticsPanel />}

          {tab === 'notifications' && (
            <Card className="p-6">
              <p className="eyebrow mb-2">Send a notification</p>
              <textarea
                placeholder="Reminder: the Forum Retreat starts this Friday…"
                rows={4}
                className="mt-2 w-full rounded-lg border border-navy-900/12 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-gold-400 dark:border-ivory-100/12"
              />
              <Button className="mt-4"><Bell size={14} /> Send to chapter</Button>
            </Card>
          )}

          {tab === 'reports' && (
            <Card className="p-6">
              <p className="eyebrow mb-2">Export reports</p>
              <p className="mb-4 text-sm text-navy-900/60 dark:text-ivory-100/60">
                Download participation and stamp data for board reporting.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary"><FileDown size={14} /> Members CSV</Button>
                <Button variant="secondary"><FileDown size={14} /> Stamps CSV</Button>
                <Button variant="secondary"><FileDown size={14} /> Full analytics PDF</Button>
              </div>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
