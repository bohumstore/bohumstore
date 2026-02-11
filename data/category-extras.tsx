// 카테고리별 특징(Features)과 가이드(Guide) 데이터
// 상품 데이터(products.ts)와 분리하여 관리

import React from 'react';
import { ShieldCheckIcon, CurrencyDollarIcon, ChartBarIcon, HeartIcon, UserIcon } from "@heroicons/react/24/outline";
import { FeatureItem, GuideSection } from "@/types/product";

// ─── 타입 ───

export interface CategoryExtras {
  features: FeatureItem[];
  guide: {
    left: GuideSection;
    right: GuideSection;
  };
}

// ─── 연금보험 ───

const annuityExtras: CategoryExtras = {
  features: [
    {
      icon: <ShieldCheckIcon className="w-8 h-8 text-blue-600" />,
      title: '안정적인 노후',
      description: '확정된 연금으로 안정적인 노후 생활을 보장합니다.'
    },
    {
      icon: <CurrencyDollarIcon className="w-8 h-8 text-green-600" />,
      title: '세제혜택',
      description: '연금보험료 납입 시 소득공제 혜택을 받을 수 있습니다.'
    },
    {
      icon: <ChartBarIcon className="w-8 h-8 text-purple-600" />,
      title: '수익률',
      description: '장기적으로 안정적인 수익률을 제공합니다.'
    }
  ],
  guide: {
    left: {
      title: '연금보험 가입 시 고려사항',
      items: [
        '연금 개시 연령과 연금 수령 기간',
        '연금 수령액과 납입 보험료',
        '해지환급금과 사망보장',
        '세제혜택과 관련 법규'
      ]
    },
    right: {
      title: '연금보험의 장점',
      items: [
        '안정적인 노후 수입 보장',
        '세제 혜택으로 실질 부담 감소',
        '장기적인 자산 형성',
        '사망 시 가족 보장'
      ]
    }
  }
};

// ─── 종신보험 ───

const wholeLifeExtras: CategoryExtras = {
  features: [
    {
      icon: <ShieldCheckIcon className="w-8 h-8 text-green-600" />,
      title: '평생 보장',
      description: '가입 후 평생 동안 보장을 받을 수 있습니다.'
    },
    {
      icon: <HeartIcon className="w-8 h-8 text-red-600" />,
      title: '가족 보장',
      description: '사망 시 가족에게 안전한 미래를 제공합니다.'
    },
    {
      icon: <UserIcon className="w-8 h-8 text-blue-600" />,
      title: '자산 형성',
      description: '장기적으로 안정적인 자산을 형성할 수 있습니다.'
    }
  ],
  guide: {
    left: {
      title: '종신보험 가입 시 고려사항',
      items: [
        '보험료 납입 기간과 보장 금액',
        '사망보험금과 특약 보장',
        '해지환급금과 중도해지',
        '가족 구성원과 보장 필요성'
      ]
    },
    right: {
      title: '종신보험의 장점',
      items: [
        '평생 보장으로 안심',
        '가족을 위한 안전한 미래',
        '장기적인 자산 형성',
        '세제 혜택'
      ]
    }
  }
};

// ─── 카테고리 Extras 레지스트리 ───

const categoryExtrasMap: Record<string, CategoryExtras> = {
  annuity: annuityExtras,
  'whole-life': wholeLifeExtras,
};

/** slug로 카테고리 extras 가져오기 */
export function getCategoryExtras(slug: string): CategoryExtras | undefined {
  return categoryExtrasMap[slug];
}
