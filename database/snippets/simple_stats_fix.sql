-- 간단한 통계 확인 및 수정
-- Supabase SQL Editor에서 실행하세요

-- 1. 전체 방문자 수 확인
SELECT COUNT(*) as total_visitors FROM visitor_tracking;

-- 2. 상담 유형별 방문자 수 확인
SELECT 
  counsel_type_id,
  CASE 
    WHEN counsel_type_id = 1 THEN '보험료 확인'
    WHEN counsel_type_id = 2 THEN '상담신청'
    ELSE '기타'
  END as counsel_type_name,
  COUNT(*) as count
FROM visitor_tracking 
WHERE counsel_type_id IS NOT NULL
GROUP BY counsel_type_id
ORDER BY counsel_type_id;

-- 3. 디바이스별 방문자 수 확인
SELECT 
  device_type,
  COUNT(*) as count
FROM visitor_tracking 
GROUP BY device_type
ORDER BY count DESC;

-- 4. 브라우저별 방문자 수 확인
SELECT 
  browser,
  COUNT(*) as count
FROM visitor_tracking 
GROUP BY browser
ORDER BY count DESC;

-- 5. OS별 방문자 수 확인
SELECT 
  os,
  COUNT(*) as count
FROM visitor_tracking 
GROUP BY os
ORDER BY count DESC;

-- 6. 고유 IP 주소 수 확인
SELECT COUNT(DISTINCT ip_address) as unique_ips FROM visitor_tracking;

-- 7. 최근 방문자 5명 확인
SELECT 
  id,
  created_at,
  page_url,
  counsel_type_id,
  name,
  phone
FROM visitor_tracking 
ORDER BY created_at DESC 
LIMIT 5;
