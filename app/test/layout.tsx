import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MBTI診断テスト開始',
  description: '30問の質問に答えて、あなたのMBTI性格タイプを診断しましょう。科学的根拠に基づいた正確な判定を提供します。就活での自己分析、適職診断に最適。',
  openGraph: {
    title: 'MBTI診断テスト開始 | 無料MBTI診断',
    description: '30問の質問に答えて、あなたのMBTI性格タイプを診断',
  },
};

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
