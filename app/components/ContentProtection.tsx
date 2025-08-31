'use client';

import { useEffect } from 'react';

export default function ContentProtection() {
  useEffect(() => {
    // 개발 환경에서는 보호 기능 비활성화
    const isDevelopment = process.env.NODE_ENV === 'development' || 
                         window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1' ||
                         window.location.port !== '';
    
    if (isDevelopment) {
      return;
    }

    // 우클릭 방지
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // 키보드 단축키 방지
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12 (개발자 도구)
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }
      
      // Ctrl 조합 키들
      if (e.ctrlKey || e.metaKey) {
        // Ctrl+S (저장)
        if (e.key === 's' || e.key === 'S') {
          e.preventDefault();
          return false;
        }
        // Ctrl+A (전체 선택)
        if (e.key === 'a' || e.key === 'A') {
          e.preventDefault();
          return false;
        }
        // Ctrl+C (복사)
        if (e.key === 'c' || e.key === 'C') {
          e.preventDefault();
          return false;
        }
        // Ctrl+V (붙여넣기)
        if (e.key === 'v' || e.key === 'V') {
          e.preventDefault();
          return false;
        }
        // Ctrl+X (잘라내기)
        if (e.key === 'x' || e.key === 'X') {
          e.preventDefault();
          return false;
        }
        // Ctrl+U (소스 보기)
        if (e.key === 'u' || e.key === 'U') {
          e.preventDefault();
          return false;
        }
        // Ctrl+P (인쇄)
        if (e.key === 'p' || e.key === 'P') {
          e.preventDefault();
          return false;
        }
        // Ctrl+Shift+I (개발자 도구)
        if (e.shiftKey && (e.key === 'i' || e.key === 'I')) {
          e.preventDefault();
          return false;
        }
        // Ctrl+Shift+J (콘솔)
        if (e.shiftKey && (e.key === 'j' || e.key === 'J')) {
          e.preventDefault();
          return false;
        }
        // Ctrl+Shift+C (요소 검사)
        if (e.shiftKey && (e.key === 'c' || e.key === 'C')) {
          e.preventDefault();
          return false;
        }
      }
    };

    // 드래그 방지
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // 텍스트 선택 방지
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // 인쇄 방지
    const handleBeforePrint = (e: Event) => {
      e.preventDefault();
      alert('인쇄가 허용되지 않습니다.');
      return false;
    };

    // 개발자 도구 탐지 (크기 변화 감지)
    let devtools = { open: false };
    const threshold = 160;
    
    const checkDevTools = () => {
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools.open) {
          devtools.open = true;
          alert('개발자 도구는 사용할 수 없습니다.');
          window.location.reload();
        }
      } else {
        devtools.open = false;
      }
    };

    // 이벤트 리스너 등록
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('selectstart', handleSelectStart);
    window.addEventListener('beforeprint', handleBeforePrint);
    
    // 개발자 도구 감지 (주기적 체크)
    const devToolsInterval = setInterval(checkDevTools, 500);

    // 콘솔 메시지 숨기기 시도
    if (typeof window !== 'undefined') {
      // 콘솔 메서드들을 빈 함수로 오버라이드
      const noop = () => {};
      window.console.log = noop;
      window.console.warn = noop;
      window.console.error = noop;
      window.console.info = noop;
      window.console.debug = noop;
    }

    // 정리 함수
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('selectstart', handleSelectStart);
      window.removeEventListener('beforeprint', handleBeforePrint);
      clearInterval(devToolsInterval);
    };
  }, []);

  // 개발 환경에서는 아무것도 렌더링하지 않음
  const isDevelopment = process.env.NODE_ENV === 'development' || 
                       (typeof window !== 'undefined' && (
                         window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1' ||
                         window.location.port !== ''
                       ));
  
  if (isDevelopment) {
    return null;
  }

  return null; // 이 컴포넌트는 UI를 렌더링하지 않고 이벤트만 처리
}
