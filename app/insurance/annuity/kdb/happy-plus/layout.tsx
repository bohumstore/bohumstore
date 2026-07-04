import { Metadata } from 'next';
import { createInsuranceMetadata } from '@/src/lib/seo/createInsuranceMetadata';
import InsuranceStructuredData from '@/src/components/seo/InsuranceStructuredData';

export const metadata: Metadata = createInsuranceMetadata('kdb-happy-plus');

export default function KDBHappyPlusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <InsuranceStructuredData productKey="kdb-happy-plus" />
      {children}
    </>
  );
}
