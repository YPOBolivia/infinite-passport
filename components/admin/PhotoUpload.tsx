'use client';

import { useRef, useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

interface PhotoUploadProps {
  photos: string[];
  onChange: (photos: string[]) => void;
  bucket?: string;
}

/**
 * Uploads to the Supabase Storage `gallery` bucket (see supabase/schema.sql)
 * and returns public URLs. Falls back to local object URLs when Supabase
 * env vars aren't configured, so this component works in the demo too.
 */
export default function PhotoUpload({ photos, onChange, bucket = 'gallery' }: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const hasSupabase = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);

    try {
      const urls: string[] = [];

      for (const file of Array.from(files)) {
        if (hasSupabase) {
          const supabase = createClient();
          const path = `${crypto.randomUUID()}-${file.name}`;
          const { error } = await supabase.storage.from(bucket).upload(path, file);
          if (error) throw error;
          const { data } = supabase.storage.from(bucket).getPublicUrl(path);
          urls.push(data.publicUrl);
        } else {
          urls.push(URL.createObjectURL(file));
        }
      }

      onChange([...photos, ...urls]);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {photos.map((src, i) => (
          <div key={i} className="group relative h-16 w-16 overflow-hidden rounded-lg bg-navy-900/5 dark:bg-ivory-100/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => onChange(photos.filter((_, idx) => idx !== i))}
              aria-label="Remove photo"
              className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-navy-950/70 text-ivory-50 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <X size={9} />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className={cn(
            'flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-navy-900/20 text-navy-900/40 transition-colors hover:border-gold-400 hover:text-gold-500 dark:border-ivory-100/20 dark:text-ivory-100/40'
          )}
        >
          {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
          <span className="text-[9px]">{uploading ? 'Uploading' : 'Add'}</span>
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
