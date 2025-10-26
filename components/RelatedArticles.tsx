import { BlogPost } from '@/types/blog';
import BlogCard from './BlogCard';

type RelatedArticlesProps = {
  posts: BlogPost[];
};

export default function RelatedArticles({ posts }: RelatedArticlesProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">関連記事</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={`${post.category}-${post.slug}`} post={post} />
        ))}
      </div>
    </section>
  );
}
