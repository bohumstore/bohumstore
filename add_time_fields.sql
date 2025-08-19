-- visitor_tracking 테이블에 시간 관련 필드 추가
-- Supabase SQL Editor에서 실행하세요

-- 1. 새로운 필드들 추가
ALTER TABLE public.visitor_tracking 
ADD COLUMN IF NOT EXISTS timezone TEXT,
ADD COLUMN IF NOT EXISTS local_time TEXT,
ADD COLUMN IF NOT EXISTS utc_time TEXT;

-- 2. 기존 레코드들에 기본값 설정 (선택사항)
UPDATE public.visitor_tracking 
SET 
  timezone = 'Asia/Seoul',
  local_time = created_at::text,
  utc_time = (created_at - INTERVAL '9 hours')::text
WHERE timezone IS NULL;

-- 3. 필드 확인
SELECT 
  id, 
  created_at, 
  timezone, 
  local_time, 
  utc_time
FROM public.visitor_tracking 
ORDER BY created_at DESC 
LIMIT 5;

