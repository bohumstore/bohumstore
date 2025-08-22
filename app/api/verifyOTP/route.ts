import { NextResponse } from "next/server";
import { supabase } from "../supabase";
import { alimtalkSend } from "@/app/lib/aligo";
import aligoAuth from "../utils/aligoAuth";
import { getCachedAligoToken } from "@/app/lib/aligoTokenCache";
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

  // 상품명은 DB 표기를 그대로 사용
  const productDisplayName = product.name;

  // Aligo 토큰(가능 시) 획득 후 인증 정보 구성
  let authForSend = aligoAuth as any;
  try {
    const token = await getCachedAligoToken(aligoAuth);
    if (token) authForSend = { ...aligoAuth, token };
  } catch {
    // 토큰 획득 실패 시 기본 키로 전송 계속
  }
  
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

▣ 보험종류: [ ${productDisplayName} ]
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
      const resultToClient = await alimtalkSend(toClientReq, authForSend);
      console.log("고객 알림톡 전송 결과 (onlyClient):", resultToClient);
      if (!resultToClient || typeof resultToClient.code !== 'number' || resultToClient.code !== 0) {
        console.error('[ALIMTALK][onlyClient] 실패 응답:', resultToClient);
        return NextResponse.json({ error: "알림톡 전송 실패" }, { status: 502 });
      }
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
            ? `[보험료계산]\n${companyName}\n${productDisplayName}\n${birth}\n${name}\n${genderKor}\n${phone}`
            : `[상담/설계요청]\n${counselTime}\n${productDisplayName}\n${birth}\n${name}\n${genderKor}\n${phone}`,
          testMode: "N",
        },
      };
      console.log("[DEBUG] 관리자 알림톡 요청 데이터:", toAdminReq.body);
      return alimtalkSend(toAdminReq, authForSend);
    })();

    // 고객용 템플릿 ID 결정 (counselType: 1일 때도 클라이언트 지정 템플릿 우선 적용)
    let clientTemplateId;
    if (counselType === 1) {
      if (templateId) {
        clientTemplateId = templateId;
        console.log("[DEBUG] 클라이언트 지정 템플릿 사용:", clientTemplateId);
      } else if (productId === 5) {
        clientTemplateId = "UA_7918";
        console.log("[DEBUG] 신한라이프 모아더드림Plus종신보험이므로 UA_7918 템플릿 사용");
      } else {
        clientTemplateId = "UB_5797";
        console.log("[DEBUG] 기본 템플릿 UB_5797 사용");
      }
    } else {
      clientTemplateId = templateId || "UA_7919"; // 상담신청용 템플릿
      console.log("[DEBUG] counselType이 2이므로 상담신청용 템플릿 사용:", clientTemplateId);
    }
    console.log("[DEBUG] 최종 고객용 템플릿 ID:", clientTemplateId);
    console.log("[DEBUG] 클라이언트에서 전송한 templateId:", templateId);
    console.log("[DEBUG] counselType:", counselType);
    // 숫자 가공: 전달되지 않으면 안전한 기본/계산값으로 대체
    const monthlyPensionNum = typeof monthlyPension === 'number' ? monthlyPension : parseInt(String(monthlyPension || '0').replace(/[^0-9]/g, '')) || 0;
    const pensionStartAgeNum = (() => {
      const v = typeof (requestBody as any).pensionStartAge === 'number' ? (requestBody as any).pensionStartAge : parseInt(String((requestBody as any).pensionStartAge || '0').replace(/[^0-9]/g, '')) || 0;
      return v;
    })();
    const guaranteedPensionNum = (() => {
      const raw = typeof guaranteedPension === 'number' ? guaranteedPension : parseInt(String(guaranteedPension || '0').replace(/[^0-9]/g, ''));
      if (!isNaN(raw) && raw > 0) return raw;
      return monthlyPensionNum > 0 ? monthlyPensionNum * 12 * 20 : 0; // 기본 20년 보증 총액
    })();
    const totalUntil100Num = (() => {
      const raw = typeof (requestBody as any).totalUntil100 === 'number' ? (requestBody as any).totalUntil100 : parseInt(String((requestBody as any).totalUntil100 || '0').replace(/[^0-9]/g, ''));
      if (!isNaN(raw) && raw > 0) return raw;
      if (monthlyPensionNum > 0 && pensionStartAgeNum > 0) return monthlyPensionNum * 12 * Math.max(0, 100 - pensionStartAgeNum);
      return 0;
    })();

    // 총 납입액 계산 (문자열 입력 대응)
    const totalPaymentStr = (() => {
      const monthly = (() => {
        const str = String(mounthlyPremium || '').trim();
        if (!str) return 0;
        if (str.includes('만원')) {
          const n = parseInt(str.replace(/[^0-9]/g, ''));
          return isNaN(n) ? 0 : n * 10000;
        }
        const n = parseInt(str.replace(/[^0-9]/g, ''));
        return isNaN(n) ? 0 : n;
      })();
      const years = (() => {
        const n = parseInt(String(paymentPeriod || '').replace(/[^0-9]/g, ''));
        return isNaN(n) ? 0 : n;
      })();
      const total = monthly > 0 && years > 0 ? monthly * 12 * years : 0;
      return total > 0 ? `${total.toLocaleString()} 원` : '-';
    })();

    const toClientReq = {
      headers: { "content-type": "application/json" },
      body: {
        tpl_code: clientTemplateId,
        sender: "010-8897-7486",
        receiver_1: phone,
        subject_1: subject,
        message_1: counselType === 1
          ? clientTemplateId === "UA_7918"
            // UA_7918 템플릿 (whole-life)
            ? `▣ ${user.name}님 계산 결과입니다.\n\n⊙ 보험사: ${companyName}\n⊙ 상품명: ${productDisplayName}\n⊙ 납입기간: ${paymentPeriod}\n⊙ 월보험료: ${mounthlyPremium}\n\n▼ 10년시점 ▼\n· 환급률: ${tenYearReturnRate != null ? tenYearReturnRate + ' %' : '-'}\n· 확정이자: ${interestValue != null ? interestValue + ' 원' : '-'}\n· 예상해약환급금: ${refundValue != null ? refundValue + ' 원' : '-'}`
            : clientTemplateId === "UB_6018"
            // UB_6018 템플릿 (변액연금용 - 실적배당 포함)
            ? `▣ ${user.name}님 계산 결과입니다.\n\n⊙ 보험사: ${companyName}\n⊙ 상품명: ${productDisplayName}\n⊙ 납입기간 / 월보험료: ${paymentPeriod} / ${mounthlyPremium}\n⊙ 총 납입액: ${totalPaymentStr}\n⊙ 연금개시연령: ${pensionStartAgeNum || '-'}\n\n▼ 예상 연금 수령 ▼\n· 월 연금액: ${monthlyPensionNum ? monthlyPensionNum.toLocaleString() + ' 원' : '-'}\n· 실적배당 연금액: ${performancePension ? Number(performancePension).toLocaleString() + ' 원' : '-'}\n· 100세까지 총 수령액: ${totalUntil100Num ? totalUntil100Num.toLocaleString() + ' 원' : '-'}\n\n※ 위 금액은 예시이며, 실제 수령액은 가입 시 조건, 이율, 보험사 정책 및 운용 실적 등에 따라 달라질 수 있습니다.`
            // UB_5797 템플릿 (annuity)
            : `▣ ${user.name}님 계산 결과입니다.\n\n⊙ 보험사: ${companyName}\n⊙ 상품명: ${productDisplayName}\n⊙ 납입기간 / 월보험료: ${paymentPeriod} / ${mounthlyPremium}\n⊙ 총 납입액: ${totalPaymentStr}\n⊙ 연금개시연령: ${pensionStartAgeNum ? pensionStartAgeNum + ' 세' : '-'}\n\n▼ 예상 연금 수령 ▼\n· 월 연금액: ${monthlyPensionNum ? monthlyPensionNum.toLocaleString() + ' 원' : '-'}\n· 20년 보증기간 총액: ${guaranteedPensionNum ? guaranteedPensionNum.toLocaleString() + ' 원' : '-'}\n· 100세까지 총 수령액: ${totalUntil100Num ? totalUntil100Num.toLocaleString() + ' 원' : '-'}\n\n※ 위 금액은 예시이며, 실제 수령액은 가입 시 조건, 이율, 보험사 정책 등에 따라 달라질 수 있습니다.`
          : `▼ ${user.name}님\n\n▣ 보험종류: [ ${productDisplayName} ]\n▣ 상담시간: [ ${counselTime} ]\n\n상담 신청해 주셔서 감사합니다!`,
        // 템플릿 변수 매핑 (알리고 var1~) — 템플릿 승인된 변수 순서에 맞게 전달
        var1: user.name,                       // 고객명
        var2: companyName,                     // 회사명
        var3: productDisplayName,              // 상품명
        var4: String(paymentPeriod || ''),     // 납입기간
        var5: String(mounthlyPremium || ''),   // 월보험료
        // annuity용 변수들
        var6: totalPaymentStr,                 // 총납입액 (단위 포함: ' 원')
        var7: pensionStartAgeNum ? `${pensionStartAgeNum} 세` : '-', // 연금개시연령 (단위 포함)
        var8: monthlyPensionNum ? `${monthlyPensionNum.toLocaleString()} 원` : '-', // 월 연금액 (단위 포함)
        var9: guaranteedPensionNum ? `${guaranteedPensionNum.toLocaleString()} 원` : '-', // 보증기간총액 (단위 포함)
        var10: totalUntil100Num ? `${totalUntil100Num.toLocaleString()} 원` : '-', // 총수령액 (단위 포함)
        // whole-life용 변수들
        var11: tenYearReturnRate != null ? `${tenYearReturnRate} %` : '-', // 환급률 (단위 포함)
        var12: interestValue != null ? `${interestValue} 원` : '-',       // 확정이자 (단위 포함)
        var13: refundValue != null ? `${refundValue} 원` : '-',           // 해약환급금 (단위 포함)
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
      sendPromises.push(alimtalkSend(toClientReq, authForSend));
      const results = await Promise.all(sendPromises);
      console.log("알림톡 전송 결과(병렬):", results);
      const nonNull = results.filter((r: any) => !!r);
      const anyFail = nonNull.some((r: any) => typeof r?.code !== 'number' || r.code !== 0);
      if (anyFail) {
        console.error('[ALIMTALK] 일부/전체 전송 실패:', nonNull);
        return NextResponse.json({ error: "알림톡 전송 실패" }, { status: 502 });
      }
    } catch (err) {
      console.error("알림톡 전송 실패(병렬):", err);
      return NextResponse.json({ error: "알림톡 전송 실패" }, { status: 502 });
    }
  }

  return NextResponse.json({ success: true, userId: user.id });
}
