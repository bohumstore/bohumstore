import { CategoryInfo } from "../types/product";

/**
 * 보험 계열(카테고리) 데이터
 * - 메인 페이지 카테고리 그리드, 카테고리 리스트 페이지 등에서 사용
 * - slug는 URL 경로로 사용됨 (예: /insurance/health)
 */
export const categories: CategoryInfo[] = [
  {
    id: "health",
    label: "건강보험",
    slug: "health",
    description: "질병과 상해에 대비하는 건강보험",
    heroDescription: "질병과 상해에 대비하여 든든한 건강 보장을 준비하세요",
    tags: ["실손보험", "질병보험", "상해보험"],
  },
  {
    id: "cancer",
    label: "암보험",
    slug: "cancer",
    description: "암 진단부터 치료까지 보장하는 암보험",
    heroDescription: "암 진단부터 치료비까지 든든하게 보장받으세요",
    tags: ["암진단", "암치료", "암수술"],
  },
  {
    id: "child",
    label: "어린이보험",
    slug: "child",
    description: "자녀의 건강과 미래를 지키는 어린이보험",
    heroDescription: "소중한 자녀의 건강과 미래를 위한 최적의 보장을 만나보세요",
    tags: ["태아보험", "어린이건강", "교육보험"],
  },
  {
    id: "carer",
    label: "간병인보험",
    slug: "carer",
    description: "간병비 부담을 줄여주는 간병인보험",
    heroDescription: "간병비 걱정 없이 안심할 수 있는 간병인 보험을 비교하세요",
    tags: ["간병비", "치매보험", "장기요양"],
  },
  {
    id: "sick",
    label: "유병자보험",
    slug: "sick",
    description: "기존 질환이 있어도 가입 가능한 유병자보험",
    heroDescription: "기존 질환이 있어도 가입 가능한 보험 상품을 만나보세요",
    tags: ["간편심사", "무심사", "유병자전용"],
  },
  {
    id: "whole-life",
    label: "단기납종신",
    slug: "whole-life",
    description: "짧은 납입, 평생 보장의 단기납 종신보험",
    heroDescription: "평생 보장과 가족을 위한 안전한 미래를 준비하세요",
    tags: ["종신보험", "사망보장", "가족보장", "자산형성"],
  },
  {
    id: "annuity",
    label: "연금보험",
    slug: "annuity",
    description: "안정적인 노후를 위한 연금보험",
    heroDescription: "안정적인 노후 준비를 위한 최고의 연금 상품들을 만나보세요",
    tags: ["확정연금", "변액연금", "종신연금", "기간연금"],
  },
  {
    id: "variable-annuity",
    label: "변액연금",
    slug: "variable-annuity",
    description: "투자와 연금을 동시에, 변액연금보험",
    heroDescription: "투자 수익과 안정적인 연금을 동시에 누려보세요",
    tags: ["변액보험", "투자형연금", "펀드연금"],
  },
  {
    id: "liability",
    label: "배상책임",
    slug: "liability",
    description: "일상 배상책임에 대비하는 보험",
    heroDescription: "일상생활 중 발생할 수 있는 배상책임에 대비하세요",
    tags: ["일상배상", "영업배상", "전문직배상"],
  },
];

/**
 * slug로 카테고리 정보 찾기
 */
export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return categories.find((c) => c.slug === slug);
}

/**
 * id로 카테고리 정보 찾기
 */
export function getCategoryById(id: string): CategoryInfo | undefined {
  return categories.find((c) => c.id === id);
}
