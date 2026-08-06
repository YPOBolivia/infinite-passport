'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Member } from '@/lib/types';
import { createClient } from '@/lib/supabase/client';
import { fetchCurrentMember } from '@/lib/supabase/queries';

interface AuthContextValue {
  member: Member | null;
  /** Sends a 6-digit code to the given email. */
  requestCode: (email: string) => Promise<{ error?: string }>;
  /** Verifies the 6-digit code the person typed in and signs them in. */
  verifyCode: (email: string, code: string) => Promise<{ error?: string }>;
  signOut: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    fetchCurrentMember()
      .then((m) => {
        setMember(m);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Infinite Passport: failed to load member', err);
        setMember(null);
        setLoading(false);
      });

    const { data: listener } = supabase.auth.onAuthStateChange(async () => {
      try {
        const m = await fetchCurrentMember();
        setMember(m);
      } catch (err) {
        console.error('Infinite Passport: failed to load member on auth change', err);
        setMember(null);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function requestCode(email: string) {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    });
    if (error) return { error: error.message };
    return {};
  }

  async function verifyCode(email: string, code: string) {
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: 'email',
    });
    setLoading(false);
    if (error) return { error: error.message };
    return {};
  }

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setMember(null);
  }

  return (
    <AuthContext.Provider value={{ member, requestCode, verifyCode, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
