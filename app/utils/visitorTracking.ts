import { supabase } from '@/app/api/supabase';

// IP 주소 가져오기 (클라이언트에서는 기본값 반환)
async function getClientIP(): Promise<string | null> {
  try {
    // 클라이언트에서는 IP를 직접 가져올 수 없으므로 기본값 반환
    // 실제 IP는 서버에서 처리됩니다
    return 'client-side';
  } catch (error) {
    console.warn('Could not get client IP:', error);
    return null;
  }
}

// 디바이스 정보 추출
function getDeviceInfo(): {
  device_type: string;
  browser: string;
  os: string;
} {
  if (typeof window === 'undefined') {
    return { device_type: 'unknown', browser: 'unknown', os: 'unknown' };
  }

  const userAgent = navigator.userAgent;
  
  // 디바이스 타입
  let device_type = 'desktop';
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    device_type = 'mobile';
  } else if (/Tablet|iPad/i.test(userAgent)) {
    device_type = 'tablet';
  }

  // 브라우저
  let browser = 'unknown';
  if (userAgent.includes('Chrome')) browser = 'Chrome';
  else if (userAgent.includes('Firefox')) browser = 'Firefox';
  else if (userAgent.includes('Safari')) browser = 'Safari';
  else if (userAgent.includes('Edge')) browser = 'Edge';
  else if (userAgent.includes('MSIE') || userAgent.includes('Trident/')) browser = 'Internet Explorer';

  // OS
  let os = 'unknown';
  if (userAgent.includes('Windows')) os = 'Windows';
  else if (userAgent.includes('Mac')) os = 'macOS';
  else if (userAgent.includes('Linux')) os = 'Linux';
  else if (userAgent.includes('Android')) os = 'Android';
  else if (userAgent.includes('iOS')) os = 'iOS';

  return { device_type, browser, os };
}

// 검색 엔진에서 검색어 추출 (간소화)
function extractSearchKeyword(referrer: string | null): {
  search_keyword: string | null;
  search_engine: string | null;
} {
  if (typeof window === 'undefined') {
    return {
      search_keyword: null,
      search_engine: null
    };
  }

  if (!referrer) {
    return {
      search_keyword: null,
      search_engine: null
    };
  }

  try {
    const url = new URL(referrer);
    
    // Google 검색
    if (url.hostname.includes('google')) {
      const query = url.searchParams.get('q');
      return {
        search_keyword: query,
        search_engine: 'Google'
      };
    }
    
    // 네이버 검색
    if (url.hostname.includes('naver')) {
      const query = url.searchParams.get('query');
      return {
        search_keyword: query,
        search_engine: 'Naver'
      };
    }
    
    // 카카오 검색
    if (url.hostname.includes('kakao')) {
      const query = url.searchParams.get('q');
      return {
        search_keyword: query,
        search_engine: 'Kakao'
      };
    }
    
    // 기타 검색 엔진
    if (url.hostname.includes('search') || url.hostname.includes('bing') || url.hostname.includes('yahoo')) {
      const query = url.searchParams.get('q') || url.searchParams.get('query');
      return {
        search_keyword: query,
        search_engine: url.hostname
      };
    }
    
  } catch (error) {
    console.warn('Failed to parse referrer:', error);
  }
  
  return {
    search_keyword: null,
    search_engine: null
  };
}







// 방문자 추적 데이터 타입 정의 (간소화된 15개 핵심 필드)
interface SimplifiedVisitorTrackingData {
  // 핵심 방문 정보 (5개)
  // created_at 은 DB 기본값(UTC now()) 사용. 클라이언트에서 설정하지 않음
  created_at?: string;              // 방문시간 (선택: 로컬 로깅용)
  ip_address: string | null;        // IP 주소
  carrier: string | null;           // 통신사 (SKT, KT, LG U+)
  session_count: number;            // 방문수 (세션별)
  page_url: string;                 // 페이지 URL
  
  // 디바이스 정보 (4개)
  device_model: string | null;      // 모바일기종 (iPhone 15+, Android 14+ 등)
  device_type: string | null;       // 디바이스 (desktop, mobile, tablet)
  browser: string | null;           // 브라우저 (Chrome, Safari 등)
  os: string | null;                // OS (Windows, macOS, iOS, Android)
  
  // 유입 정보 (4개)
  traffic_source: string | null;    // 유입종류 (네이버-PC, 모바일, Google 등)
  referrer: string | null;          // 유입사이트 (이전 페이지 URL)
  search_keyword: string | null;    // 검색 키워드
  search_engine: string | null;     // 검색 엔진 (Google, Naver 등)
  
  // 상담 정보 (2개)
  counsel_type_id: number | null;   // 상담 유형 (1: 보험료 확인, 2: 상담신청)
  name: string | null;              // 이름
  phone: string | null;             // 전화번호
  
  // 추가 메타데이터
  user_agent: string;               // User Agent (디버깅용)
}

// 통신사 정보 추출 (한국 기준)
function getCarrierInfo(): string | null {
  if (typeof window === 'undefined') return null;
  
  const userAgent = navigator.userAgent;
  
  // 통신사 정보 (한국 기준)
  if (/SKT|SK Telecom/i.test(userAgent)) return 'SKT';
  if (/KT|Korea Telecom/i.test(userAgent)) return 'KT';
  if (/LG U\+/i.test(userAgent)) return 'LG U+';
  
  // 모바일 네트워크 정보 확인
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    if (connection?.effectiveType) {
      // 5G, 4G 등 네트워크 타입으로 통신사 추정
      return connection.effectiveType;
    }
  }
  
  return null;
}

// 유입 종류 판별 (네이버-PC, 모바일, Google 등)
function getTrafficSource(): string {
  if (typeof window === 'undefined') return 'Direct';
  
  const referrer = document.referrer;
  const deviceType = getDeviceInfo().device_type;
  
  if (!referrer) return 'Direct';
  
  try {
    const url = new URL(referrer);
    
    // Google 검색
    if (url.hostname.includes('google')) {
      return deviceType === 'mobile' ? 'Google-Mobile' : 'Google-PC';
    }
    
    // 네이버 검색
    if (url.hostname.includes('naver')) {
      return deviceType === 'mobile' ? 'Naver-Mobile' : 'Naver-PC';
    }
    
    // 카카오 검색
    if (url.hostname.includes('kakao')) {
      return deviceType === 'mobile' ? 'Kakao-Mobile' : 'Kakao-PC';
    }
    
    // 페이스북
    if (url.hostname.includes('facebook')) {
      return 'Facebook';
    }
    
    // 인스타그램
    if (url.hostname.includes('instagram')) {
      return 'Instagram';
    }
    
    // 기타 소셜미디어
    if (url.hostname.includes('twitter') || url.hostname.includes('x.com')) {
      return 'Twitter';
    }
    
    // 기타 검색 엔진
    if (url.hostname.includes('search') || url.hostname.includes('bing') || url.hostname.includes('yahoo')) {
      return deviceType === 'mobile' ? 'Search-Mobile' : 'Search-PC';
    }
    
  } catch (error) {
    console.warn('Failed to parse referrer for traffic source:', error);
  }
  
  return deviceType === 'mobile' ? 'Mobile' : 'PC';
}

// 현재 페이지 URL 파라미터에서 키워드 및 검색엔진 유추 (광고 파라미터 포함)
function extractKeywordFromUrlParams(): { search_keyword: string | null; search_engine: string | null } {
  if (typeof window === 'undefined') return { search_keyword: null, search_engine: null };

  const params = new URLSearchParams(window.location.search || '');
  const utmSource = params.get('utm_source');
  const utmTerm = params.get('utm_term');
  const keyword = params.get('keyword') || params.get('k_keyword') || params.get('n_keyword') || params.get('inkeyword');
  const qParam = params.get('q') || params.get('query');

  let search_engine: string | null = null;
  if (utmSource) {
    if (/google/i.test(utmSource)) search_engine = 'Google';
    else if (/naver/i.test(utmSource)) search_engine = 'Naver';
    else if (/kakao|daum/i.test(utmSource)) search_engine = 'Kakao';
    else if (/bing/i.test(utmSource)) search_engine = 'Bing';
    else search_engine = utmSource;
  }

  const search_keyword = utmTerm || keyword || qParam;
  return { search_keyword: search_keyword || null, search_engine };
}

// 모바일 디바이스 모델 정보 추출 (간소화)
function getSimplifiedDeviceModel(): string | null {
  if (typeof window === 'undefined') return null;
  
  const userAgent = navigator.userAgent;
  
  // iPhone 모델
  if (/iPhone/i.test(userAgent)) {
    const match = userAgent.match(/iPhone\s*(?:OS\s*)?(\d+)_(\d+)/);
    if (match) {
      const major = parseInt(match[1]);
      if (major >= 15) return 'iPhone 15+';
      if (major >= 14) return 'iPhone 14';
      if (major >= 13) return 'iPhone 13';
      return `iPhone ${major}`;
    }
    return 'iPhone';
  }
  
  // Android 모델
  if (/Android/i.test(userAgent)) {
    const match = userAgent.match(/Android\s*(\d+\.\d+)/);
    if (match) {
      const version = parseFloat(match[1]);
      if (version >= 14) return 'Android 14+';
      if (version >= 13) return 'Android 13';
      if (version >= 12) return 'Android 12';
      return `Android ${version}`;
    }
    return 'Android';
  }
  
  // iPad
  if (/iPad/i.test(userAgent)) {
    return 'iPad';
  }
  
  // Windows
  if (/Windows/i.test(userAgent)) {
    return 'Windows PC';
  }
  
  // macOS
  if (/Macintosh/i.test(userAgent)) {
    return 'Mac';
  }
  
  return null;
}

// 세션 카운트 계산 (같은 IP의 방문 횟수)
async function getSessionCount(ipAddress: string): Promise<number> {
  try {
    if (!ipAddress || ipAddress === 'client-side') return 1;
    
    const { count, error } = await supabase
      .from('visitor_tracking')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', ipAddress);
    
    if (error) {
      console.warn('[TRACKING] 세션 카운트 조회 실패:', error);
      return 1;
    }
    
    return (count || 0) + 1;
  } catch (error) {
    console.warn('[TRACKING] 세션 카운트 계산 실패:', error);
    return 1;
  }
}

// 간소화된 방문자 추적 함수
export async function trackSimplifiedVisitor(data: {
  counsel_type_id?: number;
  phone?: string;
  name?: string;
} = {}): Promise<void> {
  try {
    console.log('[TRACKING] 간소화된 방문자 추적 시작:', data);
    
    // Supabase 클라이언트 상태 확인
    console.log('[TRACKING] Supabase 클라이언트 확인:', {
      supabase: !!supabase,
      hasFrom: !!supabase?.from,
      hasInsert: !!supabase?.from?.('visitor_tracking')?.insert
    });

    // IP 주소 가져오기
    const ipAddress = await getClientIP();
    
    // 세션 카운트 계산
    const sessionCount = await getSessionCount(ipAddress || 'client-side');
    
    // 간소화된 방문자 데이터 수집
    // 키워드: URL 파라미터 우선, 없으면 referrer 분석
    const fromUrl = extractKeywordFromUrlParams();
    const fromRef = extractSearchKeyword(document.referrer);

    const visitorData: SimplifiedVisitorTrackingData = {
      // 핵심 방문 정보 (5개)
      // created_at 은 DB 기본값 사용
      ip_address: ipAddress,
      carrier: getCarrierInfo(),
      session_count: sessionCount,
      page_url: window.location.href,
      
      // 디바이스 정보 (4개)
      device_model: getSimplifiedDeviceModel(),
      device_type: getDeviceInfo().device_type,
      browser: getDeviceInfo().browser,
      os: getDeviceInfo().os,
      
      // 유입 정보 (4개)
      traffic_source: getTrafficSource(),
      referrer: document.referrer || null,
      search_keyword: fromUrl.search_keyword || fromRef.search_keyword,
      search_engine: fromUrl.search_engine || fromRef.search_engine,
      
      // 상담 정보 (2개)
      counsel_type_id: data.counsel_type_id || null,
      name: data.name || null,
      phone: data.phone || null,
      
      // 추가 메타데이터
      user_agent: navigator.userAgent,
    };

    console.log('[TRACKING] 수집된 간소화된 방문자 데이터:', visitorData);
    console.log('[TRACKING] Supabase에 데이터 저장 시작...');

    // Supabase insert 쿼리 실행
    console.log('[TRACKING] Supabase insert 쿼리 실행...');
    const { data: insertResult, error } = await supabase
      .from('visitor_tracking')
      .insert([visitorData])
      .select();

    console.log('[TRACKING] Supabase insert 결과:', { insertResult, error });

    if (error) {
      console.error('[TRACKING] Supabase 저장 실패:', error);
      console.error('[TRACKING] 오류 세부정보:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      throw new Error(`Supabase 저장 실패: ${error.message} (${error.code})`);
    }

    console.log('[TRACKING] 간소화된 방문자 추적 성공! Supabase에 저장됨');
    console.log('[TRACKING] 저장된 데이터 ID:', insertResult?.[0]?.id);
    
  } catch (error) {
    console.error('[TRACKING] 간소화된 방문자 추적 중 오류 발생:', error);
    throw error;
  }
}

// 하위 호환성을 위한 함수들
export async function trackVisitor(data: any = {}): Promise<void> {
  return trackSimplifiedVisitor(data);
}

export async function trackPremiumCheck(productId?: any, companyId?: any, data: any = {}): Promise<void> {
  return trackSimplifiedVisitor({ ...data, counsel_type_id: 1 });
}

export async function trackCounselRequest(productId?: any, phone?: any, name?: any, data: any = {}): Promise<void> {
  return trackSimplifiedVisitor({ 
    ...data, 
    counsel_type_id: 2,
    phone: phone || data.phone,
    name: name || data.name
  });
}

export async function trackPageVisit(): Promise<void> {
  return trackSimplifiedVisitor();
}

// Supabase 연결 테스트 함수
export async function testSupabaseConnection(): Promise<boolean> {
  try {
    console.log('[TEST] Supabase 연결 테스트 시작...');
    
    // 1. 기본 클라이언트 확인
    if (!supabase) {
      console.error('[TEST] Supabase 클라이언트가 없습니다');
      return false;
    }
    
    // 2. 간단한 쿼리 테스트
    const { data, error } = await supabase
      .from('visitor_tracking')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error('[TEST] Supabase 쿼리 실패:', error);
      return false;
    }
    
    console.log('[TEST] Supabase 연결 성공! 데이터:', data);
    return true;
  } catch (error) {
    console.error('[TEST] Supabase 연결 테스트 실패:', error);
    return false;
  }
}

