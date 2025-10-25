'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';
import { getTypeDescription, getAllTypeDescriptions } from '@/lib/type-descriptions';
import { getTypeImage } from '@/lib/type-images';
import { getTypeColors } from '@/lib/type-colors';
import { MBTIType } from '@/types';

interface PageProps {
  params: Promise<{
    type: string;
  }>;
}

export default function TypeDetailPage({ params }: PageProps) {
  const { type } = use(params);
  const typeCode = type.toUpperCase() as MBTIType;

  // 有効なMBTIタイプかチェック
  const allTypes = getAllTypeDescriptions();
  const isValidType = allTypes.some(t => t.type === typeCode);

  if (!isValidType) {
    notFound();
  }

  const typeInfo = getTypeDescription(typeCode);
  const { colors } = getTypeColors(typeCode);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダーセクション */}
      <section className={`${colors.primary} text-white pt-24 pb-16 px-4`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h1 className="text-5xl font-bold mb-2">{typeInfo.name}</h1>
              <p className="text-2xl text-purple-200 mb-4">{typeCode}型の性格</p>
              <p className="text-lg text-purple-100">{typeInfo.shortDescription}</p>
            </div>
            <div className="relative w-64 h-64 flex-shrink-0">
              <Image
                src={getTypeImage(typeCode)}
                alt={typeInfo.name}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* メインコンテンツ */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* タイプ名の大見出し */}
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
          {typeInfo.name}
        </h2>

        {/* 引用文 */}
        {typeInfo.quote && (
          <div className={`bg-gray-50 border-l-4 ${colors.border} p-6 mb-8`}>
            <p className="text-lg text-gray-700 italic mb-2">
              {typeInfo.quote.text}
            </p>
            <p className="text-sm text-gray-600 text-right">
              — {typeInfo.quote.author}
            </p>
          </div>
        )}

        {/* 詳細説明 */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {typeInfo.detailedDescription}
          </p>
        </div>

        {/* 詳細セクション */}
        {typeInfo.detailedSections && typeInfo.detailedSections.map((section, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {section.content}
            </p>
          </div>
        ))}

        {/* 特徴・強み・弱み */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* 主な特徴 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">主な特徴</h3>
            <ul className="space-y-2">
              {typeInfo.characteristics.map((char, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <span className="text-purple-500 mr-2">✓</span>
                  {char}
                </li>
              ))}
            </ul>
          </div>

          {/* 強み */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-green-600 mb-4">強み</h3>
            <ul className="space-y-2">
              {typeInfo.strengths.map((strength, index) => (
                <li key={index} className="flex items-start text-gray-700">
                  <span className="text-green-500 mr-2 mt-1">●</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 弱み */}
          <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
            <h3 className="text-xl font-bold text-orange-600 mb-4">弱み</h3>
            <ul className="grid md:grid-cols-2 gap-2">
              {typeInfo.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start text-gray-700">
                  <span className="text-orange-500 mr-2 mt-1">●</span>
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 適職 */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">適職</h3>
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
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">相性の良いタイプ</h3>
          <div className="flex gap-4">
            {typeInfo.compatibleTypes.map((compatibleType, index) => {
              const compatibleTypeInfo = getTypeDescription(compatibleType);
              return (
                <Link
                  key={index}
                  href={`/types/${compatibleType.toLowerCase()}`}
                  className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 text-center hover:bg-purple-100 transition-colors"
                >
                  <p className="text-2xl font-bold text-purple-600">{compatibleType}</p>
                  <p className="text-sm text-gray-700 mt-1">{compatibleTypeInfo.name}タイプ</p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* CTA セクション */}
        <div className="bg-gray-50 rounded-lg p-8 text-center mb-8 border-2 border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            あなたのタイプを診断してみませんか？
          </h3>
          <p className="text-gray-700 mb-6">
            この性格タイプの特徴を読んで、自分に当てはまると感じましたか？実際に診断を受けて、あなた自身の性格タイプを確認してみましょう。
          </p>
          <Link
            href="/test"
            className={`inline-block ${colors.primary} text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all`}
          >
            診断を受ける
          </Link>
        </div>

        {/* 診断を受けるボタン */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block text-gray-600 hover:text-gray-900 transition-all"
          >
            トップページに戻る
          </Link>
        </div>
      </div>

      {/* フッター */}
      <footer className="bg-gray-900 text-white py-8 px-4 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400">
            運営: <a href="https://yumesuta.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline">ゆめスタ</a>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            ※ このアプリは公式MBTI®の代替ではなく、MBTI理論を参考にした性格診断です
          </p>
        </div>
      </footer>
    </div>
  );
}
