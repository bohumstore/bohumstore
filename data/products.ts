// 통합 상품 데이터 — 모든 상품 정보를 하나의 배열로 관리
// 기존 home-data.ts(slogans, mainProducts), annuity-data.tsx, whole-life-data.tsx의 상품 데이터를 통합

export interface UnifiedProduct {
  // === 공통 필드 ===
  id: string;
  name: string;
  company: string;
  logo: string;
  path: string;
  description: string;
  features: string[];
  category: string; // 'annuity' | 'whole-life' 등

  // === 카테고리 페이지용 ===
  badge?: string;
  price?: string;
  rating?: number;
  reviewCount?: number;

  // === 메인 페이지 추천 섹션용 ===
  mainPage?: {
    highlight: string;
    badge: string;
    description: string;
    descriptionNote?: string;
  };

  // === 히어로 슬라이더용 ===
  slogan?: {
    title: string;
    subtitle: string;
    description: string;
    color: string;
    bgColor: string;
    sloganFeatures: string[];
  };
}

// ─── 통합 상품 배열 ───
export const products: UnifiedProduct[] = [
  {
    id: 'kb-triple-level-up',
    name: 'KB 트리플 레벨업 연금보험(보증형)',
    company: 'KB라이프생명',
    logo: '/images/logos/kb-life-logo.png',
    path: '/insurance/annuity/kb/triple-level-up',
    description: '5년납 단기완납, 병력 무심사 가입 가능',
    features: [
      '10년시점 130% 해약환급률 보증 (5년납)',
      '가입 0~70세 / 연금개시 45~85세',
      '비과세 혜택 (월 150만원 한도)',
      '병력 무심사 / 전건 가입가능',
    ],
    category: 'annuity',
    badge: '',
    price: '',
    rating: undefined,
    reviewCount: undefined,
    mainPage: {
      highlight: '10년시점 130% 보증',
      badge: 'BEST',
      description: '5년납 단기완납, 병력 무심사 가입 가능',
    },
    slogan: {
      title: '트리플 레벨업 보장',
      subtitle: '10년시점 130% 해약환급률 보증',
      description: 'KB 트리플 레벨업 연금보험으로 단기간에 높은 보장을 받으세요.',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      sloganFeatures: [
        '10년시점 130% 해약환급률 보증 (5년납)',
        '가입 0~70세 / 연금개시 45~85세',
        '비과세 혜택 (월 150만원 한도)',
        '병력 무심사 / 전건 가입가능',
      ],
    },
  },
  {
    id: 'kdb-happy-plus',
    name: 'KDB 행복플러스 연금보험(보증형)',
    company: 'KDB생명',
    logo: '/images/logos/kdb-logo.png',
    path: '/insurance/annuity/kdb/happy-plus',
    description: '연단리 7% 보증으로 안정적인 노후 준비',
    features: ['안정적인 연금 수령', '사망보장', '해지환급금 보장', '다양한 납입방식'],
    category: 'annuity',
    badge: 'BEST',
    price: '월 10만원부터',
    rating: 4.8,
    reviewCount: 127,
    mainPage: {
      highlight: '연단리 7% 보증',
      badge: '',
      description: '연단리 7% 보증으로 안정적인 노후 준비',
    },
    slogan: {
      title: '연단리 7% 보증',
      subtitle: '보증형 연금으로 확실한 노후',
      description: 'KDB 행복플러스 연금보험으로 안전하고 안정적인 노후를 준비하세요.',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      sloganFeatures: ['연단리 7% 보증 수익', '보증형 연금으로 확실한 보장', '안정적인 노후 준비'],
    },
  },
  {
    id: 'kdb-happy-dream',
    name: 'KDB 행복드림 변액연금보험',
    company: 'KDB생명',
    logo: '/images/logos/kdb-logo.png',
    path: '/insurance/annuity/kdb/happy-dream',
    description: '연단리 7% 보증으로 안정성과 수익성 동시 확보',
    features: ['높은 연금 수령', '투자형 연금', '유연한 납입', '수익률 연동'],
    category: 'annuity',
    badge: 'NEW',
    price: '월 15만원부터',
    rating: 4.6,
    reviewCount: 89,
    mainPage: {
      highlight: '연단리 7% 보증',
      badge: '',
      description: '연단리 7% 보증으로 안정성과 수익성 동시 확보',
    },
    slogan: {
      title: '연단리 7% 보증',
      subtitle: '변액형으로 더 높은 수익 기대',
      description: 'KDB 행복드림 변액연금보험으로 높은 수익과 안정성을 동시에 누리세요.',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      sloganFeatures: [
        '연단리 7% 보증 + 추가 수익',
        '변액형 연금의 성장성',
        '유연한 연금 수령 방식',
      ],
    },
  },
  {
    id: 'ibk-lifetime',
    name: 'IBK 평생보증받는 변액연금보험',
    company: 'IBK연금보험',
    logo: '/images/logos/ibk-logo.png',
    path: '/insurance/annuity/ibk/lifetime',
    description: '업계 최고 연단리 8% 보증, 100세까지 평생 연금 수령',
    features: ['평생 연금 보장', '안정적인 수익', '다양한 납입방식', '사망보장'],
    category: 'annuity',
    badge: 'HOT',
    price: '월 12만원부터',
    rating: 4.7,
    reviewCount: 156,
    mainPage: {
      highlight: '연단리 8% 보증',
      badge: 'HOT',
      description: '업계 최고 연단리 8% 보증, 100세까지 평생 연금 수령',
    },
    slogan: {
      title: '연단리 8% 보증',
      subtitle: '평생 연금으로 안정적인 노후',
      description: 'IBK 평생연금받는 변액연금보험으로 평생 동안 안정적인 연금을 받으세요.',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      sloganFeatures: ['업계 최고 연단리 8% 보증', '평생 연금 지급', '변액형 연금의 수익성'],
    },
  },
  {
    id: 'metlife-usd',
    name: '메트라이프 달러종신보험Plus',
    company: '메트라이프생명',
    logo: '/images/logos/metlife-logo.png',
    path: '/insurance/whole-life/metlife/usd',
    description: '달러/원화 선택 수령, 원화고정납입옵션으로 환율 걱정 無',
    features: ['달러/원화 선택 수령 가능', '원화고정납입으로 환율 걱정 無', '15~70세 가입 가능'],
    category: 'whole-life',
    mainPage: {
      highlight: '10년시점 124.9%',
      badge: 'TOP',
      description: '달러/원화 선택 수령, 원화고정납입옵션으로 환율 걱정 無',
    },
    slogan: {
      title: '10년시점 124.9% 환급률',
      subtitle: '달러로 준비하는 미래 자산',
      description: '메트라이프 달러종신보험으로 환율 변동에도 안정적인 자산을 설계하세요.',
      color: 'from-[#00529b] to-[#003d7a]',
      bgColor: 'bg-blue-50',
      sloganFeatures: [
        '달러/원화 선택 수령 가능',
        '원화고정납입으로 환율 걱정 無',
        '15~70세 가입 가능',
      ],
    },
  },
  {
    id: 'shinhan-more-dream',
    name: '신한 모아더드림 Plus 종신보험',
    company: '신한라이프생명',
    logo: '/images/logos/shinhan-life-logo.png',
    path: '/insurance/whole-life/shinhan/more-the-dream',
    description: '15~70세 전연령 가입 가능, 단기납 완료 후 높은 환급률',
    features: ['평생 보장', '사망보험금', '해지환급금', '다양한 특약'],
    category: 'whole-life',
    badge: 'TOP',
    price: '월 8만원부터',
    rating: 4.6,
    reviewCount: 89,
    mainPage: {
      highlight: '10년시점 122.7%',
      badge: '',
      description: '15~70세 전연령 가입 가능, 단기납 완료 후 높은 환급률',
    },
    slogan: {
      title: '10년시점 122.7% 환급률',
      subtitle: '단기납으로 빠른 완납',
      description: '신한 모아더드림 Plus 종신보험으로 짧은 기간에 높은 보장을 받으세요.',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      sloganFeatures: [
        '15~70세 전연령 가입 가능',
        '단기납으로 빠른 완납',
        '종신보장으로 평생 보호',
      ],
    },
  },
  {
    id: 'hana-hanaro',
    name: '하나생명 하나로 THE 연결된 종신보험',
    company: '하나생명',
    logo: '/images/logos/hana-logo.png',
    path: '/insurance/whole-life/hana/hanaro',
    description: '간편심사형 가입 가능, 3대질병 진단시 보험료 환급',
    features: ['간편심사형으로도 가입 가능', '3대질병 진단시 보험료 환급', '유지보너스 제공'],
    category: 'whole-life',
    mainPage: {
      highlight: '10년시점 122.78%',
      badge: '',
      description: '간편심사형 가입 가능, 3대질병 진단시 보험료 환급',
      descriptionNote: '(※특약 가입시)',
    },
    slogan: {
      title: '10년시점 122.78% 환급률',
      subtitle: '간편심사형 가입 가능',
      description:
        '하나생명 하나로 THE 연결된 종신보험으로 높은 환급률과 간편한 가입을 경험하세요.',
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      sloganFeatures: [
        '간편심사형으로도 가입 가능',
        '3대질병 진단시 보험료 환급',
        '유지보너스 제공',
      ],
    },
  },
];

// ─── Helper 함수 ───

/** 히어로 슬라이더에 표시할 상품 목록 (slogan이 있는 상품) */
export function getSloganProducts(): UnifiedProduct[] {
  return products.filter((p) => p.slogan != null);
}

/** 메인 페이지 추천 상품 목록 (mainPage가 있는 상품) */
export function getMainPageProducts(): UnifiedProduct[] {
  return products.filter((p) => p.mainPage != null);
}

/** 카테고리별 상품 필터 */
export function getProductsByCategory(category: string): UnifiedProduct[] {
  return products.filter((p) => p.category === category);
}

/** ID로 상품 찾기 */
export function getProductById(id: string): UnifiedProduct | undefined {
  return products.find((p) => p.id === id);
}
