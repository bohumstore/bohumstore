import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../supabase';
import logger from '@/app/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      ip_address,
      user_agent,
      referrer,
      page_url,
      device_type,
      browser,
      os,
      counsel_type_id,
      phone,
      name,
    } = body;

    // IP 주소 가져오기 (클라이언트에서 전송하지 않은 경우)
    const clientIP = ip_address || request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 'unknown';

    // 통신사 정보 (간단한 IP 기반 추정)
    const carrier = getCarrierFromIP(clientIP);
    
    // 세션 수 계산 (같은 IP의 기존 방문 수)
    const sessionCount = await getSessionCount(clientIP);
    
    // 디바이스 모델 정보
    const deviceModel = getDeviceModel(user_agent || request.headers.get('user-agent'));
    
    // 트래픽 소스 판별
    const trafficSource = getTrafficSource(referrer, user_agent || request.headers.get('user-agent'));
    
    // 검색 엔진 및 키워드 추출
    const { searchEngine, searchKeyword } = extractSearchInfo(referrer);

    const trackingData = {
      ip_address: clientIP,
      carrier,
      session_count: sessionCount,
      page_url,
      device_model: deviceModel,
      device_type,
      browser,
      os,
      traffic_source: trafficSource,
      referrer,
      search_keyword: searchKeyword,
      search_engine: searchEngine,
      counsel_type_id,
      name,
      phone,
      user_agent: user_agent || request.headers.get('user-agent'),
    };

    logger.debug('TRACK_VISITOR', '삽입할 데이터', trackingData);
    
    const { data, error } = await supabase
      .from('visitor_tracking')
      .insert([trackingData])
      .select();

    if (error) {
      logger.error('TRACK_VISITOR', 'insert error', error);
      return NextResponse.json(
        { 
          error: 'Failed to track visitor',
          details: error.message,
          code: error.code,
          hint: error.hint
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: data[0] 
    });

  } catch (error) {
    logger.error('TRACK_VISITOR', 'API error', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// 통신사 정보 추정 (간단한 IP 기반)
function getCarrierFromIP(ip: string): string {
  // 실제로는 IP 기반 통신사 데이터베이스나 API를 사용해야 함
  // 여기서는 간단한 예시로 대체
  if (ip === 'unknown') return 'Unknown';
  
  // 한국 주요 통신사 IP 대역 (예시)
  if (ip.startsWith('1.') || ip.startsWith('14.') || ip.startsWith('27.')) return 'SKT';
  if (ip.startsWith('175.') || ip.startsWith('211.')) return 'KT';
  if (ip.startsWith('121.') || ip.startsWith('203.')) return 'LG U+';
  
  return 'Unknown';
}

// 세션 수 계산
async function getSessionCount(ip: string): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('visitor_tracking')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', ip);
    
    if (error) {
      console.error('Session count error:', error);
      return 1;
    }
    
    return (count || 0) + 1;
  } catch (error) {
    console.error('Session count error:', error);
    return 1;
  }
}

// 디바이스 모델 정보 추출
function getDeviceModel(userAgent: string | null): string {
  if (!userAgent) return 'Unknown';
  
  if (userAgent.includes('iPhone')) {
    const match = userAgent.match(/iPhone\s+OS\s+(\d+)/);
    if (match) {
      const version = parseInt(match[1]);
      if (version >= 17) return 'iPhone 15+';
      if (version >= 16) return 'iPhone 14+';
      return 'iPhone 13 이하';
    }
    return 'iPhone';
  }
  
  if (userAgent.includes('Android')) {
    const match = userAgent.match(/Android\s+(\d+)/);
    if (match) {
      const version = parseInt(match[1]);
      if (version >= 14) return 'Android 14+';
      if (version >= 13) return 'Android 13+';
      return 'Android 12 이하';
    }
    return 'Android';
  }
  
  return 'Desktop';
}

// 트래픽 소스 판별
function getTrafficSource(referrer: string | null, userAgent: string | null): string {
  if (!referrer) return 'Direct';
  
  if (referrer.includes('google.com')) {
    return userAgent && userAgent.includes('Mobile') ? 'Google-Mobile' : 'Google-PC';
  }
  
  if (referrer.includes('naver.com')) {
    return userAgent && userAgent.includes('Mobile') ? 'Naver-Mobile' : 'Naver-PC';
  }
  
  if (referrer.includes('daum.net')) {
    return userAgent && userAgent.includes('Mobile') ? 'Daum-Mobile' : 'Daum-PC';
  }
  
  return 'Other';
}

// 검색 엔진 및 키워드 추출
function extractSearchInfo(referrer: string | null): { searchEngine: string | null; searchKeyword: string | null } {
  if (!referrer) return { searchEngine: null, searchKeyword: null };
  
  try {
    const url = new URL(referrer);
    
    if (url.hostname.includes('google.com')) {
      const query = url.searchParams.get('q');
      return { searchEngine: 'Google', searchKeyword: query };
    }
    
    if (url.hostname.includes('naver.com')) {
      const query = url.searchParams.get('query');
      return { searchEngine: 'Naver', searchKeyword: query };
    }
    
    if (url.hostname.includes('daum.net')) {
      const query = url.searchParams.get('q');
      return { searchEngine: 'Daum', searchKeyword: query };
    }
    
    return { searchEngine: 'Other', searchKeyword: null };
  } catch (error) {
    return { searchEngine: null, searchKeyword: null };
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = (page - 1) * limit;
    
    // 필터링 옵션
    const counsel_type_id = searchParams.get('counsel_type_id');
    const date_from = searchParams.get('date_from');
    const date_to = searchParams.get('date_to');
    const traffic_source = searchParams.get('traffic_source');
    const device_type = searchParams.get('device_type');
    const search_engine = searchParams.get('search_engine');
    const device_model = searchParams.get('device_model');
    const search_keyword = searchParams.get('search_keyword');

    // 전체 개수 조회 (페이지네이션용)
    const { count: totalCount, error: countError } = await supabase
      .from('visitor_tracking')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      logger.error('TRACK_VISITOR', 'count query error', countError);
      return NextResponse.json(
        { error: 'Failed to get total count' },
        { status: 500 }
      );
    }

    // 필터링된 데이터 조회
    let query = supabase
      .from('visitor_tracking')
      .select(`
        *,
        counsel_type:visitor_tracking_counsel_type_id_fkey(name)
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // 필터 적용
    if (counsel_type_id) {
      query = query.eq('counsel_type_id', parseInt(counsel_type_id));
    }
    if (date_from) {
      query = query.gte('created_at', date_from);
    }
    if (date_to) {
      query = query.lte('created_at', date_to);
    }
    if (traffic_source) {
      query = query.eq('traffic_source', traffic_source);
    }
    if (device_type) {
      query = query.eq('device_type', device_type);
    }
    if (search_engine) {
      query = query.eq('search_engine', search_engine);
    }
    if (device_model) {
      query = query.ilike('device_model', `%${device_model}%`);
    }
    if (search_keyword) {
      query = query.ilike('search_keyword', `%${search_keyword}%`);
    }

    const { data, error } = await query;

    if (error) {
      logger.error('TRACK_VISITOR', 'fetch data error', error);
      return NextResponse.json(
        { error: 'Failed to fetch data' },
        { status: 500 }
      );
    }

    const totalPages = Math.ceil((totalCount || 0) / limit);

    logger.debug('TRACK_VISITOR', '데이터 조회', { totalCount, currentPage: page, limit, totalPages, dataCount: data?.length || 0 });

    const responseData = {
      data: data || [],
      pagination: {
        page,
        limit,
        total: totalCount || 0,
        totalPages,
      },
    };
    
    logger.debug('TRACK_VISITOR', '응답 데이터 타입', { isArray: Array.isArray(responseData.data) });
    
    return NextResponse.json(responseData);

  } catch (error) {
    logger.error('TRACK_VISITOR', 'GET API error', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
