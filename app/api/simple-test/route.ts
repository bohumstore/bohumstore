import { NextResponse } from 'next/server';
import { supabase } from '../supabase';

export async function GET() {
  try {
    console.log('Simple test API called');
    
    // 1. 환경 변수 확인
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing environment variables');
      return NextResponse.json({
        success: false,
        error: 'Missing Supabase environment variables'
      });
    }
    
    console.log('Environment variables OK');
    
    // 2. Supabase 클라이언트 생성 확인
    if (!supabase) {
      console.error('Supabase client not available');
      return NextResponse.json({
        success: false,
        error: 'Supabase client not available'
      });
    }
    
    console.log('Supabase client OK');
    
    // 3. 테이블 접근 테스트
    const { data: testData, error: selectError } = await supabase
      .from('visitor_tracking')
      .select('id')
      .limit(1);
    
    if (selectError) {
      console.error('Table access error:', selectError);
      return NextResponse.json({
        success: false,
        error: `Table access failed: ${selectError.message}`
      });
    }
    
    console.log('Table access OK');
    
    // 4. 간단한 데이터 삽입 테스트
    const testRecord = {
      ip_address: 'test-ip',
      user_agent: 'test-user-agent',
      page_url: 'http://test.com',
      session_id: 'test-session',
      device_type: 'desktop',
      browser: 'test-browser',
      os: 'test-os',
      created_at: new Date().toISOString(),
      timezone: 'Asia/Seoul',
      local_time: new Date().toLocaleString('ko-KR'),
      utc_time: new Date().toISOString(),
      search_keyword: null,
      search_engine: null,
      organic_search: true,
      paid_search: false,
      device_model: null,
      screen_resolution: null,
      touch_support: false,
      connection_type: null,
      carrier: null,
      page_load_time: null,
      bounce_rate: false,
      scroll_depth: null,
      time_on_page: null,
      campaign_id: null,
      ad_group: null,
      keyword: null,
      ad_position: null,
      cost_per_click: null,
      language: 'ko-KR',
      timezone_offset: -540,
      is_bot: false
    };
    
    const { error: insertError } = await supabase
      .from('visitor_tracking')
      .insert([testRecord]);
    
    if (insertError) {
      console.error('Data insertion error:', insertError);
      return NextResponse.json({
        success: false,
        error: `Data insertion failed: ${insertError.message}`
      });
    }
    
    console.log('Data insertion OK');
    
    return NextResponse.json({
      success: true,
      message: 'Simple test completed successfully',
      details: {
        environmentVariables: 'OK',
        supabaseClient: 'OK',
        tableAccess: 'OK',
        dataInsertion: 'OK'
      }
    });
    
  } catch (error) {
    console.error('Simple test API error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
}
