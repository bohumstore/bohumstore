'use client';

import React from 'react';

interface FloatingButtonsProps {
  /** 카카오톡 상담 URL */
  kakaoUrl?: string;
  /** 계산기 버튼 표시 여부 */
  showCalculator?: boolean;
  /** 상담 신청 버튼 표시 여부 */
  showConsult?: boolean;
  /** 상담 신청 경로 */
  consultHref?: string;
  /** 플로팅 버튼 표시 여부 (모달 열림 등에서 숨김) */
  visible?: boolean;
  /** 추가 className */
  className?: string;
}

/**
 * 플로팅 액션 버튼 모음 (카톡, 계산, 상담, TOP)
 * - 기존 product 상세 페이지에서 반복되던 플로팅 버튼을 공통화
 * - 디자인: 기존 코드 그대로 유지
 */
export default function FloatingButtons({
  kakaoUrl = 'https://pf.kakao.com/_lrubxb/chat',
  showCalculator = false,
  showConsult = false,
  consultHref = '/insurance/a_consult',
  visible = true,
  className = '',
}: FloatingButtonsProps) {
  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex flex-col gap-2 sm:bottom-6 sm:right-6 sm:gap-3 ${className}`}
    >
      {/* 상담 신청 버튼 */}
      {showConsult && (
        <a
          href={consultHref}
          className="group flex min-w-[50px] flex-col items-center gap-1 rounded-2xl border border-blue-100 bg-white px-2 py-2 text-blue-600 shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-300 hover:bg-blue-50 hover:shadow-[0_4px_25px_rgba(0,0,0,0.2)] sm:px-3 sm:py-3"
          aria-label="상담 신청"
        >
          <span className="text-xs font-bold text-gray-600 transition-colors group-hover:text-blue-600">
            상담
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5 animate-pulse text-blue-500 sm:h-6 sm:w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
            />
          </svg>
        </a>
      )}

      {/* 계산하기 버튼 */}
      {showCalculator && (
        <button
          onClick={() => {
            const calculatorBox = document.getElementById('calculator-box');
            if (calculatorBox) {
              calculatorBox.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              });
            }
          }}
          className="flex flex-col items-center gap-1 rounded-2xl border border-gray-200 bg-white px-2 py-2 text-gray-600 shadow-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-xl sm:px-3 sm:py-3"
          aria-label="계산하기"
        >
          <span className="text-xs font-semibold">계산</span>
          <img
            src="/images/icons/icon-calculator.png"
            alt="계산하기"
            className="h-5 w-5 sm:h-6 sm:w-6"
          />
        </button>
      )}

      {/* 카톡상담 버튼 */}
      <button
        onClick={() => window.open(kakaoUrl, '_blank')}
        className="flex flex-col items-center gap-1 rounded-2xl border border-gray-200 bg-white px-2 py-2 text-gray-600 shadow-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-xl sm:px-3 sm:py-3"
        aria-label="카톡상담"
      >
        <span className="text-xs font-semibold">카톡</span>
        <img
          src="/images/icons/icon-kakaotalk.png"
          alt="카톡상담"
          className="h-5 w-5 sm:h-6 sm:w-6"
        />
      </button>

      {/* 맨 위로 버튼 */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="rounded-full border border-gray-200 bg-white p-2 text-gray-600 shadow-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-xl sm:p-3"
        aria-label="맨 위로"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5 sm:h-6 sm:w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}
