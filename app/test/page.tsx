'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProgressBar from '@/components/ProgressBar';
import QuestionCard from '@/components/QuestionCard';
import { basicQuestions } from '@/lib/questions';
import { Answer } from '@/types';

export default function TestPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const currentQuestion = basicQuestions[currentIndex];
  const isLastQuestion = currentIndex === basicQuestions.length - 1;

  // 現在の質問に対する既存の回答を取得
  const existingAnswer = answers.find(
    (a) => a.questionId === currentQuestion.id
  );

  // 既存の回答がある場合、それを選択状態にする
  const displayedValue = selectedValue ?? existingAnswer?.value ?? null;

  const handleSelect = (value: number) => {
    setSelectedValue(value);
  };

  const handleNext = () => {
    if (selectedValue === null && !existingAnswer) return;

    const answerValue = selectedValue ?? existingAnswer!.value;

    // 回答を保存または更新
    const newAnswers = answers.filter((a) => a.questionId !== currentQuestion.id);
    newAnswers.push({
      questionId: currentQuestion.id,
      value: answerValue,
    });
    setAnswers(newAnswers);

    if (isLastQuestion) {
      // 最後の質問なら結果ページへ
      // 回答データをlocalStorageに保存して遷移
      localStorage.setItem('basicAnswers', JSON.stringify(newAnswers));
      router.push('/result/basic');
    } else {
      // 次の質問へ
      setCurrentIndex(currentIndex + 1);
      setSelectedValue(null);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedValue(null);
    }
  };

  const canProceed = selectedValue !== null || existingAnswer !== undefined;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            MBTI性格診断
          </h1>
          <ProgressBar current={currentIndex + 1} total={basicQuestions.length} />
        </div>

        <QuestionCard
          question={currentQuestion}
          selectedValue={displayedValue}
          onSelect={handleSelect}
        />

        <div className="flex justify-between mt-6">
          <button
            onClick={handleBack}
            disabled={currentIndex === 0}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              currentIndex === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
          >
            戻る
          </button>
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              canProceed
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isLastQuestion ? '結果を見る' : '次へ'}
          </button>
        </div>
      </div>
    </div>
  );
}
