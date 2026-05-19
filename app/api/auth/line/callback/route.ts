import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  exchangeCodeForToken,
  fetchProfile,
  getCallbackUrl,
  signSession,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SEC,
  STATE_COOKIE_NAME,
} from '@/lib/line-auth';

export const runtime = 'nodejs';

/**
 * LINE Login OAuth callback handler。
 * state 検証 → code を access_token に交換 → profile 取得 → session cookie 発行 → /mypage リダイレクト。
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const error = url.searchParams.get('error');
  const errorDescription = url.searchParams.get('error_description');

  // LINE 側エラー（ユーザーが認証拒否等）
  if (error) {
    const params = new URLSearchParams({ login_error: error });
    if (errorDescription) params.set('login_error_description', errorDescription);
    return NextResponse.redirect(new URL(`/?${params.toString()}`, url.origin));
  }

  if (!code || !state) {
    return NextResponse.redirect(new URL('/?login_error=missing_params', url.origin));
  }

  // state 検証（CSRF 防御）
  const cookieStore = await cookies();
  const stateCookie = cookieStore.get(STATE_COOKIE_NAME)?.value;
  if (!stateCookie || stateCookie !== state) {
    return NextResponse.redirect(new URL('/?login_error=invalid_state', url.origin));
  }

  try {
    const callbackUrl = getCallbackUrl(req);
    const tokenRes = await exchangeCodeForToken(code, callbackUrl);
    const profile = await fetchProfile(tokenRes.access_token);

    const sessionToken = signSession({
      userId: profile.userId,
      displayName: profile.displayName,
      pictureUrl: profile.pictureUrl,
      iat: Math.floor(Date.now() / 1000),
    });

    const res = NextResponse.redirect(new URL('/mypage', url.origin));
    res.cookies.set(SESSION_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_MAX_AGE_SEC,
      path: '/',
    });
    res.cookies.delete(STATE_COOKIE_NAME);
    return res;
  } catch (e) {
    const message = e instanceof Error ? e.message : 'unknown_error';
    return NextResponse.redirect(
      new URL(`/?login_error=${encodeURIComponent(message)}`, url.origin)
    );
  }
}
