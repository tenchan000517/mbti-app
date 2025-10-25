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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
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

          {/* 相性の良いタイプ */}
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">相性の良いタイプ</h2>
            <div className="flex gap-4">
              {typeInfo.compatibleTypes.map((compatibleType, index) => (
                <div
                  key={index}
                  className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 text-center"
                >
                  <p className="text-2xl font-bold text-purple-600">{compatibleType}</p>
                </div>
              ))}
            </div>
          </div>

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
          運営: ゆめスタ
        </div>
      </div>
    </div>
  );
}
