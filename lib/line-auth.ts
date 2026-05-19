import crypto from 'crypto';

/**
 * LINE Login OAuth 2.0 + OpenID Connect ユーティリティ。
 *
 * 環境変数：
 * - LINE_LOGIN_CHANNEL_ID: LINE Developers Console で発行された Channel ID（数字）
 * - LINE_LOGIN_CHANNEL_SECRET: 同 Channel secret（英数字）
 * - LINE_LOGIN_SESSION_SECRET: cookie session の HMAC 署名鍵（hex 64 文字推奨）
 *
 * Flow：
 * 1. /api/auth/line → state 生成 → cookie 保存 → LINE authorize URL リダイレクト（bot_prompt=aggressive で友達追加チェックボックス強制表示）
 * 2. LINE 認証完了 → /api/auth/line/callback に code + state でリダイレクト
 * 3. state 検証 → code を access_token に交換 → profile 取得 → session cookie 発行 → /mypage リダイレクト
 */

export const LINE_AUTHORIZE_URL = 'https://access.line.me/oauth2/v2.1/authorize';
export const LINE_TOKEN_URL = 'https://api.line.me/oauth2/v2.1/token';
export const LINE_PROFILE_URL = 'https://api.line.me/v2/profile';

export const SESSION_COOKIE_NAME = 'mbti_session';
export const STATE_COOKIE_NAME = 'mbti_oauth_state';
export const SESSION_MAX_AGE_SEC = 30 * 24 * 60 * 60; // 30 日
export const STATE_MAX_AGE_SEC = 10 * 60; // 10 分

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required environment variable: ${name}`);
  return v;
}

export function getChannelId() {
  return requireEnv('LINE_LOGIN_CHANNEL_ID');
}

export function getChannelSecret() {
  return requireEnv('LINE_LOGIN_CHANNEL_SECRET');
}

function getSessionSecret() {
  return requireEnv('LINE_LOGIN_SESSION_SECRET');
}

export function getCallbackUrl(req: Request): string {
  const url = new URL(req.url);
  return `${url.origin}/api/auth/line/callback`;
}

export function generateState(): string {
  return crypto.randomBytes(32).toString('hex');
}

export interface LineSession {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  iat: number; // issued at (unix seconds)
}

export function signSession(session: LineSession): string {
  const payload = Buffer.from(JSON.stringify(session)).toString('base64url');
  const sig = crypto
    .createHmac('sha256', getSessionSecret())
    .update(payload)
    .digest('base64url');
  return `${payload}.${sig}`;
}

export function verifySession(token: string): LineSession | null {
  const dot = token.indexOf('.');
  if (dot < 0) return null;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = crypto
    .createHmac('sha256', getSessionSecret())
    .update(payload)
    .digest('base64url');
  if (!safeEqual(sig, expected)) return null;
  try {
    const json = Buffer.from(payload, 'base64url').toString('utf-8');
    const obj = JSON.parse(json) as LineSession;
    if (typeof obj.userId !== 'string' || typeof obj.displayName !== 'string') return null;
    return obj;
  } catch {
    return null;
  }
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  return crypto.timingSafeEqual(aBuf, bBuf);
}

export interface LineTokenResponse {
  access_token: string;
  token_type: 'Bearer';
  refresh_token: string;
  expires_in: number;
  scope: string;
  id_token?: string;
}

export async function exchangeCodeForToken(
  code: string,
  callbackUrl: string
): Promise<LineTokenResponse> {
  const res = await fetch(LINE_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: callbackUrl,
      client_id: getChannelId(),
      client_secret: getChannelSecret(),
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Token exchange failed: ${res.status} ${body}`);
  }
  return res.json() as Promise<LineTokenResponse>;
}

export interface LineProfile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}

export async function fetchProfile(accessToken: string): Promise<LineProfile> {
  const res = await fetch(LINE_PROFILE_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Profile fetch failed: ${res.status} ${body}`);
  }
  return res.json() as Promise<LineProfile>;
}

export function buildAuthorizeUrl(state: string, callbackUrl: string): string {
  const url = new URL(LINE_AUTHORIZE_URL);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('client_id', getChannelId());
  url.searchParams.set('redirect_uri', callbackUrl);
  url.searchParams.set('state', state);
  url.searchParams.set('scope', 'profile openid');
  // Linked OA で紐付けた @097clpaf を友達追加するチェックボックスを強制表示
  url.searchParams.set('bot_prompt', 'aggressive');
  return url.toString();
}
