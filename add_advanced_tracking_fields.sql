-- visitor_tracking 테이블에 고급 추적 필드들 추가
-- Supabase SQL Editor에서 실행하세요

-- 1. 검색 관련 필드들
ALTER TABLE public.visitor_tracking 
ADD COLUMN IF NOT EXISTS search_keyword TEXT,
ADD COLUMN IF NOT EXISTS search_engine TEXT,
ADD COLUMN IF NOT EXISTS organic_search BOOLEAN,
ADD COLUMN IF NOT EXISTS paid_search BOOLEAN;

-- 2. 모바일 디바이스 상세 정보
ALTER TABLE public.visitor_tracking 
ADD COLUMN IF NOT EXISTS device_model TEXT,
ADD COLUMN IF NOT EXISTS screen_resolution TEXT,
ADD COLUMN IF NOT EXISTS touch_support BOOLEAN,
ADD COLUMN IF NOT EXISTS connection_type TEXT,
ADD COLUMN IF NOT EXISTS carrier TEXT;

-- 3. 사용자 행동 및 성능 관련
ALTER TABLE public.visitor_tracking 
ADD COLUMN IF NOT EXISTS page_load_time INTEGER, -- 페이지 로드 시간 (ms)
ADD COLUMN IF NOT EXISTS bounce_rate BOOLEAN,    -- 이탈 여부 (30초 이내 이탈)
ADD COLUMN IF NOT EXISTS scroll_depth INTEGER,   -- 스크롤 깊이 (0-100%)
ADD COLUMN IF NOT EXISTS time_on_page INTEGER;   -- 페이지 체류 시간 (초)

-- 4. 마케팅 및 유입 관련
ALTER TABLE public.visitor_tracking 
ADD COLUMN IF NOT EXISTS campaign_id TEXT,       -- 캠페인 ID
ADD COLUMN IF NOT EXISTS ad_group TEXT,          -- 광고 그룹
ADD COLUMN IF NOT EXISTS keyword TEXT,           -- 광고 키워드
ADD COLUMN IF NOT EXISTS ad_position TEXT,       -- 광고 위치
ADD COLUMN IF NOT EXISTS cost_per_click DECIMAL(10,2); -- 클릭당 비용

-- 5. 지역 및 언어 관련
ALTER TABLE public.visitor_tracking 
ADD COLUMN IF NOT EXISTS language TEXT,          -- 브라우저 언어
ADD COLUMN IF NOT EXISTS timezone_offset INTEGER, -- 타임존 오프셋 (분)
ADD COLUMN IF NOT EXISTS is_bot BOOLEAN;         -- 봇 여부

-- 6. 기존 레코드들에 기본값 설정
UPDATE public.visitor_tracking 
SET 
  organic_search = true,
  paid_search = false,
  touch_support = CASE 
    WHEN device_type = 'mobile' OR device_type = 'tablet' THEN true 
    ELSE false 
  END,
  bounce_rate = false,
  is_bot = false
WHERE organic_search IS NULL;

-- 7. 새로 추가된 필드들 확인
SELECT 
  id, 
  created_at,
  search_keyword,
  search_engine,
  device_model,
  screen_resolution,
  page_load_time,
  bounce_rate
FROM public.visitor_tracking 
ORDER BY created_at DESC 
LIMIT 5;

