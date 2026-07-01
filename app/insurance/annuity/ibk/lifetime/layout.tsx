import { Metadata } from 'next';
import { generateProductMetadata, productMetadataMap } from '@/app/utils/metadata';

export const metadata: Metadata = generateProductMetadata(productMetadataMap['ibk-lifetime']);

export default function IBKLifetimeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
