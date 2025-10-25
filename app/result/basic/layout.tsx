import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'あなたの診断結果',
  description: 'MBTI性格診断の結果を確認しましょう',
  robots: {
    index: false, // 結果ページは検索結果に表示しない
    follow: true,
  },
};

export default function ResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
