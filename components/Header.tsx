'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Menu, X, LogIn, User } from 'lucide-react';

const MAIN_URL = 'https://yumesuta.com';

// Hamburger 内（旧メインナビ・他サイト導線）
const yumesutaNavigation = [
  { name: 'MBTI診断', href: '/', internal: true, current: true },
  { name: 'キャリア探索', href: `${MAIN_URL}/career-guide`, internal: false },
  { name: 'ゆめマガ', href: `${MAIN_URL}/yumemaga`, internal: false },
  { name: 'STAR紹介', href: `${MAIN_URL}/stars`, internal: false },
];

// メイン位置（旧サブナビ・MBTI 内回遊）
const mbtiNavigation = [
  { name: 'MBTIとは', href: '/#about', anchor: true },
  { name: '診断の特徴', href: '/#features', anchor: true },
  { name: 'タイプ一覧', href: '/#types', anchor: true },
  { name: '記事', href: '/blog', anchor: false },
];

export function Header() {
  const pathname = usePathname();
  const isTopPage = pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // LINE Login session cookie の有無を /api/auth/me で確認
  useEffect(() => {
    let cancelled = false;
    fetch('/api/auth/me', { cache: 'no-store' })
      .then((r) => r.json())
      .then((data: { loggedIn: boolean }) => {
        if (!cancelled) setIsLoggedIn(Boolean(data?.loggedIn));
      })
      .catch(() => {
        if (!cancelled) setIsLoggedIn(false);
      });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  // メニュー外クリックで閉じる
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        menuRef.current &&
        triggerRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  // ルート遷移時はメニューを閉じる
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const loginButtonLabel = isLoggedIn ? 'マイページ' : 'LINE でログイン';
  const loginButtonHref = isLoggedIn ? '/mypage' : '/api/auth/line';
  const LoginIcon = isLoggedIn ? User : LogIn;

  return (
    <div className="sticky top-0 z-50">
      <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center h-16 gap-2 sm:gap-3">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href={MAIN_URL} className="flex items-center">
                <Image
                  src="https://yumesuta.com/img/mainlogo/yumesutalogo.png"
                  alt="ゆめスタロゴ"
                  width={90}
                  height={45}
                  className="object-contain"
                />
              </a>
            </div>

            {/* Desktop: MBTI 内回遊ナビ（中央・lg 以上のみ表示・flex-1 で間を埋める） */}
            <nav className="hidden lg:flex items-center justify-center gap-1 lg:flex-1">
              {mbtiNavigation.map((item) => {
                if (isTopPage && item.anchor) {
                  return (
                    <a
                      key={item.name}
                      href={item.href.replace('/', '')}
                      className="text-blue-700 hover:text-blue-900 hover:bg-blue-50 px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap"
                    >
                      {item.name}
                    </a>
                  );
                }
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-blue-700 hover:text-blue-900 hover:bg-blue-50 px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap"
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* lg 未満用 spacer（中央 nav が hidden の時に右ボタン群を右端に押しやる） */}
            <div className="flex-1 lg:hidden" />

            {/* 診断するボタン（PC + Mobile 共通・常時表示） */}
            <Link
              href="/test"
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              診断する
            </Link>

            {/* ログインボタン（PC + Mobile 共通・icon + 文字常時表示） */}
            <Link
              href={loginButtonHref}
              className="inline-flex items-center gap-1.5 bg-[#06C755] hover:bg-[#05B048] text-white px-3 sm:px-4 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              <LoginIcon className="w-4 h-4" />
              <span>{loginButtonLabel}</span>
            </Link>

            {/* Hamburger */}
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-blue-700 focus:outline-none focus:text-blue-700 shrink-0 p-1.5 rounded-md hover:bg-gray-100 transition-colors"
              aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
              aria-expanded={menuOpen}
            >
              <span className="relative inline-block w-6 h-6">
                <Menu
                  className={`w-6 h-6 absolute inset-0 transition-all duration-200 ${
                    menuOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
                  }`}
                />
                <X
                  className={`w-6 h-6 absolute inset-0 transition-all duration-200 ${
                    menuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
                  }`}
                />
              </span>
            </button>
          </div>

          {/* Hamburger dropdown（trigger の右下に絶対配置・常時 mount で transition） */}
          <div
            ref={menuRef}
            className={`absolute right-2 sm:right-4 lg:right-8 top-full mt-2 w-72 bg-white shadow-xl rounded-xl border border-gray-200 overflow-hidden transition-all duration-200 ease-out origin-top-right ${
              menuOpen
                ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
            }`}
            aria-hidden={!menuOpen}
          >
            <div className="py-2 max-h-[calc(100vh-6rem)] overflow-y-auto">
              {/* Mobile only: MBTI 内回遊ナビ（PC では中央に表示済） */}
              <div className="lg:hidden px-2 pb-2">
                <p className="text-xs text-gray-500 px-2 mb-1 mt-1">MBTI診断 内ページ</p>
                {mbtiNavigation.map((item) => {
                  if (isTopPage && item.anchor) {
                    return (
                      <a
                        key={item.name}
                        href={item.href.replace('/', '')}
                        onClick={() => setMenuOpen(false)}
                        className="block text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium"
                      >
                        {item.name}
                      </a>
                    );
                  }
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              {/* PC + Mobile 共通: ゆめスタ他サービス（旧メインナビ） */}
              <div className="px-2 lg:pt-2 border-t border-gray-100 lg:border-t-0">
                <p className="text-xs text-gray-500 px-2 mb-1 mt-2">ゆめスタ他サービス</p>
                {yumesutaNavigation.map((item) =>
                  item.internal ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block px-3 py-2 rounded-md text-sm font-medium ${
                        item.current
                          ? 'text-orange-600 font-semibold bg-orange-50'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {item.name}
                      {item.current && <span className="text-xs text-gray-500 ml-2">（現在地）</span>}
                    </Link>
                  ) : (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {item.name}
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
