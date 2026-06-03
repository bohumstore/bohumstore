import React from 'react'

export default function CoverageDetails() {
  return (
    <div className="space-y-8 px-2 sm:px-4 md:px-8 py-4 md:py-6">
      <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">보장내용</h2>

      {/* 1. 연금개시전 보험기간 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">연금개시전 보험기간</h3>
        <div className="space-y-2">
          <h4 className="font-bold text-[#1e3a8a]">□ 고도재해장해보험금 / 생활자금</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs md:text-sm min-w-[320px]">
              <colgroup>
                <col className="w-[24%]" />
                <col className="w-[46%]" />
                <col className="w-[30%]" />
              </colgroup>
              <thead>
                <tr className="bg-[#1e3a8a] text-white">
                  <th className="border border-gray-300 p-2 text-center">급부명</th>
                  <th className="border border-gray-300 p-2 text-center">지급사유</th>
                  <th className="border border-gray-300 p-2 text-center">지급내용</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 text-center">고도재해장해보험금</td>
                  <td className="border border-gray-300 p-2 leading-relaxed">연금개시전 보험기간 중 피보험자가 장해분류표에서 정한 동일한 재해로 인하여 여러 신체부위의 장해지급률을 더하여 80% 이상인 장해상태가 된 경우 (다만, 최초 1회에 한하여 지급합니다)</td>
                  <td className="border border-gray-300 p-2 text-center">US$ 10,000</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-center">생활자금<br />[1형(생활자금형)에 한함]</td>
                  <td className="border border-gray-300 p-2 leading-relaxed">연금개시전 보험기간 중 생활자금 지급기간(계약일 이후 만 1개월 경과시점부터 만 120개월 경과시점까지)동안 매월 보험계약해당일에 보험계약이 유효한 경우 (생활자금형에 한함)</td>
                  <td className="border border-gray-300 p-2 leading-relaxed">이율확정기간 종료시점의 연금계약 적립액이 일시납보험료가 되도록 매월 계산한 생활자금 해당액</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="space-y-2 text-xs text-gray-600 leading-relaxed">
          <p>㈜ 1. 피보험자가 연금개시전 보험기간 중 사망한 경우에는 사망 당시의 연금계약 적립액(다만, 사망당시의 해약환급금이 연금계약 적립액보다 큰 경우는 해약환급금으로 합니다)과 일시납 보험료(연금계약 적립액의 인출이 있었던 때에는 이에 해당하는 금액을 차감하며, 생활자금형의 경우 이미 지급된 생활자금을 차감합니다) 중 큰 금액을 계약자에게 지급하여 드립니다.</p>
          <p>2. 연금계약 적립액이란 보험료 및 해약환급금 산출방법서에서 정한 바에 따라 계산한 금액으로 연금계약 순보험료(영업보험료에서 위험보험료, 계약체결비용 및 계약관리비용을 뺀 금액)를 공시이율로 납입일부터 일자계산에 의하여 적립한 금액에서 매월 보험계약해당일에 위험보험료, 계약체결비용 및 납입 후 계약관리비용(유지관련비용), 중도인출금액 등을 차감하여 계산한 금액입니다.</p>
          <p>3. 약관의 계약내용의 변경 및 피보험자의 변경에 관한 사항에 따라 계약이 변경되는 경우, 생활자금 해당액은 변경된 계약에 해당하는 금액으로 변경되며, 이율확정기간 종료시점의 연금계약 적립액은 일시납 보험료와 달라질 수 있습니다.</p>
          <p>4. 장해분류표 및 장해지급률은 약관을 참조하시기 바랍니다.</p>
        </div>
      </div>

      {/* 2. 연금개시후 보험기간 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">연금개시후 보험기간</h3>
        
        {/* 최초 계약시 */}
        <div className="space-y-2">
          <h4 className="font-bold text-[#1e3a8a]">□ 연금</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs md:text-sm min-w-[420px]">
              <colgroup>
                <col className="w-[18%]" />
                <col className="w-[16%]" />
                <col className="w-[28%]" />
                <col className="w-[38%]" />
              </colgroup>
              <thead>
                <tr className="bg-[#1e3a8a] text-white">
                  <th className="border border-gray-300 p-2 text-center">연금지급형태</th>
                  <th className="border border-gray-300 p-2 text-center">구분</th>
                  <th className="border border-gray-300 p-2 text-center">지급사유</th>
                  <th className="border border-gray-300 p-2 text-center">지급내용</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 text-center" rowSpan={2}>종신연금형</td>
                  <td className="border border-gray-300 p-2 text-center">보증기간부</td>
                  <td className="border border-gray-300 p-2 leading-relaxed">연금개시후 보험기간 중 피보험자가 매년 보험계약해당일에 살아 있을 경우</td>
                  <td className="border border-gray-300 p-2 leading-relaxed">연금개시시점의 연금계약 적립액을 기준으로 예정 개인연금 생존·사망률을 사용하여 계산한 연금액을 지급(10차년도 또는 20차년도까지 보증지급)<br /><span className="block mt-1">&lt;보증유형&gt;</span><span className="block">- 정액형</span><span className="block">- 5%, 10% 체증형(체증기간 10년)</span></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-center">보증금액부</td>
                  <td className="border border-gray-300 p-2 leading-relaxed">연금개시후 보험기간 중 피보험자가 매년 보험계약해당일에 살아 있을 경우</td>
                  <td className="border border-gray-300 p-2 leading-relaxed">연금개시시점의 연금계약 적립액을 기준으로 예정 개인연금 생존·사망률을 사용하여 계산한 연금액을 지급 (다만, 연금개시후 보험기간 중 피보험자 사망시 이미 지급된 연금총액이 연금개시시점의 연금계약 적립액보다 적을 경우에는 그 차액을 일시금으로 지급)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 신부부형 */}
        <div className="space-y-2">
          <h4 className="font-bold text-[#1e3a8a]">□ 계약내용의 변경에 따라 변경할 수 있는 연금지급형태</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs md:text-sm min-w-[360px]">
              <colgroup>
                <col className="w-[20%]" />
                <col className="w-[32%]" />
                <col className="w-[48%]" />
              </colgroup>
              <thead>
                <tr className="bg-[#1e3a8a] text-white">
                  <th className="border border-gray-300 p-2 text-center">연금지급형태</th>
                  <th className="border border-gray-300 p-2 text-center">지급사유</th>
                  <th className="border border-gray-300 p-2 text-center">지급내용</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 text-center">확정연금형</td>
                  <td className="border border-gray-300 p-2 leading-relaxed">연금개시후 보험기간 중 연금지급기간(10년, 15년, 20년)의 매년 보험계약해당일</td>
                  <td className="border border-gray-300 p-2 leading-relaxed">연금개시시점의 연금계약 적립액을 기준으로 확정된 연금지급기간(10년, 15년, 20년)동안 분할하여 계산한 연금액을 지급</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-center">상속연금형</td>
                  <td className="border border-gray-300 p-2 leading-relaxed">연금개시후 보험기간 중 피보험자가 매년 보험계약해당일에 살아 있을 경우</td>
                  <td className="border border-gray-300 p-2 leading-relaxed">연금개시시점의 연금계약 적립액을 기준으로 계산한 연금액을 지급 (다만, 피보험자 사망시에는 사망시점의 계약자적립액을 지급)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 주석 */}
        <div className="space-y-2 text-xs text-gray-600 leading-relaxed">
          <p>㈜ 1. 연금계약 적립액이란 보험료 및 해약환급금 산출방법서에서 정한 바에 따라 계산한 금액으로 연금계약 순보험료(영업보험료에서 위험보험료, 계약체결비용 및 계약관리비용을 뺀 금액)를 공시이율로 납입일부터 일자계산에 의하여 적립한 금액에서 매월 보험계약해당일에 위험보험료, 계약체결비용 및 납입 후 계약관리비용(유지관련비용), 중도인출금액 등을 차감하여 계산한 금액입니다.</p>
          <p>2. 연금의 계산은 공시이율을 적용하여 계산되기 때문에 공시이율이 변경되면 연금도 변경됩니다.</p>
          <p>3. 종신연금형의 경우, 연금지급 개시전 연금생명표의 개정 등에 따라 연금연액 또는 연금월액이 증가하게 되는 경우 연금개시 당시의 연금생명표 및 계약자적립액을 기준으로 산출한 연금연액 또는 연금월액을 지급하여 드립니다.</p>
          <p>4. 종신연금형(보증기간부) 체증형의 경우, 체증기간 10년간의 연금액은 직전년도 연금액에 체증률 5% 또는 10%로 체증한 금액을 지급하며, 체증기간 10년이 경과한 이후(11차년도 이후)의 연금액은 체증기간 최종년도(10차년도)에 지급된 연금액과 동일한 금액을 지급합니다. 다만, 공시이율이 변경될 경우에는 연금액의 차이가 있을 수 있습니다.</p>
          <p>5. 연금을 매월, 매3개월, 매6개월로 분할하여 지급하는 경우에는 공시이율로 계산된 이자를 더하여 지급합니다.</p>
          <p>6. 종신연금형(보증기간부)의 경우, 연금 지급개시 후 보증지급기간(10년, 20년) 중 피보험자 사망시에는 10년 또는 20년까지의 미지급된 연금연액을 “공시이율로 할인하여 계산한 금액을 일시금으로 지급받는 방법”과 “연금지급주기(매월, 매3개월, 매6개월, 매년)에 따라 지급받는 방법” 중에서 계약자가 선택한 방법에 따라 해당 금액을 지급합니다.</p>
          <p>7. 확정연금형의 경우, 연금 지급개시 후 확정연금 지급기간(10년, 15년, 20년) 중 피보험자 사망시에는 10년, 15년 또는 20년까지의 미지급된 연금연액을 “공시이율로 할인하여 계산한 금액을 일시금으로 지급받는 방법”과 “연금지급주기(매월, 매3개월, 매6개월, 매년)에 따라 지급받는 방법” 중 계약자가 선택한 방법에 따라 해당 금액을 지급합니다.</p>
          <p>8. 상속연금형의 경우, 연금 지급 개시 후 피보험자 사망시에는 사망시점의 계약자적립액을 지급합니다.</p>
          <p>9. 종신연금형(보증기간부)의 경우, 연금지급개시 후 보증지급기간(10년, 20년)까지 지급되지 않은 연금액을 보험료 및 해약환급금 산출방법서에 따라 공시이율로 할인하여 선지급할 수 있습니다.</p>
          <p>10. 생활자금형의 경우, 계약자가 미지급된 생활자금의 수령 방법을 연금지급 개시일 전일까지 선택하지 않은 경우에는 미지급된 생활자금을 연금개시시점의 연금계약 적립액에 더하여 연금지급형태에 따라 연금액으로 지급하여 드립니다.</p>
        </div>
      </div>
    </div>
  )
}
