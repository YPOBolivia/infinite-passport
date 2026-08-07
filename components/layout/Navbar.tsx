'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Download, LogOut } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { initials } from '@/lib/utils';

export default function Navbar({ onDownload }: { onDownload?: () => void }) {
  const { member, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function handleSignOut() {
    await signOut();
    setMenuOpen(false);
    router.push('/');
  }

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
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Cuenta"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 font-mono text-xs text-ivory-50 transition-opacity hover:opacity-80 dark:bg-gold-400 dark:text-navy-950"
              >
                {initials(member.fullName)}
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-11 w-56 overflow-hidden rounded-2xl border border-navy-900/8 bg-ivory-50 shadow-passport dark:border-ivory-100/8 dark:bg-navy-800">
                  <div className="border-b border-navy-900/8 px-4 py-3 dark:border-ivory-100/8">
                    <p className="truncate text-sm font-medium text-navy-900 dark:text-ivory-50">{member.fullName}</p>
                    <p className="truncate text-xs text-navy-900/50 dark:text-ivory-100/50">{member.email}</p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-ink-special hover:bg-ink-special/5"
                  >
                    <LogOut size={14} /> Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
