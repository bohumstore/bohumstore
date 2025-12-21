-- RLS 정책 임시 비활성화
ALTER TABLE company DISABLE ROW LEVEL SECURITY;
ALTER TABLE category DISABLE ROW LEVEL SECURITY;
ALTER TABLE product DISABLE ROW LEVEL SECURITY;
ALTER TABLE counsel_type DISABLE ROW LEVEL SECURITY;

-- 데이터 삽입
INSERT INTO company (id, name, created_at) VALUES
(1, 'KB라이프', NOW()),
(2, 'KDB생명', NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO category (id, name, created_at) VALUES
(1, '연금보험', NOW()),
(2, '종신보험', NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO product (id, name, company_id, category_id, created_at) VALUES
(1, 'KB라이프 트리플 레벨업 연금보험', 1, 1, NOW()),
(2, 'KDB 더!행복드림변액연금보험', 2, 1, NOW()),
(3, 'KDB 더!행복플러스변액연금보험', 2, 1, NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO counsel_type (id, name, description, created_at) VALUES
(1, '보험료 확인', '보험료 계산 및 확인', NOW()),
(2, '상담신청', '보험 상담 신청', NOW())
ON CONFLICT (id) DO NOTHING;

-- RLS 정책 다시 활성화 (선택사항)
-- ALTER TABLE company ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE category ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE product ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE counsel_type ENABLE ROW LEVEL SECURITY; 