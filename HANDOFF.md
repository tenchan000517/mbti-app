# MBTI診断アプリ 完全引き継ぎドキュメント

**作成日**: 2025-10-25
**プロジェクト**: 科学的根拠に基づくMBTI性格診断Webアプリケーション
**プロジェクト名**: `mbti-app`
**場所**: `C:/mbti-app/`
**参考プロジェクト**: `C:/portfolio-course/engineer-course/`（UI/UX設計のベース）

---

## 📋 プロジェクト概要

### 目的
科学的に正確なMBTI（Myers-Briggs Type Indicator）性格診断を提供し、ユーザーが自分の性格タイプ（16タイプのいずれか）を正確に理解できるWebアプリケーションを構築する。

### 最重要原則

**⚠️ 絶対に守るべき3つの原則:**

1. **判定精度の最優先**
   - 憶測や予測での質問・判定は一切禁止
   - すべての質問は科学的根拠に基づく
   - 16タイプの説明は正確な情報のみ使用

2. **データの整合性**
   - MBTI理論に忠実な判定アルゴリズム
   - 各次元（E/I, S/N, T/F, J/P）を確実に判別
   - 中途半端な判定を避ける

3. **ユーザー体験の質**
   - Progate風のクリーンなUI/UX
   - 直感的でわかりやすい画面遷移
   - 信頼性の高いデザイン

### ターゲットデザイン
**Progate風**（engineer-courseと同じコンセプト）

#### デザイン要件
- ✅ カラフル・モダン
- ❌ グラデーション禁止（単色のみ使用）
- ❌ 絵文字禁止
- ✅ クリーンで読みやすい
- ✅ 大きめのボタン
- ✅ 完璧なレスポンシブ対応

---

## 🧠 MBTI理論の正確な理解

### MBTIとは

**MBTI（Myers-Briggs Type Indicator）**は、外から観察しやすい行動特徴ではなく、個々人が自然と行っている**ものの見方と判断の方法**など、外からは観察できない「認知スタイル」に焦点を当てた性格類型理論です。

### ⚠️ 重要な注意事項

**16PersonalitiesとMBTIは別物です:**
- 16Personalities: オンライン診断ツール（MBTI®とは無関係）
- MBTI®: 公式の性格類型指標（有資格者が必要）

このプロジェクトでは、**MBTI理論に基づいた独自の診断ツール**を作成します。公式MBTI®の代替ではなく、あくまで「MBTI理論を参考にした性格診断」として提供します。

---

## 🔤 4つの次元（指標）の定義

MBTI理論では、4つの指標の組み合わせで16タイプに分類されます。

### 1. E（Extraversion）/ I（Introversion）
**外向性 / 内向性 - 興味関心の方向・エネルギーの源**

#### E型（外向型）の特徴
- 人や行動への関心が活力の源
- 観察したり決断している最中に、その多くを口に出す
- 「口を開いてから頭を使う」傾向
- 外部からの刺激に対して鈍感（刺激を求める）
- 社交的な場面で エネルギーを得る

#### I型（内向型）の特徴
- 考えや着想が活力の源
- 観察したことや決断したことを口に出さない
- 内省的に考えてから話す
- 外部からの刺激に対して敏感（刺激を避ける）
- 一人の時間でエネルギーを回復

#### 判定のポイント
- 「刺激への感度」が重要な指標
- 社交性だけで判断しない（内向的でも社交的な人はいる）
- エネルギーの充電方法（人といる vs 一人でいる）

---

### 2. S（Sensing）/ N（iNtuition）
**感覚 / 直観 - 情報の収集方法（ものの見方）**

#### S型（感覚型）の特徴
- 五感を通して得られる具体的な情報を重視
- 実際に経験し、具体的な事実をありのままに捉える
- 過去の経験を重視
- 目の前の現実に取り組む
- 詳細やディテールに注目

**具体例:**
- 旅行計画: 詳細なスケジュールを立て、現地の情報を綿密に調べる
- パルテノン神殿: 「立派な柱だな」→柱の直径や高さ、本数を確認

#### N型（直観型）の特徴
- パターンや可能性に着目、抽象的な概念を重視
- 比喩的な表現をする
- 物事を大きな視点から関連づけて捉える
- アイデアや可能性を追いかける
- 未来志向

**具体例:**
- 旅行計画: 「現地での出会いや感動の瞬間」に重きを置く
- パルテノン神殿: 歴史的背景や建築の意味を考える

#### 判定のポイント
- 授業中集中できるか（S型は集中しやすい、N型は想像が膨らむ）
- 会話が具体的か抽象的か
- 過去重視か未来重視か

---

### 3. T（Thinking）/ F（Feeling）
**思考 / 感情 - 判断の方法（意思決定の基準）**

#### T型（思考型）の特徴
- 論理や事実を重視
- 客観的な判断を下す
- 判断基準: 「正しいか正しくないか」
- データや根拠を求める
- 問題解決志向

**具体例:**
- 会議: 「その根拠となるデータはありますか？」
- 相談: 「具体的に何が問題なのか整理してみよう」
- 首が痛い: 「どこが痛いの？」「どんな寝方したの？」（事実把握）

#### F型（感情型）の特徴
- 価値観や人間関係を重視
- 主観的な判断を下す
- 判断基準: 「好きか嫌いか」「みんなが納得するか」
- 人の気持ちを大切にする
- 調和志向

**具体例:**
- 会議: 「みんなはこの提案についてどう感じますか？」
- 相談: 「それは大変だったね」「よく頑張ってるよ」（共感）
- 首が痛い: 「大丈夫？」「つらそう」（心配）

#### 判定のポイント
- 意思決定の基準（論理 vs 感情）
- 相談されたときの反応（解決策 vs 共感）
- 客観性 vs 主観性

---

### 4. J（Judging）/ P（Perceiving）
**判断的態度 / 知覚的態度 - 外界への接し方**

#### J型（判断型）の特徴
- 計画性と組織性を重視
- 物事を決めることを好む
- ルーチンを作り、予定通りに進むことに安心感
- 決着をつけたいという衝動
- タスク完了志向

#### P型（知覚型）の特徴
- 柔軟性を重視、自由な発想を好む
- 計画より瞬間のインスピレーション
- 予期せぬ変化にも柔軟に対応
- 新しい情報を取り入れたいという衝動
- プロセス志向

#### 判定のポイント
- 計画を立てるか、流れに任せるか
- スケジュール変更へのストレス度
- 締め切り前の行動（早めに終わらせる vs ギリギリまで粘る）

---

## 🎯 ユーザーフロー（画面遷移）

### 全体の流れ

```
1. トップページ（/）
   ↓
2. 基本質問（30問）（/test）
   ↓
3. 簡易結果ページ（/result/basic）
   ↓
4. メール登録モーダル（任意）
   ↓
5. 詳細質問（20-30問）（/test/advanced）
   ↓
6. 詳細結果ページ（/result/detailed）
```

### 保存タイミング（重要）

**方針C: 簡易結果表示後、詳細質問の前にメール登録**

#### メリット
- 基本結果は誰でも見れる（離脱率低い）
- 「もっと詳しく知りたい！」という動機付け
- 次回訪問時は詳細結果をすぐ見れる

#### 技術的な実装
```
1. 基本30問回答
   ↓ 回答データをReact stateに保持

2. 簡易結果を表示（stateから計算）

3. 「詳細診断を見る」ボタン → メール登録モーダル表示

4. メールアドレス入力 → 送信
   ↓
   この時点でGoogleスプレッドシートに保存：
   - メールアドレス
   - 基本30問の回答データ（stateから取得）
   - 診断結果（MBTIタイプ）
   - タイムスタンプ

5. 詳細質問へ進む

6. 詳細20-30問回答 → さらに保存（更新）
   ↓
   既存レコードを更新：
   - 詳細質問の回答データ
   - 詳細診断結果
```

**⚠️ 重要:** 回答データは常にブラウザのstate（メモリ）に保持するため、メール登録ボタン押下時に**もう一度診断する必要なし**。

---

## 📊 質問設計の原則

### 基本質問（30問）

**目的**: 4つの次元を確実に判定

**構成:**
- E/I判定: 8問
- S/N判定: 8問
- T/F判定: 7問
- J/P判定: 7問

**質問の要件:**
1. **明確性**: 質問の意図が明確で、誤解を招かない
2. **中立性**: どちらの回答も等しく有効
3. **科学的根拠**: MBTI理論に基づいた質問
4. **実生活に基づく**: 実際の行動や思考パターンを問う

**回答形式:**
5段階評価（強く同意 / 同意 / 中立 / 反対 / 強く反対）

**質問例（E/I）:**
```
質問: 新しい環境で、初対面の人と話すことにワクワクする
- 強く同意する（E型に加点）
- 同意する（E型に少し加点）
- どちらでもない（加点なし）
- 反対する（I型に少し加点）
- 強く反対する（I型に加点）
```

### 詳細質問（20-30問）

**目的**: より精緻な性格分析、認知機能の深掘り

**構成:**
- 各次元をより多角的に分析
- 認知機能（Ti, Te, Fi, Fe, Si, Se, Ni, Ne）の傾向を把握
- ストレス時の行動パターン
- 価値観や動機

**回答形式:**
基本質問と同じ5段階評価

---

## 🧮 判定アルゴリズム

### 基本的な判定ロジック

```typescript
// 各次元のスコアを計算
interface Scores {
  E: number;  // 外向スコア
  I: number;  // 内向スコア
  S: number;  // 感覚スコア
  N: number;  // 直観スコア
  T: number;  // 思考スコア
  F: number;  // 感情スコア
  J: number;  // 判断スコア
  P: number;  // 知覚スコア
}

// 判定関数
function determineMBTIType(scores: Scores): string {
  const dimension1 = scores.E > scores.I ? 'E' : 'I';
  const dimension2 = scores.S > scores.N ? 'S' : 'N';
  const dimension3 = scores.T > scores.F ? 'T' : 'F';
  const dimension4 = scores.J > scores.P ? 'J' : 'P';

  return dimension1 + dimension2 + dimension3 + dimension4;
}
```

### スコアリングの重み付け

**5段階評価のスコア:**
- 強く同意する: +2
- 同意する: +1
- どちらでもない: 0
- 反対する: -1（逆の次元に+1）
- 強く反対する: -2（逆の次元に+2）

### 確実性の担保

**明確な差が出ない場合の対処:**
```typescript
// 各次元の差が一定値以下の場合、追加質問を提示
const threshold = 5; // 最小差分

if (Math.abs(scores.E - scores.I) < threshold) {
  // E/Iに関する追加質問を表示
}
```

---

## 🎨 UI/UXデザイン仕様

### カラーパレット

**プライマリカラー（4次元用）:**
- E/I: `bg-blue-500` (#3B82F6)
- S/N: `bg-purple-500` (#A855F7)
- T/F: `bg-green-500` (#22C55E)
- J/P: `bg-orange-500` (#F97316)

**セカンダリカラー:**
- アクセント: `bg-blue-600` (#2563EB)
- 成功: `bg-green-600` (#16A34A)
- 警告: `bg-yellow-500` (#EAB308)
- エラー: `bg-red-500` (#EF4444)

**背景:**
- メイン背景: `bg-gray-50` (#F9FAFB)
- カード背景: `bg-white` (#FFFFFF)

**テキスト:**
- メインテキスト: `text-gray-900` (#111827)
- サブテキスト: `text-gray-700` (#374151)
- リンク: `text-blue-600` (#2563EB)

**注意事項:**
- ❌ グラデーション禁止
- ❌ 絵文字禁止
- ✅ 単色のみ使用

---

## 📱 画面設計詳細

### 1. トップページ（`app/page.tsx`）

#### レイアウト
```
┌────────────────────────────────────┐
│         MBTI性格診断アプリ          │
│  科学的根拠に基づく正確な診断       │
│                                    │
│  [診断をはじめる]（大きなボタン）   │
│                                    │
│  【MBTIとは】（簡単な説明）         │
│  【診断の特徴】（3-4つのポイント）   │
│  【16タイプ一覧】（アイコン表示）    │
│                                    │
│  運営: ゆめスタ                     │
└────────────────────────────────────┘
```

#### 実装要件
- Hero Section: 中央揃え、大きめのタイトル
- CTAボタン: 目立つ青色、`/test`へリンク
- 特徴カード: 2x2グリッド（4つの次元を紹介）
- 16タイプアイコン: 4x4グリッド、ホバーで説明表示

---

### 2. 基本質問ページ（`app/test/page.tsx`）

#### レイアウト
```
┌────────────────────────────────────┐
│  [進捗バー] 5/30問                  │
│                                    │
│  質問5: 新しい環境で...            │
│                                    │
│  ○ 強く同意する                    │
│  ○ 同意する                        │
│  ○ どちらでもない                  │
│  ○ 反対する                        │
│  ○ 強く反対する                    │
│                                    │
│  [戻る] [次へ]                     │
└────────────────────────────────────┘
```

#### 実装要件
- プログレスバー: 視覚的に進捗を表示
- 質問カード: 白背景、影付き
- ラジオボタン: 大きめ、選択しやすい
- ナビゲーション: 戻る・次へボタン
- 回答を選択するまで「次へ」を無効化

#### State管理
```typescript
interface Answer {
  questionId: number;
  value: number; // -2 ~ +2
  dimension: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
}

const [answers, setAnswers] = useState<Answer[]>([]);
const [currentQuestion, setCurrentQuestion] = useState(0);
```

---

### 3. 簡易結果ページ（`app/result/basic/page.tsx`）

#### レイアウト
```
┌────────────────────────────────────┐
│   あなたのタイプ: INTJ              │
│   （建築家タイプ）                  │
│                                    │
│   【スコア表示】                    │
│   E ■■■□□ I ■■■■■ (I型)     │
│   S ■■□□□ N ■■■■□ (N型)     │
│   T ■■■■□ F ■■□□□ (T型)     │
│   J ■■■■■ P ■■□□□ (J型)     │
│                                    │
│   【簡単な説明】                    │
│   INTJは戦略的思考を持ち...        │
│                                    │
│   [詳細診断を見る]                  │
│   ↓（メール登録モーダル）          │
└────────────────────────────────────┘
```

#### 実装要件
- タイプ表示: 大きく、目立つように
- スコアバー: 視覚的にバランスを表示
- 簡易説明: 200-300文字程度
- CTAボタン: 「詳細診断を見る」→ メール登録モーダル

---

### 4. メール登録モーダル（Component）

#### レイアウト
```
┌────────────────────────────────────┐
│  詳細診断を見るにはメール登録が     │
│  必要です                          │
│                                    │
│  次回から結果をすぐに見れます       │
│                                    │
│  [メールアドレス入力]               │
│                                    │
│  [登録して詳細診断へ] [スキップ]    │
└────────────────────────────────────┘
```

#### 実装要件
- オーバーレイ: 半透明黒背景
- モーダルカード: 中央配置、白背景
- バリデーション: メール形式チェック
- スキップ可能: ただし次回は結果を見れない旨を表示

#### データ保存処理
```typescript
async function saveBasicResult(email: string, answers: Answer[], mbtiType: string) {
  // Googleスプレッドシートに保存
  await fetch('/api/save-result', {
    method: 'POST',
    body: JSON.stringify({
      email,
      basicAnswers: answers,
      mbtiType,
      timestamp: new Date().toISOString(),
    }),
  });
}
```

---

### 5. 詳細質問ページ（`app/test/advanced/page.tsx`）

基本質問ページと同じUIだが、質問内容がより詳細。

---

### 6. 詳細結果ページ（`app/result/detailed/page.tsx`）

#### レイアウト
```
┌────────────────────────────────────┐
│   あなたのタイプ: INTJ              │
│   （建築家タイプ）                  │
│                                    │
│   【詳細スコア表示】                │
│   （各次元の詳細な分析）            │
│                                    │
│   【性格の特徴】                    │
│   ・戦略的思考                      │
│   ・独立性が高い                    │
│   ・長期的ビジョン                  │
│                                    │
│   【強み】                          │
│   ・問題解決能力                    │
│   ・計画性                          │
│                                    │
│   【弱み】                          │
│   ・感情表現が苦手                  │
│   ・柔軟性に欠ける                  │
│                                    │
│   【適職】                          │
│   エンジニア、研究者、戦略家など    │
│                                    │
│   【相性の良いタイプ】              │
│   ENFP, ENTP                        │
│                                    │
│   [結果をシェア] [診断をやり直す]   │
│                                    │
│   運営: ゆめスタ                     │
└────────────────────────────────────┘
```

#### 実装要件
- 包括的な説明: 各セクションごとにカード表示
- シェア機能: Twitter, Facebook等
- 再診断リンク: トップページへ

---

## 🗂️ プロジェクト構造

```
C:/mbti-app/
├── app/
│   ├── page.tsx                    # トップページ
│   ├── layout.tsx                  # 全ページ共通レイアウト
│   ├── globals.css                 # グローバルCSS
│   ├── test/
│   │   ├── page.tsx               # 基本質問ページ
│   │   └── advanced/
│   │       └── page.tsx           # 詳細質問ページ
│   ├── result/
│   │   ├── basic/
│   │   │   └── page.tsx           # 簡易結果ページ
│   │   └── detailed/
│   │       └── page.tsx           # 詳細結果ページ
│   └── api/
│       ├── save-result/
│       │   └── route.ts           # 結果保存API
│       └── get-result/
│           └── route.ts           # 結果取得API（メール検索）
├── components/
│   ├── ProgressBar.tsx            # 進捗バー
│   ├── QuestionCard.tsx           # 質問カード
│   ├── ScoreBar.tsx               # スコア表示バー
│   ├── EmailModal.tsx             # メール登録モーダル
│   ├── TypeCard.tsx               # MBTIタイプカード
│   └── ShareButtons.tsx           # シェアボタン
├── lib/
│   ├── questions.ts               # 質問データ（基本30問）
│   ├── advanced-questions.ts     # 質問データ（詳細20-30問）
│   ├── mbti-calculator.ts        # MBTI判定ロジック
│   ├── type-descriptions.ts      # 16タイプの説明データ
│   └── google-sheets.ts          # Googleスプレッドシート連携
├── types/
│   └── index.ts                   # TypeScript型定義
├── public/
│   └── images/                    # 画像ファイル
├── .env.local                     # 環境変数（Google API Key等）
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── HANDOFF.md                     # このドキュメント
```

---

## ⚙️ 技術スタック

### フレームワーク・ライブラリ
- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**

### パッケージ
```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "lucide-react": "^0.xxx.x",
    "googleapis": "^xxx.x.x",
    "zod": "^3.xx.x"
  }
}
```

### API連携
- **Google Sheets API**: ユーザーデータ保存

---

## 🔌 Google Sheets API連携設計

### Googleスプレッドシート構造

**シート名**: `mbti-results`

**列構成:**
| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Email | MBTI Type | Basic Answers | Advanced Answers | Timestamp | Last Updated |

**データ例:**
```
user@example.com | INTJ | [{"q":1,"v":2},{"q":2,"v":-1},...] | [...] | 2025-10-25T10:30:00Z | 2025-10-25T11:00:00Z
```

### API実装

#### 1. 環境変数（`.env.local`）
```bash
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-google-sheet-id
```

#### 2. 保存API（`app/api/save-result/route.ts`）
```typescript
import { google } from 'googleapis';

export async function POST(request: Request) {
  const { email, mbtiType, basicAnswers, advancedAnswers } = await request.json();

  // Google Sheets APIクライアント初期化
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  // 既存レコード検索
  const existingRow = await findRowByEmail(sheets, email);

  if (existingRow) {
    // 更新
    await updateRow(sheets, existingRow, { email, mbtiType, basicAnswers, advancedAnswers });
  } else {
    // 新規追加
    await appendRow(sheets, { email, mbtiType, basicAnswers, advancedAnswers });
  }

  return Response.json({ success: true });
}
```

#### 3. 取得API（`app/api/get-result/route.ts`）
```typescript
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  // Google Sheets APIから取得
  const result = await getResultByEmail(email);

  if (!result) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }

  return Response.json(result);
}
```

---

## 📝 質問データの構造

### 型定義（`types/index.ts`）
```typescript
export type Dimension = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export interface Question {
  id: number;
  text: string;
  dimension: Dimension; // E/I/S/N/T/F/J/P
  reverse?: boolean; // trueの場合、スコアを反転
}

export interface Answer {
  questionId: number;
  value: number; // -2 ~ +2
}

export interface Scores {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
}

export type MBTIType =
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP';

export interface TypeDescription {
  type: MBTIType;
  name: string; // 例: "建築家"
  shortDescription: string; // 200-300文字
  characteristics: string[]; // 特徴リスト
  strengths: string[]; // 強み
  weaknesses: string[]; // 弱み
  careers: string[]; // 適職
  compatibleTypes: MBTIType[]; // 相性の良いタイプ
}
```

### 質問データ例（`lib/questions.ts`）
```typescript
export const basicQuestions: Question[] = [
  // E/I 判定質問（8問）
  {
    id: 1,
    text: '新しい環境で、初対面の人と話すことにワクワクする',
    dimension: 'E',
  },
  {
    id: 2,
    text: '一人で過ごす時間が、心を落ち着かせてくれる',
    dimension: 'I',
  },
  {
    id: 3,
    text: '大勢でいるときの方が、エネルギーが湧いてくる',
    dimension: 'E',
  },
  {
    id: 4,
    text: '社交的な場面が続くと、疲れを感じる',
    dimension: 'I',
  },
  // ... 残り4問

  // S/N 判定質問（8問）
  {
    id: 9,
    text: '具体的な事実やデータを重視する',
    dimension: 'S',
  },
  {
    id: 10,
    text: '物事の可能性や意味を考えることが多い',
    dimension: 'N',
  },
  // ... 残り6問

  // T/F 判定質問（7問）
  {
    id: 17,
    text: '意思決定をする際、論理的な分析を優先する',
    dimension: 'T',
  },
  {
    id: 18,
    text: '決断する時、人の気持ちを第一に考える',
    dimension: 'F',
  },
  // ... 残り5問

  // J/P 判定質問（7問）
  {
    id: 24,
    text: '計画を立ててから行動することを好む',
    dimension: 'J',
  },
  {
    id: 25,
    text: '柔軟に対応することが得意だ',
    dimension: 'P',
  },
  // ... 残り5問
];
```

**⚠️ 実装時の注意:**
- 質問は必ずMBTI理論に基づいて作成
- Web検索で信頼できる情報源を確認
- 偏った質問を避ける（バランスよく）

---

## 🧮 MBTI判定ロジック（`lib/mbti-calculator.ts`）

```typescript
import { Answer, Scores, MBTIType, Question } from '@/types';

export function calculateScores(answers: Answer[], questions: Question[]): Scores {
  const scores: Scores = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0,
  };

  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) return;

    const value = answer.value; // -2 ~ +2
    const dimension = question.dimension;

    // スコア加算
    if (value > 0) {
      scores[dimension] += value;
    } else if (value < 0) {
      // 逆の次元に加算
      const oppositeDimension = getOppositeDimension(dimension);
      scores[oppositeDimension] += Math.abs(value);
    }
  });

  return scores;
}

function getOppositeDimension(dimension: string): keyof Scores {
  const pairs: { [key: string]: keyof Scores } = {
    'E': 'I', 'I': 'E',
    'S': 'N', 'N': 'S',
    'T': 'F', 'F': 'T',
    'J': 'P', 'P': 'J',
  };
  return pairs[dimension];
}

export function determineMBTIType(scores: Scores): MBTIType {
  const dimension1 = scores.E > scores.I ? 'E' : 'I';
  const dimension2 = scores.S > scores.N ? 'S' : 'N';
  const dimension3 = scores.T > scores.F ? 'T' : 'F';
  const dimension4 = scores.J > scores.P ? 'J' : 'P';

  return (dimension1 + dimension2 + dimension3 + dimension4) as MBTIType;
}

export function getScorePercentages(scores: Scores): {
  EI: { E: number; I: number };
  SN: { S: number; N: number };
  TF: { T: number; F: number };
  JP: { J: number; P: number };
} {
  const totalEI = scores.E + scores.I;
  const totalSN = scores.S + scores.N;
  const totalTF = scores.T + scores.F;
  const totalJP = scores.J + scores.P;

  return {
    EI: {
      E: totalEI > 0 ? (scores.E / totalEI) * 100 : 50,
      I: totalEI > 0 ? (scores.I / totalEI) * 100 : 50,
    },
    SN: {
      S: totalSN > 0 ? (scores.S / totalSN) * 100 : 50,
      N: totalSN > 0 ? (scores.N / totalSN) * 100 : 50,
    },
    TF: {
      T: totalTF > 0 ? (scores.T / totalTF) * 100 : 50,
      F: totalTF > 0 ? (scores.F / totalTF) * 100 : 50,
    },
    JP: {
      J: totalJP > 0 ? (scores.J / totalJP) * 100 : 50,
      P: totalJP > 0 ? (scores.P / totalJP) * 100 : 50,
    },
  };
}
```

---

## 📚 16タイプの説明データ（`lib/type-descriptions.ts`）

**⚠️ 重要:** 各タイプの説明は必ずWeb検索で正確な情報を収集してから記述すること。

```typescript
import { TypeDescription, MBTIType } from '@/types';

export const typeDescriptions: Record<MBTIType, TypeDescription> = {
  INTJ: {
    type: 'INTJ',
    name: '建築家',
    shortDescription: '戦略的思考を持ち、独立性が高く、長期的なビジョンを持って行動するタイプ。論理的で計画的、高い目標を設定し、それを達成するために努力します。',
    characteristics: [
      '戦略的思考',
      '独立性が高い',
      '長期的ビジョン',
      '論理的分析',
      '完璧主義',
    ],
    strengths: [
      '問題解決能力が高い',
      '計画性がある',
      '独創的なアイデア',
      '決断力がある',
    ],
    weaknesses: [
      '感情表現が苦手',
      '柔軟性に欠ける',
      '他人の感情に鈍感',
      '完璧主義が行き過ぎる',
    ],
    careers: [
      'エンジニア',
      '研究者',
      '戦略コンサルタント',
      '建築家',
      'プロジェクトマネージャー',
    ],
    compatibleTypes: ['ENFP', 'ENTP'],
  },

  INTP: {
    type: 'INTP',
    name: '論理学者',
    shortDescription: '論理的で分析的、理論やアイデアに強い関心を持つタイプ。独創的な思考を持ち、複雑な問題を解決することを楽しみます。',
    characteristics: [
      '論理的思考',
      '分析力',
      '好奇心旺盛',
      '独創的',
      '理論志向',
    ],
    strengths: [
      '論理的分析',
      '独創的なアイデア',
      '柔軟な思考',
      '知的好奇心',
    ],
    weaknesses: [
      '実行力に欠ける',
      '感情表現が苦手',
      '優柔不断',
      '社交性に欠ける',
    ],
    careers: [
      '研究者',
      'プログラマー',
      '数学者',
      '哲学者',
      'データサイエンティスト',
    ],
    compatibleTypes: ['ENTJ', 'ESTJ'],
  },

  // ... 残り14タイプも同様に定義
  // ⚠️ 実装時は必ずWeb検索で正確な情報を収集すること
};
```

---

## 🚀 実装チェックリスト

### セットアップ（必須）

- [x] Next.jsプロジェクト作成
  ```bash
  cd C:/
  npx create-next-app@latest mbti-app --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
  ```
  - TypeScript: Yes
  - Tailwind CSS: Yes
  - ESLint: Yes
  - App Router: Yes
  - src directory: No
  - Import alias: @/*

- [x] パッケージインストール
  ```bash
  cd C:/mbti-app
  npm install lucide-react googleapis zod
  ```

- [x] ディレクトリ構造作成
  ```bash
  mkdir -p components lib types app/test/advanced app/result/basic app/result/detailed app/api/save-result app/api/get-result
  ```

---

### データ準備（最重要）

- [x] **質問データ作成（`lib/questions.ts`）**
  - [x] Web検索でMBTI質問例を調査
  - [x] 基本30問を作成（E/I: 8, S/N: 8, T/F: 7, J/P: 7）
  - [x] 各質問が正確にその次元を測定するか確認

- [x] **詳細質問データ作成（`lib/advanced-questions.ts`）**
  - [x] Web検索で認知機能の質問例を調査
  - [x] 詳細25問を作成
  - [x] 基本質問と重複しないよう注意

- [x] **16タイプの説明データ作成（`lib/type-descriptions.ts`）**
  - [x] 各タイプについてWeb検索で正確な情報を収集
  - [x] 16タイプすべての説明を記述
  - [x] 憶測や予測を避け、信頼できる情報源を使用

---

### コアロジック実装

- [x] **型定義（`types/index.ts`）**
  - [x] Question, Answer, Scores, MBTIType等を定義

- [x] **MBTI判定ロジック（`lib/mbti-calculator.ts`）**
  - [x] calculateScores関数
  - [x] determineMBTIType関数
  - [x] getScorePercentages関数
  - [ ] テストケース作成（各次元の判定が正確か）

---

### コンポーネント実装

- [x] **ProgressBar.tsx**
  - [x] 進捗バー表示
  - [x] レスポンシブ対応

- [x] **QuestionCard.tsx**
  - [x] 質問表示
  - [x] 5段階ラジオボタン
  - [x] 回答選択のstate管理

- [x] **ScoreBar.tsx**
  - [x] スコアをバーで視覚化
  - [x] パーセンテージ表示

- [ ] **EmailModal.tsx**
  - [ ] メールアドレス入力フォーム
  - [ ] バリデーション（zod使用）
  - [ ] 送信処理

- [ ] **TypeCard.tsx**
  - [ ] MBTIタイプカード表示
  - [ ] ホバー効果

- [ ] **ShareButtons.tsx**
  - [ ] SNSシェアボタン
  - [ ] Twitter, Facebook対応

---

### ページ実装

- [x] **トップページ（`app/page.tsx`）**
  - [x] ヒーローセクション
  - [x] 診断の特徴（4つのカード）
  - [x] 16タイプ一覧
  - [x] CTAボタン

- [x] **基本質問ページ（`app/test/page.tsx`）**
  - [x] 質問表示ロジック
  - [x] 回答のstate管理
  - [x] ナビゲーション（戻る・次へ）
  - [x] プログレスバー
  - [x] 完了後、簡易結果ページへ遷移

- [x] **簡易結果ページ（`app/result/basic/page.tsx`）**
  - [x] MBTIタイプ表示
  - [x] スコアバー表示
  - [x] 簡易説明表示
  - [ ] メール登録モーダル呼び出し

- [ ] **詳細質問ページ（`app/test/advanced/page.tsx`）**
  - [ ] 基本質問ページと同様のUI
  - [ ] 詳細質問データ使用

- [ ] **詳細結果ページ（`app/result/detailed/page.tsx`）**
  - [ ] 包括的な説明表示
  - [ ] 特徴、強み、弱み、適職、相性
  - [ ] シェアボタン
  - [ ] 再診断リンク

---

### API実装

- [ ] **保存API（`app/api/save-result/route.ts`）**
  - [ ] Google Sheets API連携
  - [ ] 既存レコード検索
  - [ ] 新規追加 or 更新
  - [ ] エラーハンドリング

- [ ] **取得API（`app/api/get-result/route.ts`）**
  - [ ] メールアドレスで検索
  - [ ] 結果を返却
  - [ ] 存在しない場合の処理

- [ ] **Google Sheets設定**
  - [ ] Googleアカウントでプロジェクト作成
  - [ ] サービスアカウント作成
  - [ ] 認証情報（JSON）取得
  - [ ] スプレッドシート作成・共有
  - [ ] `.env.local`に環境変数設定

---

### スタイリング

- [ ] **グローバルCSS（`app/globals.css`）**
  - [ ] Tailwindのカスタマイズ
  - [ ] スムーススクロール
  - [ ] フォント設定

- [ ] **レイアウト（`app/layout.tsx`）**
  - [ ] フォント: Inter
  - [ ] 言語: ja
  - [ ] メタデータ: 日本語

- [x] **カラーパレット確認**
  - [x] グラデーション未使用
  - [x] 単色のみ使用

---

### テスト・検証

- [ ] **判定精度テスト**
  - [ ] 各次元が正確に判定されるか
  - [ ] 極端なケース（全てE寄り、全てI寄り）
  - [ ] 中立的な回答の処理

- [ ] **動作確認**
  - [ ] 開発サーバー起動（`npm run dev`）
  - [ ] 全ページ表示確認
  - [ ] 質問回答フロー
  - [ ] メール登録
  - [ ] データ保存・取得

- [ ] **レスポンシブ確認**
  - [ ] モバイル（375px〜）
  - [ ] タブレット（768px〜）
  - [ ] PC（1024px〜）

- [ ] **ビルド確認**
  ```bash
  npm run build
  ```
  - [ ] エラーがないか確認
  - [ ] TypeScriptエラー修正

---

## 🎯 実装の優先順位

### フェーズ1: 基盤構築（最優先）
1. プロジェクトセットアップ
2. 型定義
3. **質問データ作成（Web検索必須）**
4. **16タイプ説明データ作成（Web検索必須）**
5. MBTI判定ロジック

### フェーズ2: コア機能実装
1. 基本質問ページ
2. 簡易結果ページ
3. MBTI判定の動作確認
4. トップページ

### フェーズ3: データ保存機能
1. Google Sheets API設定
2. 保存API実装
3. メール登録モーダル
4. 取得API実装

### フェーズ4: 拡張機能
1. 詳細質問ページ
2. 詳細結果ページ
3. シェア機能

### フェーズ5: 仕上げ
1. スタイリング調整
2. レスポンシブ対応
3. テスト
4. ビルド確認

---

## 🔗 参考リンク（実装時に参照）

### MBTI理論
- [MBTI - Wikipedia（日本語）](https://ja.wikipedia.org/wiki/MBTI)
- 各次元の詳細説明（Web検索で最新情報を取得）

### 技術ドキュメント
- [Next.js公式ドキュメント](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [Lucide React](https://lucide.dev/guide/packages/lucide-react)

---

## 📞 次世代Claude Codeへの引き継ぎ（2025-10-25更新）

### 現在の状況
- フェーズ1（基盤構築）✅ 完了
- フェーズ2（コア機能実装）✅ 完了
- 16タイプ画像追加 ✅ 完了
- 簡易結果ページの基本セクション ✅ 完了

### 次にやること（最優先タスク）

**🔥 結果ページのさらなる充実化**

`ui/` フォルダ内の参考画像を見て、現在の `app/result/basic/page.tsx` をより充実させてください。

#### 具体的なタスク

1. **性格特性の詳細説明セクション追加**
   - `ui/top2.png` を参照
   - 各MBTIタイプに対する詳しい性格説明文を追加
   - 例: 「ENTJの特徴は「核心」と「多くの仕組みの形成」です...」のような長文説明
   - `lib/type-descriptions.ts` に `detailedDescription` フィールドを追加するか、別ファイルを作成

2. **セクションの構成改善**
   - 現在: タイプ画像 → スコア → 概要 → 特徴 → 強み・弱み → 適職 → 相性
   - 追加すべき: より詳しい性格分析、行動パターン、コミュニケーションスタイルなど

3. **デザインの洗練**
   - `ui/` 内の画像を参考に、より視覚的に魅力的なレイアウト
   - 適切な余白とセクション分け
   - アイコンやイラストの活用（あれば）

#### 参考画像の場所
```
ui/top.png - 基本レイアウト参考
ui/top2.png - 詳細説明セクション参考
ui/career-pass.png - キャリア関連セクション
ui/community.png - コミュニティ関連セクション
ui/self-growup.png - 成長関連セクション
```

#### 注意事項
- ✅ グラデーション禁止（単色のみ使用）
- ✅ 絵文字禁止
- ✅ Progate風のクリーンなデザイン
- ✅ レスポンシブ対応
- ✅ Web検索で正確な情報を収集（憶測禁止）

#### 実装後
- HANDOFF.mdの進捗を更新
- コミット・プッシュ
- 次のタスク（データ保存機能）へ進む

---

## 📞 初期セットアップ用の指示例（参考）

以下は初回セットアップ時の指示例です（既に完了済み）：

```
C:/mbti-app/ で科学的根拠に基づくMBTI診断アプリを実装してください。

【最重要事項】
1. 質問データ作成時は必ずWeb検索でMBTI理論の正確な情報を収集
2. 16タイプの説明も必ずWeb検索で信頼できる情報を使用
3. 憶測や予測での記述は一切禁止

【実装内容】
- Next.js + TypeScript + Tailwind CSS
- 基本質問30問 + 詳細質問20-30問
- 簡易結果 → メール登録 → 詳細結果の流れ
- Google Sheets APIでデータ保存
- Progate風のクリーンなデザイン（グラデーション・絵文字禁止）

【進捗管理】
- このHANDOFF.mdのチェックリストを更新しながら実装
```

---

## 📝 進捗管理

### 現在の状態
- [x] フェーズ1: 基盤構築 - 完了
- [x] フェーズ2: コア機能実装 - 完了
- [ ] フェーズ3: データ保存機能 - 未着手
- [ ] フェーズ4: 拡張機能 - 未着手
- [ ] フェーズ5: 仕上げ - 未着手

### 完了タスク（2025-10-25更新）

#### フェーズ1: 基盤構築 ✅
1. ✅ Next.jsプロジェクトセットアップ
2. ✅ 型定義ファイル作成 (types/index.ts)
3. ✅ MBTI質問データ作成
   - 基本30問 (lib/questions.ts)
   - 詳細25問 (lib/advanced-questions.ts)
   - Web検索で科学的根拠を収集
4. ✅ 16タイプ説明データ作成 (lib/type-descriptions.ts)
   - INTJ, INTP, ENTJ, ENTP
   - INFJ, INFP, ENFJ, ENFP
   - ISTJ, ISFJ, ESTJ, ESFJ
   - ISTP, ISFP, ESTP, ESFP
5. ✅ MBTI判定ロジック実装 (lib/mbti-calculator.ts)
   - calculateScores関数
   - determineMBTIType関数
   - getScorePercentages関数

#### フェーズ2: コア機能実装 ✅
1. ✅ コンポーネント作成
   - ProgressBar.tsx（進捗バー）
   - QuestionCard.tsx（質問カード）
   - ScoreBar.tsx（スコア表示）
2. ✅ トップページ実装 (app/page.tsx)
   - Progate風デザイン
   - グラデーション禁止・絵文字なし
   - レスポンシブ対応
   - 16タイプ画像追加（カード型デザイン）
3. ✅ 基本質問ページ実装 (app/test/page.tsx)
   - 30問の診断フロー
   - localStorageに回答保存
4. ✅ 簡易結果ページ実装 (app/result/basic/page.tsx)
   - MBTIタイプ表示（画像付き）
   - 4次元スコア表示
   - タイプ概要・特徴表示
   - 強み・弱みセクション
   - 適職セクション
   - 相性の良いタイプセクション

#### UI/画像追加 ✅
- ✅ 16タイプの画像追加 (public/img/)
- ✅ 画像マッピングファイル作成 (lib/type-images.ts)
- ✅ UIレイアウト参考画像追加 (ui/)

#### Git管理
- ✅ リモートリポジトリ接続 (https://github.com/tenchan000517/mbti-app.git)
- ✅ 初回コミット・プッシュ完了
- ✅ 画像追加・UI改善コミット
- ✅ 結果ページ充実化コミット

### 次のステップ

#### 🔥 優先度: 最高（次世代Claude Codeへのタスク）
**結果ページのさらなる充実化**

ui/フォルダ内の参考画像を基に、以下を実装してください：
1. **性格特性の詳細説明セクション追加**
   - ui/top2.png を参考に、各タイプの詳しい性格説明を追加
   - ENTJの例: 「あなたに生きるプロローグの特徴は「核心」と「多くの仕組みの形成」...」のような詳細テキスト
   - イラスト画像も含めた視覚的な説明

2. **各セクションのデザイン改善**
   - ui/内の画像を参考に、より洗練されたレイアウト
   - 適切な余白とセクション分け
   - カラーコーディングの最適化

3. **追加コンテンツ**
   - タイプ別の行動パターン説明
   - 他のタイプとの比較・関係性
   - 実生活での活用方法

**参考画像の場所:**
- `ui/top.png` - 基本レイアウト
- `ui/top2.png` - 詳細説明セクション
- `ui/career-pass.png` など - 各種セクションのデザイン

#### 優先度: 高（リスケジュール）
**フェーズ3: データ保存機能**（結果ページ充実後に実装）
   - EmailModalコンポーネント作成
   - Google Sheets API設定
   - 保存API実装 (app/api/save-result/route.ts)
   - 取得API実装 (app/api/get-result/route.ts)

#### 優先度: 中
**フェーズ4: 拡張機能**
   - 詳細質問ページ (app/test/advanced/page.tsx)
   - 詳細結果ページ (app/result/detailed/page.tsx)
   - ShareButtonsコンポーネント

#### 優先度: 低
**フェーズ5: 仕上げ**
   - レイアウト・メタデータ設定
   - レスポンシブ最終確認
   - ビルドテスト

---

## 🚨 注意事項・トラブルシューティング

### よくある問題

**問題1: Google Sheets APIが動作しない**
- サービスアカウントの権限を確認
- スプレッドシートが正しく共有されているか
- 環境変数が正しく設定されているか

**問題2: 判定結果が偏る**
- 質問のバランスを確認（各次元に均等に質問があるか）
- スコアリングロジックを見直す
- 質問の文言が誘導的でないか確認

**問題3: レスポンシブが崩れる**
- Tailwindのブレークポイントを確認
- `min-w-0`, `break-words`等を適切に使用
- `overflow-x-hidden`を確認

---

## 🎉 拡張機能（将来的な追加要素）

実装後、余裕があれば以下を追加：

- [ ] 結果のPDFエクスポート
- [ ] 診断履歴の表示
- [ ] タイプ別のコミュニティ機能
- [ ] 他のタイプとの比較機能
- [ ] ダークモード
- [ ] 多言語対応（英語等）
- [ ] アニメーション（framer-motion）
- [ ] アクセス解析（Google Analytics）

---

**引き継ぎ完了。実装を開始してください。**

**⚠️ 繰り返しますが、質問データと16タイプの説明は必ずWeb検索で正確な情報を収集してから作成してください。これがこのプロジェクトの成否を分けます。**
