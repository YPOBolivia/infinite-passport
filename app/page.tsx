'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, MailCheck } from 'lucide-react';
import Button from '@/components/ui/Button';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Logo from '@/components/ui/Logo';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageInner />
    </Suspense>
  );
}

function LoginPageInner() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { signIn, loading, linkSent } = useAuth();
  const searchParams = useSearchParams();

  useEffect(() => {
    const authError = searchParams.get('auth_error');
    if (authError) setError(authError);
  }, [searchParams]);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const result = await signIn(email);
    if (result.error) setError(result.error);
  }

  return (
    <main className="paper-texture relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ivory-200 px-6 dark:bg-navy-950">
      <div className="absolute right-5 top-5">
        <ThemeToggle />
      </div>

      {/* ambient gold glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-400/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex w-full max-w-sm flex-col items-center text-center"
      >
        <Logo orientation="vertical" height={72} />

        <h1 className="mt-7 font-display text-5xl italic leading-[1.05] text-navy-900 dark:text-ivory-50">
          Your journey,
          <br />
          stamped.
        </h1>

        <p className="mt-5 max-w-xs text-sm leading-relaxed text-navy-900/60 dark:text-ivory-100/60">
          A private passport for every experience worth remembering — not another
          attendance sheet.
        </p>

        {linkSent ? (
          <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-gold-400/30 bg-gold-400/5 px-6 py-8">
            <MailCheck size={22} className="text-gold-500" />
            <p className="font-display text-lg italic text-navy-900 dark:text-ivory-50">Revisa tu correo</p>
            <p className="max-w-xs text-sm text-navy-900/60 dark:text-ivory-100/60">
              Te enviamos un link de acceso a <strong>{email}</strong>. Ábrelo desde este mismo dispositivo para entrar.
            </p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSignIn} className="mt-10 w-full space-y-3">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@ypobolivia.org"
                className="w-full rounded-full border border-navy-900/15 bg-ivory-50/60 px-5 py-3.5 text-center text-sm text-navy-900 outline-none transition-colors placeholder:text-navy-900/30 focus:border-gold-400 dark:border-ivory-100/15 dark:bg-navy-800/50 dark:text-ivory-50 dark:placeholder:text-ivory-100/25"
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Enviando tu link…' : 'Enter your passport'}
                {!loading && <ArrowRight size={15} />}
              </Button>
            </form>

            {error && <p className="mt-3 text-xs text-ink-special">{error}</p>}

            <p className="mt-6 font-mono text-[10px] uppercase tracking-widest2 text-navy-900/30 dark:text-ivory-100/25">
              Secure, passwordless access · Members only
            </p>
          </>
        )}
      </motion.div>
    </main>
  );
}
