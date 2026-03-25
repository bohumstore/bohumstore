'use client';

import React from 'react';

export default function Surrender() {
  return (
    <div className="space-y-8 py-6 md:py-10">
      <section>
        <h3 className="heading-3 text-text-primary mb-6">해약환급금 예시</h3>
        <div className="rounded-xl border border-border-default bg-page-bg p-6 text-center">
          <p className="body-l text-text-secondary mb-4 italic">
            "간병인보험은 저축성 보험이 아닌 <span className="text-status-red font-bold">보장성 보험</span>입니다."
          </p>
          <p className="body-m text-text-muted leading-relaxed">
            해약환급금은 납입한 보험료보다 적거나 없을 수 있습니다.<br/>
            정확한 연령별/기간별 환급률은 상담을 통해 확인하실 수 있습니다.
          </p>
        </div>
      </section>

      <div className="space-y-4">
        <div className="bg-white border border-border-default rounded-lg p-4">
          <p className="body-m font-bold text-text-primary mb-1">Q. 중도 해지하면 손해인가요?</p>
          <p className="body-s text-text-secondary">보험계약은 중도 해지 시 납입한 보험료 중에서 위험보험료와 사업비가 차감된 후 환급되므로, 납입 보험료보다 적을 확률이 매우 높습니다.</p>
        </div>
        <div className="bg-white border border-border-default rounded-lg p-4">
          <p className="body-m font-bold text-text-primary mb-1">Q. 무해지/저해지 상품인가요?</p>
          <p className="body-s text-text-secondary">최근 가성비를 높이기 위해 납입 기간 중 해지 시 환급금이 없거나 적은 대신 보험료를 낮춘 상품이 인기가 많습니다. 가입 시 확인이 필요합니다.</p>
        </div>
      </div>
    </div>
  );
}
