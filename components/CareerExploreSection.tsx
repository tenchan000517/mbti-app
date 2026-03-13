import Image from 'next/image'
import { Factory, ArrowRight } from 'lucide-react'
import { getIndustryLinks, CAREER_GUIDE_HUB } from '@/lib/career-industry-mapping'

interface CareerExploreSectionProps {
  careers: string[]
}

export default function CareerExploreSection({ careers }: CareerExploreSectionProps) {
  const industryLinks = getIndustryLinks(careers)

  return (
    <div className="pt-8 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        キャリア探索
      </h2>
      <p className="text-gray-600 mb-6">
        あなたのタイプに合いそうな業界を見てみよう
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {industryLinks.map((industry) => (
          <a
            key={industry.slug}
            href={industry.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={industry.image}
                alt={industry.label}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mb-2">
                {industry.label}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {industry.matchedCareers.map((career) => (
                  <span
                    key={career}
                    className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-medium"
                  >
                    {career}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}

        {/* もっと見るカード */}
        <a
          href={`${CAREER_GUIDE_HUB}#step-know-world`}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 hover:border-emerald-400 flex flex-col items-center justify-center p-6 transition-all duration-200 min-h-[180px]"
        >
          <Factory className="w-8 h-8 text-gray-400 group-hover:text-emerald-500 mb-2 transition-colors" />
          <span className="text-sm font-bold text-gray-500 group-hover:text-emerald-600 transition-colors">
            もっと見る
          </span>
        </a>
      </div>

      {/* キャリア探索ガイド全体リンク */}
      <a
        href={CAREER_GUIDE_HUB}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between bg-gradient-to-r from-emerald-50 to-purple-50 rounded-2xl px-6 py-4 hover:shadow-md transition-all duration-200"
      >
        <div>
          <p className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
            キャリア探索ガイド全体を見る
          </p>
          <p className="text-sm text-gray-500 mt-0.5">
            自分を知る・仕事を知る・見つける — 3ステップで進む
          </p>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors flex-shrink-0" />
      </a>

      {/* TODO: LINE/Discord コミュニティ導線 */}
    </div>
  )
}
