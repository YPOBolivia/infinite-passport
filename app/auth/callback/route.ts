import { NextRequest, NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Magic-link callback. Supabase redirects here with a `code` param after
 * the member clicks the link in their email; we exchange it for a session
 * cookie, then send them straight into their passport.
 */
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  const redirectTo = request.nextUrl.searchParams.get('redirect_to') ?? '/dashboard';

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.set({ name, value: '', ...options });
          },
        },
      }
    );
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      // Most common cause: the link was opened in a different browser/device
      // than the one that requested it (the PKCE "code verifier" cookie only
      // exists on the original browser). Send them back to login with a
      // human-readable reason instead of silently landing on the login page.
      const loginUrl = new URL('/', request.url);
      loginUrl.searchParams.set(
        'auth_error',
        'Ese link ya expiró o se abrió en otro navegador. Pide un nuevo link y ábrelo desde el mismo navegador donde lo pediste.'
      );
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.redirect(new URL(redirectTo, request.url));
}
