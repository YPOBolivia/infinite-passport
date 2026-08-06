-- Seed stamp_definitions to match lib/stamps.ts exactly.
-- Keep these two files in sync, or migrate to reading definitions
-- from the DB only once the catalog stabilizes.

insert into stamp_definitions (id, name, category, description, icon, rare, secret) values
  ('forum-attendee', 'Forum', 'learning', 'Attended a monthly Forum — the heart of the YPO experience.', 'compass', false, false),
  ('education-day', 'Education Day', 'learning', 'Invested a full day in a chapter Education event.', 'compass', false, false),
  ('university', 'YPO University', 'learning', 'Completed a YPO University program.', 'compass', false, false),

  ('welcome-dinner', 'Welcome Dinner', 'connection', 'Broke bread with the chapter at a Welcome Dinner.', 'handshake', false, false),
  ('forum-retreat', 'Forum Retreat', 'connection', 'Deepened a Forum bond on retreat.', 'handshake', false, false),
  ('social-night', 'Chapter Social', 'connection', 'Showed up for a purely social chapter night.', 'handshake', false, false),

  ('wellness-retreat', 'Wellness Retreat', 'wellness', 'Took a deliberate pause for mind and body.', 'lotus', false, false),
  ('active-life', 'Active Life', 'wellness', 'Joined a chapter sport, hike or active challenge.', 'lotus', false, false),

  ('chair', 'Chapter Chair', 'leadership', 'Served as Chapter Chair.', 'crown', true, false),
  ('committee-lead', 'Committee Lead', 'leadership', 'Led a chapter committee for a term.', 'crown', false, false),
  ('forum-lead', 'Forum Facilitator', 'leadership', 'Facilitated a Forum for the year.', 'crown', false, false),

  ('community-impact', 'Community Impact', 'community', 'Gave time to a chapter service project.', 'people', false, false),
  ('mentor', 'Mentor', 'community', 'Mentored a fellow or prospective member.', 'people', false, false),

  ('family-camp', 'Family Camp', 'family', 'Brought the family into the journey.', 'family-tree', false, false),
  ('next-gen', 'Next Gen Day', 'family', 'Introduced the next generation to YPO.', 'family-tree', false, false),
  ('spousal-forum', 'Spouse Forum', 'family', 'Your partner found their own Forum home.', 'family-tree', false, false),

  ('global-university', 'Global University', 'global', 'Traveled abroad for a YPO Global University.', 'globe', false, false),
  ('cross-chapter', 'Cross-Chapter Visit', 'global', 'Visited a sister chapter beyond Bolivia.', 'globe', false, false),
  ('edge', 'YPO Edge', 'global', 'Attended the global Edge conference.', 'globe', true, false),

  ('passport-activated', 'Passport Activated', 'special', 'The journey begins. Your Infinite Passport is now active.', 'key', false, false),
  ('welcome', 'Welcome', 'special', 'Officially welcomed into YPO Bolivia.', 'wax-seal', false, false),
  ('birthday', 'Birthday', 'special', 'Celebrated within the chapter family.', 'cake', false, false),
  ('anniversary', 'Anniversary', 'special', 'Another year in the YPO journey.', 'infinity', false, false),
  ('explorer', 'Explorer', 'special', 'Earned a stamp in five different categories.', 'compass', true, false),
  ('global-citizen', 'Global Citizen', 'special', 'Collected stamps across three or more countries.', 'globe', true, false),
  ('moderator', 'Moderator', 'special', 'Moderated a chapter or Forum session.', 'podium', false, false),
  ('host', 'Host', 'special', 'Opened your home or business to the chapter.', 'anchor', false, false),
  ('volunteer', 'Volunteer', 'special', 'Volunteered chapter hours across the year.', 'flame', false, false),
  ('infinite', 'Infinite', 'special', 'Completed every category in a single year.', 'infinity', true, false),
  ('secret', '???', 'special', 'A hidden stamp. Its story reveals itself only once earned.', 'mask', true, true),
  ('full-attendance', '100% Attendance', 'special', 'Present at every chapter event, all year.', 'star', true, false),
  ('speaker', 'Speaker', 'special', 'Took the stage to share your story.', 'podium', false, false),
  ('board-member', 'Board Member', 'special', 'Served on the chapter board.', 'gavel', true, false)
on conflict (id) do nothing;
