import React from 'react'

export default function CoverageDetails() {
  return (
    <div className="space-y-8 px-2 sm:px-4 md:px-8 py-4 md:py-6">
      <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">주계약</h2>

      {/* 연금개시 전 보험기간 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">연금개시 전 보험기간</h3>
        <div className="text-sm text-gray-600 mb-2 whitespace-nowrap text-right">(기준 : 1구좌)</div>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#1e3a8a] text-white">
                    <th className="border border-gray-300 p-2 sm:p-3 w-[140px] sm:w-[180px] text-xs sm:text-sm">급부명칭</th>
                    <th className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">지급사유</th>
                    <th className="border border-gray-300 p-2 sm:p-3 w-[100px] sm:w-[120px] whitespace-nowrap text-xs sm:text-sm">지급금액</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 text-[#1e3a8a] text-xs sm:text-sm text-center">고도후유장해보험금</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm leading-relaxed">연금개시 전 보험기간 중 피보험자가 장해분류표 중 동일한 재해로 여러 신체부위의 장해지급률을 더하여 80% 이상인 장해상태가 되었을 때 (최초1회한)</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-[#1e3a8a] whitespace-nowrap text-xs sm:text-sm text-center">1,000만원</td>
                </tr>
              </tbody>
            </table>
            </div>
            <div className="text-sm text-gray-600">
              ※ 사망하였을 경우에는 계약자적립액과 최저사망적립액 중 큰 금액을 지급합니다.
            </div>
          </div>
        </div>
      </div>

      {/* 연금개시 후 보험기간 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">연금개시 후 보험기간</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#1e3a8a] text-white">
                    <th className="border border-gray-300 p-2 sm:p-3 w-[140px] sm:w-[180px] text-xs sm:text-sm">급부명칭</th>
                    <th className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">지급사유</th>
                    <th className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">지급금액</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 text-[#1e3a8a] text-xs sm:text-sm text-center">금액보증연금</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm leading-relaxed">연금개시 후 보험기간 중 피보험자가 매년 계약해당일에 살아있을 때</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm leading-relaxed">연금기준금액(다만, 연계약해당일의 계약자적립액이 더 클 경우에는 계약자적립액)을 기준으로 금액보증연금 지급률을 적용하여 계산한 금액보증연금 연지급액을 피보험자가 연계약해당일에 살아 있을 경우 지급</td>
                </tr>
              </tbody>
            </table>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">
                ※ 사망하였을 경우에는 계약자적립액과 최저사망적립액 중 큰 금액을 지급합니다.
              </div>
              <div className="text-sm text-gray-600">
                다만 선지급행복자금 계약자적립액이 있는 경우 가산하여 지급하여 드립니다.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 주의사항 */}
      <div className="space-y-4 text-sm text-gray-600">
        <p>보험기간 중 피보험자의 사망으로 인하여 이 약관에서 규정하는 보험금 지급사유가 더 이상 발생할 수 없는 경우에는 "산출방법서"에서 정하는 바에 따라 회사가 적립한 사망당시의 계약자적립액과 최저사망적립액 중 큰 금액을 계약자에게 지급하고 이 계약은 더 이상 효력이 없습니다.</p>
        <p>고도후유장해보험금의 경우 지급사유 발생 최초 1회에 한하여 지급하여 드리며, "산출방법서"에서 정한 바에 따라 계약자적립액 계산시 고도후유장해보험금 지급사유 발생일 이후 최초 도래하는 월계약 해당일부터 고도후유장해보험금에 해당하는 위험보험료를 차감하지 않습니다.</p>
        <p>「최저사망적립액」이라 함은, 장래 공시이율과 관계 없이 피보험자가 보험기간 중 사망하는 경우 보장하는 최저한도의 계약자적립액으로서 사망시점의 "최저연금기준금액"을 말합니다. 다만, 연금개시 후 보험기간에는 사망시점의 "연금기준금액"에서 연금개시 후 보험기간 중 발생한 금액보증연금 연지급액의 합계를 차감한 금액을 말하며, 이 금액이 '0'보다 적은 경우 '0'으로 합니다.</p>
        <p>계약자가 선지급행복자금을 신청하는 경우 금액보증연금은 선지급행복자금 신청비율만큼 줄어듭니다.</p>
      </div>

      {/* 부가가능특약 */}
      <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">부가가능특약</h2>
      <div className="space-y-4">
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">(무)신보험료납입면제특약(3대질병형)</td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 