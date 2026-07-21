import React from 'react'

export default function Surrender() {
  return (
    <div className="space-y-8 px-2 sm:px-4 md:px-8 py-4 md:py-6">
      <div className="mb-2">
        <div className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">해약환급금 예시</div>
      </div>

      {/* 적립형 - 남자 */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold">□ 적립형</h3>
        <div className="text-xs text-gray-600 text-right">
          [기준 : 남자 40세, 연금개시 60세, 10년납, 월납, 기본보험료 월 30만원(단위: 천원)]
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full text-center text-[10px] md:text-sm">
            <thead>
              <tr className="bg-[#1e3a8a] text-white align-middle">
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm" rowSpan={2}>경과<br className="md:hidden" />기간</th>
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm" rowSpan={2}>납입<br className="md:hidden" />보험료(A)</th>
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm" rowSpan={2}>특별계정<br className="md:hidden" />투입금액<br className="md:hidden" />누계</th>
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm" colSpan={2}>투자수익률 -1.00% 가정시<br />(순수익률 -4.70%)</th>
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm" colSpan={2}>투자수익률 2.50% 가정시<br />(순수익률 -1.20%)</th>
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm" colSpan={2}>투자수익률 3.75% 가정시<br />(순수익률 0.05%)</th>
              </tr>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">금액</th>
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">환급률<br />(B/A)</th>
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">금액</th>
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">환급률<br />(B/A)</th>
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">금액</th>
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">환급률<br />(B/A)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3개월</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">900</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">823</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">127</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">14.1%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">132</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">14.7%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">133</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">14.8%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">6개월</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,800</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,647</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">963</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">53.5%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">979</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">54.4%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">985</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">54.7%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">9개월</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">2,700</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">2,471</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,789</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">66.3%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,824</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">67.6%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,837</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">68.0%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1년</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,600</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,294</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">2,606</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">72.4%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">2,667</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">74.1%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">2,689</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">74.7%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">2년</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">7,200</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">6,589</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">5,783</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">80.3%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">6,012</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">83.5%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">6,095</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">84.7%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3년</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">10,800</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">9,884</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">8,818</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">81.6%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">9,318</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">86.3%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">9,501</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">88.0%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">4년</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">14,400</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">13,179</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">11,718</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">81.4%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">12,584</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">87.4%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">12,906</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">89.6%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">5년</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">18,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">16,474</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">14,489</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">80.5%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">15,811</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">87.8%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">16,310</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">90.6%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">6년</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">21,600</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">19,769</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">17,138</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">79.3%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">19,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">88.0%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">19,713</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">91.3%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">7년</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">25,200</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">23,064</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">19,429</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">77.1%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">22,151</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">87.9%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">23,079</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">91.6%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">8년</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">28,800</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">26,359</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">21,596</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">75.0%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">25,265</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">87.7%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">26,408</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">91.7%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">9년</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">32,400</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">29,654</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">23,642</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">73.0%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">28,343</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">87.5%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">29,700</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">91.7%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">10년</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">36,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">32,949</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">25,570</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">71.0%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">31,385</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">87.2%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">32,955</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">91.5%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">15년</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">36,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">32,949</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">27,070</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">75.2%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">35,570</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">98.8%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">39,570</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">109.9%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">20년</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">36,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">32,949</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">27,070</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">75.2%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">32,570</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">90.5%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">32,570</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">90.5%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 적립형 - 여자 */}
      <div className="space-y-4 mt-8">
        <div className="text-xs text-gray-600 text-right">
          [기준 : 여자 40세, 연금개시 60세, 10년납, 월납, 기본보험료 월 30만원(단위: 천원)]
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full text-center text-[10px] md:text-sm">
            <thead>
              <tr className="bg-[#1e3a8a] text-white align-middle">
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm" rowSpan={2}>경과<br className="md:hidden" />기간</th>
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm" rowSpan={2}>납입<br className="md:hidden" />보험료(A)</th>
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm" rowSpan={2}>특별계정<br className="md:hidden" />투입금액<br className="md:hidden" />누계</th>
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm" colSpan={2}>투자수익률 -1.00% 가정시<br />(순수익률 -4.70%)</th>
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm" colSpan={2}>투자수익률 2.50% 가정시<br />(순수익률 -1.20%)</th>
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm" colSpan={2}>투자수익률 3.75% 가정시<br />(순수익률 0.05%)</th>
              </tr>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">금액</th>
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">환급률<br />(B/A)</th>
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">금액</th>
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">환급률<br />(B/A)</th>
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">금액</th>
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">환급률<br />(B/A)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3개월</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">900</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">823</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">127</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">14.1%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">132</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">14.7%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">133</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">14.8%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">6개월</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,800</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,647</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">963</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">53.5%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">979</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">54.4%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">985</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">54.7%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">9개월</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">2,700</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">2,471</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,789</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">66.3%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,824</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">67.6%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,837</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">68.0%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1년</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,600</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,295</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">2,606</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">72.4%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">2,667</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">74.1%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">2,689</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">74.7%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">2년</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">7,200</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">6,590</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">5,783</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">80.3%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">6,012</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">83.5%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">6,095</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">84.7%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3년</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">10,800</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">9,885</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">8,818</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">81.6%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">9,318</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">86.3%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">9,501</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">88.0%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">4년</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">14,400</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">13,180</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">11,718</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">81.4%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">12,584</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">87.4%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">12,906</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">89.6%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">5년</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">18,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">16,475</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">14,490</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">80.5%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">15,812</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">87.8%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">16,310</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">90.6%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">6년</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">21,600</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">19,770</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">17,138</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">79.3%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">19,001</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">88.0%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">19,714</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">91.3%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">7년</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">25,200</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">23,065</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">19,670</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">78.1%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">22,152</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">87.9%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">23,116</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">91.7%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">8년</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">28,800</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">26,360</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">21,987</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">76.3%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">25,163</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">87.4%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">26,416</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">91.7%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">9년</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">32,400</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">29,655</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">24,197</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">74.7%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">28,137</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">86.8%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">29,714</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">91.7%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">10년</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">36,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">32,950</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">26,306</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">73.1%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">31,074</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">86.3%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">33,011</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">91.7%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">15년</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">36,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">32,770</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">20,625</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">57.3%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">29,036</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">80.7%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">32,791</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">91.1%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">20년</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">36,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">32,589</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">16,136</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">44.8%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">27,120</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">75.3%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">32,570</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">90.5%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 주석 */}
      <div className="mt-8 space-y-2 text-xs text-gray-700">
        <div className="font-semibold">(주)</div>
        <div>1. 이 보험계약은 납입한 보험료중 위험보험료, 사업비 및 특약보험료를 차감한 후 특별계정(펀드)으로 투입·운용되고, 특별계정(펀드)의 투자수익률이 반영된 특별계정 계약자적립액에서 보증비용 등이 차감됩니다. 상기 순수익률은 보증비용 등이 차감된 후의 수익률입니다.</div>
        <div>2. 특별계정(펀드) 투자수익률은 펀드의 기준가격의 변동으로 계산되며, 특별계정운용보수, 증권거래비용 및 기타비용은 매일 차감되어 기준가격에 반영되어 있습니다.</div>
        <div>3. 해약환급금은 특별계정(펀드) 투자수익률에 따라 매일 변동하며, 중도해지시 특별계정 계약자적립액에서 미상각신계약비(해약공제액)를 차감하므로 해약환급금은 납입보험료보다 적거나 없을 수도 있습니다.</div>
        <div>4. 해약환급금에는 최저보증이 없어 원금손실이 발생할 수 있으며, 그 손실은 모두 계약자에게 귀속됩니다.</div>
        <div>5. 상기 환급률은 투자수익률이 경과기간 동안 일정하게 유지된다고 가정하였을 때 계약자가 납입한 보험료 대비 해약환급금의 비율입니다.</div>
        <div>6. 상기 예시된 금액 및 환급률 등이 미래의 수익을 보장하는 것은 아닙니다.</div>
        <div>7. 상기예시금액의 투자수익률은 -1%, 보험업감독규정 제1-2조제13호에 따른 평균공시이율 2.5% 및 동 이율의 1.5배인 3.75%를 기준으로 계산한 금액입니다.</div>
        <div>8. 평균공시이율은 감독원장이 정하는 바에 따라 산정한 전체 보험회사 공시이율의 평균으로, 전년도 8월말 기준 직전 12개월간 보험회사 평균공시이율입니다.</div>
      </div>

    </div>
  )
}
