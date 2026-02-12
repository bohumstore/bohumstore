import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="mt-4 w-full border-t border-gray-200 bg-[#f8f8f8] py-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-1.5 px-4 text-center text-xs text-gray-500">
        <div className="mb-2 flex items-center justify-center gap-4">
          <Image
            src="/images/logos/metarich-logo.png"
            alt="MetaRich 로고"
            width={100}
            height={32}
            style={{ objectFit: 'contain', height: '32px' }}
          />
          <span className="mx-1 inline-block h-6 w-px bg-gray-300" />
          <Image
            src="/bohumstore-logo.png"
            alt="보험스토어 로고"
            width={100}
            height={32}
            style={{ objectFit: 'contain', height: '32px' }}
          />
        </div>
        <div>(주)메타리치보험대리점 | 대리점등록번호: 제2023070016호</div>
        <div>보험스토어 | 서지후 | 등록번호: 제20060383110008호</div>
        <div>대표전화: 1533-3776 | 이메일: urisky1@naver.com</div>
        <div className="mt-1">© {new Date().getFullYear()} BohumStore. All rights reserved.</div>
      </div>
    </footer>
  );
}
