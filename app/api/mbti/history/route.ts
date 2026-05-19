import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME, verifySession } from '@/lib/line-auth';
import { getMbtiState } from '@/lib/brevo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Brevo に保存されている MBTI 履歴を取得する。
 * 認証済セッション必須。
 *
 * Response: { ok: true, state: BrevoMbtiState } | { ok: false, error }
 */
export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionCookie) {
    return NextResponse.json({ ok: false, error: 'unauthenticated' }, { status: 401 });
  }
  const session = verifySession(sessionCookie);
  if (!session) {
    return NextResponse.json({ ok: false, error: 'invalid_session' }, { status: 401 });
  }

  try {
    const state = await getMbtiState(session.userId);
    return NextResponse.json({ ok: true, state });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'unknown_error';
    // eslint-disable-next-line no-console
    console.error('mbti history fetch failed:', message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
