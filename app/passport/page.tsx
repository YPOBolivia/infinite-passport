'use client';

import Navbar from '@/components/layout/Navbar';
import StampGrid from '@/components/passport/StampGrid';
import { currentMember, memberStamps, getJourneyStats } from '@/lib/mock-data';
import { downloadPassportPdf } from '@/lib/pdf';

export default function PassportPage() {
  const stats = getJourneyStats();

  return (
    <div className="min-h-screen bg-ivory-200 dark:bg-navy-950">
      <Navbar onDownload={() => downloadPassportPdf(currentMember, stats)} />

      <main className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
        <div className="mb-10 text-center">
          <p className="eyebrow">The full collection</p>
          <h1 className="mt-2 font-display text-3xl italic text-navy-900 dark:text-ivory-50">
            {stats.totalExperiences} stamps, one journey
          </h1>
        </div>

        <StampGrid stamps={memberStamps} />
      </main>
    </div>
  );
}
