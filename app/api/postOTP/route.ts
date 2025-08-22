import { NextResponse } from "next/server";
import { supabase } from "../supabase";
import { alimtalkSend } from "@/app/lib/aligo";
import aligoAuth from "../utils/aligoAuth";
import { getCachedAligoToken } from "@/app/lib/aligoTokenCache";
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

    // 1) 먼저 DB에 OTP 저장 (필수)
    const { error: dbErr } = await supabase.from("otp").insert({ phone, code });
    if (dbErr) {
      logger.error('POST_OTP', 'DB 저장 실패', dbErr);
      return NextResponse.json({ error: "DB 저장 실패" }, { status: 500 });
    }

    // 2) 알림톡 전송은 백그라운드 처리
    //    - 토큰은 비차단으로 갱신 시도하되, 150ms 내 도착한 경우만 사용
    const tokenPromise = getCachedAligoToken(aligoAuth).catch(() => undefined)
    const tokenOrUndefined = await Promise.race<undefined | string>([
      tokenPromise,
      new Promise<undefined>((resolve) => setTimeout(() => resolve(undefined), 150)),
    ])
    const authWithToken = tokenOrUndefined ? { ...aligoAuth, token: tokenOrUndefined } : aligoAuth
    const sendPromise = alimtalkSend(requestData, authWithToken)
      .then((result) => {
        logger.debug('POST_OTP', 'Aligo API 응답', result);
        if (result?.code === -99) {
          logger.error('POST_OTP', 'IP 인증 에러', result.message);
        } else if (result?.code !== 0) {
          logger.error('POST_OTP', 'Aligo API 에러', result.message);
        }
      })
      .catch((err: any) => {
        logger.error('POST_OTP', 'Aligo 호출 예외(백그라운드)', err.response?.data || err.message);
      });

    // 2-a) 소프트 타임아웃(최대 800ms) 동안만 대기 후 즉시 성공 응답
    const softTimeoutMs = 800;
    await Promise.race([
      sendPromise,
      new Promise((resolve) => setTimeout(resolve, softTimeoutMs))
    ]);

    const endTime = Date.now();
    logger.info('POST_OTP', `즉시 응답 처리 시간: ${endTime - startTime}ms`, '요청 수락');
    return NextResponse.json({ success: true, queued: true });
  } catch (err: any) {
    console.error(`[POST OTP] 전체 처리 에러:`, err);
    console.error(`[POST OTP] 에러 상세:`, err.response?.data || err.message);
    return NextResponse.json({ error: "알림톡 전송 실패" }, { status: 502 });
  }
}
