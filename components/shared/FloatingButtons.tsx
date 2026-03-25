'use client';

import React from 'react';
import { useResponsive } from '@/hooks/useResponsive';

interface FloatingButtonsProps {
  kakaoUrl?: string;
  showCalculator?: boolean;
  showConsult?: boolean;
  consultHref?: string;
  visible?: boolean;
  className?: string;
}

export default function FloatingButtons({
  kakaoUrl = 'https://pf.kakao.com/_lrubxb/chat',
  showCalculator = false,
  showConsult = false,
  visible = true,
  className = '',
}: FloatingButtonsProps) {
  const { isDesktop } = useResponsive();

  if (!visible || !isDesktop) return null;

  const dispatch = (name: string) =>
    window.dispatchEvent(new CustomEvent(name));

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 flex flex-col items-center gap-6 ${className}`}
    >
      {/* 보험료 계산 */}
      {showCalculator && (
        <button
          onClick={() => dispatch('floatingCalculate')}
          className="group flex h-[90px] w-[90px] flex-col items-center justify-center gap-1.5 rounded-full bg-[#1a6ef5] shadow-[0_4px_20px_rgba(26,110,245,0.4)] transition-transform duration-200 hover:scale-105"
          aria-label="보험료 계산"
        >
          <img src="/svgs/common/actions/calculate.svg" alt="" className="h-9 w-9" />
          <span className="text-[11px] font-bold text-white">보험료 계산</span>
        </button>
      )}

      {/* 상담 신청 */}
      {showConsult && (
        <button
          onClick={() => dispatch('floatingConsult')}
          className="group flex h-[90px] w-[90px] flex-col items-center justify-center gap-1.5 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-transform duration-200 hover:scale-105"
          aria-label="상담 신청"
        >
          <img src="/svgs/common/actions/consult.svg" alt="" className="h-9 w-9" />
          <span className="text-[11px] font-bold text-gray-800">상담 신청</span>
        </button>
      )}

      {/* 카카오톡 상담 */}
      <button
        onClick={() => window.open(kakaoUrl, '_blank')}
        className="group flex h-[90px] w-[90px] flex-col items-center justify-center gap-1.5 rounded-full bg-[#FEE500] shadow-[0_4px_20px_rgba(254,229,0,0.5)] transition-transform duration-200 hover:scale-105"
        aria-label="카카오톡 상담"
      >
        <img src="/svgs/common/actions/kakao.svg" alt="" className="h-9 w-9" />
        <span className="text-[11px] font-bold text-gray-900">카카오톡 상담</span>
      </button>

      {/* TOP */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="group flex h-[64px] w-[64px] flex-col items-center justify-center gap-1 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-transform duration-200 hover:scale-105"
        aria-label="맨 위로"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-4 w-4 text-gray-600"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
        <span className="text-[14px] font-bold text-gray-600">TOP</span>
      </button>
    </div>
  );
}
