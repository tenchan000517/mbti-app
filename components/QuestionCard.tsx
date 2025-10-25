import { Question } from '@/types';

interface QuestionCardProps {
  question: Question;
  selectedValue: number | null;
  onSelect: (value: number) => void;
}

const answerOptions = [
  { value: 2, label: '強く同意する' },
  { value: 1, label: '同意する' },
  { value: 0, label: 'どちらでもない' },
  { value: -1, label: '反対する' },
  { value: -2, label: '強く反対する' },
];

export default function QuestionCard({
  question,
  selectedValue,
  onSelect,
}: QuestionCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
        {question.text}
      </h2>
      <div className="space-y-3">
        {answerOptions.map((option) => (
          <label
            key={option.value}
            className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedValue === option.value
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            }`}
          >
            <input
              type="radio"
              name="answer"
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onSelect(option.value)}
              className="w-5 h-5 text-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            <span className="ml-3 text-base md:text-lg text-gray-700">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
