'use client';

import { useEffect } from 'react';

export default function BodyClassManager() {
  useEffect(() => {
    // 개발 환경 체크
    const isDevelopment = process.env.NODE_ENV === 'development' || 
                         window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1' ||
                         window.location.port !== '';
    
    // body에 보호 클래스 적용/제거
    if (!isDevelopment) {
      document.body.classList.add('content-protection');
    } else {
      document.body.classList.remove('content-protection');
    }

    // 컴포넌트 언마운트 시 클래스 제거 (클린업)
    return () => {
      document.body.classList.remove('content-protection');
    };
  }, []);

  return null;
}
