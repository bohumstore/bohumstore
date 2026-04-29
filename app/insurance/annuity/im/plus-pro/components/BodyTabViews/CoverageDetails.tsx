import React from 'react'

export default function CoverageDetails() {
  return (
    <div className="space-y-8 px-2 sm:px-4 md:px-8 py-4 md:py-6">
      <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">보장내용</h2>

      {/* 1. 연금개시전 보험기간 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">1. 연금개시전 보험기간</h3>
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
                <td className="border border-gray-300 p-2 text-center">고도재해장해보험금</td>
                <td className="border border-gray-300 p-2">연금개시전 보험기간 중 발생한 동일한 재해로 피보험자가 장해 분류표 중 여러 신체부위의 장해 지급률을 더하여 80% 이상인 장해상태가 된 경우 (최초 1회한)</td>
                <td className="border border-gray-300 p-2 text-center">1,000만원</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="text-xs text-gray-600">
          <p>주) 1. 피보험자가 연금개시전 보험기간 중 사망한 경우에는 사망당시의 최저사망적립액과 계약자적립액 중 큰 금액을 계약자에게 지급하며, 이 계약은 더 이상 효력이 없습니다.</p>
        </div>
      </div>

      {/* 2. 연금개시후 보험기간 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">2. 연금개시후 보험기간</h3>
        
        {/* 최초 계약시 */}
        <div className="space-y-2">
          <h4 className="font-bold text-[#1e3a8a]">◎ 최초 계약시</h4>
          <p className="text-gray-600">보험가입시점에 정해진 종신연금은 다음과 같이 연금을 지급합니다.</p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs md:text-sm min-w-[280px]">
              <colgroup>
                <col className="w-[8%]" />
                <col className="w-[10%]" />
                <col className="w-[14%]" />
                <col className="w-[34%]" />
                <col className="w-[34%]" />
              </colgroup>
              <thead>
                <tr className="bg-[#1e3a8a] text-white">
                  <th className="border border-gray-300 p-2 text-center" colSpan={3}>구분</th>
                  <th className="border border-gray-300 p-2 text-center">지급사유</th>
                  <th className="border border-gray-300 p-2 text-center">지급금액</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 text-center" rowSpan={3}>종신연금</td>
                  <td className="border border-gray-300 p-2 text-center" rowSpan={2}>기간<br />보증부</td>
                  <td className="border border-gray-300 p-2 text-center">기본형</td>
                  <td className="border border-gray-300 p-2">연금개시후 보험기간 중 피보험자가 매년 연계약해당일에 살아있을 경우</td>
                  <td className="border border-gray-300 p-2">연금개시시점의 계약자적립액을 기준으로 '연금사망률' 및 '공시이율'을 고려하여 산출방법서에 따라 계산한 연금액을 연계약해당일에 지급 (10차년도, 20차년도, 30차년도 또는 80세, 100세까지 보증지급)<br />- 보증지급기간 : 10년, 20년, 30년, 80세, 100세<br />- 연금지급형태 : 정액형, 체증형(5%/10%, 체증 기간 10년)<br />다만, 피보험자가 사망한 경우에는 잔여 보증지급기간 동안 미지급된 연금액 지급</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-center">초기집중강화형</td>
                  <td className="border border-gray-300 p-2">연금개시후 보험기간 중 피보험자가 매년 계약해당일에 살아있을 경우</td>
                  <td className="border border-gray-300 p-2">연금개시시점의 계약자적립액을 기준으로, '연금사망률' 및 '공시이율'을 고려하여 초기집중강화기간(10년)까지는 초기집중강화기간(10년) 이후 연금액의 2배가 되도록 산출방법서에 따라 계산한 연금액을 연계약해당일에 지급 (10차년도, 20차년도, 30차년도 또는 80세, 100세까지 보증지급)<br />- 보증지급기간 : 10년, 20년, 30년, 80세, 100세<br />다만, 피보험자가 사망한 경우에는 잔여 보증지급기간 동안 미지급된 연금액 지급</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-center" colSpan={2}>금액보증부</td>
                  <td className="border border-gray-300 p-2">연금개시후 보험기간 중 피보험자가 매년 계약해당일에 살아있을 경우</td>
                  <td className="border border-gray-300 p-2">연금개시시점의 계약자적립액을 기준으로 '연금사망률' 및 '공시이율'을 고려하여 산출방법서에 따라 계산한 연금액을 연계약해당일에 지급<br />다만, 피보험자가 사망한 경우에는 연금개시시점의 계약자적립액과 이미 지급되어진 연금 총액과의 차액을 일시금으로 지급하며, 이미 지급되어진 연금 총액이 연금개시시점의 계약자적립액보다 많은 경우에는 일시금을 지급하지 않음</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 신부부형 */}
        <div className="space-y-2">
          <h4 className="font-bold text-[#1e3a8a]">신부부형</h4>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs md:text-sm min-w-[280px]">
              <colgroup>
                <col className="w-[25%]" />
                <col className="w-[35%]" />
                <col className="w-[40%]" />
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
                  <td className="border border-gray-300 p-2 text-center">종신연금<br />(기간보증부)</td>
                  <td className="border border-gray-300 p-2">연금개시후 보험기간 중 주피보험자 또는 종피보험자가 매년 연계약해당일에 살아있을 경우</td>
                  <td className="border border-gray-300 p-2">연금개시시점의 계약자적립액을 기준으로 '연금사망률' 및 '공시이율'을 고려하여 산출방법서에 따라 계산한 연금액을 연계약해당일에 지급 (10차년도, 20차년도, 30차년도 또는 80세, 100세까지 보증지급)<br />- 보증지급기간 : 10년, 20년, 30년, 80세, 100세<br />- 연금지급형태 : 정액형<br />다만, 피보험자가 사망한 경우에는 잔여 보증지급기간 동안 미지급된 연금액 지급</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 주석 */}
        <div className="space-y-2 text-xs text-gray-600">
          <p>주) 1. 계약자적립액이란 기본보험료 계약자적립액과 추가납입보험료 계약자적립액으로 구성됩니다. 제35조(계약자적립액의 인출)에서 정한 계약자적립액의 인출이 있을 경우 이를 차감한 금액을 말하며, 세부적인 내용은 산출방법서에서 정한 방법에 따릅니다.</p>
          <p className="pl-4">가. 기본보험료 계약자적립액<br />기본보험료 납입에 따른 계약자적립액으로 공시이율로 적립한 금액을 말합니다. 최저계약자적립액 보증시점마다 기본보험료 계약자적립액이 최저계약자적립액 보증금액보다 적을 경우 최저계약자적립액 보증금액을 기본보험료 계약자적립액으로 합니다.</p>
          <p className="pl-4">나. 추가납입보험료 계약자적립액<br />추가납입보험료 납입에 따른 계약자적립액으로 공시이율로 적립한 금액을 말합니다.</p>
          <p>2. 종신연금의 계산은 공시이율을 적용하여 계산되기 때문에 공시이율이 변경되면 종신연금도 변경됩니다.</p>
          <p>3. 종신연금(기간보증부-기본형) 중 체증형의 경우, 체증기간 10년간의 연금액은 직전년도 연금액에 체증률 5% 또는 10%로 체증한 금액을 지급하며, 체증기간 10년이 지난 이후(11차년도 이후)의 연금액은 체증기간 최종년도(10차년도)에 지급된 연금액과 동일한 금액을 지급합니다. 다만, 공시이율이 변경될 경우에는 연금액의 차이가 있을 수 있습니다.</p>
          <p>4. 종신연금을 매월, 매3개월, 매6개월로 분할하여 지급할 경우에는 산출방법서에 따라 공시이율로 계산된 이자를 더하여 지급합니다.</p>
          <p>5. 종신연금(기간보증부-기본형, 초기집중강화형)의 경우 보증지급기간 동안 연금지급을 보증하며, 보증지급기간 안에 피보험자가 사망하였을 경우에는 잔여 보증지급기간 동안 미지급된 연금액을 "산출방법서에 따라 공시이율로 할인하여 선지급받는 방법"과 "연금지급주기(매월, 매3개월, 매6개월, 매년)에 따라 지급받는 방법" 중 보험수익자가 선택한 방법에 따라 해당 금액을 지급합니다.</p>
          <p>6. 종신연금(기간보증부-기본형, 초기집중강화형)의 경우 종신연금 지급개시 후 보증지급횟수까지 지급되지 않은 연금연액을 산출방법서에 따라 공시이율로 할인하여 선지급할 수 있습니다.</p>
          <p>7. 종신연금(기간보증부, 금액보증부)의 경우 연금이 지급 개시된 이후에는 해지할 수 없습니다.</p>
          <p>8. 초기집중강화기간이란 연금개시일부터 10년시점의 연계약해당일 전일까지를 말하며(연금연액 10회), 연금유형중 종신연금(기간보증부-초기집중강화형)에 한하여 적용합니다.</p>
          <p>9. 종신연금(기간보증부-초기집중강화형)의 경우, 초기집중강화기간 10년이 지난 이후(11차년도 이후)의 연금액은 초기집중강화기간(10년)에 지급된 연금액의 50%로 변경됩니다. 다만, 공시이율이 변경될 경우에는 연금액의 차이가 있을 수 있습니다.</p>
          <p>10. 종신연금의 경우 연금개시전 연금사망률의 개정 등에 따라 연금연액 또는 연금월액이 증가하게 된 때에는 연금개시시점 당시의 연금사망률 및 계약자적립액을 기준으로 산출한 연금연액 또는 연금월액을 지급합니다.</p>
          <p>11. 연금액은 연금액 지급시마다 '연금개시후 계약관리비용(연금액의 일정비율 상당의 금원)'을 차감하여 지급합니다.</p>
        </div>
      </div>
    </div>
  )
}
