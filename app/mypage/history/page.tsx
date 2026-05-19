'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { loadMbtiHistory, MbtiHistoryEntry } from '@/lib/mbti-history';
import { getTypeDescription } from '@/lib/type-descriptions';
import type { MBTIType } from '@/types';

interface BrevoState {
  latestType?: string;
  latestDate?: string;
  history?: { type: string; date: string }[];
}

function mergeHistories(
  local: MbtiHistoryEntry[],
  remote: { type: string; date: string }[]
): MbtiHistoryEntry[] {
  const map = new Map<string, MbtiHistoryEntry>();
  // 日付（YYYY-MM-DD）で重複排除・remote 優先（クラウドが真）
  for (const entry of local) {
    const dateKey = entry.date.slice(0, 10);
    map.set(dateKey, { type: entry.type, date: entry.date });
  }
  for (const entry of remote) {
    const dateKey = entry.date.slice(0, 10);
    map.set(dateKey, { type: entry.type as MBTIType, date: entry.date });
  }
  return Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date));
}

export default function MyPageHistory() {
  const [history, setHistory] = useState<MbtiHistoryEntry[] | undefined>(undefined);

  useEffect(() => {
    const local = loadMbtiHistory();
    fetch('/api/mbti/history', { cache: 'no-store' })
      .then(async (res) => {
        if (!res.ok) return null;
        const data = (await res.json()) as { ok?: boolean; state?: BrevoState };
        return data.ok && data.state?.history ? data.state.history : null;
      })
      .then((remote) => {
        setHistory(remote ? mergeHistories(local, remote) : local);
      })
      .catch(() => setHistory(local));
  }, []);

  if (history === undefined) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">過去の診断結果</h1>
          <p className="text-gray-700 mb-6">まだ診断結果が保存されていません。</p>
          <Link
            href="/test"
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all"
          >
            診断を受ける
          </Link>
        </div>
      </div>
    );
  }

  // 新しい順に表示（保存時は昇順だが履歴は新→旧で見せる）
  const sortedDesc = [...history].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/mypage"
          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          マイページに戻る
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">過去の診断結果</h1>
        <p className="text-sm text-gray-600 mb-6">受験ごとに変わるあなたを振り返れます</p>

        <ul className="space-y-3 mb-6">
          {sortedDesc.map((entry, idx) => {
            const typeInfo = getTypeDescription(entry.type);
            const dateLabel = entry.date.slice(0, 10); // YYYY-MM-DD
            return (
              <li
                key={`${entry.date}-${idx}`}
                className="bg-white rounded-xl shadow-md p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:shadow-lg transition-shadow"
              >
                <div>
                  <p className="text-sm text-gray-600">{dateLabel} に受験</p>
                  <p className="text-lg font-bold text-gray-900">
                    <span className="text-blue-600">{entry.type}</span>
                    <span className="text-gray-700 text-base ml-2">- {typeInfo.name}</span>
                  </p>
                </div>
                <Link
                  href={`/types/${entry.type.toLowerCase()}?from=mypage-history`}
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium whitespace-nowrap"
                >
                  この時の診断結果を見る
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="text-xs text-gray-500 text-center">
          ※ 予告なくサービス（保存）を終了する場合があります。
        </p>
      </div>
    </div>
  );
}
