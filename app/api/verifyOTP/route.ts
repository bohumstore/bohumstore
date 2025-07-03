import { NextResponse } from "next/server";
import { supabase } from "../supabase";
import { alimtalkSend } from "@/app/lib/aligo";
import aligoAuth from "../utils/aligoAuth";

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
  } = await req.json();

  const { data, error } = await supabase
    .from("otp")
    .select("code, created_at")
    .eq("phone", phone)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  console.log("인증번호", data)

  console.log("인증번호 확인 요청:", { phone, code });

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
    .select("id")
    .eq("phone", phone)
    .single();

  let user = existingUser;
  if (!user) {
    const { data: newUser, error: insertErr } = await supabase
      .from("user")
      .insert({ phone, name, birth, gender })
      .select("id")
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

  /* 현재 알림톡 허용아이피 추가가 필요한 상황이므로 수정 필요 */
  let requestData;
  if (counselType === 1) {
    const { data: counselData, error: calcErr } = await supabase
      .from("counsel")
      .insert({
        user_id:         user.id,
        company_id:      companyId,
        product_id:      productId,
        counsel_type_id: 1,
      })
      .select(`
        id,
        company:company_id (
          name
        ),
        product:product_id (
          name,
          category:category_id (
            name
          )
        )
      `)
      .single();

    if (calcErr || !counselData) {
      console.error(calcErr);
      return NextResponse.json({ error: "보험료 계산 요청 중 오류가 발생했습니다." }, { status: 500 });
    }

    // requestData = {
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: {
    //     tpl_code:    "UA_8331",   // ex) "UA_7754"
    //     sender:      "010-8897-7486",   // ex) "021112222"
    //     receiver_1:  phone,                              // 수신자
    //     subject_1:   "계산디비 - 관리자전송",
    //     message_1:   `
    //     [보험료계산]
    //     ${counselData.company.name}
    //     ${counselData.product.category.name}
    //     ${user.birth}
    //     ${user.gender}
    //     ${user.phone}
    //     `, // 본문
    //     testMode: "Y",
    //   },
    // };
  }
  if (counselType === 2) {
    const { data: counselData, error: calcErr } = await supabase
      .from("counsel")
      .insert({
        user_id:         user.id,
        company_id:      companyId,
        product_id:      productId,
        counsel_type_id: 1,
      })
      .select(`
        id,
        company:company_id (
          name
        ),
        product:product_id (
          name,
          category:category_id (
            name
          )
        )
      `)
      .single();

    if (calcErr || !counselData) {
      console.error(calcErr);
      return NextResponse.json({ error: "상담 신청 요청 중 오류가 발생했습니다." }, { status: 500 });
    }

    // requestData = {
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: {
    //     tpl_code:    "UA_8332",
    //     sender:      "010-8897-7486",
    //     receiver_1:  phone,
    //     subject_1:   "계산디비 - 관리자전송",
    //     message_1:   `
    //     [상담/설계요청]
    //     ${counselData.product.category.name}
    //     ${user.birth}
    //     ${user.name}
    //     ${user.gender}
    //     ${user.phone}
    //     `, // 본문
    //     testMode: "Y",
    //   },
    // };
  }

  const result = await alimtalkSend(requestData, aligoAuth);

  return NextResponse.json({ success: true, userId: user.id });
}
