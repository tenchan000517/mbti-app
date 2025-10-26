import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getPostBySlug, getAllPostPaths } from '@/lib/blog';
import { CATEGORY_LABELS, BlogCategory } from '@/types/blog';
import type { Metadata } from 'next';
import { remark } from 'remark';
import html from 'remark-html';

type Props = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const paths = getAllPostPaths();
  return paths.map((path) => ({
    category: path.category,
    slug: path.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const post = getPostBySlug(category as BlogCategory, slug);

  if (!post) {
    return {
      title: '記事が見つかりません',
    };
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    keywords: post.frontmatter.keywords || [],
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author],
      images: post.frontmatter.eyecatch ? [post.frontmatter.eyecatch] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { category, slug } = await params;
  const post = getPostBySlug(category as BlogCategory, slug);

  if (!post) {
    notFound();
  }

  // MarkdownをHTMLに変換
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(post.content);
  const contentHtml = processedContent.toString();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    author: {
      '@type': 'Person',
      name: post.frontmatter.author,
    },
    publisher: {
      '@type': 'Organization',
      name: '株式会社ゆめスタ',
      url: 'https://yumesuta.com',
    },
    image: post.frontmatter.eyecatch || '',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog/${category}/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-gray-50">
        <article className="pt-24 pb-16">
          {/* アイキャッチ画像 */}
          {post.frontmatter.eyecatch && (
            <div className="w-full max-w-2xl mx-auto mb-8 px-4">
              <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={post.frontmatter.eyecatch}
                  alt={post.frontmatter.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          )}

          {/* 記事ヘッダー */}
          <div className="max-w-4xl mx-auto px-4 mb-8">
            {/* パンくずリスト */}
            <nav className="text-sm text-gray-600 mb-4">
              <Link href="/" className="hover:text-blue-600">
                ホーム
              </Link>
              {' / '}
              <Link href="/blog" className="hover:text-blue-600">
                記事一覧
              </Link>
              {' / '}
              <span className="text-gray-900">{post.frontmatter.title}</span>
            </nav>

            {/* カテゴリバッジ */}
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                {CATEGORY_LABELS[post.category]}
              </span>
            </div>

            {/* タイトル */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.frontmatter.title}
            </h1>

            {/* メタ情報 */}
            <div className="flex items-center gap-4 text-sm text-gray-600 pb-6 border-b border-gray-200">
              <span>{post.frontmatter.author}</span>
              <time dateTime={post.frontmatter.date}>
                {new Date(post.frontmatter.date).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </div>

          {/* 記事本文 */}
          <div className="max-w-4xl mx-auto px-4">
            <div
              className="blog-content text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>

          {/* CTA */}
          <div className="max-w-4xl mx-auto px-4 mt-16">
            <div className="bg-blue-500 rounded-lg p-8 text-center text-white">
              <h2 className="text-2xl font-bold mb-4">あなたのMBTIタイプを診断しよう</h2>
              <p className="mb-6">
                30問の質問に答えて、あなたの性格タイプと適職を発見
              </p>
              <Link
                href="/test"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all"
              >
                無料診断を始める
              </Link>
            </div>
          </div>

          {/* 記事一覧へ戻る */}
          <div className="max-w-4xl mx-auto px-4 mt-8 text-center">
            <Link href="/blog" className="text-blue-600 hover:underline">
              ← 記事一覧へ戻る
            </Link>
          </div>
        </article>

        {/* Footer */}
        <footer className="bg-gray-50 py-8 px-4 border-t border-gray-300">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-700">
              運営:{' '}
              <a
                href="https://yumesuta.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-500 hover:underline"
              >
                株式会社ゆめスタ
              </a>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
