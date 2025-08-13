import React from 'react'
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-center py-6 px-4 md:px-12 bg-[#f8f8f8] border-b border-gray-200">
      <Image src="/bohumstore-logo.png" alt="보험스토어 로고" width={220} height={60} priority />
    </header>
  )
} 