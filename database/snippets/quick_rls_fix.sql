-- 빠른 RLS 정책 해결
-- Supabase SQL Editor에서 실행하세요

-- 1. RLS 완전 비활성화
ALTER TABLE visitor_tracking DISABLE ROW LEVEL SECURITY;

-- 2. 테스트 데이터 삽입
INSERT INTO visitor_tracking (
  page_url, 
  device_type, 
  browser, 
  os, 
  user_agent,
  ip_address,
  traffic_source,
  created_at
) VALUES (
  '/quick-test', 
  'desktop', 
  'test-browser', 
  'test-os', 
  'quick-test-agent',
  '127.0.0.1',
  'direct',
  NOW()
);

-- 3. 데이터 확인
SELECT COUNT(*) as total_count FROM visitor_tracking;
SELECT * FROM visitor_tracking ORDER BY created_at DESC LIMIT 3;
