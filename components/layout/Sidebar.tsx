'use client';

import { Users, CalendarPlus, Stamp as StampIcon, BarChart3, Bell, FileDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV = [
  { id: 'members', label: 'Members', icon: Users },
  { id: 'events', label: 'Events', icon: CalendarPlus },
  { id: 'stamps', label: 'Stamps', icon: StampIcon },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'reports', label: 'Reports', icon: FileDown },
] as const;

export type AdminTab = (typeof NAV)[number]['id'];

export default function Sidebar({ active, onChange }: { active: AdminTab; onChange: (tab: AdminTab) => void }) {
  return (
    <nav className="flex gap-1 overflow-x-auto no-scrollbar border-b border-navy-900/8 px-5 dark:border-ivory-100/8 sm:w-56 sm:flex-col sm:gap-1 sm:border-b-0 sm:border-r sm:px-3 sm:py-6">
      {NAV.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={cn(
              'flex shrink-0 items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium transition-colors',
              isActive
                ? 'bg-navy-900 text-ivory-50 dark:bg-gold-400 dark:text-navy-950'
                : 'text-navy-900/60 hover:bg-navy-900/5 dark:text-ivory-100/60 dark:hover:bg-ivory-100/5'
            )}
          >
            <Icon size={16} />
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
