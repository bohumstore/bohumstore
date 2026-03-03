'use client';

import { useMediaQuery } from 'react-responsive';

/**
 * 반응형 레이아웃을 위한 커스텀 훅
 * - isMobile: 1024px 미만 (sm, md 포함)
 * - isDesktop: 1024px 이상 (lg 이상)
 */
export function useResponsive() {
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  return {
    isMobile,
    isDesktop
  };
}
