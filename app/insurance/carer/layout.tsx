import { Metadata } from 'next';
import { generateProductMetadata, productMetadataMap } from '@/app/utils/metadata';

export const metadata: Metadata = generateProductMetadata(productMetadataMap['carer']);

export default function CarerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
