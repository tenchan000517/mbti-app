'use client';

import { MessageCircle } from 'lucide-react';

// OAuth flow 起動 URL（Linked OA で @097clpaf 紐付け済 + bot_prompt=aggressive で
// LINE ログイン画面に「公式アカウントを友だちに追加」チェックボックスが自動表示される）
const LINE_LOGIN_AUTHORIZE_URL = '/api/auth/line';

interface Props {
  /** GA4 cta_location dimension（result-page / mypage / mypage-history 等）*/
  ctaLocation?: string;
  /** 結果保存対象の MBTI 型 */
  mbtiType?: string;
  /** 注釈表示の有無（マイページ側で再掲時 false にしないなら true 固定で OK）*/
  showDisclaimer?: boolean;
}

/**
 * MBTI 診断結果保存機能 CTA（mbti-app 専用・既存 ArticleCTAStudentLineResident と独立計測）。
 *
 * 専務依頼 2026-05-19T085800Z「MBTI 診断結果保存機能 UI 実装」+ マーケ部 cc 090003Z 文言確定 +
 * マーケ部 ack 090621Z で別 component 実装判断同意済。
 *
 * 主 CTA: LINE 友達追加で結果保存（→ LINE Login OAuth 後に Brevo Custom Attribute へ永続化）
 * 計測: mbti_save_cta_click（既存 line_cta_click と独立）+ mbti_type dimension
 */
export default function MbtiSaveCTA({
  ctaLocation = 'result-page',
  mbtiType,
  showDisclaimer = true,
}: Props = {}) {
  const handleClick = () => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'mbti_save_cta_click', {
        event_category: 'MBTI Save',
        cta_location: ctaLocation,
        mbti_type: mbtiType || 'unspecified',
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 md:p-8 shadow-md mb-6">
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 text-center">
        友達追加で結果を保存
      </h3>
      <p className="text-sm md:text-base text-gray-700 mb-4 text-center leading-relaxed">
        LINE 友達追加で診断結果を保存。再受験時にあなたの変化を比較できます。
        <br className="hidden sm:block" />
        完全無料・登録は LINE のみ。
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
