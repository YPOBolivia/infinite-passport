'use client';

import Link from 'next/link';
import { ArrowUpRight, MapPin, Calendar } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import PassportCover from '@/components/passport/PassportCover';
import JourneyProgress from '@/components/passport/JourneyProgress';
import Timeline from '@/components/passport/Timeline';
import InteractiveMap from '@/components/passport/InteractiveMap';
import Gallery from '@/components/passport/Gallery';
import Card from '@/components/ui/Card';
import { currentMember, memberStamps, getJourneyStats, upcomingEvents } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';
import { downloadPassportPdf } from '@/lib/pdf';

export default function DashboardPage() {
  const stats = getJourneyStats();

  return (
    <div className="min-h-screen bg-ivory-200 dark:bg-navy-950">
      <Navbar onDownload={() => downloadPassportPdf(currentMember, stats)} />

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[340px_1fr]">
          {/* left column — passport identity */}
          <div className="space-y-6">
            <PassportCover member={currentMember} completionPct={stats.completionPct} />

            <Card className="p-5">
              <p className="eyebrow mb-1">About</p>
              <p className="text-sm leading-relaxed text-navy-900/70 dark:text-ivory-100/70">{currentMember.bio}</p>
            </Card>

            <Link
              href="/passport"
              className="flex items-center justify-between rounded-2xl border border-navy-900/8 bg-ivory-50/80 p-5 text-sm font-medium text-navy-900 transition-colors hover:border-gold-400 dark:border-ivory-100/8 dark:bg-navy-800/60 dark:text-ivory-50"
            >
              Open full passport
              <ArrowUpRight size={16} className="text-gold-500" />
            </Link>
          </div>

          {/* right column — journey */}
          <div className="space-y-10">
            <JourneyProgress stats={stats} />

            <section>
              <h2 className="mb-4 font-display text-xl italic text-navy-900 dark:text-ivory-50">Where your stamps were earned</h2>
              <InteractiveMap stamps={memberStamps} />
            </section>

            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-xl italic text-navy-900 dark:text-ivory-50">Upcoming events</h2>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {upcomingEvents.map((e) => (
                  <Card key={e.id} className="p-5">
                    <p className="eyebrow">{e.category}</p>
                    <p className="mt-1 font-display text-base text-navy-900 dark:text-ivory-50">{e.title}</p>
                    <div className="mt-3 flex items-center gap-4 text-xs text-navy-900/50 dark:text-ivory-100/50">
                      <span className="flex items-center gap-1"><Calendar size={12} />{formatDate(e.date)}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} />{e.city}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-display text-xl italic text-navy-900 dark:text-ivory-50">Timeline</h2>
              <Timeline stamps={memberStamps} />
            </section>

            <section>
              <h2 className="mb-4 font-display text-xl italic text-navy-900 dark:text-ivory-50">Gallery</h2>
              <Gallery photos={[]} />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
