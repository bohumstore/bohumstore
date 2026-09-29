import React from 'react'

export default function CoverageDetailsMobile() {
  return (
    <div className="space-y-6 px-4 sm:px-4 md:px-8 py-3 md:py-4">
      <h2 className="text-[#0A1B98] text-2xl font-bold border-b-2 border-[#0A1B98] pb-2">주계약</h2>

      {/* 연금개시 전 보험기간 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#0A1B98] pl-3">연금개시 전 보험기간</h3>
        <div className="text-sm text-gray-600 mb-2 whitespace-nowrap text-right">(예시기준 : 1구좌)</div>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#0A1B98] text-white">
                    <th className="border border-gray-300 p-1 sm:p-2 md:p-3 w-[80px] sm:w-[120px] md:w-[150px] text-xs sm:text-sm">급부명칭</th>
                    <th className="border border-gray-300 p-1 sm:p-2 md:p-3 text-xs sm:text-sm">지급사유</th>
                    <th className="border border-gray-300 p-1 sm:p-2 md:p-3 w-[70px] sm:w-[100px] md:w-[120px] text-xs sm:text-sm">지급금액</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-1 sm:p-2 md:p-3 text-[#0A1B98] text-xs sm:text-sm text-center">고도후유장해보험금</td>
                    <td className="border border-gray-300 p-1 sm:p-2 md:p-3 text-xs sm:text-sm leading-tight sm:leading-relaxed">연금개시 전 보험기간 중 피보험자가 장해분류표 중 동일한 재해로 여러 신체부위의 장해지급률을 더하여 80% 이상인 장해상태가 되었을 때 (최초1회한)</td>
                    <td className="border border-gray-300 p-1 sm:p-2 md:p-3 text-[#0A1B98] text-xs sm:text-sm text-center">1,000만원</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div>※ 다만, 사망하였을 경우에는 계약자적립액과 최저사망적립액 중 큰 금액을 지급</div>
            </div>
          </div>
        </div>
      </div>

      {/* 연금개시 후 보험기간 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#0A1B98] pl-3">연금개시 후 보험기간</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#0A1B98] text-white">
                    <th className="border border-gray-300 p-1 sm:p-2 md:p-3 w-[80px] sm:w-[120px] md:w-[150px] text-xs sm:text-sm">급부명칭</th>
                    <th className="border border-gray-300 p-1 sm:p-2 md:p-3 w-[90px] sm:w-[140px] md:w-[200px] text-xs sm:text-sm">지급사유</th>
                    <th className="border border-gray-300 p-1 sm:p-2 md:p-3 text-xs sm:text-sm">지급금액</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-1 sm:p-2 md:p-3 text-[#0A1B98] text-xs sm:text-sm text-center">실적배당 종신연금</td>
                    <td className="border border-gray-300 p-1 sm:p-2 md:p-3 text-xs sm:text-sm leading-tight sm:leading-relaxed">연금개시 후 보험기간 중 피보험자가 매년 계약해당일에 살아있을 때</td>
                    <td className="border border-gray-300 p-1 sm:p-2 md:p-3 text-xs sm:text-sm leading-tight sm:leading-relaxed">연금기준금액(다만, 연계약해당일의 계약자적립액이 더 클 경우에는 계약자적립액)을 기준으로 실적배당 종신연금지급률을 적용하여 계산한 실적배당 종신연금 연지급액을 피보험자가 연계약해당일에 살아있을 경우 지급</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-sm text-gray-600">
              ※ 다만, 사망하였을 경우에는 계약자적립액(선지급행복자금 계약자적립액 제외)과 최저사망적립액 중 큰 금액을 지급
            </div>
          </div>
        </div>
      </div>

      {/* 기본 설명들 - 생략 가능하거나 축약 */}
      <div className="space-y-3 text-sm text-gray-600">
        <p>· 보험기간 중 피보험자의 사망으로 인하여 약관에서 규정하는 보험금 지급사유가 더 이상 발생할 수 없는 경우에는 "산출방법서"에서 정하는 바에 따라 회사가 적립한 사망당시의 계약자적립액(선지급행복자금 계약자적립액 제외)과 최저사망적립액 중 큰 금액을 계약자에게 지급하고 이 계약은 더 이상 효력이 없습니다.</p>
      </div>

      {/* 기본 지급률 테이블 */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold">기본 지급률</h4>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#0A1B98] text-white">
                  <th className="border border-gray-300 p-2 text-center">연금개시 나이</th>
                  <th className="border border-gray-300 p-2 text-center">남자</th>
                  <th className="border border-gray-300 p-2 text-center">여자</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-gray-300 p-2 text-center">55~59세</td><td className="border border-gray-300 p-2 text-center">4.28%</td><td className="border border-gray-300 p-2 text-center">4.06%</td></tr>
                <tr><td className="border border-gray-300 p-2 text-center">60~64세</td><td className="border border-gray-300 p-2 text-center">4.97%</td><td className="border border-gray-300 p-2 text-center">4.76%</td></tr>
                <tr><td className="border border-gray-300 p-2 text-center">65~69세</td><td className="border border-gray-300 p-2 text-center">5.45%</td><td className="border border-gray-300 p-2 text-center">5.18%</td></tr>
                <tr><td className="border border-gray-300 p-2 text-center">70~74세</td><td className="border border-gray-300 p-2 text-center">5.88%</td><td className="border border-gray-300 p-2 text-center">5.67%</td></tr>
                <tr><td className="border border-gray-300 p-2 text-center">75~80세</td><td className="border border-gray-300 p-2 text-center">5.88%</td><td className="border border-gray-300 p-2 text-center">5.67%</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 장기유지 가산율 테이블 */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold">장기유지 가산율</h4>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#0A1B98] text-white">
                  <th className="border border-gray-300 p-2 text-center">연금개시전 보험기간<br />(연금개시 나이-가입나이)</th>
                  <th className="border border-gray-300 p-2 text-center">장기유지 가산율</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-gray-300 p-2 text-center">20~24년</td><td className="border border-gray-300 p-2 text-center">0%</td></tr>
                <tr><td className="border border-gray-300 p-2 text-center">25~29년</td><td className="border border-gray-300 p-2 text-center">10%</td></tr>
                <tr><td className="border border-gray-300 p-2 text-center">30~39년</td><td className="border border-gray-300 p-2 text-center">15%</td></tr>
                <tr><td className="border border-gray-300 p-2 text-center">40년 이상</td><td className="border border-gray-300 p-2 text-center">25%</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 실적배당종신연금 연지급액 예시표 - 투자수익률 2.5% */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold border-l-4 border-[#0A1B98] pl-3">① 실적배당종신연금 연지급액 (투자수익률 2.5% 가정)</h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="space-y-3">
            <div className="text-xs text-gray-600 text-right">
              예시기준 : 남자 40세, 65세 연금개시, 기본보험료 30만원, 10년납, 채권형 100% (단위 : 만원)
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="border border-gray-300 p-1 text-xs" rowSpan={3}>나이</th>
                    <th className="border border-gray-300 p-1 text-xs" colSpan={4}>순수익률 -0.8%</th>
                  </tr>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="border border-gray-300 p-1 text-xs" colSpan={4}>연금기준금액: 8,470만원</th>
                  </tr>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="border border-gray-300 p-1 text-xs">연금<br />연지급액</th>
                    <th className="border border-gray-300 p-1 text-xs">연금<br />누계액</th>
                    <th className="border border-gray-300 p-1 text-xs">계약자<br />적립액</th>
                    <th className="border border-gray-300 p-1 text-xs">최저사망<br />적립액</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">65세</td><td className="border border-gray-300 p-1 text-center text-xs">507</td><td className="border border-gray-300 p-1 text-center text-xs">507</td><td className="border border-gray-300 p-1 text-center text-xs">895</td><td className="border border-gray-300 p-1 text-center text-xs">7,962</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">66세</td><td className="border border-gray-300 p-1 text-center text-xs">507</td><td className="border border-gray-300 p-1 text-center text-xs">1,015</td><td className="border border-gray-300 p-1 text-center text-xs">351</td><td className="border border-gray-300 p-1 text-center text-xs">7,454</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">67세</td><td className="border border-gray-300 p-1 text-center text-xs">507</td><td className="border border-gray-300 p-1 text-center text-xs">1,523</td><td className="border border-gray-300 p-1 text-center text-xs">0</td><td className="border border-gray-300 p-1 text-center text-xs">6,947</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">68세</td><td className="border border-gray-300 p-1 text-center text-xs">507</td><td className="border border-gray-300 p-1 text-center text-xs">2,031</td><td className="border border-gray-300 p-1 text-center text-xs">0</td><td className="border border-gray-300 p-1 text-center text-xs">6,439</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">69세</td><td className="border border-gray-300 p-1 text-center text-xs">507</td><td className="border border-gray-300 p-1 text-center text-xs">2,539</td><td className="border border-gray-300 p-1 text-center text-xs">0</td><td className="border border-gray-300 p-1 text-center text-xs">5,931</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">70세</td><td className="border border-gray-300 p-1 text-center text-xs">507</td><td className="border border-gray-300 p-1 text-center text-xs">3,046</td><td className="border border-gray-300 p-1 text-center text-xs">0</td><td className="border border-gray-300 p-1 text-center text-xs">5,423</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">71세</td><td className="border border-gray-300 p-1 text-center text-xs">507</td><td className="border border-gray-300 p-1 text-center text-xs">3,554</td><td className="border border-gray-300 p-1 text-center text-xs">0</td><td className="border border-gray-300 p-1 text-center text-xs">4,915</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">72세</td><td className="border border-gray-300 p-1 text-center text-xs">507</td><td className="border border-gray-300 p-1 text-center text-xs">4,062</td><td className="border border-gray-300 p-1 text-center text-xs">0</td><td className="border border-gray-300 p-1 text-center text-xs">4,408</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">73세</td><td className="border border-gray-300 p-1 text-center text-xs">507</td><td className="border border-gray-300 p-1 text-center text-xs">4,570</td><td className="border border-gray-300 p-1 text-center text-xs">0</td><td className="border border-gray-300 p-1 text-center text-xs">3,900</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">74세</td><td className="border border-gray-300 p-1 text-center text-xs">507</td><td className="border border-gray-300 p-1 text-center text-xs">5,078</td><td className="border border-gray-300 p-1 text-center text-xs">0</td><td className="border border-gray-300 p-1 text-center text-xs">3,392</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">75세</td><td className="border border-gray-300 p-1 text-center text-xs">507</td><td className="border border-gray-300 p-1 text-center text-xs">5,585</td><td className="border border-gray-300 p-1 text-center text-xs">0</td><td className="border border-gray-300 p-1 text-center text-xs">2,884</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">80세</td><td className="border border-gray-300 p-1 text-center text-xs">507</td><td className="border border-gray-300 p-1 text-center text-xs">8,124</td><td className="border border-gray-300 p-1 text-center text-xs">0</td><td className="border border-gray-300 p-1 text-center text-xs">345</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">85세</td><td className="border border-gray-300 p-1 text-center text-xs">507</td><td className="border border-gray-300 p-1 text-center text-xs">10,663</td><td className="border border-gray-300 p-1 text-center text-xs">0</td><td className="border border-gray-300 p-1 text-center text-xs">0</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">90세</td><td className="border border-gray-300 p-1 text-center text-xs">507</td><td className="border border-gray-300 p-1 text-center text-xs">13,202</td><td className="border border-gray-300 p-1 text-center text-xs">0</td><td className="border border-gray-300 p-1 text-center text-xs">0</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">95세</td><td className="border border-gray-300 p-1 text-center text-xs">507</td><td className="border border-gray-300 p-1 text-center text-xs">15,742</td><td className="border border-gray-300 p-1 text-center text-xs">0</td><td className="border border-gray-300 p-1 text-center text-xs">0</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">100세</td><td className="border border-gray-300 p-1 text-center text-xs">507</td><td className="border border-gray-300 p-1 text-center text-xs">18,281</td><td className="border border-gray-300 p-1 text-center text-xs">0</td><td className="border border-gray-300 p-1 text-center text-xs">0</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 실적배당종신연금 연지급액 예시표 - 투자수익률 3.75% */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold border-l-4 border-[#0A1B98] pl-3">② 실적배당종신연금 연지급액 (투자수익률 3.75% 가정)</h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="space-y-3">
            <div className="text-xs text-gray-600 text-right">
              예시기준 : 남자 40세, 65세 연금개시, 기본보험료 30만원, 10년납, 채권형 100% (단위 : 만원)
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="border border-gray-300 p-1 text-xs" rowSpan={3}>나이</th>
                    <th className="border border-gray-300 p-1 text-xs" colSpan={4}>순수익률 0.5%</th>
                  </tr>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="border border-gray-300 p-1 text-xs" colSpan={4}>연금기준금액: 8,470만원</th>
                  </tr>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="border border-gray-300 p-1 text-xs">연금<br />연지급액</th>
                    <th className="border border-gray-300 p-1 text-xs">연금<br />누계액</th>
                    <th className="border border-gray-300 p-1 text-xs">계약자<br />적립액</th>
                    <th className="border border-gray-300 p-1 text-xs">최저사망<br />적립액</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">65세</td><td className="border border-gray-300 p-1 text-center text-xs">507</td><td className="border border-gray-300 p-1 text-center text-xs">507</td><td className="border border-gray-300 p-1 text-center text-xs">1,473</td><td className="border border-gray-300 p-1 text-center text-xs">7,962</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">66세</td><td className="border border-gray-300 p-1 text-center text-xs">507</td><td className="border border-gray-300 p-1 text-center text-xs">1,015</td><td className="border border-gray-300 p-1 text-center text-xs">953</td><td className="border border-gray-300 p-1 text-center text-xs">7,454</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">67세</td><td className="border border-gray-300 p-1 text-center text-xs">507</td><td className="border border-gray-300 p-1 text-center text-xs">1,523</td><td className="border border-gray-300 p-1 text-center text-xs">421</td><td className="border border-gray-300 p-1 text-center text-xs">6,947</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">68세</td><td className="border border-gray-300 p-1 text-center text-xs">507</td><td className="border border-gray-300 p-1 text-center text-xs">2,031</td><td className="border border-gray-300 p-1 text-center text-xs">0</td><td className="border border-gray-300 p-1 text-center text-xs">6,439</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">69세</td><td className="border border-gray-300 p-1 text-center text-xs">507</td><td className="border border-gray-300 p-1 text-center text-xs">2,539</td><td className="border border-gray-300 p-1 text-center text-xs">0</td><td className="border border-gray-300 p-1 text-center text-xs">5,931</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">70세</td><td className="border border-gray-300 p-1 text-center text-xs">507</td><td className="border border-gray-300 p-1 text-center text-xs">3,046</td><td className="border border-gray-300 p-1 text-center text-xs">0</td><td className="border border-gray-300 p-1 text-center text-xs">5,423</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">71세</td><td className="border border-gray-300 p-1 text-center text-xs">507</td><td className="border border-gray-300 p-1 text-center text-xs">3,554</td><td className="border border-gray-300 p-1 text-center text-xs">0</td><td className="border border-gray-300 p-1 text-center text-xs">4,915</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">72세</td><td className="border border-gray-300 p-1 text-center text-xs">507</td><td className="border border-gray-300 p-1 text-center text-xs">4,062</td><td className="border border-gray-300 p-1 text-center text-xs">0</td><td className="border border-gray-300 p-1 text-center text-xs">4,408</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">73세</td><td className="border border-gray-300 p-1 text-center text-xs">507</td><td className="border border-gray-300 p-1 text-center text-xs">4,570</td><td className="border border-gray-300 p-1 text-center text-xs">0</td><td className="border border-gray-300 p-1 text-center text-xs">3,900</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">74세</td><td className="border border-gray-300 p-1 text-center text-xs">507</td><td className="border border-gray-300 p-1 text-center text-xs">5,078</td><td className="border border-gray-300 p-1 text-center text-xs">0</td><td className="border border-gray-300 p-1 text-center text-xs">3,392</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">75세</td><td className="border border-gray-300 p-1 text-center text-xs">507</td><td className="border border-gray-300 p-1 text-center text-xs">5,585</td><td className="border border-gray-300 p-1 text-center text-xs">0</td><td className="border border-gray-300 p-1 text-center text-xs">2,884</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">80세</td><td className="border border-gray-300 p-1 text-center text-xs">507</td><td className="border border-gray-300 p-1 text-center text-xs">8,124</td><td className="border border-gray-300 p-1 text-center text-xs">0</td><td className="border border-gray-300 p-1 text-center text-xs">345</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">85세</td><td className="border border-gray-300 p-1 text-center text-xs">507</td><td className="border border-gray-300 p-1 text-center text-xs">10,663</td><td className="border border-gray-300 p-1 text-center text-xs">0</td><td className="border border-gray-300 p-1 text-center text-xs">0</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">90세</td><td className="border border-gray-300 p-1 text-center text-xs">507</td><td className="border border-gray-300 p-1 text-center text-xs">13,202</td><td className="border border-gray-300 p-1 text-center text-xs">0</td><td className="border border-gray-300 p-1 text-center text-xs">0</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">95세</td><td className="border border-gray-300 p-1 text-center text-xs">507</td><td className="border border-gray-300 p-1 text-center text-xs">15,742</td><td className="border border-gray-300 p-1 text-center text-xs">0</td><td className="border border-gray-300 p-1 text-center text-xs">0</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">100세</td><td className="border border-gray-300 p-1 text-center text-xs">507</td><td className="border border-gray-300 p-1 text-center text-xs">18,281</td><td className="border border-gray-300 p-1 text-center text-xs">0</td><td className="border border-gray-300 p-1 text-center text-xs">0</td></tr>
                </tbody>
              </table>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p className="text-red-600">· 연금 연지급액은 해당년도 초 기준으로 지급 가정된 금액이며, 계약자적립액 및 최저사망적립액은 해당 연금 연지급액이 지급된 직후의 예시금액입니다.</p>
              <p className="text-red-600">· 상기 예시금액은 투자수익률 등 여러 가정에 따라 산출된 금액입니다. 따라서 실제 연금기준금액 및 계약자적립액이 달라져 연금 연지급액과 최저사망적립액이 예시된 금액과 다를 수 있습니다.</p>
              <p className="text-red-600">· 상기 예시된 금액은 미래의 수익을 보장하는 것은 아니며, 예시금액은 관련세법에 의한 세금공제 전 기준입니다.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 해약환급금 예시표 - 투자수익률 2.5% */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#0A1B98] pl-3">① 해약환급금 예시 (투자수익률 2.5% 가정)</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-3">
            <div className="text-xs text-gray-600 text-right">
              예시기준 : 남자 40세, 65세 연금개시, 기본보험료 30만원, 10년납, 채권형 100% (단위 : 만원)
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="border border-gray-300 p-1 text-xs">경과년수</th>
                    <th className="border border-gray-300 p-1 text-xs">나이</th>
                    <th className="border border-gray-300 p-1 text-xs">납입<br/>보험료</th>
                    <th className="border border-gray-300 p-1 text-xs">특별계정<br/>투입금액</th>
                    <th className="border border-gray-300 p-1 text-xs">해약<br/>환급금</th>
                    <th className="border border-gray-300 p-1 text-xs">환급률</th>
                    <th className="border border-gray-300 p-1 text-xs">최저연금<br/>기준금액</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">1년</td><td className="border border-gray-300 p-1 text-center text-xs">41세</td><td className="border border-gray-300 p-1 text-center text-xs">360</td><td className="border border-gray-300 p-1 text-center text-xs">329</td><td className="border border-gray-300 p-1 text-center text-xs">163</td><td className="border border-gray-300 p-1 text-center text-xs">45.40%</td><td className="border border-gray-300 p-1 text-center text-xs">373</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">3년</td><td className="border border-gray-300 p-1 text-center text-xs">43세</td><td className="border border-gray-300 p-1 text-center text-xs">1,080</td><td className="border border-gray-300 p-1 text-center text-xs">988</td><td className="border border-gray-300 p-1 text-center text-xs">632</td><td className="border border-gray-300 p-1 text-center text-xs">58.56%</td><td className="border border-gray-300 p-1 text-center text-xs">1,196</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">5년</td><td className="border border-gray-300 p-1 text-center text-xs">45세</td><td className="border border-gray-300 p-1 text-center text-xs">1,800</td><td className="border border-gray-300 p-1 text-center text-xs">1,647</td><td className="border border-gray-300 p-1 text-center text-xs">1,103</td><td className="border border-gray-300 p-1 text-center text-xs">61.28%</td><td className="border border-gray-300 p-1 text-center text-xs">2,120</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">7년</td><td className="border border-gray-300 p-1 text-center text-xs">47세</td><td className="border border-gray-300 p-1 text-center text-xs">2,520</td><td className="border border-gray-300 p-1 text-center text-xs">2,306</td><td className="border border-gray-300 p-1 text-center text-xs">1,574</td><td className="border border-gray-300 p-1 text-center text-xs">62.49%</td><td className="border border-gray-300 p-1 text-center text-xs">3,144</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">10년</td><td className="border border-gray-300 p-1 text-center text-xs">50세</td><td className="border border-gray-300 p-1 text-center text-xs">3,600</td><td className="border border-gray-300 p-1 text-center text-xs">3,294</td><td className="border border-gray-300 p-1 text-center text-xs">2,248</td><td className="border border-gray-300 p-1 text-center text-xs">62.44%</td><td className="border border-gray-300 p-1 text-center text-xs">4,870</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">15년</td><td className="border border-gray-300 p-1 text-center text-xs">55세</td><td className="border border-gray-300 p-1 text-center text-xs">3,600</td><td className="border border-gray-300 p-1 text-center text-xs">3,270</td><td className="border border-gray-300 p-1 text-center text-xs">1,760</td><td className="border border-gray-300 p-1 text-center text-xs">48.90%</td><td className="border border-gray-300 p-1 text-center text-xs">6,130</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">25년</td><td className="border border-gray-300 p-1 text-center text-xs">65세</td><td className="border border-gray-300 p-1 text-center text-xs">3,600</td><td className="border border-gray-300 p-1 text-center text-xs">3,221</td><td className="border border-gray-300 p-1 text-center text-xs">1,403</td><td className="border border-gray-300 p-1 text-center text-xs">38.99%</td><td className="border border-gray-300 p-1 text-center text-xs">8,470</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 해약환급금 예시표 - 투자수익률 3.75% */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#0A1B98] pl-3">② 해약환급금 예시 (투자수익률 3.75% 가정)</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-3">
            <div className="text-xs text-gray-600 text-right">
              예시기준 : 남자 40세, 65세 연금개시, 기본보험료 30만원, 10년납, 채권형 100% (단위 : 만원)
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="border border-gray-300 p-1 text-xs">경과년수</th>
                    <th className="border border-gray-300 p-1 text-xs">나이</th>
                    <th className="border border-gray-300 p-1 text-xs">납입<br/>보험료</th>
                    <th className="border border-gray-300 p-1 text-xs">특별계정<br/>투입금액</th>
                    <th className="border border-gray-300 p-1 text-xs">해약<br/>환급금</th>
                    <th className="border border-gray-300 p-1 text-xs">환급률</th>
                    <th className="border border-gray-300 p-1 text-xs">최저연금<br/>기준금액</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">1년</td><td className="border border-gray-300 p-1 text-center text-xs">41세</td><td className="border border-gray-300 p-1 text-center text-xs">360</td><td className="border border-gray-300 p-1 text-center text-xs">329</td><td className="border border-gray-300 p-1 text-center text-xs">165</td><td className="border border-gray-300 p-1 text-center text-xs">45.84%</td><td className="border border-gray-300 p-1 text-center text-xs">373</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">3년</td><td className="border border-gray-300 p-1 text-center text-xs">43세</td><td className="border border-gray-300 p-1 text-center text-xs">1,080</td><td className="border border-gray-300 p-1 text-center text-xs">988</td><td className="border border-gray-300 p-1 text-center text-xs">645</td><td className="border border-gray-300 p-1 text-center text-xs">59.77%</td><td className="border border-gray-300 p-1 text-center text-xs">1,196</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">5년</td><td className="border border-gray-300 p-1 text-center text-xs">45세</td><td className="border border-gray-300 p-1 text-center text-xs">1,800</td><td className="border border-gray-300 p-1 text-center text-xs">1,647</td><td className="border border-gray-300 p-1 text-center text-xs">1,139</td><td className="border border-gray-300 p-1 text-center text-xs">63.29%</td><td className="border border-gray-300 p-1 text-center text-xs">2,120</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">7년</td><td className="border border-gray-300 p-1 text-center text-xs">47세</td><td className="border border-gray-300 p-1 text-center text-xs">2,520</td><td className="border border-gray-300 p-1 text-center text-xs">2,306</td><td className="border border-gray-300 p-1 text-center text-xs">1,646</td><td className="border border-gray-300 p-1 text-center text-xs">65.32%</td><td className="border border-gray-300 p-1 text-center text-xs">3,144</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">10년</td><td className="border border-gray-300 p-1 text-center text-xs">50세</td><td className="border border-gray-300 p-1 text-center text-xs">3,600</td><td className="border border-gray-300 p-1 text-center text-xs">3,294</td><td className="border border-gray-300 p-1 text-center text-xs">2,396</td><td className="border border-gray-300 p-1 text-center text-xs">66.56%</td><td className="border border-gray-300 p-1 text-center text-xs">4,870</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">15년</td><td className="border border-gray-300 p-1 text-center text-xs">55세</td><td className="border border-gray-300 p-1 text-center text-xs">3,600</td><td className="border border-gray-300 p-1 text-center text-xs">3,270</td><td className="border border-gray-300 p-1 text-center text-xs">2,054</td><td className="border border-gray-300 p-1 text-center text-xs">57.06%</td><td className="border border-gray-300 p-1 text-center text-xs">6,130</td></tr>
                  <tr><td className="border border-gray-300 p-1 text-center text-xs">25년</td><td className="border border-gray-300 p-1 text-center text-xs">65세</td><td className="border border-gray-300 p-1 text-center text-xs">3,600</td><td className="border border-gray-300 p-1 text-center text-xs">3,221</td><td className="border border-gray-300 p-1 text-center text-xs">1,981</td><td className="border border-gray-300 p-1 text-center text-xs">55.05%</td><td className="border border-gray-300 p-1 text-center text-xs">8,470</td></tr>
                </tbody>
              </table>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p className="text-red-600">· 이 보험계약은 납입한 보험료 중 위험보험료, 사업비 및 특약보험료를 차감한 후 특별계정(펀드)으로 투입·운용되고, 특별계정(펀드)의 투자수익률이 반영된 특별계정 계약자적립액에서 보증비용 등이 차감됩니다.</p>
              <p className="text-red-600">· 해약환급금은 특별계정 수익률에 따라 매일 변동하며, 중도해지시 특별계정 계약자적립액에서 미상각신계약비(해약공제액)를 차감하므로 해약환급금은 납입보험료보다 적거나 없을 수도 있습니다.</p>
              <p className="text-red-600">· 해약환급금에는 최저보증이 없어 원금손실이 발생할 수 있으며, 그 손실은 모두 계약자에게 귀속됩니다.</p>
              <p className="text-red-600">· 상기 예시된 금액 및 환급률 등이 미래의 수익을 보장하는 것은 아닙니다.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 부가가능특약 */}
      <h2 className="text-[#0A1B98] text-2xl font-bold border-b-2 border-[#0A1B98] pb-2">부가가능특약</h2>
      <div className="space-y-3">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">연금전환특약(무), 장애인전용보험전환특약, 지정대리청구서비스특약, 변액보험 펀드추가서비스특약</td>
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
