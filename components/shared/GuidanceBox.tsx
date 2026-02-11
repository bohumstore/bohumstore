import React from "react";
import { GuideSection } from "../../types/product";

interface GuidanceBoxProps {
  /** 왼쪽 박스 데이터 */
  left: GuideSection;
  /** 왼쪽 박스 색상 (bg/dot) */
  leftColor?: { bg: string; dot: string };
  /** 오른쪽 박스 데이터 */
  right: GuideSection;
  /** 오른쪽 박스 색상 (bg/dot) */
  rightColor?: { bg: string; dot: string };
  /** 섹션 제목 */
  title: string;
  /** 추가 className */
  className?: string;
}

/**
 * 가이드 섹션 (2열 박스)
 * - 기존 annuity/page.tsx, whole-life/page.tsx에서 반복되던 가이드 섹션을 공통화
 * - 디자인: 기존 코드 그대로 유지
 */
export default function GuidanceBox({
  left,
  leftColor = { bg: "bg-blue-50", dot: "bg-blue-500" },
  right,
  rightColor = { bg: "bg-green-50", dot: "bg-green-500" },
  title,
  className = "",
}: GuidanceBoxProps) {
  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 왼쪽 박스 */}
          <div className={`${leftColor.bg} rounded-2xl p-8`}>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {left.title}
            </h3>
            <ul className="space-y-3 text-gray-700">
              {left.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 ${leftColor.dot} rounded-full mt-2 flex-shrink-0`}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 오른쪽 박스 */}
          <div className={`${rightColor.bg} rounded-2xl p-8`}>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {right.title}
            </h3>
            <ul className="space-y-3 text-gray-700">
              {right.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 ${rightColor.dot} rounded-full mt-2 flex-shrink-0`}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
