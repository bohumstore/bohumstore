import React from 'react'

export default function CoverageDetails() {
  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-8 py-3 md:py-4">
      <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">주계약</h2>

      {/* 연금개시 전 보험기간 */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">연금개시 전 보험기간</h3>
        <div className="text-sm text-gray-600 mb-2 whitespace-nowrap text-right">(기준 : 1구좌)</div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
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
              ※ 다만, 사망하였을 경우에는 계약자적립액과 최저사망적립액 중 큰 금액을 지급
            </div>
          </div>
        </div>
      </div>

      {/* 연금개시 후 보험기간 */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">연금개시 후 보험기간</h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
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
                    <td className="border border-gray-300 p-2 sm:p-3 text-[#1e3a8a] text-xs sm:text-sm text-center">실적배당 종신연금</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm leading-relaxed">연금개시 후 보험기간 중 피보험자가 매년 계약해당일에 살아있을 때</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm leading-relaxed">연금기준금액(다만, 연계약해당일의 계약자적립액이 더 클 경우에는 계약자적립액)을 기준으로 실적배당 종신연금지급률을 적용하여 계산한 실적배당 종신연금 연지급액을 피보험자가 연계약해당일에 살아있을 경우 지급</td>
                </tr>
              </tbody>
            </table>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">
                ※ 다만, 사망하였을 경우에는 계약자적립액과 최저사망적립액 중 큰 금액을 지급
              </div>
              <div className="text-sm text-gray-600">
                ※ 다만, 선지급행복자금 계약자 적립액이 있는 경우 가산하여 지급하여 드립니다.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 기본 설명들 */}
      <div className="space-y-3 text-sm text-gray-600">
        <p>· 보험기간 중 피보험자의 사망으로 인하여 이 약관에서 규정하는 보험금 지급사유가 더 이상 발생할 수 없는 경우에는 "산출방법서"에서 정하는 바에 따라 회사가 적립한 사망당시의 계약자적립액과 최저사망적립액 중 큰 금액을 계약자에게 지급하고 이 계약은 더 이상 효력이 없습니다. 다만, 선지급행복자금 계약자적립액이 있는 경우 가산하여 드립니다.</p>
        <p>· 고도후유장해보험금의 경우 지급사유 발생 최초 1회에 한하여 지급하여 드리며, "산출방법서"에서 정한 바에 따라 계약자적립액 계산시 고도후유장해보험금 지급사유 발생일 이후 최초 도래하는 월계약해당일부터 고도후유장해보험금에 해당하는 위험보험료를 차감하지 않습니다.</p>
        <p>· 「최저사망적립액」이라 함은, 특별계정의 운용실적과 관계 없이 피보험자가 사망하는 경우 보장하는 최저한도의 계약자적립액으로서 사망시점의 "최저연금기준금액"을 말합니다. 다만, 연금개시 후 보험기간에는 사망시점의 "연금기준금액"에서 연금개시 후 보험기간 중 발생한 실적배당 종신연금 연지급액의 합계를 차감한 금액을 말하며, 이 금액이 '0'보다 적은 경우 '0'으로 합니다.</p>
        <p>· 「계약자적립액」은 매일 특별계정의 운용실적을 적용하여 "산출방법서"에서 정한 바에 따라 계산되기 때문에 특별계정의 운용실적이 변경되면 계약자적립액도 변동됩니다.</p>
        <p>· 「최저연금기준금액」이라 함은 계약일 이후부터 연금개시나이 계약해당일(다만, 연금개시 전 보험기간 중 피보험자가 사망한 경우 피보험자가 사망한 날)까지 아래와 같이 계산한 금액을 말합니다.</p>
        <p>(가) 기준 기본보험료 및 기준 추가보험료에 기준 기본보험료 및 기준 추가보험료의 매년 최저연금기준금액비율 해당액을 해당보험료 납입일(해당 월계약해당일 이전에 납입한 기본보험료의 경우는 월계약해당일)을 기준으로 일자 계산하여 더한 금액을 최저연금기준금액으로 합니다.</p>
        <p>(나) 최저연금기준금액비율</p>
        <p>최저연금기준금액을 산출하기 위해 연금개시 전 보험기간 동안 적용되는 비율로 다음과 같이 적용합니다.</p>
        <p className="text-red-600">(1) 계약일부터 20년이 되는 계약해당일의 전일: 7/100</p>
        <p className="text-red-600">(2) 20년 이후부터 연금개시나이 계약해당일까지: 6/100</p>
        <p className="text-red-600">다만, 계약일부터 연금지급개시나이 계약해당일까지의 기간이 20년 미만인 경우 (1)에 따라 7/100로 적용합니다.</p>
        <p className="text-red-600">(3) 대표계약기준(40세 남성, 10년납, 연금개시나이 65세) 복리이자율로 환신시 연복리 4.32%</p>
        <p>(다) (가)에서 (나)에도 불구하고, 연금개시 전 보험기간 중 계약자가 기본보험료를 감액하거나 계약자적립액을 중도인출한 경우의 최저연금기준금액은, 제21조(계약내용의 변경 등) 제7항 및 제37조(중도인출) 제7항에 따라 재계산된 최저연금기준금액에 해당 감액 또는 중도인출 이후 납입한 기준 기본보험료 및 기준 추가보험료에 기준 기본보험료 및 기준 추가보험료의 매년 최저연금기준금액비율 해당액을 해당보험료 납입일(해당 월계약해당일 이전에 납입한 기본보험료의 경우는 월계약해당일)을 기준으로 일자 계산하여 더한 금액을 말합니다.</p>
        <p>· 「연금기준금액」이라 함은 연금개시 후 보험기간에 최저사망적립액 및 실적배당 종신연금 지급의 기준이 되는 금액으로서 연금개시나이 계약해당일의 최저연금기준금액과 계약자적립액 중 큰 금액을 말합니다.</p>
        <p>· 실적배당 종신연금 연지급액의 계산은 연금기준금액(다만, 연계약해당일의 계약자적립액이 더 클 경우에는 계약자적립액)에 실적배당 종신연금지급률을 곱하여 산출합니다.</p>
        <p>· 「실적배당 종신연금 지급률」은 연금개시나이 계약해당일에 아래와 같이 계산한 비율을 말하며, 해당지급률은 연금개시 후 보험기간 동안 동일하게 적용됩니다.</p>
        <p>- 기본 지급률 x ( 1 + 장기유지 가산율+투자실적 가산율)</p>
        <p>· 해당 년의 계약해당일이 없는 경우에는 해당 월의 마지막 날을 계약해당일로 하여 실적배당 종신연금을 지급합니다.</p>
        <p>· 실적배당 종신연금을 매월, 3개월, 6개월로 분할하여 "산출방법서"에 정한 바에 따라 지급받을 수 있습니다.</p>
        <p>· 계약자적립액은 특별계정 운용실적에 따라 매일 변동되므로 최저보증이 이루어지지 않으며 원금손실이 발생 할 수도 있습니다.</p>
        <p>· 계약자가 선지급행복자금을 신청하는 경우 실적배당 종신연금은 선지급행복자금 신청비율만큼 줄어듭니다.</p>
        <p>· 최저연금기준금액은 추가납입 등에 따라 달라지며, 중도에 계약자적립액을 인출할 경우, 보험료의 감액 및 선지급행복자금을 선택할 경우 최저연금기준금액은 감소합니다.</p>
      </div>

      {/* 실적배당종신연금 연지급액 예시표 */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">실적배당종신연금 연지급액 예시표</h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="space-y-3">
            <div className="text-xs text-gray-600 text-right">
              예시기준 : 남자 40세, 60세 연금개시, 기본보험료 30만원, 10년납, 채권형100% (단위: 만원)
            </div>
            <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                    <th className="border border-gray-300 p-1 text-xs" rowSpan={4}>나이</th>
                    <th className="border border-gray-300 p-1 text-xs" colSpan={4}>투자수익률 -1.0% 가정시</th>
                    <th className="border border-gray-300 p-1 text-xs" colSpan={4}>투자수익률 2.75% 가정시</th>
                    <th className="border border-gray-300 p-1 text-xs" colSpan={4}>투자수익률 4.125% 가정시</th>
                </tr>
                <tr className="bg-gray-100 text-gray-700">
                    <th className="border border-gray-300 p-1 text-xs" colSpan={4}>순수익률 -4.7%</th>
                    <th className="border border-gray-300 p-1 text-xs" colSpan={4}>순수익률 -1.0%</th>
                    <th className="border border-gray-300 p-1 text-xs" colSpan={4}>순수익률 0.4%</th>
                </tr>
                <tr className="bg-gray-100 text-gray-700">
                    <th className="border border-gray-300 p-1 text-xs" colSpan={4}>연금기준금액: 7,390만원</th>
                    <th className="border border-gray-300 p-1 text-xs" colSpan={4}>연금기준금액: 7,390만원</th>
                    <th className="border border-gray-300 p-1 text-xs" colSpan={4}>연금기준금액: 7,390만원</th>
                </tr>
                <tr className="bg-gray-100 text-gray-700">
                    <th className="border border-gray-300 p-1 text-xs">연금<br/>연지급액</th>
                    <th className="border border-gray-300 p-1 text-xs">연금<br/>누계액</th>
                    <th className="border border-gray-300 p-1 text-xs">계약자<br/>적립액</th>
                    <th className="border border-gray-300 p-1 text-xs">최저사망<br/>적립액</th>
                    <th className="border border-gray-300 p-1 text-xs">연금<br/>연지급액</th>
                    <th className="border border-gray-300 p-1 text-xs">연금<br/>누계액</th>
                    <th className="border border-gray-300 p-1 text-xs">계약자<br/>적립액</th>
                    <th className="border border-gray-300 p-1 text-xs">최저사망<br/>적립액</th>
                    <th className="border border-gray-300 p-1 text-xs">연금<br/>연지급액</th>
                    <th className="border border-gray-300 p-1 text-xs">연금<br/>누계액</th>
                    <th className="border border-gray-300 p-1 text-xs">계약자<br/>적립액</th>
                    <th className="border border-gray-300 p-1 text-xs">최저사망<br/>적립액</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td className="border border-gray-300 p-1 text-center text-xs">60세</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">7,029</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">793</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">7,029</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">1,505</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">7,029</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-1 text-center text-xs">61세</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">721</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">6,668</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">721</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">302</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">6,668</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">721</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">1,054</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">6,668</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-1 text-center text-xs">62세</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">1,082</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">6,307</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">1,082</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">6,307</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">1,082</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">584</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">6,307</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-1 text-center text-xs">63세</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">1,443</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">5,947</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">1,443</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">5,947</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">1,443</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">95</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">5,947</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-1 text-center text-xs">64세</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">1,804</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">5,586</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">1,804</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">5,586</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">1,804</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">5,586</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-1 text-center text-xs">65세</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">2,165</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">5,225</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">2,165</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">5,225</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">2,165</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">5,225</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-1 text-center text-xs">66세</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">2,525</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">4,864</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">2,525</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">4,864</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">2,525</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">4,864</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-1 text-center text-xs">67세</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">2,886</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">4,503</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">2,886</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">4,503</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">2,886</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">4,503</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-1 text-center text-xs">68세</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">3,247</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">4,142</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">3,247</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">4,142</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">3,247</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">4,142</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-1 text-center text-xs">69세</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">3,608</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">3,782</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">3,608</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">3,782</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">3,608</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">3,782</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-1 text-center text-xs">70세</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">3,969</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">3,421</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">3,969</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">3,421</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">3,969</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">3,421</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-1 text-center text-xs">75세</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">5,773</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">1,617</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">5,773</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">1,617</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">5,773</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">1,617</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-1 text-center text-xs">80세</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">7,577</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">7,577</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">7,577</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-1 text-center text-xs">85세</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">9,381</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">9,381</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">9,381</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-1 text-center text-xs">90세</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">11,186</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">11,186</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">11,186</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-1 text-center text-xs">95세</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">12,990</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">12,990</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">12,990</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-1 text-center text-xs">100세</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">14,794</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">14,794</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">14,794</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                </tr>
              </tbody>
            </table>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p className="text-red-600">· 연금 연지급액은 해당년도 초 기준으로 지급 가정된 금액이며, 계약자적립액 및 최저사망적립액은 해당 연금 연지급액이 지급된 직후의 예시금액입니다.</p>
              <p className="text-red-600">· 연금개시 후 보험기간에 추가적으로 중도인출을 할 경우 연금기준금액 및 계약자적립액은 감소하며, 이에 따라 연금 연지급액 및 최저사망적립액도 상기예시보다 작아지며, 선지급행복자금을 신청한 이후에는 중도인출이 제한됩니다.</p>
              <p>· 위의 예시금액은 이 계약의 투자수익률을 -1.0%, 보험업감독규정에 따른 평균공시이율 2.75%, 동 이율의 1.5배인 4.125%를 가정하여 계산된 금액으로 실제 펀드 운용실적에 따라 달라집니다.</p>
              <p>· 특별계정(펀드) 투자수익률은 펀드의 기준가격의 변동으로 계산되며, 특별계정운용보수, 증권거래비용 및 기타비용은 매일 차감되어 기준가격에 반영되어 있습니다.</p>
              <p>· 연금개시 후 해지시에는 '해지신청일 + 제2영업일'의 기준가를 적용한 계약자적립액을 지급합니다.</p>
              <p>· 계약자적립액은 특별계정 운용실적에 따라 매일 변동되므로 최저보증이 이루어지지 않으며 원금손실이 발생할 수도 있습니다.</p>
              <p className="text-red-600">· 상기 예시금액은 투자수익률 등 여러 가정에 따라 산출된 금액입니다. 따라서 다음 중 어느 하나의 사유가 발생한 경우, 실제 연금기준금액 및 계약자적립액이 달라져 연금 연지급액과 최저사망적립액이 예시된 금액과 다를 수 있습니다.</p>
              <div className="space-y-1 pl-4">
                <p className="text-red-600">- 매월 계약해당일에 보험료를 납입하지 않은 경우</p>
                <p className="text-red-600">- 보험료 납입일시중지를 한 경우</p>
                <p className="text-red-600">- 추가납입, 중도인출, 선납을 한 경우</p>
                <p className="text-red-600">- 선지급행복자금을 신청한 경우</p>
                <p className="text-red-600">- 특별계정의 운용실적이 변경된 경우</p>
              </div>
              <p className="text-red-600">· 상기 예시된 금액은 미래의 수익을 보장하는 것은 아니며, 예시금액은 관련세법에 의한 세금공제 전 기준입니다.</p>
              <p className="text-red-600">· 보험기간 중 피보험자가 사망하였을 경우에는 사망당시의 계약자적립액(선지급행복자금 계약자 적립액 제외)과 최저사망적립액 중 큰 금액을 계약자에게 지급하고 이 계약은 더 이상효력이 없습니다.</p>
              <p>· 상기 순수익률은 예시된 투자수익률에서 최저사망적립액 보증비용 및 실적배당 종신연금 보증비용이 차감된 후의 수익률이며, 소수점 둘째자리에서 반올림하여 계산되었습니다.</p>
              <p>· 상기 예시금액은 선지급행복자금 신청이 반영되지 않은 금액입니다.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 해약환급금 예시표 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">해약환급금 예시표</h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="space-y-3">
            <div className="text-xs text-gray-600 text-right">
              예시기준 : 남자 40세, 60세 연금개시, 기본보험료 30만원, 10년납, 채권형100% (단위: 원)
            </div>
            <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                    <th className="border border-gray-300 p-1 text-xs" rowSpan={3}>경과년수</th>
                    <th className="border border-gray-300 p-1 text-xs" rowSpan={3}>나이</th>
                    <th className="border border-gray-300 p-1 text-xs" rowSpan={3}>납입보험료</th>
                    <th className="border border-gray-300 p-1 text-xs" rowSpan={3}>특별계정<br/>투입금액</th>
                    <th className="border border-gray-300 p-1 text-xs" colSpan={2}>투자수익률 -1.0% 가정시</th>
                    <th className="border border-gray-300 p-1 text-xs" colSpan={2}>투자수익률 2.75% 가정시</th>
                    <th className="border border-gray-300 p-1 text-xs" colSpan={2}>투자수익률 4.125% 가정시</th>
                    <th className="border border-gray-300 p-1 text-xs" rowSpan={3}>최저연금기준금액<br/>(해지할때<br/>지급되는<br/>금액이 아님)</th>
                </tr>
                <tr className="bg-gray-100 text-gray-700">
                    <th className="border border-gray-300 p-1 text-xs" colSpan={2}>순수익률 -4.7%</th>
                    <th className="border border-gray-300 p-1 text-xs" colSpan={2}>순수익률 -1.0%</th>
                    <th className="border border-gray-300 p-1 text-xs" colSpan={2}>순수익률 0.4%</th>
                </tr>
                <tr className="bg-gray-100 text-gray-700">
                    <th className="border border-gray-300 p-1 text-xs">해약환급금</th>
                    <th className="border border-gray-300 p-1 text-xs">환급률</th>
                    <th className="border border-gray-300 p-1 text-xs">해약환급금</th>
                    <th className="border border-gray-300 p-1 text-xs">환급률</th>
                    <th className="border border-gray-300 p-1 text-xs">해약환급금</th>
                    <th className="border border-gray-300 p-1 text-xs">환급률</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td className="border border-gray-300 p-1 text-center text-xs">1년</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">41세</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">3,600,000</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">3,287,736</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">2,505,532</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">69.6%</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">2,571,299</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">71.4%</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">2,595,231</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">72.1%</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">3,736,500</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-1 text-center text-xs">3년</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">43세</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">10,800,000</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">9,863,208</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">8,625,561</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">79.9%</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">9,177,129</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">85.0%</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">9,384,825</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">86.9%</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">11,965,500</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-1 text-center text-xs">5년</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">45세</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">18,000,000</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">16,438,680</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">13,990,349</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">77.7%</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">15,475,328</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">86.0%</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">16,054,338</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">89.2%</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">21,202,500</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-1 text-center text-xs">7년</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">47세</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">25,200,000</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">23,014,152</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">18,541,110</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">73.6%</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">21,372,003</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">84.8%</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">22,515,838</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">89.3%</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">31,447,500</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-1 text-center text-xs">10년</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">50세</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">36,000,000</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">32,877,360</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">23,364,227</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">64.9%</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">28,894,817</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">80.3%</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">31,256,339</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">86.8%</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">48,705,000</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-1 text-center text-xs">15년</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">55세</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">36,000,000</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">32,635,440</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">12,072,407</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">33.5%</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">21,971,449</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">61.0%</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">26,757,571</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">74.3%</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">61,305,000</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-1 text-center text-xs">20년</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">60세</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">36,000,000</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">32,393,520</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">-</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">0.0%</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">11,542,988</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">32.1%</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">18,663,542</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">51.8%</td>
                    <td className="border border-gray-300 p-1 text-center text-xs">73,905,000</td>
                </tr>
              </tbody>
            </table>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p className="text-red-600">· 이 보험계약은 납입한 보험료 중 위험보험료, 사업비 및 특약보험료를 차감한 후 특별계정(펀드)으로 투입·운용되고, 특별계정(펀드)의 투자수익률이 반영된 특별계정 계약자적립액에서 보증비용 등이 차감됩니다.</p>
              <p className="text-red-600">· 해약환급금은 특별계정 수익률에 따라 매일 변동하며, 중도해지시 특별계정 계약자적립액에서 미상각신계약비(해약공제액)를 차감하므로 해약환급금은 납입보험료보다 적거나 없을 수도 있습니다. 선지급행복자금 개시 후 중도해지한 경우, 특별계정 계약자 적립액과 선지급행복자금 계약자적립액을 합산한 금액을 지급합니다.</p>
              <p className="text-red-600">· 해약환급금에는 최저보증이 없어 원금손실이 발생할 수 있으며, 그 손실은 모두 계약자에게 귀속됩니다.</p>
              <p className="text-red-600">· 상기 예시된 금액 및 환급률 등이 미래의 수익을 보장하는 것은 아닙니다.</p>
              <p>· 특별계정(펀드) 투자수익률은 펀드의 기준가격의 변동으로 계산되며, 특별계정운용보수, 증권거래비용 및 기타비용은 매일 차감되어 기준가격에 반영되어 있습니다.</p>
              <p>· 상기 환급률은 투자수익률이 경과기간동안 일정하게 유지된다고 가정하였을 때 계약자가 납입한 보험료 대비 해약환급금의 비율입니다.</p>
              <p className="text-red-600">· 상기 해약환급금은 관련세법에 의한 세금공제 전 기준입니다.</p>
              <p>· 상기 예시금액은 투자수익률을 -1.0%, 감독규정 제1-2조 제13호에 따른 평균공시이율 2.75% 및 동 이율의 1.5배인 4.125%를 가정하여 계산한 금액입니다.</p>
              <p>· 평균공시이율은 감독원장이 정하는 바에 따라 산정한 전체 보험회사 공시이율의 평균으로, 전년도 8월말 기준 직전 12개월간 보험회사 평균공시이율입니다.</p>
              <p>· 변액보험 특별계정(펀드)의 수익률 및 자산구성내역 등은 생명보험협회 홈페이지(www.klia.or.kr) "공시실 ⇒ 상품비교공시 ⇒ 변액보험"을 통해 비교·확인하실 수 있습니다.</p>
              <p>· 위 예시에서 경과년수 1년은 40세 계약해당일부터 41세 계약해당일 직전까지를 말하며, 해약환급금 및 최저연금기준금액은 해당보험년도말 기준금액입니다. 그 이후 경과년도도 동일한 기준입니다.</p>
              <p className="text-red-600">· 상기 예시금액은 투자수익률 등 여러가정에 따라 산출된 금액입니다. 따라서 다음 중 어느 하나의 사유가 발생한 경우, 실제 해약환급금 및 최저연금기준금액은 예시된 금액과 다를 수 있습니다.</p>
              <div className="space-y-1 pl-4">
                <p className="text-red-600">- 매월 계약해당일에 보험료를 납입하지 않은 경우</p>
                <p className="text-red-600">- 보험료 납입일시중지를 한 경우</p>
                <p className="text-red-600">- 추가납입, 중도인출, 선납을 한 경우</p>
                <p className="text-red-600">- 선지급행복자금을 신청한 경우</p>
                <p className="text-red-600">- 특별계정의 운용실적이 변경된 경우</p>
              </div>
              <p className="text-red-600">· 연금개시 전 보험기간 중 피보험자가 사망하였을 경우에는 사망당시의 계약자적립액과 최저연금기준금액 중 큰 금액을 계약자에게 지급하고 이 계약은 더 이상 효력이 없습니다.</p>
              <p>· 상기 순수익률은 예시된 투자수익률에서 최저사망적립액 보증비용 및 실적배당 종신연금 보증비용이 차감된 후의 수익률이며, 소수점 둘째자리에서 반올림하여 계산되었습니다.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 부가가능특약 */}
      <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">부가가능특약</h2>
      <div className="space-y-3">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
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