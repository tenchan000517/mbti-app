'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
const MAIN_URL = 'https://yumesuta.com';

const mainNavigation = [
  { name: 'キャリア探索', href: `${MAIN_URL}/career-guide` },
  { name: 'ゆめマガ', href: `${MAIN_URL}/yumemaga` },
  { name: 'STAR紹介', href: `${MAIN_URL}/stars` },
];

const mbtiNavigation = [
  { name: 'MBTIとは', href: '/#about', anchor: true },
  { name: '診断の特徴', href: '/#features', anchor: true },
  { name: 'タイプ一覧', href: '/#types', anchor: true },
  { name: '記事', href: '/blog', anchor: false },
];

export function Header() {
  const pathname = usePathname();
  const isTopPage = pathname === '/';
  const [mainMenuOpen, setMainMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50">
      {/* メインヘッダー（yumesutaHPと統一） */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href={MAIN_URL} className="flex items-center">
                <Image
                  src="https://yumesuta.com/img/mainlogo/yumesutalogo.png"
                  alt="ゆめスタロゴ"
                  width={120}
                  height={60}
                  className="object-contain pt-2"
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {mainNavigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-orange-600 px-2 py-2 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMainMenuOpen(!mainMenuOpen)}
                className="text-gray-700 hover:text-orange-600 focus:outline-none focus:text-orange-600"
                aria-label={mainMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mainMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mainMenuOpen && (
            <div className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                {mainNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-orange-600 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setMainMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* MBTI サブナビ（リッチメニュー） */}
      <nav className="bg-blue-50 border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 sm:gap-4 py-2 overflow-x-auto">
            {mbtiNavigation.map((item) => {
              if (isTopPage && item.anchor) {
                return (
                  <a
                    key={item.name}
                    href={item.href.replace('/', '')}
                    className="text-blue-700 hover:text-blue-900 hover:bg-blue-100 px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 whitespace-nowrap"
                  >
                    {item.name}
                  </a>
                );
              }
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-blue-700 hover:text-blue-900 hover:bg-blue-100 px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 whitespace-nowrap"
                >
                  {item.name}
                </Link>
              );
            })}
            <Link
              href="/test"
              className="bg-blue-500 text-white px-5 py-1.5 rounded-full text-sm font-semibold hover:bg-blue-600 transition-all whitespace-nowrap ml-2"
            >
              診断する
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
