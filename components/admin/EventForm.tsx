'use client';

import { useState } from 'react';
import { STAMP_CATEGORIES } from '@/lib/types';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const inputClass =
  'mt-1 w-full rounded-lg border border-navy-900/12 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-gold-400 dark:border-ivory-100/12';

/**
 * In production: on submit, insert into `events` and optionally
 * link a new row in `stamp_definitions` if "Create a matching stamp"
 * is checked — then broadcast via Supabase Realtime so member
 * dashboards show it under Upcoming Events immediately.
 */
export default function EventForm() {
  const [created, setCreated] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCreated(true);
    setTimeout(() => setCreated(false), 2200);
  }

  return (
    <Card className="p-6">
      <p className="eyebrow mb-4">Create event</p>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="text-xs text-navy-900/60 dark:text-ivory-100/60 sm:col-span-2">
          Title
          <input required placeholder="Forum Retreat — Lake Titicaca" className={inputClass} />
        </label>

        <label className="text-xs text-navy-900/60 dark:text-ivory-100/60">
          Category
          <select required className={inputClass}>
            {STAMP_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </label>

        <label className="text-xs text-navy-900/60 dark:text-ivory-100/60">
          Date
          <input required type="date" className={inputClass} />
        </label>

        <label className="text-xs text-navy-900/60 dark:text-ivory-100/60">
          City
          <input required placeholder="La Paz" className={inputClass} />
        </label>

        <label className="text-xs text-navy-900/60 dark:text-ivory-100/60">
          Country
          <input required placeholder="Bolivia" className={inputClass} />
        </label>

        <label className="flex items-center gap-2 text-xs text-navy-900/60 dark:text-ivory-100/60 sm:col-span-2">
          <input type="checkbox" defaultChecked className="h-4 w-4 accent-gold-500" />
          Create a matching stamp for this event
        </label>

        <div className="sm:col-span-2">
          <Button type="submit" className="w-full sm:w-auto">
            {created ? 'Event created ✓' : 'Create event'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
