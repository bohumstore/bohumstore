import React from 'react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="w-full bg-[#f8f8f8] border-t border-gray-200 py-8 mt-4">
      <div className="max-w-5xl mx-auto px-4 text-center text-gray-500 text-xs flex flex-col gap-1.5">
        <div className="flex justify-center items-center gap-4 mb-2">
          <Image src="/metarich-logo1.png" alt="MetaRich 로고" width={100} height={32} style={{objectFit:'contain',height:'32px'}} />
          <span className="h-6 w-px bg-gray-300 mx-1 inline-block" />
          <Image src="/bohumstore-logo.png" alt="보험스토어 로고" width={100} height={32} style={{objectFit:'contain',height:'32px'}} />
        </div>
        <div>(주)메타리치보험대리점 | 대리점등록번호: 제2023070016호</div>
        <div>보험스토어 | 서지후 | 등록번호: 제20060383110008호</div>
        <div>대표전화: 1533-3776 | 이메일: urisky1@naver.com</div>
        <div className="mt-1">© {new Date().getFullYear()} BohumStore. All rights reserved.</div>
      </div>
    </footer>
  )
}
