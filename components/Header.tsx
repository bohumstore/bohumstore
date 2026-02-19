'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/shared/Button';

export default function Header() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

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
      <header
        className="sticky top-0 z-40 flex w-full items-center justify-between bg-[var(--background)] px-[73px] py-[24px]"
        onMouseLeave={() => {
            setHoveredCategory(null);
            setIsMegaMenuOpen(false);
        }}
      >
        <Link href="/" className="cursor-pointer">
          <Image
            src="/images/logos/bohumstore-logo.png"
            alt="보험스토어 로고"
            width={130}
            height={32}
          />
        </Link>
        <div className='hidden md:flex justify-between gap-[24px] h-full items-center'>
            {menuItems.map((item) => (
                <div
                    key={item.id}
                    className={`flex items-center w-[100px] justify-center heading-5 cursor-pointer transition-colors duration-200 ${hoveredCategory === item.id ? 'text-blue-600' : 'text-gray-900'}`}
                    onMouseEnter={() => {
                        setHoveredCategory(item.id);
                        setIsMegaMenuOpen(true);
                    }}
                >
                    {item.title}
                </div>
            ))}
        </div>
        <Link href="/insurance/a_consult">
          <Button text="상담 신청" />
        </Link>
        <div
            className={`absolute left-0 top-full w-full bg-white shadow-xl border-t border-gray-100 transition-all duration-300 ease-in-out overflow-hidden z-[-1] ${
                isMegaMenuOpen ? 'max-h-[500px] opacity-100 visible' : 'max-h-0 opacity-0 invisible'
            }`}
        >
            <div className="mx-auto w-full max-w-[1440px] px-[73px] py-10">
                <div className="flex gap-8">
                    <div className="flex-1 grid grid-cols-4 gap-4">
                        {menuItems.map((category) => (
                            <div
                                key={category.id}
                                className={`p-6 rounded-xl transition-all duration-200 ${
                                    hoveredCategory === category.id
                                    ? 'bg-blue-50/50 scale-[1.02] shadow-sm'
                                    : 'hover:bg-gray-50'
                                }`}
                                onMouseEnter={() => setHoveredCategory(category.id)}
                            >
                                <h3 className={`text-lg font-bold mb-4 ${
                                    hoveredCategory === category.id ? 'text-blue-700' : 'text-gray-900'
                                }`}>
                                    {category.title}
                                </h3>
                                <ul className="space-y-3">
                                    {category.subItems.map((subItem, idx) => (
                                        <li key={idx}>
                                            <Link
                                                href={subItem.path}
                                                className={`text-sm block py-1 transition-colors ${
                                                    hoveredCategory === category.id
                                                    ? 'text-gray-700 font-medium hover:text-blue-600'
                                                    : 'text-gray-500 hover:text-gray-900'
                                                }`}
                                            >
                                                {subItem.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="w-[420px] shrink-0">
                        <div className="h-full rounded-2xl bg-brand-primary-soft p-10 relative overflow-hidden group cursor-pointer border border-brand-primary-soft">
                            <div className="relative z-10">
                                <h3 className="text-[28px] font-extrabold text-brand-primary tracking-tight mb-3">
                                    보험이 어렵다면
                                </h3>
                                <p className="text-text-muted text-lg mb-8 leading-snug font-medium">
                                    보험스토어 보험 전문가에게<br/>
                                    부담없이 물어보세요!
                                </p>
                                <Link href="/insurance/a_consult">
                                    <button className="bg-brand-primary text-white px-8 py-3.5 rounded-xl text-lg font-bold shadow-[0_4px_12px_rgba(31,111,235,0.25)] transition-all hover:bg-brand-primary-hover hover:shadow-[0_6px_16px_rgba(31,111,235,0.35)] active:scale-95">
                                        상담하기
                                    </button>
                                </Link>
                            </div>
                            <div className="absolute right-0 bottom-0 w-[240px] h-[220px]">
                                <Image
                                    src="/svgs/header-expanded-counsel.svg"
                                    alt="상담 캐릭터"
                                    fill
                                    className="object-contain object-right-bottom transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </header>
    </>


  );
}
