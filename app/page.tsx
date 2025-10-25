import Link from 'next/link';
import Image from 'next/image';
import { getAllTypeDescriptions } from '@/lib/type-descriptions';
import { getTypeImage } from '@/lib/type-images';
import { getTypeColors } from '@/lib/type-colors';

export default function Home() {
  const allTypes = getAllTypeDescriptions();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/#website`,
        url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        name: '無料MBTI診断',
        description: '科学的根拠に基づいた無料のMBTI性格診断',
        inLanguage: 'ja',
      },
      {
        '@type': 'Organization',
        '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/#organization`,
        name: '株式会社ゆめスタ',
        url: 'https://yumesuta.com',
        logo: {
          '@type': 'ImageObject',
          url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/logo.png`,
        },
      },
      {
        '@type': 'WebApplication',
        name: '無料MBTI診断',
        description: '就活での自己分析、適職診断、キャリア選択に役立つ無料のMBTI性格診断ツール。30問の質問で16タイプを判定し、あなたの強みと適性を発見できます。',
        applicationCategory: 'LifestyleApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'JPY',
        },
        operatingSystem: 'Any',
        browserRequirements: 'Requires JavaScript',
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'MBTIとは何ですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MBTI（Myers-Briggs Type Indicator）は、個々人が自然と行っている「ものの見方と判断の方法」など、外からは観察できない「認知スタイル」に焦点を当てた性格類型理論です。4つの指標（E/I, S/N, T/F, J/P）の組み合わせで16種類のタイプに分類されます。',
        },
      },
      {
        '@type': 'Question',
        name: 'この診断は無料ですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'はい、完全に無料でご利用いただけます。30問の質問に答えるだけで、あなたのMBTI性格タイプを診断できます。',
        },
      },
      {
        '@type': 'Question',
        name: '診断にかかる時間はどのくらいですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '約5〜10分程度で完了します。30問の質問に直感的に答えていただくだけです。',
        },
      },
      {
        '@type': 'Question',
        name: '就活での自己分析に役立ちますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'はい、MBTI診断は自己理解を深めるのに最適なツールです。あなたの強み、弱み、適職を知ることで、就職活動での自己PRや企業選びに役立ちます。',
        },
      },
      {
        '@type': 'Question',
        name: '16タイプにはどのようなものがありますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'INTJ（建築家）、INTP（論理学者）、ENTJ（指揮官）、ENTP（討論者）、INFJ（提唱者）、INFP（仲介者）、ENFJ（主人公）、ENFP（運動家）、ISTJ（管理者）、ISFJ（擁護者）、ESTJ（幹部）、ESFJ（領事官）、ISTP（巨匠）、ISFP（冒険家）、ESTP（起業家）、ESFP（エンターテイナー）の16タイプがあります。',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            MBTI性格診断
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            科学的根拠に基づく正確な診断
          </p>
          <Link
            href="/test"
            className="inline-block bg-blue-500 text-white px-10 py-4 rounded-lg text-xl font-semibold hover:bg-blue-600 transition-all shadow-lg"
          >
            診断をはじめる
          </Link>
        </div>
      </section>

      {/* MBTIとは Section */}
      <section id="about" className="py-16 px-4 bg-gray-50 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            MBTIとは
          </h2>
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              MBTI（Myers-Briggs Type Indicator）は、外から観察しやすい行動特徴ではなく、
              個々人が自然と行っている「ものの見方と判断の方法」など、
              外からは観察できない「認知スタイル」に焦点を当てた性格類型理論です。
            </p>
            <p className="text-gray-700 leading-relaxed">
              4つの指標（E/I, S/N, T/F, J/P）の組み合わせで、
              16種類のタイプに分類され、自己理解や対人関係の改善に役立ちます。
            </p>
          </div>
        </div>
      </section>

      {/* 診断の特徴 Section */}
      <section id="features" className="py-16 px-4 bg-white scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            診断の特徴
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-500">
              <h3 className="text-xl font-bold text-blue-900 mb-3">
                科学的根拠
              </h3>
              <p className="text-gray-700">
                MBTI理論に基づいた正確な質問で、確実な判定を実現
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-500">
              <h3 className="text-xl font-bold text-purple-900 mb-3">
                詳細な分析
              </h3>
              <p className="text-gray-700">
                4つの次元を多角的に分析し、あなたの性格を正確に診断
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-6 border-2 border-green-500">
              <h3 className="text-xl font-bold text-green-900 mb-3">
                わかりやすい結果
              </h3>
              <p className="text-gray-700">
                視覚的なスコア表示で、直感的に理解できる結果を提供
              </p>
            </div>
            <div className="bg-orange-50 rounded-lg p-6 border-2 border-orange-500">
              <h3 className="text-xl font-bold text-orange-900 mb-3">
                実用的な情報
              </h3>
              <p className="text-gray-700">
                適職診断や相性診断など、実生活に役立つ情報を提供
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4つの指標 Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            あなたを決める4つの要素
          </h2>
          <p className="text-center text-gray-600 mb-10">
            4つの指標の組み合わせで、16種類の性格タイプが決まります
          </p>
          <div className="space-y-6">
            {/* E/I */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1 text-center">
                  <div className="inline-block bg-blue-100 text-blue-700 px-6 py-3 rounded-lg font-bold text-lg">
                    E 外向性
                  </div>
                  <p className="text-sm text-gray-600 mt-2">人と過ごすことで活力を得る</p>
                </div>
                <div className="px-4">
                  <div className="w-px h-16 bg-gray-300"></div>
                </div>
                <div className="flex-1 text-center">
                  <div className="inline-block bg-blue-100 text-blue-700 px-6 py-3 rounded-lg font-bold text-lg">
                    I 内向性
                  </div>
                  <p className="text-sm text-gray-600 mt-2">一人の時間で回復する</p>
                </div>
              </div>
              <p className="text-center text-gray-500 text-sm">エネルギーの方向と源</p>
            </div>

            {/* S/N */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1 text-center">
                  <div className="inline-block bg-purple-100 text-purple-700 px-6 py-3 rounded-lg font-bold text-lg">
                    S 感覚
                  </div>
                  <p className="text-sm text-gray-600 mt-2">具体的な事実を重視</p>
                </div>
                <div className="px-4">
                  <div className="w-px h-16 bg-gray-300"></div>
                </div>
                <div className="flex-1 text-center">
                  <div className="inline-block bg-purple-100 text-purple-700 px-6 py-3 rounded-lg font-bold text-lg">
                    N 直観
                  </div>
                  <p className="text-sm text-gray-600 mt-2">可能性やパターンに着目</p>
                </div>
              </div>
              <p className="text-center text-gray-500 text-sm">情報の収集方法</p>
            </div>

            {/* T/F */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1 text-center">
                  <div className="inline-block bg-green-100 text-green-700 px-6 py-3 rounded-lg font-bold text-lg">
                    T 思考
                  </div>
                  <p className="text-sm text-gray-600 mt-2">論理と客観性を重視</p>
                </div>
                <div className="px-4">
                  <div className="w-px h-16 bg-gray-300"></div>
                </div>
                <div className="flex-1 text-center">
                  <div className="inline-block bg-green-100 text-green-700 px-6 py-3 rounded-lg font-bold text-lg">
                    F 感情
                  </div>
                  <p className="text-sm text-gray-600 mt-2">価値観と人間関係を重視</p>
                </div>
              </div>
              <p className="text-center text-gray-500 text-sm">判断の基準</p>
            </div>

            {/* J/P */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1 text-center">
                  <div className="inline-block bg-orange-100 text-orange-700 px-6 py-3 rounded-lg font-bold text-lg">
                    J 判断
                  </div>
                  <p className="text-sm text-gray-600 mt-2">計画的に進める</p>
                </div>
                <div className="px-4">
                  <div className="w-px h-16 bg-gray-300"></div>
                </div>
                <div className="flex-1 text-center">
                  <div className="inline-block bg-orange-100 text-orange-700 px-6 py-3 rounded-lg font-bold text-lg">
                    P 知覚
                  </div>
                  <p className="text-sm text-gray-600 mt-2">柔軟に対応する</p>
                </div>
              </div>
              <p className="text-center text-gray-500 text-sm">外界への接し方</p>
            </div>
          </div>
        </div>
      </section>

      {/* 16タイプ一覧 Section */}
      <section id="types" className="py-16 px-4 bg-white scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            16のタイプ
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {allTypes.map((type) => {
              const { colors } = getTypeColors(type.type);
              return (
                <Link
                  key={type.type}
                  href={`/types/${type.type.toLowerCase()}`}
                  className={`rounded-lg border-2 border-gray-200 overflow-hidden hover:${colors.border} hover:shadow-lg transition-all cursor-pointer group`}
                >
                  <div className="relative w-full aspect-square">
                    <Image
                      src={getTypeImage(type.type)}
                      alt={`${type.type} - ${type.name}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-orange-400">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            あなたのタイプを知ろう
          </h2>
          <p className="text-xl text-orange-50 mb-8">
            30問の質問に答えて、あなたの性格タイプを診断
          </p>
          <Link
            href="/test"
            className="inline-block bg-white text-orange-600 px-10 py-4 rounded-lg text-xl font-semibold hover:bg-gray-100 transition-all shadow-lg"
          >
            診断をはじめる
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 px-4 border-t border-gray-300">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-700">運営: <a href="https://yumesuta.com" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-500 hover:underline">株式会社ゆめスタ</a></p>
          <p className="text-sm text-gray-600 mt-2">
            ※ このアプリは公式MBTI®の代替ではなく、MBTI理論を参考にした性格診断です
          </p>
        </div>
      </footer>
    </div>
    </>
  );
}
