import { Event, JourneyStats, Member, StampCategory, StampInstance } from './types';
import { STAMP_DEFINITIONS } from './stamps';

// ─────────────────────────────────────────────────────────────
// Demo data so the product is fully explorable before Supabase
// is wired up. Every function here has a 1:1 real equivalent
// documented alongside it — swap the body, keep the signature.
// ─────────────────────────────────────────────────────────────

export const currentMember: Member = {
  id: 'mem_001',
  fullName: 'Sofía Montenegro',
  email: 'sofia.montenegro@example.com',
  avatarUrl: undefined,
  chapter: 'YPO Bolivia',
  memberSince: '2021-03-14',
  role: 'member',
  bio: 'Building the future of sustainable logistics across the Andes.',
  city: 'La Paz',
  country: 'Bolivia',
};

const awarded = [
  'passport-activated', 'welcome', 'forum-attendee', 'forum-attendee', 'welcome-dinner',
  'education-day', 'community-impact', 'family-camp', 'wellness-retreat', 'birthday',
  'forum-retreat', 'cross-chapter', 'mentor', 'explorer', 'speaker', 'global-university',
  'committee-lead',
];

export const memberStamps: StampInstance[] = awarded.map((defId, i) => ({
  id: `stamp_${i}`,
  definitionId: defId,
  memberId: currentMember.id,
  awardedAt: new Date(2024, i % 12, ((i * 7) % 27) + 1).toISOString(),
  city: ['La Paz', 'Santa Cruz', 'Cochabamba', 'Miami', 'Lisbon'][i % 5]!,
  country: i % 5 === 3 ? 'USA' : i % 5 === 4 ? 'Portugal' : 'Bolivia',
  gallery: [],
}));

export function getJourneyStats(): JourneyStats {
  const byCategory: JourneyStats['byCategory'] = {} as JourneyStats['byCategory'];
  const categories: StampCategory[] = ['learning', 'connection', 'wellness', 'leadership', 'community', 'family', 'global', 'special'];

  for (const cat of categories) {
    const total = STAMP_DEFINITIONS.filter((d) => d.category === cat && !d.secret).length;
    const earned = memberStamps.filter((s) => {
      const def = STAMP_DEFINITIONS.find((d) => d.id === s.definitionId);
      return def?.category === cat;
    }).length;
    byCategory[cat] = { earned: Math.min(earned, total), total };
  }

  const totalPossible = STAMP_DEFINITIONS.filter((d) => !d.secret).length;
  const totalExperiences = memberStamps.length;

  return {
    totalExperiences,
    totalPossible,
    completionPct: Math.round((totalExperiences / totalPossible) * 100),
    byCategory,
  };
}

export const upcomingEvents: Event[] = [
  { id: 'evt_1', title: 'Forum Retreat — Lake Titicaca', category: 'connection', city: 'Copacabana', country: 'Bolivia', date: '2026-09-12', attendeeCount: 24 },
  { id: 'evt_2', title: 'Education Day: AI & Family Business', category: 'learning', city: 'Santa Cruz', country: 'Bolivia', date: '2026-09-28', attendeeCount: 60 },
  { id: 'evt_3', title: 'Wellness Morning — Valle de la Luna', category: 'wellness', city: 'La Paz', country: 'Bolivia', date: '2026-10-04', attendeeCount: 18 },
  { id: 'evt_4', title: 'YPO Edge Global Conference', category: 'global', city: 'Barcelona', country: 'Spain', date: '2026-11-02', attendeeCount: 3200 },
];

/** Returns the stamp instances for a given member — used by the admin
 *  "remove stamp" flow. Real equivalent:
 *  supabase.from('stamp_instances').select('*, stamp_definitions(*)').eq('member_id', id) */
export function getStampsForMember(memberId: string): StampInstance[] {
  return memberId === currentMember.id ? memberStamps : [];
}

export const allMembers: Member[] = [
  currentMember,
  { id: 'mem_002', fullName: 'Diego Fernández', email: 'diego@example.com', chapter: 'YPO Bolivia', memberSince: '2019-06-01', role: 'member', city: 'Santa Cruz', country: 'Bolivia' },
  { id: 'mem_003', fullName: 'Valentina Rocha', email: 'valentina@example.com', chapter: 'YPO Bolivia', memberSince: '2022-01-20', role: 'chapter_manager', city: 'Cochabamba', country: 'Bolivia' },
  { id: 'mem_004', fullName: 'Andrés Salazar', email: 'andres@example.com', chapter: 'YPO Bolivia', memberSince: '2017-11-08', role: 'member', city: 'La Paz', country: 'Bolivia' },
];
