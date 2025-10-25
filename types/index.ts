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

// タイプ説明データの型
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
