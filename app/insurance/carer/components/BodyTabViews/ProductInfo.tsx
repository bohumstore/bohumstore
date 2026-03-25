'use client';

import React from 'react';

export default function ProductInfo() {
  return (
    <div className="space-y-10 py-6 md:py-10">
      <section>
        <h3 className="heading-3 text-text-primary mb-6">🏥 간병인사용일당이란?</h3>
        <div className="rounded-xl border-2 border-emerald-200 bg-[#F0FDF4] p-6 md:p-8">
          <p className="body-l text-text-secondary leading-relaxed mb-4">
            질병이나 상해 사고로 인하여 간병이 필요한 상황이 발생했을 때, 간병인을 먼저 고용하고 보험사에 청구하여 보상받는 보험입니다.
          </p>
          <div className="grid gap-4 md:grid-cols-2 mt-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
              <p className="heading-5 text-emerald-700 mb-2">👨‍⚕️ 가족간병 가능</p>
              <p className="body-s text-text-secondary">가족이 직접 간병하는 경우에도 보험금 지급이 가능하여 현실적인 도움을 드립니다.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
              <p className="heading-5 text-emerald-700 mb-2">💰 실손보험 보완</p>
              <p className="body-s text-text-secondary">실비에서 보장하지 않는 간병비를 별도로 지급하여 경제적 부담을 덜어드립니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="heading-3 text-text-primary mb-6">💝 소중한 가족을 위한 준비</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-gray-50 p-6 border border-gray-200">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-2xl">😔</span>
              <h4 className="heading-5 text-text-primary">준비하지 않았을 때</h4>
            </div>
            <ul className="space-y-2 body-s text-text-secondary">
              <li>• 갑작스런 간병비 부담으로 가족 모두가 심리적, 경제적 고통을 겪습니다.</li>
              <li>• 직장을 그만두고 간병에 매달려야 하는 상황이 올 수 있습니다.</li>
              <li>• 충분한 간병 서비스를 받지 못해 환자와 가족 모두 안타까운 상황이 발생합니다.</li>
            </ul>
          </div>
          <div className="rounded-xl border-2 border-emerald-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-2xl">😊</span>
              <h4 className="heading-5 text-text-primary">미리 준비했을 때</h4>
            </div>
            <ul className="space-y-2 body-s text-text-secondary">
              <li>• 경제적 걱정 없이 환자에게 최선의 전문 간병 서비스를 제공할 수 있습니다.</li>
              <li>• 가족들이 각자의 직장과 일상을 유지하며 평온하게 생활할 수 있습니다.</li>
              <li>• 전문 돌봄을 통해 환자의 회복에만 집중할 수 있는 환경이 조성됩니다.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-emerald-50 rounded-2xl p-6 md:p-8 text-center border border-emerald-100">
        <h3 className="heading-4 text-emerald-800 mb-4">이런 분들에게 꼭 필요합니다</h3>
        <div className="grid gap-4 md:grid-cols-2 text-left">
          <div className="bg-white p-4 rounded-lg border border-emerald-200">
            <p className="heading-5 text-emerald-700 mb-1">👥 맞벌이 부부</p>
            <p className="body-s text-text-secondary">부모님 간병을 위해 생업을 중단할 수 없는 바쁜 일상의 맞벌이 가정</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-emerald-200">
            <p className="heading-5 text-emerald-700 mb-1">👤 외동 자녀</p>
            <p className="body-s text-text-secondary">형제자매 없이 혼자서 모든 간병 책임을 짊어져야 하는 외동 자녀분들</p>
          </div>
        </div>
      </section>
    </div>
  );
}
