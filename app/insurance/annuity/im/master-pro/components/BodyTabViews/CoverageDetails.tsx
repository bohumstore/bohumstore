import React from 'react'

export default function CoverageDetails() {
  return (
    <div className="space-y-8 px-2 sm:px-4 md:px-8 py-4 md:py-6">
      <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">보장내용</h2>

      {/* 주계약 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">주계약</h3>

        {/* (1) 고도재해장해보험금 */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-[#1e3a8a]">(1) 고도재해장해보험금</h4>
            <p className="text-sm text-gray-600">(기준 : 1구좌)</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs md:text-sm min-w-[280px]">
              <colgroup>
                <col className="w-[20%]" />
                <col className="w-[50%]" />
                <col className="w-[30%]" />
              </colgroup>
              <thead>
                <tr className="bg-[#1e3a8a] text-white">
                  <th className="border border-gray-300 p-2 text-center">구분</th>
                  <th className="border border-gray-300 p-2 text-center">지급사유</th>
                  <th className="border border-gray-300 p-2 text-center">지급금액</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 text-center font-semibold">고도재해장해보험금</td>
                  <td className="border border-gray-300 p-2">85세 계약해당일 전일까지 발생한 동일한 재해로 피보험자가 장해분류표 중 여러 신체부위의 장해 지급률을 더하여 80% 이상인 장해상태가 된 경우(최초 1회한)</td>
                  <td className="border border-gray-300 p-2 text-center">1,000만원</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* (2) 평생연금 */}
        <div className="space-y-3">
          <h4 className="font-bold text-[#1e3a8a]">(2) 평생연금</h4>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs md:text-sm min-w-[280px]">
              <colgroup>
                <col className="w-[20%]" />
                <col className="w-[50%]" />
                <col className="w-[30%]" />
              </colgroup>
              <thead>
                <tr className="bg-[#1e3a8a] text-white">
                  <th className="border border-gray-300 p-2 text-center">구분</th>
                  <th className="border border-gray-300 p-2 text-center">지급사유</th>
                  <th className="border border-gray-300 p-2 text-center">지급금액</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 text-center font-semibold">평생연금</td>
                  <td className="border border-gray-300 p-2">연금개시후 보험기간 중 피보험자가 연계약해당일에 살아있을 경우</td>
                  <td className="border border-gray-300 p-2">연금지급개시나이 계약해당일의 평생연금기준금액과 연금지급개시나이 계약해당일의 계약자적립액 중 큰 금액을 기준으로 평생연금 지급률 및 (1+장기유지가산율)을 적용하여 계산한 연금액</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 평생연금 지급률 표 */}
          <div className="space-y-2">
            <p className="text-sm font-semibold">※ 평생연금 지급률은 연금지급개시나이에 따라 아래와 같이 정합니다.</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs md:text-sm min-w-[280px]">
                <colgroup>
                  <col className="w-[40%]" />
                  <col className="w-[30%]" />
                  <col className="w-[30%]" />
                </colgroup>
                <thead>
                  <tr className="bg-[#1e3a8a] text-white">
                    <th className="border border-gray-300 p-2 text-center">연금지급개시나이</th>
                    <th className="border border-gray-300 p-2 text-center">피보험자가 남자인 경우</th>
                    <th className="border border-gray-300 p-2 text-center">피보험자가 여자인 경우</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">51세 이상 55세 미만</td>
                    <td className="border border-gray-300 p-2 text-center">3.60%</td>
                    <td className="border border-gray-300 p-2 text-center">3.40%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">55세 이상 60세 미만</td>
                    <td className="border border-gray-300 p-2 text-center">4.25%</td>
                    <td className="border border-gray-300 p-2 text-center">3.95%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">60세 이상 65세 미만</td>
                    <td className="border border-gray-300 p-2 text-center">5.10%</td>
                    <td className="border border-gray-300 p-2 text-center">4.90%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">65세 이상 70세 미만</td>
                    <td className="border border-gray-300 p-2 text-center">5.65%</td>
                    <td className="border border-gray-300 p-2 text-center">5.40%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">70세 이상 80세 이하</td>
                    <td className="border border-gray-300 p-2 text-center">6.05%</td>
                    <td className="border border-gray-300 p-2 text-center">5.85%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 장기유지가산율 표 */}
          <div className="space-y-2">
            <p className="text-sm font-semibold">※ 장기유지가산율은 연금개시전 보험기간에 따라 아래와 같이 정합니다.</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs md:text-sm min-w-[280px]">
                <colgroup>
                  <col className="w-[50%]" />
                  <col className="w-[50%]" />
                </colgroup>
                <thead>
                  <tr className="bg-[#1e3a8a] text-white">
                    <th className="border border-gray-300 p-2 text-center">연금개시전 보험기간</th>
                    <th className="border border-gray-300 p-2 text-center">장기유지 가산율</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">20년 미만</td>
                    <td className="border border-gray-300 p-2 text-center">0%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">20년 이상 25년 미만</td>
                    <td className="border border-gray-300 p-2 text-center">7%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">25년 이상 30년 미만</td>
                    <td className="border border-gray-300 p-2 text-center">14.5%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">30년 이상 35년 미만</td>
                    <td className="border border-gray-300 p-2 text-center">17.5%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">35년 이상 40년 미만</td>
                    <td className="border border-gray-300 p-2 text-center">19.5%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">40년 이상</td>
                    <td className="border border-gray-300 p-2 text-center">29%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 주석 */}
          <div className="space-y-2 text-xs text-gray-600 bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold">주)</p>
            <p>1. 피보험자가 보험기간 중 사망하였을 경우에는 사망당시의 계약자적립액과 제2조(용어의 정의)에서 정의한 최저사망적립액 중 큰 금액을 계약자에게 지급하여 드리고 이 계약은 더 이상 효력이 없습니다.</p>

            <p>2. 최저사망적립액이라 함은 특별계정의 운용실적과 관계없이 피보험자가 사망한 경우 지급하는 최저한도의 계약자적립액을 말합니다.</p>
            <p className="pl-4">(1) "최저사망적립액"은 피보험자가 사망한 날의 제2조(용어의 정의) 제5항 제3호에서 정의한 "이미 납입한 보험료"에 150%를 곱한 금액을 말합니다.</p>
            <p className="pl-4">(2) 연금개시 후 보험기간에는 피보험자가 사망한 날의 (1)에서 정한 최저사망적립액에서 연금개시 후 보험기간 중 발생한 평생연금 지급액의 합계를 차감한 금액을 말하며, 이 금액이 '0'보다 적은 경우 '0'으로 합니다.</p>

            <p>3. 계약자적립액은 매일 특별계정의 운용실적을 적용하여 산출방법서에서 정한 바에 따라 계산되기 때문에 특별계정의 운용실적이 변경되면 계약자적립액도 변경됩니다.</p>

            <p>4. 평생연금이라 함은 연금개시후 보험기간 중 피보험자가 연계약해당일에 살아 있을 경우 연금지급개시나이 계약해당일의 평생연금기준금액과 연금지급개시나이 계약해당일의 계약자적립액 중 큰 금액에 평생연금 지급률 및 (1+장기유지가산율)을 곱한 금액을 말하며, 연금개시 후 보험기간동안 동일하게 적용됩니다.</p>

            <p>5. 평생연금기준금액이라 함은 특별계정의 운용실적과 관계없이 연금개시후 보험기간 동안 평생연금 지급의 기준이 되는 금액으로 다음과 같습니다.</p>
            <p className="pl-4">(1) 연금개시전 보험기간 동안 기준 기본보험료 및 기준 추가납입보험료에 기준 기본보험료 및 기준 추가납입보험료의 매년 평생연금기준금액이율 해당액을 해당 보험료 납입일을 기준으로 평생연금기준금액 증액기간동안 일자 계산하여 더한 금액(연단리 기준)을 말합니다.</p>
            <p className="pl-4">(2) 평생연금기준금액 증액기간에 따른 평생연금기준금액이율은 다음과 같습니다. (연단리 기준)</p>
            <p className="pl-8">1) 보험계약일부터 30년까지의 기간: 7/100</p>
            <p className="pl-8">2) 30년이후부터 연금지급개시나이 계약해당일까지: 5/100</p>
            <p className="pl-8">(다만, 보험계약일부터 연금지급개시나이 계약해당일까지의 기간이 30년보다 짧을 경우 1)에 따라 보험계약일부터 연금지급개시나이 계약해당일까지 7/100 적용)</p>

            <div className="bg-white p-3 rounded border border-gray-300 my-2">
              <p className="font-semibold mb-1">【 평생연금기준금액이율의 복리 이자율 환산 예시 】</p>
              <p>예시) 40세 가입, 60세 연금개시, 10년납</p>
              <p>• 연단리 기준 : 보험계약일부터 60세 계약해당일까지: 7/100</p>
              <p className="pl-4">⇒ 연복리 기준으로 환산시 4.83%</p>
            </div>

            <p className="pl-4">(3) 평생연금기준금액 증액기간이라 함은 보험계약일부터 연금지급개시나이 계약해당일(단, 연금개시전 보험기간 중 피보험자가 사망한 경우 피보험자가 사망한 날)을 말합니다.</p>
            <p className="pl-4">(4) (1)에 따라 계산된 연금지급개시나이 연계약해당일의 평생연금기준금액은 연금개시 후 보험기간 동안 동일하게 적용합니다.</p>
            <p className="pl-4">(5) (1)에도 불구하고 계약자가 연금개시전 보험기간 중 기본보험료를 감액하거나 계약자적립액을 중도에 인출한 경우 평생연금기준금액은 제32조(계약내용의 변경 등) 제6항 및 제48조(계약자적립액의 인출) 제5항에 따라 계산된 평생연금기준금액에 해당 감액 또는 계약자적립액의 인출 이후에 (1)에 따라 계산한 금액을 말합니다.</p>

            <p>6. "이미 납입한 보험료"라 함은 계약자가 회사에 납입한 기본보험료 및 추가납입보험료의 합계를 말합니다. 다만, 계약자가 기본보험료를 감액하거나 계약자적립액을 중도에 인출한 경우 최저사망적립액 및 제33조(노후긴급자금 신청제도에 관한 사항)에서 적용하는 이미 납입한 보험료는 제32조(계약내용의 변경 등) 제4항 및 제48조(계약자적립액의 인출) 제3항에 따라 계산된 보험료와 해당 감액 또는 계약자적립액의 인출 이후 납입된 보험료의 합계를 말합니다.</p>

            <p>7. 평생연금을 매월, 매3개월, 매6개월로 나누어 산출방법서에 정한 바에 따라 지급받을 수 있습니다.</p>
          </div>
        </div>
      </div>

      {/* 지정대리청구서비스특약 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">지정대리청구서비스특약</h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-sm">보험계약자, 피보험자 및 보험수익자가 모두 동일한 계약에 한하여 보험계약자는 주계약 및 특약에서 정한 보험금을 직접 청구할 수 없는 특별한 사정이 있을 경우를 대비하여 보험금의 대리청구인을 지정할 수 있고 대리인은 보험금을 청구하고 수령할 수 있습니다.</p>
        </div>
      </div>
    </div>
  )
}
