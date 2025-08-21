import { NextResponse } from "next/server";
import { supabase } from "../supabase";
import { alimtalkSend } from "@/app/lib/aligo";
import aligoAuth from "../utils/aligoAuth";

export async function POST(req: Request) {
  const startTime = Date.now();
  console.log(`[POST OTP] 요청 시작: ${new Date().toISOString()}`);
  
  try {
    // 환경 변수 확인
    console.log(`[POST OTP] 환경 변수 확인:`);
    console.log(`- API_KEY: ${process.env.NEXT_PUBLIC_ALIGO_API_KEY ? '설정됨' : '설정되지 않음'}`);
    console.log(`- USER_ID: ${process.env.NEXT_PUBLIC_ALIGO_USER_ID ? '설정됨' : '설정되지 않음'}`);
    console.log(`- SENDER_KEY: ${process.env.NEXT_PUBLIC_ALIGO_SENDER_KEY ? '설정됨' : '설정되지 않음'}`);
    
    const { phone, templateId, companyName, productName } = await req.json();
    console.log(`[POST OTP] 요청 데이터:`, { phone, templateId, companyName, productName });
    
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`[POST OTP] 인증번호 생성: ${code}`);
    console.log(`[POST OTP] 전화번호: ${phone}`);
    console.log(`[POST OTP] 템플릿 ID: ${templateId}`);
    
    const dbStartTime = Date.now();
    const { error: dbErr } = await supabase
      .from("otp")
      .insert({ phone, code });
    const dbEndTime = Date.now();
    console.log(`[POST OTP] DB 저장 시간: ${dbEndTime - dbStartTime}ms`);
    if (dbErr) {
      console.error(`[POST OTP] DB 저장 실패:`, dbErr);
      return NextResponse.json({ error: "DB 저장 실패" }, { status: 500 });
    }
    console.log(`[POST OTP] DB 저장 성공`);

    console.log(`[POST OTP] Aligo API 호출 시작`);
    const requestData = {
      headers: {
        "content-type": "application/json",
      },
      body: {
        tpl_code:    templateId,   // ex) "UA_7754"
        sender:      "010-8897-7486",   // ex) "021112222"
        receiver_1:  phone,                              // 수신자
        subject_1:   "[보험스토어] 본인 확인",                     // 알림톡 제목
        message_1:   `[보험스토어] 본인 확인\n인증번호[${code}]를 입력해주세요.`, // 본문
        testMode:    "N",                                 // 실제 전송 모드로 변경
        // 템플릿 변수 추가
        var1: companyName || "보험사",  // 보험사명
        var2: productName || "상품",    // 상품명
      },
    };

    const result = await alimtalkSend(requestData, aligoAuth);
    console.log(`[POST OTP] Aligo API 응답:`, result);
    const endTime = Date.now();
    console.log(`[POST OTP] 전체 처리 시간: ${endTime - startTime}ms`);
    console.log(`[POST OTP] 요청 완료: ${new Date().toISOString()}`);
    
    // Aligo API 응답 확인
    if (result.code === -99) {
      console.error(`[POST OTP] IP 인증 에러: ${result.message}`);
      return NextResponse.json({ error: "IP 인증이 필요합니다. 관리자에게 문의하세요." }, { status: 403 });
    } else if (result.code !== 0) { // 0이 성공 코드
      console.error(`[POST OTP] Aligo API 에러: ${result.message}`);
      return NextResponse.json({ error: `알림톡 전송 실패: ${result.message}` }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error(`[POST OTP] 전체 처리 에러:`, err);
    console.error(`[POST OTP] 에러 상세:`, err.response?.data || err.message);
    return NextResponse.json({ error: "알림톡 전송 실패" }, { status: 502 });
  }
}
