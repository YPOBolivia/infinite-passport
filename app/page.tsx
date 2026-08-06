'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, MailCheck } from 'lucide-react';
import Button from '@/components/ui/Button';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Logo from '@/components/ui/Logo';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const { requestCode, verifyCode, loading, member } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (member) router.push('/dashboard');
  }, [member, router]);

  async function handleRequestCode(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSending(true);
    const result = await requestCode(email);
    setSending(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    setStep('code');
  }

  async function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const result = await verifyCode(email, code);
    if (result.error) setError(result.error);
  }

  return (
    <main className="paper-texture relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ivory-200 px-6 dark:bg-navy-950">
      <div className="absolute right-5 top-5">
        <ThemeToggle />
      </div>

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

        {step === 'email' && (
          <>
            <form onSubmit={handleRequestCode} className="mt-10 w-full space-y-3">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@ypobolivia.org"
                className="w-full rounded-full border border-navy-900/15 bg-ivory-50/60 px-5 py-3.5 text-center text-sm text-navy-900 outline-none transition-colors placeholder:text-navy-900/30 focus:border-gold-400 dark:border-ivory-100/15 dark:bg-navy-800/50 dark:text-ivory-50 dark:placeholder:text-ivory-100/25"
              />
              <Button type="submit" disabled={sending} className="w-full">
                {sending ? 'Enviando código…' : 'Enter your passport'}
                {!sending && <ArrowRight size={15} />}
              </Button>
            </form>
            {error && <p className="mt-3 text-xs text-ink-special">{error}</p>}
          </>
        )}

        {step === 'code' && (
          <>
            <div className="mt-10 flex flex-col items-center gap-2">
              <MailCheck size={22} className="text-gold-500" />
              <p className="font-display text-lg italic text-navy-900 dark:text-ivory-50">Revisa tu correo</p>
              <p className="max-w-xs text-sm text-navy-900/60 dark:text-ivory-100/60">
                Te enviamos un código de 6 dígitos a <strong>{email}</strong>. Escríbelo abajo.
              </p>
            </div>

            <form onSubmit={handleVerifyCode} className="mt-6 w-full space-y-3">
              <input
                required
                inputMode="numeric"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                placeholder="123456"
                className="w-full rounded-full border border-navy-900/15 bg-ivory-50/60 px-5 py-3.5 text-center font-mono text-lg tracking-[0.3em] text-navy-900 outline-none transition-colors placeholder:text-navy-900/20 focus:border-gold-400 dark:border-ivory-100/15 dark:bg-navy-800/50 dark:text-ivory-50 dark:placeholder:text-ivory-100/20"
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Verificando…' : 'Confirmar código'}
                {!loading && <ArrowRight size={15} />}
              </Button>
            </form>

            {error && <p className="mt-3 text-xs text-ink-special">{error}</p>}

            <button
              onClick={() => { setStep('email'); setError(null); setCode(''); }}
              className="mt-4 text-xs text-navy-900/40 underline dark:text-ivory-100/40"
            >
              Usar otro correo
            </button>
          </>
        )}

        <p className="mt-6 font-mono text-[10px] uppercase tracking-widest2 text-navy-900/30 dark:text-ivory-100/25">
          Secure, passwordless access · Members only
        </p>
      </motion.div>
    </main>
  );
}
