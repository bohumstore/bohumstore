"use client";

import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Bars3Icon, XMarkIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

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
      title: "종신보험",
      id: "whole-life",
      subItems: [
        { name: "신한모아더드림Plus종신보험", path: "/insurance/whole-life/shinhan/more-the-dream" },
        { name: "하나로THE연결된종신보험", path: "/insurance/whole-life/hana/hanaro" }
      ]
    },
    {
      title: "연금보험",
      id: "annuity",
      subItems: [
        { name: "KB트리플레벨업연금보험(보증형)", path: "/insurance/annuity/kb/triple-level-up" },
        { name: "KDB행복플러스연금보험(보증형)", path: "/insurance/annuity/kdb/happy-plus" }
      ]
    },
    {
      title: "변액연금보험",
      id: "variable-annuity",
      subItems: [
        { name: "IBK평생보증받는변액연금보험", path: "/insurance/annuity/ibk/lifetime" },
        { name: "KDB행복드림변액연금보험", path: "/insurance/annuity/kdb/happy-dream" }
      ]
    }
  ];

  return (
    <>
      <header className="w-full flex items-center justify-center py-6 px-4 md:px-12 bg-[#f8f8f8] border-b border-gray-200 sticky top-0 z-40 shadow-sm relative">
        {/* 로고 (중앙 정렬) */}
        <Link href="/" className="cursor-pointer">
          <Image src="/bohumstore-logo.png" alt="보험스토어 로고" width={220} height={60} priority className="w-[180px] md:w-[220px] h-auto" />
        </Link>

        {/* 햄버거 메뉴 버튼 (우측 끝) */}
        <button 
          onClick={toggleMenu}
          className="absolute right-4 md:right-12 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="메뉴 열기"
        >
          <Bars3Icon className="w-7 h-7 md:w-8 md:h-8" />
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
          <div className="relative w-[80%] max-w-[320px] h-full bg-white shadow-2xl flex flex-col animate-slide-in-right">
            {/* 사이드바 헤더 */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <span className="font-bold text-lg text-gray-800">전체 메뉴</span>
              <button 
                onClick={closeMenu}
                className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
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
                      className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors group"
                    >
                      <span className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{item.title}</span>
                      {expandedMenu === item.id ? (
                        <ChevronUpIcon className="w-5 h-5 text-blue-600" />
                      ) : (
                        <ChevronDownIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                      )}
                    </button>
                    
                    {/* 서브 메뉴 */}
                    <div 
                      className={`bg-gray-50 overflow-hidden transition-all duration-300 ${
                        expandedMenu === item.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <ul className="py-2 px-6 space-y-1">
                        {item.subItems.map((subItem, idx) => (
                          <li key={idx}>
                            <Link 
                              href={subItem.path}
                              onClick={closeMenu}
                              className="block py-2.5 text-sm text-gray-600 hover:text-blue-600 hover:font-medium transition-colors pl-2 border-l-2 border-transparent hover:border-blue-300"
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
                <li className="border-t border-gray-100 mt-2">
                  <Link 
                    href="/insurance/a_consult"
                    onClick={closeMenu}
                    className="flex items-center justify-between px-6 py-4 hover:bg-blue-50 transition-colors group"
                  >
                    <span className="font-bold text-gray-800 group-hover:text-blue-700">상담신청</span>
                    <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-700" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* 하단 정보 (옵션) */}
            <div className="p-6 bg-gray-50 border-t border-gray-100">
              <div className="text-xs text-gray-500 text-center">
                © Bohumstore. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out forwards;
        }
      `}</style>
    </>
  )
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  )
}
