import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// .env 파일 로드
dotenv.config();

// Supabase 클라이언트 설정
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    'NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables are required'
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// 상품 데이터 설정
const setupProductData = async () => {
  try {
    console.log('🚀 Supabase 데이터 설정을 시작합니다...');

    // 1. 보험사 데이터 설정
    console.log('📋 보험사 데이터 설정 중...');
    const { error: companyError } = await supabase.from('company').upsert(
      [
        {
          id: 1,
          name: 'KB라이프',
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          name: 'KDB생명',
          created_at: new Date().toISOString(),
        },
        {
          id: 3,
          name: 'IBK연금보험',
          created_at: new Date().toISOString(),
        },
        {
          id: 4,
          name: '신한라이프',
          created_at: new Date().toISOString(),
        },
        {
          id: 5,
          name: '동양생명',
          created_at: new Date().toISOString(),
        },
      ],
      { onConflict: 'id' }
    );

    if (companyError) {
      console.error('보험사 데이터 설정 오류:', companyError);
    } else {
      console.log('✅ 보험사 데이터 설정 완료');
    }

    // 2. 카테고리 데이터 설정
    console.log('📋 카테고리 데이터 설정 중...');
    const { error: categoryError } = await supabase.from('category').upsert(
      [
        {
          id: 1,
          name: '연금보험',
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          name: '종신보험',
          created_at: new Date().toISOString(),
        },
        {
          id: 3,
          name: '변액연금보험',
          created_at: new Date().toISOString(),
        },
      ],
      { onConflict: 'id' }
    );

    if (categoryError) {
      console.error('카테고리 데이터 설정 오류:', categoryError);
    } else {
      console.log('✅ 카테고리 데이터 설정 완료');
    }

    // 3. 상품 데이터 설정
    console.log('📋 상품 데이터 설정 중...');
    const { error: productError } = await supabase.from('product').upsert(
      [
        {
          id: 1,
          name: 'KB라이프 트리플 레벨업 연금보험',
          company_id: 1,
          category_id: 3, // 변액연금보험
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          name: 'KDB 더!행복드림변액연금보험',
          company_id: 2,
          category_id: 3, // 변액연금보험
          created_at: new Date().toISOString(),
        },
        {
          id: 3,
          name: 'KDB 더!행복플러스변액연금보험',
          company_id: 2,
          category_id: 1, // 연금보험 (보증형)
          created_at: new Date().toISOString(),
        },
        {
          id: 4,
          name: 'IBK 평생연금받는 변액연금보험',
          company_id: 3,
          category_id: 3, // 변액연금보험
          created_at: new Date().toISOString(),
        },
        {
          id: 5,
          name: '신한 모아더드림 Plus 종신보험',
          company_id: 4,
          category_id: 2, // 종신보험
          created_at: new Date().toISOString(),
        },
        {
          id: 6,
          name: '동양생명 테스트 상품',
          company_id: 5,
          category_id: 2, // 종신보험
          created_at: new Date().toISOString(),
        },
      ],
      { onConflict: 'id' }
    );

    if (productError) {
      console.error('상품 데이터 설정 오류:', productError);
    } else {
      console.log('✅ 상품 데이터 설정 완료');
    }

    // 4. 상담 타입 데이터 설정
    console.log('📋 상담 타입 데이터 설정 중...');
    const { error: counselTypeError } = await supabase
      .from('counsel_type')
      .upsert(
        [
          {
            id: 1,
            name: '보험료 확인',
            description: '보험료 계산 및 확인',
            created_at: new Date().toISOString(),
          },
          {
            id: 2,
            name: '상담신청',
            description: '보험 상담 신청',
            created_at: new Date().toISOString(),
          },
        ],
        { onConflict: 'id' }
      );

    if (counselTypeError) {
      console.error('상담 타입 데이터 설정 오류:', counselTypeError);
    } else {
      console.log('✅ 상담 타입 데이터 설정 완료');
    }

    console.log('🎉 모든 데이터 설정이 완료되었습니다!');
    console.log('\n📊 설정된 데이터:');
    console.log('- 보험사: KB라이프, KDB생명, IBK연금보험, 신한라이프, 동양생명');
    console.log('- 카테고리: 연금보험, 종신보험, 변액연금보험');
    console.log('- 상품:');
    console.log('  * KB라이프 트리플 레벨업 연금보험 (ID: 1) - 변액연금보험');
    console.log('  * KDB 더!행복드림변액연금보험 (ID: 2) - 변액연금보험');
    console.log('  * KDB 더!행복플러스변액연금보험 (ID: 3) - 연금보험 (보증형)');
    console.log('  * IBK 평생연금받는 변액연금보험 (ID: 4) - 변액연금보험');
    console.log('  * 신한 모아더드림 Plus 종신보험 (ID: 5) - 종신보험');
    console.log('  * 동양생명 테스트 상품 (ID: 6) - 종신보험');
    console.log('- 상담 타입: 보험료 확인, 상담신청');
  } catch (error) {
    console.error('❌ 데이터 설정 중 오류 발생:', error);
  }
};

// 데이터 조회 함수
const checkData = async () => {
  try {
    console.log('🔍 현재 데이터 확인 중...');

    // 보험사 조회
    const { data: companies } = await supabase.from('company').select('*');
    console.log('📋 보험사:', companies);

    // 카테고리 조회
    const { data: categories } = await supabase.from('category').select('*');
    console.log('📋 카테고리:', categories);

    // 상품 조회
    const { data: products } = await supabase.from('product').select('*');
    console.log('📋 상품:', products);

    // 상담 타입 조회
    const { data: counselTypes } = await supabase.from('counsel_type').select('*');
    console.log('📋 상담 타입:', counselTypes);
  } catch (error) {
    console.error('❌ 데이터 조회 중 오류 발생:', error);
  }
};

// 메인 실행
const main = async () => {
  const command = process.argv[2];

  if (command === 'check') {
    await checkData();
  } else {
    await setupProductData();
  }
};

main();
