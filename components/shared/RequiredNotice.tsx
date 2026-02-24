'use client';

import React, { useState } from 'react';
import { useResponsive } from '@/hooks/useResponsive';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface RequiredNoticeProps {
  /** 심의필 번호 (예: "25080166호 (2025.08.21~2026.08.20)") */
  approvalNumber?: string;
  /** 추가 유의사항 텍스트 배열 */
  extraNotices?: string[];
  /** 추가 className */
  className?: string;
}

/**
 * 유의사항 + 필수안내사항 박스
 * - 데스크탑: 기존 그대로 표시
 * - 모바일: 토글 아코디언으로 접힘/펼침
 */
export default function RequiredNotice({
  approvalNumber,
  extraNotices,
  className = '',
}: RequiredNoticeProps) {
  const { isMobile } = useResponsive();
  const [isOpen, setIsOpen] = useState(false);

  const noticeContent = (
    <>
      {/* 유의사항 (있을 경우) */}
      {extraNotices && extraNotices.length > 0 && (
        <div className="flex w-full justify-center">
          <div className="mb-2 mt-6 w-full max-w-3xl px-6 py-0 text-xs text-text-secondary md:mb-4 md:mt-8 md:max-w-4xl md:text-sm lg:mb-6 lg:mt-10 lg:max-w-5xl">
            <div className="mb-1 font-bold">[ 유의사항 ]</div>
            {extraNotices.map((notice, index) => (
              <div key={index}>- {notice}</div>
            ))}
          </div>
        </div>
      )}

      {/* 구분선 */}
      <div className="flex w-full justify-center">
        <div className="w-full max-w-3xl px-6 md:max-w-4xl lg:max-w-5xl">
          <hr className="my-4 border-border-default" />
        </div>
      </div>

      {/* 필수안내사항 */}
      <div className="flex w-full justify-center">
        <div className="mb-2 mt-6 w-full max-w-3xl px-6 py-0 text-xs text-text-secondary md:mb-4 md:mt-8 md:max-w-4xl md:text-sm lg:mb-6 lg:mt-10 lg:max-w-5xl">
          <div className="mb-1 font-bold">[ 필수안내사항 ]</div>
          <div>※ 본 광고는 심의기준을 준수하였으며, 유효기간은 심의일로부터 1년입니다.</div>
          <div className="text-status-red">
            ※ 본계약은 기존 보험계약을 해지하고 새로운 보험계약을 체결하는 과정에서
          </div>
          <div className="text-status-red">
            ① 진행이력, 연령등에 따라 가입이 거절되거나 보험료가 인상될 수 있습니다.
          </div>
          <div className="text-status-red">
            ② 가입 상품에 따라 새로운 면책기간 적용 및 보장 제한 등 기타 불이익이 발생할 수
            있습니다.
          </div>
          {approvalNumber && <div>※ ㈜메타리치 심의필 {approvalNumber}</div>}
        </div>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <div className={`w-full py-4 ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-6 text-left"
        >
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-border-default text-xs text-text-disabled">ⓘ</span>
            <span className="body-m">꼭 확인해주세요.</span>
          </div>
          {isOpen ? (
            <ChevronUpIcon className="w-5 h-5 text-text-disabled" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-text-disabled" />
          )}
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="">
            {noticeContent}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full pt-10 pb-4 ${className}`}>
      {noticeContent}
    </div>
  );
}
