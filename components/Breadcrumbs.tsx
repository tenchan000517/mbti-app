interface BreadcrumbItem {
  name: string;
  url: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}${item.url}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="パンくずリスト" className="text-sm text-gray-600 mb-4">
        {items.map((item, index) => (
          <span key={index}>
            {index > 0 && ' > '}
            {index === items.length - 1 ? (
              <span>{item.name}</span>
            ) : (
              <a href={item.url} className="hover:underline">
                {item.name}
              </a>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
