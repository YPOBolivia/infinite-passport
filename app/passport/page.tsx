'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import StampGrid from '@/components/passport/StampGrid';
import { useAuth } from '@/contexts/AuthContext';
import { fetchMemberStamps, computeJourneyStats } from '@/lib/supabase/queries';
import { StampInstance } from '@/lib/types';
import { downloadPassportPdf } from '@/lib/pdf';

export default function PassportPage() {
  const { member, loading: authLoading } = useAuth();
  const router = useRouter();
  const [stamps, setStamps] = useState<StampInstance[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !member) {
      router.push('/');
      return;
    }
    if (member) {
      fetchMemberStamps(member.id)
        .then((s) => {
          setStamps(s);
          setDataLoading(false);
        })
        .catch((err) => {
          console.error('Infinite Passport: failed to load stamps', err);
          setLoadError(err instanceof Error ? err.message : 'Something went wrong loading your stamps.');
          setDataLoading(false);
        });
    }
  }, [member, authLoading, router]);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory-200 dark:bg-navy-950">
        <p className="font-mono text-xs uppercase tracking-widest2 text-navy-900/40 dark:text-ivory-100/40">Cargando…</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-ivory-200 px-6 text-center dark:bg-navy-950">
        <p className="font-display text-lg italic text-navy-900 dark:text-ivory-50">No pudimos cargar tus sellos</p>
        <p className="max-w-sm text-sm text-navy-900/60 dark:text-ivory-100/60">{loadError}</p>
      </div>
    );
  }

  if (!member || dataLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory-200 dark:bg-navy-950">
        <p className="font-mono text-xs uppercase tracking-widest2 text-navy-900/40 dark:text-ivory-100/40">Cargando…</p>
      </div>
    );
  }

  const stats = computeJourneyStats(stamps);

  return (
    <div className="min-h-screen bg-ivory-200 dark:bg-navy-950">
      <Navbar onDownload={() => downloadPassportPdf(member, stats)} />

      <main className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
        <div className="mb-10 text-center">
          <p className="eyebrow">The full collection</p>
          <h1 className="mt-2 font-display text-3xl italic text-navy-900 dark:text-ivory-50">
            {stats.totalExperiences} stamps, one journey
          </h1>
        </div>

        <StampGrid stamps={stamps} />
      </main>
    </div>
  );
}
