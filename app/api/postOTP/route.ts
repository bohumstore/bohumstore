import { NextResponse } from "next/server";
import { supabase } from "../supabase";
import { alimtalkSend } from "@/app/lib/aligo";
import aligoAuth from "../utils/aligoAuth";
import logger from "@/app/lib/logger";

export async function POST(req: Request) {
  const startTime = Date.now();
  logger.info('POST_OTP', '요청 시작');
  
  try {
    // 환경 변수 확인
    logger.debug('POST_OTP', '환경 변수 확인', {
      apiKey: !!process.env.NEXT_PUBLIC_ALIGO_API_KEY,
      userId: !!process.env.NEXT_PUBLIC_ALIGO_USER_ID,
      senderKey: !!process.env.NEXT_PUBLIC_ALIGO_SENDER_KEY,
    });
    
    const { phone, templateId, companyName, productName } = await req.json();
    logger.debug('POST_OTP', '요청 데이터', { phone, templateId, companyName, productName });
    
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    logger.debug('POST_OTP', '코드 생성', { code, phone, templateId });
    
    logger.debug('POST_OTP', 'Aligo API 호출 준비');
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

    try {
      // DB 저장과 알림톡 전송을 병렬로 처리하여 총 지연시간 단축
      const insertPromise = supabase.from("otp").insert({ phone, code });
      const sendPromise = alimtalkSend(requestData, aligoAuth);
      const [{ error: dbErr }, result] = await Promise.all([insertPromise, sendPromise]);

      logger.debug('POST_OTP', 'Aligo API 응답', result);
      if (dbErr) {
        logger.error('POST_OTP', 'DB 저장 실패', dbErr);
        return NextResponse.json({ error: "DB 저장 실패" }, { status: 500 });
      }
      const endTime = Date.now();
      logger.info('POST_OTP', `전체 처리 시간: ${endTime - startTime}ms`, '요청 완료');

      // Aligo API 응답 확인
      if (result.code === -99) {
        logger.error('POST_OTP', 'IP 인증 에러', result.message);
        return NextResponse.json({ error: "IP 인증이 필요합니다. 관리자에게 문의하세요." }, { status: 403 });
      } else if (result.code !== 0) { // 0이 성공 코드
        logger.error('POST_OTP', 'Aligo API 에러', result.message);
        return NextResponse.json({ error: `알림톡 전송 실패: ${result.message}` }, { status: 502 });
      }

      return NextResponse.json({ success: true });
    } catch (err: any) {
      // 타임아웃(ECONNABORTED) 등 네트워크 지연은 '전송 요청됨'으로 처리하여 사용자에게 실패로 보이지 않게 함
      const isTimeout = err?.code === 'ECONNABORTED' || /timeout/i.test(err?.message || '');
      if (isTimeout) {
        console.warn(`[POST OTP] Aligo 응답 지연(타임아웃 추정). 전송 요청으로 처리합니다.`);
        return NextResponse.json({ success: true, queued: true });
      }
      console.error(`[POST OTP] Aligo 호출 예외:`, err.response?.data || err.message);
      return NextResponse.json({ error: "알림톡 전송 실패" }, { status: 502 });
    }
  } catch (err: any) {
    console.error(`[POST OTP] 전체 처리 에러:`, err);
    console.error(`[POST OTP] 에러 상세:`, err.response?.data || err.message);
    return NextResponse.json({ error: "알림톡 전송 실패" }, { status: 502 });
  }
}
