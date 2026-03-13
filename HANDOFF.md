# MBTI診断アプリ 引き継ぎドキュメント

**最終更新**: 2026-03-13
**URL**: https://mbti.yumesuta.com
**リポジトリ**: `/mnt/c/mbti-app`
**技術スタック**: Next.js 16.1.6 / React 19 / TypeScript / Tailwind 4
**デプロイ**: Vercel（`npx vercel --prod`）
**運営**: 株式会社ゆめスタ

---

## プロジェクト概要

MBTI性格診断Webアプリ。30問の質問で16タイプを判定し、適職・キャリアパスを提示。
診断結果からyumesuta.com（本体HP）のキャリア探索ガイドへ誘導する導線を持つ。

---

## 現在の構成

### ページ構造
```
/                           ← トップ（Hero + 説明 + 16タイプ一覧）
/test                       ← 診断（30問、5段階評価）
/result/basic               ← 結果（スコア + 適職 + キャリア探索セクション）
/types/[type]               ← 16タイプ詳細ページ（SSG）
/blog                       ← ブログ一覧
/blog/[category]/[slug]     ← ブログ記事（80記事、7カテゴリ）
```

### ブログカテゴリ（80記事）
| カテゴリ | 内容 |
|---------|------|
| basics | MBTI基礎知識 |
| career | 16タイプ別適職 |
| corporate | 企業向け活用法 |
| growth | 強みの活かし方 |
| job-hunting | 自己分析・面接・企業選び |
| relationships | 人間関係 |
| trends | トレンド |

### 主要ファイル
| ファイル | 役割 |
|---------|------|
| `lib/type-descriptions.ts` | 全16タイプのデータ（careers配列が重要） |
| `lib/type-colors.ts` | 4気質グループ別カラー |
| `lib/type-images.ts` | タイプ別キャラクター画像パス |
| `lib/career-industry-mapping.ts` | **適職→業界マッピング + available制御** |
| `components/CareerExploreSection.tsx` | 結果・タイプページの「キャリア探索」セクション |
| `components/CareerSidebar.tsx` | 右固定サイドバー + モバイル下部バー |
| `components/CareerFloatingCTA.tsx` | デスクトップ固定CTA |
| `components/Header.tsx` | 若者向け最適化済みナビ |

---

## career-guide 統合（2026-03-13 実装済み）

### 仕組み

`CareerExploreSection` は MBTI結果の適職タグ配列を受け取り、`getIndustryLinks()` で業界マッピングを実行。`available: true` の業界だけカード表示する。

```
MBTI結果「適職: エンジニア」
  ↓ career-industry-mapping.ts
  エンジニア → manufacturing (available: true) → カード表示
  ↓
  業界カードをクリック → yumesuta.com/career-guide/industries/manufacturing
```

### 現在の available 状態

| 業界 | スラッグ | available | yumesutaHP側の状態 |
|------|---------|-----------|------------------|
| 製造業 | manufacturing | **true** | 公開済み |
| 建設業 | construction | **true** | 公開済み |
| IT・情報 | it | false | 未作成 |
| 医療・福祉 | medical | false | 未作成 |
| 美容・クリエイティブ | beauty | false | 未作成 |
| サービス・小売 | retail | false | 未作成 |

### 空振り状況（16タイプ中9タイプが業界カード0枚）

ENTP, INFJ, INFP, ENFJ, ENFP, ISFJ, ESFJ, ISFP, ESTP, ESFP

詳細マッピング: yumesutaHP側の `docs/PLAN-MBTI-career-content-needs.md` に全16タイプ×業界×職種の網羅テーブルあり。

---

## yumesutaHP側コンテンツ完成時にやること

### 業界ガイドが完成した場合

**対象ファイル**: `lib/career-industry-mapping.ts`

1. 該当業界の `available: false` → `true` に変更
2. `image` に yumesuta.com の画像URLを設定:
   ```typescript
   it: {
     slug: 'it',
     label: 'IT・情報',
     image: 'https://yumesuta.com/img/career-guide/it.png',  // ← 画像URL
     href: 'https://yumesuta.com/career-guide/industries/it',
     available: true,  // ← これを true に
   },
   ```
3. デプロイ: `npx vercel --prod`

### 職種ガイドが完成した場合

**対象ファイル**: `lib/career-industry-mapping.ts` に `careerToJob` マッピングを追加

```typescript
// 追加するマッピング
const careerToJob: Record<string, string> = {
  エンジニア: 'engineer',
  営業: 'sales',
  デザイナー: 'designer',
  // ...
}

export function getJobLink(career: string): string | null {
  const slug = careerToJob[career]
  return slug ? `https://yumesuta.com/career-guide/jobs/${slug}` : null
}
```

**対象ファイル**: 結果ページ + タイプページの適職タグをリンク化
- `app/result/basic/page.tsx` の適職 `<span>` → `<a>` に変更
- `app/types/[type]/page.tsx` も同様
- または `CareerExploreSection` 内で職種リンクセクションを追加

### 両方のチェックリスト

- [ ] `lib/career-industry-mapping.ts` の available/image 更新
- [ ] 適職タグのリンク化（職種ガイド完成後）
- [ ] `npx vercel --prod` でデプロイ
- [ ] 全16タイプで業界カードが正しく表示されるか確認
- [ ] リンク先が yumesuta.com の正しいページを開くか確認

---

## ヘッダー構成

### メインナビ（若者向け最適化済み、中央揃え）
| 項目 | リンク先 | 種別 |
|------|---------|------|
| MBTI診断 | `/` | 内部（オレンジハイライト） |
| キャリア探索 | yumesuta.com/career-guide | 外部 |
| ゆめマガ | yumesuta.com/yumemaga | 外部 |
| STAR紹介 | yumesuta.com/stars | 外部 |

### MBTIサブナビ
MBTIとは / 診断の特徴 / タイプ一覧 / 記事 / 診断する

---

## デザインルール

- 絵文字禁止
- グラデーション禁止（CTAボタンのエメラルドグラデーションは例外）
- 単色ベース
- タイプ別カラー: `lib/type-colors.ts` の `typeHexColors` 参照
- 4気質グループ: NT=紫, NF=緑, SJ=青, SP=オレンジ

---

## 開発コマンド

```bash
npm run dev          # 開発サーバー
npm run build        # 本番ビルド
npx tsc --noEmit     # 型チェック（ビルドなし）
npx vercel --prod    # 本番デプロイ
```

---

## 関連プロジェクト

| プロジェクト | 場所 | 関係 |
|-------------|------|------|
| yumesutaHP | `/mnt/c/yumesutahp` | 本体HP。career-guideのコンテンツはここで制作 |
| yumesutaHP HANDOFF | `docs/HANDOFF.md` Cシリーズ | career-guide全体の計画・進捗管理 |
| コンテンツ需要リスト | `docs/PLAN-MBTI-career-content-needs.md` | 全16タイプ×業界×職種のカバー率・優先度 |
