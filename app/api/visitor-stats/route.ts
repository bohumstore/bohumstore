import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date_from = searchParams.get('date_from');
    const date_to = searchParams.get('date_to');

    // 기본 날짜 범위 (최근 30일)
    const defaultDateFrom = new Date();
    defaultDateFrom.setDate(defaultDateFrom.getDate() - 30);
    
    const startDate = date_from || defaultDateFrom.toISOString().split('T')[0];
    const endDate = date_to || new Date().toISOString().split('T')[0];

    // 1. 전체 방문자 수
    if (process.env.NODE_ENV !== 'production') {
      console.log('[STATS] 전체 방문자 수 조회 시작...');
    }
    const { count: totalVisitors, error: totalError } = await supabase
      .from('visitor_tracking')
      .select('*', { count: 'exact', head: true });
    
    if (totalError) {
      console.error('[STATS] 전체 방문자 수 조회 오류:', totalError);
    } else {
      if (process.env.NODE_ENV !== 'production') {
        console.log('[STATS] 전체 방문자 수 조회 성공:', totalVisitors);
      }
    }

    // 2. 상담 유형별 방문자 수
    const { data: counselTypeStats } = await supabase
      .from('visitor_tracking')
      .select('counsel_type_id')
      .not('counsel_type_id', 'is', null);

    // 3. 디바이스별 통계
    const { data: deviceStats } = await supabase
      .from('visitor_tracking')
      .select('device_type');

    // 4. 브라우저별 통계
    const { data: browserStats } = await supabase
      .from('visitor_tracking')
      .select('browser');

    // 5. OS별 통계
    const { data: osStats } = await supabase
      .from('visitor_tracking')
      .select('os');

    // 6. IP 주소별 고유 방문자 수
    const { data: uniqueIPStats } = await supabase
      .from('visitor_tracking')
      .select('ip_address');

    // 고유 IP 수 계산
    const uniqueIPs = uniqueIPStats ? new Set(uniqueIPStats.map(item => item.ip_address)).size : 0;

    // 상담 유형별 통계 정리
    const counselTypeCounts = counselTypeStats?.reduce((acc: any, item: any) => {
      const typeId = item.counsel_type_id;
      if (typeId === 1) acc['보험료 확인'] = (acc['보험료 확인'] || 0) + 1;
      else if (typeId === 2) acc['상담신청'] = (acc['상담신청'] || 0) + 1;
      else acc['기타'] = (acc['기타'] || 0) + 1;
      return acc;
    }, {}) || {};

    // 디바이스별 통계 정리
    const deviceCounts = deviceStats?.reduce((acc: any, item: any) => {
      acc[item.device_type] = (acc[item.device_type] || 0) + 1;
      return acc;
    }, {}) || {};

    // 브라우저별 통계 정리
    const browserCounts = browserStats?.reduce((acc: any, item: any) => {
      acc[item.browser] = (acc[item.browser] || 0) + 1;
      return acc;
    }, {}) || {};

    // OS별 통계 정리
    const osCounts = osStats?.reduce((acc: any, item: any) => {
      acc[item.os] = (acc[item.os] || 0) + 1;
      return acc;
    }, {}) || {};

    const responseData = {
      dateRange: { startDate, endDate },
      totalVisitors: totalVisitors || 0,
      uniqueVisitors: uniqueIPs,
      counselTypeStats: counselTypeCounts,
      deviceStats: deviceCounts,
      browserStats: browserCounts,
      osStats: osCounts,
    };
    
    if (process.env.NODE_ENV !== 'production') {
      console.log('[STATS] 최종 응답 데이터:', responseData);
      console.log('[STATS] totalVisitors 값:', responseData.totalVisitors);
    }
    
    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Visitor stats API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
