'use client';

import { useSyncExternalStore } from 'react';

/**
 * 반응형 레이아웃을 위한 커스텀 훅
 * - isMobile: 1024px 미만 (sm, md 포함)
 * - isDesktop: 1024px 이상 (lg 이상)
 */
export function useResponsive() {
  const subscribe = (query: string) => (callback: () => void) => {
    if (typeof window === 'undefined') return () => {};

    const mediaQuery = window.matchMedia(query);
    const onChange = () => callback();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', onChange);
      return () => mediaQuery.removeEventListener('change', onChange);
    }

    mediaQuery.addListener(onChange);
    return () => mediaQuery.removeListener(onChange);
  };

  const getSnapshot = (query: string) => () =>
    typeof window !== 'undefined' && window.matchMedia(query).matches;

  const getServerSnapshot = () => false;

  const isMobile = useSyncExternalStore(
    subscribe('(max-width: 1023px)'),
    getSnapshot('(max-width: 1023px)'),
    getServerSnapshot
  );

  const isDesktop = useSyncExternalStore(
    subscribe('(min-width: 1024px)'),
    getSnapshot('(min-width: 1024px)'),
    getServerSnapshot
  );

  return {
    isMobile,
    isDesktop
  };
}
