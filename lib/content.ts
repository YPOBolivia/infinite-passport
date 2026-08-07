// ─────────────────────────────────────────────────────────────
// Default copy for every editable phrase in the product — the
// hero title/subtitle on login, and each Visa's label + tagline.
// These are the fallback values used while `app_content` loads
// (or if a row was deleted) — the live values, once someone edits
// them in Supabase, come from the `app_content` table instead.
// ─────────────────────────────────────────────────────────────
export const DEFAULT_CONTENT: Record<string, string> = {
  hero_title: 'Your journey, stamped.',
  hero_subtitle: 'Every experience leaves a mark. Every stamp tells a story. Welcome to your Infinite Passport.',

  learning_label: 'Learning Visa',
  learning_blurb: 'Expand your mind.',
  network_label: 'Network Visa',
  network_blurb: 'Build lifelong connections.',
  forum_label: 'Forum Visa',
  forum_blurb: 'Share what truly matters.',
  family_label: 'Family Visa',
  family_blurb: 'Grow together.',
  regional_label: 'Regional Visa',
  regional_blurb: 'Discover your region.',
  global_label: 'Global Visa',
  global_blurb: 'Experience the world.',
  governance_label: 'Governance Visa',
  governance_blurb: 'Lead through service.',
  special_label: 'Special Collection',
  special_blurb: 'Milestones that make your journey uniquely personal.',
};
