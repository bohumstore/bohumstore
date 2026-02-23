'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface PageHeaderProps {
  /** 뒤로가기 링크 경로 (기본: "/") */
  backHref?: string;
  /** 뒤로가기 링크 텍스트 (기본: "메인으로 돌아가기") */
  backLabel?: string;
  /** 추가 className */
  className?: string;
}

/**
 * 페이지 상단 헤더 (로고 + 뒤로가기)
 * - 기존 annuity/page.tsx, whole-life/page.tsx 등에서 반복되던 헤더를 공통화
 */
export default function PageHeader({
  backHref = '/',
  backLabel = '메인으로 돌아가기',
  className = '',
}: PageHeaderProps) {
  return (
    <header className={`border-b bg-white shadow-sm ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-6">
          <Link href={backHref} className="flex items-center text-gray-600 hover:text-blue-600">
            <ArrowLeftIcon className="mr-2 h-5 w-5" />
            {backLabel}
          </Link>
          <div className="ml-8">
            <Image
              src="/bohumstore-logo.png"
              alt="보험스토어"
              width={150}
              height={40}
              className="h-8 w-auto"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
