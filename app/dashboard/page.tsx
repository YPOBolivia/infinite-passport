'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, MapPin, Calendar } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import PassportCover from '@/components/passport/PassportCover';
import JourneyProgress from '@/components/passport/JourneyProgress';
import Timeline from '@/components/passport/Timeline';
import InteractiveMap from '@/components/passport/InteractiveMap';
import Gallery from '@/components/passport/Gallery';
import Card from '@/components/ui/Card';
import { useAuth } from '@/contexts/AuthContext';
import { fetchMemberStamps, fetchUpcomingEvents, computeJourneyStats } from '@/lib/supabase/queries';
import { StampInstance, Event } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { downloadPassportPdf } from '@/lib/pdf';

export default function DashboardPage() {
  const { member, loading: authLoading } = useAuth();
  const router = useRouter();
  const [stamps, setStamps] = useState<StampInstance[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !member) {
      router.push('/');
      return;
    }
    if (member) {
      Promise.all([fetchMemberStamps(member.id), fetchUpcomingEvents()])
        .then(([s, e]) => {
          setStamps(s);
          setEvents(e);
          setDataLoading(false);
        })
        .catch((err) => {
          console.error('Infinite Passport: failed to load dashboard data', err);
          setLoadError(err instanceof Error ? err.message : 'Something went wrong loading your passport.');
          setDataLoading(false);
        });
    }
  }, [member, authLoading, router]);

  if (authLoading || (!member && !loadError)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory-200 dark:bg-navy-950">
        <p className="font-mono text-xs uppercase tracking-widest2 text-navy-900/40 dark:text-ivory-100/40">
          Cargando tu pasaporte…
        </p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-ivory-200 px-6 text-center dark:bg-navy-950">
        <p className="font-display text-lg italic text-navy-900 dark:text-ivory-50">No pudimos cargar tu pasaporte</p>
        <p className="max-w-sm text-sm text-navy-900/60 dark:text-ivory-100/60">{loadError}</p>
      </div>
    );
  }

  if (!member || dataLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory-200 dark:bg-navy-950">
        <p className="font-mono text-xs uppercase tracking-widest2 text-navy-900/40 dark:text-ivory-100/40">
          Cargando tu pasaporte…
        </p>
      </div>
    );
  }

  const stats = computeJourneyStats(stamps);

  return (
    <div className="min-h-screen bg-ivory-200 dark:bg-navy-950">
      <Navbar onDownload={() => downloadPassportPdf(member, stats)} />

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[340px_1fr]">
          <div className="space-y-6">
            <PassportCover member={member} completionPct={stats.completionPct} />

            {member.bio && (
              <Card className="p-5">
                <p className="eyebrow mb-1">About</p>
                <p className="text-sm leading-relaxed text-navy-900/70 dark:text-ivory-100/70">{member.bio}</p>
              </Card>
            )}

            <Link
              href="/passport"
              className="flex items-center justify-between rounded-2xl border border-navy-900/8 bg-ivory-50/80 p-5 text-sm font-medium text-navy-900 transition-colors hover:border-gold-400 dark:border-ivory-100/8 dark:bg-navy-800/60 dark:text-ivory-50"
            >
              Open full passport
              <ArrowUpRight size={16} className="text-gold-500" />
            </Link>
          </div>

          <div className="space-y-10">
            <JourneyProgress stats={stats} />

            {stamps.length > 0 && (
              <section>
                <h2 className="mb-4 font-display text-xl italic text-navy-900 dark:text-ivory-50">Where your stamps were earned</h2>
                <InteractiveMap stamps={stamps} />
              </section>
            )}

            {events.length > 0 && (
              <section>
                <h2 className="mb-4 font-display text-xl italic text-navy-900 dark:text-ivory-50">Upcoming events</h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {events.map((e) => (
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
            )}

            {stamps.length > 0 ? (
              <section>
                <h2 className="mb-4 font-display text-xl italic text-navy-900 dark:text-ivory-50">Timeline</h2>
                <Timeline stamps={stamps} />
              </section>
            ) : (
              <Card className="p-8 text-center">
                <p className="text-sm text-navy-900/60 dark:text-ivory-100/60">
                  Todavía no tienes sellos — tu Chapter Manager los va asignando a medida que participas en experiencias del año YPO.
                </p>
              </Card>
            )}

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
