'use client'

import { useEffect, useState } from 'react'
import { Compass } from 'lucide-react'

const CAREER_GUIDE_URL = 'https://yumesuta.com/career-guide'

export default function CareerFloatingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`hidden lg:block fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      <a
        href={CAREER_GUIDE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-4 py-2.5 rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        <Compass className="w-5 h-5" />
        キャリア探索を始める
      </a>
    </div>
  )
}
