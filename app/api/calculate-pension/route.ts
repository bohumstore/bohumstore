import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';
import { mapGender } from '@/app/utils/genderMapping';

export async function POST(request: NextRequest) {
  try {
    console.log('[API] 연금액 계산 요청 시작');
    
    const { customerName, gender, age, paymentPeriod, monthlyPayment } = await request.json();
    console.log('[API] 요청 데이터:', { customerName, gender, age, paymentPeriod, monthlyPayment });

         // 입력값 검증
     if (!customerName || !gender || !age || !paymentPeriod || !monthlyPayment) {
       console.log('[API] 필수 입력값 누락:', { customerName, gender, age, paymentPeriod, monthlyPayment });
       return NextResponse.json(
         { error: '모든 필수 입력값이 필요합니다.' },
         { status: 400 }
       );
     }

     // 성별 매핑 (M -> 남, F -> 여)
     const mappedGender = mapGender(gender);

    // 월납입액에서 콤마 제거하고 정수로 변환
    const cleanMonthlyPayment = parseInt(monthlyPayment.toString().replace(/,/g, ''));
    
    // 시트 선택 로직
    let sheetName = '';
    if (cleanMonthlyPayment === 300000) {
      sheetName = '30k';
    } else if (cleanMonthlyPayment === 500000) {
      sheetName = '50k';
    } else if (cleanMonthlyPayment === 1000000) {
      sheetName = '100k';
    } else {
      return NextResponse.json(
        { error: '지원하지 않는 월납입액입니다. (30만원, 50만원, 100만원만 지원)' },
        { status: 400 }
      );
    }

    // 엑셀 파일 경로 (happy-plus 폴더에 있음)
    const excelFilePath = path.join(process.cwd(), 'app', 'insurance', 'annuity', 'kdb', 'happy-plus', 'kdb_plus_15-70.xlsx');
    console.log('[API] 엑셀 파일 경로:', excelFilePath);

    // 파일 존재 확인
    if (!fs.existsSync(excelFilePath)) {
      console.log('[API] 엑셀 파일이 존재하지 않음:', excelFilePath);
      return NextResponse.json(
        { error: '엑셀 파일을 찾을 수 없습니다.' },
        { status: 500 }
      );
    }
    console.log('[API] 엑셀 파일 존재 확인 완료');

        // 엑셀 파일 읽기
    console.log('[API] 엑셀 파일 읽기 시작');
    
    let workbook;
    try {
      // Buffer로 파일 읽기
      const fileBuffer = fs.readFileSync(excelFilePath);
      workbook = XLSX.read(fileBuffer, { type: 'buffer' });
      console.log('[API] 워크북 시트 목록 (Buffer 읽기):', Object.keys(workbook.Sheets));
    } catch (readError) {
      console.error('[API] Buffer 읽기 실패:', readError);
      
      try {
                 // 절대 경로로 재시도
         const absolutePath = path.resolve(process.cwd(), 'app', 'insurance', 'annuity', 'kdb', 'happy-plus', 'kdb_plus_15-70.xlsx');
        console.log('[API] 절대 경로로 재시도:', absolutePath);
        
        if (!fs.existsSync(absolutePath)) {
          console.error('[API] 절대 경로 파일도 존재하지 않음');
          return NextResponse.json(
            { error: '엑셀 파일을 찾을 수 없습니다.' },
            { status: 500 }
          );
        }
        
        const absoluteBuffer = fs.readFileSync(absolutePath);
        workbook = XLSX.read(absoluteBuffer, { type: 'buffer' });
        console.log('[API] 워크북 시트 목록 (절대 경로 Buffer):', Object.keys(workbook.Sheets));
      } catch (absoluteReadError) {
        console.error('[API] 절대 경로 Buffer 읽기도 실패:', absoluteReadError);
        return NextResponse.json(
          { error: '엑셀 파일을 읽을 수 없습니다.' },
          { status: 500 }
        );
      }
    }
    
    const worksheet = workbook.Sheets[sheetName];
    console.log('[API] 선택된 시트:', sheetName, '존재 여부:', !!worksheet);

    if (!worksheet) {
      console.log('[API] 시트를 찾을 수 없음:', sheetName);
      return NextResponse.json(
        { error: `시트 '${sheetName}'을 찾을 수 없습니다.` },
        { status: 500 }
      );
    }

    // 워크시트를 JSON으로 변환
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // 헤더 찾기
    const headerRow = jsonData[0] as string[];
    const genderIndex = headerRow.findIndex(h => h === '성별');
    const ageIndex = headerRow.findIndex(h => h === '가입연령');
    const periodIndex = headerRow.findIndex(h => h === '납입기간');
    const paymentIndex = headerRow.findIndex(h => h === '월납입액');
    const pensionStartAgeIndex = headerRow.findIndex(h => h === '연금개시연령');
    const monthlyPensionIndex = headerRow.findIndex(h => h === '월 연금액');
    const guaranteedAmountIndex = headerRow.findIndex(h => h === '20년 보증기간 총액');
    const totalUntil100Index = headerRow.findIndex(h => h === '100세까지 총 수령액');
    const noticeIndex = headerRow.findIndex(h => h === '안내');

    // 필수 컬럼 확인
    if (genderIndex === -1 || ageIndex === -1 || periodIndex === -1 || paymentIndex === -1) {
      return NextResponse.json(
        { error: '필수 컬럼을 찾을 수 없습니다.' },
        { status: 500 }
      );
    }

         // 데이터 행에서 일치하는 행 찾기
     console.log('[API] 데이터 매칭 시작');
     console.log('[API] 검색 조건:', { gender, age, paymentPeriod, cleanMonthlyPayment });
     
     // 헤더 정보 출력
     console.log('[API] 헤더 정보:', {
       genderIndex,
       ageIndex,
       periodIndex,
       paymentIndex,
       headerRow: headerRow.slice(0, 10) // 처음 10개 컬럼만
     });
     
     let matchedRow = null;
     for (let i = 1; i < jsonData.length; i++) {
       const row = jsonData[i] as any[];
       if (row.length <= Math.max(genderIndex, ageIndex, periodIndex, paymentIndex)) {
         continue;
       }

       const rowGender = row[genderIndex];
       const rowAge = parseInt(row[ageIndex]);
       const rowPeriod = parseInt(row[periodIndex]);
       const rowPayment = parseInt(row[paymentIndex]);

                // 첫 5개 행만 상세 로그 출력
         if (i <= 5) {
           console.log(`[API] 행 ${i} 상세:`, {
             rowGender,
             rowAge,
             rowPeriod,
             rowPayment,
             rowGenderType: typeof rowGender,
             genderType: typeof mappedGender,
             genderMatch: rowGender === mappedGender,
             ageMatch: rowAge === parseInt(age.toString()),
             periodMatch: rowPeriod === parseInt(paymentPeriod.toString().replace(/[^0-9]/g, '')),
             paymentMatch: rowPayment === cleanMonthlyPayment
           });
         }

       if (
         rowGender === mappedGender &&
         rowAge === parseInt(age.toString()) &&
         rowPeriod === parseInt(paymentPeriod.toString().replace(/[^0-9]/g, '')) &&
         rowPayment === cleanMonthlyPayment
       ) {
         console.log('[API] 매칭된 행 발견:', i);
         matchedRow = row;
         break;
       }
     }

    if (!matchedRow) {
      console.log('[API] 매칭된 행을 찾을 수 없음');
      return NextResponse.json(
        { error: '일치하는 데이터를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    
    console.log('[API] 매칭된 행 데이터:', matchedRow);

    // 결과 데이터 추출
    const pensionStartAge = matchedRow[pensionStartAgeIndex] || '';
    const monthlyPension = matchedRow[monthlyPensionIndex] || 0;
    const guaranteedAmount = matchedRow[guaranteedAmountIndex] || 0;
    const totalUntil100 = matchedRow[totalUntil100Index] || 0;
    const notice = matchedRow[noticeIndex] || '';

    // 숫자 포맷팅 (3자리 콤마 + 원)
    const formatCurrency = (value: number) => {
      return value.toLocaleString('ko-KR') + '원';
    };

    // 결과 메시지 생성
    let resultMessage = `${customerName}님의 연금액 계산 결과입니다.\n\n`;
    resultMessage += `연금개시연령: ${pensionStartAge}세\n`;
    resultMessage += `월 연금액: ${formatCurrency(monthlyPension)}\n`;
    resultMessage += `20년 보증기간 총액: ${formatCurrency(guaranteedAmount)}\n`;
    resultMessage += `100세까지 총 수령액: ${formatCurrency(totalUntil100)}`;

    // 안내 메시지가 있으면 추가
    if (notice) {
      resultMessage += `\n\n※ 안내: ${notice}`;
    }

    return NextResponse.json({
      success: true,
      data: {
        customerName,
        gender,
        age: parseInt(age.toString()),
        paymentPeriod: parseInt(paymentPeriod.toString().replace(/[^0-9]/g, '')),
        monthlyPayment: cleanMonthlyPayment,
        pensionStartAge,
        monthlyPension,
        guaranteedAmount,
        totalUntil100,
        notice,
        resultMessage
      }
    });

  } catch (error) {
    console.error('연금액 계산 API 오류:', error);
    console.error('오류 상세 정보:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace',
      name: error instanceof Error ? error.name : 'Unknown error type'
    });
    return NextResponse.json(
      { error: `연금액 계산 중 오류가 발생했습니다: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}
