"use client";

import React from "react";
import CategoryTemplate from "@/components/category/CategoryTemplate";
import { getProductsByCategory } from "@/data/products";
import { getCategoryExtras } from "@/data/category-extras";

const annuityExtras = getCategoryExtras('annuity')!;

export default function AnnuityPage() {
  return (
    <CategoryTemplate
      title="연금보험"
      heroDescription="안정적인 노후 준비를 위한 최고의 연금 상품들을 만나보세요"
      heroGradient="bg-gradient-to-r from-blue-600 to-blue-800"
      heroSubColor="text-blue-100"
      heroTagBg="bg-bg-blue0"
      tags={["확정연금", "변액연금", "종신연금", "기간연금"]}
      featureTitle="연금보험의 특징"
      features={annuityExtras.features}
      productListTitle="추천 연금보험 상품"
      products={getProductsByCategory('annuity')}
      guideTitle="연금보험 가이드"
      guideLeft={annuityExtras.guide.left}
      guideRight={annuityExtras.guide.right}
    />
  );
}
