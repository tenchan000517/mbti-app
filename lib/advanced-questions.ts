import { Question } from '@/types';

/**
 * MBTI詳細診断質問（25問）
 *
 * 目的: より精緻な性格分析、認知機能の深掘り
 *
 * 構成:
 * - E/I判定: 6問
 * - S/N判定: 7問
 * - T/F判定: 6問
 * - J/P判定: 6問
 */
export const advancedQuestions: Question[] = [
  // ========================================
  // E/I 判定質問（6問）
  // ========================================
  {
    id: 31,
    text: 'アイデアを練る時、誰かと話し合いながら考える方が良い',
    dimension: 'E',
  },
  {
    id: 32,
    text: 'アイデアを練る時、一人で静かに考える方が良い',
    dimension: 'I',
  },
  {
    id: 33,
    text: '休日は外に出て活動的に過ごしたい',
    dimension: 'E',
  },
  {
    id: 34,
    text: '休日は家でゆっくり過ごしたい',
    dimension: 'I',
  },
  {
    id: 35,
    text: '広く浅い人間関係を好む',
    dimension: 'E',
  },
  {
    id: 36,
    text: '狭く深い人間関係を好む',
    dimension: 'I',
  },

  // ========================================
  // S/N 判定質問（7問）
  // ========================================
  {
    id: 37,
    text: '過去の経験やデータから学ぶことを重視する',
    dimension: 'S',
  },
  {
    id: 38,
    text: '未来の可能性や革新的なアイデアを重視する',
    dimension: 'N',
  },
  {
    id: 39,
    text: '手順やマニュアルに従うことが好きだ',
    dimension: 'S',
  },
  {
    id: 40,
    text: '自分なりの方法を見つけることが好きだ',
    dimension: 'N',
  },
  {
    id: 41,
    text: '実用的で実現可能なことに関心がある',
    dimension: 'S',
  },
  {
    id: 42,
    text: '理論的で概念的なことに関心がある',
    dimension: 'N',
  },
  {
    id: 43,
    text: '比喩や抽象的な表現よりも、具体的な説明を好む',
    dimension: 'S',
  },

  // ========================================
  // T/F 判定質問（6問）
  // ========================================
  {
    id: 44,
    text: '批判や指摘を受けても、内容が正しければ受け入れられる',
    dimension: 'T',
  },
  {
    id: 45,
    text: '批判や指摘の伝え方が、内容以上に気になる',
    dimension: 'F',
  },
  {
    id: 46,
    text: '議論では、正確さと論理性を重視する',
    dimension: 'T',
  },
  {
    id: 47,
    text: '議論では、全員が納得できるかを重視する',
    dimension: 'F',
  },
  {
    id: 48,
    text: '感情よりも、客観的な基準で評価する',
    dimension: 'T',
  },
  {
    id: 49,
    text: '人の気持ちや価値観を尊重して評価する',
    dimension: 'F',
  },

  // ========================================
  // J/P 判定質問（6問）
  // ========================================
  {
    id: 50,
    text: '旅行の計画を事前に詳細に立てる',
    dimension: 'J',
  },
  {
    id: 51,
    text: '旅行は現地で自由に決めたい',
    dimension: 'P',
  },
  {
    id: 52,
    text: '物事を早めに決着させたい衝動がある',
    dimension: 'J',
  },
  {
    id: 53,
    text: '新しい情報を取り入れ続けたい衝動がある',
    dimension: 'P',
  },
  {
    id: 54,
    text: 'スケジュール変更にストレスを感じる',
    dimension: 'J',
  },
  {
    id: 55,
    text: 'スケジュール変更も柔軟に楽しめる',
    dimension: 'P',
  },
];

/**
 * 全質問を取得（基本 + 詳細）
 */
export function getAllQuestions(): Question[] {
  const { basicQuestions } = require('./questions');
  return [...basicQuestions, ...advancedQuestions];
}
