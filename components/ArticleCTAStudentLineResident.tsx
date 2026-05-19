'use client'

import Link from 'next/link'
import { MessageCircle, Bookmark, ExternalLink } from 'lucide-react'

const LINE_OA_URL = 'https://lin.ee/SIdAyY4'
const CAREER_GUIDE_URL = 'https://yumesuta.com/career-guide'

interface Props {
  /** GA4 cta_location dimension の position 補助 */
  ctaLocation?: string
  /** MBTI 型を渡せば計測 dimension に乗る（result/types page で使用想定）*/
  mbtiType?: string
}

/**
 * 出口 B: 学生・若者（MBTI 経由）→ LINE 公式（学生属性）+ 常駐
 *
 * マーケ部依頼 2026-05-19 §2-5（mbti.yumesuta.com の CTA → ArticleCTAStudentLineResident）
 * yumesutaHP の同名コンポーネントを mbti-app 文脈に合わせて移植。
 *
 * 主 CTA: LINE 公式（学生属性で登録）
 * 副 CTA: キャリア探索ガイド常駐動線（ブックマーク誘導）
 *
 * 計測パターンは既存 result/basic の line_cta_click を踏襲（inline gtag）。
 * cta_location dimension は variant 名 + position prefix で区別。
 */
export default function ArticleCTAStudentLineResident({ ctaLocation, mbtiType }: Props = {}) {
  const variant = 'student-line-resident'
  const lineLocation = ctaLocation ? `${variant}-${ctaLocation}` : variant

  const handleLineClick = () => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'line_cta_click', {
        event_category: 'LINE CTA',
        cta_variant: variant,
        cta_location: lineLocation,
        mbti_type: mbtiType || 'unspecified',
      })
    }
  }

  const handleCareerGuideClick = () => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'cta_click', {
        event_category: 'CTA',
        cta_variant: variant,
        cta_location: `${variant}-career-guide`,
        cta_destination: 'career-guide',
        mbti_type: mbtiType || 'unspecified',
      })
    }
  }

  return (
    <div className="space-y-6 py-8">
      {/* 主 CTA: LINE 公式（学生属性） */}
      <div className="bg-emerald-50 rounded-2xl p-6 md:p-8 text-center">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
          進路の最新情報を LINE で受け取る
        </h3>
        <p className="text-sm md:text-base text-gray-700 mb-5">
          MBTI と相性のいい仕事・先輩のリアルな声・就活のヒントを、LINE でゆるく届けます。
        </p>
        <a
          href={LINE_OA_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleLineClick}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          <MessageCircle className="w-5 h-5" />
          LINE で友だち追加
        </a>
      </div>

      {/* 副 CTA: 常駐動線（ブックマーク誘導 + キャリア探索） */}
      <div className="bg-blue-50 rounded-2xl p-6 md:p-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Bookmark className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg md:text-xl font-bold text-gray-900">
            このページをブックマークしておこう
          </h3>
        </div>
        <p className="text-sm md:text-base text-gray-700 mb-5">
          進路に迷ったらいつでも戻ってこられるよう、ホーム画面に追加 or ブックマークしておくと便利。
        </p>
        <Link
          href={CAREER_GUIDE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleCareerGuideClick}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-blue-500 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors"
        >
          キャリア探索ガイドを見る
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
