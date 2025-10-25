interface ScoreBarProps {
  leftLabel: string;
  rightLabel: string;
  leftPercentage: number;
  rightPercentage: number;
  color: string;
}

const colorClasses: { [key: string]: string } = {
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
  green: 'bg-green-500',
  orange: 'bg-orange-500',
};

export default function ScoreBar({
  leftLabel,
  rightLabel,
  leftPercentage,
  rightPercentage,
  color,
}: ScoreBarProps) {
  const bgColorClass = colorClasses[color] || 'bg-blue-500';
  const winner = leftPercentage > rightPercentage ? leftLabel : rightLabel;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span
          className={`text-sm font-semibold ${
            leftPercentage > rightPercentage ? 'text-gray-900' : 'text-gray-500'
          }`}
        >
          {leftLabel} ({leftPercentage}%)
        </span>
        <span
          className={`text-sm font-semibold ${
            rightPercentage > leftPercentage ? 'text-gray-900' : 'text-gray-500'
          }`}
        >
          {rightLabel} ({rightPercentage}%)
        </span>
      </div>
      <div className="flex h-6 rounded-full overflow-hidden bg-gray-200">
        <div
          className={`${bgColorClass} opacity-60 transition-all duration-300`}
          style={{ width: `${leftPercentage}%` }}
        />
        <div
          className={`${bgColorClass} transition-all duration-300`}
          style={{ width: `${rightPercentage}%` }}
        />
      </div>
      <p className="text-center mt-2 text-sm text-gray-700">
        判定: <span className="font-bold">{winner}型</span>
      </p>
    </div>
  );
}
