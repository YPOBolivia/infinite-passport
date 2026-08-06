# Infinite Passport — YPO Bolivia

A private digital passport that celebrates the *experiences* of the YPO year — not
attendance. Built as a premium, Apple-adjacent product: elegant typography, gold
foil detailing, embossed stamps, dark/light modes, and an admin console for
Chapter Managers.

## Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** — full design-token system in `tailwind.config.ts`
- **Supabase** — Auth (magic link), Postgres, Storage, Realtime
- **Framer Motion** — stamp unlock animation, page transitions
- **Recharts** — admin analytics
- **jsPDF** — Download Passport PDF

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your Supabase project keys
npm run dev
```

The app runs fully on **mock data** (`lib/mock-data.ts`) out of the box, so you can
explore every screen — dashboard, full passport, admin console — with zero backend
configuration. Wiring Supabase is a data-layer swap, not a UI rewrite (see below).

## Wiring up Supabase

1. Create a project at supabase.com.
2. Run `supabase/schema.sql` in the SQL editor, then `supabase/seed.sql` to load
   the full stamp catalog (Learning, Connection, Wellness, Leadership, Community,
   Family, Global, and every Special stamp).
3. Enable **Email OTP** (magic link) under Authentication → Providers.
4. Copy your project URL + anon key into `.env.local`.
5. Replace the demo calls in `contexts/AuthContext.tsx` with
   `supabase.auth.signInWithOtp(...)`, and the arrays in `lib/mock-data.ts` with
   Supabase queries — every function there documents its real equivalent inline.
6. Subscribe to `stamp_instances` via Supabase Realtime to get the stamp-unlock
   animation firing live when a Chapter Manager awards a stamp.

## Folder structure

```
app/                    Routes (App Router)
  page.tsx              Login / landing
  dashboard/page.tsx     Member dashboard
  passport/page.tsx     Full stamp collection
  admin/page.tsx         Chapter Manager console
components/
  ui/                    Button, Card, ProgressRing, ThemeToggle — primitives
  passport/              PassportCover, Stamp, StampGrid, StampModal, Timeline,
                          InteractiveMap, Gallery — the product's visual core
  layout/                Navbar, Sidebar
  admin/                 MemberTable, StampAssigner, EventForm, AnalyticsPanel
contexts/                ThemeContext, AuthContext
lib/
  types.ts               Domain types — mirrors the Supabase schema exactly
  stamps.ts               Stamp catalog — single source of truth for all stamps
  mock-data.ts            Demo data layer (1:1 swappable with Supabase queries)
  supabase/                Browser + server Supabase clients
  pdf.ts                   Passport PDF export
supabase/
  schema.sql               Tables, RLS policies, Realtime, Storage buckets
  seed.sql                  Full stamp catalog seed data
middleware.ts              Route protection for /dashboard, /passport, /admin
```

## Design system

- **Palette** — Deep navy (`#0B1229`) and ivory (`#F7F3E9`) as the two paper
  colors, gold foil (`#C9A961`) as the single accent. Each stamp category has
  its own desaturated "ink" color (see `ink.*` in `tailwind.config.ts`) so the
  passport reads like it was stamped with eight different pens over the years.
- **Type** — Fraunces (display serif, used only for titles, always a touch
  italic) paired with Inter (body) and IBM Plex Mono (dates, eyebrows, data —
  the "customs form" register).
- **Signature element** — the stamp itself: a hand-pressed circular die with a
  deterministic per-stamp rotation (`stampRotation()` in `lib/utils.ts`), an
  ink-colored ring, and a spring-physics "stamp-down" animation on unlock.
- **Motion** — deliberately restrained. The stamp unlock and the passport
  cover's foil sheen are the two moments of motion; everything else is quiet.
- Respects `prefers-reduced-motion` and ships full keyboard focus states.

## Extending the stamp catalog

Every stamp — including all 14 Special stamps (Birthday, Anniversary, Welcome,
Passport Activated, Explorer, Global Citizen, Moderator, Host, Volunteer,
Infinite, Secret, 100% Attendance, Speaker, Board Member) — is defined once in
`lib/stamps.ts` (and mirrored in `supabase/seed.sql`). Adding a new stamp
anywhere in the org is a single new entry; every screen — dashboard, full
passport, admin assigner — reads from that one registry.

## Admin console

Chapter Managers (`role = 'chapter_manager'` or `'admin'`) get `/admin`:
search members, create events (optionally auto-creating a matching stamp),
assign or remove stamps, design custom stamps, send chapter notifications,
view participation analytics, and export CSV/PDF reports. RLS policies in
`schema.sql` enforce all of this server-side, not just in the UI.
