import { createClient } from './client';
import { StampInstance, Event, Member, JourneyStats, StampCategory } from '../types';
import { STAMP_DEFINITIONS } from '../stamps';

/** Fetches the logged-in member's row from `members`, matched by their auth session. */
export async function fetchCurrentMember(): Promise<Member | null> {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;

  const { data } = await supabase
    .from('members')
    .select('*')
    .eq('auth_user_id', session.user.id)
    .single();

  if (!data) return null;

  return {
    id: data.id,
    fullName: data.full_name,
    email: data.email,
    avatarUrl: data.avatar_url ?? undefined,
    chapter: data.chapter,
    memberSince: data.member_since,
    role: data.role,
    bio: data.bio ?? undefined,
    city: data.city ?? '',
    country: data.country ?? '',
  };
}

export async function fetchMemberStamps(memberId: string): Promise<StampInstance[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from('stamp_instances')
    .select('*')
    .eq('member_id', memberId)
    .order('awarded_at', { ascending: false });

  return (data ?? []).map((row) => ({
    id: row.id,
    definitionId: row.definition_id,
    memberId: row.member_id,
    eventId: row.event_id ?? undefined,
    awardedAt: row.awarded_at,
    city: row.city,
    country: row.country,
    note: row.note ?? undefined,
    gallery: row.gallery ?? [],
    awardedBy: row.awarded_by ?? undefined,
  }));
}

export async function fetchUpcomingEvents(): Promise<Event[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from('events')
    .select('*')
    .gte('event_date', new Date().toISOString().slice(0, 10))
    .order('event_date', { ascending: true })
    .limit(6);

  return (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    category: row.category,
    city: row.city,
    country: row.country,
    date: row.event_date,
    coverImageUrl: row.cover_image_url ?? undefined,
    description: row.description ?? undefined,
    linkedStampDefinitionId: row.linked_stamp_definition_id ?? undefined,
  }));
}

/** Same completion-percentage math as the demo version, just fed with real stamps. */
export function computeJourneyStats(stamps: StampInstance[]): JourneyStats {
  const categories: StampCategory[] = ['learning', 'network', 'forum', 'family', 'regional', 'global', 'governance', 'special'];
  const byCategory = {} as JourneyStats['byCategory'];

  for (const cat of categories) {
    const total = STAMP_DEFINITIONS.filter((d) => d.category === cat && !d.secret).length;
    const earned = stamps.filter((s) => {
      const def = STAMP_DEFINITIONS.find((d) => d.id === s.definitionId);
      return def?.category === cat;
    }).length;
    byCategory[cat] = { earned: Math.min(earned, total), total };
  }

  const totalPossible = STAMP_DEFINITIONS.filter((d) => !d.secret).length;
  const totalExperiences = stamps.length;

  return {
    totalExperiences,
    totalPossible,
    completionPct: totalPossible ? Math.round((totalExperiences / totalPossible) * 100) : 0,
    byCategory,
  };
}
