import { ReactNode } from "react";

// ── 공통 상품 타입 ──
export interface Product {
  id: string;
  name: string;
  company: string;
  logo: string;
  path: string;
  description: string;
  features: string[];
  badge?: string;
  category: string;
  /** 메인 페이지 등에서 강조할 텍스트 */
  highlight?: string;
  /** 추가 설명 노트 (※ 주석 등) */
  descriptionNote?: string;
  /** 가격 텍스트 (예: "월 10만원부터") */
  price?: string;
  /** 평점 */
  rating?: number;
  /** 리뷰 수 */
  reviewCount?: number;
}

// ── 카테고리 타입 ──
export interface CategoryInfo {
  id: string;
  /** 화면에 표시되는 이름 */
  label: string;
  /** URL slug (예: "annuity", "whole-life") */
  slug: string;
  /** 카테고리 간단 설명 */
  description: string;
  /** 히어로 섹션 설명 */
  heroDescription?: string;
  /** 하위 태그들 (예: ["확정연금", "변액연금"]) */
  tags?: string[];
}

// ── 특징/장점 섹션용 타입 ──
export interface FeatureItem {
  icon: ReactNode;
  title: string;
  description: string;
}

// ── 가이드 섹션용 타입 ──
export interface GuideSection {
  title: string;
  items: string[];
}

// ── 탭 아이템 타입 ──
export interface TabItem {
  label: string;
  content: ReactNode;
}
