# ブログ記事のアイキャッチ画像取得ガイド

このガイドでは、記事作成時に使用する100%無料で商用利用可能な画像の取得方法を説明します。

## 推奨画像サイト

### 1. Unsplash（推奨）
- **URL**: https://unsplash.com/ja
- **ライセンス**: Unsplash License（商用利用可、クレジット表記不要）
- **特徴**: 高品質な写真が豊富

**使い方**:
1. Unsplashにアクセス
2. キーワード（例：「business」「career」「office」）で検索
3. 気に入った画像をクリック
4. 「ダウンロード」ボタンをクリック
5. ダウンロードした画像を `/public/images/blog/` に保存
6. 記事のfrontmatterに画像パスを指定

### 2. Pexels
- **URL**: https://www.pexels.com/ja-jp/
- **ライセンス**: Pexels License（商用利用可、クレジット表記不要）
- **特徴**: 動画も利用可能

**使い方**: Unsplashと同様

### 3. Pixabay
- **URL**: https://pixabay.com/ja/
- **ライセンス**: Pixabay License（商用利用可、クレジット表記不要）
- **特徴**: イラストも豊富

## 画像の保存場所

```
/public/images/blog/
  ├── basics/           # MBTI基礎知識の画像
  ├── career/           # キャリアガイドの画像
  ├── job-hunting/      # 就活対策の画像
  ├── relationships/    # 人間関係の画像
  ├── trends/           # トレンドの画像
  ├── growth/           # 成長の画像
  └── corporate/        # 企業分析の画像
```

## 記事への画像設定方法

記事のMarkdownファイル（例：`content/blog/basics/what-is-mbti.md`）のfrontmatterに以下を追加：

```markdown
---
title: "【2025年版】MBTIとは？"
description: "MBTI診断の基礎知識を徹底解説"
date: "2025-10-26"
author: "Claude Code"
category: "basics"
eyecatch: "/images/blog/basics/what-is-mbti.jpg"
keywords:
  - MBTI
  - 性格診断
  - 自己分析
---

記事の本文...
```

## 推奨画像サイズ

- **幅**: 1200px以上
- **高さ**: 630px以上
- **アスペクト比**: 16:9 または 1.91:1
- **ファイル形式**: JPG または PNG
- **ファイルサイズ**: 500KB以下（パフォーマンスのため）

## カテゴリ別おすすめキーワード

### MBTI基礎知識（basics）
- personality, psychology, brain, thinking, mindset

### キャリアガイド（career）
- career, business, office, professional, workplace

### 就活・面接対策（job-hunting）
- interview, job search, resume, hiring, recruitment

### 人間関係・相性（relationships）
- teamwork, collaboration, communication, people, friendship

### トレンド・最新情報（trends）
- technology, modern, innovation, future, digital

### 成長・自己啓発（growth）
- growth, learning, education, motivation, success

### 企業・組織分析（corporate）
- company, organization, corporate, team, business meeting

## 画像がない場合

記事にアイキャッチ画像を指定しない場合、システムが自動的にカテゴリに応じたグラデーション画像を表示します。

## 注意事項

1. **著作権を確認**: 必ず各サイトのライセンスを確認してから使用
2. **ファイル名**: 英数字とハイフンのみ使用（例：`mbti-basics-2025.jpg`）
3. **最適化**: 画像は圧縮してから使用（TinyPNG等を利用）
4. **代替テキスト**: 記事のタイトルが自動的にaltテキストとして使用されます

## 画像最適化ツール

- **TinyPNG**: https://tinypng.com/
- **Squoosh**: https://squoosh.app/
- **ImageOptim**: https://imageoptim.com/ (Mac用)

---

このガイドに従って、記事作成時に適切なアイキャッチ画像を設定してください。
