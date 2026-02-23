import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../supabase';

export async function GET(request: NextRequest) {
  try {
    console.log('Basic test API called');
    
    // 환경 변수 확인
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    console.log('Supabase URL:', supabaseUrl ? 'Set' : 'Not set');
    console.log('Supabase Key:', supabaseKey ? 'Set' : 'Not set');
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        success: false,
        error: 'Environment variables not set',
        url: !!supabaseUrl,
        key: !!supabaseKey
      }, { status: 500 });
    }
    
    // 가장 기본적인 연결 테스트
    const { data, error } = await supabase
      .from('visitor_tracking')
      .select('id')
      .limit(1);

    if (error) {
      console.error('Supabase query error:', error);
      return NextResponse.json({
        success: false,
        error: error.message,
        code: error.code,
        details: error
      }, { status: 500 });
    }

    console.log('Supabase query successful, data:', data);
    
    return NextResponse.json({
      success: true,
      message: 'Basic connection successful',
      data: data,
      count: data ? data.length : 0
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({
      success: false,
      error: 'Unexpected error occurred',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

