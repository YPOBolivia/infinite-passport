import { StampDefinition } from './types';

// ─────────────────────────────────────────────────────────────
// Stamp Registry — the full "die set" for Infinite Passport.
// Adding a new stamp anywhere in the org means adding one entry
// here; every UI (dashboard, passport, admin) reads from this.
// ─────────────────────────────────────────────────────────────
export const STAMP_DEFINITIONS: StampDefinition[] = [
  // LEARNING
  { id: 'forum-attendee', name: 'Forum', category: 'learning', icon: 'compass', description: 'Attended a monthly Forum — the heart of the YPO experience.' },
  { id: 'education-day', name: 'Education Day', category: 'learning', icon: 'compass', description: 'Invested a full day in a chapter Education event.' },
  { id: 'university', name: 'YPO University', category: 'learning', icon: 'compass', description: 'Completed a YPO University program.' },

  // CONNECTION
  { id: 'welcome-dinner', name: 'Welcome Dinner', category: 'connection', icon: 'handshake', description: 'Broke bread with the chapter at a Welcome Dinner.' },
  { id: 'forum-retreat', name: 'Forum Retreat', category: 'connection', icon: 'handshake', description: 'Deepened a Forum bond on retreat.' },
  { id: 'social-night', name: 'Chapter Social', category: 'connection', icon: 'handshake', description: 'Showed up for a purely social chapter night.' },

  // WELLNESS
  { id: 'wellness-retreat', name: 'Wellness Retreat', category: 'wellness', icon: 'lotus', description: 'Took a deliberate pause for mind and body.' },
  { id: 'active-life', name: 'Active Life', category: 'wellness', icon: 'lotus', description: 'Joined a chapter sport, hike or active challenge.' },

  // LEADERSHIP
  { id: 'chair', name: 'Chapter Chair', category: 'leadership', icon: 'crown', description: 'Served as Chapter Chair.', rare: true },
  { id: 'committee-lead', name: 'Committee Lead', category: 'leadership', icon: 'crown', description: 'Led a chapter committee for a term.' },
  { id: 'forum-lead', name: 'Forum Facilitator', category: 'leadership', icon: 'crown', description: 'Facilitated a Forum for the year.' },

  // COMMUNITY
  { id: 'community-impact', name: 'Community Impact', category: 'community', icon: 'people', description: 'Gave time to a chapter service project.' },
  { id: 'mentor', name: 'Mentor', category: 'community', icon: 'people', description: 'Mentored a fellow or prospective member.' },

  // FAMILY
  { id: 'family-camp', name: 'Family Camp', category: 'family', icon: 'family-tree', description: 'Brought the family into the journey.' },
  { id: 'next-gen', name: 'Next Gen Day', category: 'family', icon: 'family-tree', description: 'Introduced the next generation to YPO.' },
  { id: 'spousal-forum', name: 'Spouse Forum', category: 'family', icon: 'family-tree', description: 'Your partner found their own Forum home.' },

  // GLOBAL
  { id: 'global-university', name: 'Global University', category: 'global', icon: 'globe', description: 'Traveled abroad for a YPO Global University.' },
  { id: 'cross-chapter', name: 'Cross-Chapter Visit', category: 'global', icon: 'globe', description: 'Visited a sister chapter beyond Bolivia.' },
  { id: 'edge', name: 'YPO Edge', category: 'global', icon: 'globe', description: 'Attended the global Edge conference.', rare: true },

  // SPECIAL STAMPS
  { id: 'passport-activated', name: 'Passport Activated', category: 'special', icon: 'key', description: 'The journey begins. Your Infinite Passport is now active.' },
  { id: 'welcome', name: 'Welcome', category: 'special', icon: 'wax-seal', description: 'Officially welcomed into YPO Bolivia.' },
  { id: 'birthday', name: 'Birthday', category: 'special', icon: 'cake', description: 'Celebrated within the chapter family.' },
  { id: 'anniversary', name: 'Anniversary', category: 'special', icon: 'infinity', description: 'Another year in the YPO journey.' },
  { id: 'explorer', name: 'Explorer', category: 'special', icon: 'compass', description: 'Earned a stamp in five different categories.', rare: true },
  { id: 'global-citizen', name: 'Global Citizen', category: 'special', icon: 'globe', description: 'Collected stamps across three or more countries.', rare: true },
  { id: 'moderator', name: 'Moderator', category: 'special', icon: 'podium', description: 'Moderated a chapter or Forum session.' },
  { id: 'host', name: 'Host', category: 'special', icon: 'anchor', description: 'Opened your home or business to the chapter.' },
  { id: 'volunteer', name: 'Volunteer', category: 'special', icon: 'flame', description: 'Volunteered chapter hours across the year.' },
  { id: 'infinite', name: 'Infinite', category: 'special', icon: 'infinity', description: 'Completed every category in a single year.', rare: true },
  { id: 'secret', name: '???', category: 'special', icon: 'mask', description: 'A hidden stamp. Its story reveals itself only once earned.', secret: true, rare: true },
  { id: 'full-attendance', name: '100% Attendance', category: 'special', icon: 'star', description: 'Present at every chapter event, all year.', rare: true },
  { id: 'speaker', name: 'Speaker', category: 'special', icon: 'podium', description: 'Took the stage to share your story.' },
  { id: 'board-member', name: 'Board Member', category: 'special', icon: 'gavel', description: 'Served on the chapter board.', rare: true },
];

export const getStampDefinition = (id: string): StampDefinition | undefined =>
  STAMP_DEFINITIONS.find((s) => s.id === id);

export const stampsByCategory = (category: string): StampDefinition[] =>
  STAMP_DEFINITIONS.filter((s) => s.category === category);
