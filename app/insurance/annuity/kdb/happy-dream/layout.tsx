import { Metadata } from 'next';
import { generateProductMetadata, productMetadataMap } from '@/app/utils/metadata';

export const metadata: Metadata = generateProductMetadata(productMetadataMap['kdb-happy-dream']);

export default function KDBHappyDreamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
