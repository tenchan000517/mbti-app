# デプロイ手順書

**サイトURL**: https://mbti.yumesuta.com

---

## 1. 事前準備 ✅

### 必要なファイルの確認
- [x] `public/og-image.png` (1200x630px) - OGP画像
- [x] `public/logo.png` - ロゴ画像
- [x] 全16タイプの画像 (`public/img/`)

---

## 2. Google Analytics 4 (GA4) の設定

### 手順

1. **Google Analytics にアクセス**
   - https://analytics.google.com/

2. **新しいプロパティを作成**
   - 左下の「管理」をクリック
   - 「プロパティを作成」を選択
   - **プロパティ名**: `MBTI診断` または `無料MBTI診断`
   - **タイムゾーン**: 日本
   - **通貨**: 日本円 (JPY)
   - 「次へ」をクリック

3. **ビジネスの詳細を入力**
   - 業種カテゴリ: 「教育」または「仕事とキャリア」
   - ビジネスの規模: 該当するものを選択
   - 「次へ」をクリック

4. **ビジネス目標を選択**
   - 「エンゲージメントを測定する」などを選択
   - 「作成」をクリック

5. **データストリームの設定**
   - 「ウェブ」を選択
   - **ウェブサイトのURL**: `https://mbti.yumesuta.com`
   - **ストリーム名**: `MBTI診断サイト`
   - 「ストリームを作成」をクリック

6. **測定IDを取得**
   - `G-XXXXXXXXXX` の形式で表示される測定IDをコピー

---

## 3. 環境変数の設定

### デプロイ環境に以下を設定

```env
NEXT_PUBLIC_SITE_URL=https://mbti.yumesuta.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Vercel の場合
1. プロジェクト設定 → Environment Variables
2. 上記の2つの変数を追加
3. Production 環境を選択

### その他のホスティングサービス
各サービスの環境変数設定ページで同様に設定

---

## 4. ビルドとデプロイ

### ローカルでビルドテスト（推奨）

```bash
# 依存関係のインストール
npm install

# ビルド
npm run build

# ビルドしたアプリのテスト実行
npm start
```

エラーがないことを確認してからデプロイ

### Vercel へのデプロイ

```bash
# Vercel CLIでデプロイ（初回）
npx vercel

# 本番環境へデプロイ
npx vercel --prod
```

または GitHub と連携して自動デプロイ

---

## 5. デプロイ後の確認

### 必須チェック項目

- [ ] トップページが正常に表示される
- [ ] 診断（/test）が動作する
- [ ] 結果ページ（/result/basic）が表示される
- [ ] タイプ詳細ページ（/types/intj など）が表示される
- [ ] 全16タイプの画像が正しく表示される
- [ ] OGP画像が正しく表示される（SNSシェアテスト）
- [ ] サイトマップが生成される: https://mbti.yumesuta.com/sitemap.xml
- [ ] robots.txt が生成される: https://mbti.yumesuta.com/robots.txt

### OGPテストツール
- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator
- 汎用: https://www.opengraph.xyz/

---

## 6. Google Search Console の設定

### 重要：別のプロパティとして登録

`mbti.yumesuta.com` は、ゆめスタメインサイトとは**別のプロパティ**として登録します。

### 手順

#### ステップ1: プロパティを追加

1. **Google Search Console にアクセス**
   - https://search.google.com/search-console

2. **新しいプロパティを追加**
   - 左上のプロパティ選択 → 「プロパティを追加」
   - **URLプレフィックス**を選択（推奨）
   - URL: `https://mbti.yumesuta.com`
   - 「続行」をクリック

#### ステップ2: 所有権の確認（HTMLタグ方式）

1. **確認コードを取得**
   - 「HTMLタグ」を選択
   - 表示されるメタタグをコピー
   ```html
   <meta name="google-site-verification" content="XXXXXXXXXX" />
   ```

2. **環境変数に追加**
   - `.env.local` に以下を追加：
   ```env
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=XXXXXXXXXX
   ```
   ※ `content` 属性の値（`XXXXXXXXXX` の部分）のみをコピー

3. **Vercelにも環境変数を追加**
   - Vercel Dashboard → Settings → Environment Variables
   - Name: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
   - Value: `XXXXXXXXXX`（取得したコード）
   - Environment: Production, Preview, Development
   - Save → Redeploy

4. **確認を実行**
   - Search Console に戻り「確認」をクリック
   - 数秒〜数分で確認完了

#### ステップ3: サイトマップを送信

1. **左メニュー「サイトマップ」をクリック**

2. **サイトマップURLを入力**
   ```
   https://mbti.yumesuta.com/sitemap.xml
   ```

3. **「送信」をクリック**
   - ステータスが「成功しました」になるまで待つ（数分〜数時間）

#### ステップ4: インデックス登録をリクエスト

1. **URL検査ツールを開く**
   - 上部の検索バーにトップページURLを入力
   ```
   https://mbti.yumesuta.com
   ```

2. **「インデックス登録をリクエスト」をクリック**
   - 1〜2分待つ
   - 「インデックス登録をリクエスト済み」と表示されればOK

3. **重要なページも同様にリクエスト**
   - `/test` - 診断ページ
   - `/types/intj` など主要なタイプページ

---

## 7. Google Analytics の動作確認

### リアルタイムレポートで確認

1. Google Analytics にログイン
2. 「レポート」→「リアルタイム」を開く
3. サイトにアクセスして、リアルタイムでユーザーが表示されるか確認

### イベント設定（オプション）

診断完了、各タイプページ閲覧などのイベントを後から追加可能

---

## 8. パフォーマンスチェック

### PageSpeed Insights
- https://pagespeed.web.dev/
- モバイル・デスクトップ両方で90点以上を目指す

### 改善が必要な場合
- 画像の最適化（WebP形式、圧縮）
- フォントの最適化
- 不要なJavaScriptの削除

---

## 9. モニタリング

### 定期的にチェックする項目

- [ ] Google Search Console でインデックス状況を確認
- [ ] Google Analytics でアクセス状況を確認
- [ ] エラーログの確認
- [ ] 検索順位のモニタリング（「無料MBTI診断」など）

---

## トラブルシューティング

### サイトマップが表示されない
- ビルドが正常に完了しているか確認
- `app/sitemap.ts` が存在するか確認
- キャッシュをクリアして再アクセス

### OGP画像が表示されない
- 画像のパスが正しいか確認（`public/og-image.png`）
- 画像サイズが1200x630pxか確認
- SNSのキャッシュをクリア

### Google Analytics が動作しない
- 環境変数 `NEXT_PUBLIC_GA_ID` が正しく設定されているか確認
- ブラウザの広告ブロッカーを無効化してテスト
- リアルタイムレポートで確認

---

## 次のフェーズ（フェーズ2）

デプロイ後、以下の機能を追加予定：
1. 詳細診断機能（追加20-30問）
2. Google Sheets API連携（診断結果の保存）
3. メール登録機能
4. SNSシェア機能の強化

---

**作成日**: 2025-10-25
**運営**: 株式会社ゆめスタ
