import { Metadata } from 'next';
import { createInsuranceMetadata } from '@/src/lib/seo/createInsuranceMetadata';
import InsuranceStructuredData from '@/src/components/seo/InsuranceStructuredData';

export const metadata: Metadata = createInsuranceMetadata('kb-triple-level-up');

export default function KBTripleLevelUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <InsuranceStructuredData productKey="kb-triple-level-up" />
      {children}
    </>
  );
}
