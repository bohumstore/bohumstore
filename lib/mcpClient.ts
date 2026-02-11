// MCP 클라이언트는 서버 사이드에서만 사용
// 브라우저에서는 직접 Supabase 클라이언트 사용

import { supabase } from '@/app/api/supabase';

// 사용자 조회 함수 (직접 Supabase 사용)
export const queryUsers = async (limit: number = 10, phone?: string) => {
  try {
    let query = supabase.from('user').select('*').limit(limit);
    if (phone) {
      query = query.eq('phone', phone);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  } catch (error) {
    console.error('사용자 조회 오류:', error);
    throw error;
  }
};

// 사용자 생성 함수 (직접 Supabase 사용)
export const createUser = async (userData: {
  name: string;
  phone: string;
  birth: string;
  gender: string;
}) => {
  try {
    const { data, error } = await supabase
      .from('user')
      .insert(userData)
      .select()
      .single();
    
    if (error) throw error;
    return { content: [{ type: 'text', text: `User created successfully: ${JSON.stringify(data, null, 2)}` }] };
  } catch (error) {
    console.error('사용자 생성 오류:', error);
    throw error;
  }
};

// 상담 기록 조회 함수 (직접 Supabase 사용)
export const queryCounsel = async (limit: number = 10, counselType?: number) => {
  try {
    let query = supabase.from('counsel').select('*').limit(limit);
    if (counselType) {
      query = query.eq('counsel_type_id', counselType);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  } catch (error) {
    console.error('상담 조회 오류:', error);
    throw error;
  }
};

// 상담 기록 생성 함수 (직접 Supabase 사용)
export const createCounsel = async (counselData: {
  user_id: number;
  company_id: number;
  product_id: number;
  counsel_type_id: number;
}) => {
  try {
    const { data, error } = await supabase
      .from('counsel')
      .insert(counselData)
      .select()
      .single();
    
    if (error) throw error;
    return { content: [{ type: 'text', text: `Counsel record created successfully: ${JSON.stringify(data, null, 2)}` }] };
  } catch (error) {
    console.error('상담 생성 오류:', error);
    throw error;
  }
}; 