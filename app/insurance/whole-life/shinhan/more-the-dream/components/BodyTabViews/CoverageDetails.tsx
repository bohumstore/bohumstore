import React from 'react'

export default function CoverageDetails() {
  return (
  <div className="space-y-8 px-2 sm:px-4 md:px-8 py-4 md:py-6">
    {/* 주계약 */}
    <div className="space-y-4">
      <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">주계약</h2>
      <div className="flex justify-end mb-1">
        <p className="text-xs text-gray-600">기준: 남자 40세, 일반심사형, 보험료형, 종신, 5년납, 월납, 30만원 (단위: 원)</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#1e3a8a]">
              <th className="border border-gray-300 p-3 text-white w-1/4 text-sm md:text-base">구분</th>
              <th className="border border-gray-300 p-3 text-white w-1/3 text-sm md:text-base">지급사유</th>
              <th className="border border-gray-300 p-3 text-white w-5/12 text-sm md:text-base">지급금액</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-3 text-center text-sm md:text-base" rowSpan={3}>사망보험금</td>
              <td className="border border-gray-300 p-3 text-center text-sm md:text-base" rowSpan={3}>보험기간 중 피보험자가 사망하였을 때</td>
              <td className="border border-gray-300 p-3 text-center text-sm md:text-base">기본보험료 납입중<br />: (기준사망보험금, 이미 납입한 보험료) 중 큰 금액</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3 text-center text-sm md:text-base">기본보험료 총액을 납입하고 보험료 납입기간 이후<br />: (기준사망보험금, 계약자적립액의 101%, 이미 납입한 보험료) 중 가장 큰 금액</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3 text-center text-sm md:text-base">※ 기준사망보험금<br />
                - 사망시점 7년미만 : 1,066만8,564원<br />
                (보험가입금액의 100%)<br />
                - 사망시점 7년이상 27년미만<br />
                : 1,066만8,564원(보험가입금액의 100%) + 보험계약일에서 7년경과된 계약해당일부터 사망시점까지 "매년 보험가입금액의 5%씩 정액체증한 금액"<br />
                - 사망시점 27년이상 : 2,133만7,128원<br />
                (보험가입금액의 200%)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="space-y-2 text-sm text-gray-600">
        <p>※ 보험기간 중 피보험자가 사망하거나 이 약관에서 정하는 보험금 지급사유가 더 이상 발생할 수 없는 경우에는 이 계약은 그때부터 효력이 없습니다.</p>
        <p>※ 보험료 납입기간 중 피보험자가 「장해분류표 중 동일한 재해 또는 재해이외의 동일한 원인으로 여러 신체부위의 장해지급률을 더하여 50%이상인 장해상태」가 되었을 경우에는 차회 이후의 기본보험료 납입을 면제합니다. 또한, 기본보험료의 납입이 면제된 경우 차회 이후부터 보험료 납입기간 종료일까지 매월 월계약해당일에 정상적으로 기본보험료가 납입된 것으로 보고 계약자적립액을 계산합니다.</p>
        <p>※ 기본보험료 총액을 납입하고 보험료 납입기간이 완료된 이후 계약자적립액의 인출 시 기준사망보험금에서 이를 차감하고, 추가납입보험료 납입액은 기준사망보험금에 더합니다. 다만, 이 계약의 추가납입특약Ⅱ에 의한 추가 계약자적립액 인출 금액과 추가납입특약Ⅱ 보험료 납입액은 기준사망보험금에서 차감하거나 더하지 않습니다.</p>
        <p>※ 7년미만이라 함은 "보험계약일부터 7년이 되는 시점의 계약해당일의 전일"까지를 말합니다. 7년이상 27년미만이라 함은 "보험계약일부터 7년이 되는 시점의 계약해당일"부터 "보험계약일부터 27년이 되는 시점의 계약해당일 전일"까지를 말합니다. 27년이상이라 함은 "보험계약일부터 27년이 되는 시점의 계약해당일" 이후를 말합니다.</p>
        <p>※ 각각의 "보너스 발생일" 전에 피보험자가 사망한 경우에는 각각의 보너스는 발생하지 않고 이 계약의 산출방법서에서 정한 방법에 따라 회사가 적립한 사망 당시의 각각의 "보너스 지급적립액"을 "사망보험금"에 추가하여 지급합니다.</p>
        <p>※ 각각의 "보너스 발생일" 전에 해약환급금 지급사유가 발생한 경우에는 각각의 "보너스 지급적립액"을 계약자에게 지급하지 않습니다. 다만, 약관(회사의 파산선고와 해지)에 따라 계약이 해지된 경우에는 계약이 해지된 시점의 각각의 "보너스 지급적립액"을 해약환급금과 함께 지급합니다.</p>
        <p>※ 위의 "보너스 발생일"이라 함은 약관에서 정한 보너스 발생일을 말하며, 각각의 "보너스 발생일"에 보험료 납입을 연체한 경우에는 연체보험료[기본보험료 총액을 납입하고 보험료 납입기간이 완료된 이후에 해약환급금(다만, 보험계약대출의 원금과 이자를 차감한 금액으로 특약의 해약환급금은 제외된 금액)에서 월대체보험료를 충당할 수 없게 된 경우에는 연체된 월대체보험료 이상의 금액] 납입일을 각각의 "보너스 발생일"로 합니다.</p>
        <p>※ 보험계약대출을 받은 이후 보험금의 지급사유가 발생한 날에 지급금에서 보험계약대출의 원금과 이자를 차감할 수 있으므로 지급금이 없거나 감소할 수 있습니다.</p>
        <br />
        <p className="text-red-600">- 상기 보험상품 관련 내용은 요약된 자료이므로 단순 안내자료로 참고하시기 바라며, 보다 자세한 사항은 약관 및 설명서를 참조하시기 바랍니다.</p>
        <p className="text-red-600">- 이 화면은 가입자의 이해를 돕기 위한 단순 안내자료이므로 실제 보험가입시 발생되는 상품설명서와 내용이 다를 수 있으며 보험금 지급을 위한 근거서류가 될 수 없습니다.</p>
      </div>
    </div>
  </div>
  )
}
