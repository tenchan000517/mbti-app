'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ScoreBar from '@/components/ScoreBar';
import { basicQuestions } from '@/lib/questions';
import { analyzeMBTI } from '@/lib/mbti-calculator';
import { getTypeDescription } from '@/lib/type-descriptions';
import { getTypeImage } from '@/lib/type-images';
import { getTypeColors } from '@/lib/type-colors';
import { Answer, MBTIType, ScorePercentages } from '@/types';
import CareerExploreSection from '@/components/CareerExploreSection';
import { GraduationCap, Rocket } from 'lucide-react';

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
  }
}

export default function BasicResultPage() {
  const router = useRouter();
  const [mbtiType, setMbtiType] = useState<MBTIType | null>(null);
  const [percentages, setPercentages] = useState<ScorePercentages | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // localStorageから回答データを取得
    const storedAnswers = localStorage.getItem('basicAnswers');
    if (!storedAnswers) {
      // 回答データがない場合は診断ページへリダイレクト
      router.push('/test');
      return;
    }

    const answers: Answer[] = JSON.parse(storedAnswers);
    const result = analyzeMBTI(answers, basicQuestions);

    setMbtiType(result.mbtiType);
    setPercentages(result.percentages);
    setLoading(false);
  }, [router]);

  if (loading || !mbtiType || !percentages) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">結果を計算中...</p>
        </div>
      </div>
    );
  }

  const typeInfo = getTypeDescription(mbtiType);
  const { hex } = getTypeColors(mbtiType);

  return (
    <div className="min-h-screen bg-gray-50 pt-36 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          {/* タイプ画像とタイトル */}
          <div className="relative w-full h-80" style={{ backgroundColor: hex }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="relative w-48 h-48 mb-4">
                <Image
                  src={getTypeImage(mbtiType)}
                  alt={typeInfo.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                あなたのタイプ
              </h1>
              <p className="text-6xl font-bold text-white mb-2">{mbtiType}</p>
              <p className="text-2xl text-white/90">{typeInfo.name}</p>
            </div>
          </div>

          <div className="p-8">

          <div className="border-t border-gray-200 pt-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              スコア詳細
            </h2>
            <ScoreBar
              leftLabel="E"
              rightLabel="I"
              leftPercentage={percentages.EI.E}
              rightPercentage={percentages.EI.I}
              color="blue"
            />
            <ScoreBar
              leftLabel="S"
              rightLabel="N"
              leftPercentage={percentages.SN.S}
              rightPercentage={percentages.SN.N}
              color="purple"
            />
            <ScoreBar
              leftLabel="T"
              rightLabel="F"
              leftPercentage={percentages.TF.T}
              rightPercentage={percentages.TF.F}
              color="green"
            />
            <ScoreBar
              leftLabel="J"
              rightLabel="P"
              leftPercentage={percentages.JP.J}
              rightPercentage={percentages.JP.P}
              color="orange"
            />
          </div>

          <div className="border-t border-gray-200 pt-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">概要</h2>
            <p className="text-gray-700 leading-relaxed">
              {typeInfo.shortDescription}
            </p>
          </div>

          {/* 性格特性の詳細説明 */}
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">性格特性</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {typeInfo.detailedDescription}
            </p>
          </div>

          {/* コミュニケーションスタイル */}
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">コミュニケーションスタイル</h2>
            <p className="text-gray-700 leading-relaxed">
              {typeInfo.communicationStyle}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">主な特徴</h2>
            <ul className="grid grid-cols-2 gap-2">
              {typeInfo.characteristics.map((char, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <span className="text-blue-500 mr-2">✓</span>
                  {char}
                </li>
              ))}
            </ul>
          </div>

          {/* 強みと弱み */}
          <div className="border-t border-gray-200 pt-6 mb-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-bold text-green-600 mb-4">強み</h2>
                <ul className="space-y-2">
                  {typeInfo.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <span className="text-green-500 mr-2 mt-1">●</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-orange-600 mb-4">弱み</h2>
                <ul className="space-y-2">
                  {typeInfo.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <span className="text-orange-500 mr-2 mt-1">●</span>
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 適職 */}
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">適職</h2>
            <div className="flex flex-wrap gap-3">
              {typeInfo.careers.map((career, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {career}
                </span>
              ))}
            </div>
          </div>

          {/* キャリア探索 */}
          <CareerExploreSection careers={typeInfo.careers} />

          {/* MBTI 結果 → ゆめスタ送客導線 (= 2 カラム CTA・既存維持・追加のみ・漆畑さん 17:01Z 強化反映・no-borders 遵守) */}
          <div className="mt-12 mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">この結果を、次の一歩へ</h2>
            <p className="text-gray-600 mb-8 text-center text-base">あなたに合った道で、可能性を試してみよう</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 左カラム: 高校生・大学生向け */}
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="w-6 h-6 text-emerald-600" />
                  <p className="text-sm font-semibold text-emerald-700">高校生・大学生</p>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-5">自分の進路を探すなら</h3>
                <a
                  href={`https://yumesuta.com/career-guide?utm_source=mbti&mbti_type=${mbtiType}&segment=high_school`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-bold py-4 px-6 rounded-xl shadow-md hover:shadow-lg text-center transition-all"
                >
                  ▶ キャリア探索ガイド
                </a>
                <p className="text-sm text-gray-600 mt-3 leading-relaxed text-center">業界・職種・自己分析が一気に見える</p>
                {/* LINE 公式バナー (= 漆畑さん 01:09Z literal シンプル統一・両カラム同表記・LINE 緑色 #06C755) */}
                <div className="mt-3" data-banner="line-youth">
                  <a
                    href="https://lin.ee/SIdAyY4"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
                        window.gtag('event', 'line_cta_click', {
                          event_category: 'LINE CTA',
                          line_segment: 'high_school',
                          mbti_type: mbtiType,
                        })
                      }
                    }}
                    className="block bg-[#06C755] hover:bg-[#05B048] rounded-xl px-4 py-3 shadow-md hover:shadow-lg transition-all"
                  >
                    <p className="font-bold text-white text-center text-base">💬 LINEで友だち追加</p>
                  </a>
                </div>
              </div>
              {/* 右カラム: 個人事業主向け */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
                <div className="flex items-center gap-2 mb-2">
                  <Rocket className="w-6 h-6 text-amber-600" />
                  <p className="text-sm font-semibold text-amber-700">個人事業主・FC 候補者</p>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-5">自分の可能性にトライするなら</h3>
                <a
                  href={`https://yumesuta.com/recruit?utm_source=mbti&mbti_type=${mbtiType}&segment=fc_candidate`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-amber-500 hover:bg-amber-600 text-white text-lg font-bold py-4 px-6 rounded-xl shadow-md hover:shadow-lg text-center transition-all"
                >
                  ▶ ゆめスタパートナー募集
                </a>
                <p className="text-sm text-gray-600 mt-3 leading-relaxed text-center">業務委託からはじめる起業</p>
                {/* メルマガバナー (URL 未確定 = 非表示) */}
                <div className="hidden mt-3" data-banner="mailmag-fc">
                  <a href="" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-xl px-4 py-3">
                    <p className="font-bold text-amber-700">▶ メルマガ (個人事業主用)</p>
                  </a>
                </div>
                {/* LINE 公式バナー (= 漆畑さん 01:09Z literal シンプル統一・両カラム同表記・LINE 緑色 #06C755) */}
                <div className="mt-3" data-banner="line-fc">
                  <a
                    href="https://lin.ee/SIdAyY4"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
                        window.gtag('event', 'line_cta_click', {
                          event_category: 'LINE CTA',
                          line_segment: 'fc_candidate',
                          mbti_type: mbtiType,
                        })
                      }
                    }}
                    className="block bg-[#06C755] hover:bg-[#05B048] rounded-xl px-4 py-3 shadow-md hover:shadow-lg transition-all"
                  >
                    <p className="font-bold text-white text-center text-base">💬 LINEで友だち追加</p>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* キャリアパス */}
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">あなたのキャリアパス</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {typeInfo.careerPath}
            </p>

            {/* 影響力のある特性 */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">影響力のある特性</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {typeInfo.influentialTraits.map((trait, index) => (
                  <div key={index} className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-2">
                      <svg className="w-24 h-24 transform -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="#E5E7EB"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke={index === 0 ? '#3B82F6' : index === 1 ? '#F59E0B' : index === 2 ? '#10B981' : '#A855F7'}
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={`${2 * Math.PI * 40 * (1 - trait.percentage / 100)}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold text-gray-900">{trait.percentage}%</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 font-medium">{trait.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 自己成長 */}
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">あなたの自己成長</h2>
            <p className="text-gray-700 leading-relaxed">
              {typeInfo.selfGrowth}
            </p>
          </div>

          {/* 相性の良いタイプ */}
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">相性の良いタイプ</h2>
            <div className="flex gap-4">
              {typeInfo.compatibleTypes.map((compatibleType, index) => {
                const compatibleTypeInfo = getTypeDescription(compatibleType);
                return (
                  <div
                    key={index}
                    className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 text-center"
                  >
                    <p className="text-2xl font-bold text-purple-600">{compatibleType}</p>
                    <p className="text-sm text-gray-700 mt-1">{compatibleTypeInfo.name}タイプ</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* MVP: 詳細診断機能は未実装のため、一旦コメントアウト
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <p className="text-center text-gray-700 mb-4">
              さらに詳しい診断結果を見ませんか？
            </p>
            <p className="text-center text-sm text-gray-600 mb-4">
              詳細診断では、より精緻な性格分析と適職診断、相性診断が受けられます。
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => router.push('/test/advanced')}
                className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all"
              >
                詳細診断を受ける
              </button>
            </div>
          </div>
          */}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://yumesuta.com/career-guide"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
            >
              キャリア探索を始める
            </a>
            <button
              onClick={() => router.push('/')}
              className="text-gray-600 hover:text-gray-900 transition-all px-6 py-3"
            >
              トップページに戻る
            </button>
          </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          運営: <a href="https://yumesuta.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">株式会社ゆめスタ</a>
        </div>
      </div>
    </div>
  );
}
