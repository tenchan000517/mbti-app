import { Question } from '@/types';

/**
 * MBTI基本診断質問（30問）
 *
 * 構成:
 * - E/I判定: 8問
 * - S/N判定: 8問
 * - T/F判定: 7問
 * - J/P判定: 7問
 *
 * 回答形式: 5段階評価
 * - 強く同意する: +2
 * - 同意する: +1
 * - どちらでもない: 0
 * - 反対する: -1 (逆の次元に+1)
 * - 強く反対する: -2 (逆の次元に+2)
 */
export const basicQuestions: Question[] = [
  // ========================================
  // E/I 判定質問（8問）
  // ========================================
  {
    id: 1,
    text: '人と過ごすことで、エネルギーが湧いてくる',
    dimension: 'E',
  },
  {
    id: 2,
    text: '一人で過ごす時間が、心を落ち着かせてくれる',
    dimension: 'I',
  },
  {
    id: 3,
    text: 'グループでの活動や会話を楽しむことが多い',
    dimension: 'E',
  },
  {
    id: 4,
    text: '初対面の人と話すとき、緊張することが多い',
    dimension: 'I',
  },
  {
    id: 5,
    text: '新しい環境で、積極的に人に話しかける',
    dimension: 'E',
  },
  {
    id: 6,
    text: '社交的な場面が続くと、疲れを感じる',
    dimension: 'I',
  },
  {
    id: 7,
    text: '考えを整理する前に、口に出して話すことが多い',
    dimension: 'E',
  },
  {
    id: 8,
    text: '話す前に、頭の中でじっくり考えを整理する',
    dimension: 'I',
  },

  // ========================================
  // S/N 判定質問（8問）
  // ========================================
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
  {
    id: 11,
    text: '実際の経験に基づいて判断することを好む',
    dimension: 'S',
  },
  {
    id: 12,
    text: '抽象的な概念やアイデアについて考えるのが好きだ',
    dimension: 'N',
  },
  {
    id: 13,
    text: '詳細やディテールに注目することが多い',
    dimension: 'S',
  },
  {
    id: 14,
    text: '全体像やパターンを見ることを重視する',
    dimension: 'N',
  },
  {
    id: 15,
    text: '現実的で実用的なことに興味がある',
    dimension: 'S',
  },
  {
    id: 16,
    text: '未来の可能性や新しいアイデアに興味がある',
    dimension: 'N',
  },

  // ========================================
  // T/F 判定質問（7問）
  // ========================================
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
  {
    id: 19,
    text: '「正しいか正しくないか」を基準に判断する',
    dimension: 'T',
  },
  {
    id: 20,
    text: '「好きか嫌いか」「納得できるか」を基準に判断する',
    dimension: 'F',
  },
  {
    id: 21,
    text: '友人の相談に対して、解決策を提案することが多い',
    dimension: 'T',
  },
  {
    id: 22,
    text: '友人の相談に対して、まず共感し寄り添う',
    dimension: 'F',
  },
  {
    id: 23,
    text: '客観的なデータや根拠を求める',
    dimension: 'T',
  },

  // ========================================
  // J/P 判定質問（7問）
  // ========================================
  {
    id: 24,
    text: '計画を立ててから行動することを好む',
    dimension: 'J',
  },
  {
    id: 25,
    text: '状況に応じて柔軟に対応することが得意だ',
    dimension: 'P',
  },
  {
    id: 26,
    text: '予定通りに進むことに安心感を覚える',
    dimension: 'J',
  },
  {
    id: 27,
    text: '予期せぬ変化も楽しめる',
    dimension: 'P',
  },
  {
    id: 28,
    text: '締め切りより早めにタスクを完了させたい',
    dimension: 'J',
  },
  {
    id: 29,
    text: '締め切りギリギリまで取り組むことが多い',
    dimension: 'P',
  },
  {
    id: 30,
    text: '整理整頓された環境が好きだ',
    dimension: 'J',
  },
];

/**
 * 質問IDから質問を取得
 */
export function getQuestionById(id: number): Question | undefined {
  return basicQuestions.find(q => q.id === id);
}

/**
 * 次元ごとの質問を取得
 */
export function getQuestionsByDimension(dimension: string): Question[] {
  return basicQuestions.filter(q => q.dimension === dimension);
}
