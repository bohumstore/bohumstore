import { Metadata } from 'next';
import { generateProductMetadata, productMetadataMap } from '@/app/utils/metadata';

export const metadata: Metadata = generateProductMetadata(productMetadataMap['hana-hanaro']);

export default function HanaHanaroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
