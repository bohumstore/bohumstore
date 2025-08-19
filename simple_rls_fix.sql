-- 간단한 RLS 정책 해결
-- Supabase SQL Editor에서 실행하세요

-- 1. RLS 완전 비활성화 (가장 간단한 해결책)
ALTER TABLE visitor_tracking DISABLE ROW LEVEL SECURITY;

-- 2. 테스트 데이터 삽입
INSERT INTO visitor_tracking (
  page_url, 
  device_type, 
  browser, 
  os, 
  user_agent,
  ip_address,
  traffic_source
) VALUES (
  '/test-page', 
  'desktop', 
  'test-browser', 
  'test-os', 
  'test-user-agent',
  '127.0.0.1',
  'direct'
);

-- 3. 삽입된 데이터 확인
SELECT COUNT(*) as total_visitors FROM visitor_tracking;
SELECT * FROM visitor_tracking ORDER BY created_at DESC LIMIT 3;
