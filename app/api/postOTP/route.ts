
import { NextResponse } from "next/server"
import { supabase } from "../supabase"
import request from "../request"

export async function POST(req: Request) {
  const { phone } = await req.json()
  const code = Math.floor(100000 + Math.random()*900000).toString()

  // 1) DB 에 저장
  const { error: dbErr } = await supabase
    .from('otp')
    .insert({ phone, code })
  if (dbErr) {
    console.error(dbErr)
    return NextResponse.json({ error: 'DB 저장 실패' }, { status: 500 })
  }

  // 2) 카카오 알림톡 전송
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
      { headers: {
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
    console.error('카톡 전송 에러:', e.response?.data || e.message)
    return NextResponse.json({ error: '알림톡 전송 실패' }, { status: 502 })
  }

  return NextResponse.json({ success: true })
}
