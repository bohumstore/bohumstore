import { Metadata } from 'next';
import { insuranceMetadata, categoryMetadata, comparisonMetadata, InsuranceMetadataConfig, CategoryMetadataConfig } from './insuranceMetadata';

const BASE_URL = 'https://bohumstore.net';

/**
 * slug로부터 canonical URL 자동 생성
 * @param slug - URL 경로 (예: '/insurance/annuity/kb/triple-level-up')
 * @returns 완전한 canonical URL
 */
function generateCanonicalUrl(slug: string): string {
  // slug가 이미 https://로 시작하면 그대로 반환
  if (slug.startsWith('http')) {
    return slug;
  }
  // 슬래시로 시작하지 않으면 추가
  const normalizedSlug = slug.startsWith('/') ? slug : `/${slug}`;
  return `${BASE_URL}${normalizedSlug}`;
}

/**
 * 보험 상품 메타데이터 생성 함수
 * @param productKey - insuranceMetadata의 키값 (예: 'kb-triple-level-up')
 * @returns Next.js Metadata 객체
 */
export function createInsuranceMetadata(productKey: string): Metadata {
  const product = insuranceMetadata[productKey];
  
  if (!product) {
    console.warn(`[SEO] Product metadata not found for key: ${productKey}`);
    return createDefaultMetadata();
  }

  return generateMetadata(product);
}

/**
 * 카테고리 페이지 메타데이터 생성 함수
 * @param categoryKey - categoryMetadata의 키값 (예: 'annuity', 'whole-life')
 * @returns Next.js Metadata 객체
 */
export function createCategoryMetadata(categoryKey: string): Metadata {
  const category = categoryMetadata[categoryKey];
  
  if (!category) {
    console.warn(`[SEO] Category metadata not found for key: ${categoryKey}`);
    return createDefaultMetadata();
  }

  return generateMetadata(category);
}

/**
 * 비교 페이지 메타데이터 생성 함수
 * @param comparisonKey - comparisonMetadata의 키값 (예: 'top-refund')
 * @returns Next.js Metadata 객체
 */
export function createComparisonMetadata(comparisonKey: string): Metadata {
  const comparison = comparisonMetadata[comparisonKey];
  
  if (!comparison) {
    console.warn(`[SEO] Comparison metadata not found for key: ${comparisonKey}`);
    return createDefaultMetadata();
  }

  return generateMetadata(comparison);
}

/**
 * 공통 메타데이터 생성 로직
 */
function generateMetadata(config: InsuranceMetadataConfig | CategoryMetadataConfig): Metadata {
  // InsuranceMetadataConfig인 경우 slug 사용, CategoryMetadataConfig인 경우 canonical 사용
  const canonicalUrl = 'slug' in config 
    ? generateCanonicalUrl(config.slug) 
    : config.canonical;

  const { title, description, keywords } = config;
  const ogImage = 'ogImage' in config ? config.ogImage : undefined;
  const category = 'category' in config ? config.category : undefined;

  return {
    title,
    description,
    keywords,
    authors: [{ name: '보험스토어' }],
    creator: '보험스토어',
    publisher: '보험스토어',
    ...(category && { category }),
    classification: '보험, 금융',
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
      title,
      description,
      url: canonicalUrl,
      siteName: '보험스토어',
      images: [
        {
          url: ogImage || 'https://bohumstore.net/kakao-img.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
      locale: 'ko_KR',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage || 'https://bohumstore.net/kakao-img.png'],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

/**
 * 기본 메타데이터 (fallback)
 */
function createDefaultMetadata(): Metadata {
  return {
    title: '보험스토어 | 연금보험 비교 · 종신보험 비교 · 저축보험 비교',
    description: '연금보험, 변액연금보험, 달러연금보험, 종신보험, 저축보험 환급률 비교 및 보험료 계산. 보험사별 상품을 비교하고 전문 상담을 받아보세요.',
    keywords: '보험스토어, 보험비교, 보험상담, 연금보험, 연금보험비교, 변액연금보험, 달러연금보험, 종신보험, 종신보험비교, 저축보험, 환급률, 해약환급금, 보험료계산, 최저보증연금, 단기납종신보험, 간병보험, 암보험',
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
      title: '보험스토어 | Bohumstore',
      description: '연금보험, 종신보험, 저축보험 비교 및 상담',
      url: 'https://bohumstore.net',
      siteName: '보험스토어',
      images: [
        {
          url: 'https://bohumstore.net/kakao-img.png',
          width: 1200,
          height: 630,
          alt: '보험스토어 - 연금보험, 종신보험, 저축보험 비교 및 상담',
        },
      ],
      type: 'website',
      locale: 'ko_KR',
    },
    twitter: {
      card: 'summary_large_image',
      title: '보험스토어 | Bohumstore',
      description: '연금보험, 종신보험, 저축보험 비교 및 상담',
      images: ['https://bohumstore.net/kakao-img.png'],
    },
    alternates: {
      canonical: 'https://bohumstore.net',
    },
  };
}

/**
 * 동적 메타데이터 생성 (향후 확장용)
 * @param type - 'product' | 'category' | 'comparison'
 * @param key - 해당 타입의 키값
 */
export function createDynamicMetadata(type: 'product' | 'category' | 'comparison', key: string): Metadata {
  switch (type) {
    case 'product':
      return createInsuranceMetadata(key);
    case 'category':
      return createCategoryMetadata(key);
    case 'comparison':
      return createComparisonMetadata(key);
    default:
      return createDefaultMetadata();
  }
}
