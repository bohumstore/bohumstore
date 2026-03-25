'use client';

import React from 'react';
import StandardProductNotice from '@/components/product/StandardProductNotice';

interface NoticeProps {
  open: boolean;
  onClose: () => void;
}

export default function Notice({ open, onClose }: NoticeProps) {
  return (
    <StandardProductNotice
      open={open}
      onClose={onClose}
    >
      <div className="mt-4 space-y-4">
        {[
          '본 안내물은 지면관계상 상품의 개략적인 내용을 요약·정리한 것이오니 가입 전에 상품의 약관 및 상품설명서를 자세히 읽어보시기 바랍니다.',
          '가입 시 보험계약의 기본사항(보험 상품명, 보험기간, 보험료, 보험료 납입기간 등)을 반드시 확인하시기 바랍니다.',
          '피보험자의 과거 건강상태, 직업 등 계약 전 알릴 의무를 사실대로 고지하지 않으면 보험금 지급이 제한되거나 계약이 해지될 수 있습니다.',
          '본 상품은 간병비를 보장하는 보장성보험으로, 저축성보험과 비교하여 위험보험료 및 사업비가 더 많이 차감되므로 저축 목적에는 적합하지 않습니다.',
          '해약환급금은 경과기간 및 해약공제에 따라 납입보험료보다 적거나 없을 수 있습니다.',
          '이 보험계약은 예금자보호법에 따라 해약환급금(또는 만기 시 보험금)에 기타지급금을 합한 금액이 1인당 "1억원까지"(본 보험회사의 여타 보호상품과 합산) 보호됩니다.',
          '이와 별도로 본 보험회사 보호상품의 사고보험금을 합산한 금액이 1인당 "1억원까지" 보호됩니다. 단, 보험계약자 및 보험료 납부자가 법인이면 보호되지 않습니다.',
          '본 상품은 무배당 상품으로, 배당금이 지급되지 않습니다.',
        ].map((notice, i) => (
          <div key={i} className="flex gap-2 text-left">
            <span className="text-text-muted flex-shrink-0">•</span>
            <p className="body-s text-text-secondary">{notice}</p>
          </div>
        ))}
      </div>
    </StandardProductNotice>
  );
}
