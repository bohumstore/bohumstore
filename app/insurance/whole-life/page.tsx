"use client";

import React from "react";
import CategoryTemplate from "@/components/category/CategoryTemplate";
import { getProductsByCategory } from "@/data/products";
import { getCategoryExtras } from "@/data/category-extras";

const wholeLifeExtras = getCategoryExtras('whole-life')!;

export default function WholeLifePage() {
  return (
    <CategoryTemplate
      title="종신보험"
      heroDescription="평생 보장과 가족을 위한 안전한 미래를 준비하세요"
      heroGradient="bg-gradient-to-r from-green-600 to-green-800"
      heroSubColor="text-green-100"
      heroTagBg="bg-green-500"
      tags={["종신보험", "사망보장", "가족보장", "자산형성"]}
      featureTitle="종신보험의 특징"
      features={wholeLifeExtras.features}
      productListTitle="추천 종신보험 상품"
      products={getProductsByCategory('whole-life')}
      accentColor="green"
      guideTitle="종신보험 가이드"
      guideLeft={wholeLifeExtras.guide.left}
      guideLeftColor={{ bg: "bg-green-50", dot: "bg-green-500" }}
      guideRight={wholeLifeExtras.guide.right}
      guideRightColor={{ bg: "bg-bg-blue", dot: "bg-bg-blue0" }}
    />
  );
}
