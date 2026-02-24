'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useResponsive } from '@/hooks/useResponsive';

export default function ContactSection() {
  const { isMobile } = useResponsive();

  return (
    <div className={`w-full mx-auto flex flex-col items-center gap-10 pt-10 pb-5 ${isMobile ? 'px-6' : 'max-w-[734px]'}`}>
      {/* Header */}
      <h2 className={`text-text-primary ${isMobile ? 'heading-3' : 'heading-1'}`}>언제든지 물어보세요.</h2>
      {/* Cards Container */}
      <div className={`w-full ${isMobile ? 'flex flex-col gap-4' : 'flex gap-6'}`}>
        {/* Call Center Card */}
        <div className={`bg-white border border-border-default rounded-[20px] p-8 flex flex-col justify-between relative overflow-hidden shadow-sm ${isMobile ? 'w-full h-[160px]' : 'flex-1 h-[180px]'}`}>
           <div className="flex flex-col z-10">
            <div className="heading-5 text-text-primary">전문상담원 연결하기</div>
            <div className={`text-brand-primary font-bold ${isMobile ? 'text-[26px]' : 'text-[32px]'}`}>1533-3776</div>
           </div>
           <Link href="tel:15333776" className="flex items-center text-text-muted hover:text-text-primary transition-colors body-m z-10">
              상담 예약하기 <ChevronRightIcon className="w-4 h-4 ml-1" />
           </Link>
           <div className={`absolute right-3 top-1/2 -translate-y-1/2 ${isMobile ? 'w-[100px] h-[85px]' : 'w-[140px] h-[120px]'}`}>
             <Image
               src="/svgs/main-contact-call.svg"
               alt="Call Center Agent"
               fill
               className="object-contain"
             />
           </div>
        </div>

        {/* Chat Consultation Card */}
         <div className={`bg-white border border-border-default rounded-[20px] p-8 flex flex-col justify-between relative overflow-hidden shadow-sm ${isMobile ? 'w-full h-[160px]' : 'flex-1 h-[180px]'}`}>
           <div className="flex flex-col gap-1 z-10">
            <div className="heading-3 text-text-primary">
              실시간 상담은<br />
              채팅으로 바로바로!
            </div>
           </div>
           <Link href="/consultation/chat" className="flex items-center text-text-muted hover:text-text-primary transition-colors body-m z-10">
              1:1 채팅상담 <ChevronRightIcon className="w-4 h-4 ml-1" />
           </Link>
           <div className={`absolute right-3 top-1/2 -translate-y-1/2 ${isMobile ? 'w-[90px] h-[75px]' : 'w-[120px] h-[100px]'}`}>
             <Image
               src="/svgs/main-contact-chat.svg"
               alt="Chat Icon"
               fill
               className="object-contain"
             />
           </div>
         </div>

      </div>
    </div>
  );
}
