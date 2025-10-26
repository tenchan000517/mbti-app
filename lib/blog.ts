import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogCategory, BlogFrontmatter } from '@/types/blog';

const blogDirectory = path.join(process.cwd(), 'content/blog');

/**
 * 指定されたカテゴリの全記事を取得
 */
export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  const categoryPath = path.join(blogDirectory, category);

  // ディレクトリが存在しない場合は空配列を返す
  if (!fs.existsSync(categoryPath)) {
    return [];
  }

  const fileNames = fs.readdirSync(categoryPath);

  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(categoryPath, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        category,
        frontmatter: data as BlogFrontmatter,
        content,
      };
    })
    .sort((a, b) => {
      // 日付の降順でソート（新しい記事が先）
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    });

  return posts;
}

/**
 * 全カテゴリの全記事を取得
 */
export function getAllPosts(): BlogPost[] {
  const categories: BlogCategory[] = [
    'basics',
    'career',
    'job-hunting',
    'relationships',
    'trends',
    'growth',
    'corporate',
  ];

  const allPosts = categories.flatMap((category) => getPostsByCategory(category));

  // 日付の降順でソート
  return allPosts.sort((a, b) => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  });
}

/**
 * 特定の記事を取得
 */
export function getPostBySlug(category: BlogCategory, slug: string): BlogPost | null {
  const fullPath = path.join(blogDirectory, category, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    category,
    frontmatter: data as BlogFrontmatter,
    content,
  };
}

/**
 * 全記事のスラッグとカテゴリのパスを取得（静的生成用）
 */
export function getAllPostPaths(): { category: BlogCategory; slug: string }[] {
  const categories: BlogCategory[] = [
    'basics',
    'career',
    'job-hunting',
    'relationships',
    'trends',
    'growth',
    'corporate',
  ];

  const paths: { category: BlogCategory; slug: string }[] = [];

  categories.forEach((category) => {
    const categoryPath = path.join(blogDirectory, category);

    if (!fs.existsSync(categoryPath)) {
      return;
    }

    const fileNames = fs.readdirSync(categoryPath);

    fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .forEach((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        paths.push({ category, slug });
      });
  });

  return paths;
}
