import React from 'react'

export default function CoverageDetails() {
  return (
  <div className="space-y-8 px-2 sm:px-4 md:px-8 py-4 md:py-6">
    {/* 연금지급 개시 전 보험기간 */}
    <div className="space-y-4">
      <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">연금지급 개시 전 보험기간</h2>
      <p className="text-sm text-gray-600">계약일로부터 연금지급 개시나이 계약해당일의 전일까지</p>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs md:text-sm">
          <thead>
            <tr className="bg-[#1e3a8a] text-white">
              <th className="border border-gray-300 p-2">보장내용</th>
              <th className="border border-gray-300 p-2">지급사유</th>
              <th className="border border-gray-300 p-2">지급금액</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2 text-center">고도재해장해 보험금</td>
              <td className="border border-gray-300 p-2">피보험자가 연금지급 개시 전 보험기간 중 [장해분류표]에서 정한 동일한 재해로 인하여 여러 신체부위의 장해지급률을 더하여 80% 이상인 장해상태가 되었을 경우(최초 1회에 한하여 지급)</td>
              <td className="border border-gray-300 p-2 text-center">보험가입금액</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg text-sm">
        <p>※ 피보험자가 연금지급 개시 전 보험기간 중 사망하였을 경우에는 [사망 당시의 계약자적립액]과 [이미 납입한 보험료]중 큰 금액[이하(사망시 지급금)이라 합니다]을 계약자에게 지급하여 드리고 이 계약은 더 이상 효력을 가지지 않습니다.</p>
      </div>
    </div>

    {/* 연금지급 개시 후 보험기간 */}
    <div className="space-y-4">
      <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">연금지급 개시 후 보험기간</h2>
      <p className="text-sm text-gray-600">연금지급 개시나이 계약해당일부터 종신까지</p>
      <p className="text-sm text-gray-600 mb-4">계약시점의 연금지급형태는 종신연금형(개인연금형, 기본보증지급기간, 조기집중배수 3배)으로 정합니다.</p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs md:text-sm">
          <thead>
            <tr className="bg-[#1e3a8a] text-white">
              <th className="border border-gray-300 p-2">구분</th>
              <th className="border border-gray-300 p-2">지급사유</th>
              <th className="border border-gray-300 p-2">지급금액</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2 text-center">종신연금형</td>
              <td className="border border-gray-300 p-2">연금지급 개시 후 보험기간 중 매년 계약해당일에 피보험자가 살아있을 때</td>
              <td className="border border-gray-300 p-2">연금지급 개시할 때의 계약자적립액을 기준으로 보증지급기간의 연금연액이 보증지급기간 이후 연금연액의 3배가 되도록 계산 후 공시이율을 적용한 금액을 지급</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    {/* 연금지급형태의 변경 */}
    <div className="space-y-4">
      <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">연금지급형태의 변경</h2>
      <p className="text-sm text-gray-600 mb-4">계약시점에 정해진 연금지급형태인 종신연금형(개인연금형, 기본보증지급기간, 조기집중배수 3배)을 연금지급 개시 전에 종신연금형, 확정연금형, 상속연금형 총 3가지 중 2가지로 변경할 수 있습니다.</p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs md:text-sm">
          <thead>
            <tr className="bg-[#1e3a8a] text-white">
              <th className="border border-gray-300 p-2" colSpan={2}>구분</th>
              <th className="border border-gray-300 p-2">연금지급 개시 후 보험기간</th>
              <th className="border border-gray-300 p-2">지급사유</th>
              <th className="border border-gray-300 p-2">지급금액</th>
            </tr>
          </thead>
          <tbody>
            {/* 종신연금형 - 개인연금형 */}
            <tr>
              <td className="border border-gray-300 p-2 text-center" rowSpan={3}>종신<br/>연금형</td>
              <td className="border border-gray-300 p-2 text-center">개인<br/>연금형</td>
              <td className="border border-gray-300 p-2 text-center">연금지급 개시나이 계약해당일부터 종신까지</td>
              <td className="border border-gray-300 p-2">연금지급 개시 후 보험기간 중 매년 계약해당일에 피보험자가 살아있을 때</td>
              <td className="border border-gray-300 p-2">연금지급 개시할 때의 계약자적립액에 종신연금형 선택비율을 곱한 금액을 기준으로 보증지급기간의 연금연액이 보증지급기간 이후 연금연액의 계약자가 선택한 조기집중배수가 되도록 계산 후 공시이율을 적용한 금액을 지급</td>
            </tr>
            {/* 종신연금형 - 부부연금형 */}
            <tr>
              <td className="border border-gray-300 p-2 text-center" rowSpan={2}>부부<br/>연금형</td>
              <td className="border border-gray-300 p-2 text-center" rowSpan={2}>연금지급 개시나이 계약해당일부터 종신까지</td>
              <td className="border border-gray-300 p-2">연금지급 개시 후 보험기간 중 매년 계약해당일에 주피보험자가 살아있을 때</td>
              <td className="border border-gray-300 p-2">연금지급 개시할 때의 계약자적립액에 종신연금형 선택비율을 곱한 금액을 기준으로 공시이율을 적용하여 계산한 금액을 지급<br/>(10년, 20년, 30년, 90세 또는 100세 보증지급)</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">연금지급 개시 후 보험기간 중 주피보험자가 사망하고 종피보험자가 보증지급기간 이후 매년 계약해당일에 살아있을 때</td>
              <td className="border border-gray-300 p-2">주피보험자가 생존할 경우 지급되는 연금액의 50%, 70% 또는 100% 지급</td>
            </tr>
            {/* 상속연금형 */}
            <tr>
              <td className="border border-gray-300 p-2 text-center" colSpan={2} rowSpan={2}>상속연금형</td>
              <td className="border border-gray-300 p-2 text-center" rowSpan={2}>연금지급 개시나이 계약해당일부터 종신까지</td>
              <td className="border border-gray-300 p-2">연금지급 개시 후 보험기간 중 매년 계약해당일에 피보험자가 살아있을 때</td>
              <td className="border border-gray-300 p-2">연금지급 개시할 때의 계약자적립액에 상속연금형 선택비율을 곱한 금액을 기준으로 공시이율을 적용하여 계산한 이자를 연금액으로 지급</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">연금지급 개시 후 보험기간 중 피보험자가 사망하였을 때</td>
              <td className="border border-gray-300 p-2">사망시점의 계약자적립액 지급</td>
            </tr>
            {/* 확정연금형 - 기간선택형 */}
            <tr>
              <td className="border border-gray-300 p-2 text-center" rowSpan={2}>확정<br/>연금형</td>
              <td className="border border-gray-300 p-2 text-center">기간<br/>선택형</td>
              <td className="border border-gray-300 p-2 text-center" rowSpan={2}>연금지급 개시나이 계약해당일부터 최종연금 지급일까지</td>
              <td className="border border-gray-300 p-2">연금지급 개시 후 보험기간 중 연금지급기간의 매년 계약해당일</td>
              <td className="border border-gray-300 p-2">연금지급 개시할 때의 계약자적립액에 확정연금형 선택비율을 곱한 금액을 기준으로 계약자가 선택한 확정기간 동안 분할계산한 금액을 지급<br/>(5년, 10년, 15년, 20년, 30년 중 선택)</td>
            </tr>
            {/* 확정연금형 - 금액선택형 */}
            <tr>
              <td className="border border-gray-300 p-2 text-center">금액<br/>선택형</td>
              <td className="border border-gray-300 p-2">연금지급 개시 후 보험기간 중 연금지급기간의 매년 계약해당일</td>
              <td className="border border-gray-300 p-2">연금지급 개시할 때의 계약자적립액에 확정연금형 선택비율을 곱한 금액을 기준으로 회사가 정한 지급한도(연금지급 개시할 때의 계약자적립액에 확정연금형 선택비율을 곱한 금액의 5%, 10%, 15%, 20%에 해당하는 연금액선택) 내에서 계약자가 선택한 연금액을 지급</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg text-sm mt-4">
        <p>※ 기타 자세한 사항은 보험 계약 체결 전, 상품설명서 및 약관을 반드시 읽어보시기 바랍니다.</p>
      </div>
    </div>

    {/* 연금지급예시 */}
    <div className="space-y-6">
      <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">연금지급예시</h2>
      
      {/* 보증형 */}
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-[#1e3a8a]">◉ 보증형</h3>
          <div className="text-right text-xs text-gray-600">
            <p>단위 : 달러 (달러미만절사)</p>
            <p>예시기준 : 남자 40세, 5년납, 60세연금지급개시, 월보험료 200달러</p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-gray-300 p-2" colSpan={4} rowSpan={2}>연금지급 개시 후 적립이율</th>
                <th className="border border-gray-300 p-2" colSpan={3}>연금수령액</th>
              </tr>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-gray-300 p-2">최저보증이율 가정<br/>(5년이내 1.0%<br/>5년초과 0.7%)</th>
                <th className="border border-gray-300 p-2">평균공시이율과 현<br/>재공시이율 중 낮은<br/>이율 2.5% 가정</th>
                <th className="border border-gray-300 p-2">현재 공시이율 4.69%<br/>가정</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 text-center" rowSpan={2}>종신연금형</td>
                <td className="border border-gray-300 p-2 text-center" rowSpan={2}>개인연금형</td>
                <td className="border border-gray-300 p-2 text-center" rowSpan={2}>23년보증,조기집<br/>중배수3.0배</td>
                <td className="border border-gray-300 p-2 text-center">보증지급기간이내</td>
                <td className="border border-gray-300 p-2 text-center">714</td>
                <td className="border border-gray-300 p-2 text-center">909</td>
                <td className="border border-gray-300 p-2 text-center">1,317</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center">보증지급기간이후</td>
                <td className="border border-gray-300 p-2 text-center">238</td>
                <td className="border border-gray-300 p-2 text-center">303</td>
                <td className="border border-gray-300 p-2 text-center">439</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center" colSpan={2} rowSpan={2}>상속연금형</td>
                <td className="border border-gray-300 p-2 text-center" colSpan={2}>연금연액</td>
                <td className="border border-gray-300 p-2 text-center">129</td>
                <td className="border border-gray-300 p-2 text-center">462</td>
                <td className="border border-gray-300 p-2 text-center">980</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center" colSpan={2}>피보험자 사망시</td>
                <td className="border border-gray-300 p-2 text-center">18,600</td>
                <td className="border border-gray-300 p-2 text-center">18,600</td>
                <td className="border border-gray-300 p-2 text-center">21,004</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center" rowSpan={2}>확정연금형</td>
                <td className="border border-gray-300 p-2 text-center" rowSpan={2}>기간선택형</td>
                <td className="border border-gray-300 p-2 text-center" colSpan={2}>10년</td>
                <td className="border border-gray-300 p-2 text-center">1,909</td>
                <td className="border border-gray-300 p-2 text-center">2,063</td>
                <td className="border border-gray-300 p-2 text-center">2,546</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center" colSpan={2}>20년</td>
                <td className="border border-gray-300 p-2 text-center">987</td>
                <td className="border border-gray-300 p-2 text-center">1,158</td>
                <td className="border border-gray-300 p-2 text-center">1,560</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 연금지급 관련 알아두실 사항 */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[#1e3a8a]">연금지급 관련 알아두실 사항</h3>
        <div className="space-y-2 text-sm">
          <p className="text-gray-700">● 위의 연금지급개시 시 계약자적립액은 가입 당시의 주계약 납입보험료를 기준으로 작성된 것이므로, 계약내용의 변경이 있을 경우 또는 공시이율이 변동 될 경우 계약자적립액이 달라질 수 있습니다.</p>
          <p className="text-gray-700">● 연금액의 계산은 『공시이율』을 적용하여 계산되기 때문에 공시이율이 변경되면 연금액도 변경됩니다.</p>
          <p className="text-gray-700">● 공시이율은 계약일 기준으로 5년 이내에는 연복리 1.0%, 5년 초과하는 경우에는 연복리 0.7%를 최저보증이율로 적용합니다.</p>
          <p className="text-gray-700">● 위의 적립이율은 현재(2026년 6월 기준)의 공시이율(4.69%)과 최저보증이율(5년이내 1.0%, 5년초과 0.7%)로 예시하였습니다. 보장내용에 관련된 사항은 보험계약자의 오해를 방지하기 위해 보험금 지급에 관한 약관내용의 일부를 선별하여 요약한 것이므로 보다 자세한 내용은 약관을 필히 확인하시기 바립니다.</p>
          <p className="text-gray-700">● 상기 연금개시시점의 계약자적립액은 "연금개시시점"과 "계약일로부터 30년 경과시점의 연계약해당일" 중 먼저 도래하는 시점의 최저계약자적립액 보증을 반영하여 예시한 금액입니다.</p>
          <p className="text-gray-700">● "연금개시시점"과 "계약일로부터 30년 경과시점의 연계약해당일" 중 "연금개시시점"이 먼저 도래하는 경우, "연금개시시점"의 최저계약자적립액 보증은 연금을 개시할 경우에만 적용되며 연금을 개시하지 않을 경우 보증되지 않습니다.</p>
        </div>
      </div>
    </div>
  </div>
  )
}
