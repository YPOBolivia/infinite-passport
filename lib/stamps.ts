import { StampDefinition } from './types';

// ─────────────────────────────────────────────────────────────
// Stamp Registry — the full "die set" for Infinite Passport.
//
// Event-based visas (Learning, Network, Regional, Global, Family)
// are made of generic "Event" slots. Each slot is a blank space in
// the passport — when a Chapter Manager creates and links a real
// chapter event to a slot, that slot's artwork picks up the event's
// name, date, city, photos, and description automatically. The slot
// itself never says "Stamp" — that's reserved for the die-cut shape
// of the badge, not its label.
//
// Forum and Governance are role/attendance-based, not event-slot
// based, so they keep their own naming (Forum Attendance N,
// Forum Moderator, Day Chair, Committee Member, etc).
// ─────────────────────────────────────────────────────────────
export const STAMP_DEFINITIONS: StampDefinition[] = [
  // LEARNING VISA — 10 event slots
  { id: 'learning-event-01', name: 'Learning Event 01', category: 'learning', icon: 'compass', description: 'Awarded for a qualifying chapter learning event.' },
  { id: 'learning-event-02', name: 'Learning Event 02', category: 'learning', icon: 'compass', description: 'Awarded for a qualifying chapter learning event.' },
  { id: 'learning-event-03', name: 'Learning Event 03', category: 'learning', icon: 'compass', description: 'Awarded for a qualifying chapter learning event.' },
  { id: 'learning-event-04', name: 'Learning Event 04', category: 'learning', icon: 'compass', description: 'Awarded for a qualifying chapter learning event.' },
  { id: 'learning-event-05', name: 'Learning Event 05', category: 'learning', icon: 'compass', description: 'Awarded for a qualifying chapter learning event.' },
  { id: 'learning-event-06', name: 'Learning Event 06', category: 'learning', icon: 'compass', description: 'Awarded for a qualifying chapter learning event.' },
  { id: 'learning-event-07', name: 'Learning Event 07', category: 'learning', icon: 'compass', description: 'Awarded for a qualifying chapter learning event.' },
  { id: 'learning-event-08', name: 'Learning Event 08', category: 'learning', icon: 'compass', description: 'Awarded for a qualifying chapter learning event.' },
  { id: 'learning-event-09', name: 'Learning Event 09', category: 'learning', icon: 'compass', description: 'Awarded for a qualifying chapter learning event.' },
  { id: 'learning-event-10', name: 'Learning Event 10', category: 'learning', icon: 'compass', description: 'Awarded for a qualifying chapter learning event.' },

  // NETWORK VISA — 5 event slots
  { id: 'network-event-01', name: 'Network Event 01', category: 'network', icon: 'handshake', description: 'Awarded for a qualifying networking experience designated by the chapter.' },
  { id: 'network-event-02', name: 'Network Event 02', category: 'network', icon: 'handshake', description: 'Awarded for a qualifying networking experience designated by the chapter.' },
  { id: 'network-event-03', name: 'Network Event 03', category: 'network', icon: 'handshake', description: 'Awarded for a qualifying networking experience designated by the chapter.' },
  { id: 'network-event-04', name: 'Network Event 04', category: 'network', icon: 'handshake', description: 'Awarded for a qualifying networking experience designated by the chapter.' },
  { id: 'network-event-05', name: 'Network Event 05', category: 'network', icon: 'handshake', description: 'Awarded for a qualifying networking experience designated by the chapter.' },

  // FORUM VISA — 10 attendance slots + Forum Moderator
  { id: 'forum-attendance-01', name: 'Forum Attendance 01', category: 'forum', icon: 'wax-seal', description: 'Awarded for a qualifying Forum experience.' },
  { id: 'forum-attendance-02', name: 'Forum Attendance 02', category: 'forum', icon: 'wax-seal', description: 'Awarded for a qualifying Forum experience.' },
  { id: 'forum-attendance-03', name: 'Forum Attendance 03', category: 'forum', icon: 'wax-seal', description: 'Awarded for a qualifying Forum experience.' },
  { id: 'forum-attendance-04', name: 'Forum Attendance 04', category: 'forum', icon: 'wax-seal', description: 'Awarded for a qualifying Forum experience.' },
  { id: 'forum-attendance-05', name: 'Forum Attendance 05', category: 'forum', icon: 'wax-seal', description: 'Awarded for a qualifying Forum experience.' },
  { id: 'forum-attendance-06', name: 'Forum Attendance 06', category: 'forum', icon: 'wax-seal', description: 'Awarded for a qualifying Forum experience.' },
  { id: 'forum-attendance-07', name: 'Forum Attendance 07', category: 'forum', icon: 'wax-seal', description: 'Awarded for a qualifying Forum experience.' },
  { id: 'forum-attendance-08', name: 'Forum Attendance 08', category: 'forum', icon: 'wax-seal', description: 'Awarded for a qualifying Forum experience.' },
  { id: 'forum-attendance-09', name: 'Forum Attendance 09', category: 'forum', icon: 'wax-seal', description: 'Awarded for a qualifying Forum experience.' },
  { id: 'forum-attendance-10', name: 'Forum Attendance 10', category: 'forum', icon: 'wax-seal', description: 'Awarded for a qualifying Forum experience.' },
  { id: 'forum-moderator', name: 'Forum Moderator', category: 'forum', icon: 'podium', description: 'Awarded upon successfully serving as a Forum Moderator.', rare: true },

  // FAMILY VISA — 5 event slots
  { id: 'family-event-01', name: 'Family Event 01', category: 'family', icon: 'family-tree', description: 'Awarded for a qualifying family or spouse/partner chapter experience.' },
  { id: 'family-event-02', name: 'Family Event 02', category: 'family', icon: 'family-tree', description: 'Awarded for a qualifying family or spouse/partner chapter experience.' },
  { id: 'family-event-03', name: 'Family Event 03', category: 'family', icon: 'family-tree', description: 'Awarded for a qualifying family or spouse/partner chapter experience.' },
  { id: 'family-event-04', name: 'Family Event 04', category: 'family', icon: 'family-tree', description: 'Awarded for a qualifying family or spouse/partner chapter experience.' },
  { id: 'family-event-05', name: 'Family Event 05', category: 'family', icon: 'family-tree', description: 'Awarded for a qualifying family or spouse/partner chapter experience.' },

  // REGIONAL VISA — 3 event slots
  { id: 'regional-event-01', name: 'Regional Event 01', category: 'regional', icon: 'anchor', description: 'Awarded for an approved Regional YPO event.' },
  { id: 'regional-event-02', name: 'Regional Event 02', category: 'regional', icon: 'anchor', description: 'Awarded for an approved Regional YPO event.' },
  { id: 'regional-event-03', name: 'Regional Event 03', category: 'regional', icon: 'anchor', description: 'Awarded for an approved Regional YPO event.' },

  // GLOBAL VISA — 3 event slots
  { id: 'global-event-01', name: 'Global Event 01', category: 'global', icon: 'globe', description: 'Awarded for an approved Global YPO experience.' },
  { id: 'global-event-02', name: 'Global Event 02', category: 'global', icon: 'globe', description: 'Awarded for an approved Global YPO experience.' },
  { id: 'global-event-03', name: 'Global Event 03', category: 'global', icon: 'globe', description: 'Awarded for an approved Global YPO experience.' },

  // GOVERNANCE VISA — role-based, not event slots
  { id: 'day-chair-1', name: 'Day Chair / Champion I', category: 'governance', icon: 'podium', description: 'Awarded for chairing a qualifying chapter event.' },
  { id: 'day-chair-2', name: 'Day Chair / Champion II', category: 'governance', icon: 'podium', description: 'Awarded for chairing a second qualifying chapter event.' },
  { id: 'day-chair-3', name: 'Day Chair / Champion III', category: 'governance', icon: 'podium', description: 'Awarded for chairing a third qualifying chapter event.' },
  { id: 'committee-member-1', name: 'Committee Member I', category: 'governance', icon: 'people', description: 'Awarded for committee service.' },
  { id: 'committee-member-2', name: 'Committee Member II', category: 'governance', icon: 'people', description: 'Awarded for a second term of committee service.' },
  { id: 'chapter-officer', name: 'Chapter Officer', category: 'governance', icon: 'gavel', description: 'Awarded upon serving as an elected or appointed chapter Officer.', rare: true },
  { id: 'sponsor', name: 'Sponsor', category: 'governance', icon: 'star', description: 'Awarded upon successfully sponsoring a new YPO member.', rare: true },

  // SPECIAL COLLECTION
  { id: 'passport-activated', name: 'Passport Activated', category: 'special', icon: 'key', description: 'Awarded the first time a member signs in to Infinite Passport.' },
  { id: 'birthday', name: 'Birthday', category: 'special', icon: 'cake', description: "Automatically awarded on the member's birthday each fiscal year." },
  { id: 'membership-anniversary', name: 'Membership Anniversary', category: 'special', icon: 'infinity', description: "Awarded annually on the member's YPO anniversary." },
  { id: 'secret', name: '???', category: 'special', icon: 'mask', description: 'A hidden collectible unlocked through a special milestone determined by the chapter.', secret: true, rare: true },
];

export const getStampDefinition = (id: string): StampDefinition | undefined =>
  STAMP_DEFINITIONS.find((s) => s.id === id);

export const stampsByCategory = (category: string): StampDefinition[] =>
  STAMP_DEFINITIONS.filter((s) => s.category === category);
