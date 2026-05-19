'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { LogIn, ArrowRight, RotateCcw, Share2 } from 'lucide-react';
import { getLatestMbtiEntry, MbtiHistoryEntry } from '@/lib/mbti-history';
import { getTypeDescription } from '@/lib/type-descriptions';
import { getTypeImage } from '@/lib/type-images';
import { getTypeColors } from '@/lib/type-colors';

export default function MyPage() {
  const [latest, setLatest] = useState<MbtiHistoryEntry | null | undefined>(undefined);

  useEffect(() => {
    setLatest(getLatestMbtiEntry());
  }, []);

  // 初回 hydration 前
  if (latest === undefined) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  // 未ログイン（履歴ゼロ）
  if (!latest) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">マイページ</h1>
          <p className="text-gray-700 mb-6 leading-relaxed">
            マイページを表示するには LINE ログインが必要です。
            <br />
            診断結果を保存していない場合は、まず診断を受けてから保存してください。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
            <Link
              href="/api/auth/line"
              className="inline-flex items-center gap-2 bg-[#06C755] hover:bg-[#05B048] text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all"
            >
              <LogIn className="w-5 h-5" />
              LINE でログイン
            </Link>
            <Link
              href="/test"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all"
            >
              診断を受ける
            </Link>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            ※ 予告なくサービス（保存）を終了する場合があります。
          </p>
        </div>
      </div>
    );
  }

  // ログイン済（最新 entry あり）
  const typeInfo = getTypeDescription(latest.type);
  const { hex } = getTypeColors(latest.type);
  const dateLabel = new Date(latest.date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">マイページ</h1>
        <p className="text-sm text-gray-600 mb-6">{dateLabel} 時点の診断結果を表示しています。</p>

        {/* あなたの今の MBTI */}
        <section className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="relative w-full h-64" style={{ backgroundColor: hex }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="relative w-32 h-32 mb-2">
                <Image
                  src={getTypeImage(latest.type)}
                  alt={typeInfo.name}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-sm text-white/90 mb-1">あなたの今の MBTI</p>
              <p className="text-5xl font-bold text-white mb-1">{latest.type}</p>
              <p className="text-xl text-white/90">{typeInfo.name}</p>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-700 leading-relaxed mb-4">{typeInfo.shortDescription}</p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/mypage/history"
                className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all"
              >
                過去の診断結果を見る
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/test"
                className="inline-flex items-center justify-center gap-2 bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-bold px-6 py-3 rounded-xl transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                再診断する
              </Link>
              <button
                type="button"
                onClick={() => {
                  if (typeof navigator !== 'undefined' && navigator.share) {
                    navigator.share({
                      title: `私の MBTI は ${latest.type}（${typeInfo.name}）です`,
                      text: `無料 MBTI 診断で診断してみました！`,
                      url: typeof window !== 'undefined' ? window.location.origin : '',
                    }).catch(() => {
                      // share cancel / unsupported は黙殺
                    });
                  }
                }}
                className="inline-flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-bold px-6 py-3 rounded-xl transition-colors"
              >
                <Share2 className="w-4 h-4" />
                結果をシェアする
              </button>
            </div>
          </div>
        </section>

        <p className="text-xs text-gray-500 text-center">
          ※ 予告なくサービス（保存）を終了する場合があります。
        </p>
      </div>
    </div>
  );
}
