import { NextResponse } from 'next/server';
import { supabase } from '../supabase';

export async function GET() {
  try {
    console.log('[TEST] 연결 테스트 시작...');
    
    // 1. 기본 연결 테스트
    const { data, error } = await supabase
      .from('visitor_tracking')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error('[TEST] Supabase 연결 실패:', error);
      return NextResponse.json({
        success: false,
        error: error.message,
        details: 'Supabase 연결 실패'
      });
    }
    
    // 2. 테스트 데이터 삽입
    const testData = {
      page_url: '/test-connection',
      device_type: 'desktop',
      browser: 'test',
      os: 'test',
      traffic_source: 'test',
      user_agent: 'test-connection-api'
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('visitor_tracking')
      .insert([testData])
      .select();
    
    if (insertError) {
      console.error('[TEST] 테스트 데이터 삽입 실패:', insertError);
      return NextResponse.json({
        success: false,
        error: insertError.message,
        details: '테스트 데이터 삽입 실패',
        code: insertError.code,
        hint: insertError.hint,
        supabaseError: insertError
      });
    }
    
    // 3. 전체 레코드 수 확인
    const { count, error: countError } = await supabase
      .from('visitor_tracking')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      console.error('[TEST] 레코드 수 조회 실패:', countError);
      return NextResponse.json({
        success: false,
        error: countError.message,
        details: '레코드 수 조회 실패'
      });
    }
    
    console.log('[TEST] 연결 테스트 성공:', { count, insertData });
    
    return NextResponse.json({
      success: true,
      message: '연결 테스트 성공',
      totalRecords: count || 0,
      testRecord: insertData?.[0]
    });
    
  } catch (error) {
    console.error('[TEST] 연결 테스트 중 예외 발생:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: '예외 발생'
    });
  }
}
