-- Supabase 데이터베이스 시간대를 한국 시간(KST)으로 설정
-- Supabase SQL Editor에서 실행하세요

-- 1. 현재 시간대 확인
SHOW timezone;

-- 2. 데이터베이스 시간대를 한국 시간으로 변경
ALTER DATABASE postgres SET timezone TO 'Asia/Seoul';

-- 3. 현재 세션의 시간대를 한국 시간으로 설정
SET timezone TO 'Asia/Seoul';

-- 4. 시간대 변경 확인
SHOW timezone;

-- 5. 현재 시간 확인 (한국 시간으로 표시되어야 함)
SELECT 
  NOW() as current_time,
  CURRENT_TIMESTAMP as current_timestamp,
  NOW() AT TIME ZONE 'Asia/Seoul' as kst_time;

-- 6. 기존 데이터의 시간 확인 (변경 전후 비교)
SELECT 
  id,
  created_at,
  created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Seoul' as kst_created_at
FROM visitor_tracking 
ORDER BY created_at DESC 
LIMIT 5;

-- 7. 새로운 데이터 삽입 테스트
INSERT INTO visitor_tracking (
  page_url, 
  device_type, 
  browser, 
  os, 
  user_agent,
  ip_address,
  traffic_source
) VALUES (
  '/timezone-test', 
  'desktop', 
  'test-browser', 
  'test-os', 
  'timezone-test-agent',
  '127.0.0.1',
  'direct'
);

-- 8. 삽입된 데이터의 시간 확인
SELECT 
  id,
  created_at,
  created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Seoul' as kst_created_at
FROM visitor_tracking 
WHERE page_url = '/timezone-test'
ORDER BY created_at DESC 
LIMIT 1;
