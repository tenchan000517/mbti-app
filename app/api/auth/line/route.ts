import { NextResponse } from 'next/server';
import {
  buildAuthorizeUrl,
  generateState,
  getCallbackUrl,
  STATE_COOKIE_NAME,
  STATE_MAX_AGE_SEC,
} from '@/lib/line-auth';

export const runtime = 'nodejs';

/**
 * LINE Login OAuth authorize redirect。
 * state を生成して cookie に保存し、LINE 認証ページにリダイレクトする。
 */
export async function GET(req: Request) {
  const state = generateState();
  const callbackUrl = getCallbackUrl(req);
  const authorizeUrl = buildAuthorizeUrl(state, callbackUrl);

  const res = NextResponse.redirect(authorizeUrl);
  res.cookies.set(STATE_COOKIE_NAME, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: STATE_MAX_AGE_SEC,
    path: '/',
  });
  return res;
}
