"use client";

import React, { useEffect } from "react";
import { trackPageVisit } from "../../utils/visitorTracking";
import { PageHeader, FeatureGrid, GuidanceBox, ProductCard, Footer } from "../shared";
import { Product, FeatureItem, GuideSection } from "../../types/product";

interface CategoryTemplateProps {
  /** 카테고리 이름 (예: "연금보험") */
  title: string;
  /** 히어로 섹션 설명 */
  heroDescription: string;
  /** 히어로 배경 그라디언트 CSS 클래스 */
  heroGradient: string;
  /** 히어로 텍스트 서브 컬러 (예: "text-blue-100") */
  heroSubColor: string;
  /** 히어로 태그 배경 색상 (예: "bg-blue-500") */
  heroTagBg: string;
  /** 하위 태그들 (예: ["확정연금", "변액연금"]) */
  tags?: string[];
  /** 특징 섹션 제목 */
  featureTitle: string;
  /** 특징 데이터 */
  features: FeatureItem[];
  /** 상품 리스트 제목 */
  productListTitle: string;
  /** 상품 데이터 배열 */
  products: Product[];
  /** 상품 카드의 악센트 컬러 */
  accentColor?: string;
  /** 가이드 섹션 제목 */
  guideTitle: string;
  /** 가이드 왼쪽 박스 */
  guideLeft: GuideSection;
  /** 가이드 왼쪽 색상 */
  guideLeftColor?: { bg: string; dot: string };
  /** 가이드 오른쪽 박스 */
  guideRight: GuideSection;
  /** 가이드 오른쪽 색상 */
  guideRightColor?: { bg: string; dot: string };
}

/**
 * 카테고리 페이지 공통 템플릿
 * - 기존 annuity/page.tsx, whole-life/page.tsx 등의 구조를 하나로 통합
 * - 디자인: 기존 코드의 디자인을 그대로 유지
 * - 사용법: 각 카테고리 페이지에서 데이터만 넘겨주면 됨
 */
export default function CategoryTemplate({
  title,
  heroDescription,
  heroGradient,
  heroSubColor,
  heroTagBg,
  tags = [],
  featureTitle,
  features,
  productListTitle,
  products,
  accentColor = "blue",
  guideTitle,
  guideLeft,
  guideLeftColor,
  guideRight,
  guideRightColor,
}: CategoryTemplateProps) {
  useEffect(() => {
    trackPageVisit();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <PageHeader />

      {/* 히어로 섹션 */}
      <section className={`${heroGradient} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
          <p className={`text-xl md:text-2xl mb-8 ${heroSubColor}`}>
            {heroDescription}
          </p>
          {tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className={`${heroTagBg} px-4 py-2 rounded-full text-sm`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 특징 섹션 */}
      <FeatureGrid title={featureTitle} features={features} />

      {/* 상품 리스트 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {productListTitle}
          </h2>
          <div className="space-y-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                accentColor={accentColor}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 가이드 섹션 */}
      <GuidanceBox
        title={guideTitle}
        left={guideLeft}
        leftColor={guideLeftColor}
        right={guideRight}
        rightColor={guideRightColor}
      />

      {/* 푸터 */}
      <Footer />
    </div>
  );
}
