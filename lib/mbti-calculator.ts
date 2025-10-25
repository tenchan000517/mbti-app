import { Answer, Scores, MBTIType, Question, ScorePercentages } from '@/types';

/**
 * 回答からスコアを計算
 *
 * @param answers 回答データ配列
 * @param questions 質問データ配列
 * @returns 各次元のスコア
 */
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
      // 肯定的な回答: その次元にプラス
      scores[dimension] += value;
    } else if (value < 0) {
      // 否定的な回答: 逆の次元にプラス
      const oppositeDimension = getOppositeDimension(dimension);
      scores[oppositeDimension] += Math.abs(value);
    }
    // value === 0（どちらでもない）の場合は何もしない
  });

  return scores;
}

/**
 * 逆の次元を取得
 *
 * @param dimension 次元
 * @returns 逆の次元
 */
function getOppositeDimension(dimension: string): keyof Scores {
  const pairs: { [key: string]: keyof Scores } = {
    'E': 'I', 'I': 'E',
    'S': 'N', 'N': 'S',
    'T': 'F', 'F': 'T',
    'J': 'P', 'P': 'J',
  };
  return pairs[dimension];
}

/**
 * スコアからMBTIタイプを判定
 *
 * @param scores スコア
 * @returns MBTIタイプ
 */
export function determineMBTIType(scores: Scores): MBTIType {
  const dimension1 = scores.E > scores.I ? 'E' : 'I';
  const dimension2 = scores.S > scores.N ? 'S' : 'N';
  const dimension3 = scores.T > scores.F ? 'T' : 'F';
  const dimension4 = scores.J > scores.P ? 'J' : 'P';

  return (dimension1 + dimension2 + dimension3 + dimension4) as MBTIType;
}

/**
 * スコアをパーセンテージに変換
 *
 * @param scores スコア
 * @returns パーセンテージ表示用のスコア
 */
export function getScorePercentages(scores: Scores): ScorePercentages {
  const totalEI = scores.E + scores.I;
  const totalSN = scores.S + scores.N;
  const totalTF = scores.T + scores.F;
  const totalJP = scores.J + scores.P;

  return {
    EI: {
      E: totalEI > 0 ? Math.round((scores.E / totalEI) * 100) : 50,
      I: totalEI > 0 ? Math.round((scores.I / totalEI) * 100) : 50,
    },
    SN: {
      S: totalSN > 0 ? Math.round((scores.S / totalSN) * 100) : 50,
      N: totalSN > 0 ? Math.round((scores.N / totalSN) * 100) : 50,
    },
    TF: {
      T: totalTF > 0 ? Math.round((scores.T / totalTF) * 100) : 50,
      F: totalTF > 0 ? Math.round((scores.F / totalTF) * 100) : 50,
    },
    JP: {
      J: totalJP > 0 ? Math.round((scores.J / totalJP) * 100) : 50,
      P: totalJP > 0 ? Math.round((scores.P / totalJP) * 100) : 50,
    },
  };
}

/**
 * 各次元の確実性をチェック
 * （スコア差が小さい場合、追加質問が必要かを判定）
 *
 * @param scores スコア
 * @param threshold 最小差分（デフォルト: 5）
 * @returns 確実性が低い次元の配列
 */
export function checkCertainty(scores: Scores, threshold: number = 5): string[] {
  const uncertainDimensions: string[] = [];

  if (Math.abs(scores.E - scores.I) < threshold) {
    uncertainDimensions.push('E/I');
  }
  if (Math.abs(scores.S - scores.N) < threshold) {
    uncertainDimensions.push('S/N');
  }
  if (Math.abs(scores.T - scores.F) < threshold) {
    uncertainDimensions.push('T/F');
  }
  if (Math.abs(scores.J - scores.P) < threshold) {
    uncertainDimensions.push('J/P');
  }

  return uncertainDimensions;
}

/**
 * 回答からMBTIタイプを直接判定（ワンステップ）
 *
 * @param answers 回答データ配列
 * @param questions 質問データ配列
 * @returns MBTIタイプ
 */
export function analyzeMBTI(answers: Answer[], questions: Question[]): {
  mbtiType: MBTIType;
  scores: Scores;
  percentages: ScorePercentages;
  uncertainDimensions: string[];
} {
  const scores = calculateScores(answers, questions);
  const mbtiType = determineMBTIType(scores);
  const percentages = getScorePercentages(scores);
  const uncertainDimensions = checkCertainty(scores);

  return {
    mbtiType,
    scores,
    percentages,
    uncertainDimensions,
  };
}
