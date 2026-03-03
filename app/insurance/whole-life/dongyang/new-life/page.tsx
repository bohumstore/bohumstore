'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function DongyangNewAlddulPlusWholeLifePage() {
  useEffect(() => {
    // 메인페이지로 리다이렉트
    window.location.href = '/';
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold">페이지 준비 중입니다</h1>
        <p className="mb-4 text-text-secondary">잠시 후 메인페이지로 이동합니다...</p>
        <Link href="/" className="text-brand-primary hover:underline">
          메인페이지로 이동
        </Link>
      </div>
    </div>
  );
}
