import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME, verifySession } from '@/lib/line-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * 現在のログイン状態を返す（client component から fetch して使用）。
 */
export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionCookie) {
    return NextResponse.json({ loggedIn: false });
  }

  const session = verifySession(sessionCookie);
  if (!session) {
    return NextResponse.json({ loggedIn: false });
  }

  return NextResponse.json({
    loggedIn: true,
    userId: session.userId,
    displayName: session.displayName,
    pictureUrl: session.pictureUrl,
  });
}
