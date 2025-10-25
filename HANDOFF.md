# MBTI診断アプリ 引き継ぎドキュメント

**更新日**: 2025-10-25
**プロジェクト**: MBTI性格診断Webアプリケーション
**場所**: `C:/mbti-app/`
**技術スタック**: Next.js 15, TypeScript, Tailwind CSS

---

## 🎯 プロジェクト概要

科学的に正確なMBTI性格診断を提供するWebアプリケーション。4つの指標（E/I, S/N, T/F, J/P）の組み合わせで16種類の性格タイプを判定します。

### デザイン方針
- Progate風のクリーンなデザイン
- グラデーション禁止（単色のみ）
- 絵文字禁止
- 完全レスポンシブ対応

---

## ✅ 完了済み機能

### 1. フロントエンド実装 ✅
- **トップページ** (`app/page.tsx`)
  - Hero Section
  - MBTIとは説明
  - 診断の特徴（4カード）
  - 4つの要素説明（縦並びレイアウト）
  - 16タイプ一覧
  - CTAセクション（オレンジ色）
  - フッター（gray-50背景）

- **診断ページ** (`app/test/page.tsx`)
  - 30問の基本質問
  - プログレスバー
  - 5段階評価

- **結果ページ** (`app/result/page.tsx`)
  - タイプ表示
  - スコアバー
  - 詳細説明

- **タイプ詳細ページ** (`app/types/[type]/page.tsx`)
  - 動的ルーティング
  - 詳細セクション表示

### 2. データ構造 ✅
- **型定義** (`types/index.ts`)
  - `MBTIType`, `Question`, `Answer`, `TypeDescription`
  - `DetailedSection`, `Quote` 追加済み

- **質問データ** (`lib/questions.ts`)
  - 30問の基本質問（E/I: 8問, S/N: 8問, T/F: 7問, J/P: 7問）

- **タイプ説明** (`lib/type-descriptions.ts`)
  - **全16タイプ完成 ✅**
  - 各タイプに `detailedSections` (4セクション) を実装済み
  - `detailedDescription` は「〇〇タイプは」形式で統一
  - ENFPは「運動家」（「広報運動家」ではない）

- **判定ロジック** (`lib/mbti-calculator.ts`)
  - スコア計算
  - タイプ判定

### 3. UI/UXコンポーネント ✅
- カラーシステム (`lib/type-colors.ts`)
  - NT系: 青 (Indigo)
  - NF系: 緑 (Emerald)
  - SJ系: 紫 (Purple)
  - SP系: オレンジ (Orange)

- 画像システム (`lib/type-images.ts`)
  - 各タイプの画像パス定義

---

## 📚 関連ドキュメント

- **HANDOFF-SEO-MVP.md**: SEO・LLMO最適化とMVPデプロイ準備の詳細ドキュメント

---

## 🔥 次にやること（最優先）

### フェーズ1: SEO・LLMO最適化とMVPデプロイ準備

**詳細は `HANDOFF-SEO-MVP.md` を参照してください。**

主なタスク：
1. 徹底的なSEO対策の実装
2. LLMO（Language Model Optimization）の導入
3. 未実装機能のリンク・導線をコメントアウト
4. MVPとしてデプロイ

### フェーズ2: データ保存機能の実装

**目的**: ユーザーの診断結果をGoogleスプレッドシートに保存

#### 実装タスク

1. **Google Sheets API設定**
   - Google Cloud Platformでプロジェクト作成
   - Google Sheets APIを有効化
   - サービスアカウント作成
   - 認証情報（JSONキー）をダウンロード
   - `.env.local`に環境変数設定

2. **バックエンドAPI作成**
   - `app/api/save-result/route.ts` を作成
   - Google Sheets APIライブラリをインストール: `npm install googleapis`
   - 保存するデータ:
     - タイムスタンプ
     - メールアドレス（任意）
     - MBTIタイプ
     - 各次元のスコア (E, I, S, N, T, F, J, P)
     - 回答データ（JSON形式）

3. **フロントエンド統合**
   - 結果ページに「結果を保存」ボタン追加
   - メールアドレス入力フォーム（任意）
   - 保存成功/失敗のフィードバック

#### 参考実装例

```typescript
// app/api/save-result/route.ts
import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request: Request) {
  try {
    const { email, mbtiType, scores, answers } = await request.json();

    // Google Sheets認証
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS || '{}'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // データを追加
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_ID,
      range: 'Sheet1!A:Z',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          new Date().toISOString(),
          email || '',
          mbtiType,
          scores.E,
          scores.I,
          scores.S,
          scores.N,
          scores.T,
          scores.F,
          scores.J,
          scores.P,
          JSON.stringify(answers),
        ]],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
```

---

## 📁 プロジェクト構成

```
mbti-app/
├── app/
│   ├── page.tsx              # トップページ
│   ├── test/page.tsx         # 診断ページ
│   ├── result/page.tsx       # 結果ページ
│   ├── types/[type]/page.tsx # タイプ詳細ページ
│   └── api/                  # （未実装）
│       └── save-result/route.ts
├── lib/
│   ├── questions.ts          # 質問データ
│   ├── type-descriptions.ts  # 全16タイプ説明（完成）
│   ├── mbti-calculator.ts    # 判定ロジック
│   ├── type-colors.ts        # カラー定義
│   └── type-images.ts        # 画像パス
├── types/
│   └── index.ts              # TypeScript型定義
└── public/
    └── images/types/         # タイプ画像（16枚）
```

---

## 🎨 デザインガイドライン

### カラーパレット

**タイプグループ別:**
- NT系（分析家）: Indigo (`bg-indigo-500`, `text-indigo-600`)
- NF系（外交官）: Emerald (`bg-emerald-500`, `text-emerald-600`)
- SJ系（番人）: Purple (`bg-purple-500`, `text-purple-600`)
- SP系（探検家）: Orange (`bg-orange-500`, `text-orange-600`)

**共通カラー:**
- メイン背景: `bg-gray-50`
- カード背景: `bg-white`
- テキスト: `text-gray-900`, `text-gray-700`
- CTAボタン: `bg-orange-400`（優しいオレンジ）

### 重要なUI原則
- 絵文字は使用しない
- グラデーションは使用しない
- 単色のみ使用
- 大きめのボタン
- 明確な階層構造

---

## ⚠️ 注意事項

1. **MBTI理論の正確性**
   - 憶測や予測での質問・判定は禁止
   - 科学的根拠に基づいた情報のみ使用

2. **文体の統一**
   - `detailedDescription`: 「〇〇タイプは」形式（客観的）
   - `communicationStyle`, `careerPath`, `selfGrowth`: 「あなたは」形式（診断結果用）

3. **環境変数**
   - `.env.local`を作成して以下を設定:
     ```
     GOOGLE_CREDENTIALS={"type":"service_account",...}
     SHEET_ID=your-spreadsheet-id
     ```

---

## 🚀 開発開始手順

```bash
# 依存関係インストール
npm install

# Google Sheets API用ライブラリ追加
npm install googleapis

# 開発サーバー起動
npm run dev
```

---

## 📝 今後の拡張案

- 詳細診断（追加20-30問）
- 相性診断機能
- タイプ別キャリアガイド
- ユーザー認証
- 診断履歴管理
- SNSシェア機能

---

**次のセッションでは、Google Sheets APIを使ったデータ保存機能の実装から始めてください。**
