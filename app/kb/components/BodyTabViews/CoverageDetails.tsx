import React from 'react'

export default function CoverageDetails() {
  return (
  <div className="space-y-8 px-4 py-6">
    {/* 연금개시전 보험기간 */}
    <div className="space-y-4">
      <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">1. 연금개시전 보험기간</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#1e3a8a]">
            <th className="border border-gray-300 p-3 text-white">급부명</th>
            <th className="border border-gray-300 p-3 text-white">지급사유</th>
            <th className="border border-gray-300 p-3 text-white">지급금액</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-3">고도재해장해 급여금</td>
            <td className="border border-gray-300 p-3">"연금개시전 보험기간" 중 피보험자가 장해분류표 중 동일한 재해로 여러 신체부위의 장해지급률을 더하여 80% 이상인 장해상태가 되었을 경우(단만, 최초 1회에 한하여 지급)</td>
            <td className="border border-gray-300 p-3 text-center">매월 <span className="font-bold text-[#1e3a8a]">40</span>만원(36회 지급)</td>
          </tr>
        </tbody>
      </table>
      <div className="space-y-2 text-sm text-gray-600">
        <p>주1) 고도재해장해급여금은 매월 보험금 지급사유 발생해당일에 드리며, 최초의 보험금 지급사유 발생해당일부터 3년을 고도재해장해급여금의 지급기간으로 합니다. 단만, 해당월에 보험금 지급사유 발생해당일이 없는 경우 해당월의 마지막 날을 보험금 지급사유 발생해당일로 합니다.</p>
        <p>주2) 피보험자가 연금개시전 보험기간 중 사망하였을 경우에는 사망신의의 연금계약 계약자적립액과 최저사망적립액 중 큰 금액을 지급하여 드립니다.</p>
      </div>
    </div>

    {/* 연금개시후 보험기간 */}
    <div className="space-y-4">
      <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">2. 연금개시후 보험기간</h2>
      <p className="text-gray-600 mb-4">- 계약자는 해당 약관에 따라 연금지급개시전에 연금지급형태 및 연금지급형태의 구성비율, 생활설계자금선택비율을 변경할 수 있습니다.</p>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#1e3a8a]">
            <th className="border border-gray-300 p-3 text-white">급부명</th>
            <th className="border border-gray-300 p-3 text-white">지급사유</th>
            <th className="border border-gray-300 p-3 text-white">지급금액</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-3">생활설계자금</td>
            <td className="border border-gray-300 p-3">피보험자가 연금지급개시일에 살아 있을 때</td>
            <td className="border border-gray-300 p-3">연금지급개시시점의 연금계약 계약자적립액에 "생활설계자금 선택비율"을 곱한 금액을 기준으로 계산한 금액</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">종신연금형</td>
            <td className="border border-gray-300 p-3">피보험자가 매년 보험계약해당일에 살아 있을 때 (20년보증, 100세보증 또는 기대여명보증시)</td>
            <td className="border border-gray-300 p-3">연금지급개시시점의 연금계약 계약자적립액에 (1-생활설계자금 선택비율)을 곱한 금액을 기준으로 계산한 연금액 지급</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">확정연금형</td>
            <td className="border border-gray-300 p-3">"연금개시후 보험기간" 중 매년 보험계약 해당일</td>
            <td className="border border-gray-300 p-3">연금지급개시시점의 연금계약 계약자적립액에 (1-생활설계자금 선택비율)을 곱한 금액을 기준으로 계산한 연금액을 확정 연금지급기간 (5년, 10년, 15년, 20년) 동안 지급</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">상속연금형</td>
            <td className="border border-gray-300 p-3">"연금개시후 보험기간" 중 피보험자가 매년 보험계약해당일에 살아있을 때</td>
            <td className="border border-gray-300 p-3">연금지급개시시점의 연금계약 계약자적립액에 (1-생활설계자금 선택비율)을 곱한 금액을 기준으로 공시이율에 의하여 계산한 연금액을 지급 (단만, 피보험자 사망시에는 사망시점의 연금계약 계약자적립액을 연금수익자에게 지급)</td>
          </tr>
        </tbody>
      </table>

      <div className="space-y-2 text-sm text-gray-600">
        <p>주1) "생활설계자금 선택비율"이란 생활설계자금의 인출을 위해 계약자가 직자가 정하는 비율 이내에서 선택한 비율을 말합니다. 단만, "생활설계자금 선택비율"을 별도로 지정하지 않은 경우에는 "생활설계자금 선택비율"을 0%로 하며, 이 경우 생활설계자금을 인출할 수 없고, 연금지급개시시점의 연금계약 계약자적립액 전액을 기준으로 보험료 및 해약환급금 산출방법서에 따라 연금액적 산출합니다. 단만, 기본보험료를 5년(60회)이상 납입하지 않은 경우에는 "생활설계자금 선택비율"을 0%로 합니다.</p>
        <p>주2) 종신연금형의 경우 연금지급개시 후 보증지급기간 안에 피보험자가 사망하더라도 보증지급기간까지의 미지급된 각 연금액을 연금지급일에 드립니다.</p>
        <p>주3) 종신연금형(100세 보증)은 "100세-연금개시나이"를 보증기간 연금액에서 보증지급합니다.</p>
        <p>주4) 확정연금형으로 변경한 경우 연금개시시 후 해당 확정 연금지급기간(5년, 10년, 15년, 20년) 동안에 피보험자가 사망하더라도 각 확정 연금지급기간(5년, 10년, 15년, 20년)까지의 지급되지 않은 각 연금액을 연금지급일에 드립니다.</p>
        <p>주5) 연금액은 "공시이율"을 적용하여 계산되므로 "공시이율"이 변경되면 매년 지급되는 연금액도 변경됩니다.</p>
        <p>주6) 종신연금형의 경우 연금지급 계시전 연금지급률의 계정 등에 따라 생존연금의 증가에게 되는 경우 연금개시 당시의 연금사망률 및 연금계약 계약자적립액을 기준으로 산출한 새로운금을 지급하여 드립니다.</p>
        <p>주7) 상속연금형의 "계약자적립액"이란 연금개시시점의 연금계약 계약자적립액에 "공시이율"로 적립한 금액에서 상속연금형의 연금액 발생분(연금액 계약관리비용 포함)을 뺀 나머지 금액을 공시이율로 적립한 금액으로 "보험료 및 해약환급금 산출방법서"에 정한 바에 따라 계산됩니다.</p>
      </div>
    </div>
  </div>
  )
}
