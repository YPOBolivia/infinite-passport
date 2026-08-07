'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';
import { DEFAULT_CONTENT } from '@/lib/content';

interface ContentContextValue {
  /** Returns the live edited text for a key, or the built-in default if
   *  nobody has customized it yet (or while it's still loading). */
  get: (key: string) => string;
}

const ContentContext = createContext<ContentContextValue | undefined>(undefined);

/**
 * Loads all editable copy from Supabase's `app_content` table once, on
 * mount. Chapter Managers edit rows directly in Table Editor (key/value) —
 * no separate admin screen needed. Falls back to DEFAULT_CONTENT for any
 * key that isn't in the table yet, so nothing ever renders blank.
 */
export function ContentProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<Record<string, string>>({});

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('app_content')
      .select('key, value')
      .then(({ data }) => {
        if (!data) return;
        const map: Record<string, string> = {};
        for (const row of data) map[row.key] = row.value;
        setOverrides(map);
      });
  }, []);

  function get(key: string): string {
    return overrides[key] ?? DEFAULT_CONTENT[key] ?? '';
  }

  return <ContentContext.Provider value={{ get }}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
}
