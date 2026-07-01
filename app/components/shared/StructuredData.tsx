import Script from 'next/script';

interface FinancialProductData {
  name: string;
  description: string;
  provider: string;
  category: string;
  url: string;
  image?: string;
  offers?: {
    price?: string;
    priceCurrency?: string;
    availability?: string;
  };
}

interface StructuredDataProps {
  product: FinancialProductData;
}

export default function StructuredData({ product }: StructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: product.name,
    description: product.description,
    provider: {
      '@type': 'Organization',
      name: product.provider,
      url: 'https://bohumstore.net'
    },
    category: product.category,
    url: product.url,
    ...(product.image && { image: product.image }),
    ...(product.offers && {
      offers: {
        '@type': 'Offer',
        ...product.offers
      }
    })
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

// 보험스토어 조직 정보
export function OrganizationStructuredData() {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '보험스토어',
    alternateName: 'BohumStore',
    url: 'https://bohumstore.net',
    logo: 'https://bohumstore.net/bohumstore-logo.png',
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

  return (
    <Script
      id="organization-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
    />
  );
}

// 웹사이트 정보
export function WebsiteStructuredData() {
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '보험스토어',
    url: 'https://bohumstore.net',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://bohumstore.net/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <Script
      id="website-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
    />
  );
}

// Breadcrumb 정보
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbStructuredData({ items }: BreadcrumbProps) {
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return (
    <Script
      id="breadcrumb-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
    />
  );
}
