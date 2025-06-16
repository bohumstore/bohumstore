'use client';

import Link from 'next/link';
import { useState } from 'react';

interface MenuItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

interface Category {
  name: string;
  items: MenuItem[];
}

const categories: Category[] = [
  {
    name: '보험상품',
    items: [
      { name: '자동차보험', href: '/products/auto' },
      { name: '화재보험', href: '/products/fire' },
      { name: '여행자보험', href: '/products/travel' },
      { name: '실손의료보험', href: '/products/medical' },
    ],
  },
  {
    name: '보험가이드',
    items: [
      { name: '보험가이드', href: '/guide' },
      { name: '보험용어사전', href: '/guide/terms' },
      { name: '보험상담', href: '/guide/consultation' },
      { name: '보험비교', href: '/guide/compare' },
    ],
  },
  {
    name: '고객지원',
    items: [
      { name: '자주묻는질문', href: '/support/faq' },
      { name: '1:1문의', href: '/support/inquiry' },
      { name: '보험금청구', href: '/support/claim' },
      { name: '고객센터', href: '/support/center' },
    ],
  },
  {
    name: '회사소개',
    items: [
      { name: '회사소개', href: '/about' },
      { name: '보험약관', href: '/about/terms' },
      { name: '개인정보처리방침', href: '/about/privacy' },
      { name: '이용약관', href: '/about/usage' },
    ],
  },
];

export default function MegaMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
      >
        <span>메뉴</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-screen bg-white shadow-lg">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-4 gap-8">
              {categories.map((category, index) => (
                <div key={category.name} className="relative group">
                  <div className={`p-6 hover:bg-gray-50 ${index < categories.length - 1 ? 'border-r border-gray-200' : ''}`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {category.name}
                    </h3>
                    <ul className="space-y-3">
                      {category.items.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className="text-gray-600 hover:text-blue-600 flex items-center"
                          >
                            {item.icon && (
                              <span className="mr-2 text-gray-400">{item.icon}</span>
                            )}
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 