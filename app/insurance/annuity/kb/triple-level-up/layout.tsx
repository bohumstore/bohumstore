import { Metadata } from 'next';
import { generateProductMetadata, productMetadataMap } from '@/app/utils/metadata';

export const metadata: Metadata = generateProductMetadata(productMetadataMap['kb-triple-level-up']);

export default function KBTripleLevelUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
