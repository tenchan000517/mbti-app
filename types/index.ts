// MBTI次元タイプ
export type Dimension = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

// 質問データの型
export interface Question {
  id: number;
  text: string;
  dimension: Dimension; // E/I/S/N/T/F/J/P
  reverse?: boolean; // trueの場合、スコアを反転
}

// 回答データの型
export interface Answer {
  questionId: number;
  value: number; // -2 ~ +2 (強く反対 ~ 強く同意)
}

// スコアの型
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

// MBTIタイプ（16種類）
export type MBTIType =
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP';

// 影響力のある特性の型
export interface InfluentialTrait {
  label: string; // 例: "完遂主義"
  percentage: number; // 0-100
}

// 詳細セクションの型
export interface DetailedSection {
  title: string; // セクションタイトル
  content: string; // セクション内容
}

// 引用文の型
export interface Quote {
  text: string; // 引用文
  author: string; // 著者名
}

// タイプ説明データの型
export interface TypeDescription {
  type: MBTIType;
  name: string; // 例: "建築家"
  shortDescription: string; // 200-300文字
  detailedDescription: string; // 詳細な性格説明（長文）
  communicationStyle: string; // コミュニケーションスタイル
  characteristics: string[]; // 特徴リスト
  strengths: string[]; // 強み
  weaknesses: string[]; // 弱み
  careers: string[]; // 適職
  compatibleTypes: MBTIType[]; // 相性の良いタイプ
  careerPath: string; // キャリアパスに関する説明
  selfGrowth: string; // 自己成長に関する説明
  influentialTraits: InfluentialTrait[]; // 影響力のある特性
  quote?: Quote; // 引用文（オプション）
  detailedSections?: DetailedSection[]; // 詳細セクション（オプション）
}

// スコアのパーセンテージ表示用
export interface ScorePercentages {
  EI: { E: number; I: number };
  SN: { S: number; N: number };
  TF: { T: number; F: number };
  JP: { J: number; P: number };
}

// 診断結果データ（Googleスプレッドシート保存用）
export interface DiagnosticResult {
  email: string;
  mbtiType: MBTIType;
  basicAnswers: Answer[];
  advancedAnswers?: Answer[];
  timestamp: string;
  lastUpdated?: string;
}
