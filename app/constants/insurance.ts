// 보험사 ID
export const INSURANCE_COMPANIES = {
  KB_LIFE: 1,
  KDB_LIFE: 2,
  IBK_LIFE: 3, // IBK연금보험 추가
  SHINHAN_LIFE: 4, // 신한라이프생명 추가
  DONGYANG_LIFE: 5, // 동양생명 추가
} as const;

// 상품 ID
export const INSURANCE_PRODUCTS = {
  KB_TRIPLE_LEVEL_UP: 1,  // KB라이프 트리플 레벨업 연금보험
  KDB_HAPPY_DREAM: 2,    // KDB 더!행복드림변액연금보험
  KDB_HAPPY_PLUS_GUARANTEED: 3, // KDB 더!행복플러스연금보험(보증형)
  IBK_LIFETIME_ANNUITY: 4, // IBK 평생보증받는 변액연금보험
  SHINHAN_MORE_THE_DREAM: 5, // 신한라이프 모아더드림Plus종신보험 추가
  DONGYANG_NEW_ALDDUL_PLUS_WHOLE_LIFE: 6, // 동양생명 new알뜰플러스종신보험
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
  [INSURANCE_PRODUCTS.IBK_LIFETIME_ANNUITY]: {
    name: 'IBK 평생보증받는 변액연금보험',
    companyId: INSURANCE_COMPANIES.IBK_LIFE,
    companyName: 'IBK연금보험',
    category: '연금보험',
    features: [
      '보증형 변액연금',
      '가입 0~68세 / 연금개시 30~80세',
      '실적배당 종신연금 보증지급',
      '최저사망계약자적립액 보증'
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
  },
  
  [INSURANCE_PRODUCTS.SHINHAN_MORE_THE_DREAM]: {
    name: '신한라이프 모아더드림Plus종신보험',
    companyId: INSURANCE_COMPANIES.SHINHAN_LIFE,
    companyName: '신한라이프생명',
    category: '종신보험',
    features: [
      '종신보장으로 평생 안전한 보장',
      '가입 15~70세 / 보장 100세까지',
      '사망보장금 최대 1억원',
      '납입완료보너스 및 장기유지보너스 지급',
      '병력 무심사 / 전건 가입 가능'
    ]
  },

  [INSURANCE_PRODUCTS.DONGYANG_NEW_ALDDUL_PLUS_WHOLE_LIFE]: {
    name: '동양생명 new알뜰플러스종신보험',
    companyId: INSURANCE_COMPANIES.DONGYANG_LIFE,
    companyName: '동양생명',
    category: '종신보험',
    features: [
      '해약환급금 일부지급형으로 보험료 부담 경감',
      '종신 사망보장 중심 설계',
      '일반심사형/간편심사형 선택 가능',
      '납입면제 등 보장 기능(약관 기준)'
    ]
  }
} as const;

// 상품 경로별 설정
export const PRODUCT_PATH_CONFIGS = {
  '/insurance/annuity/kb/triple-level-up': {
    productId: INSURANCE_PRODUCTS.KB_TRIPLE_LEVEL_UP,
    config: PRODUCT_CONFIGS[INSURANCE_PRODUCTS.KB_TRIPLE_LEVEL_UP]
  },
  '/insurance/annuity/ibk/lifetime': {
    productId: INSURANCE_PRODUCTS.IBK_LIFETIME_ANNUITY,
    config: PRODUCT_CONFIGS[INSURANCE_PRODUCTS.IBK_LIFETIME_ANNUITY]
  },
  '/insurance/annuity/kdb/happy-dream': {
    productId: INSURANCE_PRODUCTS.KDB_HAPPY_DREAM,
    config: PRODUCT_CONFIGS[INSURANCE_PRODUCTS.KDB_HAPPY_DREAM]
  },
  '/insurance/annuity/kdb/happy-plus': {
    productId: INSURANCE_PRODUCTS.KDB_HAPPY_PLUS_GUARANTEED,
    config: PRODUCT_CONFIGS[INSURANCE_PRODUCTS.KDB_HAPPY_PLUS_GUARANTEED]
  },
  '/insurance/whole-life/shinhan/more-the-dream': {
    productId: INSURANCE_PRODUCTS.SHINHAN_MORE_THE_DREAM,
    config: PRODUCT_CONFIGS[INSURANCE_PRODUCTS.SHINHAN_MORE_THE_DREAM]
  },
  '/insurance/whole-life/dongyang/new-life': {
    productId: INSURANCE_PRODUCTS.DONGYANG_NEW_ALDDUL_PLUS_WHOLE_LIFE,
    config: PRODUCT_CONFIGS[INSURANCE_PRODUCTS.DONGYANG_NEW_ALDDUL_PLUS_WHOLE_LIFE]
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
  IBK_LIFETIME_ANNUITY: 'UA_7754', // IBK 평생보증받는 변액연금보험 - OTP 전송 템플릿
  SHINHAN_MORE_THE_DREAM: 'UA_7918', // 신한라이프 모아더드림Plus종신보험
  DONGYANG_NEW_ALDDUL_PLUS_WHOLE_LIFE: 'UA_7754', // 동양생명 new알뜰플러스종신보험 (기본 템플릿 사용)
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
    case 4: return ALIGO_TEMPLATE_IDS.IBK_LIFETIME_ANNUITY; // IBK 평생보증받는 변액연금보험
    case 5: return ALIGO_TEMPLATE_IDS.SHINHAN_MORE_THE_DREAM; // 신한라이프 모아더드림Plus종신보험
    case 6: return ALIGO_TEMPLATE_IDS.DONGYANG_NEW_ALDDUL_PLUS_WHOLE_LIFE; // 동양생명 new알뜰플러스종신보험
    default: return 'UA_7754';
  }
}; 