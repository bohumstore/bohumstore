import { NextResponse } from "next/server";
import { supabase } from "../supabase";
import { alimtalkSend } from "@/app/lib/aligo";
import aligoAuth from "../utils/aligoAuth";
import { link } from "fs";
import { use } from "react";

export async function POST(req: Request) {
  const requestBody = await req.json();
  console.log("[API] 받은 요청 데이터:", requestBody);
  
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
    interestValue = null,
    refundValue = null,
    monthlyPension = null,
    guaranteedPension = null,
    performancePension = null,
    templateId = null, // 고객용 템플릿 ID
    adminTemplateId = null, // 관리자용 템플릿 ID
    onlyClient = false // 추가: 오직 고객용만 보낼지 여부
  } = requestBody;

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

  const [productResult, companyResult] = await Promise.all([
    supabase
      .from('product')
      .select('name')
      .eq('id', productId)
      .single(),
    supabase
      .from('company')
      .select('name')
      .eq('id', companyId)
      .single()
  ])

  const { data: product, error: productErr } = productResult

  if (productErr || !product) {
    console.error('상품 조회 실패', productErr)
    throw new Error('상품 조회 실패')
  }
  console.log("[DEBUG] product:", product);

  const { data: company, error: companyErr } = companyResult

  if (companyErr || !company) {
    console.error('회사 조회 실패', companyErr)
    throw new Error('회사 조회 실패')
  }
  console.log("[DEBUG] company:", company);

  if (onlyClient) {
    // 고객용 알림톡만 발송 (인증번호 검증 및 DB 작업 생략)
    // 실제 보험사명 사용
    const companyName = company.name;
    // 성별 한글 변환
    const genderKor = gender === 'M' ? '남' : gender === 'F' ? '여' : gender;
    const toClientReq = {
      headers: { "content-type": "application/json" },
      body: {
        tpl_code: "UA_7919",
        sender: "010-8897-7486",
        receiver_1: phone,
        subject_1: "상담/설계요청 - 고객전송",
        message_1: `▼ ${name}님

▣ 보험종류: [ ${product.name} ]
▣ 상담시간: [ ${counselTime} ]

상담 신청해 주셔서 감사합니다!`,

        button_1: {
          button: [{
            name: "채널 추가",
            linkType: "AC"
          }]
        },
        testMode: "N",
      },
    }
    try {
      const resultToClient = await alimtalkSend(toClientReq, aligoAuth);
      console.log("고객 알림톡 전송 결과 (onlyClient):", resultToClient);
    } catch (err) {
      console.error("알림톡 전송 실패 (onlyClient):", err);
      return NextResponse.json({ error: "알림톡 전송 실패" }, { status: 502 });
    }
    return NextResponse.json({ success: true });
  }

  if (counselType === 1 || counselType === 2) {
    console.log("[DEBUG] counselType:", counselType);
    console.log("[DEBUG] user:", user);
    console.log("[DEBUG] templateId:", templateId);
    console.log("[DEBUG] adminTemplateId:", adminTemplateId);
    const tplCode = adminTemplateId || (counselType === 1 ? "UA_8331" : "UA_8332");
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
      console.error("[DEBUG] DB insert error:", calcErr);
      return NextResponse.json(
        { error: "상담 요청 중 오류" },
        { status: 500 }
      );
    }
    console.log("[DEBUG] DB insert success");

    // 실제 보험사명 사용
    const companyName = company.name;
    // 성별 한글 변환
    const genderKor = gender === 'M' ? '남' : gender === 'F' ? '여' : gender;

    // 관리자/고객 발송을 병렬 처리하여 전체 대기시간을 단축
    const adminSendPromise = ((): Promise<any> | null => {
      if (onlyClient) return null;
      const toAdminReq = {
        headers: { "content-type": "application/json" },
        body: {
          tpl_code:   tplCode,
          sender:     "010-8897-7486",
          receiver_1: "010-8897-7486",
          subject_1:  subject,
          message_1:  counselType === 1
            ? `[보험료계산]\n${companyName}\n${product.name}\n${birth}\n${name}\n${genderKor}\n${phone}`
            : `[상담/설계요청]\n${counselTime}\n${product.name}\n${birth}\n${name}\n${genderKor}\n${phone}`,
          testMode: "N",
        },
      };
      console.log("[DEBUG] 관리자 알림톡 요청 데이터:", toAdminReq.body);
      return alimtalkSend(toAdminReq, aligoAuth);
    })();

    // 고객용 템플릿 ID 결정 (counselType: 1일 때는 performancePension 여부에 따라 템플릿 선택)
    let clientTemplateId;
    if (counselType === 1) {
      // 신한라이프 모아더드림Plus종신보험(상품ID 5)일 때 UA_7918 템플릿 사용
      if (productId === 5) {
        clientTemplateId = "UA_7918"; // 신한라이프 모아더드림Plus종신보험 전용 템플릿
        console.log("[DEBUG] 신한라이프 모아더드림Plus종신보험이므로 UA_7918 템플릿 사용");
      } else if (performancePension) {
        clientTemplateId = "UB_6018"; // 변액연금용 템플릿 (실적배당 포함)
        console.log("[DEBUG] counselType이 1이고 performancePension이 있으므로 UB_6018 템플릿 사용");
      } else {
        clientTemplateId = "UB_5797"; // 일반 연금용 템플릿
        console.log("[DEBUG] counselType이 1이므로 UB_5797 템플릿 사용");
      }
    } else {
      clientTemplateId = templateId || "UA_7919"; // 상담신청용 템플릿
      console.log("[DEBUG] counselType이 2이므로 상담신청용 템플릿 사용:", clientTemplateId);
    }
    console.log("[DEBUG] 최종 고객용 템플릿 ID:", clientTemplateId);
    console.log("[DEBUG] 클라이언트에서 전송한 templateId:", templateId);
    console.log("[DEBUG] counselType:", counselType);
    
    const toClientReq = {
      headers: { "content-type": "application/json" },
      body: {
        tpl_code: clientTemplateId,
        sender: "010-8897-7486",
        receiver_1: phone,
        subject_1: subject,
        message_1: counselType === 1
          ? clientTemplateId === "UA_7918"
            // UA_7918 템플릿 (신한라이프 모아더드림Plus종신보험 전용)
            ? `▣ ${user.name}님 계산 결과입니다.\n\n⊙ 보험사: ${companyName}\n⊙ 상품명: ${product.name}\n⊙ 납입기간: ${paymentPeriod}\n⊙ 월보험료: ${mounthlyPremium}\n\n▼ 10년시점 ▼\n· 환급률: ${tenYearReturnRate}%\n· 확정이자: ${interestValue}원\n· 예상해약환급금: ${refundValue}원`
            : clientTemplateId === "UB_6018"
            // UB_6018 템플릿 (변액연금용 - 실적배당 포함)
            ? `▣ ${user.name}님 계산 결과입니다.\n\n⊙ 보험사: ${companyName}\n⊙ 상품명: ${product.name}\n⊙ 납입기간 / 월보험료: ${paymentPeriod} / ${mounthlyPremium}\n⊙ 총 납입액: ${mounthlyPremium ? (parseInt(mounthlyPremium.replace(/[^0-9]/g, '')) * 10000 * parseInt(paymentPeriod.replace(/[^0-9]/g, '')) * 12).toLocaleString() : '-'}원\n⊙ 연금개시연령: ${paymentPeriod ? (paymentPeriod.includes('10') ? '65' : paymentPeriod.includes('15') ? '70' : paymentPeriod.includes('20') ? '75' : '80') : '-'}세\n\n▼ 예상 연금 수령 ▼\n· 월 연금액: ${monthlyPension ? monthlyPension.toLocaleString() : '-'}원\n· 실적배당 연금액: ${performancePension ? performancePension.toLocaleString() : '-'}원\n· 100세까지 총 수령액: ${monthlyPension ? (monthlyPension * 12 * 35).toLocaleString() : '-'}원\n\n※ 위 금액은 예시이며, 실제 수령액은 가입 시 조건, 이율, 보험사 정책 및 운용 실적 등에 따라 달라질 수 있습니다.`
            // UB_5797 템플릿 (일반 연금용)
            : `▣ ${user.name}님 계산 결과입니다.\n\n⊙ 보험사: ${companyName}\n⊙ 상품명: ${product.name}\n⊙ 납입기간 / 월보험료: ${paymentPeriod} / ${mounthlyPremium}\n⊙ 총 납입액: ${mounthlyPremium ? (parseInt(mounthlyPremium.replace(/[^0-9]/g, '')) * 10000 * parseInt(paymentPeriod.replace(/[^0-9]/g, '')) * 12).toLocaleString() : '-'}원\n⊙ 연금개시연령: ${paymentPeriod ? (paymentPeriod.includes('10') ? '65' : paymentPeriod.includes('15') ? '70' : paymentPeriod.includes('20') ? '75' : '80') : '-'}세\n\n▼ 예상 연금 수령 ▼\n· 월 연금액: ${monthlyPension ? monthlyPension.toLocaleString() : '-'}원\n· 20년 보증기간 총액: ${guaranteedPension ? guaranteedPension.toLocaleString() : '-'}원\n· 100세까지 총 수령액: ${monthlyPension && guaranteedPension ? (monthlyPension * 12 * 35).toLocaleString() : '-'}원\n\n※ 위 금액은 예시이며, 실제 수령액은 가입 시 조건, 이율, 보험사 정책 등에 따라 달라질 수 있습니다.`
          : `▼ ${user.name}님\n\n▣ 보험종류: [ ${product.name} ]\n▣ 상담시간: [ ${counselTime} ]\n\n상담 신청해 주셔서 감사합니다!`,
        button_1: {
          button: [{
            name: "채널 추가",
            linkType: "AC"
          }]
        },
        testMode: "N",
      },
    }
    
    console.log("[DEBUG] 고객용 알림톡 요청 데이터:", toClientReq.body);
    
    try {
      const sendPromises: Promise<any>[] = [];
      if (adminSendPromise) sendPromises.push(adminSendPromise);
      sendPromises.push(alimtalkSend(toClientReq, aligoAuth));
      const results = await Promise.all(sendPromises);
      console.log("알림톡 전송 결과(병렬):", results);
    } catch (err) {
      console.error("알림톡 전송 실패(병렬):", err);
      return NextResponse.json({ error: "알림톡 전송 실패" }, { status: 502 });
    }
  }

  return NextResponse.json({ success: true, userId: user.id });
}
