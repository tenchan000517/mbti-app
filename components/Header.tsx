'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const isTopPage = pathname === '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* ゆめスタロゴ */}
        <Link href="https://yumesuta.com" target="_blank" rel="noopener noreferrer">
          <Image
            src="https://yumesuta.com/img/mainlogo/yumesutalogo.png"
            alt="ゆめスタ"
            width={200}
            height={80}
            className="h-16 md:h-20 w-auto"
          />
        </Link>

        {/* TOPページのナビゲーション */}
        {isTopPage ? (
          <>
            {/* デスクトップナビゲーション */}
            <nav className="hidden md:flex items-center gap-8 ml-auto">
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap">
                MBTIとは
              </a>
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap">
                診断の特徴
              </a>
              <a href="#types" className="text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap">
                タイプ一覧
              </a>
              <Link
                href="/test"
                className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all whitespace-nowrap ml-4"
              >
                診断する
              </Link>
            </nav>

            {/* モバイルハンバーガーメニュー */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
              aria-label="メニュー"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`block h-0.5 w-full bg-gray-900 transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block h-0.5 w-full bg-gray-900 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block h-0.5 w-full bg-gray-900 transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </>
        ) : (
          /* TOPページ以外：MBTI診断リンク */
          <Link href="/" className="text-lg md:text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            MBTI診断
          </Link>
        )}
      </div>

      {/* モバイルメニュー（TOPページのみ） */}
      {isTopPage && mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="flex flex-col p-4 gap-4">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 hover:text-blue-600 py-2"
            >
              MBTIとは
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 hover:text-blue-600 py-2"
            >
              診断の特徴
            </a>
            <a
              href="#types"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 hover:text-blue-600 py-2"
            >
              タイプ一覧
            </a>
            <Link
              href="/test"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all text-center"
            >
              診断する
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
