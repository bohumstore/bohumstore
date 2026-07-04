// 보험 상품별 SEO 데이터 중앙 관리

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface InsuranceMetadataConfig {
  title: string;
  description: string;
  keywords: string;
  slug: string; // canonical은 slug로부터 자동 생성
  ogImage?: string;
  category?: string;
  company?: string;
  productName?: string;
  productType?: string;
  benefitSummary?: string;
  faq?: FaqItem[];
  breadcrumbs?: BreadcrumbItem[];
}

export const insuranceMetadata: Record<string, InsuranceMetadataConfig> = {
  // 연금보험 - 메트라이프 달러연금
  'metlife-only-dollar': {
    title: '(무)오로지연금을위한 달러연금보험 | 메트라이프생명 | 보험스토어',
    description: '공시이율 4.69%, 10년시점 130% 환급률 보증(5년납). 0~70세 가입 가능, 무진단·무심사, 추가납입·중도인출·연금전환 가능한 달러연금보험',
    keywords: '메트라이프, 달러연금보험, 환급률130%, 공시이율4.69%, 무진단연금보험, 추가납입, 중도인출, 연금전환',
    slug: '/insurance/annuity/metlife/only-dollar',
    ogImage: 'https://bohumstore.net/metlife-logo.png',
    category: '달러연금보험',
    company: '메트라이프생명',
    productName: '(무)오로지연금을위한 달러연금보험',
    productType: 'AnnuityInsurance',
    benefitSummary: '10년시점 130% 환급률 보증(5년납), 공시이율 4.69%',
    breadcrumbs: [
      { name: '홈', url: 'https://bohumstore.net' },
      { name: '연금보험', url: 'https://bohumstore.net/insurance/annuity' },
      { name: '메트라이프 달러연금보험', url: 'https://bohumstore.net/insurance/annuity/metlife/only-dollar' }
    ],
    faq: [
      {
        question: '10년 시점 환급률은 어떻게 되나요?',
        answer: '5년납 기준 10년 시점 130% 확정 환급률을 보증합니다.'
      },
      {
        question: '가입 가능한 나이는 어떻게 되나요?',
        answer: '0세부터 70세까지 가입 가능하며, 무진단·무심사로 간편하게 가입할 수 있습니다.'
      }
    ]
  },

  // 연금보험 - KB 트리플 레벨업
  'kb-triple-level-up': {
    title: 'KB 트리플 레벨업 연금보험(보증형) | KB라이프생명 | 보험스토어',
    description: '10년시점 130% 해약환급률 보증. 5년납 단기완납, 병력 무심사 가입 가능',
    keywords: 'KB라이프, 트리플레벨업, 연금보험, 환급률130%, 5년납, 무심사, 보증형연금',
    slug: '/insurance/annuity/kb/triple-level-up',
    ogImage: 'https://bohumstore.net/kb-life.png',
    category: '연금보험',
    company: 'KB라이프생명',
    productName: 'KB 트리플 레벨업 연금보험(보증형)',
    productType: 'AnnuityInsurance',
    benefitSummary: '10년시점 130% 해약환급률 보증, 5년납 단기완납',
    breadcrumbs: [
      { name: '홈', url: 'https://bohumstore.net' },
      { name: '연금보험', url: 'https://bohumstore.net/insurance/annuity' },
      { name: 'KB 트리플 레벨업', url: 'https://bohumstore.net/insurance/annuity/kb/triple-level-up' }
    ]
  },

  // 연금보험 - IM Plus PRO
  'im-plus-pro': {
    title: 'IM Plus PRO연금보험 무배당 2604(보증비용부과형) | IM라이프생명 | 보험스토어',
    description: '10년시점 133% 환급률 보증(5년납). 목돈마련과 노후준비 동시에',
    keywords: 'IM라이프, PlusPRO, 연금보험, 환급률133%, 5년납, 보증형연금, 목돈마련',
    slug: '/insurance/annuity/im/plus-pro',
    ogImage: 'https://bohumstore.net/im-logo.png',
    category: '연금보험',
    company: 'IM라이프생명',
    productName: 'IM Plus PRO연금보험 무배당 2604(보증비용부과형)',
    productType: 'AnnuityInsurance',
    benefitSummary: '10년시점 133% 환급률 보증(5년납)',
    breadcrumbs: [
      { name: '홈', url: 'https://bohumstore.net' },
      { name: '연금보험', url: 'https://bohumstore.net/insurance/annuity' },
      { name: 'IM Plus PRO', url: 'https://bohumstore.net/insurance/annuity/im/plus-pro' }
    ]
  },

  // 변액연금보험 - IBK 평생보증
  'ibk-lifetime': {
    title: 'IBK 평생보증받는 변액연금보험 | IBK생명 | 보험스토어',
    description: '업계 최고 연단리 8% 보증. 평생 연금 지급',
    keywords: 'IBK생명, 변액연금보험, 연단리8%, 평생연금, 최저보증, 노후준비',
    slug: '/insurance/annuity/ibk/lifetime',
    ogImage: 'https://bohumstore.net/ibk-logo.png',
    category: '변액연금보험',
    company: 'IBK생명',
    productName: 'IBK 평생보증받는 변액연금보험',
    productType: 'VariableAnnuityInsurance',
    benefitSummary: '업계 최고 연단리 8% 보증, 평생 연금 지급',
    breadcrumbs: [
      { name: '홈', url: 'https://bohumstore.net' },
      { name: '연금보험', url: 'https://bohumstore.net/insurance/annuity' },
      { name: 'IBK 평생보증', url: 'https://bohumstore.net/insurance/annuity/ibk/lifetime' }
    ]
  },

  // 연금보험 - KDB 행복플러스
  'kdb-happy-plus': {
    title: 'KDB 행복플러스 연금보험(보증형) | KDB생명 | 보험스토어',
    description: '연단리 7% 보증으로 안정적인 노후 준비',
    keywords: 'KDB생명, 행복플러스, 연금보험, 연단리7%, 보증형, 안정적노후',
    slug: '/insurance/annuity/kdb/happy-plus',
    ogImage: 'https://bohumstore.net/kdb-logo.png',
    category: '연금보험',
    company: 'KDB생명',
    productName: 'KDB 행복플러스 연금보험(보증형)',
    productType: 'AnnuityInsurance',
    benefitSummary: '연단리 7% 보증',
    breadcrumbs: [
      { name: '홈', url: 'https://bohumstore.net' },
      { name: '연금보험', url: 'https://bohumstore.net/insurance/annuity' },
      { name: 'KDB 행복플러스', url: 'https://bohumstore.net/insurance/annuity/kdb/happy-plus' }
    ]
  },

  // 변액연금보험 - KDB 행복드림
  'kdb-happy-dream': {
    title: 'KDB 행복드림 변액연금보험 | KDB생명 | 보험스토어',
    description: '연단리 7% 보증 + 추가 수익. 변액형 연금의 성장성',
    keywords: 'KDB생명, 행복드림, 변액연금보험, 연단리7%, 추가수익, 성장성',
    slug: '/insurance/annuity/kdb/happy-dream',
    ogImage: 'https://bohumstore.net/kdb-logo.png',
    category: '변액연금보험',
    company: 'KDB생명',
    productName: 'KDB 행복드림 변액연금보험',
    productType: 'VariableAnnuityInsurance',
    benefitSummary: '연단리 7% 보증 + 추가 수익',
    breadcrumbs: [
      { name: '홈', url: 'https://bohumstore.net' },
      { name: '연금보험', url: 'https://bohumstore.net/insurance/annuity' },
      { name: 'KDB 행복드림', url: 'https://bohumstore.net/insurance/annuity/kdb/happy-dream' }
    ]
  },

  // 일시납연금 - AIA 달러연금
  'aia-dollar-oneshot': {
    title: 'AIA 달러 일시납 연금보험 | AIA생명 | 보험스토어',
    description: '10년 확정이율 5.27%, 10년시점 해약환급률 156.96%. 연금개시시점 5% 추가보너스 지급',
    keywords: 'AIA생명, 달러연금, 일시납연금, 확정이율5.27%, 환급률156%, 추가보너스',
    slug: '/insurance/oneshot/aia/dollar',
    ogImage: 'https://bohumstore.net/images/aia-logo.png',
    category: '달러일시납연금보험',
    company: 'AIA생명',
    productName: 'AIA 달러 일시납 연금보험',
    productType: 'LumpSumAnnuityInsurance',
    benefitSummary: '10년 확정이율 5.27%, 10년시점 해약환급률 156.96%',
    breadcrumbs: [
      { name: '홈', url: 'https://bohumstore.net' },
      { name: '일시납연금', url: 'https://bohumstore.net/insurance/oneshot' },
      { name: 'AIA 달러연금', url: 'https://bohumstore.net/insurance/oneshot/aia/dollar' }
    ]
  },

  // 종신보험 - 메트라이프 달러종신
  'metlife-usd': {
    title: '메트라이프 달러종신보험Plus | 메트라이프생명 | 보험스토어',
    description: '10년시점 124.9% 환급률. 달러/원화 선택 수령 가능',
    keywords: '메트라이프, 달러종신보험, 환급률124.9%, 달러원화선택, 종신보험',
    slug: '/insurance/whole-life/metlife/usd',
    ogImage: 'https://bohumstore.net/metlife-logo.png',
    category: '달러종신보험',
    company: '메트라이프생명',
    productName: '메트라이프 달러종신보험Plus',
    productType: 'WholeLifeInsurance',
    benefitSummary: '10년시점 124.9% 환급률, 달러/원화 선택 수령',
    breadcrumbs: [
      { name: '홈', url: 'https://bohumstore.net' },
      { name: '종신보험', url: 'https://bohumstore.net/insurance/whole-life' },
      { name: '메트라이프 달러종신', url: 'https://bohumstore.net/insurance/whole-life/metlife/usd' }
    ]
  },

  // 종신보험 - 신한 모아더드림
  'shinhan-more-the-dream': {
    title: '신한 모아더드림Plus 종신보험 | 신한라이프생명 | 보험스토어',
    description: '10년시점 120.5% 환급률. 일반심사형/간편심사형 선택 가능',
    keywords: '신한라이프, 모아더드림, 종신보험, 환급률120.5%, 간편심사형, 일반심사형',
    slug: '/insurance/whole-life/shinhan/more-the-dream',
    ogImage: 'https://bohumstore.net/shinhan-life-logo.png',
    category: '종신보험',
    company: '신한라이프생명',
    productName: '신한 모아더드림Plus 종신보험',
    productType: 'WholeLifeInsurance',
    benefitSummary: '10년시점 120.5% 환급률',
    breadcrumbs: [
      { name: '홈', url: 'https://bohumstore.net' },
      { name: '종신보험', url: 'https://bohumstore.net/insurance/whole-life' },
      { name: '신한 모아더드림', url: 'https://bohumstore.net/insurance/whole-life/shinhan/more-the-dream' }
    ]
  },

  // 종신보험 - 하나 하나로
  'hana-hanaro': {
    title: '하나로 THE 연결된 종신보험 | 하나생명 | 보험스토어',
    description: '10년시점 120.53% 환급률. 간편심사형으로도 가입 가능',
    keywords: '하나생명, 하나로종신보험, 환급률120.53%, 간편심사형, 연결된종신보험',
    slug: '/insurance/whole-life/hana/hanaro',
    ogImage: 'https://bohumstore.net/hana-logo.png',
    category: '종신보험',
    company: '하나생명',
    productName: '하나로 THE 연결된 종신보험',
    productType: 'WholeLifeInsurance',
    benefitSummary: '10년시점 120.53% 환급률',
    breadcrumbs: [
      { name: '홈', url: 'https://bohumstore.net' },
      { name: '종신보험', url: 'https://bohumstore.net/insurance/whole-life' },
      { name: '하나로 THE 연결된', url: 'https://bohumstore.net/insurance/whole-life/hana/hanaro' }
    ]
  },

  // 간병보험
  'carer': {
    title: '간병보험 비교 | 보험스토어',
    description: '치매, 뇌졸중, 파킨슨병 등 간병이 필요한 상황에 대비하는 간병보험 비교 및 상담',
    keywords: '간병보험, 치매보험, 뇌졸중보험, 파킨슨병, 노후간병, 장기요양보험',
    slug: '/insurance/carer',
    category: '간병보험',
    company: '보험스토어',
    productName: '간병보험',
    productType: 'NursingCareInsurance',
    benefitSummary: '치매, 뇌졸중, 파킨슨병 등 간병 대비',
    breadcrumbs: [
      { name: '홈', url: 'https://bohumstore.net' },
      { name: '간병보험', url: 'https://bohumstore.net/insurance/carer' }
    ]
  }
};

// 향후 확장을 위한 카테고리별 메타데이터
export interface CategoryMetadataConfig {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
}

export const categoryMetadata: Record<string, CategoryMetadataConfig> = {
  'annuity': {
    title: '연금보험 비교 | 보험스토어',
    description: '변액연금, 달러연금, 보증형연금 등 다양한 연금보험 상품을 비교하고 전문 상담을 받아보세요',
    keywords: '연금보험, 연금보험비교, 변액연금, 달러연금, 보증형연금, 최저보증연금',
    canonical: 'https://bohumstore.net/insurance/annuity'
  },
  'whole-life': {
    title: '종신보험 비교 | 보험스토어',
    description: '고환급 종신보험, 달러종신보험, 간편심사형 종신보험 비교 및 상담',
    keywords: '종신보험, 종신보험비교, 고환급종신보험, 달러종신보험, 간편심사형종신보험',
    canonical: 'https://bohumstore.net/insurance/whole-life'
  },
  'oneshot': {
    title: '일시납 연금보험 비교 | 보험스토어',
    description: '달러 일시납 연금보험 등 목돈으로 가입하는 연금보험 비교',
    keywords: '일시납연금, 달러일시납, 목돈연금, 확정이율연금',
    canonical: 'https://bohumstore.net/insurance/oneshot'
  },
  'carer': {
    title: '간병보험 비교 | 보험스토어',
    description: '치매, 뇌졸중 등 간병이 필요한 상황 대비 간병보험 비교',
    keywords: '간병보험, 치매보험, 노후간병, 장기요양보험',
    canonical: 'https://bohumstore.net/insurance/carer'
  }
};

// ============================================
// 비교 페이지용 메타데이터 (향후 백오피스 연동 예정)
// ============================================
// 주의: 아래 데이터는 실제 페이지가 아직 생성되지 않았습니다.
// 향후 백오피스 상품 DB와 연동하여 자동 생성될 예정입니다.
// - 환급률 TOP10
// - 연금 많이 받는 순위
// - 보험사별 비교
// - 판매 종료 예정 상품
// ============================================
export const comparisonMetadata: Record<string, CategoryMetadataConfig> = {
  // 향후 백오피스 연동 예정
  'top-refund': {
    title: '환급률 TOP10 연금보험 비교 | 보험스토어',
    description: '10년시점 환급률이 가장 높은 연금보험 TOP10 비교',
    keywords: '환급률높은연금보험, 고환급연금, 연금보험순위, 환급률비교',
    canonical: 'https://bohumstore.net/comparison/top-refund'
  },
  // 향후 백오피스 연동 예정
  'annuity-comparison': {
    title: '연금보험 상품 비교 | 보험스토어',
    description: '보험사별 연금보험 상품을 한눈에 비교하고 최적의 상품을 찾아보세요',
    keywords: '연금보험비교, 보험사비교, 상품비교, 연금보험추천',
    canonical: 'https://bohumstore.net/comparison/annuity'
  }
};
