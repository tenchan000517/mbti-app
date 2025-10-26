import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';
import { CATEGORY_LABELS } from '@/types/blog';

type BlogCardProps = {
  post: BlogPost;
};

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.category}/${post.slug}`}
      className="block group hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden bg-white border border-gray-200"
    >
      {/* アイキャッチ画像 */}
      {post.frontmatter.eyecatch && (
        <div className="relative w-full aspect-video bg-gray-100 overflow-hidden">
          <Image
            src={post.frontmatter.eyecatch}
            alt={post.frontmatter.title}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* カード本体 */}
      <div className="p-4">
        {/* カテゴリバッジ */}
        <div className="mb-2">
          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
            {CATEGORY_LABELS[post.category]}
          </span>
        </div>

        {/* タイトル */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {post.frontmatter.title}
        </h3>

        {/* 説明 */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {post.frontmatter.description}
        </p>

        {/* メタ情報 */}
        <div className="flex items-center gap-3 text-xs text-gray-500">
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
  );
}
