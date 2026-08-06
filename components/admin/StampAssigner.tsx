'use client';

import { useState } from 'react';
import { X, Trash2 } from 'lucide-react';
import { Member } from '@/lib/types';
import { STAMP_DEFINITIONS, getStampDefinition } from '@/lib/stamps';
import { getStampsForMember } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';
import Stamp from '@/components/passport/Stamp';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import PhotoUpload from './PhotoUpload';

interface StampAssignerProps {
  member: Member;
  onClose: () => void;
}

/**
 * In production: onAssign writes a row to `stamp_instances` via
 * supabase.from('stamp_instances').insert({...}) and the member's
 * dashboard updates instantly through a Supabase Realtime subscription.
 * onRemove calls supabase.from('stamp_instances').delete().eq('id', instanceId) —
 * gated server-side by the chapter_manager_remove_stamps RLS policy.
 */
export default function StampAssigner({ member, onClose }: StampAssignerProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [city, setCity] = useState('La Paz');
  const [note, setNote] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [gallery, setGallery] = useState<string[]>([]);
  const [held, setHeld] = useState(getStampsForMember(member.id));

  function handleAssign() {
    setConfirmed(true);
    setTimeout(() => setConfirmed(false), 2200);
  }

  function handleRemove(instanceId: string) {
    setHeld((prev) => prev.filter((s) => s.id !== instanceId));
  }

  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="eyebrow">Assign a stamp</p>
          <h3 className="font-display text-xl italic text-navy-900 dark:text-ivory-50">{member.fullName}</h3>
        </div>
        <button onClick={onClose} className="rounded-full p-2 text-navy-900/50 hover:bg-navy-900/5 dark:text-ivory-100/50 dark:hover:bg-ivory-100/5">
          <X size={16} />
        </button>
      </div>

      {held.length > 0 && (
        <div className="mb-6 border-b border-navy-900/8 pb-6 dark:border-ivory-100/8">
          <p className="mb-3 text-xs font-medium text-navy-900/60 dark:text-ivory-100/60">Currently held ({held.length})</p>
          <div className="space-y-2">
            {held.map((instance) => {
              const def = getStampDefinition(instance.definitionId);
              if (!def) return null;
              return (
                <div key={instance.id} className="flex items-center justify-between rounded-xl bg-navy-900/4 px-3 py-2 dark:bg-ivory-100/4">
                  <div>
                    <p className="text-sm text-navy-900 dark:text-ivory-50">{def.name}</p>
                    <p className="text-xs text-navy-900/50 dark:text-ivory-100/50">
                      {formatDate(instance.awardedAt)} · {instance.city}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemove(instance.id)}
                    aria-label={`Remove ${def.name} stamp`}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-navy-900/40 hover:bg-ink-special/10 hover:text-ink-special dark:text-ivory-100/40"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <p className="mb-3 text-xs font-medium text-navy-900/60 dark:text-ivory-100/60">Award a new stamp</p>
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
        {STAMP_DEFINITIONS.map((def) => (
          <button
            key={def.id}
            onClick={() => setSelectedId(def.id)}
            className={`rounded-2xl p-1 transition-colors ${selectedId === def.id ? 'ring-2 ring-gold-400' : ''}`}
          >
            <Stamp definition={def} earned size="sm" />
          </button>
        ))}
      </div>

      {selectedId && (
        <div className="mt-6 space-y-4 border-t border-navy-900/8 pt-6 dark:border-ivory-100/8">
          <div className="grid grid-cols-2 gap-4">
            <label className="text-xs text-navy-900/60 dark:text-ivory-100/60">
              City
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1 w-full rounded-lg border border-navy-900/12 bg-transparent px-3 py-2 text-sm outline-none focus:border-gold-400 dark:border-ivory-100/12"
              />
            </label>
            <label className="text-xs text-navy-900/60 dark:text-ivory-100/60">
              Note (optional)
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="mt-1 w-full rounded-lg border border-navy-900/12 bg-transparent px-3 py-2 text-sm outline-none focus:border-gold-400 dark:border-ivory-100/12"
              />
            </label>
          </div>

          <div>
            <p className="mb-2 text-xs text-navy-900/60 dark:text-ivory-100/60">Attach photos (optional)</p>
            <PhotoUpload photos={gallery} onChange={setGallery} />
          </div>

          <Button onClick={handleAssign} className="w-full sm:w-auto">
            {confirmed ? 'Stamp assigned ✓' : 'Assign stamp'}
          </Button>
        </div>
      )}
    </Card>
  );
}
