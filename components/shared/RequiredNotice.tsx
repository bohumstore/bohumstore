import React from 'react';

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
 * - 기존 product 상세 페이지, 메인 페이지에서 반복되던 필수안내사항을 공통화
 * - 디자인: 기존 코드 그대로 유지
 */
export default function RequiredNotice({
  approvalNumber,
  extraNotices,
  className = '',
}: RequiredNoticeProps) {
  return (
    <div className={`w-full ${className}`}>
      {/* 유의사항 (있을 경우) */}
      {extraNotices && extraNotices.length > 0 && (
        <div className="flex w-full justify-center">
          <div className="mb-2 mt-6 w-full max-w-3xl px-6 py-0 text-xs text-gray-800 md:mb-4 md:mt-8 md:max-w-4xl md:text-sm lg:mb-6 lg:mt-10 lg:max-w-5xl">
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
          <hr className="my-4 border-gray-300" />
        </div>
      </div>

      {/* 필수안내사항 */}
      <div className="flex w-full justify-center">
        <div className="mb-2 mt-6 w-full max-w-3xl px-6 py-0 text-xs text-gray-800 md:mb-4 md:mt-8 md:max-w-4xl md:text-sm lg:mb-6 lg:mt-10 lg:max-w-5xl">
          <div className="mb-1 font-bold">[ 필수안내사항 ]</div>
          <div>※ 본 광고는 심의기준을 준수하였으며, 유효기간은 심의일로부터 1년입니다.</div>
          <div className="text-red-500">
            ※ 본계약은 기존 보험계약을 해지하고 새로운 보험계약을 체결하는 과정에서
          </div>
          <div className="text-red-500">
            ① 진행이력, 연령등에 따라 가입이 거절되거나 보험료가 인상될 수 있습니다.
          </div>
          <div className="text-red-500">
            ② 가입 상품에 따라 새로운 면책기간 적용 및 보장 제한 등 기타 불이익이 발생할 수
            있습니다.
          </div>
          {approvalNumber && <div>※ ㈜메타리치 심의필 {approvalNumber}</div>}
        </div>
      </div>
    </div>
  );
}
