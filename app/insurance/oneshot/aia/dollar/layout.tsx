import { Metadata } from 'next';
import { generateProductMetadata, productMetadataMap } from '@/app/utils/metadata';

export const metadata: Metadata = generateProductMetadata(productMetadataMap['aia-dollar-oneshot']);

export default function AIADollarOneshotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
