'use client';

import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { supabase } from '@/app/api/supabase';
import { toKSTString } from '@/lib/time';
import logger from '@/lib/logger';
import type { VisitorData, StatsData, VisitorFilters } from '@/types/visitor';

export default function VisitorTrackingPage() {
  const [visitors, setVisitors] = useState<VisitorData[]>([]);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const lastRefreshRef = useRef<number>(0);
  const [filters, setFilters] = useState<VisitorFilters>({
    counsel_type_id: '',
    date_from: '',
    date_to: '',
    traffic_source: '',
    device_type: '',
    search_engine: '',
    device_model: '',
    search_keyword: '',
  });

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    fetchVisitors();
    fetchStats();
  }, [currentPage, filters]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const safeRefresh = () => {
    const now = Date.now();
    if (now - lastRefreshRef.current < 5000) return; // 5초 이내 중복 요청 방지
    lastRefreshRef.current = now;
    fetchVisitors();
    fetchStats();
  };

  const getFullReferrer = (ref: string | null): string => ref || '-';

  const getDomainFromUrl = (ref: string | null): string => {
    if (!ref) return '-';
    try {
      const u = new URL(ref);
      return u.hostname.replace(/^www\./, '') || ref;
    } catch {
      return ref;
    }
  };

  const getQueryFromRef = (ref: string | null): string | null => {
    if (!ref) return null;
    try {
      const u = new URL(ref);
      return (
        u.searchParams.get('query') ||
        u.searchParams.get('q') ||
        u.searchParams.get('keyword') ||
        null
      );
    } catch {
      return null;
    }
  };

  const formatReferrerForDisplay = (ref: string | null, keyword?: string | null): string => {
    const domain = getDomainFromUrl(ref);
    const q = (keyword && keyword.trim()) || getQueryFromRef(ref);
    return q ? `${domain} - '${q}'` : domain;
  };

  // 실시간 업데이트
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let pollingTimer: any = null;
    let subscribed = false;

    const startFallbackPolling = () => {
      if (pollingTimer) return;
      pollingTimer = setInterval(() => {
        if (typeof document === 'undefined' || document.visibilityState !== 'visible') return;
        safeRefresh();
      }, 5000); // 5초 주기 폴링
    };

    const stopFallbackPolling = () => {
      if (pollingTimer) {
        clearInterval(pollingTimer);
        pollingTimer = null;
      }
    };

    const channel = supabase
      .channel('realtime:visitor_tracking')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'visitor_tracking' },
        () => {
          safeRefresh();
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          subscribed = true;
          stopFallbackPolling();
        }
      });

    // 4초 안에 구독이 안되면 폴링 백업 가동
    const subscribeTimeout = setTimeout(() => {
      if (!subscribed) startFallbackPolling();
    }, 4000);

    return () => {
      clearTimeout(subscribeTimeout);
      stopFallbackPolling();
      try {
        supabase.removeChannel(channel);
      } catch {}
    };
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  // 선택적 자동 새로고침 (기본 OFF, 5초)
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      if (typeof document === 'undefined' || document.visibilityState !== 'visible') return;
      safeRefresh();
    }, 5000); // 5초
    return () => clearInterval(interval);
  }, [autoRefresh]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const fetchVisitors = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '50',
        ...filters,
      });

      logger.debug('ADMIN', '방문자 데이터 요청 시작...');
      logger.debug(
        'ADMIN',
        '요청 파라미터:',
        params.toString(),
        'URL:',
        `/api/track-visitor?${params}`
      );

      const response = await fetch(`/api/track-visitor?${params}`, {
        cache: 'no-store',
        headers: { 'cache-control': 'no-cache' },
      });
      logger.debug('ADMIN', 'API 응답 상태:', response.status, response.statusText);

      const data = await response.json();
      logger.debug(
        'ADMIN',
        '방문자 데이터 응답 길이:',
        Array.isArray(data?.data) ? data.data.length : 'N/A'
      );

      console.log('[ADMIN] 응답 데이터 구조:', {
        hasData: !!data.data,
        dataType: typeof data.data,
        isArray: Array.isArray(data.data),
        dataLength: data.data?.length,
        dataKeys: data.data ? Object.keys(data.data) : 'N/A',
        fullResponse: data,
      });

      if (data.data && Array.isArray(data.data)) {
        setVisitors(data.data);
        setTotalPages(data.pagination?.totalPages || 1);
        logger.debug('ADMIN', '방문자 데이터 설정 완료:', data.data.length, '개');
      } else if (data.data && typeof data.data === 'object') {
        // 데이터가 객체인 경우 배열로 변환 시도
        const dataArray = Object.values(data.data);
        if (Array.isArray(dataArray)) {
          // 타입 안전성을 위해 VisitorData[]로 캐스팅
          setVisitors(dataArray as VisitorData[]);
          setTotalPages(data.pagination?.totalPages || 1);
          logger.debug('ADMIN', '객체를 배열로 변환하여 설정:', dataArray.length, '개');
        } else {
          logger.warn('ADMIN', '데이터를 배열로 변환할 수 없음');
          setVisitors([]);
          setTotalPages(1);
        }
      } else {
        logger.warn('ADMIN', '방문자 데이터 형식 오류');
        setVisitors([]);
        setTotalPages(1);
      }
    } catch (error) {
      logger.error('ADMIN', '방문자 데이터 조회 실패:', error);
      setVisitors([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const params = new URLSearchParams({
        date_from: filters.date_from,
        date_to: filters.date_to,
      });

      const response = await fetch(`/api/visitor-stats?${params}`, {
        cache: 'no-store',
        headers: { 'cache-control': 'no-cache' },
      });
      const data = await response.json();

      logger.debug('ADMIN', '통계 데이터 응답');

      if (data && typeof data.totalVisitors === 'number') {
        setStats(data);
        logger.debug('ADMIN', '통계 데이터 설정 완료');
      } else {
        console.warn('[ADMIN] 통계 데이터 형식 오류:', data);
        setStats(null);
      }
    } catch (error) {
      logger.error('ADMIN', '통계 데이터 조회 실패:', error);
      setStats(null);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const formatKST = (isoString: string): string => toKSTString(isoString);

  const exportToCSV = () => {
    if (!visitors.length) return;

    const headers = [
      '방문시간',
      '방문수',
      '유입사이트',
      '키워드',
      '모바일기종',
      '브라우저',
      '상담유형',
      '이름',
      '전화번호',
    ];

    // CSV 데이터 생성 (한글 깨짐 방지)
    const csvData = visitors.map((visitor) => [
      formatKST(visitor.created_at),
      visitor.session_count || 1,
      visitor.referrer || '',
      visitor.search_keyword || '',
      visitor.device_model || '',
      visitor.browser || '',
      visitor.counsel_type_id === 1
        ? '보험료 확인'
        : visitor.counsel_type_id === 2
          ? '상담신청'
          : '',
      visitor.name || '',
      visitor.phone || '',
    ]);

    // CSV 문자열 생성 (특수문자 처리 및 따옴표 이스케이프)
    const csvContent = [headers, ...csvData]
      .map((row) =>
        row
          .map((field) => {
            // 특수문자 처리 및 따옴표 이스케이프
            const escapedField = String(field).replace(/"/g, '""');
            return `"${escapedField}"`;
          })
          .join(',')
      )
      .join('\r\n'); // Windows 호환성을 위해 \r\n 사용

    // UTF-8 BOM 추가하여 한글 깨짐 방지
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], {
      type: 'text/csv;charset=utf-8;',
    });

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `visitor_tracking_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();

    // 메모리 정리
    URL.revokeObjectURL(url);
  };

  // 안전한 통계 데이터 접근을 위한 헬퍼 함수
  const getSafeStat = (stats: StatsData | null, key: string, defaultValue: number = 0): number => {
    if (!stats || !stats.counselTypeStats) return defaultValue;
    return stats.counselTypeStats[key] || defaultValue;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-page-bg p-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">로딩 중...</div>
        </div>
      </div>
    );
  }

  // 방문자 데이터 테이블 컬럼 정의 (요청에 맞게 간소화)
  const _columns = [
    {
      header: '방문시간',
      accessorKey: 'created_at',
      cell: ({ row }: any) => formatKST(row.original.created_at),
    },
    {
      header: '방문수',
      accessorKey: 'session_count',
      cell: ({ row }: any) => row.original.session_count || 1,
    },
    {
      header: '유입사이트',
      accessorKey: 'referrer',
      cell: ({ row }: any) => (
        <a
          href={row.original.referrer || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="break-all text-brand-primary hover:underline"
          title={getFullReferrer(row.original.referrer)}
        >
          {formatReferrerForDisplay(row.original.referrer, row.original.search_keyword)}
        </a>
      ),
    },
    {
      header: '키워드',
      accessorKey: 'search_keyword',
      cell: ({ row }: any) => row.original.search_keyword || '-',
      className: 'min-w-[200px]',
    },
    {
      header: '모바일기종',
      accessorKey: 'device_model',
      cell: ({ row }: any) => row.original.device_model || '-',
    },
    {
      header: '브라우저',
      accessorKey: 'browser',
      cell: ({ row }: any) => row.original.browser || '-',
    },
    {
      header: '상담유형',
      accessorKey: 'counsel_type_id',
      cell: ({ row }: any) => {
        const counselType = row.original.counsel_type_id;
        if (counselType === 1) return '보험료 확인';
        if (counselType === 2) return '상담신청';
        return '-';
      },
    },
    {
      header: '이름',
      accessorKey: 'name',
      cell: ({ row }: any) => row.original.name || '-',
    },
    {
      header: '전화번호',
      accessorKey: 'phone',
      cell: ({ row }: any) => row.original.phone || '-',
    },
  ];

  return (
    <div className="min-h-screen bg-page-bg p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-text-primary">방문자 추적 관리</h1>

        {/* 통계 요약 */}
        {stats && (
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="text-sm font-medium text-text-muted">전체 방문자</h3>
              <p className="text-2xl font-bold text-text-primary">
                {stats.totalVisitors?.toLocaleString() || 0}
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="text-sm font-medium text-text-muted">고유 방문자</h3>
              <p className="text-2xl font-bold text-text-primary">
                {stats.uniqueVisitors?.toLocaleString() || 0}
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="text-sm font-medium text-text-muted">기간</h3>
              <p className="text-lg font-semibold text-text-primary">
                {stats.dateRange?.startDate
                  ? format(new Date(stats.dateRange.startDate), 'MM/dd')
                  : 'N/A'}{' '}
                -{' '}
                {stats.dateRange?.endDate
                  ? format(new Date(stats.dateRange.endDate), 'MM/dd')
                  : 'N/A'}
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="text-sm font-medium text-text-muted">상담 신청</h3>
              <p className="text-2xl font-bold text-brand-primary">
                {getSafeStat(stats, '상담신청', 0)}
              </p>
            </div>
          </div>
        )}

        {/* 추가 통계 정보 */}
        {stats && (
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6">
            <div className="rounded-lg bg-white p-4 shadow">
              <h3 className="text-xs font-medium text-text-muted">Google 검색</h3>
              <p className="text-lg font-semibold text-green-600">
                {(stats.trafficSourceStats?.['Google-PC'] || 0) +
                  (stats.trafficSourceStats?.['Google-Mobile'] || 0)}
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow">
              <h3 className="text-xs font-medium text-text-muted">네이버 검색</h3>
              <p className="text-lg font-semibold text-green-600">
                {(stats.trafficSourceStats?.['Naver-PC'] || 0) +
                  (stats.trafficSourceStats?.['Naver-Mobile'] || 0)}
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow">
              <h3 className="text-xs font-medium text-text-muted">모바일</h3>
              <p className="text-lg font-semibold text-brand-primary">
                {stats.deviceStats?.['mobile'] || 0}
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow">
              <h3 className="text-xs font-medium text-text-muted">데스크톱</h3>
              <p className="text-lg font-semibold text-brand-primary">
                {stats.deviceStats?.['desktop'] || 0}
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow">
              <h3 className="text-xs font-medium text-text-muted">통신사</h3>
              <p className="text-lg font-semibold text-purple-600">
                {stats.carrierStats?.['SKT'] ||
                  stats.carrierStats?.['KT'] ||
                  stats.carrierStats?.['LG U+'] ||
                  0}
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow">
              <h3 className="text-xs font-medium text-text-muted">모바일기종</h3>
              <p className="text-lg font-semibold text-orange-600">
                {stats.deviceModelStats?.['iPhone'] || stats.deviceModelStats?.['Android'] || 0}
              </p>
            </div>
          </div>
        )}

        {/* 필터 */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold text-text-primary">필터</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">상담 유형</label>
              <select
                value={filters.counsel_type_id}
                onChange={(e) => handleFilterChange('counsel_type_id', e.target.value)}
                className="w-full rounded-md border border-border-default px-3 py-2"
              >
                <option value="">전체</option>
                <option value="1">보험료 확인</option>
                <option value="2">상담신청</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">시작일</label>
              <input
                type="date"
                value={filters.date_from}
                onChange={(e) => handleFilterChange('date_from', e.target.value)}
                className="w-full rounded-md border border-border-default px-3 py-2"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">종료일</label>
              <input
                type="date"
                value={filters.date_to}
                onChange={(e) => handleFilterChange('date_to', e.target.value)}
                className="w-full rounded-md border border-border-default px-3 py-2"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">유입종류</label>
              <input
                type="text"
                value={filters.traffic_source}
                onChange={(e) => handleFilterChange('traffic_source', e.target.value)}
                placeholder="Google-PC, Naver-Mobile 등"
                className="w-full rounded-md border border-border-default px-3 py-2"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">디바이스</label>
              <select
                value={filters.device_type}
                onChange={(e) => handleFilterChange('device_type', e.target.value)}
                className="w-full rounded-md border border-border-default px-3 py-2"
              >
                <option value="">전체</option>
                <option value="desktop">데스크톱</option>
                <option value="mobile">모바일</option>
                <option value="tablet">태블릿</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">검색 엔진</label>
              <select
                value={filters.search_engine}
                onChange={(e) => handleFilterChange('search_engine', e.target.value)}
                className="w-full rounded-md border border-border-default px-3 py-2"
              >
                <option value="">전체</option>
                <option value="Google">Google</option>
                <option value="Naver">Naver</option>
                <option value="Kakao">Kakao</option>
                <option value="Bing">Bing</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">검색 키워드</label>
              <input
                type="text"
                value={filters.search_keyword}
                onChange={(e) => handleFilterChange('search_keyword', e.target.value)}
                placeholder="검색 키워드 입력"
                className="w-full rounded-md border border-border-default px-3 py-2"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilters({
                    counsel_type_id: '',
                    date_from: '',
                    date_to: '',
                    traffic_source: '',
                    device_type: '',
                    search_engine: '',
                    device_model: '',
                    search_keyword: '',
                  });
                  setCurrentPage(1);
                }}
                className="bg-page-bg0 w-full rounded-md px-4 py-2 text-white hover:bg-gray-600"
              >
                필터 초기화
              </button>
            </div>
          </div>
        </div>

        {/* 데이터 테이블 */}
        <div className="rounded-lg bg-white shadow">
          <div className="flex items-center justify-between border-b border-border-default px-6 py-4">
            <h2 className="text-lg font-semibold text-text-primary">방문자 데이터</h2>
            <button
              onClick={exportToCSV}
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              CSV 다운로드
            </button>
            <div className="flex items-center space-x-2">
              <label className="text-sm text-text-secondary">자동 새로고침(60초)</label>
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
              />
              <button
                onClick={safeRefresh}
                className="ml-2 rounded-md border border-border-default px-3 py-2"
              >
                새로고침
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-page-bg">
                <tr>
                  <th className="w-24 px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                    방문시간
                  </th>
                  <th className="w-16 px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                    방문수
                  </th>
                  <th className="w-64 px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                    유입사이트
                  </th>
                  <th className="w-[240px] px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                    키워드
                  </th>
                  <th className="w-24 px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                    모바일기종
                  </th>
                  <th className="w-20 px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                    브라우저
                  </th>
                  <th className="w-24 px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                    상담유형
                  </th>
                  <th className="w-20 px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                    이름
                  </th>
                  <th className="w-24 px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                    전화번호
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {visitors.map((visitor) => (
                  <tr key={visitor.id} className="hover:bg-page-bg">
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-text-primary">
                      {formatKST(visitor.created_at)}
                    </td>
                    <td className="px-3 py-4 text-sm text-text-primary">
                      {visitor.session_count || 1}
                    </td>
                    <td className="max-w-xs truncate px-3 py-4 text-sm text-text-primary">
                      <a
                        href={visitor.referrer || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-primary hover:underline"
                        title={visitor.referrer || undefined}
                      >
                        {getFullReferrer(visitor.referrer)}
                      </a>
                    </td>
                    <td className="max-w-[320px] px-3 py-4 text-sm text-text-primary">
                      {visitor.search_keyword || '-'}
                    </td>
                    <td className="px-3 py-4 text-sm text-text-primary">
                      {visitor.device_model || '-'}
                    </td>
                    <td className="px-3 py-4 text-sm text-text-primary">
                      {visitor.browser || '-'}
                    </td>
                    <td className="px-3 py-4 text-sm text-text-primary">
                      {visitor.counsel_type_id === 1
                        ? '보험료 확인'
                        : visitor.counsel_type_id === 2
                          ? '상담신청'
                          : '-'}
                    </td>
                    <td className="px-3 py-4 text-sm text-text-primary">{visitor.name || '-'}</td>
                    <td className="px-3 py-4 text-sm text-text-primary">{visitor.phone || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-border-default px-6 py-4">
              <div className="text-sm text-gray-700">
                페이지 {currentPage} / {totalPages}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="rounded-md border border-border-default px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  이전
                </button>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="rounded-md border border-border-default px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  다음
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
