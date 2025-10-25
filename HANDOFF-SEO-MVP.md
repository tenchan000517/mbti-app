# SEO・LLMO最適化 & MVPデプロイ準備 引き継ぎドキュメント

**作成日**: 2025-10-25
**目的**: SEO・LLMO最適化の実装とMVPデプロイ準備
**プロジェクト**: MBTI診断アプリ (`C:/mbti-app/`)

---

## 🎯 このドキュメントの目的

1. **徹底的なSEO対策の実装**
2. **LLMO（Language Model Optimization）の導入**
3. **MVPデプロイ前の準備**（未実装機能のリンク・導線をコメントアウト）

---

## 📋 現在の状態

### 実装済み ✅
- トップページ (`app/page.tsx`)
- 診断ページ (`app/test/page.tsx`) - 30問の基本質問
- 結果ページ (`app/result/page.tsx`)
- タイプ詳細ページ (`app/types/[type]/page.tsx`)
- 全16タイプのデータと画像

### 未実装 ❌
- 詳細診断（追加20-30問）
- メール登録機能
- データ保存機能（Google Sheets連携）
- 詳細結果ページ

### コメントアウトが必要な箇所
以下のリンクや導線は**まだ機能が実装されていない**ため、MVPデプロイ前にコメントアウトする必要があります：

1. **結果ページ** (`app/result/page.tsx`)
   - 「詳細診断を見る」ボタン
   - メール登録モーダルへのリンク
   - データ保存機能への導線

---

## 🔍 SEO最適化タスク

### 1. メタデータの最適化

#### 必須メタタグ（全ページ共通）

```typescript
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'), // デプロイ先のURLに変更
  title: {
    default: 'MBTI性格診断アプリ | 科学的根拠に基づく無料診断',
    template: '%s | MBTI性格診断アプリ',
  },
  description: '科学的根拠に基づいた正確なMBTI性格診断を無料で提供。30問の質問で16タイプのいずれかを判定し、あなたの性格タイプを詳しく解説します。',
  keywords: [
    'MBTI',
    'MBTI診断',
    '性格診断',
    '無料診断',
    '16タイプ',
    '性格タイプ',
    '自己分析',
    '適職診断',
    'INTJ',
    'ENFP',
    'INFP',
    'ENTJ',
  ],
  authors: [{ name: 'ゆめスタ', url: 'https://yumesuta.com' }],
  creator: 'ゆめスタ',
  publisher: 'ゆめスタ',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://your-domain.com',
    siteName: 'MBTI性格診断アプリ',
    title: 'MBTI性格診断アプリ | 科学的根拠に基づく無料診断',
    description: '科学的根拠に基づいた正確なMBTI性格診断を無料で提供。30問の質問で16タイプのいずれかを判定します。',
    images: [
      {
        url: '/og-image.png', // OGP画像を作成して配置
        width: 1200,
        height: 630,
        alt: 'MBTI性格診断アプリ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MBTI性格診断アプリ | 科学的根拠に基づく無料診断',
    description: '科学的根拠に基づいた正確なMBTI性格診断を無料で提供',
    images: ['/og-image.png'],
    creator: '@your_twitter', // Twitterアカウントがあれば
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Google Search Consoleで取得
  },
};
```

#### ページ別メタデータ

**診断ページ** (`app/test/page.tsx`)
```typescript
export const metadata: Metadata = {
  title: 'MBTI診断テスト開始',
  description: '30問の質問に答えて、あなたのMBTI性格タイプを診断しましょう。科学的根拠に基づいた正確な判定を提供します。',
  openGraph: {
    title: 'MBTI診断テスト開始 | MBTI性格診断アプリ',
    description: '30問の質問に答えて、あなたのMBTI性格タイプを診断',
  },
};
```

**結果ページ** (`app/result/page.tsx`)
```typescript
// 動的メタデータの生成
export async function generateMetadata(): Promise<Metadata> {
  // URLパラメータからタイプを取得する場合
  return {
    title: 'あなたの診断結果',
    description: 'MBTI性格診断の結果を確認しましょう',
    robots: {
      index: false, // 結果ページは検索結果に表示しない
      follow: true,
    },
  };
}
```

**タイプ詳細ページ** (`app/types/[type]/page.tsx`)
```typescript
import { getTypeDescription } from '@/lib/type-descriptions';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const typeUpper = type.toUpperCase();
  const typeData = getTypeDescription(typeUpper as MBTIType);

  return {
    title: `${typeUpper}（${typeData.name}）の性格タイプ解説`,
    description: typeData.shortDescription,
    openGraph: {
      title: `${typeUpper}（${typeData.name}）| MBTI性格診断`,
      description: typeData.shortDescription,
      images: [
        {
          url: `/img/${typeData.name}.png`,
          width: 800,
          height: 800,
          alt: `${typeUpper} - ${typeData.name}`,
        },
      ],
    },
  };
}

// 静的生成用
export async function generateStaticParams() {
  const types = [
    'intj', 'intp', 'entj', 'entp',
    'infj', 'infp', 'enfj', 'enfp',
    'istj', 'isfj', 'estj', 'esfj',
    'istp', 'isfp', 'estp', 'esfp',
  ];

  return types.map((type) => ({
    type,
  }));
}
```

### 2. 構造化データ（JSON-LD）の追加

各ページに適切な構造化データを追加して、Googleの検索結果に豊富な情報を表示させます。

#### トップページ用（WebSite + Organization）

`app/page.tsx`に追加：

```typescript
export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://your-domain.com/#website',
        url: 'https://your-domain.com',
        name: 'MBTI性格診断アプリ',
        description: '科学的根拠に基づいた正確なMBTI性格診断',
        inLanguage: 'ja',
      },
      {
        '@type': 'Organization',
        '@id': 'https://your-domain.com/#organization',
        name: 'ゆめスタ',
        url: 'https://yumesuta.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://your-domain.com/logo.png',
        },
      },
      {
        '@type': 'WebApplication',
        name: 'MBTI性格診断アプリ',
        description: '科学的根拠に基づいた無料のMBTI性格診断ツール',
        applicationCategory: 'LifestyleApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'JPY',
        },
        operatingSystem: 'Any',
        browserRequirements: 'Requires JavaScript',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 既存のJSX */}
    </>
  );
}
```

#### タイプ詳細ページ用（Article）

`app/types/[type]/page.tsx`に追加：

```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: `${typeData.type}（${typeData.name}）の性格タイプ解説`,
  description: typeData.shortDescription,
  image: `https://your-domain.com/img/${typeData.name}.png`,
  author: {
    '@type': 'Organization',
    name: 'ゆめスタ',
  },
  publisher: {
    '@type': 'Organization',
    name: 'ゆめスタ',
    logo: {
      '@type': 'ImageObject',
      url: 'https://your-domain.com/logo.png',
    },
  },
  datePublished: '2025-10-25',
  dateModified: '2025-10-25',
};
```

### 3. サイトマップの生成

`app/sitemap.ts`を作成：

```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://your-domain.com';

  // 全16タイプのURL
  const types = [
    'intj', 'intp', 'entj', 'entp',
    'infj', 'infp', 'enfj', 'enfp',
    'istj', 'isfj', 'estj', 'esfj',
    'istp', 'isfp', 'estp', 'esfp',
  ];

  const typePages = types.map((type) => ({
    url: `${baseUrl}/types/${type}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/test`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...typePages,
  ];
}
```

### 4. robots.txtの設定

`app/robots.ts`を作成：

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/result', '/api/'],
    },
    sitemap: 'https://your-domain.com/sitemap.xml',
  };
}
```

---

## 🤖 LLMO（Language Model Optimization）の実装

### 1. LLMが理解しやすい構造化マークアップ

各タイプ詳細ページに、AIが理解しやすい構造を追加：

```tsx
{/* LLM最適化用の構造化コンテンツ */}
<article itemScope itemType="https://schema.org/Article">
  <header>
    <h1 itemProp="headline">
      {typeData.type}（{typeData.name}）の性格タイプ
    </h1>
    <meta itemProp="description" content={typeData.shortDescription} />
  </header>

  <section itemProp="articleBody">
    <h2>概要</h2>
    <p>{typeData.detailedDescription}</p>

    <h2>主な特徴</h2>
    <ul>
      {typeData.characteristics.map((char, index) => (
        <li key={index}>{char}</li>
      ))}
    </ul>

    <h2>強み</h2>
    <ul>
      {typeData.strengths.map((strength, index) => (
        <li key={index}>{strength}</li>
      ))}
    </ul>

    <h2>弱み</h2>
    <ul>
      {typeData.weaknesses.map((weakness, index) => (
        <li key={index}>{weakness}</li>
      ))}
    </ul>

    <h2>適職</h2>
    <ul>
      {typeData.careers.map((career, index) => (
        <li key={index}>{career}</li>
      ))}
    </ul>
  </section>
</article>
```

### 2. FAQ構造化データ

よくある質問をトップページまたは独立したFAQページに追加：

```typescript
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'MBTIとは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MBTI（Myers-Briggs Type Indicator）は、個々人が自然と行っている「ものの見方と判断の方法」など、外からは観察できない「認知スタイル」に焦点を当てた性格類型理論です。4つの指標（E/I, S/N, T/F, J/P）の組み合わせで16種類のタイプに分類されます。',
      },
    },
    {
      '@type': 'Question',
      name: 'この診断は無料ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい、完全に無料でご利用いただけます。30問の質問に答えるだけで、あなたのMBTI性格タイプを診断できます。',
      },
    },
    {
      '@type': 'Question',
      name: '診断にかかる時間はどのくらいですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '約5〜10分程度で完了します。30問の質問に直感的に答えていただくだけです。',
      },
    },
    {
      '@type': 'Question',
      name: '16タイプにはどのようなものがありますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'INTJ（建築家）、INTP（論理学者）、ENTJ（指揮官）、ENTP（討論者）、INFJ（提唱者）、INFP（仲介者）、ENFJ（主人公）、ENFP（運動家）、ISTJ（管理者）、ISFJ（擁護者）、ESTJ（幹部）、ESFJ（領事官）、ISTP（巨匠）、ISFP（冒険家）、ESTP（起業家）、ESFP（エンターテイナー）の16タイプがあります。',
      },
    },
  ],
};
```

### 3. パンくずリストの追加

`components/Breadcrumbs.tsx`を作成：

```typescript
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://your-domain.com${item.url}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="パンくずリスト" className="text-sm text-gray-600 mb-4">
        {items.map((item, index) => (
          <span key={index}>
            {index > 0 && ' > '}
            {index === items.length - 1 ? (
              <span>{item.name}</span>
            ) : (
              <a href={item.url} className="hover:underline">
                {item.name}
              </a>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
```

タイプ詳細ページで使用：

```tsx
<Breadcrumbs
  items={[
    { name: 'ホーム', url: '/' },
    { name: '16のタイプ', url: '/' },
    { name: `${typeData.type}（${typeData.name}）`, url: `/types/${type}` },
  ]}
/>
```

---

## 🚀 MVPデプロイ前の準備

### コメントアウトが必要な箇所

#### 1. 結果ページ (`app/result/page.tsx`)

```tsx
{/* MVP: 詳細診断機能は未実装のため、一旦コメントアウト
<div className="mt-8 text-center">
  <button
    onClick={() => setShowEmailModal(true)}
    className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all"
  >
    詳細診断を見る
  </button>
</div>
*/}

{/* MVP: メール登録モーダルは未実装のため、一旦コメントアウト
{showEmailModal && (
  <EmailModal
    onClose={() => setShowEmailModal(false)}
    onSubmit={handleEmailSubmit}
  />
)}
*/}
```

#### 2. 環境変数の設定

`.env.local.example`を作成：

```
# Google Analytics (デプロイ後に設定)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# サイトURL（本番環境）
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Google Sheets API (フェーズ2で実装予定)
# GOOGLE_CREDENTIALS=
# SHEET_ID=
```

### デプロイ前チェックリスト

- [ ] 全ページのメタデータを確認
- [ ] OGP画像（1200x630px）を作成して`public/og-image.png`に配置
- [ ] ロゴ画像を`public/logo.png`に配置
- [ ] サイトマップが正しく生成されることを確認（`/sitemap.xml`）
- [ ] robots.txtが正しく生成されることを確認（`/robots.txt`）
- [ ] 未実装機能へのリンクをコメントアウト
- [ ] モバイル表示の確認
- [ ] ページ読み込み速度の確認
- [ ] 全16タイプの画像が正しく表示されることを確認
- [ ] 診断フローが正常に動作することを確認
- [ ] Google Search Consoleの設定準備
- [ ] Google Analyticsの設定準備

---

## 📊 デプロイ後のSEO施策

### 1. Google Search Console設定
1. サイトを登録
2. サイトマップを送信（`https://your-domain.com/sitemap.xml`）
3. インデックス登録をリクエスト

### 2. Google Analytics設定
1. GA4プロパティを作成
2. 測定IDを`.env.local`に設定
3. `app/layout.tsx`にGoogleアナリティクスのスクリプトを追加

### 3. コンテンツ最適化
- 各タイプページに関連タイプへのリンクを追加
- 内部リンクの最適化
- ブログ記事の追加（各タイプの詳細解説など）

---

## 🎯 次のフェーズで実装予定

1. **詳細診断機能**（追加20-30問）
2. **メール登録機能**
3. **データ保存機能**（Google Sheets API）
4. **ユーザー認証**
5. **診断履歴管理**
6. **SNSシェア機能**

---

**次のセッションでは、上記のSEO・LLMO施策を実装し、MVPデプロイの準備を完了してください。**
