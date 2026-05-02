/**
 * 適職タグ → 業界スラッグのマッピング
 * career-guide の業界ページへ誘導するためのデータ
 */

export interface IndustryMeta {
  slug: string
  label: string
  image: string
  href: string
  available: boolean
}

/** 業界メタデータ */
const industries: Record<string, IndustryMeta> = {
  manufacturing: {
    slug: 'manufacturing',
    label: '製造業',
    image: 'https://assets.yumesuta.com/career-guide/manufacturing.png',
    href: 'https://yumesuta.com/career-guide/industries/manufacturing',
    available: true,
  },
  construction: {
    slug: 'construction',
    label: '建設業',
    image: 'https://assets.yumesuta.com/career-guide/construction.png',
    href: 'https://yumesuta.com/career-guide/industries/construction',
    available: true,
  },
  it: {
    slug: 'it',
    label: 'IT・情報',
    image: 'https://assets.yumesuta.com/career-guide/it.png',
    href: 'https://yumesuta.com/career-guide/industries/it',
    available: true,
  },
  retail: {
    slug: 'retail',
    label: 'サービス・小売',
    image: 'https://assets.yumesuta.com/career-guide/retail.png',
    href: 'https://yumesuta.com/career-guide/industries/retail',
    available: true,
  },
  medical: {
    slug: 'medical',
    label: '医療・福祉',
    image: 'https://assets.yumesuta.com/career-guide/medical.png',
    href: 'https://yumesuta.com/career-guide/industries/medical',
    available: true,
  },
  beauty: {
    slug: 'beauty',
    label: '美容・クリエイティブ',
    image: 'https://assets.yumesuta.com/career-guide/beauty.png',
    href: 'https://yumesuta.com/career-guide/industries/beauty',
    available: true,
  },
}

/** 適職タグ → 業界スラッグ（複数可） */
const careerToIndustry: Record<string, string[]> = {
  エンジニア: ['manufacturing'],
  研究者: ['manufacturing'],
  職人: ['manufacturing', 'construction'],
  整備士: ['manufacturing'],
  建築家: ['construction'],
  プロジェクトマネージャー: ['construction'],
  看護師: ['medical'],
  カウンセラー: ['medical'],
  社会福祉士: ['medical'],
  ソーシャルワーカー: ['medical'],
  営業: ['retail'],
  マーケター: ['retail'],
  デザイナー: ['it', 'beauty'],
  プログラマー: ['it'],
  データサイエンティスト: ['it'],
  データアナリスト: ['it'],
  アナリスト: ['it'],
  美容師: ['beauty'],
  アーティスト: ['beauty'],
  写真家: ['beauty'],
  音楽家: ['beauty'],
  クリエイター: ['beauty', 'it'],
}

export interface IndustryLink extends IndustryMeta {
  matchedCareers: string[]
}

/**
 * 適職リストから、マッチする公開済み業界カードを返す。
 * 常にフォールバックとして業界一覧ハブを末尾に追加する。
 */
export function getIndustryLinks(careers: string[]): IndustryLink[] {
  const matched = new Map<string, string[]>()

  for (const career of careers) {
    const slugs = careerToIndustry[career]
    if (!slugs) continue
    for (const slug of slugs) {
      const existing = matched.get(slug) || []
      if (!existing.includes(career)) {
        existing.push(career)
      }
      matched.set(slug, existing)
    }
  }

  const links: IndustryLink[] = []
  for (const [slug, matchedCareers] of matched) {
    const meta = industries[slug]
    if (meta && meta.available) {
      links.push({ ...meta, matchedCareers })
    }
  }

  return links
}

/** 業界一覧ハブURL */
export const CAREER_GUIDE_HUB = 'https://yumesuta.com/career-guide'
