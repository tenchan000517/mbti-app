'use client';

import { MessageCircle, Sparkles } from 'lucide-react';

// OAuth flow 起動 URL（Linked OA で @097clpaf 紐付け済 + bot_prompt=aggressive で
// LINE ログイン画面に「公式アカウントを友だちに追加」チェックボックスが自動表示される）
const LINE_LOGIN_AUTHORIZE_URL = '/api/auth/line';

type Variant = 'prominent' | 'compact';

interface Props {
  /** GA4 cta_location dimension（result-page / mypage / mypage-history 等）*/
  ctaLocation?: string;
  /** 結果保存対象の MBTI 型 */
  mbtiType?: string;
  /** "prominent": 大きく目立つ（結果ページ直下用）/ "compact": 既存サイズ（その他）*/
  variant?: Variant;
  /** 注釈表示の有無 */
  showDisclaimer?: boolean;
}

/**
 * MBTI 診断結果保存機能 CTA（mbti-app 専用・既存 ArticleCTAStudentLineResident と独立計測）。
 *
 * 専務依頼 2026-05-19T085800Z「MBTI 診断結果保存機能 UI 実装」+ マーケ部 cc 090003Z 文言確定 +
 * マーケ部 ack 090621Z で別 component 実装判断同意済。
 *
 * 漆畑さん 2026-05-19 追加指示：
 * - 結果ページでは「イの一番に」「少し大きく」配置
 * - 文言「LINE 公式に友達追加していただくと結果を保存でき、マイページからいつでもご覧になっていただけます」
 *
 * 計測: mbti_save_cta_click（既存 line_cta_click と独立）+ mbti_type + variant dimension
 */
export default function MbtiSaveCTA({
  ctaLocation = 'result-page',
  mbtiType,
  variant = 'compact',
  showDisclaimer = true,
}: Props = {}) {
  const handleClick = () => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'mbti_save_cta_click', {
        event_category: 'MBTI Save',
        cta_location: ctaLocation,
        cta_variant: variant,
        mbti_type: mbtiType || 'unspecified',
      });
    }
  };

  if (variant === 'prominent') {
    return (
      <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl p-6 md:p-8 shadow-xl mb-8 text-white">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="w-6 h-6" />
          <p className="text-sm md:text-base font-semibold uppercase tracking-wider opacity-90">
            結果を保存しよう
          </p>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-3 text-center">
          友達追加で結果を保存
        </h3>
        <p className="text-base md:text-lg mb-6 text-center leading-relaxed opacity-95">
          LINE 公式に友達追加していただくと結果を保存でき、
          <br className="hidden sm:block" />
          マイページからいつでもご覧になっていただけます。
        </p>
        <div className="flex justify-center mb-3">
          <a
            href={LINE_LOGIN_AUTHORIZE_URL}
            onClick={handleClick}
            className="inline-flex items-center justify-center gap-2 px-8 md:px-10 py-4 md:py-5 bg-white text-emerald-700 hover:bg-emerald-50 font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            <MessageCircle className="w-6 h-6" />
            友達追加で結果を保存
          </a>
        </div>
        <p className="text-xs md:text-sm text-center mt-3 opacity-90">
          他社診断は結果保存に課金が必要な場合がありますが、ゆめスタは LINE 友達追加だけで保存できます。
        </p>
        {showDisclaimer && (
          <p className="text-xs text-center mt-3 opacity-75">
            ※ 予告なくサービス（保存）を終了する場合があります。
          </p>
        )}
      </div>
    );
  }

  // variant === 'compact'
  return (
    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 md:p-8 shadow-md mb-6">
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 text-center">
        友達追加で結果を保存
      </h3>
      <p className="text-sm md:text-base text-gray-700 mb-4 text-center leading-relaxed">
        LINE 公式に友達追加していただくと結果を保存でき、
        <br className="hidden sm:block" />
        マイページからいつでもご覧になっていただけます。
      </p>
      <div className="flex justify-center mb-3">
        <a
          href={LINE_LOGIN_AUTHORIZE_URL}
          onClick={handleClick}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#06C755] hover:bg-[#05B048] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          <MessageCircle className="w-5 h-5" />
          友達追加で結果を保存
        </a>
      </div>
      <p className="text-xs text-gray-600 text-center mb-3">
        他社診断は結果保存に課金が必要な場合がありますが、ゆめスタは LINE 友達追加だけで保存できます。
      </p>
      {showDisclaimer && (
        <p className="text-xs text-gray-500 text-center mt-2">
          ※ 予告なくサービス（保存）を終了する場合があります。
        </p>
      )}
    </div>
  );
}
