// ─────────────────────────────────────────────────────────────
// Infinite Passport — Domain Types
// These mirror the Supabase schema in /supabase/schema.sql
// ─────────────────────────────────────────────────────────────

export type StampCategory =
  | 'learning'
  | 'network'
  | 'forum'
  | 'family'
  | 'regional'
  | 'global'
  | 'governance'
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
  { id: 'learning', label: 'Learning Visa', blurb: 'Expand your mind.' },
  { id: 'network', label: 'Network Visa', blurb: 'Build lifelong connections.' },
  { id: 'forum', label: 'Forum Visa', blurb: 'Share what truly matters.' },
  { id: 'family', label: 'Family Visa', blurb: 'Grow together.' },
  { id: 'regional', label: 'Regional Visa', blurb: 'Discover your region.' },
  { id: 'global', label: 'Global Visa', blurb: 'Experience the world.' },
  { id: 'governance', label: 'Governance Visa', blurb: 'Lead through service.' },
  { id: 'special', label: 'Special Collection', blurb: 'Milestones that make your journey uniquely personal.' },
];
