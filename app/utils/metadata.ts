import { Metadata } from 'next';

interface ProductMetadata {
  title: string;
  description: string;
  keywords: string;
  path: string;
  company: string;
  productName: string;
  highlight?: string;
}

export function generateProductMetadata(product: ProductMetadata): Metadata {
  const fullTitle = `${product.productName} | ${product.company} | 보험스토어`;
  const fullUrl = `https://bohumstore.net${product.path}`;
  
  return {
    title: fullTitle,
    description: product.description,
    keywords: product.keywords,
    authors: [{ name: '보험스토어' }],
    creator: '보험스토어',
    publisher: '보험스토어',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: fullTitle,
      description: product.description,
      url: fullUrl,
      siteName: '보험스토어',
      images: [
        {
          url: 'https://bohumstore.net/kakao-img.png',
          width: 1000,
          height: 500,
          alt: `${product.productName} - 보험스토어`,
        },
      ],
      type: 'website',
      locale: 'ko_KR',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: product.description,
      images: ['https://bohumstore.net/kakao-img.png'],
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}

// 각 상품별 메타데이터 정의
export const productMetadataMap = {
  'metlife-only-dollar': {
    title: '메트라이프 오로지연금을위한 달러연금보험',
    description: '공시이율 4.69%, 10년시점 130% 환급률 보증(5년납). 0~70세 가입 가능, 무진단·무심사, 추가납입·중도인출·연금전환 가능한 달러연금보험',
    keywords: '메트라이프, 달러연금보험, 오로지연금을위한, 달러보험, 환급률130%, 공시이율4.69%, 무진단연금보험, 무심사연금보험, 추가납입, 중도인출, 연금전환, 달러자산, 외화보험, 메트라이프생명',
    path: '/insurance/annuity/metlife/only-dollar',
    company: '메트라이프생명',
    productName: '(무)오로지연금을위한 달러연금보험',
    highlight: '10년시점 130% 보증'
  },
  'aia-dollar-oneshot': {
    title: 'AIA 달러 일시납 연금보험',
    description: '10년 확정이율 5.27%, 10년시점 해약환급률 156.96%. 연금개시시점 5% 추가보너스 지급, 달러로 받아 환차익 기대 가능한 일시납 연금보험',
    keywords: 'AIA생명, 달러일시납, 일시납연금보험, 달러보험, 확정이율5.27%, 환급률156%, 추가보너스, 환차익, 달러자산, 외화보험, 일시납',
    path: '/insurance/oneshot/aia/dollar',
    company: 'AIA생명',
    productName: 'AIA 달러 일시납 연금보험',
    highlight: '확정이율 5.27%'
  },
  'kb-triple-level-up': {
    title: 'KB 트리플 레벨업 연금보험(보증형)',
    description: '10년시점 130% 해약환급률 보증. 5년납 단기완납, 병력 무심사 가입 가능, 최저계약자적립액 보증형 연금보험',
    keywords: 'KB라이프, KB생명, 트리플레벨업, 연금보험, 보증형연금, 환급률130%, 5년납, 단기납, 무심사, 병력무심사, 최저적립액보증',
    path: '/insurance/annuity/kb/triple-level-up',
    company: 'KB라이프생명',
    productName: 'KB 트리플 레벨업 연금보험(보증형)',
    highlight: '10년시점 130% 보증'
  },
  'im-plus-pro': {
    title: 'IM Plus PRO연금보험 무배당 2604(보증비용부과형)',
    description: '10년시점 133% 환급률 보증(5년납). 목돈마련과 노후준비 동시에, 0~70세 가입, 비과세 혜택(월 150만원 한도), 병력 무심사',
    keywords: 'IM라이프, IM생명, PlusPRO, 연금보험, 환급률133%, 보증형연금, 5년납, 비과세, 세제혜택, 무심사, 목돈마련, 노후준비',
    path: '/insurance/annuity/im/plus-pro',
    company: 'IM라이프생명',
    productName: 'IM Plus PRO연금보험 무배당 2604(보증비용부과형)',
    highlight: '10년시점 133% 보증'
  },
  'ibk-lifetime': {
    title: 'IBK 평생보증받는 변액연금보험',
    description: '업계 최고 연단리 8% 보증. 평생 연금 지급, 변액형 연금의 성장성과 보증을 동시에',
    keywords: 'IBK생명, IBK연금, 평생연금, 변액연금보험, 연단리8%, 8%보증, 평생보증, 변액보험',
    path: '/insurance/annuity/ibk/lifetime',
    company: 'IBK생명',
    productName: 'IBK 평생보증받는 변액연금보험',
    highlight: '연단리 8% 보증'
  },
  'kdb-happy-plus': {
    title: 'KDB 행복플러스 연금보험(보증형)',
    description: '연단리 7% 보증으로 안정적인 노후 준비. 최저계약자적립액 보증형 연금보험',
    keywords: 'KDB생명, 행복플러스, 연금보험, 보증형연금, 연단리7%, 7%보증, 최저적립액보증, 안정적노후',
    path: '/insurance/annuity/kdb/happy-plus',
    company: 'KDB생명',
    productName: 'KDB 행복플러스 연금보험(보증형)',
    highlight: '연단리 7% 보증'
  },
  'kdb-happy-dream': {
    title: 'KDB 행복드림 변액연금보험',
    description: '연단리 7% 보증 + 추가 수익. 변액형 연금의 성장성, 유연한 연금 수령 방식',
    keywords: 'KDB생명, 행복드림, 변액연금보험, 연단리7%, 7%보증, 변액보험, 추가수익, 성장성',
    path: '/insurance/annuity/kdb/happy-dream',
    company: 'KDB생명',
    productName: 'KDB 행복드림 변액연금보험',
    highlight: '연단리 7% 보증'
  },
  'metlife-usd': {
    title: '메트라이프 달러종신보험Plus',
    description: '10년시점 124.9% 환급률. 달러/원화 선택 수령 가능, 원화고정납입으로 환율 걱정 없음, 15~70세 가입 가능',
    keywords: '메트라이프, 달러종신보험, 종신보험, 달러보험, 환급률124%, 달러원화선택, 원화고정납입, 외화보험, 메트라이프생명',
    path: '/insurance/whole-life/metlife/usd',
    company: '메트라이프생명',
    productName: '메트라이프 달러종신보험Plus',
    highlight: '10년시점 124.9%'
  },
  'shinhan-more-the-dream': {
    title: '신한 모아더드림Plus 종신보험',
    description: '10년시점 120.5% 환급률(일반심사형 기준). 일반심사형/간편심사형 선택 가능, 평생 든든한 종신보장, 납입완료보너스·장기유지보너스 제공',
    keywords: '신한라이프, 신한생명, 모아더드림, 종신보험, 환급률120%, 일반심사형, 간편심사형, 종신보장, 납입완료보너스, 장기유지보너스',
    path: '/insurance/whole-life/shinhan/more-the-dream',
    company: '신한라이프생명',
    productName: '신한 모아더드림Plus 종신보험',
    highlight: '10년시점 120.5%'
  },
  'hana-hanaro': {
    title: '하나로 THE 연결된 종신보험',
    description: '10년시점 120.53% 환급률. 간편심사형으로도 가입 가능, 사망을 주된 보장으로 하는 보장성 종신보험, 해약환급금 일부지급형',
    keywords: '하나생명, 하나로THE연결된, 종신보험, 환급률120%, 간편심사형, 보장성종신보험, 해약환급금일부지급형',
    path: '/insurance/whole-life/hana/hanaro',
    company: '하나생명',
    productName: '하나로 THE 연결된 종신보험',
    highlight: '10년시점 120.53%'
  },
  'carer': {
    title: '간병보험 비교 및 상담',
    description: '간병보험 상품 비교 및 전문 상담. 노후 간병비 준비, 치매·중증질환 대비',
    keywords: '간병보험, 간병비, 노후간병, 치매보험, 중증질환, 간병비용, 장기간병',
    path: '/insurance/carer',
    company: '보험스토어',
    productName: '간병보험',
    highlight: '노후 간병비 준비'
  }
};
