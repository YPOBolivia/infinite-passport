'use client';

import Link from 'next/link';
import { Download } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { initials } from '@/lib/utils';

export default function Navbar({ onDownload }: { onDownload?: () => void }) {
  const { member } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-navy-900/6 bg-ivory-200/80 backdrop-blur-md dark:border-ivory-100/6 dark:bg-navy-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/dashboard" className="flex items-center gap-3">
          <Logo height={24} />
          <span className="hidden h-4 w-px bg-navy-900/15 dark:bg-ivory-100/15 sm:block" />
          <span className="hidden font-display text-base italic text-navy-900 dark:text-ivory-50 sm:inline">
            Infinite Passport
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {onDownload && (
            <Button variant="secondary" size="sm" onClick={onDownload} className="hidden sm:inline-flex">
              <Download size={14} /> Download PDF
            </Button>
          )}
          <ThemeToggle />
          {member && (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 font-mono text-xs text-ivory-50 dark:bg-gold-400 dark:text-navy-950">
              {initials(member.fullName)}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
