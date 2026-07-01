import { Metadata } from 'next';
import { generateProductMetadata, productMetadataMap } from '@/app/utils/metadata';

export const metadata: Metadata = generateProductMetadata(productMetadataMap['im-plus-pro']);

export default function IMPlusProLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
