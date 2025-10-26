export type BlogCategory =
  | 'basics'
  | 'career'
  | 'job-hunting'
  | 'relationships'
  | 'trends'
  | 'growth'
  | 'corporate';

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  author: string;
  category: BlogCategory;
  tags?: string[];
  eyecatch?: string;
  keywords?: string[];
}

export interface BlogPost {
  slug: string;
  category: BlogCategory;
  frontmatter: BlogFrontmatter;
  content: string;
}

export const CATEGORY_LABELS: Record<BlogCategory, string> = {
  basics: 'MBTI基礎知識',
  career: 'タイプ別キャリアガイド',
  'job-hunting': '就活・面接対策',
  relationships: '人間関係・相性',
  trends: 'トレンド・最新情報',
  growth: '成長・自己啓発',
  corporate: '企業・組織分析',
};
