import React from 'react'

export default function CoverageDetails() {
  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-8 py-3 md:py-4">
      <div className="text-sm text-red-600 mb-4">
        아래의 내용은 보험금 지급 내용에 대한 개략적인 내용이므로 자세한 내용은 해당 약관을 참조하시기 바랍니다.
      </div>

      {/* 주계약 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">주계약 ((무)하나뿐인 변액연금보험)</h3>

        {/* 연금개시전 보험기간 */}
        <div className="space-y-3">
          <h4 className="text-base font-semibold">[연금개시전 보험기간(보험계약일부터 연금개시나이 연계약해당일 전일까지)]</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2 text-center">급부명</th>
                  <th className="border border-gray-300 p-2 text-center">지급사유</th>
                  <th className="border border-gray-300 p-2 text-center">지급금액</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 text-center font-semibold">고도재해장해<br />보험금</td>
                  <td className="border border-gray-300 p-2">연금개시전 보험기간 중 피보험자가 재해를 원인으로 장해분류표에서 정한 장해지급률 중 80%이상에 해당하는 장해상태가 되었을 때</td>
                  <td className="border border-gray-300 p-2">
                    <div>구좌당 1,000만원 X 해당 장해지급률</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 연금개시후 보험기간 */}
        <div className="space-y-3">
          <h4 className="text-base font-semibold">[연금개시후 보험기간(연금개시나이 연계약해당일부터 종신까지)]</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2 text-center">급부명</th>
                  <th className="border border-gray-300 p-2 text-center">지급사유</th>
                  <th className="border border-gray-300 p-2 text-center">지급금액</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 text-center font-semibold">연금액</td>
                  <td className="border border-gray-300 p-2">연금개시후 보험기간 중 피보험자가 매월 월계약해당일에 살아있을 때</td>
                  <td className="border border-gray-300 p-2">연금기준금액 X 연금개시나이별 연금지급률 /12</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 연금개시나이별 연금지급률 */}
          <div className="mt-4">
            <div className="mb-2 font-semibold text-sm">* 연금개시나이별 연금지급률</div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2 text-center">연금개시나이</th>
                    <th className="border border-gray-300 p-2 text-center">연금지급률(연기준)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">30세 이상 40세 미만</td>
                    <td className="border border-gray-300 p-2 text-center">2.50%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">40세 이상 50세 미만</td>
                    <td className="border border-gray-300 p-2 text-center">3.45%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">50세 이상 55세 미만</td>
                    <td className="border border-gray-300 p-2 text-center">3.75%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">55세 이상 60세 미만</td>
                    <td className="border border-gray-300 p-2 text-center">4.35%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">60세 이상 65세 미만</td>
                    <td className="border border-gray-300 p-2 text-center">5.00%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">65세 이상 70세 미만</td>
                    <td className="border border-gray-300 p-2 text-center">5.45%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">70세 이상 75세 미만</td>
                    <td className="border border-gray-300 p-2 text-center">5.85%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">75세 이상</td>
                    <td className="border border-gray-300 p-2 text-center">6.00%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 주요 안내사항 */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="space-y-2 text-sm text-gray-700">
            <div className="font-semibold mb-2">(주)</div>
            <div>1. 계약자적립액은 특별계정의 운용실적에 따라 개별 계약자 별로 배분된 금액 등을 말하며 특별계정의 평가 등에 의하여 매일 변동할 수 있습니다.</div>
            <div>2. 피보험자가 보험기간 중 사망한 경우, 약관 제2조(용어의 정의) 제5호의 '타'목에서 정한 최저사망적립액과 사망당시의 계약자적립액 중 큰 금액을 지급하여 드리고, 이 계약은 더 이상 효력이 없습니다.</div>
            <div>3. 최저연금기준금액이란, 기준 기본보험료 및 기준 추가납입보험료를 납입시점부터 보증이율을 적용하여 단리로 계산한 금액을 말합니다.</div>
            <div>4. 연금기준금액이란, 연금개시시점의 최저연금기준금액과 계약자적립액 중 큰 금액을 말합니다.</div>
          </div>
        </div>
      </div>
      {/* 최저연금지급액 보증 */}
      <div className="space-y-4 mt-8">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">최저연금지급액 보증</h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-base mb-2">최저연금지급액</h4>
            <p className="text-sm text-gray-700">피보험자가 매월 월계약해당일에 살아있을 경우 특별계정의 운용실적과 관계없이 종신까지 지급하는 연금액으로 연금기준금액에 '연금개시나이별 지급률/12'을 곱하여 산출된 금액을 말합니다.</p>
          </div>

          <div>
            <h4 className="font-semibold text-base mb-2">연금기준금액</h4>
            <p className="text-sm text-gray-700">연금개시시점의 최저연금기준금액과 계약자적립액 중 큰 금액을 말합니다.</p>
          </div>

          <div>
            <h4 className="font-semibold text-base mb-2">최저연금기준금액</h4>
            <p className="text-sm text-gray-700">기준 기본보험료 및 기준 추가납입보험료를 납입시점(기본보험료를 선납한 경우에는 납입시점이 아닌 해당회차 월계약해당일)부터 보증이율을 적용하여 단리로 계산한 금액을 말합니다.</p>
          </div>

          <div className="p-3 rounded border border-gray-200">
            <div className="text-sm text-gray-700 space-y-1">
              <div>※ 최저연금지급액 보증비용: 매년 특별계정 계약자적립액의 3.50%(가입시부터 종신까지 차감)</div>
              <div className="text-red-600">※ 중도해지 시 또는 연금개시 후 피보험자 사망 시 최저연금지급액은 보증하지 않습니다.</div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-base mb-2">보증이율</h4>
            <p className="text-sm text-gray-700 mb-3">최저연금기준금액을 산출하기 위하여 적용하는 이율로 연금개시전 보험기간에 따라 연단리 5%~7% 적용</p>

            <div className="mb-4">
              <div className="font-semibold text-sm mb-2">보증이율(연단리) 예시표</div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 p-2 text-center">연금개시전<br />보험기간</th>
                      <th className="border border-gray-300 p-2 text-center">15년이상~<br />20년미만</th>
                      <th className="border border-gray-300 p-2 text-center">20년이상~<br />25년미만</th>
                      <th className="border border-gray-300 p-2 text-center">25년 이상</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2 text-center font-semibold">보증이율(연단리)</td>
                      <td className="border border-gray-300 p-2 text-center text-emerald-600 font-bold">5%</td>
                      <td className="border border-gray-300 p-2 text-center text-emerald-600 font-bold">6%</td>
                      <td className="border border-gray-300 p-2 text-center text-emerald-600 font-bold">7%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-600 mt-2">(연복리 환산시 보증이율은 연단리 보증이율과 다르며, 가입조건별 상이합니다)</p>
            </div>

            <div className="mb-4">
              <div className="font-semibold text-sm mb-2">*연금개시전 보험기간에 따른 연복리 이자율로 환산한 이율 예시</div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 p-2 text-center" rowSpan={2}>연금개시전 보험기간</th>
                      <th className="border border-gray-300 p-2 text-center">20년</th>
                      <th className="border border-gray-300 p-2 text-center">25년</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2 text-center font-semibold">적립형</td>
                      <td className="border border-gray-300 p-2 text-center">4.17%</td>
                      <td className="border border-gray-300 p-2 text-center">4.28%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-600 mt-2">**상기 보증이율 예시는 연단리 이율을 연복리 이율로 환산한 근삿값입니다.(40세, 남자, 적립형: 5년납 기준)</p>
            </div>


          </div>
        </div>

        {/* 최저사망적립액 보증 */}
        <div className="space-y-4 mt-8">
          <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">최저사망적립액 보증</h3>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-base mb-2">최저사망적립액</h4>
              <p className="text-sm text-gray-700 mb-2">피보험자가 사망하는 경우 특별계정의 운용실적과 관계없이 지급되는 최소금액을 말합니다.</p>
              <div className="pl-4 text-sm text-gray-700 space-y-1">
                <p>- 연금개시전 보험기간: 기준 기본보험료 및 기준 추가납입보험료를 납입시점(기본보험료를 선납한 경우에는 납입시점이 아닌 해당회차 월계약해당일)부터 4%를 적용하여 사망시점까지 단리로 계산한 금액을 말합니다.</p>
                <p>- 연금개시후 보험기간: 연금개시시점의 연금기준금액에서 사망 시점까지 지급한 연금액의 합계를 차감한 금액을 말하며, 이 금액이 '0'보다 작은 경우 최저사망적립액은 '0'으로 합니다.</p>
              </div>
            </div>

            <div className="p-3 rounded border border-gray-200">
              <div className="text-sm text-gray-700 space-y-1">
                <div>※ 최저사망적립액 보증비용: 매년 특별계정 계약자적립액의 0.20%(가입시부터 종신까지 차감)</div>
                <div className="text-red-600">※ 중도해지 시 최저사망적립액은 보증하지 않습니다.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
