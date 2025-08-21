import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';
import { mapGender } from '@/app/utils/genderMapping';

export async function POST(request: NextRequest) {
	try {
		console.log('[API] 연금액 계산 요청 시작');
		
		const { customerName, gender, age, paymentPeriod, monthlyPayment, productType, mode } = await request.json();
		console.log('[API] 요청 데이터:', { customerName, gender, age, paymentPeriod, monthlyPayment, productType, mode });

			// 입력값 검증
		if (mode === 'eligibility') {
			if (!gender || !age) {
				console.log('[API] 적격성 모드 필수 입력값 누락:', { gender, age });
				return NextResponse.json(
					{ error: '성별과 연령이 필요합니다.' },
					{ status: 400 }
				);
			}
		} else {
			if (!customerName || !gender || !age || !paymentPeriod || !monthlyPayment) {
				console.log('[API] 필수 입력값 누락:', { customerName, gender, age, paymentPeriod, monthlyPayment });
				return NextResponse.json(
					{ error: '모든 필수 입력값이 필요합니다.' },
					{ status: 400 }
				);
			}
		}

		 // 성별 매핑 (M -> 남, F -> 여)
		 const mappedGender = mapGender(gender);

		// 월납입액에서 콤마 제거하고 정수로 변환
		const cleanMonthlyPayment = parseInt(monthlyPayment.toString().replace(/,/g, ''));
		
		// 시트 선택 로직
		let sheetName = '';
		if (mode === 'eligibility') {
			// 적격성 확인은 30만원 시트를 기본으로 사용 (없으면 첫 시트로 대체)
			sheetName = '30k';
		} else {
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
		}

		// 제품 유형별 엑셀 파일 경로 결정 및 컬럼 헤더 매핑
		const resolvedProductType = (productType || 'happy-plus') as string;
		let candidatePaths: string[] = [];
		let monthlyPensionHeaderCandidates: string[] = [];
		let performancePensionHeaderCandidates: string[] = [];
		let guaranteedAmountHeaderCandidates: string[] = [];
		const totalUntil100HeaderCandidates: string[] = [
			'100세까지 총 수령액',
			'100세총수령액',
			'총 수령액(100세)',
			'99세까지 총 수령액',
			'99세총수령액',
			'총 수령액(99세)'
		];
		const pensionStartAgeHeaderCandidates: string[] = ['연금개시연령', '연금개시나이', '연금개시연령(세)'];

		if (resolvedProductType === 'happy-dream') {
			candidatePaths = [
				path.join(process.cwd(), 'app', 'insurance', 'annuity', 'kdb', 'happy-dream', 'kdb_dream_15-70.xlsx'),
				path.join(process.cwd(), 'public', 'kdb_dream_15-70.xlsx')
			];
			// 드림: 월 연금액과 실적배당 연금액을 분리
			monthlyPensionHeaderCandidates = ['월 연금액', '월연금액', '월 연금'];
			performancePensionHeaderCandidates = ['실적배당 연금액', '실적배당연금액'];
			guaranteedAmountHeaderCandidates = [
				'20년 보증기간 총액',
				'20년 보증 총액',
				'보증기간 총액',
				'20년 보증기간 연금액',
				'보증기간 연금액',
				'20년보증기간총액',
				'20년보증기간연금액'
			];
		} else if (resolvedProductType === 'ibk-lifetime') {
			candidatePaths = [
				path.join(process.cwd(), 'app', 'insurance', 'annuity', 'ibk', 'lifetime', 'ibk_lifetime_0-68.xlsx'),
				path.join(process.cwd(), 'public', 'ibk_lifetime_0-68.xlsx')
			];
			monthlyPensionHeaderCandidates = ['월 연금액', '월연금액', '월 연금'];
			performancePensionHeaderCandidates = ['실적배당 연금액', '실적배당연금액', '실적배당'];
			guaranteedAmountHeaderCandidates = [
				'20년 보증기간 총액',
				'20년 보증 총액',
				'보증기간 총액',
				'20년 보증기간 연금액',
				'보증기간 연금액',
				'20년보증기간총액',
				'20년보증기간연금액'
			];
		} else {
			candidatePaths = [
				path.join(process.cwd(), 'app', 'insurance', 'annuity', 'kdb', 'happy-plus', 'kdb_plus_15-70.xlsx'),
				path.join(process.cwd(), 'public', 'kdb_plus_15-70.xlsx')
			];
			monthlyPensionHeaderCandidates = ['월 연금액', '월연금액', '월 연금'];
			guaranteedAmountHeaderCandidates = ['20년 보증기간 총액', '20년 보증 총액', '보증기간 총액'];
		}

		let excelFilePath = '';
		for (const p of candidatePaths) {
			if (fs.existsSync(p)) {
				excelFilePath = p;
				break;
			}
		}

		console.log('[API] 엑셀 파일 경로 후보:', candidatePaths);
		console.log('[API] 선택된 엑셀 파일 경로:', excelFilePath || '(없음)');

		if (!excelFilePath) {
			return NextResponse.json(
				{ error: '엑셀 파일을 찾을 수 없습니다.' },
				{ status: 500 }
			);
		}

		// 엑셀 파일 읽기 (Buffer 방식)
		console.log('[API] 엑셀 파일 읽기 시작 (Buffer)');
		let workbook;
		try {
			const fileBuffer = fs.readFileSync(excelFilePath);
			workbook = XLSX.read(fileBuffer, { type: 'buffer' });
			console.log('[API] 워크북 시트 목록:', Object.keys(workbook.Sheets));
		} catch (readError) {
			console.error('[API] 엑셀 Buffer 읽기 실패:', readError);
			return NextResponse.json(
				{ error: '엑셀 파일을 읽을 수 없습니다.' },
				{ status: 500 }
			);
		}
		
		let worksheet = workbook.Sheets[sheetName];
		if (!worksheet) {
			// 시트명이 달라졌을 경우 첫 번째 시트를 사용 (로그 남김)
			const firstSheetName = workbook.SheetNames[0];
			console.warn(`[API] 지정한 시트(${sheetName}) 없음. 첫 시트(${firstSheetName}) 사용`);
			worksheet = workbook.Sheets[firstSheetName];
		}
		console.log('[API] 사용 시트 존재 여부:', !!worksheet);

		if (!worksheet) {
			return NextResponse.json(
				{ error: `시트를 찾을 수 없습니다.` },
				{ status: 500 }
			);
		}

		// 워크시트를 JSON으로 변환 (defval로 빈 셀도 보존하여 열 길이 유지)
		const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

		// 헤더 탐지 로직 (최대 10행 스캔)
		const normalize = (v: any) => String(v ?? '').replace(/\s+/g, '').trim();
		const headerSynonyms = {
			gender: ['성별'],
			age: ['가입연령', '가입나이', '가입연령(세)'],
			period: ['납입기간', '납입기간(년)', '납입기간(년수)'],
			payment: ['월납입액', '월보험료', '월 보험료', '월납입보험료']
		};

		let headerRowIndex = -1;
		let headerRow: string[] = [];
		for (let r = 0; r < Math.min(jsonData.length, 10); r++) {
			const row = (jsonData[r] as any[]).map(cell => normalize(cell));
			const hasAll = 
				headerSynonyms.gender.some(k => row.some(cell => cell.includes(normalize(k)))) &&
				headerSynonyms.age.some(k => row.some(cell => cell.includes(normalize(k)))) &&
				headerSynonyms.period.some(k => row.some(cell => cell.includes(normalize(k))));
			if (hasAll) {
				headerRowIndex = r;
				headerRow = row as string[];
				break;
			}
		}

		if (headerRowIndex === -1) {
			console.error('[API] 헤더 행을 찾지 못함. 상위 5행 미리보기:', jsonData.slice(0, 5));
			return NextResponse.json(
				{ error: '필수 컬럼을 찾을 수 없습니다.' },
				{ status: 500 }
			);
		}

		// 인덱스 매핑 도우미 (정규화 + 유사어)
		// 헤더가 바로 한 행에 없을 수 있어 상단 10행을 스캔하여 컬럼 위치를 탐색
		const findIndexBySynonyms = (synonyms: string[]) => {
			const maxScan = Math.min(jsonData.length, 10);
			for (let r = 0; r < maxScan; r++) {
				const normRow = (jsonData[r] as any[]).map(x => normalize(x));
				for (const key of synonyms) {
					const idx = normRow.indexOf(normalize(key));
					if (idx !== -1) return idx;
				}
			}
			// 마지막으로 헤더 행만 한 번 더 확인
			const normHeader = headerRow.map(x => normalize(x));
			for (const key of synonyms) {
				const idx = normHeader.indexOf(normalize(key));
				if (idx !== -1) return idx;
			}
			return -1;
		};

		const genderIndex = findIndexBySynonyms(headerSynonyms.gender);
		const ageIndex = findIndexBySynonyms(headerSynonyms.age);
		const periodIndex = findIndexBySynonyms(headerSynonyms.period);
		const paymentIndex = findIndexBySynonyms(headerSynonyms.payment);
		const pensionStartAgeIndex = findIndexBySynonyms(pensionStartAgeHeaderCandidates);
		const monthlyPensionIndex = findIndexBySynonyms(monthlyPensionHeaderCandidates);
		const performancePensionIndex = findIndexBySynonyms(performancePensionHeaderCandidates);
		const guaranteedAmountIndex = findIndexBySynonyms(guaranteedAmountHeaderCandidates);
		const totalUntil100Index = findIndexBySynonyms(totalUntil100HeaderCandidates);
		const noticeIndex = findIndexBySynonyms(['안내']);

		// 필수 컬럼 확인
		if (genderIndex === -1 || ageIndex === -1 || periodIndex === -1) {
			console.error('[API] 필수 컬럼 인덱스:', { genderIndex, ageIndex, periodIndex, paymentIndex, headerRow });
			return NextResponse.json(
				{ error: '필수 컬럼을 찾을 수 없습니다.' },
				{ status: 500 }
			);
		}

		// 적격성 확인 모드: 각 납입기간별(10/15/20)로 해당 연령/성별 데이터가 비어있지 않은지 반환
		if (mode === 'eligibility') {
			const periodsToCheck = [10, 15, 20];
			const mapped = mapGender(gender);
			const ageInt = parseInt(age.toString());
			const isNonEmpty = (v: any) => {
				if (v === null || v === undefined) return false;
				if (typeof v === 'number') return isFinite(v) && v !== 0;
				const s = String(v).trim();
				if (s === '') return false;
				const n = parseInt(s.replace(/[^0-9.-]/g, ''));
				return !isNaN(n) && n !== 0;
			};

			const eligibility: Record<string, boolean> = {};
			for (const p of periodsToCheck) {
				let found = false;
				for (let i = headerRowIndex + 1; i < jsonData.length; i++) {
					const row = jsonData[i] as any[];
					if (row.length <= Math.max(genderIndex, ageIndex, periodIndex)) continue;
					const rawGender = String(row[genderIndex] ?? '').trim();
					const rowGender = rawGender.startsWith('남') ? '남' : rawGender.startsWith('여') ? '여' : rawGender;
					const rowAge = parseInt(row[ageIndex]);
					const rowPeriod = parseInt(row[periodIndex]);
					if (rowGender === mapped && rowAge === ageInt && rowPeriod === p) {
						const v1 = monthlyPensionIndex !== -1 ? row[monthlyPensionIndex] : null;
						const v2 = performancePensionIndex !== -1 ? row[performancePensionIndex] : null;
						const v3 = guaranteedAmountIndex !== -1 ? row[guaranteedAmountIndex] : null;
						const v4 = totalUntil100Index !== -1 ? row[totalUntil100Index] : null;
						if (isNonEmpty(v1) || isNonEmpty(v2) || isNonEmpty(v3) || isNonEmpty(v4)) {
							found = true;
						}
						break;
					}
				}
				eligibility[String(p)] = found;
			}

			return NextResponse.json({ success: true, eligibility });
		}

			 // 데이터 행에서 일치하는 행 찾기
		 console.log('[API] 데이터 매칭 시작');
		 console.log('[API] 검색 조건:', { gender, age, paymentPeriod, cleanMonthlyPayment });
		 console.log('[API] 헤더 행 인덱스:', headerRowIndex);
		 
		 let matchedRow: any[] | null = null;
		 for (let i = headerRowIndex + 1; i < jsonData.length; i++) {
			 const row = jsonData[i] as any[];
			 if (row.length <= Math.max(genderIndex, ageIndex, periodIndex)) {
				 continue;
			 }

			 const rawGender = String(row[genderIndex] ?? '').trim();
			 const rowGender = rawGender.startsWith('남') ? '남' : rawGender.startsWith('여') ? '여' : rawGender;
			 const rowAge = parseInt(row[ageIndex]);
			 const rowPeriod = parseInt(row[periodIndex]);
			 // 월 납입액 정규화(옵션): 결제액 컬럼이 있는 경우에만 비교
			 let rowPayment: number | null = null;
			 if (paymentIndex !== -1) {
				 const rawPayment = String(row[paymentIndex] ?? '');
				 let parsed = parseInt(rawPayment.replace(/[^0-9]/g, ''));
				 if (rawPayment.includes('만원') || [30,50,100].includes(parsed)) {
					 parsed = parsed * 10000;
				 }
				 rowPayment = parsed;
			 }

			 const periodMatches = rowPeriod === parseInt(paymentPeriod.toString().replace(/[^0-9]/g, ''));
			 const paymentMatches = paymentIndex === -1 ? true : rowPayment === cleanMonthlyPayment;
			 if (rowGender === mappedGender && rowAge === parseInt(age.toString()) && periodMatches && paymentMatches) {
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
		
		// 결과 데이터 추출 (숫자 정규화 파서 적용)
		const parseNumber = (v: any): number => {
			if (v === null || v === undefined) return 0;
			if (typeof v === 'number') return isFinite(v) ? v : 0;
			const s = String(v).replace(/[^0-9.-]/g, '');
			const n = parseFloat(s);
			return isNaN(n) ? 0 : Math.round(n);
		};
		const pensionStartAge = pensionStartAgeIndex !== -1 ? parseNumber(matchedRow[pensionStartAgeIndex]) : 0;
		const monthlyPension = monthlyPensionIndex !== -1 ? parseNumber(matchedRow[monthlyPensionIndex]) : 0;
		const performancePension = performancePensionIndex !== -1 ? parseNumber(matchedRow[performancePensionIndex]) : 0;
		const guaranteedAmount = guaranteedAmountIndex !== -1 ? parseNumber(matchedRow[guaranteedAmountIndex]) : 0;
		const totalUntil100 = totalUntil100Index !== -1 ? parseNumber(matchedRow[totalUntil100Index]) : 0;
		const notice = noticeIndex !== -1 ? (matchedRow[noticeIndex] || '') : '';

		// 숫자 포맷팅 (3자리 콤마 + 원)
		const formatCurrency = (value: number) => {
			return value.toLocaleString('ko-KR') + '원';
		};

		// 결과 메시지 생성
		let resultMessage = `${customerName}님의 연금액 계산 결과입니다.\n\n`;
		resultMessage += `연금개시연령: ${pensionStartAge}세\n`;
		resultMessage += `월 연금액: ${formatCurrency(monthlyPension)}\n`;
		if (guaranteedAmountIndex !== -1) {
			resultMessage += `20년 보증기간 총액: ${formatCurrency(guaranteedAmount)}\n`;
		}
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
				performancePension,
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
