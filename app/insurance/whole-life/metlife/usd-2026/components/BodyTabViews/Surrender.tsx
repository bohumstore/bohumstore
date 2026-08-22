import React from 'react'

export default function Surrender() {
  return (
    <div className="space-y-6 sm:space-y-8 px-2 sm:px-4 md:px-8 py-4 md:py-6">
      {/* 해약환급금 예시 제목 */}
      <h2 className="text-[#1e3a8a] text-xl sm:text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">해약환급금 예시</h2>

      {/* 저해약환급금형Ⅰ */}
      <div className="space-y-4">
        <h4 className="text-sm sm:text-base font-semibold">- 저해약환급금형Ⅰ</h4>
        <p className="text-[10px] sm:text-xs text-gray-600 text-right">예시기준 : 주계약 가입금액 1만달러, 가입나이 40세, 5년납, 월납, 단위 : 달러(달러미만절사)</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[10px] sm:text-xs md:text-sm text-center">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-1 sm:p-2" rowSpan={2}>경과<br className="sm:hidden" />기간</th>
                <th className="border border-gray-300 p-1 sm:p-2" colSpan={3}>남자</th>
                <th className="border border-gray-300 p-1 sm:p-2" colSpan={3}>여자</th>
              </tr>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-1 sm:p-2">납입<br className="sm:hidden" />보험료</th>
                <th className="border border-gray-300 p-1 sm:p-2">해약<br className="sm:hidden" />환급금</th>
                <th className="border border-gray-300 p-1 sm:p-2">해약<br className="sm:hidden" />환급률</th>
                <th className="border border-gray-300 p-1 sm:p-2">납입<br className="sm:hidden" />보험료</th>
                <th className="border border-gray-300 p-1 sm:p-2">해약<br className="sm:hidden" />환급금</th>
                <th className="border border-gray-300 p-1 sm:p-2">해약<br className="sm:hidden" />환급률</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2">1년</td>
                <td className="border border-gray-300 p-1 sm:p-2">2,575</td>
                <td className="border border-gray-300 p-1 sm:p-2">680</td>
                <td className="border border-gray-300 p-1 sm:p-2">26.4%</td>
                <td className="border border-gray-300 p-1 sm:p-2">2,509</td>
                <td className="border border-gray-300 p-1 sm:p-2">664</td>
                <td className="border border-gray-300 p-1 sm:p-2">26.5%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2">3년</td>
                <td className="border border-gray-300 p-1 sm:p-2">7,725</td>
                <td className="border border-gray-300 p-1 sm:p-2">2,716</td>
                <td className="border border-gray-300 p-1 sm:p-2">35.2%</td>
                <td className="border border-gray-300 p-1 sm:p-2">7,527</td>
                <td className="border border-gray-300 p-1 sm:p-2">2,649</td>
                <td className="border border-gray-300 p-1 sm:p-2">35.2%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2">5년</td>
                <td className="border border-gray-300 p-1 sm:p-2">12,876</td>
                <td className="border border-gray-300 p-1 sm:p-2">4,881</td>
                <td className="border border-gray-300 p-1 sm:p-2">37.9%</td>
                <td className="border border-gray-300 p-1 sm:p-2">12,546</td>
                <td className="border border-gray-300 p-1 sm:p-2">4,758</td>
                <td className="border border-gray-300 p-1 sm:p-2">37.9%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2">5년 1일</td>
                <td className="border border-gray-300 p-1 sm:p-2">12,876</td>
                <td className="border border-gray-300 p-1 sm:p-2">12,659</td>
                <td className="border border-gray-300 p-1 sm:p-2">98.3%</td>
                <td className="border border-gray-300 p-1 sm:p-2">12,546</td>
                <td className="border border-gray-300 p-1 sm:p-2">12,340</td>
                <td className="border border-gray-300 p-1 sm:p-2">98.4%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2">7년</td>
                <td className="border border-gray-300 p-1 sm:p-2">12,876</td>
                <td className="border border-gray-300 p-1 sm:p-2">12,851</td>
                <td className="border border-gray-300 p-1 sm:p-2">99.8%</td>
                <td className="border border-gray-300 p-1 sm:p-2">12,546</td>
                <td className="border border-gray-300 p-1 sm:p-2">12,526</td>
                <td className="border border-gray-300 p-1 sm:p-2">99.8%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2">10년</td>
                <td className="border border-gray-300 p-1 sm:p-2">12,876</td>
                <td className="border border-gray-300 p-1 sm:p-2">14,670</td>
                <td className="border border-gray-300 p-1 sm:p-2">113.9%</td>
                <td className="border border-gray-300 p-1 sm:p-2">12,546</td>
                <td className="border border-gray-300 p-1 sm:p-2">14,301</td>
                <td className="border border-gray-300 p-1 sm:p-2">114.0%</td>
              </tr>
              <tr className="bg-red-50">
                <td className="border border-gray-300 p-1 sm:p-2">10년 1일</td>
                <td className="border border-gray-300 p-1 sm:p-2">12,876</td>
                <td className="border border-gray-300 p-1 sm:p-2">16,086</td>
                <td className="border border-gray-300 p-1 sm:p-2">124.9%</td>
                <td className="border border-gray-300 p-1 sm:p-2">12,546</td>
                <td className="border border-gray-300 p-1 sm:p-2">15,681</td>
                <td className="border border-gray-300 p-1 sm:p-2">125.0%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2">15년</td>
                <td className="border border-gray-300 p-1 sm:p-2">12,876</td>
                <td className="border border-gray-300 p-1 sm:p-2">16,724</td>
                <td className="border border-gray-300 p-1 sm:p-2">129.9%</td>
                <td className="border border-gray-300 p-1 sm:p-2">12,546</td>
                <td className="border border-gray-300 p-1 sm:p-2">16,307</td>
                <td className="border border-gray-300 p-1 sm:p-2">130.0%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2">20년</td>
                <td className="border border-gray-300 p-1 sm:p-2">12,876</td>
                <td className="border border-gray-300 p-1 sm:p-2">17,382</td>
                <td className="border border-gray-300 p-1 sm:p-2">135.0%</td>
                <td className="border border-gray-300 p-1 sm:p-2">12,546</td>
                <td className="border border-gray-300 p-1 sm:p-2">16,962</td>
                <td className="border border-gray-300 p-1 sm:p-2">135.2%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2">40년</td>
                <td className="border border-gray-300 p-1 sm:p-2">12,876</td>
                <td className="border border-gray-300 p-1 sm:p-2">20,116</td>
                <td className="border border-gray-300 p-1 sm:p-2">156.2%</td>
                <td className="border border-gray-300 p-1 sm:p-2">12,546</td>
                <td className="border border-gray-300 p-1 sm:p-2">19,809</td>
                <td className="border border-gray-300 p-1 sm:p-2">157.9%</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* 저해약환급금형Ⅰ 주의사항 */}
        <div className="space-y-1 text-[10px] sm:text-xs text-gray-700">
          <p className="text-red-500">• 이 보험상품은 달러상품이므로 원-달러 환율변동에 의해 원화기준으로 환산 시 보험료, 보험금 및 해약환급금 등에 손실이 발생할 수 있으며, 그 손실은 계약자에게 귀속됩니다.</p>
          <p>• [5년 1일]의 해약환급금은 계약일로부터 5년이 경과하고 최초로 도래하는 계약해당일의 계약자적립액에 유지보너스금액을 더하여 산출한 금액입니다.</p>
          <p>• [10년 1일]의 해약환급금은 계약일로부터 10년이 경과하고 최초로 도래하는 계약해당일의 계약자적립액에 유지보너스금액을 더하여 산출한 금액입니다.</p>
          <p>• 해약환급금은 이미 납입한 보험료보다 적거나 없을 수 있으며 기타보험료 및 해약환급금 산출 관련사항은 상품요약서(당사 홈페이지 상품공시실 참조) 및 상품설명서에서 보다 자세히 확인하실 수 있습니다.</p>
          <p>• 상기 해약환급금은 세전기준입니다.</p>
        </div>
      </div>

      {/* 저해약환급금형Ⅱ */}
      <div className="space-y-4">
        <h4 className="text-sm sm:text-base font-semibold">- 저해약환급금형Ⅱ</h4>
        <p className="text-[10px] sm:text-xs text-gray-600 text-right">예시기준 : 주계약 가입금액 1만달러, 가입나이 40세, 10년납, 월납, 단위 : 달러(달러미만절사)</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[10px] sm:text-xs md:text-sm text-center">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-1 sm:p-2" rowSpan={2}>경과<br className="sm:hidden" />기간</th>
                <th className="border border-gray-300 p-1 sm:p-2" colSpan={3}>남자</th>
                <th className="border border-gray-300 p-1 sm:p-2" colSpan={3}>여자</th>
              </tr>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-1 sm:p-2">납입<br className="sm:hidden" />보험료</th>
                <th className="border border-gray-300 p-1 sm:p-2">해약<br className="sm:hidden" />환급금</th>
                <th className="border border-gray-300 p-1 sm:p-2">해약<br className="sm:hidden" />환급률</th>
                <th className="border border-gray-300 p-1 sm:p-2">납입<br className="sm:hidden" />보험료</th>
                <th className="border border-gray-300 p-1 sm:p-2">해약<br className="sm:hidden" />환급금</th>
                <th className="border border-gray-300 p-1 sm:p-2">해약<br className="sm:hidden" />환급률</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2">1년</td>
                <td className="border border-gray-300 p-1 sm:p-2">1,388</td>
                <td className="border border-gray-300 p-1 sm:p-2">234</td>
                <td className="border border-gray-300 p-1 sm:p-2">16.9%</td>
                <td className="border border-gray-300 p-1 sm:p-2">1,351</td>
                <td className="border border-gray-300 p-1 sm:p-2">230</td>
                <td className="border border-gray-300 p-1 sm:p-2">17.0%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2">3년</td>
                <td className="border border-gray-300 p-1 sm:p-2">4,165</td>
                <td className="border border-gray-300 p-1 sm:p-2">1,336</td>
                <td className="border border-gray-300 p-1 sm:p-2">32.1%</td>
                <td className="border border-gray-300 p-1 sm:p-2">4,053</td>
                <td className="border border-gray-300 p-1 sm:p-2">1,304</td>
                <td className="border border-gray-300 p-1 sm:p-2">32.2%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2">5년</td>
                <td className="border border-gray-300 p-1 sm:p-2">6,942</td>
                <td className="border border-gray-300 p-1 sm:p-2">2,506</td>
                <td className="border border-gray-300 p-1 sm:p-2">36.1%</td>
                <td className="border border-gray-300 p-1 sm:p-2">6,756</td>
                <td className="border border-gray-300 p-1 sm:p-2">2,444</td>
                <td className="border border-gray-300 p-1 sm:p-2">36.2%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2">7년</td>
                <td className="border border-gray-300 p-1 sm:p-2">9,718</td>
                <td className="border border-gray-300 p-1 sm:p-2">3,748</td>
                <td className="border border-gray-300 p-1 sm:p-2">38.6%</td>
                <td className="border border-gray-300 p-1 sm:p-2">9,458</td>
                <td className="border border-gray-300 p-1 sm:p-2">3,655</td>
                <td className="border border-gray-300 p-1 sm:p-2">38.6%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2">10년</td>
                <td className="border border-gray-300 p-1 sm:p-2">13,884</td>
                <td className="border border-gray-300 p-1 sm:p-2">5,631</td>
                <td className="border border-gray-300 p-1 sm:p-2">40.6%</td>
                <td className="border border-gray-300 p-1 sm:p-2">13,512</td>
                <td className="border border-gray-300 p-1 sm:p-2">5,492</td>
                <td className="border border-gray-300 p-1 sm:p-2">40.7%</td>
              </tr>
              <tr className="bg-red-50">
                <td className="border border-gray-300 p-1 sm:p-2">10년 1일</td>
                <td className="border border-gray-300 p-1 sm:p-2">13,884</td>
                <td className="border border-gray-300 p-1 sm:p-2">16,775</td>
                <td className="border border-gray-300 p-1 sm:p-2">120.8%</td>
                <td className="border border-gray-300 p-1 sm:p-2">13,512</td>
                <td className="border border-gray-300 p-1 sm:p-2">16,348</td>
                <td className="border border-gray-300 p-1 sm:p-2">121.0%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2">15년</td>
                <td className="border border-gray-300 p-1 sm:p-2">13,884</td>
                <td className="border border-gray-300 p-1 sm:p-2">17,455</td>
                <td className="border border-gray-300 p-1 sm:p-2">125.7%</td>
                <td className="border border-gray-300 p-1 sm:p-2">13,512</td>
                <td className="border border-gray-300 p-1 sm:p-2">17,013</td>
                <td className="border border-gray-300 p-1 sm:p-2">125.9%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2">20년</td>
                <td className="border border-gray-300 p-1 sm:p-2">13,884</td>
                <td className="border border-gray-300 p-1 sm:p-2">18,151</td>
                <td className="border border-gray-300 p-1 sm:p-2">130.7%</td>
                <td className="border border-gray-300 p-1 sm:p-2">13,512</td>
                <td className="border border-gray-300 p-1 sm:p-2">17,704</td>
                <td className="border border-gray-300 p-1 sm:p-2">131.0%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2">40년</td>
                <td className="border border-gray-300 p-1 sm:p-2">13,884</td>
                <td className="border border-gray-300 p-1 sm:p-2">21,055</td>
                <td className="border border-gray-300 p-1 sm:p-2">151.7%</td>
                <td className="border border-gray-300 p-1 sm:p-2">13,512</td>
                <td className="border border-gray-300 p-1 sm:p-2">20,715</td>
                <td className="border border-gray-300 p-1 sm:p-2">153.3%</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* 저해약환급금형Ⅱ 주의사항 */}
        <div className="space-y-1 text-[10px] sm:text-xs text-gray-700">
          <p className="text-red-500">• 이 보험상품은 달러상품이므로 원-달러 환율변동에 의해 원화기준으로 환산 시 보험료, 보험금 및 해약환급금 등에 손실이 발생할 수 있으며, 그 손실은 계약자에게 귀속됩니다.</p>
          <p>• [10년 1일]의 해약환급금은 계약일로부터 10년이 경과하고 최초로 도래하는 계약해당일의 계약자적립액에 유지보너스금액을 더하여 산출한 금액입니다.</p>
          <p>• 해약환급금은 이미 납입한 보험료보다 적거나 없을 수 있으며 기타보험료 및 해약환급금 산출 관련사항은 상품요약서(당사 홈페이지 상품공시실 참조) 및 상품설명서에서 보다 자세히 확인하실 수 있습니다.</p>
          <p>• 상기 해약환급금은 세전기준입니다.</p>
        </div>
      </div>

    </div>
  )
}
