import { Metadata } from 'next';
import { createInsuranceMetadata } from '@/src/lib/seo/createInsuranceMetadata';
import InsuranceStructuredData from '@/src/components/seo/InsuranceStructuredData';

export const metadata: Metadata = createInsuranceMetadata('metlife-usd');

export default function MetlifeUSDLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <InsuranceStructuredData productKey="metlife-usd" />
      {children}
    </>
  );
}
