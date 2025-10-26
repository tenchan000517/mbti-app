import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // 全16タイプのURL
  const types = [
    'intj', 'intp', 'entj', 'entp',
    'infj', 'infp', 'enfj', 'enfp',
    'istj', 'isfj', 'estj', 'esfj',
    'istp', 'isfp', 'estp', 'esfp',
  ];

  const typePages = types.map((type) => ({
    url: `${baseUrl}/types/${type}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // ブログ記事を自動取得
  const blogPages = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.category}/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/test`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...typePages,
    ...blogPages,
  ];
}

// ブログ記事を取得する関数
function getBlogPosts() {
  const contentDir = path.join(process.cwd(), 'content/blog');

  // content/blogディレクトリが存在しない場合は空配列を返す
  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const categories = fs.readdirSync(contentDir);
  const posts: Array<{
    slug: string;
    category: string;
    publishedAt: string;
    updatedAt?: string;
  }> = [];

  categories.forEach((category) => {
    const categoryPath = path.join(contentDir, category);

    // ディレクトリでない場合はスキップ
    if (!fs.statSync(categoryPath).isDirectory()) {
      return;
    }

    const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.md'));

    files.forEach((file) => {
      const filePath = path.join(categoryPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);

      posts.push({
        slug: file.replace('.md', ''),
        category: data.category || category,
        publishedAt: data.publishedAt || new Date().toISOString(),
        updatedAt: data.updatedAt,
      });
    });
  });

  return posts;
}
