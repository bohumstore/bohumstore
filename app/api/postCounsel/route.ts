
import { NextResponse } from "next/server"
import { supabase } from "../supabase"
import request from "../request"

export async function POST(req: Request) {
  const { userId, phone, counselTypeId, companyId, productId } = await req.json();
  supabase.from('counsel').insert({
    user_id: userId,
    counsel_type_id: counselTypeId,
    product_id: productId,
    company_id: companyId
  })
1!
  const kakaoResToClient = await request.post(
    `https://${process.env.KAKAO_BASE_URL}/v2/send/kakao`,
    {
      message_type:  'AT',
      sender_key:    process.env.KAKAO_SENDER_KEY,
      cid:           process.env.KAKAO_CID,
      template_code: process.env.KAKAO_TEMPLATE_CODE,
      phone_number:  phone,
      sender_no:     process.env.KAKAO_SENDER_NO,
      message:       `간병인보험 상담 신청이 접수되었습니다. 곧 연락드리겠습니다.`,
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
      message:       `${userId} 님이 간병인보험 상담 신청을 하셨습니다.\n\n상담 유형: 간병인보험\n연락처: ${phone}`,
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