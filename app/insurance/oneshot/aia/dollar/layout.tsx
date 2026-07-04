import { Metadata } from 'next';
import { createInsuranceMetadata } from '@/src/lib/seo/createInsuranceMetadata';
import InsuranceStructuredData from '@/src/components/seo/InsuranceStructuredData';

export const metadata: Metadata = createInsuranceMetadata('aia-dollar-oneshot');

export default function AIADollarOneshotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <InsuranceStructuredData productKey="aia-dollar-oneshot" />
      {children}
    </>
  );
}
