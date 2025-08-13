import React from 'react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="w-full bg-[#f8f8f8] border-t border-gray-200 py-8 mt-4">
      <div className="max-w-5xl mx-auto px-4 text-center text-gray-500 text-sm flex flex-col gap-2">
        <div className="flex justify-center items-center gap-6 mb-2">
          <Image src="/metarich-logo1.png" alt="MetaRich 로고" width={120} height={40} style={{objectFit:'contain',height:'40px'}} />
          <span className="h-8 w-px bg-gray-300 mx-2 inline-block" />
          <Image src="/bohumstore-logo.png" alt="보험스토어 로고" width={120} height={40} style={{objectFit:'contain',height:'40px'}} />
        </div>
        {/* <div className="font-bold text-gray-700">보험스토어</div> */}
        <div>(주)메타리치보험대리점 | 대리점등록번호: 제2023070016호</div>
        <div>보험스토어 | 서지후 | 등록번호: 제20060383110008호</div>
        {/* <div>주소: 경기도 고양시 덕양구 꽃마을로 44, 4층(향동동,서원DMC타워)</div> */}
        <div>대표전화: 1533-3776 | 이메일: urisky1@naver.com</div>
        <div className="mt-2">© {new Date().getFullYear()} BohumStore. All rights reserved.</div>
      </div>
    </footer>
  )
} 