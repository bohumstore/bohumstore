// 보험사 ID
export const INSURANCE_COMPANIES = {
  KB_LIFE: 1,
  KDB_LIFE: 2,
} as const;

// 상품 ID
export const INSURANCE_PRODUCTS = {
  KB_TRIPLE_LEVEL_UP: 1,  // KB라이프 트리플 레벨업 연금보험
  KDB_HAPPY_DREAM: 2,    // KDB 더!행복드림변액연금보험
  KDB_HAPPY_PLUS_GUARANTEED: 3, // KDB 더!행복플러스연금보험(보증형)
} as const;

// 상담 타입 ID
export const COUNSEL_TYPES = {
  PREMIUM_CHECK: 1,       // 보험료 확인
  CONSULTATION: 2,        // 상담신청
} as const;

// 상품별 설정
export const PRODUCT_CONFIGS = {
  [INSURANCE_PRODUCTS.KB_TRIPLE_LEVEL_UP]: {
    name: 'KB라이프 트리플 레벨업 연금보험',
    companyId: INSURANCE_COMPANIES.KB_LIFE,
    companyName: 'KB라이프',
    category: '연금보험',
    features: [
      '7% 최저연금기준금액 보증',
      '가입 15~70세 / 연금개시 55~80세',
      '실적배당 종신연금 보증지급',
      '최저사망적립액 보증'
    ]
  },
  [INSURANCE_PRODUCTS.KDB_HAPPY_DREAM]: {
    name: 'KDB 더!행복드림변액연금보험',
    companyId: INSURANCE_COMPANIES.KDB_LIFE,
    companyName: 'KDB생명',
    category: '연금보험',
    features: [
      '20년까지 7%! 변액연금보험!',
      '7% 최저연금기준금액 보증 (20년까지)',
      '가입 15~70세 / 연금개시 55~80세',
      '실적배당 종신연금 보증지급',
      '최저사망적립액 보증 / 선지급행복자금'
    ]
  },

  [INSURANCE_PRODUCTS.KDB_HAPPY_PLUS_GUARANTEED]: {
    name: 'KDB 더!행복플러스연금보험(보증형)',
    companyId: INSURANCE_COMPANIES.KDB_LIFE,
    companyName: 'KDB생명',
    category: '연금보험',
    features: [
      '보증형 연금 상품',
      '안정적인 연금 수령',
      '가입 15~70세 / 연금개시 55~80세',
      '보증 연금 지급',
      '최저사망적립액 보증'
    ]
  }
} as const;

// 상품 경로별 설정
export const PRODUCT_PATH_CONFIGS = {
  '/insurance/annuity/kb/triple-level-up': {
    productId: INSURANCE_PRODUCTS.KB_TRIPLE_LEVEL_UP,
    config: PRODUCT_CONFIGS[INSURANCE_PRODUCTS.KB_TRIPLE_LEVEL_UP]
  },
  '/insurance/annuity/kdb/happy-dream': {
    productId: INSURANCE_PRODUCTS.KDB_HAPPY_DREAM,
    config: PRODUCT_CONFIGS[INSURANCE_PRODUCTS.KDB_HAPPY_DREAM]
  },
  '/insurance/annuity/kdb/happy-plus': {
    productId: INSURANCE_PRODUCTS.KDB_HAPPY_PLUS_GUARANTEED,
    config: PRODUCT_CONFIGS[INSURANCE_PRODUCTS.KDB_HAPPY_PLUS_GUARANTEED]
  }
} as const;

// 상품 정보 조회 함수
export const getProductConfig = (productId: number) => {
  return PRODUCT_CONFIGS[productId as keyof typeof PRODUCT_CONFIGS];
};

// 알림톡 템플릿 ID
export const ALIGO_TEMPLATE_IDS = {
  KB_TRIPLE_LEVEL_UP: 'UA_7754',      // KB라이프 트리플 레벨업 연금보험
  KDB_HAPPY_DREAM: 'UA_7754',         // KDB 더!행복드림변액연금보험
  KDB_HAPPY_PLUS_GUARANTEED: 'UA_7754', // KDB 더!행복플러스연금보험(보증형)
} as const;

// 경로별 상품 정보 조회 함수
export const getProductConfigByPath = (path: string) => {
  return PRODUCT_PATH_CONFIGS[path as keyof typeof PRODUCT_PATH_CONFIGS];
};

// 경로별 템플릿 ID 조회 함수
export const getTemplateIdByPath = (path: string) => {
  const productConfig = getProductConfigByPath(path);
  if (!productConfig) return 'UA_7754'; // 기본값
  
  switch (productConfig.productId) {
    case 1: return ALIGO_TEMPLATE_IDS.KB_TRIPLE_LEVEL_UP;
    case 2: return ALIGO_TEMPLATE_IDS.KDB_HAPPY_DREAM;
    case 3: return ALIGO_TEMPLATE_IDS.KDB_HAPPY_PLUS_GUARANTEED;
    default: return 'UA_7754';
  }
}; 