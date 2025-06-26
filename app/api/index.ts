import { NextResponse } from "next/server"
import request from "./request"
import { supabase } from "./supabase"

export async function postOTP(req: Request) {
  const { phone } = await req.json()

  const code = Math.floor(100000 + Math.random() * 900000).toString()

  const { error: dbErr } = await supabase
    .from('otp')
    .insert({ phone, code })
  if (dbErr) {
    console.error(dbErr)
    return NextResponse.json({ error: 'DB 저장 실패' }, { status: 500 })
  }

  try {
    const kakaoRes = await request.post(
      `https://${process.env.KAKAO_BASE_URL}/v2/send/kakao`,
      {
        message_type:  'AT',
        sender_key:    process.env.KAKAO_SENDER_KEY,
        cid:           process.env.KAKAO_CID,
        template_code: process.env.KAKAO_TEMPLATE_CODE,
        phone_number:  phone,
        sender_no:     process.env.KAKAO_SENDER_NO,
        message:       `인증번호 [${code}]를 입력해주세요.`,
        fall_back_yn:  false
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.KAKAO_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        }
      }
    )

    if (kakaoRes.status !== 200) {
      console.error('알림톡 응답:', kakaoRes.data)
      return NextResponse.json({ error: '알림톡 전송 실패' }, { status: 502 })
    }

  } catch (e: any) {
    console.error('카카오톡 전송 에러:', e.response?.data || e.message)
    return NextResponse.json({ error: '알림톡 전송 실패' }, { status: 502 })
  }
  return NextResponse.json({ success: true })
}

export async function verifyOTP(req: Request) {
  const { phone, name, birth, gender, code } = await req.json()

  const { data, error } = await supabase
    .from('otp')
    .select('code, created_at')
    .eq('phone', phone)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: '인증정보를 찾을 수 없습니다.' }, { status: 404 })
  }

  const age = Date.now() - new Date(data.created_at).getTime()
  if (data.code !== code || age > 10 * 60 * 1000) {
    return NextResponse.json({ error: '인증번호가 틀리거나 만료되었습니다.' }, { status: 400 })
  }

  const { data: existingUser } = await supabase
    .from('user')
    .select('id')
    .eq('phone', phone)
    .single()

  let user = existingUser
  if (!user) {
    const { data: newUser, error } = await supabase
      .from('user')
      .insert({ phone, name, birth, gender })
      .select('id')
      .single()
    if (error) throw error
    user = newUser
  }

  return NextResponse.json({ success: true, userId: user.id })
}

export async function postCounsel(req: Request) {
  const { userId, phone, counselTypeId, companyId, productId } = await req.json();
  supabase.from('counsel').insert({
    user_id: userId,
    counsel_type_id: counselTypeId,
    product_id: productId,
    company_id: companyId
  })

  const kakaoResToClient = await request.post(
    `https://${process.env.KAKAO_BASE_URL}/v2/send/kakao`,
    {
      message_type:  'AT',
      sender_key:    process.env.KAKAO_SENDER_KEY,
      cid:           process.env.KAKAO_CID,
      template_code: process.env.KAKAO_TEMPLATE_CODE,
      phone_number:  phone,
      sender_no:     process.env.KAKAO_SENDER_NO,
      message:       `상담 신청이 접수되었습니다. 곧 연락드리겠습니다.`,
      fall_back_yn:  false
    },
    {
      headers: {
        'Authorization': `Bearer ${process.env.KAKAO_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      }
    }
  )

  if (kakaoResToClient.status !== 200) {
    console.error('알림톡 응답:', kakaoResToClient.data)
    return NextResponse.json({ error: '알림톡 전송 실패' }, { status: 502 })
  }

  const kakaoResToAdmin = await request.post(
    `https://${process.env.KAKAO_BASE_URL}/v2/send/kakao`,
    {
      message_type:  'AT',
      sender_key:    process.env.KAKAO_SENDER_KEY,
      cid:           process.env.KAKAO_CID,
      template_code: process.env.KAKAO_TEMPLATE_CODE,
      phone_number:  phone,
      sender_no:     process.env.KAKAO_SENDER_NO,
      message:       `${userId} 님이 상담 신청을 하셨습니다.\n\n상담 유형: ${counselTypeId}\n보험사: ${companyId}\n상품: ${productId}`,
      fall_back_yn:  false
    },
    {
      headers: {
        'Authorization': `Bearer ${process.env.KAKAO_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      }
    }
  )

  if (kakaoResToAdmin.status !== 200) {
    console.error('알림톡 응답:', kakaoResToAdmin.data)
    return NextResponse.json({ error: '알림톡 전송 실패' }, { status: 502 })
  }

  return NextResponse.json({ success: true })
}