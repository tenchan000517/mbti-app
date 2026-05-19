/**
 * Brevo (旧 Sendinblue) Contact API utility for mbti-app。
 *
 * Phase E (2026-05-19・漆畑さん「制作部中心」方針)：
 * LINE Login で取得した userId を Brevo Contact に Custom Attribute として永続化し、
 * MBTI 結果履歴をクラウド側で管理する（端末跨ぎ同期 + ゆめスタ LINE 公式から MBTI 別配信可能化）。
 *
 * Brevo Contact の主キーは email のため、LINE userId だけでは Contact 作成不可。
 * → 仮想 email「line.{userId}@mbti.yumesuta.com.line.local」を生成（外部送信されない・属性検索の主キーは LINE_USER_ID）。
 *
 * Custom Attributes：
 * - LINE_USER_ID (TEXT): LINE userId（検索キー）
 * - MBTI_LATEST_TYPE (TEXT): 最新 MBTI 型（例: INTJ）
 * - MBTI_LATEST_DATE (DATE): 最新受験日（ISO YYYY-MM-DD）
 * - MBTI_HISTORY (TEXT): 履歴 JSON 配列 [{type, date}, ...] 最大 50 件
 *
 * 環境変数：
 * - BREVO_API_KEY: Brevo Marketing Platform > SMTP & API > API keys
 */

import { MBTIType } from '@/types';

const BREVO_API_BASE = 'https://api.brevo.com/v3';
const MAX_HISTORY_ENTRIES = 50;

export const ATTR_LINE_USER_ID = 'LINE_USER_ID';
export const ATTR_MBTI_LATEST_TYPE = 'MBTI_LATEST_TYPE';
export const ATTR_MBTI_LATEST_DATE = 'MBTI_LATEST_DATE';
export const ATTR_MBTI_HISTORY = 'MBTI_HISTORY';

function getApiKey(): string {
  const key = process.env.BREVO_API_KEY;
  if (!key) throw new Error('Missing required environment variable: BREVO_API_KEY');
  return key;
}

function brevoHeaders(): HeadersInit {
  return {
    accept: 'application/json',
    'content-type': 'application/json',
    'api-key': getApiKey(),
  };
}

/**
 * LINE userId から Brevo Contact 検索用の仮想 email を生成。
 * このアドレスには Brevo からメール送信しない（subscribe=false 運用）。
 */
export function virtualEmailFromLineUserId(lineUserId: string): string {
  // 安全性確保のため userId をそのまま使う（LINE userId は U で始まる 32 文字 hex 風 ID）
  const sanitized = lineUserId.replace(/[^A-Za-z0-9_-]/g, '');
  return `line.${sanitized}@mbti.yumesuta.com.line.local`;
}

export interface MbtiHistoryEntry {
  type: MBTIType;
  date: string; // YYYY-MM-DD
}

export interface BrevoMbtiState {
  email: string;
  lineUserId: string;
  latestType: MBTIType | null;
  latestDate: string | null;
  history: MbtiHistoryEntry[];
}

interface BrevoContact {
  id?: number;
  email?: string;
  attributes?: Record<string, unknown>;
}

/**
 * Custom Attribute schema を Brevo に登録（初回のみ実行）。
 * 既に存在する属性は 400 で返るので無視する（冪等）。
 */
export async function ensureAttributes(): Promise<void> {
  const attrs: Array<{ name: string; type: 'text' | 'date' }> = [
    { name: ATTR_LINE_USER_ID, type: 'text' },
    { name: ATTR_MBTI_LATEST_TYPE, type: 'text' },
    { name: ATTR_MBTI_LATEST_DATE, type: 'date' },
    { name: ATTR_MBTI_HISTORY, type: 'text' },
  ];

  await Promise.all(
    attrs.map(async ({ name, type }) => {
      const res = await fetch(
        `${BREVO_API_BASE}/contacts/attributes/normal/${encodeURIComponent(name)}`,
        {
          method: 'POST',
          headers: brevoHeaders(),
          body: JSON.stringify({ type }),
        }
      );
      // 既存属性は 400 (DUPLICATE_PARAMETER) を返す → 無視
      if (!res.ok && res.status !== 400) {
        const body = await res.text().catch(() => '');
        // eslint-disable-next-line no-console
        console.warn(`Brevo ensureAttributes ${name} (${type}) failed: ${res.status} ${body}`);
      }
    })
  );
}

/**
 * email で Brevo Contact を取得（存在しなければ null）。
 */
async function getContactByEmail(email: string): Promise<BrevoContact | null> {
  const res = await fetch(`${BREVO_API_BASE}/contacts/${encodeURIComponent(email)}`, {
    headers: brevoHeaders(),
    cache: 'no-store',
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Brevo getContact failed: ${res.status} ${body}`);
  }
  return res.json() as Promise<BrevoContact>;
}

/**
 * Contact を作成 or 更新（updateEnabled: true で email 主キーで upsert）。
 */
async function upsertContact(
  email: string,
  attributes: Record<string, unknown>
): Promise<void> {
  const res = await fetch(`${BREVO_API_BASE}/contacts`, {
    method: 'POST',
    headers: brevoHeaders(),
    body: JSON.stringify({
      email,
      attributes,
      updateEnabled: true,
      // 仮想 email へのメール送信防止（既存運用との混在防止）
      emailBlacklisted: true,
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Brevo upsertContact failed: ${res.status} ${body}`);
  }
}

function parseHistory(raw: unknown): MbtiHistoryEntry[] {
  if (typeof raw !== 'string' || raw.length === 0) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (e): e is MbtiHistoryEntry =>
        e !== null &&
        typeof e === 'object' &&
        typeof e.type === 'string' &&
        typeof e.date === 'string'
    );
  } catch {
    return [];
  }
}

/**
 * 既存 Contact から MBTI 状態を取得。Contact が無ければ初期状態。
 */
export async function getMbtiState(lineUserId: string): Promise<BrevoMbtiState> {
  const email = virtualEmailFromLineUserId(lineUserId);
  const contact = await getContactByEmail(email);
  const attrs = (contact?.attributes ?? {}) as Record<string, unknown>;

  const latestType =
    typeof attrs[ATTR_MBTI_LATEST_TYPE] === 'string'
      ? (attrs[ATTR_MBTI_LATEST_TYPE] as MBTIType)
      : null;
  const latestDateRaw = attrs[ATTR_MBTI_LATEST_DATE];
  const latestDate =
    typeof latestDateRaw === 'string'
      ? latestDateRaw.slice(0, 10)
      : null;
  const history = parseHistory(attrs[ATTR_MBTI_HISTORY]);

  return {
    email,
    lineUserId,
    latestType,
    latestDate,
    history,
  };
}

/**
 * MBTI 診断結果を Brevo に保存（履歴 append + 最新更新）。
 * 同日 entry は最新で replace（lib/mbti-history.ts と同じセマンティクス）。
 */
export async function saveMbtiResult(
  lineUserId: string,
  type: MBTIType,
  date: Date = new Date()
): Promise<BrevoMbtiState> {
  const email = virtualEmailFromLineUserId(lineUserId);
  const isoDate = date.toISOString();
  const dateOnly = isoDate.slice(0, 10);

  const state = await getMbtiState(lineUserId);
  const filtered = state.history.filter((entry) => !entry.date.startsWith(dateOnly));
  const next: MbtiHistoryEntry[] = [...filtered, { type, date: dateOnly }]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-MAX_HISTORY_ENTRIES); // 末尾 N 件保持

  await upsertContact(email, {
    [ATTR_LINE_USER_ID]: lineUserId,
    [ATTR_MBTI_LATEST_TYPE]: type,
    [ATTR_MBTI_LATEST_DATE]: dateOnly,
    [ATTR_MBTI_HISTORY]: JSON.stringify(next),
  });

  return {
    email,
    lineUserId,
    latestType: type,
    latestDate: dateOnly,
    history: next,
  };
}
