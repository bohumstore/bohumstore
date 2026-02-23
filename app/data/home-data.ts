// 홈 페이지 데이터 - 슬로건, 상품, 채팅 시나리오

// 타입 정의
export interface Slogan {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  path: string;
  color: string;
  bgColor: string;
  features: string[];
  company: string;
  logo?: string;
}

export interface MainProduct {
  id: string;
  name: string;
  company: string;
  logo: string;
  path: string;
  description: string;
  badge: string;
  category: string;
  highlight: string;
  descriptionNote?: string;
}

export interface ChatMessage {
  role: 'customer' | 'expert';
  text: string;
}

export type ChatScenario = ChatMessage[];

// 슬로건 데이터
export const slogans: Slogan[] = [
  {
    id: 'consult-main',
    title: '나에게 딱 맞는 보험,\n찾기 어려우신가요?',
    subtitle: '전문가가 객관적으로 분석해 드리는\n1:1 맞춤 무료 상담',
    description: '복잡한 보험, 더 이상 고민하지 마세요. 내 보험 분석부터 맞춤 추천까지 한번에 해결해 드립니다.',
    path: '/insurance/a_consult',
    color: 'from-blue-600 to-indigo-600',
    bgColor: 'bg-blue-50',
    features: [
      '내 보험료가 적절한지 궁금할 때',
      '불필요한 특약이 있는지 확인할 때',
      '여러 보험사의 상품을 비교하고 싶을 때',
      '전문가의 객관적인 조언이 필요할 때'
    ],
    company: ''
  },
  {
    id: 'kb-triple-level-up',
    title: '트리플 레벨업 보장',
    subtitle: '10년시점 130% 해약환급률 보증',
    description: 'KB 트리플 레벨업 연금보험으로 단기간에 높은 보장을 받으세요.',
    path: '/insurance/annuity/kb/triple-level-up',
    color: 'from-yellow-500 to-yellow-600',
    bgColor: 'bg-yellow-50',
    features: [
      '10년시점 130% 해약환급률 보증 (5년납)',
      '가입 0~70세 / 연금개시 45~85세',
      '비과세 혜택 (월 150만원 한도)',
      '병력 무심사 / 전건 가입가능'
    ],
    company: 'KB라이프생명',
    logo: '/kb-life.png'
  },
  {
    id: 'metlife-usd',
    title: '10년시점 124.9% 환급률',
    subtitle: '달러로 준비하는 미래 자산',
    description: '메트라이프 달러종신보험으로 환율 변동에도 안정적인 자산을 설계하세요.',
    path: '/insurance/whole-life/metlife/usd',
    color: 'from-[#00529b] to-[#003d7a]',
    bgColor: 'bg-blue-50',
    features: [
      '달러/원화 선택 수령 가능',
      '원화고정납입으로 환율 걱정 無',
      '15~70세 가입 가능'
    ],
    company: '메트라이프생명',
    logo: '/metlife-logo.png'
  },
  {
    id: 'ibk-lifetime',
    title: '연단리 8% 보증',
    subtitle: '평생 연금으로 안정적인 노후',
    description: 'IBK 평생연금받는 변액연금보험으로 평생 동안 안정적인 연금을 받으세요.',
    path: '/insurance/annuity/ibk/lifetime',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    features: [
      '업계 최고 연단리 8% 보증',
      '평생 연금 지급',
      '변액형 연금의 수익성'
    ],
    company: 'IBK연금보험',
    logo: '/IBK-logo.png'
  },
  {
    id: 'kdb-happy-plus',
    title: '연단리 7% 보증',
    subtitle: '보증형 연금으로 확실한 노후',
    description: 'KDB 행복플러스 연금보험으로 안전하고 안정적인 노후를 준비하세요.',
    path: '/insurance/annuity/kdb/happy-plus',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    features: [
      '연단리 7% 보증 수익',
      '보증형 연금으로 확실한 보장',
      '안정적인 노후 준비'
    ],
    company: 'KDB생명',
    logo: '/kdb-logo.png'
  },
  {
    id: 'kdb-happy-dream',
    title: '연단리 7% 보증',
    subtitle: '변액형으로 더 높은 수익 기대',
    description: 'KDB 행복드림 변액연금보험으로 높은 수익과 안정성을 동시에 누리세요.',
    path: '/insurance/annuity/kdb/happy-dream',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    features: [
      '연단리 7% 보증 + 추가 수익',
      '변액형 연금의 성장성',
      '유연한 연금 수령 방식'
    ],
    company: 'KDB생명',
    logo: '/kdb-logo.png'
  },
  {
    id: 'shinhan-more-the-dream',
    title: '10년시점 122.7% 환급률',
    subtitle: '단기납으로 빠른 완납',
    description: '신한 모아더드림 Plus 종신보험으로 짧은 기간에 높은 보장을 받으세요.',
    path: '/insurance/whole-life/shinhan/more-the-dream',
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    features: [
      '15~70세 전연령 가입 가능',
      '단기납으로 빠른 완납',
      '종신보장으로 평생 보호'
    ],
    company: '신한라이프생명',
    logo: '/shinhan-life-logo.png'
  },
  {
    id: 'hana-hanaro',
    title: '10년시점 122.78% 환급률',
    subtitle: '간편심사형 가입 가능',
    description: '하나생명 하나로 THE 연결된 종신보험으로 높은 환급률과 간편한 가입을 경험하세요.',
    path: '/insurance/whole-life/hana/hanaro',
    color: 'from-teal-500 to-teal-600',
    bgColor: 'bg-teal-50',
    features: [
      '간편심사형으로도 가입 가능',
      '3대질병 진단시 보험료 환급',
      '유지보너스 제공'
    ],
    company: '하나생명',
    logo: '/hana-logo.png'
  }
];

// 메인 상품 데이터
export const mainProducts: MainProduct[] = [
  {
    id: 'kb-triple-level-up',
    name: 'KB 트리플 레벨업 연금보험(보증형)',
    company: 'KB라이프생명',
    logo: '/kb-life.png',
    path: '/insurance/annuity/kb/triple-level-up',
    description: '5년납 단기완납, 병력 무심사 가입 가능',
    badge: 'BEST',
    category: '연금보험',
    highlight: '10년시점 130% 보증'
  },
  {
    id: 'metlife-usd',
    name: '메트라이프 달러종신보험Plus',
    company: '메트라이프생명',
    logo: '/metlife-logo.png',
    path: '/insurance/whole-life/metlife/usd',
    description: '달러/원화 선택 수령, 원화고정납입옵션으로 환율 걱정 無',
    badge: 'TOP',
    category: '달러종신보험',
    highlight: '10년시점 124.9%'
  },
  {
    id: 'ibk-lifetime',
    name: 'IBK 평생보증받는 변액연금보험',
    company: 'IBK연금보험',
    logo: '/IBK-logo.png',
    path: '/insurance/annuity/ibk/lifetime',
    description: '업계 최고 연단리 8% 보증, 100세까지 평생 연금 수령',
    badge: 'HOT',
    category: '변액연금',
    highlight: '연단리 8% 보증'
  },
  {
    id: 'kdb-happy-dream',
    name: 'KDB 행복드림 변액연금보험',
    company: 'KDB생명',
    logo: '/kdb-logo.png',
    path: '/insurance/annuity/kdb/happy-dream',
    description: '연단리 7% 보증으로 안정성과 수익성 동시 확보',
    badge: '',
    category: '변액연금',
    highlight: '연단리 7% 보증'
  },
  {
    id: 'shinhan-more-the-dream',
    name: '신한 모아더드림 Plus 종신보험',
    company: '신한라이프생명',
    logo: '/shinhan-life-logo.png',
    path: '/insurance/whole-life/shinhan/more-the-dream',
    description: '15~70세 전연령 가입 가능, 단기납 완료 후 높은 환급률',
    badge: '',
    category: '종신보험',
    highlight: '10년시점 122.7%'
  },
  {
    id: 'hana-hanaro',
    name: '하나생명 하나로 THE 연결된 종신보험',
    company: '하나생명',
    logo: '/hana-logo.png',
    path: '/insurance/whole-life/hana/hanaro',
    description: '간편심사형 가입 가능, 3대질병 진단시 보험료 환급',
    descriptionNote: '(※특약 가입시)',
    badge: '',
    category: '종신보험',
    highlight: '10년시점 122.78%'
  },
  {
    id: 'kdb-happy-plus',
    name: 'KDB 행복플러스 연금보험(보증형)',
    company: 'KDB생명',
    logo: '/kdb-logo.png',
    path: '/insurance/annuity/kdb/happy-plus',
    description: '연단리 7% 보증으로 안정적인 노후 준비',
    badge: '',
    category: '연금보험',
    highlight: '연단리 7% 보증'
  }
];

// 채팅 시나리오 - 고객(customer)과 전문가(expert) 대화
export const chatScenarios: ChatScenario[] = [
  // 1. 실손보험 인상 관련
  [
    { role: "customer", text: "실손보험료가 다음달에 또 오른다고 들었는데요 😥" },
    { role: "expert", text: "네 맞아요. 연령 증가분도 있고, 손해율 때문에 전체적으로 인상됩니다." },
    { role: "customer", text: "지금 갈아타면 좀 낫나요?" },
    { role: "expert", text: "현재 조건이 더 유리해요! 지금 미리 점검해드릴게요 👍" }
  ],
  // 2. 종신보험 환급률
  [
    { role: "customer", text: "종신보험 10년 유지하면 130% 환급된다는거 진짜에요?" },
    { role: "expert", text: "네! KB 트리플레벨업이요. 5년납 기준 10년 유지시 130% 보증됩니다." },
    { role: "customer", text: "와 진짜요? 다른데는 그정도 안되던데" },
    { role: "expert", text: "맞아요, 현재 업계 최고 수준이에요. 자세한 설계 보내드릴까요?" }
  ],
  // 3. 암보험 가입 후기
  [
    { role: "customer", text: "저번에 추천해주신 암보험으로 가입했어요!" },
    { role: "expert", text: "오~ 잘 결정하셨어요! 보장 내용 다시 안내드릴까요?" },
    { role: "customer", text: "아뇨 괜찮아요! 주변에도 소개하려구요 ㅎㅎ" },
    { role: "expert", text: "감사해요 😊 궁금한거 있으시면 언제든 연락주세요!" }
  ],
  // 4. 간병인보험 문의
  [
    { role: "customer", text: "부모님이 70대신데 간병인보험 가입 가능한가요?" },
    { role: "expert", text: "네 가능해요! 간편심사형으로 가입 가능한 상품 있습니다." },
    { role: "customer", text: "간병비가 하루에 12만원이라던데 그것도 보장되나요?" },
    { role: "expert", text: "네, 하루 최대 20만원까지 보장되는 상품으로 설계해드릴게요!" }
  ],
  // 5. 보험료 절감
  [
    { role: "customer", text: "보험료가 너무 많이 나가서요... 월 40만원 넘게 내고 있어요" },
    { role: "expert", text: "어머, 좀 많으시네요. 보장 내용 한번 분석해볼까요?" },
    { role: "customer", text: "네 부탁드려요. 뭐가 뭔지 모르겠어서요 ㅠ" },
    { role: "expert", text: "걱정마세요! 꼭 필요한 보장만 남기고 정리해드릴게요 💪" }
  ],
  // 6. 연금보험 문의
  [
    { role: "customer", text: "연금보험 들려고 하는데 IBK랑 KDB 뭐가 나아요?" },
    { role: "expert", text: "IBK는 연단리 8%, KDB는 7% 보증이에요. 목적에 따라 달라요!" },
    { role: "customer", text: "평생 연금으로 받고 싶은데요" },
    { role: "expert", text: "그럼 IBK 평생연금이 더 맞으실 것 같아요. 설계서 보내드릴게요!" }
  ],
  // 7. 달러보험 문의
  [
    { role: "customer", text: "달러로 보험 들면 환율 때문에 손해볼 수도 있지 않나요?" },
    { role: "expert", text: "원화고정납입 옵션 있어요! 매달 동일한 원화로 납입 가능해요." },
    { role: "customer", text: "오 그런게 있어요? 그럼 환율 걱정 없겠네요" },
    { role: "expert", text: "네! 그리고 나중에 달러로 받으면 오히려 이득이 될 수도 있어요 👍" }
  ],
  // 8. 변액연금 문의
  [
    { role: "customer", text: "변액연금은 위험하다고 들었는데 괜찮은가요?" },
    { role: "expert", text: "요즘 상품은 최저보증이 있어서 안전해요! 연단리 7~8% 보증됩니다." },
    { role: "customer", text: "진짜요? 그럼 원금은 보장되는거에요?" },
    { role: "expert", text: "네, 보증형으로 가입하시면 원금 이상 보장돼요. 안심하세요!" }
  ],
  // 9. 종신보험 비교
  [
    { role: "customer", text: "신한이랑 하나 종신보험 중에 고민이에요" },
    { role: "expert", text: "환급률은 비슷한데, 하나는 간편심사가 가능해서 병력 있으시면 유리해요!" },
    { role: "customer", text: "아 저 고혈압 약 먹는데 가능할까요?" },
    { role: "expert", text: "네! 간편심사형으로 가입 가능하세요. 걱정마세요 😊" }
  ],
  // 10. 보장분석 후기
  [
    { role: "customer", text: "보장분석 받아보니까 중복되는게 엄청 많았어요 ㄷㄷ" },
    { role: "expert", text: "많이들 그러세요 ㅠ 정리하니까 어떠세요?" },
    { role: "customer", text: "월 15만원이나 줄었어요!! 진작 할 걸 그랬어요" },
    { role: "expert", text: "다행이에요! 절약한 돈으로 맛있는거 드세요 🍽️" }
  ]
];
