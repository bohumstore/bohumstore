-- 방문자 추적 테이블 간소화 (15개 핵심 필드)
-- 기존 테이블 백업 후 새로운 간소화된 테이블 생성

-- 1. 기존 테이블 백업
CREATE TABLE IF NOT EXISTS visitor_tracking_backup AS 
SELECT * FROM visitor_tracking;

-- 2. 기존 테이블 삭제
DROP TABLE IF EXISTS visitor_tracking;

-- 3. 새로운 간소화된 테이블 생성
CREATE TABLE visitor_tracking (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- 핵심 방문 정보 (5개)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),  -- 방문시간
    ip_address TEXT,                                   -- IP 주소
    carrier TEXT,                                      -- 통신사 (SKT, KT, LG U+)
    session_count INTEGER DEFAULT 1,                   -- 방문수 (세션별)
    page_url TEXT NOT NULL,                           -- 페이지 URL
    
    -- 디바이스 정보 (4개)
    device_model TEXT,                                 -- 모바일기종 (iPhone 15+, Android 14+ 등)
    device_type TEXT,                                  -- 디바이스 (desktop, mobile, tablet)
    browser TEXT,                                      -- 브라우저 (Chrome, Safari 등)
    os TEXT,                                          -- OS (Windows, macOS, iOS, Android)
    
    -- 유입 정보 (4개)
    traffic_source TEXT,                               -- 유입종류 (네이버-PC, 모바일, Google 등)
    referrer TEXT,                                     -- 유입사이트 (이전 페이지 URL)
    search_keyword TEXT,                               -- 검색 키워드
    search_engine TEXT,                                -- 검색 엔진 (Google, Naver 등)
    
    -- 상담 정보 (2개)
    counsel_type_id INTEGER REFERENCES counsel_type(id), -- 상담 유형 (1: 보험료 확인, 2: 상담신청)
    name TEXT,                                         -- 이름
    phone TEXT,                                        -- 전화번호
    
    -- 추가 메타데이터
    user_agent TEXT,                                   -- User Agent (디버깅용)
    created_date DATE GENERATED ALWAYS AS (created_at::date) STORED -- 날짜별 조회용
);

-- 4. 인덱스 생성 (성능 향상)
CREATE INDEX idx_visitor_tracking_created_at ON visitor_tracking(created_at);
CREATE INDEX idx_visitor_tracking_ip_address ON visitor_tracking(ip_address);
CREATE INDEX idx_visitor_tracking_counsel_type_id ON visitor_tracking(counsel_type_id);
CREATE INDEX idx_visitor_tracking_traffic_source ON visitor_tracking(traffic_source);
CREATE INDEX idx_visitor_tracking_search_engine ON visitor_tracking(search_engine);
CREATE INDEX idx_visitor_tracking_device_type ON visitor_tracking(device_type);
CREATE INDEX idx_visitor_tracking_created_date ON visitor_tracking(created_date);

-- 5. 뷰 생성 (통계 조회용)
CREATE OR REPLACE VIEW visitor_tracking_summary AS
SELECT 
    DATE(created_at) as visit_date,
    COUNT(*) as total_visits,
    COUNT(DISTINCT ip_address) as unique_visitors,
    COUNT(CASE WHEN counsel_type_id = 1 THEN 1 END) as premium_checks,
    COUNT(CASE WHEN counsel_type_id = 2 THEN 1 END) as counsel_requests,
    COUNT(CASE WHEN device_type = 'mobile' THEN 1 END) as mobile_visits,
    COUNT(CASE WHEN device_type = 'desktop' THEN 1 END) as desktop_visits,
    COUNT(CASE WHEN search_engine = 'Google' THEN 1 END) as google_visits,
    COUNT(CASE WHEN search_engine = 'Naver' THEN 1 END) as naver_visits
FROM visitor_tracking 
GROUP BY DATE(created_at)
ORDER BY visit_date DESC;

-- 6. 기존 데이터 마이그레이션 (선택적)
-- 필요한 경우 기존 데이터에서 핵심 정보만 추출하여 새 테이블에 삽입
INSERT INTO visitor_tracking (
    created_at, ip_address, carrier, session_count, page_url,
    device_model, device_type, browser, os,
    traffic_source, referrer, search_keyword, search_engine,
    counsel_type_id, name, phone, user_agent
)
SELECT 
    created_at,
    ip_address,
    carrier,
    1 as session_count,
    page_url,
    device_model,
    device_type,
    browser,
    os,
    CASE 
        WHEN search_engine = 'Google' THEN 'Google-PC'
        WHEN search_engine = 'Naver' THEN 'Naver-PC'
        WHEN device_type = 'mobile' THEN 'Mobile'
        ELSE 'Direct'
    END as traffic_source,
    referrer,
    search_keyword,
    search_engine,
    counsel_type_id,
    name,
    phone,
    user_agent
FROM visitor_tracking_backup
WHERE created_at >= NOW() - INTERVAL '30 days'; -- 최근 30일 데이터만 마이그레이션

-- 7. 테이블 권한 설정
GRANT ALL PRIVILEGES ON TABLE visitor_tracking TO authenticated;
GRANT ALL PRIVILEGES ON TABLE visitor_tracking TO anon;
GRANT ALL PRIVILEGES ON VIEW visitor_tracking_summary TO authenticated;
GRANT ALL PRIVILEGES ON VIEW visitor_tracking_summary TO anon;

-- 8. RLS (Row Level Security) 설정
ALTER TABLE visitor_tracking ENABLE ROW LEVEL SECURITY;

-- 관리자만 모든 데이터 조회 가능
CREATE POLICY "Admin can view all visitor data" ON visitor_tracking
    FOR ALL USING (auth.role() = 'admin');

-- 일반 사용자는 자신의 데이터만 조회 가능 (필요시)
CREATE POLICY "Users can view own data" ON visitor_tracking
    FOR SELECT USING (auth.uid()::text = ip_address);

COMMENT ON TABLE visitor_tracking IS '방문자 추적 테이블 (간소화된 15개 핵심 필드)';
COMMENT ON COLUMN visitor_tracking.traffic_source IS '유입종류: Google-PC, Naver-PC, Mobile, Direct 등';
COMMENT ON COLUMN visitor_tracking.carrier IS '통신사: SKT, KT, LG U+';
COMMENT ON COLUMN visitor_tracking.device_model IS '모바일기종: iPhone 15+, Android 14+ 등';

