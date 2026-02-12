import React from 'react';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="flex w-full items-center justify-center border-b border-gray-200 bg-[#f8f8f8] px-4 py-6 md:px-12">
      <Image src="/bohumstore-logo.png" alt="보험스토어 로고" width={220} height={60} priority />
    </header>
  );
}
