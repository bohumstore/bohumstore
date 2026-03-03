import { NextResponse } from 'next/server';
import { supabase } from '../supabase';
import { alimtalkSend, smsSend } from '@/lib/aligo';
import aligoAuth from '../utils/aligoAuth';
import { getCachedAligoToken } from '@/lib/aligoTokenCache';

export async function POST(req: Request) {
  const requestBody = await req.json();
  console.log('[API] 받은 요청 데이터:', requestBody);

  const {
    phone,
    name,
    birth,
    gender,
    code,
    counselType,
    companyId,
    productId,
    consultType,
    counselTime,
    mounthlyPremium = null,
    paymentPeriod = null,
    tenYearReturnRate = null,
    interestValue = null,
    refundValue = null,
    monthlyPension = null,
    guaranteedPension = null,
    templateId = null,
    adminTemplateId = null,
    onlyClient = false,
  } = requestBody;

  // 고객용만 발송(후속 알림)인 경우: OTP 검증을 건너뛰고 바로 전송
  if (onlyClient) {
    try {
      // 상품/회사명 조회
      const [productRes] = await Promise.all([
        supabase.from('product').select('name').eq('id', productId).single(),
      ]);
      const productName = productRes.data?.name || '';

      // 토큰(가능 시) 부여
      let authForSend = aligoAuth as any;
      try {
        const token = await getCachedAligoToken(aligoAuth);
        if (token) authForSend = { ...aligoAuth, token };
      } catch {}

      const genderKor = gender === 'M' ? '남' : gender === 'F' ? '여' : gender;
      const toClientReq = {
        headers: { 'content-type': 'application/json' },
        body: {
          tpl_code: templateId || 'UB_8715',
          sender: '010-8897-7486',
          receiver_1: phone,
          subject_1: '상담/설계요청 - 고객전송',
          message_1: `고객명: ${name}
성별: ${genderKor}
생년월일: ${birth}

[상담신청 정보]
보험종류: ${productName}
희망 상담시간: ${counselTime}

(미소) 상담 신청해 주셔서 감사합니다.
담당자가 확인 후 연락드리겠습니다.`,
          button_1: { button: [{ name: '채널 추가', linkType: 'AC' }] },
          testMode: 'N',
          // UB_8715 var order: 고객명, 성별, 생년월일, 보험종류, 상담시간
          var1: name,
          var2: genderKor || '',
          var3: String(birth || ''),
          var4: productName,
          var5: String(counselTime || ''),
        },
      };

      const result = await alimtalkSend(toClientReq, authForSend);
      if (!result || typeof result.code !== 'number' || result.code !== 0) {
        return NextResponse.json({ error: '알림톡 전송 실패', detail: result }, { status: 502 });
      }
      return NextResponse.json({ success: true });
    } catch (err: any) {
      return NextResponse.json(
        { error: '알림톡 전송 실패', detail: err?.response?.data || err?.message },
        { status: 502 }
      );
    }
  }

  const { data, error } = await supabase
    .from('otp')
    .select('code, created_at')
    .eq('phone', phone)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: '인증정보를 찾을 수 없습니다.' }, { status: 404 });
  }

  const age = Date.now() - new Date(data.created_at).getTime();
  if (data.code !== code || age > 5 * 60 * 1000) {
    return NextResponse.json({ error: '인증번호가 틀리거나 만료되었습니다.' }, { status: 400 });
  }

  const { data: existingUser } = await supabase
    .from('user')
    .select('id, phone, name, birth, gender')
    .eq('phone', phone)
    .single();

  let user = existingUser;
  if (!user) {
    const { data: newUser, error: insertErr } = await supabase
      .from('user')
      .insert({ phone, name, birth, gender })
      .select('id, phone, name, birth, gender')
      .single();
    if (insertErr) {
      console.error(insertErr);
      return NextResponse.json({ error: '사용자 생성 중 오류가 발생했습니다.' }, { status: 500 });
    }
    user = newUser;
  }
  // 입력 값이 DB와 다르면 최신 정보로 갱신
  try {
    const shouldUpdate =
      (!!name && name !== user.name) ||
      (!!birth && birth !== user.birth) ||
      (!!gender && gender !== user.gender);
    if (shouldUpdate) {
      await supabase
        .from('user')
        .update({
          name: name || user.name,
          birth: birth || user.birth,
          gender: gender || user.gender,
        })
        .eq('id', user.id);
      // 메모리 상 user도 최신화
      user = {
        ...user,
        name: name || user.name,
        birth: birth || user.birth,
        gender: gender || user.gender,
      } as any;
    }
  } catch (e) {
    console.warn('[USER] 정보 갱신 실패(무시):', e);
  }

  const ensuredUser = user!;

  // companyId/productId가 없으면(상담 신청) consultType 사용, 있으면 DB 조회
  let productDisplayName = '';
  let companyName = '';

  if (companyId && productId) {
    // 특정 상품 가입: DB에서 조회
    const [productResult, companyResult] = await Promise.all([
      supabase.from('product').select('name').eq('id', productId).single(),
      supabase.from('company').select('name').eq('id', companyId).single(),
    ]);

    const { data: product, error: productErr } = productResult;

    if (productErr || !product) {
      console.error('상품 조회 실패', productErr);
      throw new Error('상품 조회 실패');
    }
    console.log('[DEBUG] product:', product);

    const { data: company, error: companyErr } = companyResult;

    if (companyErr || !company) {
      console.error('회사 조회 실패', companyErr);
      throw new Error('회사 조회 실패');
    }
    console.log('[DEBUG] company:', company);

    productDisplayName = product.name;
    companyName = company.name;
  } else {
    // 상담 신청: consultType 직접 사용
    productDisplayName = consultType || '상담 신청';
    companyName = '';
    console.log('[DEBUG] 상담 신청이므로 consultType 사용:', productDisplayName);
  }

  // Aligo 토큰(가능 시) 획득 후 인증 정보 구성
  let authForSend = aligoAuth as any;
  try {
    const token = await getCachedAligoToken(aligoAuth);
    if (token) authForSend = { ...aligoAuth, token };
  } catch {
    // 토큰 획득 실패 시 기본 키로 전송 계속
  }

  if (counselType === 1 || counselType === 2) {
    console.log('[DEBUG] counselType:', counselType);
    console.log('[DEBUG] user:', user);
    console.log('[DEBUG] templateId:', templateId);
    console.log('[DEBUG] adminTemplateId:', adminTemplateId);
    const tplCode = adminTemplateId || (counselType === 1 ? 'UA_8331' : 'UA_8332');
    const subject = counselType === 1 ? '보험료계산 - 관리자전송' : '상담/설계요청 - 관리자전송';

    // 중복 신청 확인
    const { data: existingCounsel } = await supabase
      .from('counsel')
      .select('created_at')
      .eq('user_id', ensuredUser.id)
      .eq('counsel_type_id', counselType)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    const { error: calcErr } = await supabase
      .from('counsel')
      .insert({
        user_id: ensuredUser.id,
        company_id: companyId || null,
        product_id: productId || null,
        counsel_type_id: counselType,
        counsel_time: counselTime,
      })
      .single();

    if (calcErr) {
      console.error('[DEBUG] DB insert error:', calcErr);
      return NextResponse.json({ error: '상담 요청 중 오류' }, { status: 500 });
    }
    console.log('[DEBUG] DB insert success');

    // 표시용 값: 입력값 우선, 없으면 DB 값 사용
    const displayName = name || ensuredUser.name;
    const displayBirth = birth || ensuredUser.birth || '';
    const displayGenderKor = gender
      ? gender === 'M'
        ? '남'
        : gender === 'F'
          ? '여'
          : gender
      : ensuredUser.gender === 'M'
        ? '남'
        : ensuredUser.gender === 'F'
          ? '여'
          : ensuredUser.gender;

    // 중복 표시를 위한 날짜 정보
    let duplicateLabel = '';
    if (existingCounsel) {
      const lastDate = new Date(existingCounsel.created_at);
      const month = String(lastDate.getMonth() + 1).padStart(2, '0');
      const day = String(lastDate.getDate()).padStart(2, '0');
      duplicateLabel = `[${month}-${day} 중복]`;
      console.log('[DEBUG] 중복 신청 감지:', duplicateLabel);

      // 중복 신청 시 SMS 알림 발송
      try {
        const duplicateSmsReq = {
          headers: { 'content-type': 'application/json' },
          body: {
            key: authForSend.apikey,
            userid: authForSend.userid,
            sender: '010-8897-7486',
            receiver: '010-8897-7486',
            msg:
              counselType === 1
                ? `🔄 중복신청 알림\n[보험료계산] ${duplicateLabel}\n${name}(${phone})\n${companyName ? companyName + ' ' : ''}${productDisplayName}`
                : `🔄 중복신청 알림\n[상담신청] ${duplicateLabel}\n${name}(${phone})\n${counselTime}\n${companyName ? companyName + ' ' : ''}${productDisplayName}`,
            testmode_yn: 'N',
          },
        };
        console.log('[DEBUG] 중복 SMS 발송 요청:', duplicateSmsReq.body);

        // SMS는 비동기로 발송 (실패해도 메인 로직에 영향 없음)
        smsSend(duplicateSmsReq, authForSend)
          .then((result) => {
            console.log('[DEBUG] 중복 SMS 발송 성공:', result);
          })
          .catch((err) => {
            console.error('[DEBUG] 중복 SMS 발송 실패:', err);
          });
      } catch (smsErr) {
        console.error('[DEBUG] 중복 SMS 발송 오류:', smsErr);
      }
    }

    // 관리자/고객 발송을 병렬 처리하여 전체 대기시간을 단축
    const adminSendPromise = ((): Promise<any> | null => {
      if (onlyClient) return null;
      const toAdminReq = {
        headers: { 'content-type': 'application/json' },
        body: {
          tpl_code: tplCode,
          sender: '010-8897-7486',
          receiver_1: '010-8897-7486',
          subject_1: subject,
          message_1:
            counselType === 1
              ? `[보험료계산]\n${companyName ? companyName + '\n' : ''}${productDisplayName}\n${displayBirth}\n${displayName}\n${displayGenderKor}\n${phone}`
              : `[상담/설계요청]\n${counselTime}\n${productDisplayName}\n${displayBirth}\n${displayName}\n${displayGenderKor}\n${phone}`,
          testMode: 'N',
        },
      };
      console.log('[DEBUG] 관리자 알림톡 요청 데이터:', toAdminReq.body);
      return alimtalkSend(toAdminReq, authForSend);
    })();

    // 고객용 템플릿 ID 결정 (counselType: 1일 때도 클라이언트 지정 템플릿 우선 적용)
    let clientTemplateId;
    if (counselType === 1) {
      if (templateId) {
        clientTemplateId = templateId;
        console.log('[DEBUG] 클라이언트 지정 템플릿 사용:', clientTemplateId);
      } else if (productId === 5) {
        clientTemplateId = 'UB_8712';
        console.log('[DEBUG] 신한라이프 모아더드림Plus종신보험이므로 UB_8712 템플릿 사용');
      } else {
        clientTemplateId = 'UB_8705';
        console.log('[DEBUG] 기본 템플릿 UB_8705 사용');
      }
    } else {
      clientTemplateId = templateId || 'UB_8715'; // 상담신청용 템플릿
      console.log('[DEBUG] counselType이 2이므로 상담신청용 템플릿 사용:', clientTemplateId);
    }
    console.log('[DEBUG] 최종 고객용 템플릿 ID:', clientTemplateId);
    console.log('[DEBUG] 클라이언트에서 전송한 templateId:', templateId);
    console.log('[DEBUG] counselType:', counselType);
    // 숫자 가공: 전달되지 않으면 안전한 기본/계산값으로 대체
    const monthlyPensionNum =
      typeof monthlyPension === 'number'
        ? monthlyPension
        : parseInt(String(monthlyPension || '0').replace(/[^0-9]/g, '')) || 0;
    const pensionStartAgeNum = (() => {
      const v =
        typeof (requestBody as any).pensionStartAge === 'number'
          ? (requestBody as any).pensionStartAge
          : parseInt(String((requestBody as any).pensionStartAge || '0').replace(/[^0-9]/g, '')) ||
            0;
      return v;
    })();
    const guaranteedPensionNum = (() => {
      const raw =
        typeof guaranteedPension === 'number'
          ? guaranteedPension
          : parseInt(String(guaranteedPension || '0').replace(/[^0-9]/g, ''));
      if (!isNaN(raw) && raw > 0) return raw;
      return monthlyPensionNum > 0 ? monthlyPensionNum * 12 * 20 : 0; // 기본 20년 보증 총액
    })();
    const totalUntil100Num = (() => {
      const raw =
        typeof (requestBody as any).totalUntil100 === 'number'
          ? (requestBody as any).totalUntil100
          : parseInt(String((requestBody as any).totalUntil100 || '0').replace(/[^0-9]/g, ''));
      if (!isNaN(raw) && raw > 0) return raw;
      if (monthlyPensionNum > 0 && pensionStartAgeNum > 0)
        return monthlyPensionNum * 12 * Math.max(0, 100 - pensionStartAgeNum);
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
      headers: { 'content-type': 'application/json' },
      body: (() => {
        const base: any = {
          tpl_code: clientTemplateId,
          sender: '010-8897-7486',
          receiver_1: phone,
          subject_1: subject,
          message_1: (() => {
            if (counselType === 2 || clientTemplateId === 'UB_8715') {
              return `고객명: ${displayName}
성별: ${displayGenderKor}
생년월일: ${displayBirth}

[상담신청 정보]
보험종류: ${productDisplayName}
희망 상담시간: ${counselTime}

(미소) 상담 신청해 주셔서 감사합니다.
담당자가 확인 후 연락드리겠습니다.


`;
            }
            if (clientTemplateId === 'UB_8712') {
              return `고객명: ${displayName}
성별: ${displayGenderKor}
생년월일: ${displayBirth}

[보험정보]
보험사: ${companyName}
상품명: ${productDisplayName}
납입기간: ${paymentPeriod}
월보험료: ${mounthlyPremium}

[10년 시점] (돈)
예상 환급률: ${tenYearReturnRate != null ? tenYearReturnRate + ' %' : '-'}
예상 확정이자: ${interestValue != null ? (String(interestValue).includes('$') ? String(interestValue) : interestValue + ' 원') : '-'}
예상 해약환급금: ${refundValue != null ? (String(refundValue).includes('$') ? String(refundValue) : `${refundValue} 원`) : '-'}


`;
            }
            // UB_8705
            return `고객명: ${displayName}
성별: ${displayGenderKor}
생년월일: ${displayBirth}

[보험정보]
보험사: ${companyName}
상품명: ${productDisplayName}
납입기간 / 월보험료: ${paymentPeriod} / ${mounthlyPremium}
총 납입액: ${totalPaymentStr}
연금개시연령: ${pensionStartAgeNum ? pensionStartAgeNum + ' 세' : '-'}

[예상 연금 수령액] (돈)
월 연금액: ${monthlyPensionNum ? `${monthlyPensionNum.toLocaleString()} 원` : '-'}
20년 보증기간 총액: ${guaranteedPensionNum ? `${guaranteedPensionNum.toLocaleString()} 원` : '-'}
100세까지 총 수령액: ${totalUntil100Num ? `${totalUntil100Num.toLocaleString()} 원` : '-'}


`;
          })(),
          button_1: { button: [{ name: '채널 추가', linkType: 'AC' }] },
          testMode: 'N',
        };
        // Template-specific var order mapping
        if (clientTemplateId === 'UB_8705') {
          // UB_8705 order: 고객명, 성별, 생년월일, 회사명, 상품명, 납입기간, 월보험료, 총납입액, 연금개시연령, 월연금액, 보증기간총액, 총수령액
          base.var1 = displayName;
          base.var2 = displayGenderKor || '';
          base.var3 = String(displayBirth || '');
          base.var4 = companyName;
          base.var5 = productDisplayName;
          base.var6 = String(paymentPeriod || '');
          base.var7 = String(mounthlyPremium || '');
          base.var8 = totalPaymentStr;
          base.var9 = pensionStartAgeNum ? `${pensionStartAgeNum} 세` : '-';
          base.var10 = monthlyPensionNum ? `${monthlyPensionNum.toLocaleString()} 원` : '-';
          base.var11 = guaranteedPensionNum ? `${guaranteedPensionNum.toLocaleString()} 원` : '-';
          base.var12 = totalUntil100Num ? `${totalUntil100Num.toLocaleString()} 원` : '-';
        } else if (clientTemplateId === 'UB_8712') {
          // UB_8712 order: 고객명, 성별, 생년월일, 회사명, 상품명, 납입기간, 월보험료, 환급률, 확정이자, 해약환급금
          base.var1 = displayName;
          base.var2 = displayGenderKor || '';
          base.var3 = String(displayBirth || '');
          base.var4 = companyName;
          base.var5 = productDisplayName;
          base.var6 = String(paymentPeriod || '');
          base.var7 = String(mounthlyPremium || '');
          base.var8 = tenYearReturnRate != null ? `${tenYearReturnRate} %` : '-';
          // 달러($) 포함된 값은 이미 완성된 형태이므로 " 원" 추가 안함
          base.var9 =
            interestValue != null
              ? String(interestValue).includes('$')
                ? String(interestValue)
                : `${interestValue} 원`
              : '-';
          base.var10 =
            refundValue != null
              ? String(refundValue).includes('$')
                ? String(refundValue)
                : `${refundValue} 원`
              : '-';
        } else if (clientTemplateId === 'UB_8715') {
          // UB_8715 order: 고객명, 성별, 생년월일, 보험종류, 상담시간
          base.var1 = displayName;
          base.var2 = displayGenderKor || '';
          base.var3 = String(displayBirth || '');
          base.var4 = productDisplayName;
          base.var5 = String(counselTime || '');
        }
        return base;
      })(),
    };

    console.log('[DEBUG] 고객용 알림톡 요청 데이터:', toClientReq.body);

    try {
      const clientSendPromise = alimtalkSend(toClientReq, authForSend);
      const promises: Promise<any>[] = [clientSendPromise];
      if (adminSendPromise) promises.push(adminSendPromise);
      const results = await Promise.all(promises);
      console.log('알림톡 전송 결과(병렬):', results);
      const clientResult = results[0];
      const clientOk =
        clientResult && typeof clientResult.code === 'number' && clientResult.code === 0;
      if (!clientOk) {
        console.error('[ALIMTALK] 고객 전송 실패:', clientResult);
        return NextResponse.json(
          { error: '알림톡 전송 실패', detail: clientResult },
          { status: 502 }
        );
      }
      // 관리자 실패는 서비스 흐름에 영향 주지 않음 (로깅만)
      const adminResult = results[1];
      if (adminResult && (typeof adminResult.code !== 'number' || adminResult.code !== 0)) {
        console.warn('[ALIMTALK] 관리자 전송 실패(무시):', adminResult);
      }
    } catch (err: any) {
      console.error('알림톡 전송 실패(병렬):', err);
      return NextResponse.json(
        { error: '알림톡 전송 실패', detail: err?.response?.data || err?.message },
        { status: 502 }
      );
    }
  }

  return NextResponse.json({ success: true, userId: ensuredUser.id });
}
