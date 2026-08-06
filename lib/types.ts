// ─────────────────────────────────────────────────────────────
// Infinite Passport — Domain Types
// These mirror the Supabase schema in /supabase/schema.sql
// ─────────────────────────────────────────────────────────────

export type StampCategory =
  | 'learning'
  | 'connection'
  | 'wellness'
  | 'leadership'
  | 'community'
  | 'family'
  | 'global'
  | 'special';

/** A stamp DEFINITION is the reusable "die" — the artwork + rules.
 *  A stamp AWARD (StampInstance) is one member actually receiving it. */
export interface StampDefinition {
  id: string; // slug, e.g. "explorer"
  name: string;
  category: StampCategory;
  description: string;
  icon: StampIconId; // which SVG motif to render
  rare?: boolean; // special edition foil treatment
  secret?: boolean; // hidden until unlocked
}

export type StampIconId =
  | 'compass'
  | 'handshake'
  | 'lotus'
  | 'crown'
  | 'people'
  | 'family-tree'
  | 'globe'
  | 'cake'
  | 'infinity'
  | 'key'
  | 'wax-seal'
  | 'podium'
  | 'star'
  | 'anchor'
  | 'flame'
  | 'gavel'
  | 'mask';

export interface StampInstance {
  id: string;
  definitionId: string;
  memberId: string;
  eventId?: string;
  awardedAt: string; // ISO date
  city: string;
  country: string;
  note?: string;
  gallery?: string[]; // photo URLs
  awardedBy?: string; // chapter manager id
}

export interface Member {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  chapter: string;
  memberSince: string; // ISO date
  role: 'member' | 'spouse' | 'chapter_manager' | 'admin';
  bio?: string;
  city: string;
  country: string;
}

export interface Event {
  id: string;
  title: string;
  category: StampCategory;
  city: string;
  country: string;
  date: string; // ISO date
  coverImageUrl?: string;
  description?: string;
  linkedStampDefinitionId?: string;
  attendeeCount?: number;
}

export interface JourneyStats {
  totalExperiences: number;
  totalPossible: number;
  completionPct: number;
  byCategory: Record<StampCategory, { earned: number; total: number }>;
}

export const STAMP_CATEGORIES: { id: StampCategory; label: string; blurb: string }[] = [
  { id: 'learning', label: 'Learning', blurb: 'Forums, education & big ideas' },
  { id: 'connection', label: 'Connection', blurb: 'Peer moments & shared tables' },
  { id: 'wellness', label: 'Wellness', blurb: 'Mind, body & balance' },
  { id: 'leadership', label: 'Leadership', blurb: 'Stepping up & stepping forward' },
  { id: 'community', label: 'Community', blurb: 'Giving back, together' },
  { id: 'family', label: 'Family', blurb: 'The ones who travel with us' },
  { id: 'global', label: 'Global', blurb: 'Beyond Bolivia' },
  { id: 'special', label: 'Special', blurb: 'Once-in-a-journey moments' },
];
