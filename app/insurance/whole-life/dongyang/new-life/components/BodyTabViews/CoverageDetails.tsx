import React from 'react'

export default function CoverageDetails() {
  return (
  <div className="space-y-8 px-2 sm:px-4 md:px-8 py-4 md:py-6">
    {/* 주계약 */}
    <div className="space-y-4">
      <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">주계약</h2>
      <div className="flex justify-end mb-1">
        <p className="text-xs text-gray-600">예시 기준: 일반심사형, 종신, 5/7/10년납, 월납 (단위: 원)</p>
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
              <td className="border border-gray-300 p-3 text-center text-sm md:text-base">보험료 납입기간 중<br />: 약관 기준의 사망보험금</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3 text-center text-sm md:text-base">보험료 납입기간 이후<br />: 약관 기준의 사망보험금</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3 text-center text-sm md:text-base">세부 지급기준 및 금액 산정은 약관 및 산출방법서에 따릅니다.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="space-y-2 text-sm text-gray-600">
        <p>※ 보험기간 중 피보험자가 사망하거나 약관에서 정하는 보험금 지급사유가 더 이상 발생할 수 없는 경우에는 계약의 효력이 소멸될 수 있습니다.</p>
        <p>※ 보험료 납입기간 중 약관에서 정하는 일정 요건에 해당하는 경우(예: 장해 등) 납입면제가 적용될 수 있습니다.</p>
        <p>※ 해약환급금 일부지급형 상품으로, 중도 해지 시 일반형 대비 환급금이 적을 수 있습니다.</p>
        <p>※ 세부 지급 기준, 정의, 계산 방법 등은 해당 상품의 약관 및 산출방법서를 따릅니다.</p>
        <br />
        <p className="text-red-600">- 상기 내용은 요약된 안내자료이며, 자세한 사항은 약관 및 상품설명서를 참고하시기 바랍니다.</p>
        <p className="text-red-600">- 본 화면은 이해를 돕기 위한 자료로 실제 계약 시 보장 내용과 다를 수 있으며, 보험금 지급의 근거서류가 아닙니다.</p>
      </div>
    </div>
  </div>
  )
}
