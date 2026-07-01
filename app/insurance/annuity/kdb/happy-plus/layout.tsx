import { Metadata } from 'next';
import { generateProductMetadata, productMetadataMap } from '@/app/utils/metadata';

export const metadata: Metadata = generateProductMetadata(productMetadataMap['kdb-happy-plus']);

export default function KDBHappyPlusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
