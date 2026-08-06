'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Member } from '@/lib/types';
import { currentMember } from '@/lib/mock-data';

interface AuthContextValue {
  member: Member | null;
  signIn: (email: string) => Promise<void>;
  signOut: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Demo auth provider. In production, replace signIn/signOut with calls to
 * supabase.auth.signInWithOtp / supabase.auth.signOut (see lib/supabase/client.ts)
 * and hydrate `member` from the `members` table keyed on auth.uid().
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(false);

  async function signIn(_email: string) {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setMember(currentMember);
    setLoading(false);
  }

  function signOut() {
    setMember(null);
  }

  return (
    <AuthContext.Provider value={{ member, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
