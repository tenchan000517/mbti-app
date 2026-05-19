'use client'

import Link from 'next/link'
import { MessageCircle, Bookmark, ExternalLink, Sparkles, RotateCcw, Compass } from 'lucide-react'

const LINE_OA_URL = 'https://lin.ee/SIdAyY4'
const LINE_LOGIN_URL = '/api/auth/line'
const CAREER_GUIDE_URL = 'https://yumesuta.com/career-guide'
const TEST_URL = '/test'
const MYPAGE_URL = '/mypage'

type Context = 'top' | 'result' | 'mypage'

interface Props {
  /** GA4 cta_location dimension の position 補助 */
  ctaLocation?: string
  /** MBTI 型を渡せば計測 dimension に乗る（result/types page で使用想定）*/
  mbtiType?: string
  /**
   * 表示文脈：
   * - 'top' (default): TOP/直接アクセス = 「あなたも診断してみませんか？」訴求
   * - 'result': 結果ページ直後 = 「結果を保存しよう」訴求（MbtiSaveCTA とは別役割）
   * - 'mypage': マイページ経由（ログイン済前提）= 再診断 / 他タイプ / キャリア探索訴求
   */
  context?: Context
}

/**
 * 出口 B: 学生・若者（MBTI 経由）→ LINE 公式（学生属性）+ 常駐
 *
 * マーケ部依頼 2026-05-19 §2-5（mbti.yumesuta.com の CTA → ArticleCTAStudentLineResident）
 * yumesutaHP の同名コンポーネントを mbti-app 文脈に合わせて移植。
 *
 * 漆畑さん 2026-05-19 追加指示：types/[type] を見ている人を 3 文脈で出し分け
 * - TOP/直接アクセス: 診断していない or 興味本位 → 診断 CTA 強化
 * - result 経由: 診断直後 → MbtiSaveCTA で保存訴求済なので副 CTA で常駐動線
 * - mypage 経由: ログイン済 + 保存済 → 再診断 / 他タイプ / キャリア探索
 *
 * 計測パターンは既存 result/basic の line_cta_click を踏襲（inline gtag）。
 * cta_location dimension は variant 名 + position prefix で区別。
 */
export default function ArticleCTAStudentLineResident({
  ctaLocation,
  mbtiType,
  context = 'top',
}: Props = {}) {
  const variant = 'student-line-resident'
  const lineLocation = ctaLocation ? `${variant}-${ctaLocation}` : variant

  const trackLineClick = () => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'line_cta_click', {
        event_category: 'LINE CTA',
        cta_variant: variant,
        cta_location: lineLocation,
        cta_context: context,
        mbti_type: mbtiType || 'unspecified',
      })
    }
  }

  const trackGenericClick = (destination: string) => () => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'cta_click', {
        event_category: 'CTA',
        cta_variant: variant,
        cta_location: `${variant}-${destination}`,
        cta_context: context,
        cta_destination: destination,
        mbti_type: mbtiType || 'unspecified',
      })
    }
  }

  // 文脈 3: マイページ経由（ログイン済前提）→ 再診断 / 他タイプ / キャリア探索
  if (context === 'mypage') {
    return (
      <div className="space-y-6 py-8">
        <div className="bg-blue-50 rounded-2xl p-6 md:p-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Compass className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg md:text-xl font-bold text-gray-900">
              次のステップへ
            </h3>
          </div>
          <p className="text-sm md:text-base text-gray-700 mb-5">
            性格タイプを知った今、自分の進路や強みを活かせる仕事を一緒に探してみませんか？
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={TEST_URL}
              onClick={trackGenericClick('retest')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-bold rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              もう一度診断する
            </Link>
            <Link
              href={CAREER_GUIDE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackGenericClick('career-guide')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow transition-colors"
            >
              キャリア探索ガイドへ
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // 文脈 2: 結果ページ経由（診断直後）→ 既に MbtiSaveCTA で保存訴求済 = 副 CTA で常駐動線のみ
  if (context === 'result') {
    return (
      <div className="space-y-6 py-8">
        <div className="bg-blue-50 rounded-2xl p-6 md:p-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Bookmark className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg md:text-xl font-bold text-gray-900">
              このページをブックマークしておこう
            </h3>
          </div>
          <p className="text-sm md:text-base text-gray-700 mb-5">
            進路に迷ったらいつでも戻ってこられるよう、ホーム画面に追加 or ブックマークしておくと便利です。
          </p>
          <Link
            href={CAREER_GUIDE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackGenericClick('career-guide')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-blue-500 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors"
          >
            キャリア探索ガイドを見る
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  // 文脈 1（default）: TOP/直接アクセス → 診断 + LINE 公式 + 常駐
  return (
    <div className="space-y-6 py-8">
      {/* 主 CTA: あなたも診断してみませんか？ */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 md:p-8 text-center text-white shadow-xl">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="w-6 h-6" />
          <p className="text-sm md:text-base font-semibold uppercase tracking-wider opacity-90">
            まずは診断
          </p>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-3">
          あなたも MBTI 診断してみませんか？
        </h3>
        <p className="text-base md:text-lg mb-6 opacity-95">
          30 問の質問に答えるだけで、あなたの性格タイプ + 適職 + 相性が分かります。
          <br className="hidden sm:block" />
          完全無料・約 5〜10 分で完了。
        </p>
        <Link
          href={TEST_URL}
          onClick={trackGenericClick('start-test')}
          className="inline-flex items-center justify-center gap-2 px-8 md:px-10 py-4 md:py-5 bg-white text-blue-700 hover:bg-blue-50 font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          診断をはじめる
        </Link>
      </div>

      {/* 副 CTA: LINE 公式（学生属性）→ ログイン済なら自動的に保存される */}
      <div className="bg-emerald-50 rounded-2xl p-6 md:p-8 text-center">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
          診断後の進路情報を LINE で受け取る
        </h3>
        <p className="text-sm md:text-base text-gray-700 mb-5">
          診断結果と相性のいい仕事・先輩のリアルな声・就活のヒントを LINE でゆるく届けます。
          <br className="hidden sm:block" />
          診断後にログインすれば結果がマイページに保存されます。
        </p>
        <a
          href={LINE_LOGIN_URL}
          onClick={trackLineClick}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#06C755] hover:bg-[#05B048] text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          <MessageCircle className="w-5 h-5" />
          LINE で友だち追加 + ログイン
        </a>
      </div>

      {/* 副 CTA: ブックマーク誘導 + キャリア探索 */}
      <div className="bg-blue-50 rounded-2xl p-6 md:p-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Bookmark className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg md:text-xl font-bold text-gray-900">
            キャリア探索を進める
          </h3>
        </div>
        <p className="text-sm md:text-base text-gray-700 mb-5">
          MBTI と相性のいい業界や職種を、もっと深掘りしてみましょう。
        </p>
        <Link
          href={CAREER_GUIDE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackGenericClick('career-guide')}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-blue-500 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors"
        >
          キャリア探索ガイドを見る
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}

// LINE_OA_URL は将来用に残す（friend-only flow が必要になったとき）
export { LINE_OA_URL, MYPAGE_URL }
