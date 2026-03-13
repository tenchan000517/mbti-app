'use client'

import { useEffect, useState } from 'react'
import { BookOpen, Compass, Star } from 'lucide-react'

const MAIN_URL = 'https://yumesuta.com'

const services = [
  {
    name: 'ゆめマガ',
    description: '企業を見つける',
    href: `${MAIN_URL}/yumemaga`,
    icon: BookOpen,
    color: 'bg-emerald-500',
    hoverColor: 'hover:bg-emerald-600',
    mobileText: 'text-emerald-500',
  },
  {
    name: 'キャリア探索',
    description: '仕事を知る',
    href: `${MAIN_URL}/career-guide`,
    icon: Compass,
    color: 'bg-purple-500',
    hoverColor: 'hover:bg-purple-600',
    mobileText: 'text-purple-500',
  },
  {
    name: 'STAR紹介',
    description: '先輩の声を聞く',
    href: `${MAIN_URL}/stars`,
    icon: Star,
    color: 'bg-amber-500',
    hoverColor: 'hover:bg-amber-600',
    mobileText: 'text-amber-500',
  },
  /* TODO: LINE/Discord コミュニティ */
]

export default function CareerSidebar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Desktop: Fixed right sidebar */}
      <div
        className={`hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 flex-col gap-2 transition-all duration-500 ${
          visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
        }`}
      >
        {services.map((service) => (
          <a
            key={service.href}
            href={service.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${service.color} ${service.hoverColor} text-white rounded-l-lg pl-2 pr-0.5 py-4 w-24 shadow-lg hover:shadow-xl transition-all duration-300 group`}
          >
            <service.icon className="w-6 h-6 mb-1.5 mx-auto" />
            <div className="font-bold text-sm leading-snug text-center">{service.name}</div>
            <div className="text-[9px] leading-normal text-white mt-1 text-center">{service.description}</div>
          </a>
        ))}
      </div>

      {/* Mobile: Fixed bottom bar */}
      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] transition-all duration-500 ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex justify-around items-center h-14">
          {services.map((service) => (
            <a
              key={service.href}
              href={service.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center gap-0.5 ${service.mobileText} transition-colors py-1 px-3`}
            >
              <service.icon className="w-5 h-5" />
              <span className="text-[10px] font-bold">{service.name}</span>
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
