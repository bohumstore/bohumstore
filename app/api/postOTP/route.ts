import { NextResponse } from "next/server";
import { supabase } from "../supabase";
import { alimtalkSend } from "@/app/lib/aligo";
import aligoAuth from "../utils/aligoAuth";

export async function POST(req: Request) {
  const { phone, templateId } = await req.json();
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  const { error: dbErr } = await supabase
    .from("otp")
    .insert({ phone, code });
  if (dbErr) {
    console.error(dbErr);
    return NextResponse.json({ error: "DB 저장 실패" }, { status: 500 });
  }

  try {
    const requestData = {
      headers: {
        "content-type": "application/json",
      },
      body: {
        tpl_code:    templateId,   // ex) "UA_7754"
        sender:      "010-8897-7486",   // ex) "021112222"
        receiver_1:  phone,                              // 수신자
        subject_1:   "인증번호 발송",                     // 알림톡 제목
        message_1:   `인증번호 [${code}]를 입력해주세요.`, // 본문
        testMode:    "Y",                                 // 테스트 모드
      },
    };

    const result = await alimtalkSend(requestData, aligoAuth);
  } catch (err: any) {
    console.error("알림톡 전송 에러:", err);
    return NextResponse.json({ error: "알림톡 전송 실패" }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
