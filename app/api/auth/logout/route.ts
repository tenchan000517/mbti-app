import { NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME } from '@/lib/line-auth';

export const runtime = 'nodejs';

/**
 * セッション cookie を削除してログアウト。
 * POST にすることで CSRF リスクを最小化（form submit / fetch POST を要求）。
 */
export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(SESSION_COOKIE_NAME);
  return res;
}
