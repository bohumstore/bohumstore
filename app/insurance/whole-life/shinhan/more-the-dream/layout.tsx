import { Metadata } from 'next';
import { generateProductMetadata, productMetadataMap } from '@/app/utils/metadata';

export const metadata: Metadata = generateProductMetadata(productMetadataMap['shinhan-more-the-dream']);

export default function ShinhanMoreTheDreamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
