'use client';

import Script from 'next/script';
import { insuranceMetadata } from '@/src/lib/seo/insuranceMetadata';
import { 
  createBreadcrumbSchema, 
  createInsuranceProductSchema, 
  createFaqSchema 
} from '@/src/lib/seo/schema';

interface InsuranceStructuredDataProps {
  productKey: string;
}

/**
 * 보험 상품 구조화 데이터 컴포넌트
 * - Breadcrumb Schema
 * - Insurance Product Schema (FinancialProduct)
 * - FAQ Schema (있는 경우만)
 */
export default function InsuranceStructuredData({ productKey }: InsuranceStructuredDataProps) {
  const product = insuranceMetadata[productKey];

  if (!product) {
    console.warn(`[SEO] Product not found for structured data: ${productKey}`);
    return null;
  }

  // Breadcrumb Schema
  const breadcrumbSchema = product.breadcrumbs 
    ? createBreadcrumbSchema(product.breadcrumbs)
    : null;

  // Insurance Product Schema
  const productSchema = createInsuranceProductSchema({
    productName: product.productName,
    description: product.description,
    company: product.company,
    category: product.category,
    slug: product.slug,
    ogImage: product.ogImage,
    benefitSummary: product.benefitSummary
  });

  // FAQ Schema (있는 경우만)
  const faqSchema = createFaqSchema(product.faq);

  return (
    <>
      {/* Breadcrumb Schema */}
      {breadcrumbSchema && (
        <Script
          id={`breadcrumb-schema-${productKey}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema)
          }}
        />
      )}

      {/* Insurance Product Schema */}
      <Script
        id={`product-schema-${productKey}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema)
        }}
      />

      {/* FAQ Schema */}
      {faqSchema && (
        <Script
          id={`faq-schema-${productKey}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema)
          }}
        />
      )}
    </>
  );
}
