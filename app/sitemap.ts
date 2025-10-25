import { MetadataRoute } from 'next';

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
  ];
}
