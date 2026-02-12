'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  // 메뉴 상태 변경 시 커스텀 이벤트 발생 (플로팅 버튼 숨김용)
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('headerMenuChange', { detail: { isOpen: isMenuOpen } }));
  }, [isMenuOpen]);

  // 모바일 메뉴 뒤로가기 버튼 지원
  React.useEffect(() => {
    if (isMenuOpen) {
      // 메뉴가 열릴 때 현재 상태를 히스토리에 추가
      window.history.pushState({ menuOpen: true }, '');

      const handlePopState = () => {
        // 뒤로가기 실행 시 메뉴 닫기
        setIsMenuOpen(false);
        setExpandedMenu(null);
      };

      window.addEventListener('popstate', handlePopState);

      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleSubMenu = (menu: string) => {
    if (expandedMenu === menu) {
      setExpandedMenu(null);
    } else {
      setExpandedMenu(menu);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setExpandedMenu(null);
  };

  const menuItems = [
    {
      title: '건강보험',
      id: 'health',
      subItems: [{ name: '간병인보험', path: '/insurance/carer' }],
    },
    {
      title: '종신보험',
      id: 'whole-life',
      subItems: [
        { name: '메트라이프달러종신보험Plus', path: '/insurance/whole-life/metlife/usd' },
        {
          name: '신한모아더드림Plus종신보험',
          path: '/insurance/whole-life/shinhan/more-the-dream',
        },
        { name: '하나로THE연결된종신보험', path: '/insurance/whole-life/hana/hanaro' },
      ],
    },
    {
      title: '연금보험',
      id: 'annuity',
      subItems: [
        { name: 'KB트리플레벨업연금보험(보증형)', path: '/insurance/annuity/kb/triple-level-up' },
        { name: 'KDB행복플러스연금보험(보증형)', path: '/insurance/annuity/kdb/happy-plus' },
      ],
    },
    {
      title: '변액연금보험',
      id: 'variable-annuity',
      subItems: [
        { name: 'IBK평생보증받는변액연금보험', path: '/insurance/annuity/ibk/lifetime' },
        { name: 'KDB행복드림변액연금보험', path: '/insurance/annuity/kdb/happy-dream' },
      ],
    },
  ];

  return (
    <>
      <header className="relative sticky top-0 z-40 flex w-full items-center justify-center border-b border-gray-200 bg-[#f8f8f8] px-4 py-6 shadow-sm md:px-12">
        {/* 로고 (중앙 정렬) */}
        <Link href="/" className="cursor-pointer">
          <Image
            src="/bohumstore-logo.png"
            alt="보험스토어 로고"
            width={220}
            height={60}
            priority
            className="h-auto w-[180px] md:w-[220px]"
          />
        </Link>

        {/* 햄버거 메뉴 버튼 (우측 끝) */}
        <button
          onClick={toggleMenu}
          className="absolute right-4 flex flex-col items-center rounded-lg p-1 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 md:right-12"
          aria-label="메뉴 열기"
        >
          <Bars3Icon className="h-6 w-6 md:h-7 md:w-7" />
          <span className="mt-0.5 text-[10px] font-medium md:text-xs">메뉴</span>
        </button>
      </header>

      {/* 사이드바 메뉴 오버레이 */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* 배경 dim 처리 (클릭 시 닫힘) */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={closeMenu}
          ></div>

          {/* 사이드바 패널 */}
          <div className="animate-slide-in-right relative flex h-full w-[80%] max-w-[320px] flex-col bg-white shadow-2xl">
            {/* 사이드바 헤더 */}
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <span className="text-lg font-bold text-gray-800">전체 메뉴</span>
              <button
                onClick={closeMenu}
                className="rounded-full p-2 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* 메뉴 목록 */}
            <div className="flex-1 overflow-y-auto py-4">
              <ul className="flex flex-col">
                {/* 상품 메뉴들 */}
                {menuItems.map((item) => (
                  <li key={item.id} className="border-b border-gray-50 last:border-none">
                    <button
                      onClick={() => toggleSubMenu(item.id)}
                      className="group flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-gray-50"
                    >
                      <span className="font-bold text-gray-800 transition-colors group-hover:text-blue-600">
                        {item.title}
                      </span>
                      {expandedMenu === item.id ? (
                        <ChevronUpIcon className="h-5 w-5 text-blue-600" />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                      )}
                    </button>

                    {/* 서브 메뉴 */}
                    <div
                      className={`overflow-hidden bg-gray-50 transition-all duration-100 ${
                        expandedMenu === item.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <ul className="space-y-1 px-6 py-2">
                        {item.subItems.map((subItem, idx) => (
                          <li key={idx}>
                            <Link
                              href={subItem.path}
                              onClick={closeMenu}
                              className="block border-l-2 border-transparent py-2.5 pl-2 text-sm text-gray-600 transition-colors hover:border-blue-300 hover:font-medium hover:text-blue-600"
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}

                {/* 상담신청 메뉴 (단독) */}
                <li className="mt-2 border-t border-gray-100">
                  <Link
                    href="/insurance/a_consult"
                    onClick={closeMenu}
                    className="group flex items-center justify-between px-6 py-4 transition-colors hover:bg-blue-50"
                  >
                    <span className="font-bold text-gray-800 group-hover:text-blue-700">
                      상담신청
                    </span>
                    <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-700" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* 하단 정보 (옵션) */}
            <div className="border-t border-gray-100 bg-gray-50 p-6">
              <div className="text-center text-xs text-gray-500">
                © Bohumstore. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.1s ease-out forwards;
        }
      `}</style>
    </>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}
