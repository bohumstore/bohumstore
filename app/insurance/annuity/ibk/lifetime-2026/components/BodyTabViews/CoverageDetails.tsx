import React from 'react'

export default function CoverageDetails() {
  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-8 py-3 md:py-4">
      <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">보장내용</h2>

      {/* 연금지급형태 변경 시 해당 */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">연금지급형태 변경 시 해당</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[10px] sm:text-xs md:text-sm">
                <thead>
                  <tr className="bg-[#1e3a8a] text-white">
                    <th className="border border-gray-300 p-1.5 sm:p-2 md:p-3 font-semibold text-center align-middle leading-tight" colSpan={2}>구분</th>
                    <th className="border border-gray-300 p-1.5 sm:p-2 md:p-3 font-semibold text-center align-middle leading-tight">지급사유</th>
                    <th className="border border-gray-300 p-1.5 sm:p-2 md:p-3 font-semibold text-center align-middle leading-tight">지급액</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 bg-gray-100 font-semibold text-center align-middle leading-tight" rowSpan={4}>종신<br />연금형</td>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 bg-gray-100 font-semibold text-center align-middle leading-tight">기본<br className="sm:hidden" />연금형</td>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">피보험자가<br />매년 보험계약해당일에<br />살아있을 때</td>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">[연금개시시점의 계약자적립금 X 종신연금형 분할비율]을<br />계산한 금액을 기준으로 계산한 연금액을 지급<br />(10년, 20년, 30년, 100세((101세-연금개시나이)년)보증,<br />기대여명 보증지급</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 bg-gray-100 font-semibold text-center align-middle leading-tight">조기<br className="sm:hidden" />집중형</td>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">피보험자가<br />매년 보험계약해당일에<br />살아있을 때</td>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">[연금개시시점의 계약자적립금 X 종신연금형 분할비율]을<br />계산한 금액을 기준으로 연금개시후 10년동안(10회까지)의<br />연금연액이 10년 이후 (11 회부터)의<br />연금연액의 1.5배, 2배 또는 3배가 되도록 계산한 연금액을 지급<br />(10년, 20년, 30년, 100세 ((101세 - 연금개시나이)년) 보증지급)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 bg-gray-100 font-semibold text-center align-middle leading-tight" rowSpan={2}>부부연금형<br />(연금지급형태<br />변경 시에 한함)</td>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">주피보험자가<br />매년 보험계약해당일에<br />살아있을 때</td>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">[연금개시시점의 계약자적립금 X 종신연금형 분할비율]을 계산한 금액을<br />기준으로 계산한 연금액을 지급 (10년, 20년, 30년, 100세((101세 - 연금<br />개시나이)년) 보증지급)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">주피보험자가<br />연금개시 후에 사망하고,<br />종피보험자가<br />보증지급기간 이후에<br />매년 보험계약해당일에<br />살아있을 때</td>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">주피보험자가 생존할 때 받은<br />연금연액의 70%를 기준으로 계산한 연금액을 지급</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 bg-gray-100 font-semibold text-center align-middle leading-tight" colSpan={2}>확정<br className="sm:hidden" />연금형</td>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">연금지급기간<br />(5년, 10년, 15년, 20년,<br />25년, 30년, 60년, 100세<br />((101세-연금개시나이)년))의<br />매년 보험계약해당일</td>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">[연금개시시점의 계약자적립금 X 확정연금형 분할비율]을<br />계산한 금액을 기준으로 계약자가 선택한<br />연금지급기간동안 나누어 산출한 연금액을<br />피보험자의 생사여부와 관계없이 연금지급기간동안 지급</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 bg-gray-100 font-semibold text-center align-middle leading-tight" colSpan={2}>상속<br className="sm:hidden" />연금형</td>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">피보험자가<br />매년 보험계약해당일에<br />살아있을 때</td>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">[연금개시시점의 계약자적립금 X 상속연금형 분할비율]을<br />계산한 금액을 기준으로 직전 1년간의 공시이율에 따라<br />계산한 이자를 연금액으로 지급</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 bg-gray-100 font-semibold text-center align-middle leading-tight" colSpan={2}>일시<br className="sm:hidden" />생활자금형</td>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">피보험자가<br />연금개시시점에<br />살아있을 때</td>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">[연금개시시점의 계약자적립액 X 일시생활자금 분할비율]을<br />계약자적립액에서 인출하여 지급</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-2 text-xs text-gray-700 mt-4">
              <div>※ 일시생활자금 또는 2가지 이상의 연금지급형태를 선택하신 경우에는 연금개시시점의 계약자적립액에 선택하신 연금지급형태별 분할비율을 곱하여 일시생활자금 및 연금지급형태별 연금액을 계산하여 드립니다. 일시생활자금의 분할비율 및 연금지급형태별 분할비율의 합계는 100%가 되어야 합니다.</div>
              <div>※ 종신연금형의 경우 연금개시후 보증지급기간 안에 사망시에는 보증기간까지의 미지급된 연금연액을 "공시이율로 할인하여 계산한 금액을 일시금으로 지급받는 방법"과 "연금지급주기에 따라 지급받는 방법" 중 선택한 방법에 따라 해당 금액을 지급합니다.</div>
              <div>※ 확정연금형의 경우 연금개시후 생사여부와 관계없이 확정지급기간까지의 연금액을 드립니다.</div>
              <div>※ 종신연금형의 경우 생존연금 지급개시 후 보증지급횟수까지 지급되지 않은 생존연금을 보험료 및 해약환급금 산출방법서에 따라 공시이율로 할인하여 선지급할 수 있습니다.</div>
              <div>※ 연금지급형태의 100세 보증 및 100세 확정은 피보험자의 보험나이를 기준으로 하며, 100세 보험년도 말까지 보증 또는 확정 지급합니다.</div>
              <div>※ 상속연금형의 경우 연금개시후 피보험자가 사망하는 경우 그 시점의 상속연금형 계약자적립액을 지급합니다. 상속연금형 계약자적립액이란 연금개시시점의 계약자적립액을 공시이율로 적립한 금액에서 연금 발생분을 뺀 나머지 금액을 공시이율로 적립한 금액으로 이 보험의 보험료 및 해약환급금 산출방법서에서 정한 바에 따라 계산합니다.</div>
              <div>※ 연금을 매월, 매3개월, 매6개월로 나누어 지급할 경우에는 월, 3개월, 6개월 동안 공시이율로 적립한 이자를 더하여 드립니다.</div>
              <div>※ 연금개시전 보험기간 중 피보험자가 사망한 경우에는 최저사망계약자적립액과 사망한 날을 기준으로 계산한 계약자적립액 중 큰 금액을 지급합니다.</div>
            </div>
          </div>
        </div>
      </div>

      {/* 해약환급금 예시 */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">해약환급금 예시</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <div className="flex justify-end">
              <div className="text-xs text-gray-600">기준 : 남자 40세, 10년납, 65세 연금개시, 월납 30만원 (단위:원)</div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-[#1e3a8a] text-white">
                    <th className="border border-gray-300 p-2 font-semibold text-center align-middle" rowSpan={2}>경과기간</th>
                    <th className="border border-gray-300 p-2 font-semibold text-center align-middle" rowSpan={2}>납입<br />보험료</th>
                    <th className="border border-gray-300 p-2 font-semibold text-center align-middle" rowSpan={2}>특별계정<br />투입금액</th>
                    <th className="border border-gray-300 p-2 font-semibold text-center align-middle" colSpan={2}>투자수익률 -1.00% 가정<br />순수익률(연 -4.96%)</th>
                    <th className="border border-gray-300 p-2 font-semibold text-center align-middle" colSpan={2}>투자수익률 2.50% 가정<br />순수익률(연 -1.46%)</th>
                    <th className="border border-gray-300 p-2 font-semibold text-center align-middle" colSpan={2}>투자수익률 3.75% 가정<br />순수익률(연 -0.21%)</th>
                  </tr>
                  <tr className="bg-[#1e3a8a] text-white">
                    <th className="border border-gray-300 p-2 font-semibold text-center align-middle">해약환급금</th>
                    <th className="border border-gray-300 p-2 font-semibold text-center align-middle">환급률</th>
                    <th className="border border-gray-300 p-2 font-semibold text-center align-middle">해약환급금</th>
                    <th className="border border-gray-300 p-2 font-semibold text-center align-middle">환급률</th>
                    <th className="border border-gray-300 p-2 font-semibold text-center align-middle">해약환급금</th>
                    <th className="border border-gray-300 p-2 font-semibold text-center align-middle">환급률</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">3개월</td>
                    <td className="border border-gray-300 p-2 text-center">900,000</td>
                    <td className="border border-gray-300 p-2 text-center">824,760</td>
                    <td className="border border-gray-300 p-2 text-center">131,887</td>
                    <td className="border border-gray-300 p-2 text-center">14.6%</td>
                    <td className="border border-gray-300 p-2 text-center">136,658</td>
                    <td className="border border-gray-300 p-2 text-center">15.1%</td>
                    <td className="border border-gray-300 p-2 text-center">138,330</td>
                    <td className="border border-gray-300 p-2 text-center">15.3%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">6개월</td>
                    <td className="border border-gray-300 p-2 text-center">1,800,000</td>
                    <td className="border border-gray-300 p-2 text-center">1,649,520</td>
                    <td className="border border-gray-300 p-2 text-center">966,642</td>
                    <td className="border border-gray-300 p-2 text-center">53.7%</td>
                    <td className="border border-gray-300 p-2 text-center">983,300</td>
                    <td className="border border-gray-300 p-2 text-center">54.6%</td>
                    <td className="border border-gray-300 p-2 text-center">989,161</td>
                    <td className="border border-gray-300 p-2 text-center">54.9%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">9개월</td>
                    <td className="border border-gray-300 p-2 text-center">2,700,000</td>
                    <td className="border border-gray-300 p-2 text-center">2,474,280</td>
                    <td className="border border-gray-300 p-2 text-center">1,790,115</td>
                    <td className="border border-gray-300 p-2 text-center">66.3%</td>
                    <td className="border border-gray-300 p-2 text-center">1,825,721</td>
                    <td className="border border-gray-300 p-2 text-center">67.6%</td>
                    <td className="border border-gray-300 p-2 text-center">1,838,299</td>
                    <td className="border border-gray-300 p-2 text-center">68.0%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">1년</td>
                    <td className="border border-gray-300 p-2 text-center">3,600,000</td>
                    <td className="border border-gray-300 p-2 text-center">3,299,040</td>
                    <td className="border border-gray-300 p-2 text-center">2,602,157</td>
                    <td className="border border-gray-300 p-2 text-center">72.2%</td>
                    <td className="border border-gray-300 p-2 text-center">2,663,718</td>
                    <td className="border border-gray-300 p-2 text-center">73.9%</td>
                    <td className="border border-gray-300 p-2 text-center">2,685,550</td>
                    <td className="border border-gray-300 p-2 text-center">74.5%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">2년</td>
                    <td className="border border-gray-300 p-2 text-center">7,200,000</td>
                    <td className="border border-gray-300 p-2 text-center">6,598,080</td>
                    <td className="border border-gray-300 p-2 text-center">5,733,034</td>
                    <td className="border border-gray-300 p-2 text-center">79.6%</td>
                    <td className="border border-gray-300 p-2 text-center">5,967,312</td>
                    <td className="border border-gray-300 p-2 text-center">82.8%</td>
                    <td className="border border-gray-300 p-2 text-center">6,051,719</td>
                    <td className="border border-gray-300 p-2 text-center">84.0%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">3년</td>
                    <td className="border border-gray-300 p-2 text-center">10,800,000</td>
                    <td className="border border-gray-300 p-2 text-center">9,897,120</td>
                    <td className="border border-gray-300 p-2 text-center">8,669,140</td>
                    <td className="border border-gray-300 p-2 text-center">80.2%</td>
                    <td className="border border-gray-300 p-2 text-center">9,183,368</td>
                    <td className="border border-gray-300 p-2 text-center">85.0%</td>
                    <td className="border border-gray-300 p-2 text-center">9,371,620</td>
                    <td className="border border-gray-300 p-2 text-center">86.7%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">4년</td>
                    <td className="border border-gray-300 p-2 text-center">14,400,000</td>
                    <td className="border border-gray-300 p-2 text-center">13,196,160</td>
                    <td className="border border-gray-300 p-2 text-center">11,401,080</td>
                    <td className="border border-gray-300 p-2 text-center">79.1%</td>
                    <td className="border border-gray-300 p-2 text-center">12,298,140</td>
                    <td className="border border-gray-300 p-2 text-center">85.4%</td>
                    <td className="border border-gray-300 p-2 text-center">12,631,883</td>
                    <td className="border border-gray-300 p-2 text-center">87.7%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">5년</td>
                    <td className="border border-gray-300 p-2 text-center">18,000,000</td>
                    <td className="border border-gray-300 p-2 text-center">16,495,200</td>
                    <td className="border border-gray-300 p-2 text-center">13,919,553</td>
                    <td className="border border-gray-300 p-2 text-center">77.3%</td>
                    <td className="border border-gray-300 p-2 text-center">15,297,537</td>
                    <td className="border border-gray-300 p-2 text-center">84.9%</td>
                    <td className="border border-gray-300 p-2 text-center">15,818,636</td>
                    <td className="border border-gray-300 p-2 text-center">87.8%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">6년</td>
                    <td className="border border-gray-300 p-2 text-center">21,600,000</td>
                    <td className="border border-gray-300 p-2 text-center">19,794,240</td>
                    <td className="border border-gray-300 p-2 text-center">16,215,350</td>
                    <td className="border border-gray-300 p-2 text-center">75.0%</td>
                    <td className="border border-gray-300 p-2 text-center">18,167,116</td>
                    <td className="border border-gray-300 p-2 text-center">84.1%</td>
                    <td className="border border-gray-300 p-2 text-center">18,917,488</td>
                    <td className="border border-gray-300 p-2 text-center">87.5%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">7년</td>
                    <td className="border border-gray-300 p-2 text-center">25,200,000</td>
                    <td className="border border-gray-300 p-2 text-center">23,093,280</td>
                    <td className="border border-gray-300 p-2 text-center">18,279,356</td>
                    <td className="border border-gray-300 p-2 text-center">72.5%</td>
                    <td className="border border-gray-300 p-2 text-center">20,892,073</td>
                    <td className="border border-gray-300 p-2 text-center">82.9%</td>
                    <td className="border border-gray-300 p-2 text-center">21,913,507</td>
                    <td className="border border-gray-300 p-2 text-center">86.9%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">8년</td>
                    <td className="border border-gray-300 p-2 text-center">28,800,000</td>
                    <td className="border border-gray-300 p-2 text-center">26,504,640</td>
                    <td className="border border-gray-300 p-2 text-center">20,112,256</td>
                    <td className="border border-gray-300 p-2 text-center">69.8%</td>
                    <td className="border border-gray-300 p-2 text-center">23,469,069</td>
                    <td className="border border-gray-300 p-2 text-center">81.4%</td>
                    <td className="border border-gray-300 p-2 text-center">24,803,789</td>
                    <td className="border border-gray-300 p-2 text-center">86.1%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">9년</td>
                    <td className="border border-gray-300 p-2 text-center">32,400,000</td>
                    <td className="border border-gray-300 p-2 text-center">29,916,000</td>
                    <td className="border border-gray-300 p-2 text-center">21,694,288</td>
                    <td className="border border-gray-300 p-2 text-center">66.9%</td>
                    <td className="border border-gray-300 p-2 text-center">25,873,561</td>
                    <td className="border border-gray-300 p-2 text-center">79.8%</td>
                    <td className="border border-gray-300 p-2 text-center">27,563,973</td>
                    <td className="border border-gray-300 p-2 text-center">85.0%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">10년</td>
                    <td className="border border-gray-300 p-2 text-center">36,000,000</td>
                    <td className="border border-gray-300 p-2 text-center">33,327,360</td>
                    <td className="border border-gray-300 p-2 text-center">23,016,617</td>
                    <td className="border border-gray-300 p-2 text-center">63.9%</td>
                    <td className="border border-gray-300 p-2 text-center">28,089,677</td>
                    <td className="border border-gray-300 p-2 text-center">78.0%</td>
                    <td className="border border-gray-300 p-2 text-center">30,177,542</td>
                    <td className="border border-gray-300 p-2 text-center">83.8%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">15년</td>
                    <td className="border border-gray-300 p-2 text-center">36,000,000</td>
                    <td className="border border-gray-300 p-2 text-center">33,327,360</td>
                    <td className="border border-gray-300 p-2 text-center">15,023,874</td>
                    <td className="border border-gray-300 p-2 text-center">41.7%</td>
                    <td className="border border-gray-300 p-2 text-center">24,304,880</td>
                    <td className="border border-gray-300 p-2 text-center">67.5%</td>
                    <td className="border border-gray-300 p-2 text-center">28,570,013</td>
                    <td className="border border-gray-300 p-2 text-center">79.3%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">20년</td>
                    <td className="border border-gray-300 p-2 text-center">36,000,000</td>
                    <td className="border border-gray-300 p-2 text-center">33,327,360</td>
                    <td className="border border-gray-300 p-2 text-center">5,752,299</td>
                    <td className="border border-gray-300 p-2 text-center">15.9%</td>
                    <td className="border border-gray-300 p-2 text-center">18,196,977</td>
                    <td className="border border-gray-300 p-2 text-center">50.5%</td>
                    <td className="border border-gray-300 p-2 text-center">24,753,266</td>
                    <td className="border border-gray-300 p-2 text-center">68.7%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">25년</td>
                    <td className="border border-gray-300 p-2 text-center">36,000,000</td>
                    <td className="border border-gray-300 p-2 text-center">33,327,360</td>
                    <td className="border border-gray-300 p-2 text-center">-</td>
                    <td className="border border-gray-300 p-2 text-center">0.0%</td>
                    <td className="border border-gray-300 p-2 text-center">9,790,276</td>
                    <td className="border border-gray-300 p-2 text-center">27.1%</td>
                    <td className="border border-gray-300 p-2 text-center">18,617,413</td>
                    <td className="border border-gray-300 p-2 text-center">51.7%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 연금액 예시 */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">연금액 예시</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <div className="flex justify-end">
              <div className="text-xs text-gray-600">기준 : 남자 40세, 10년납, 65세 연금개시, 월납 30만원 (단위:원)</div>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-[#1e3a8a] text-white">
                    <th className="border border-gray-300 p-2 font-semibold text-center align-middle">구분</th>
                    <th className="border border-gray-300 p-2 font-semibold text-center align-middle">투자수익률 -1.00% 가정<br />순수익률(연 -4.96%)</th>
                    <th className="border border-gray-300 p-2 font-semibold text-center align-middle">투자수익률 2.50% 가정<br />순수익률(연 -1.46%)</th>
                    <th className="border border-gray-300 p-2 font-semibold text-center align-middle">투자수익률 3.75% 가정<br />순수익률(연 -0.21%)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 bg-gray-100 font-semibold text-center">연금개시시점 최저연금기준금액(①)</td>
                    <td className="border border-gray-300 p-2 text-center">88,320,000</td>
                    <td className="border border-gray-300 p-2 text-center">88,320,000</td>
                    <td className="border border-gray-300 p-2 text-center">88,320,000</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 bg-gray-100 font-semibold text-center">연금개시시점 계약자적립액(②)</td>
                    <td className="border border-gray-300 p-2 text-center">0</td>
                    <td className="border border-gray-300 p-2 text-center">9,790,276</td>
                    <td className="border border-gray-300 p-2 text-center">18,617,413</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 bg-gray-100 font-semibold text-center">연금개시시점 (①과② 중 큰금액 (③))</td>
                    <td className="border border-gray-300 p-2 text-center">88,320,000</td>
                    <td className="border border-gray-300 p-2 text-center">88,320,000</td>
                    <td className="border border-gray-300 p-2 text-center">88,320,000</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 bg-gray-100 font-semibold text-center">기본지급률 (④)</td>
                    <td className="border border-gray-300 p-2 text-center">4.70%</td>
                    <td className="border border-gray-300 p-2 text-center">4.70%</td>
                    <td className="border border-gray-300 p-2 text-center">4.70%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 bg-gray-100 font-semibold text-center">장기유지 가산율 (⑤)</td>
                    <td className="border border-gray-300 p-2 text-center">16.00%</td>
                    <td className="border border-gray-300 p-2 text-center">16.00%</td>
                    <td className="border border-gray-300 p-2 text-center">16.00%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 bg-gray-100 font-semibold text-center">연금 연지급액(③ x ④ x (1+⑤))</td>
                    <td className="border border-gray-300 p-2 text-center">4,815,206</td>
                    <td className="border border-gray-300 p-2 text-center">4,815,206</td>
                    <td className="border border-gray-300 p-2 text-center">4,815,206</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-2 text-xs text-gray-700 mt-4">
              <div className="text-red-600">※ 이 보험계약은 납입한 보험료 중 사업비를 차감한 후 특별계정(펀드)으로 투입·운용되고, 특별계정(펀드) 수익률이 반영된 특별계정계약자적립액에서 보증비용 등이 차감됩니다.</div>
              <div>※ 상기 순수익률은 예시된 투자수익률에서 최저사망적립액 보증비용 및 실적배당 종신연금 보증비용이 차감된 후의 수익률입니다.</div>
              <div>※ 특별계정(펀드) 투자수익률은 펀드의 기준가격의 변동으로 계산되며, 특별계정운용보수, 증권거래비용 및 기타비용은 매일 차감되어 기준가격에 반영되어 있습니다.</div>
              <div>※ 해약환급금은 특별계정 수익률에 따라 매일 변동하며, 중도해지시 특별계정 계약자적립액에서 미상각신계약비(해약공제액)를 차감하므로 해약환급금은 납입보험료보다 적거나 없을 수도 있습니다.</div>
              <div>※ 해약환급금에는최저보증이 없어 원금손실이 발생할 수 있으며, 그 손실은 모두 계약자에게 귀속됩니다.</div>
              <div>※ 상기 해약환급률은 투자수익률이 경과기간 동안 일정하게 유지된다고 가정하였을 때 계약자가 납입한 보험료 대비 해약환급금의 비율입니다.</div>
              <div>※ 상기 예시된 금액 및 해약환급률 등이 미래의 수익을 보장하는 것은 아닙니다.</div>
              <div>※ 변액보험 특별계정(펀드)의 수익률 및 자산구성내역 등은 생명보험협회 홈페이지(www.klia.or.kr) "공시실 ▶ 상품비교공시 ▶ 변액보험"을 통해 비교·확인하실 수 있습니다.</div>
              <div>※ 상기예시금액의 투자수익률은 -1%, 감독규정 제1 -2조 제13호에 따른 평균공시이율 2.50% 및 동 이율의 1.5배인 3.75%를 기준으로 계산한 금액입니다.</div>
              <div>※ 평균공시이율은 감독원장이 정하는 바에 따라 산정한 전체보험회사 공시이율의 평균으로, 전년도 8월말 기준 직전 12개월간 보험회사 평균공시이율입니다.</div>
              <div>※ 상기 예시된 금액은 세전 기준이며, 관계 법령에 따라 보험차익에 대한 이자소득세가 과세 될 수 있습니다.</div>
              <div className="text-red-600">※ 연금기준금액은 연금개시후 보험기간에 연금지급의 기준이 되는 금액으로서 해지할 때 지급되는 금액이 아니며 중도해지하는 경우 해약환급금이 지급됩니다.</div>
              <div>※ 위의 연금액은 연금지급개시나이 계약해당일의 계약자적립액과 연금기준금액 중 큰 금액에 실적배당 종신연금 지급률을 곱한 금액으로 연금개시 후 보험기간동안 동일하게 적용됩니다.</div>
              <div>※ 보험기간 중 피보험자가 사망하였을 경우에는 사망당시의 계약자적립액과 최저사망적립액 중 큰 금액을 계약자에게 지급하고 이 계약은 더 이상 효력이 없습니다.</div>
              <div>※ 연금개시 후 보험기간에 중도인출을 할 경우 연금기준금액 및 계약자적립액은 감소하며, 이에 따라 연금 연지급액 및 연금기준금액도 상기예시보다 작아집니다.</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}