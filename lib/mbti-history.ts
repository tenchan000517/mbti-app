import { MBTIType } from '@/types';

const STORAGE_KEY = 'mbti_history';

export interface MbtiHistoryEntry {
  type: MBTIType;
  date: string; // ISO 8601
}

/**
 * localStorage に MBTI 診断結果履歴を保存する（既存 履歴に追記）。
 * 同じ日に複数回診断した場合は最新のみ保持（既存 同日 entry を replace）。
 */
export function saveMbtiHistory(type: MBTIType, date: Date = new Date()): MbtiHistoryEntry[] {
  if (typeof window === 'undefined') return [];

  const isoDate = date.toISOString();
  const dateOnly = isoDate.slice(0, 10); // YYYY-MM-DD

  const existing = loadMbtiHistory();
  const filtered = existing.filter((entry) => !entry.date.startsWith(dateOnly));
  const next: MbtiHistoryEntry[] = [...filtered, { type, date: isoDate }];

  // 日付昇順で保存（最新が末尾）
  next.sort((a, b) => a.date.localeCompare(b.date));

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // localStorage 不可（プライベートブラウズ等）は黙殺
  }

  return next;
}

/**
 * localStorage から MBTI 履歴を読み込む（日付昇順）。
 */
export function loadMbtiHistory(): MbtiHistoryEntry[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (entry): entry is MbtiHistoryEntry =>
        typeof entry === 'object' &&
        entry !== null &&
        typeof entry.type === 'string' &&
        typeof entry.date === 'string'
    );
  } catch {
    return [];
  }
}

/**
 * 最新の診断結果を取得（履歴末尾）。
 */
export function getLatestMbtiEntry(): MbtiHistoryEntry | null {
  const history = loadMbtiHistory();
  return history.length > 0 ? history[history.length - 1] : null;
}
