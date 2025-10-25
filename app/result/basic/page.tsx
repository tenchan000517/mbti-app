'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ScoreBar from '@/components/ScoreBar';
import { basicQuestions } from '@/lib/questions';
import { analyzeMBTI } from '@/lib/mbti-calculator';
import { getTypeDescription } from '@/lib/type-descriptions';
import { getTypeImage } from '@/lib/type-images';
import { Answer, MBTIType, ScorePercentages } from '@/types';

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

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          {/* タイプ画像とタイトル */}
          <div className="relative w-full h-80 bg-blue-50">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="relative w-48 h-48 mb-4">
                <Image
                  src={getTypeImage(mbtiType)}
                  alt={typeInfo.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                あなたのタイプ
              </h1>
              <p className="text-6xl font-bold text-blue-600 mb-2">{mbtiType}</p>
              <p className="text-2xl text-gray-700">{typeInfo.name}</p>
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

          <div className="text-center">
            <button
              onClick={() => router.push('/')}
              className="text-gray-600 hover:text-gray-900 transition-all"
            >
              トップページに戻る
            </button>
          </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          運営: <a href="https://yumesuta.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">ゆめスタ</a>
        </div>
      </div>
    </div>
  );
}
