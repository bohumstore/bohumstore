import React from 'react'

export default function ProductInfo() {
  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-8 py-3 md:py-4">
      {/* 01 연단리 8% 연금기준금액 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">01 연단리 8% 연금기준금액</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <p className="text-sm">펀드운용 성과에 상관없이 최대 20년동안 연단리 8%로 부리된 연금액 보증</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2">구분</th>
                    <th className="border border-gray-300 p-2">내용</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 font-semibold">최저연금기준금액비율</td>
                    <td className="border border-gray-300 p-2">기납입 보험료 연단리 X% 부리</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-sm text-red-600">※ 해당보험료 납입일을 기준으로 일자 계산합니다.</div>
          </div>
        </div>
      </div>

      {/* 02 실적배당종신연금보증형 보장 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">02 실적배당종신연금보증형 보장</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2">구분</th>
                    <th className="border border-gray-300 p-2">내용</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 font-semibold">10년 이내</td>
                    <td className="border border-gray-300 p-2">최저연금기준금액의 3.60% (매월 0.30%)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-semibold">10년 이후</td>
                    <td className="border border-gray-300 p-2">최저연금기준금액의 1.80% (매월 0.15%)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-semibold">연금개시 이후</td>
                    <td className="border border-gray-300 p-2">연금기준금액의 1.20% (매월 0.10%)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 03 최저사망계약자적립액 보증 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">03 최저사망계약자적립액 보증</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <p className="text-sm">사망시 최저사망계약자적립액까지 보증</p>
            <div className="space-y-2 text-sm">
              <div>• 연금개시전 사망시: 사망시점의 최저연금기준금액 지급</div>
              <div>• 연금개시후 사망시: 사망시점의 연금기준금액 - 기수령연금액의 합계</div>
            </div>
            <div className="text-sm text-red-600">※ 피보험자가 만 15세 이전에 사망한 경우의 최저사망적립액은 기납입 보험료</div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2">구분</th>
                    <th className="border border-gray-300 p-2">내용</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 font-semibold">10년 이내</td>
                    <td className="border border-gray-300 p-2">최저연금기준금액의 0.36% (매월 0.030%)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-semibold">10년 이후</td>
                    <td className="border border-gray-300 p-2">최저연금기준금액의 0.18% (매월 0.015%)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-semibold">연금개시 이후</td>
                    <td className="border border-gray-300 p-2">연금기준금액의 0.18% (매월 0.015%)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 04 유연한 자금운용 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">04 유연한 자금운용</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <div>
              <div className="mb-3 text-sm font-semibold">추가납입</div>
              <div className="space-y-2 text-sm">
                <div><strong>납입한도:</strong> (해당월까지 납입한 기본보험료+선납보험료) × 200% - 이미 납입한 추가납입보험료의 합계 + 중도인출금액의 합계</div>
                <div className="text-red-600">※ 단, 연간 납입한도 존재</div>
                <div><strong>해당기간:</strong></div>
                <div>• 1형(보증형): 보험계약 성립 후부터 납입기간 종료일까지</div>
                <div>• 2형(미보증형): 보험계약 성립 후부터 연금개시일 전일까지</div>
                <div className="text-red-600">※ 연간납입한도: 연간(보험연도 기준) 납입한 기본보험료의 2배까지만 가능(12개월치의 2배)</div>
              </div>
            </div>
            <div>
              <div className="mb-3 text-sm font-semibold">중도인출</div>
              <div className="space-y-2 text-sm">
                <div><strong>기본사항:</strong> 보험년도 기준 연 12회 인출가능, 계약월 이후 1개월이 지난 후부터 인출 가능</div>
                <div><strong>인출수수료:</strong> 없음</div>
                <div><strong>인출후 최소 계약자적립액:</strong> Max (기본보험료의 2배, 500만원)</div>
                <div className="text-red-600">※ 1회당 인출할 수 있는 최고한도는 인출 당시 해약환급금의 60%를 초과할 수 없습니다.</div>
                <div className="text-red-600">※ "인출신청일 + 제2영업일"에 "인출신청일 + 제2영업일"의 기준가를 적용하여 지급합니다.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 05 무심사 가입 및 조기연금개시 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">05 무심사 가입 및 조기연금개시</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <div className="space-y-2 text-sm">
              <div><strong>가입연령:</strong> 0세부터 68세까지 누구나 조건없이 무심사 가입 가능</div>
              <div>• 질병여부 상관없이 무진단․무심사로 모든 고객이 가입 가능</div>
              <div className="text-red-600">※ 유병력자(당뇨, 암, 고혈압 등)도 가입제한 없음</div>
              <div>• 청약서의 계약전 알릴 의무사항 작성 불필요</div>
            </div>
            <div className="space-y-2 text-sm">
              <div><strong>연금개시:</strong> 연금개시요건 충족 시 30세부터 연금개시 가능</div>
              <div className="text-red-600">※ 미보증형은 45세부터 연금개시 가능</div>
            </div>
          </div>
        </div>
      </div>

      {/* 가입안내 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">가입안내</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#1e3a8a] text-white">
                    <th className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">구분</th>
                    <th className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">내용</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm font-semibold">보험종류</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">변액연금보험</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm font-semibold">부가가능 특약</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">해당 없음</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm font-semibold">가입나이</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">0세~최대68세(미보증형: 최대75세)</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm font-semibold">연금개시나이</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">30세~80세(미보증형: 45~80세)</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm font-semibold">납입기간</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">5,7,10년납이상 (30년이하)</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm font-semibold">납입주기</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">월납</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm font-semibold">최소거치기간</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">5년납은 7년 / 7년납이상은 5년(미보증형: 없음)</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm font-semibold">최소보험료</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">5/7년납은 30만원이상, 10년납이상은 20만원이상</td>
                </tr>
              </tbody>
            </table>
            </div>
            <div className="mt-4 text-sm">
              <div className="text-red-600">※ 계약인수 관련 사항은 회사가 별도로 정한 기준에 따라 제한될 수 있습니다.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 