-- RLS 정책 문제 해결을 위한 SQL 스크립트
-- Supabase SQL Editor에서 실행하세요

-- 1. 현재 RLS 정책 확인
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'visitor_tracking';

-- 2. 기존 정책 삭제
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON visitor_tracking;
DROP POLICY IF EXISTS "Enable read access for all users" ON visitor_tracking;
DROP POLICY IF EXISTS "Enable select for authenticated users only" ON visitor_tracking;
DROP POLICY IF EXISTS "Users can insert their own tracking data" ON visitor_tracking;

-- 3. 새로운 정책 생성 (모든 사용자가 읽기/쓰기 가능)
CREATE POLICY "Allow all operations for all users" ON visitor_tracking
  FOR ALL TO public
  USING (true)
  WITH CHECK (true);

-- 4. RLS 활성화 상태 확인
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'visitor_tracking';

-- 5. 또는 임시로 RLS 완전 비활성화 (권장하지 않음)
-- ALTER TABLE visitor_tracking DISABLE ROW LEVEL SECURITY;

-- 6. 테스트: 간단한 데이터 삽입 시도
INSERT INTO visitor_tracking (page_url, device_type, browser, os, user_agent) 
VALUES ('/test', 'desktop', 'test-browser', 'test-os', 'test-agent');

-- 7. 삽입된 데이터 확인
SELECT * FROM visitor_tracking ORDER BY created_at DESC LIMIT 5;
