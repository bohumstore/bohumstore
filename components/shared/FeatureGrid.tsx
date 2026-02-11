import React, { ReactNode } from "react";
import { FeatureItem } from "../../types/product";

interface FeatureGridProps {
  /** 섹션 제목 (예: "연금보험의 특징") */
  title: string;
  /** 특징 배열 */
  features: FeatureItem[];
  /** 추가 className */
  className?: string;
}

/**
 * 특징/장점 그리드 섹션 (3열)
 * - 기존 annuity/page.tsx, whole-life/page.tsx에서 반복되던 특징 섹션을 공통화
 * - 디자인: 기존 코드 그대로 유지
 */
export default function FeatureGrid({
  title,
  features,
  className = "",
}: FeatureGridProps) {
  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
