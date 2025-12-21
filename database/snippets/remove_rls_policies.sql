-- 기존 RLS 정책 모두 삭제
-- Supabase SQL Editor에서 실행

-- 1. 기존 정책 삭제
DROP POLICY IF EXISTS "Admin can view all visitor data" ON visitor_tracking;
DROP POLICY IF EXISTS "Enable insert for all users" ON visitor_tracking;
DROP POLICY IF EXISTS "Enable read access for all users" ON visitor_tracking;
DROP POLICY IF EXISTS "Users can view own data" ON visitor_tracking;

-- 2. RLS 완전 비활성화 확인
ALTER TABLE visitor_tracking DISABLE ROW LEVEL SECURITY;

-- 3. 정책이 남아있는지 확인
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename = 'visitor_tracking';

-- 4. 테이블 권한 확인
SELECT grantee, privilege_type 
FROM information_schema.role_table_grants 
WHERE table_name = 'visitor_tracking';
