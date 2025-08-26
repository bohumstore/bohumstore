import { NextResponse } from "next/server";
import { supabase } from "../supabase";
import { smsSend } from "@/app/lib/aligo";
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
    logger.debug('POST_OTP', '코드 생성', { code, phone });
    
    logger.debug('POST_OTP', 'SMS API 호출 준비');
    const requestData = {
      headers: { "content-type": "application/json" },
      body: {
        key: aligoAuth.apikey,
        userid: aligoAuth.userid,
        sender: "1533-3776",
        receiver: phone,
        msg: `[보험스토어] 본인 확인\n인증번호[${code}]를 입력해주세요.`,
        testmode_yn: "N",
      },
    };

    // 1) 먼저 DB에 OTP 저장 (필수)
    const { error: dbErr } = await supabase.from("otp").insert({ phone, code });
    if (dbErr) {
      logger.error('POST_OTP', 'DB 저장 실패', dbErr);
      return NextResponse.json({ error: "DB 저장 실패" }, { status: 500 });
    }

    // 2) SMS 전송은 백그라운드 처리
    const sendPromise = smsSend(requestData, aligoAuth)
      .then((result) => {
        logger.debug('POST_OTP', 'SMS API 응답', result);
        if (result?.code === -99) {
          logger.error('POST_OTP', 'IP 인증 에러', result.message);
        } else if (result?.code !== 0) {
          logger.error('POST_OTP', 'SMS API 에러', result.message);
        }
      })
      .catch((err: any) => {
        logger.error('POST_OTP', 'SMS 호출 예외(백그라운드)', err.response?.data || err.message);
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
    return NextResponse.json({ error: "SMS 전송 실패" }, { status: 502 });
  }
}
