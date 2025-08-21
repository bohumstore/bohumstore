"use client";

import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { supabase } from '@/app/api/supabase';
import { toKSTString } from '@/app/lib/time';
import logger from '@/app/lib/logger';

interface VisitorData {
  id: string;
  created_at: string;
  ip_address: string | null;
  carrier: string | null;
  session_count: number;
  page_url: string | null;
  traffic_source: string | null;
  referrer: string | null;
  search_keyword: string | null;
  search_engine: string | null;
  device_type: string | null;
  browser: string | null;
  os: string | null;
  device_model: string | null;
  counsel_type_id: number | null;
  phone: string | null;
  name: string | null;
  counsel_type?: { name: string };
}

interface StatsData {
  dateRange: { startDate: string; endDate: string };
  totalVisitors: number;
  uniqueVisitors: number;
  dailyVisitors: Record<string, number>;
  counselTypeStats: Record<string, number>;
  trafficSourceStats: Record<string, number>;
  deviceStats: Record<string, number>;
  browserStats: Record<string, number>;
  osStats: Record<string, number>;
  carrierStats: Record<string, number>;
  searchEngineStats: Record<string, number>;
  deviceModelStats: Record<string, number>;
  sessionCountStats: Record<string, number>;
  referrerStats: Record<string, number>;
  searchKeywordStats: Record<string, number>;
}

export default function VisitorTrackingPage() {
  const [visitors, setVisitors] = useState<VisitorData[]>([]);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const lastRefreshRef = useRef<number>(0);
  const [filters, setFilters] = useState({
    counsel_type_id: '',
    date_from: '',
    date_to: '',
    traffic_source: '',
    device_type: '',
    search_engine: '',
    device_model: '',
    search_keyword: '',
  });

  useEffect(() => {
    fetchVisitors();
    fetchStats();
  }, [currentPage, filters]);

  const safeRefresh = () => {
    const now = Date.now();
    if (now - lastRefreshRef.current < 5000) return; // 5초 이내 중복 요청 방지
    lastRefreshRef.current = now;
    fetchVisitors();
    fetchStats();
  };

  // 실시간 업데이트
  useEffect(() => {
    const channel = supabase
      .channel('realtime:visitor_tracking')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'visitor_tracking' }, () => {
        safeRefresh();
      })
      .subscribe();

    return () => {
      try { supabase.removeChannel(channel); } catch {}
    };
  }, []);

  // 선택적 자동 새로고침 (기본 OFF)
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      if (typeof document === 'undefined' || document.visibilityState !== 'visible') return;
      safeRefresh();
    }, 60000); // 60초
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const fetchVisitors = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '50',
        ...filters,
      });

      logger.debug('ADMIN', '방문자 데이터 요청 시작...');
      logger.debug('ADMIN', '요청 파라미터:', params.toString(), 'URL:', `/api/track-visitor?${params}`);

      const response = await fetch(`/api/track-visitor?${params}`);
      logger.debug('ADMIN', 'API 응답 상태:', response.status, response.statusText);
      
      const data = await response.json();
      logger.debug('ADMIN', '방문자 데이터 응답 길이:', Array.isArray(data?.data) ? data.data.length : 'N/A');

      console.log('[ADMIN] 응답 데이터 구조:', {
        hasData: !!data.data,
        dataType: typeof data.data,
        isArray: Array.isArray(data.data),
        dataLength: data.data?.length,
        dataKeys: data.data ? Object.keys(data.data) : 'N/A',
        fullResponse: data
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

      const response = await fetch(`/api/visitor-stats?${params}`);
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
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const formatKST = (isoString: string): string => toKSTString(isoString);

  const exportToCSV = () => {
    if (!visitors.length) return;

    const headers = [
      '방문시간', 'IP주소', '통신사', '방문수', '페이지URL', '모바일기종', '유입종류', '유입사이트', '키워드',
      '디바이스', '브라우저', 'OS', '상담유형', '이름', '전화번호'
    ];

    // CSV 데이터 생성 (한글 깨짐 방지)
    const csvData = visitors.map(visitor => [
      formatKST(visitor.created_at),
      visitor.ip_address || '',
      visitor.carrier || '',
      visitor.session_count || 1,
      visitor.page_url || '',
      visitor.device_model || '',
      visitor.traffic_source || '',
      visitor.referrer || '',
      visitor.search_keyword || '',
      visitor.device_type || '',
      visitor.browser || '',
      visitor.os || '',
      visitor.counsel_type_id === 1 ? '보험료 확인' : visitor.counsel_type_id === 2 ? '상담신청' : '',
      visitor.name || '',
      visitor.phone || ''
    ]);

    // CSV 문자열 생성 (특수문자 처리 및 따옴표 이스케이프)
    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => {
        // 특수문자 처리 및 따옴표 이스케이프
        const escapedField = String(field).replace(/"/g, '""');
        return `"${escapedField}"`;
      }).join(','))
      .join('\r\n'); // Windows 호환성을 위해 \r\n 사용

    // UTF-8 BOM 추가하여 한글 깨짐 방지
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { 
      type: 'text/csv;charset=utf-8;' 
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
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">로딩 중...</div>
        </div>
      </div>
    );
  }

  // 방문자 데이터 테이블 컬럼 정의 (간소화된 15개 필드)
  const columns = [
    {
      header: '방문시간',
      accessorKey: 'created_at',
      cell: ({ row }: any) => formatKST(row.original.created_at)
    },
    {
      header: 'IP주소',
      accessorKey: 'ip_address',
      cell: ({ row }: any) => row.original.ip_address || '-'
    },
    {
      header: '통신사',
      accessorKey: 'carrier',
      cell: ({ row }: any) => row.original.carrier || '-'
    },
    {
      header: '방문수',
      accessorKey: 'session_count',
      cell: ({ row }: any) => row.original.session_count || 1
    },
    {
      header: '페이지',
      accessorKey: 'page_url',
      cell: ({ row }: any) => (
        <a 
          href={row.original.page_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {row.original.page_url}
        </a>
      )
    },
    {
      header: '유입종류',
      accessorKey: 'traffic_source',
      cell: ({ row }: any) => row.original.traffic_source || '-'
    },
    {
      header: '키워드',
      accessorKey: 'search_keyword',
      cell: ({ row }: any) => row.original.search_keyword || '-'
    },
    {
      header: '디바이스',
      accessorKey: 'device_type',
      cell: ({ row }: any) => row.original.device_type || '-'
    },
    {
      header: '모바일기종',
      accessorKey: 'device_model',
      cell: ({ row }: any) => row.original.device_model || '-'
    },
    {
      header: '브라우저',
      accessorKey: 'browser',
      cell: ({ row }: any) => row.original.browser || '-'
    },
    {
      header: 'OS',
      accessorKey: 'os',
      cell: ({ row }: any) => row.original.os || '-'
    },
    {
      header: '상담유형',
      accessorKey: 'counsel_type_id',
      cell: ({ row }: any) => {
        const counselType = row.original.counsel_type_id;
        if (counselType === 1) return '보험료 확인';
        if (counselType === 2) return '상담신청';
        return '-';
      }
    },
    {
      header: '이름',
      accessorKey: 'name',
      cell: ({ row }: any) => row.original.name || '-'
    },
    {
      header: '전화번호',
      accessorKey: 'phone',
      cell: ({ row }: any) => row.original.phone || '-'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">방문자 추적 관리</h1>

        {/* 통계 요약 */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">전체 방문자</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.totalVisitors?.toLocaleString() || 0}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">고유 방문자</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.uniqueVisitors?.toLocaleString() || 0}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">기간</h3>
              <p className="text-lg font-semibold text-gray-900">
                {stats.dateRange?.startDate ? format(new Date(stats.dateRange.startDate), 'MM/dd') : 'N/A'} - {stats.dateRange?.endDate ? format(new Date(stats.dateRange.endDate), 'MM/dd') : 'N/A'}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">상담 신청</h3>
              <p className="text-2xl font-bold text-blue-600">
                {getSafeStat(stats, '상담신청', 0)}
              </p>
            </div>
          </div>
        )}

        {/* 추가 통계 정보 */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xs font-medium text-gray-500">Google 검색</h3>
              <p className="text-lg font-semibold text-green-600">
                {(stats.trafficSourceStats?.['Google-PC'] || 0) + (stats.trafficSourceStats?.['Google-Mobile'] || 0)}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xs font-medium text-gray-500">네이버 검색</h3>
              <p className="text-lg font-semibold text-green-600">
                {(stats.trafficSourceStats?.['Naver-PC'] || 0) + (stats.trafficSourceStats?.['Naver-Mobile'] || 0)}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xs font-medium text-gray-500">모바일</h3>
              <p className="text-lg font-semibold text-blue-600">
                {stats.deviceStats?.['mobile'] || 0}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xs font-medium text-gray-500">데스크톱</h3>
              <p className="text-lg font-semibold text-blue-600">
                {stats.deviceStats?.['desktop'] || 0}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xs font-medium text-gray-500">통신사</h3>
              <p className="text-lg font-semibold text-purple-600">
                {stats.carrierStats?.['SKT'] || stats.carrierStats?.['KT'] || stats.carrierStats?.['LG U+'] || 0}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xs font-medium text-gray-500">모바일기종</h3>
              <p className="text-lg font-semibold text-orange-600">
                {stats.deviceModelStats?.['iPhone'] || stats.deviceModelStats?.['Android'] || 0}
              </p>
            </div>
          </div>
        )}

        {/* 필터 */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">필터</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">상담 유형</label>
              <select
                value={filters.counsel_type_id}
                onChange={(e) => handleFilterChange('counsel_type_id', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">전체</option>
                <option value="1">보험료 확인</option>
                <option value="2">상담신청</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">시작일</label>
              <input
                type="date"
                value={filters.date_from}
                onChange={(e) => handleFilterChange('date_from', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">종료일</label>
              <input
                type="date"
                value={filters.date_to}
                onChange={(e) => handleFilterChange('date_to', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">유입종류</label>
              <input
                type="text"
                value={filters.traffic_source}
                onChange={(e) => handleFilterChange('traffic_source', e.target.value)}
                placeholder="Google-PC, Naver-Mobile 등"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">디바이스</label>
              <select
                value={filters.device_type}
                onChange={(e) => handleFilterChange('device_type', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">전체</option>
                <option value="desktop">데스크톱</option>
                <option value="mobile">모바일</option>
                <option value="tablet">태블릿</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">검색 엔진</label>
              <select
                value={filters.search_engine}
                onChange={(e) => handleFilterChange('search_engine', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">전체</option>
                <option value="Google">Google</option>
                <option value="Naver">Naver</option>
                <option value="Kakao">Kakao</option>
                <option value="Bing">Bing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">검색 키워드</label>
              <input
                type="text"
                value={filters.search_keyword}
                onChange={(e) => handleFilterChange('search_keyword', e.target.value)}
                placeholder="검색 키워드 입력"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
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
                className="w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                필터 초기화
              </button>
            </div>
          </div>
        </div>

        {/* 데이터 테이블 */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">방문자 데이터</h2>
            <button
              onClick={exportToCSV}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              CSV 다운로드
            </button>
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">자동 새로고침(60초)</label>
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
              />
              <button
                onClick={safeRefresh}
                className="ml-2 px-3 py-2 border border-gray-300 rounded-md"
              >
                새로고침
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">방문시간</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">IP주소</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">통신사</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">방문수</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">페이지</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">유입종류</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">키워드</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">디바이스</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">모바일기종</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">브라우저</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">OS</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">상담유형</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">이름</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">전화번호</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {visitors.map((visitor) => (
                  <tr key={visitor.id} className="hover:bg-gray-50">
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatKST(visitor.created_at)}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                      {visitor.ip_address || '-'}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-900">
                      {visitor.carrier || '-'}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-900">
                      {visitor.session_count || 1}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-900 max-w-xs truncate">
                      <a 
                        href={visitor.page_url || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                        title={visitor.page_url || undefined}
                      >
                        {visitor.page_url}
                      </a>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-900">
                      {visitor.traffic_source || '-'}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-900">
                      {visitor.search_keyword || '-'}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-900">
                      {visitor.device_type || '-'}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-900">
                      {visitor.device_model || '-'}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-900">
                      {visitor.browser || '-'}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-900">
                      {visitor.os || '-'}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-900">
                      {visitor.counsel_type_id === 1 ? '보험료 확인' : 
                       visitor.counsel_type_id === 2 ? '상담신청' : '-'}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-900">
                      {visitor.name || '-'}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-900">
                      {visitor.phone || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
              <div className="text-sm text-gray-700">
                페이지 {currentPage} / {totalPages}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  이전
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
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
