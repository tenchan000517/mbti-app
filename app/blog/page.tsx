import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/blog';
import { CATEGORY_LABELS } from '@/types/blog';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MBTI記事一覧',
  description: 'MBTI診断に関する記事、キャリアガイド、就活対策などの情報をお届けします。',
};

export default function BlogPage() {
  const posts = getAllPosts();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'MBTI診断ブログ',
    description: 'MBTI診断に関する記事、キャリアガイド、就活対策などの情報',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog`,
    publisher: {
      '@type': 'Organization',
      name: '株式会社ゆめスタ',
      url: 'https://yumesuta.com',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-white pt-24 pb-16 px-4 border-b border-gray-200">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              MBTI記事一覧
            </h1>
            <p className="text-lg text-gray-600">
              MBTI診断、キャリア、就活に関する役立つ情報をお届けします
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            {posts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-600 mb-6">記事はまだありません</p>
                <p className="text-gray-500">
                  現在、コンテンツを準備中です。しばらくお待ちください。
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Link
                    key={`${post.category}-${post.slug}`}
                    href={`/blog/${post.category}/${post.slug}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all group"
                  >
                    {/* アイキャッチ画像 */}
                    {post.frontmatter.eyecatch ? (
                      <div className="relative w-full aspect-video bg-gray-100">
                        <Image
                          src={post.frontmatter.eyecatch}
                          alt={post.frontmatter.title}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-video bg-blue-500 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          {CATEGORY_LABELS[post.category]}
                        </span>
                      </div>
                    )}

                    {/* 記事情報 */}
                    <div className="p-6">
                      {/* カテゴリバッジ */}
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-3">
                        {CATEGORY_LABELS[post.category]}
                      </span>

                      {/* タイトル */}
                      <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.frontmatter.title}
                      </h2>

                      {/* 説明 */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {post.frontmatter.description}
                      </p>

                      {/* メタ情報 */}
                      <div className="flex items-center justify-between text-xs text-gray-500">
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
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

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
