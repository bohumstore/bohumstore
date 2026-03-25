'use client';

import React from 'react';

export default function CoverageDetails() {
  const coverages = [
    { name: '간병인 사용 일당 (질병/상해)', info: '일반 병원 입원 시 간병인 사용 비용 지급', amount: '하루 최대 15~20만원' },
    { name: '요양병원 간병인 사용 일당', info: '요양병원 입원 시 간병인 사용 비용 지급', amount: '하루 최대 5~6만원' },
    { name: '간호간병 통합 서비스', info: '간호간병 통합 서비스 병동 이용 시 지급', amount: '하루 최대 7만원' },
    { name: '가족간병 보장', info: '가족이 직접 간병할 경우에도 정해진 일당 지급', amount: '동일 보장 적용' },
  ];

  return (
    <div className="space-y-8 py-6 md:py-10">
      <section>
        <h3 className="heading-3 text-text-primary mb-6">주요 보장 내용</h3>
        <div className="overflow-hidden rounded-xl border border-border-default">
          <table className="w-full text-left">
            <thead className="bg-page-bg">
              <tr>
                <th className="px-4 py-4 button-s text-text-secondary border-b border-border-default">보장 항목</th>
                <th className="px-4 py-4 button-s text-text-secondary border-b border-border-default">내용</th>
                <th className="hidden px-4 py-4 button-s text-text-secondary border-b border-border-default md:table-cell">가입 금액</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-default">
              {coverages.map((item, index) => (
                <tr key={index} className="hover:bg-page-bg/50 transition-colors">
                  <td className="px-4 py-4 body-m font-bold text-text-primary">{item.name}</td>
                  <td className="px-4 py-4">
                    <div className="body-m text-text-secondary">{item.info}</div>
                    <div className="mt-1 body-s font-bold text-emerald-600 md:hidden">{item.amount}</div>
                  </td>
                  <td className="hidden px-4 py-4 body-m font-bold text-emerald-600 md:table-cell">{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 caption-r text-text-muted">
          * 상기 가입금액은 가입연령, 성별, 가입조건에 따라 달라질 수 있습니다.
        </p>
      </section>

      <section className="bg-page-bg rounded-xl p-6">
        <h4 className="heading-5 text-text-primary mb-3">📋 보상 청구 방법</h4>
        <div className="space-y-2 body-m text-text-secondary">
          <p>1. 간병인 업체 또는 개인 간병인을 통해 서비스를 이용합니다.</p>
          <p>2. 서비스 이용 후 결제 영수증 또는 확인서를 발급받습니다.</p>
          <p>3. 보험사에 서류를 제출하면 영업일 기준 3일 이내에 보험금이 지급됩니다.</p>
        </div>
      </section>
    </div>
  );
}
