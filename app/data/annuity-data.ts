// 연금보험 페이지 데이터 - 상품, 특징

// 타입 정의
export interface AnnuityProduct {
  id: string;
  name: string;
  company: string;
  logo: string;
  path: string;
  description: string;
  features: string[];
  rating: number;
  reviewCount: number;
  badge: string;
  price: string;
  category: string;
}

// 연금보험 상품 데이터
export const annuityProducts: AnnuityProduct[] = [
  {
    id: 'kdb-happy-plus',
    name: 'KDB 해피플러스 연금보험',
    company: 'KDB생명',
    logo: '/kdb-logo.png',
    path: '/insurance/annuity/kdb/happy-plus',
    description: '안정적인 노후 준비를 위한 최고의 선택',
    features: [
      '안정적인 연금 수령',
      '사망보장',
      '해지환급금 보장',
      '다양한 납입방식'
    ],
    rating: 4.8,
    reviewCount: 127,
    badge: 'BEST',
    price: '월 10만원부터',
    category: '확정연금'
  },
  {
    id: 'kdb-happy-dream',
    name: 'KDB 해피드림 연금보험',
    company: 'KDB생명',
    logo: '/kdb-logo.png',
    path: '/insurance/annuity/kdb/happy-dream',
    description: '높은 연금 수령과 투자형 연금의 장점',
    features: [
      '높은 연금 수령',
      '투자형 연금',
      '유연한 납입',
      '수익률 연동'
    ],
    rating: 4.6,
    reviewCount: 89,
    badge: 'NEW',
    price: '월 15만원부터',
    category: '변액연금'
  },
  {
    id: 'ibk-lifetime',
    name: 'IBK 평생연금보험',
    company: 'IBK연금보험',
    logo: '/IBK-logo.png',
    path: '/insurance/annuity/ibk/lifetime',
    description: '평생 연금 보장과 안정적인 수익',
    features: [
      '평생 연금 보장',
      '안정적인 수익',
      '다양한 납입방식',
      '사망보장'
    ],
    rating: 4.7,
    reviewCount: 156,
    badge: 'HOT',
    price: '월 12만원부터',
    category: '확정연금'
  }
];
