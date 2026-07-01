import { Metadata } from 'next';
import { generateProductMetadata, productMetadataMap } from '@/app/utils/metadata';

export const metadata: Metadata = generateProductMetadata(productMetadataMap['metlife-usd']);

export default function MetlifeUSDLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
