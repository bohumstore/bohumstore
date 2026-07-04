// Schema.org 구조화 데이터 생성 함수

import { BreadcrumbItem, FaqItem } from './insuranceMetadata';

const BASE_URL = 'https://bohumstore.net';

/**
 * Breadcrumb Schema 생성
 * @param breadcrumbs - Breadcrumb 아이템 배열
 * @returns BreadcrumbList JSON-LD
 */
export function createBreadcrumbSchema(breadcrumbs: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

/**
 * Insurance Product Schema 생성 (FinancialProduct)
 * @param productData - 상품 SEO 데이터
 * @returns FinancialProduct JSON-LD
 */
export function createInsuranceProductSchema(productData: {
  productName?: string;
  description: string;
  company?: string;
  category?: string;
  slug: string;
  ogImage?: string;
  benefitSummary?: string;
}) {
  const productUrl = `${BASE_URL}${productData.slug}`;
  const consultUrl = `${BASE_URL}/insurance/a_consult`;

  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: productData.productName || '보험 상품',
    description: productData.description,
    provider: {
      '@type': 'Organization',
      name: productData.company || '보험스토어',
      url: BASE_URL
    },
    category: productData.category || 'Insurance',
    url: productUrl,
    ...(productData.ogImage && { image: productData.ogImage }),
    ...(productData.benefitSummary && {
      additionalProperty: {
        '@type': 'PropertyValue',
        name: '주요 혜택',
        value: productData.benefitSummary
      }
    }),
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: consultUrl,
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform'
        ]
      },
      result: {
        '@type': 'Reservation',
        name: '보험 상담 신청'
      }
    }
  };
}

/**
 * FAQ Schema 생성
 * @param faq - FAQ 아이템 배열
 * @returns FAQPage JSON-LD 또는 null
 */
export function createFaqSchema(faq?: FaqItem[]) {
  if (!faq || faq.length === 0) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

/**
 * Organization Schema 생성 (보험스토어)
 */
export function createOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '보험스토어',
    alternateName: 'BohumStore',
    url: BASE_URL,
    logo: `${BASE_URL}/bohumstore-logo.png`,
    description: '연금보험, 종신보험, 저축보험 비교 및 전문 상담 플랫폼',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+82-1533-3776',
      contactType: 'customer service',
      areaServed: 'KR',
      availableLanguage: 'Korean'
    },
    sameAs: [
      'https://pf.kakao.com/_lrubxb'
    ]
  };
}

/**
 * WebSite Schema 생성
 */
export function createWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '보험스토어',
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}
