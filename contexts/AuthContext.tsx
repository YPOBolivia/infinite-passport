'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Member } from '@/lib/types';
import { createClient } from '@/lib/supabase/client';
import { fetchCurrentMember } from '@/lib/supabase/queries';

interface AuthContextValue {
  member: Member | null;
  /** Sends a magic-link email. Does NOT log the person in immediately —
   *  they're signed in once they click the link in their inbox. */
  signIn: (email: string) => Promise<{ error?: string }>;
  signOut: () => void;
  loading: boolean;
  /** True right after signIn() succeeds — used to show "check your email". */
  linkSent: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [linkSent, setLinkSent] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    fetchCurrentMember().then((m) => {
      setMember(m);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(async () => {
      const m = await fetchCurrentMember();
      setMember(m);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function signIn(email: string) {
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setLoading(false);
    if (error) return { error: error.message };
    setLinkSent(true);
    return {};
  }

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setMember(null);
  }

  return (
    <AuthContext.Provider value={{ member, signIn, signOut, loading, linkSent }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
