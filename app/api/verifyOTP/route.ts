import { NextResponse } from "next/server";
import { supabase } from "../supabase";
import { alimtalkSend } from "@/app/lib/aligo";
import aligoAuth from "../utils/aligoAuth";
import { link } from "fs";
import { use } from "react";

export async function POST(req: Request) {
  const {
    phone,
    name,
    birth,
    gender,
    code,
    counselType,
    companyId,
    productId,
    insuranceType,
    counselTime,
    mounthlyPremium = null,
    paymentPeriod = null,
    tenYearReturnRate = null,
  } = await req.json();

  const { data, error } = await supabase
    .from("otp")
    .select("code, created_at")
    .eq("phone", phone)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: "인증정보를 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  const age = Date.now() - new Date(data.created_at).getTime();
  if (data.code !== code || age > 3 * 60 * 1000) {
    return NextResponse.json(
      { error: "인증번호가 틀리거나 만료되었습니다." },
      { status: 400 }
    );
  }

  const { data: existingUser } = await supabase
    .from("user")
    .select("id, phone, name, birth, gender")
    .eq("phone", phone)
    .single();

  let user = existingUser;
  if (!user) {
    const { data: newUser, error: insertErr } = await supabase
      .from("user")
      .insert({ phone, name, birth, gender })
      .select("id, phone, name, birth, gender")
      .single();
    if (insertErr) {
      console.error(insertErr);
      return NextResponse.json(
        { error: "사용자 생성 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }
    user = newUser;
  }

  const { data: product, error: productErr } = await supabase
    .from('product')
    .select('name')
    .eq('id', productId)
    .single()

  if (productErr || !product) {
    console.error('상품 조회 실패', productErr)
    throw new Error('상품 조회 실패')
  }

  const { data: company, error: companyErr } = await supabase
    .from('company')
    .select('name')
    .eq('id', companyId)
    .single()

  if (companyErr || !company) {
    console.error('회사 조회 실패', companyErr)
    throw new Error('회사 조회 실패')
  }

  if (counselType === 1 || counselType === 2) {
    const tplCode = counselType === 1 ? "UA_8331" : "UA_8332";
    const subject = counselType === 1
      ? "보험료계산 - 관리자전송"
      : "상담/설계요청 - 관리자전송";

    const { error: calcErr } = await supabase
      .from("counsel")
      .insert({
        user_id: user.id,
        company_id: companyId,
        product_id: productId,
        counsel_type_id: counselType,
        counsel_time: counselTime
      })
      .single();

    if (calcErr) {
      console.error(calcErr);
      return NextResponse.json(
        { error: "상담 요청 중 오류" },
        { status: 500 }
      );
    }

    const toAdminReq = {
      headers: { "content-type": "application/json" },
      body: {
        tpl_code:   tplCode,
        sender:     "010-8897-7486",
        receiver_1: "010-8897-7486",
        subject_1:  subject,
        message_1:  counselType === 1
          // 보험료계산 포맷
          ? `[보험료계산]\n${company.name}\n${product.name}\n${birth}\n${name}\n${gender}\n${phone}`
          // 상담/설계요청 포맷
          : `[상담/설계요청]\n${counselTime}\n${product.name}\n${birth}\n${name}\n${gender}\n${phone}`,
        testMode: "N",
      },
    };

    const toClientReq = {
      headers: { "content-type": "application/json" },
      body: {
        tpl_code:   counselType === 1 ? "UA_7918" : "UA_7919", // 본인 확인 템플릿
        sender:     "010-8897-7486",
        receiver_1: phone,
        subject_1:  subject,
        message_1:  counselType === 1
          // 보험료계산 포맷
          ? `▣ ${user.name}님 계산 결과입니다.\n⊙ 보험사: ${company.name}\n⊙ 상품명: ${product.name}\n⊙ 납입기간: ${paymentPeriod}\n⊙ 월보험료: ${mounthlyPremium}\n\n▼ 10년시점 ▼\n· 환급률: ${tenYearReturnRate}%\n· 확정이자: ${tenYearReturnRate / 10}%\n· 예상해약환급금: ${(parseFloat(mounthlyPremium) * 12 * 10 * (tenYearReturnRate / 100)).toLocaleString()}원`
          // 상담/설계요청 포맷
          : `▼ ${user.name}님\n\n▣ 보험종류: [ ${product.name} ]\n▣ 상담시간: [ ${counselTime} ]\n\n상담 신청해 주셔서 감사합니다!`,
        button_1: {
          button: [{
            name: "채널추가",
            linkType: "AC"
          }]
        },
        testMode: "N",
      },
    }

    try {
      const resultToAdmin = await alimtalkSend(toAdminReq, aligoAuth);
      const resultToClient = await alimtalkSend(toClientReq, aligoAuth);
      console.log(toAdminReq.body);
      console.log("관리자 알림톡 전송 결과:", resultToAdmin);
      console.log("고객 알림톡 전송 결과:", resultToClient);
    } catch (err) {
      console.error("알림톡 전송 실패:", err);
      return NextResponse.json({ error: "알림톡 전송 실패" }, { status: 502 });
    }
  }

  return NextResponse.json({ success: true, userId: user.id });
}
