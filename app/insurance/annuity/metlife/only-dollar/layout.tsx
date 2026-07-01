import { Metadata } from 'next';
import { generateProductMetadata, productMetadataMap } from '@/app/utils/metadata';
import StructuredData, { BreadcrumbStructuredData } from '@/app/components/shared/StructuredData';
import { productStructuredDataMap } from '@/app/utils/structuredDataConfig';

export const metadata: Metadata = generateProductMetadata(productMetadataMap['metlife-only-dollar']);

export default function MetlifeOnlyDollarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbItems = [
    { name: '홈', url: 'https://bohumstore.net' },
    { name: '연금보험', url: 'https://bohumstore.net/insurance/annuity' },
    { name: '메트라이프 달러연금보험', url: 'https://bohumstore.net/insurance/annuity/metlife/only-dollar' }
  ];

  return (
    <>
      <StructuredData product={productStructuredDataMap['metlife-only-dollar']} />
      <BreadcrumbStructuredData items={breadcrumbItems} />
      {children}
    </>
  );
}
