import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME, verifySession } from '@/lib/line-auth';
import { saveMbtiResult, ensureAttributes } from '@/lib/brevo';
import { MBTIType } from '@/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const VALID_TYPES: ReadonlySet<MBTIType> = new Set([
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP',
]);

// Custom Attribute schema を 1 度だけ保証する（同一プロセス内で再実行回避）
let attributesEnsured = false;
async function ensureAttributesOnce() {
  if (attributesEnsured) return;
  attributesEnsured = true;
  try {
    await ensureAttributes();
  } catch (e) {
    // 失敗しても次回再試行できるようにフラグを戻す
    attributesEnsured = false;
    throw e;
  }
}

/**
 * MBTI 診断結果を Brevo Contact に保存する。
 * 認証済セッション必須（cookie verify）。
 *
 * Request body: { mbtiType: MBTIType }
 * Response: { ok: true, state: BrevoMbtiState }
 */
export async function POST(req: Request) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionCookie) {
    return NextResponse.json({ ok: false, error: 'unauthenticated' }, { status: 401 });
  }
  const session = verifySession(sessionCookie);
  if (!session) {
    return NextResponse.json({ ok: false, error: 'invalid_session' }, { status: 401 });
  }

  let body: { mbtiType?: unknown };
  try {
    body = (await req.json()) as { mbtiType?: unknown };
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const mbtiType = typeof body.mbtiType === 'string' ? body.mbtiType.toUpperCase() : '';
  if (!VALID_TYPES.has(mbtiType as MBTIType)) {
    return NextResponse.json({ ok: false, error: 'invalid_mbti_type' }, { status: 400 });
  }

  try {
    await ensureAttributesOnce();
    const state = await saveMbtiResult(session.userId, mbtiType as MBTIType);
    return NextResponse.json({ ok: true, state });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'unknown_error';
    // eslint-disable-next-line no-console
    console.error('mbti save failed:', message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
