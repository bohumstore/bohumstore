"use client";

import React from "react";
import { ShieldCheckIcon, CurrencyDollarIcon, ChartBarIcon } from "@heroicons/react/24/outline";

// 보험 특징 - 이 컴포넌트 내에서만 사용하므로 여기 유지
const insuranceFeatures = [
  {
    icon: <ShieldCheckIcon className="w-6 h-6 text-blue-600" />,
    title: '안전한 보장',
    description: '신뢰할 수 있는 보험사와 함께 안전한 보장을 제공합니다.'
  },
  {
    icon: <CurrencyDollarIcon className="w-6 h-6 text-green-600" />,
    title: '합리적인 가격',
    description: '고객을 위한 최적의 보험료와 보장을 제공합니다.'
  },
  {
    icon: <ChartBarIcon className="w-6 h-6 text-purple-600" />,
    title: '전문 상담',
    description: '보험 전문가의 맞춤형 상담으로 최적의 보험을 선택하세요.'
  }
];

export default function ReasonSection() {
  return (
    <section className="w-full bg-[#f8f8f8] py-16">
      <div className="max-w-5xl mx-auto px-4 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">왜 보험스토어인가요?</h2>
          <p className="text-gray-600">고객을 위한 특별한 서비스를 제공합니다</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insuranceFeatures.map((feature, index) => (
            <div key={index} className="text-center bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
