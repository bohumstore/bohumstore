import React from 'react'

export default function Surrender() {
  return (
    <div className="space-y-8 px-2 sm:px-4 md:px-8 py-4 md:py-6">
      <div className="mb-2">
        <div className="text-[#1e3a8a] text-2xl md:text-3xl font-extrabold mb-1">■ 해약환급금 예시표</div>
        <div className="w-full h-1 bg-[#1e3a8a] mb-3" />
        <div className="flex justify-between items-start mt-2">
          <div className="flex flex-col gap-0.5">
            <span className="text-[#1e3a8a] text-lg md:text-xl font-bold leading-tight">연금개시전 보험기간</span>
          </div>
          <div className="text-right text-xs text-gray-600">
            <p>단위 : 달러 (달러미만절사)</p>
            <p>예시기준 : 남자 40세, 5년납, 60세연금지급개시, 월보험료 200달러</p>
          </div>
        </div>
      </div>
      
      {/* 표 */}
      <div className="overflow-x-auto">
        <table className="w-full text-center text-xs md:text-sm border-collapse">
          <thead>
            <tr className="bg-[#1e3a8a] text-white align-middle">
              <th className="border border-gray-300 p-1 md:p-2" rowSpan={2}>경과<br/>기간</th>
              <th className="border border-gray-300 p-1 md:p-2" rowSpan={2}>보험<br/>나이</th>
              <th className="border border-gray-300 p-1 md:p-2" rowSpan={2}>납입보험료<br/>(A)</th>
              <th className="border border-gray-300 p-1 md:p-2" colSpan={2}>①최저보증이율가정<br/>(5년이내 1.0%<br/>5년초과 0.7%)</th>
              <th className="border border-gray-300 p-1 md:p-2" colSpan={2}>②평균공시이율과 현재 공시<br/>이율 중 낮은 이율 2.50% 가정</th>
              <th className="border border-gray-300 p-1 md:p-2" colSpan={2}>③현재 공시이율 4.69% 가정</th>
            </tr>
            <tr className="bg-[#1e3a8a] text-white">
              <th className="border border-gray-300 p-1 md:p-2">해약환급금</th>
              <th className="border border-gray-300 p-1 md:p-2">환급률</th>
              <th className="border border-gray-300 p-1 md:p-2">해약환급금</th>
              <th className="border border-gray-300 p-1 md:p-2">환급률</th>
              <th className="border border-gray-300 p-1 md:p-2">해약환급금</th>
              <th className="border border-gray-300 p-1 md:p-2">환급률</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-gray-300 p-1 md:p-2">3개월</td><td className="border border-gray-300 p-1 md:p-2">40세</td><td className="border border-gray-300 p-1 md:p-2">600</td><td className="border border-gray-300 p-1 md:p-2">0</td><td className="border border-gray-300 p-1 md:p-2">0.00%</td><td className="border border-gray-300 p-1 md:p-2">0</td><td className="border border-gray-300 p-1 md:p-2">0.00%</td><td className="border border-gray-300 p-1 md:p-2">0</td><td className="border border-gray-300 p-1 md:p-2">0.00%</td></tr>
            <tr><td className="border border-gray-300 p-1 md:p-2">6개월</td><td className="border border-gray-300 p-1 md:p-2">40세</td><td className="border border-gray-300 p-1 md:p-2">1,200</td><td className="border border-gray-300 p-1 md:p-2">171</td><td className="border border-gray-300 p-1 md:p-2">14.25%</td><td className="border border-gray-300 p-1 md:p-2">174</td><td className="border border-gray-300 p-1 md:p-2">14.50%</td><td className="border border-gray-300 p-1 md:p-2">177</td><td className="border border-gray-300 p-1 md:p-2">14.75%</td></tr>
            <tr><td className="border border-gray-300 p-1 md:p-2">9개월</td><td className="border border-gray-300 p-1 md:p-2">40세</td><td className="border border-gray-300 p-1 md:p-2">1,800</td><td className="border border-gray-300 p-1 md:p-2">435</td><td className="border border-gray-300 p-1 md:p-2">24.17%</td><td className="border border-gray-300 p-1 md:p-2">440</td><td className="border border-gray-300 p-1 md:p-2">24.44%</td><td className="border border-gray-300 p-1 md:p-2">447</td><td className="border border-gray-300 p-1 md:p-2">24.83%</td></tr>
            <tr><td className="border border-gray-300 p-1 md:p-2">1년</td><td className="border border-gray-300 p-1 md:p-2">41세</td><td className="border border-gray-300 p-1 md:p-2">2,400</td><td className="border border-gray-300 p-1 md:p-2">700</td><td className="border border-gray-300 p-1 md:p-2">29.17%</td><td className="border border-gray-300 p-1 md:p-2">708</td><td className="border border-gray-300 p-1 md:p-2">29.50%</td><td className="border border-gray-300 p-1 md:p-2">719</td><td className="border border-gray-300 p-1 md:p-2">29.96%</td></tr>
            <tr><td className="border border-gray-300 p-1 md:p-2">2년</td><td className="border border-gray-300 p-1 md:p-2">42세</td><td className="border border-gray-300 p-1 md:p-2">4,800</td><td className="border border-gray-300 p-1 md:p-2">1,764</td><td className="border border-gray-300 p-1 md:p-2">36.75%</td><td className="border border-gray-300 p-1 md:p-2">1,795</td><td className="border border-gray-300 p-1 md:p-2">37.40%</td><td className="border border-gray-300 p-1 md:p-2">1,841</td><td className="border border-gray-300 p-1 md:p-2">38.35%</td></tr>
            <tr><td className="border border-gray-300 p-1 md:p-2">3년</td><td className="border border-gray-300 p-1 md:p-2">43세</td><td className="border border-gray-300 p-1 md:p-2">7,200</td><td className="border border-gray-300 p-1 md:p-2">2,838</td><td className="border border-gray-300 p-1 md:p-2">39.42%</td><td className="border border-gray-300 p-1 md:p-2">2,908</td><td className="border border-gray-300 p-1 md:p-2">40.39%</td><td className="border border-gray-300 p-1 md:p-2">3,011</td><td className="border border-gray-300 p-1 md:p-2">41.82%</td></tr>
            <tr><td className="border border-gray-300 p-1 md:p-2">4년</td><td className="border border-gray-300 p-1 md:p-2">44세</td><td className="border border-gray-300 p-1 md:p-2">9,600</td><td className="border border-gray-300 p-1 md:p-2">3,923</td><td className="border border-gray-300 p-1 md:p-2">40.86%</td><td className="border border-gray-300 p-1 md:p-2">4,046</td><td className="border border-gray-300 p-1 md:p-2">42.15%</td><td className="border border-gray-300 p-1 md:p-2">4,233</td><td className="border border-gray-300 p-1 md:p-2">44.09%</td></tr>
            <tr><td className="border border-gray-300 p-1 md:p-2">5년</td><td className="border border-gray-300 p-1 md:p-2">45세</td><td className="border border-gray-300 p-1 md:p-2">12,000</td><td className="border border-gray-300 p-1 md:p-2">5,017</td><td className="border border-gray-300 p-1 md:p-2">41.81%</td><td className="border border-gray-300 p-1 md:p-2">5,212</td><td className="border border-gray-300 p-1 md:p-2">43.43%</td><td className="border border-gray-300 p-1 md:p-2">5,509</td><td className="border border-gray-300 p-1 md:p-2">45.91%</td></tr>
            <tr><td className="border border-gray-300 p-1 md:p-2">6년</td><td className="border border-gray-300 p-1 md:p-2">46세</td><td className="border border-gray-300 p-1 md:p-2">12,000</td><td className="border border-gray-300 p-1 md:p-2">4,895</td><td className="border border-gray-300 p-1 md:p-2">40.79%</td><td className="border border-gray-300 p-1 md:p-2">5,184</td><td className="border border-gray-300 p-1 md:p-2">43.20%</td><td className="border border-gray-300 p-1 md:p-2">5,607</td><td className="border border-gray-300 p-1 md:p-2">46.73%</td></tr>
            <tr>
              <td className="border border-gray-300 p-1 md:p-2">7년</td>
              <td className="border border-gray-300 p-1 md:p-2">47세</td>
              <td className="border border-gray-300 p-1 md:p-2">12,000</td>
              <td className="border border-gray-300 p-1 md:p-2">12,000</td>
              <td className="border border-gray-300 p-1 md:p-2">100.00%</td>
              <td className="border border-gray-300 p-1 md:p-2">12,000</td>
              <td className="border border-gray-300 p-1 md:p-2">100.00%</td>
              <td className="border border-gray-300 p-1 md:p-2">12,000</td>
              <td className="border border-gray-300 p-1 md:p-2">100.00%</td>
            </tr>
            <tr><td className="border border-gray-300 p-1 md:p-2">8년</td><td className="border border-gray-300 p-1 md:p-2">48세</td><td className="border border-gray-300 p-1 md:p-2">12,000</td><td className="border border-gray-300 p-1 md:p-2">11,927</td><td className="border border-gray-300 p-1 md:p-2">99.39%</td><td className="border border-gray-300 p-1 md:p-2">12,141</td><td className="border border-gray-300 p-1 md:p-2">101.18%</td><td className="border border-gray-300 p-1 md:p-2">12,402</td><td className="border border-gray-300 p-1 md:p-2">103.35%</td></tr>
            <tr><td className="border border-gray-300 p-1 md:p-2">9년</td><td className="border border-gray-300 p-1 md:p-2">49세</td><td className="border border-gray-300 p-1 md:p-2">12,000</td><td className="border border-gray-300 p-1 md:p-2">11,854</td><td className="border border-gray-300 p-1 md:p-2">98.78%</td><td className="border border-gray-300 p-1 md:p-2">12,287</td><td className="border border-gray-300 p-1 md:p-2">102.39%</td><td className="border border-gray-300 p-1 md:p-2">12,824</td><td className="border border-gray-300 p-1 md:p-2">106.87%</td></tr>
            <tr className="bg-red-50">
              <td className="border border-gray-300 p-1 md:p-2 bg-red-50">10년</td>
              <td className="border border-gray-300 p-1 md:p-2 bg-red-50">50세</td>
              <td className="border border-gray-300 p-1 md:p-2 bg-red-50">12,000</td>
              <td className="border border-gray-300 p-1 md:p-2 bg-red-50">15,600</td>
              <td className="border border-gray-300 p-1 md:p-2 bg-red-50">130.00%</td>
              <td className="border border-gray-300 p-1 md:p-2 bg-red-50">15,600</td>
              <td className="border border-gray-300 p-1 md:p-2 bg-red-50">130.00%</td>
              <td className="border border-gray-300 p-1 md:p-2 bg-red-50">15,600</td>
              <td className="border border-gray-300 p-1 md:p-2 bg-red-50">130.00%</td>
            </tr>
            <tr><td className="border border-gray-300 p-1 md:p-2">11년</td><td className="border border-gray-300 p-1 md:p-2">51세</td><td className="border border-gray-300 p-1 md:p-2">12,000</td><td className="border border-gray-300 p-1 md:p-2">15,419</td><td className="border border-gray-300 p-1 md:p-2">128.49%</td><td className="border border-gray-300 p-1 md:p-2">15,697</td><td className="border border-gray-300 p-1 md:p-2">130.81%</td><td className="border border-gray-300 p-1 md:p-2">16,035</td><td className="border border-gray-300 p-1 md:p-2">133.63%</td></tr>
            <tr><td className="border border-gray-300 p-1 md:p-2">12년</td><td className="border border-gray-300 p-1 md:p-2">52세</td><td className="border border-gray-300 p-1 md:p-2">12,000</td><td className="border border-gray-300 p-1 md:p-2">15,238</td><td className="border border-gray-300 p-1 md:p-2">126.98%</td><td className="border border-gray-300 p-1 md:p-2">15,797</td><td className="border border-gray-300 p-1 md:p-2">131.64%</td><td className="border border-gray-300 p-1 md:p-2">16,492</td><td className="border border-gray-300 p-1 md:p-2">137.43%</td></tr>
            <tr><td className="border border-gray-300 p-1 md:p-2">13년</td><td className="border border-gray-300 p-1 md:p-2">53세</td><td className="border border-gray-300 p-1 md:p-2">12,000</td><td className="border border-gray-300 p-1 md:p-2">15,055</td><td className="border border-gray-300 p-1 md:p-2">125.46%</td><td className="border border-gray-300 p-1 md:p-2">15,900</td><td className="border border-gray-300 p-1 md:p-2">132.50%</td><td className="border border-gray-300 p-1 md:p-2">16,970</td><td className="border border-gray-300 p-1 md:p-2">141.42%</td></tr>
            <tr><td className="border border-gray-300 p-1 md:p-2">14년</td><td className="border border-gray-300 p-1 md:p-2">54세</td><td className="border border-gray-300 p-1 md:p-2">12,000</td><td className="border border-gray-300 p-1 md:p-2">14,871</td><td className="border border-gray-300 p-1 md:p-2">123.93%</td><td className="border border-gray-300 p-1 md:p-2">16,005</td><td className="border border-gray-300 p-1 md:p-2">133.38%</td><td className="border border-gray-300 p-1 md:p-2">17,470</td><td className="border border-gray-300 p-1 md:p-2">145.58%</td></tr>
            <tr><td className="border border-gray-300 p-1 md:p-2">15년</td><td className="border border-gray-300 p-1 md:p-2">55세</td><td className="border border-gray-300 p-1 md:p-2">12,000</td><td className="border border-gray-300 p-1 md:p-2">14,685</td><td className="border border-gray-300 p-1 md:p-2">122.38%</td><td className="border border-gray-300 p-1 md:p-2">16,113</td><td className="border border-gray-300 p-1 md:p-2">134.28%</td><td className="border border-gray-300 p-1 md:p-2">17,993</td><td className="border border-gray-300 p-1 md:p-2">149.94%</td></tr>
            <tr><td className="border border-gray-300 p-1 md:p-2">16년</td><td className="border border-gray-300 p-1 md:p-2">56세</td><td className="border border-gray-300 p-1 md:p-2">12,000</td><td className="border border-gray-300 p-1 md:p-2">14,499</td><td className="border border-gray-300 p-1 md:p-2">120.83%</td><td className="border border-gray-300 p-1 md:p-2">16,224</td><td className="border border-gray-300 p-1 md:p-2">135.20%</td><td className="border border-gray-300 p-1 md:p-2">18,542</td><td className="border border-gray-300 p-1 md:p-2">154.52%</td></tr>
            <tr><td className="border border-gray-300 p-1 md:p-2">17년</td><td className="border border-gray-300 p-1 md:p-2">57세</td><td className="border border-gray-300 p-1 md:p-2">12,000</td><td className="border border-gray-300 p-1 md:p-2">14,311</td><td className="border border-gray-300 p-1 md:p-2">119.26%</td><td className="border border-gray-300 p-1 md:p-2">16,337</td><td className="border border-gray-300 p-1 md:p-2">136.14%</td><td className="border border-gray-300 p-1 md:p-2">19,116</td><td className="border border-gray-300 p-1 md:p-2">159.30%</td></tr>
            <tr><td className="border border-gray-300 p-1 md:p-2">18년</td><td className="border border-gray-300 p-1 md:p-2">58세</td><td className="border border-gray-300 p-1 md:p-2">12,000</td><td className="border border-gray-300 p-1 md:p-2">14,121</td><td className="border border-gray-300 p-1 md:p-2">117.68%</td><td className="border border-gray-300 p-1 md:p-2">16,453</td><td className="border border-gray-300 p-1 md:p-2">137.11%</td><td className="border border-gray-300 p-1 md:p-2">19,716</td><td className="border border-gray-300 p-1 md:p-2">164.30%</td></tr>
            <tr><td className="border border-gray-300 p-1 md:p-2">19년</td><td className="border border-gray-300 p-1 md:p-2">59세</td><td className="border border-gray-300 p-1 md:p-2">12,000</td><td className="border border-gray-300 p-1 md:p-2">13,931</td><td className="border border-gray-300 p-1 md:p-2">116.09%</td><td className="border border-gray-300 p-1 md:p-2">16,572</td><td className="border border-gray-300 p-1 md:p-2">138.10%</td><td className="border border-gray-300 p-1 md:p-2">20,345</td><td className="border border-gray-300 p-1 md:p-2">169.54%</td></tr>
            <tr><td className="border border-gray-300 p-1 md:p-2">20년</td><td className="border border-gray-300 p-1 md:p-2">60세</td><td className="border border-gray-300 p-1 md:p-2">12,000</td><td className="border border-gray-300 p-1 md:p-2">13,739</td><td className="border border-gray-300 p-1 md:p-2">114.49%</td><td className="border border-gray-300 p-1 md:p-2">16,694</td><td className="border border-gray-300 p-1 md:p-2">139.12%</td><td className="border border-gray-300 p-1 md:p-2">21,004</td><td className="border border-gray-300 p-1 md:p-2">175.03%</td></tr>
          </tbody>
        </table>
      </div>

      {/* 주석 */}
      <div className="mt-4 space-y-2 text-xs md:text-sm text-gray-800">
        <p>●해약환급금 ②는 평균공시이율(2.5%)과 공시이율 연복리 4.69%(2026년 6월 현재) 중 낮은 이율을 적용합니다.</p>
        <p>●해약환급금 ③의 공시이율 연복리 4.69%는 2026년 6월 현재 공시이율을 적용합니다.</p>
        <p>●상기 예시된 금액은 세전기준입니다.</p>
      </div>

      {/* 해약환급금 예시관련 */}
      <div className="mt-6 space-y-3">
        <h3 className="text-lg font-bold text-[#1e3a8a]">[해약환급금 예시관련]</h3>
        <div className="space-y-2 text-xs md:text-sm text-gray-800">
          <p>ㆍ이 보험계약을 중도 해지할 경우 해약환급금은 이미 납입한 보험료에서 경과된 기간의 위험보험료, 계약체결비용, 계약관리비용, 해약공제금액, 최저계약자적립액 보증비용 등이 차감되므로 이미 납입한 보험료보다 적거나 없을 수도 있습니다.</p>
          <p>ㆍ`해약환급금 및 환급률 예시` 에서 ①은 이 계약의 최저보증이율(5년이내 1.0%, 5년초과 0.7%)을 적용하여 계산한 금액입니다.</p>
          <p>ㆍ`해약환급금 및 환급률 예시` 에서 ②은 감독규정 제1-2조 제13호에 따른 2026년 6월 현재 평균공시이율2.50%와 2026년 6월 현재 공시이율 4.69% 중 작은 이율을 적용하여 계산한 금액입니다.</p>
          <p>ㆍ`해약환급금 및 환급률 예시` 에서 ③은 2026년 6월 현재 공시이율 4.69%을 적용하여 계산한 금액입니다.</p>
          <p>ㆍ평균공시이율은 감독원장이 정하는 바에 따라 산정한 전체 보험회사 공시이율의 평균으로, 전년도 8월말 기준 직전 12개월간 보험회사 평균공시이율입니다.</p>
          <p>ㆍ공시이율은 매월 결정되며 최저보증이율은 계약일부터 5년이내 연복리 1.0%, 5년초과 0.7% 입니다. 회사는 운용자산이익률과 시장금리를 기준으로 향후 예상수익 등 경영환경을 고려하여 공시이율을 결정합니다.</p>
          <p>ㆍ실제 해약환급금은 공시이율을 적용하여 계산되며, 공시이율 변동시 해약환급금도 변동됩니다.</p>
          <p>ㆍ상기 환급률은 최저보증이율 및 현재 적용이율이 경과기간동안 유지된다고 가정하였을 때 계약자가 납입한보험료 대비 해약환급금의 비율입니다.</p>
          <p>ㆍ상기 예시된 금액 및 환급률 등이 미래의 수익을 보장하는 것은 아닙니다.</p>
          <p>ㆍ상기 예시된 금액 및 환급률은 7년 및 10년 경과시점의 최저계약자적립액 보증을 반영한 금액이며, 계약해당일이 도래하기 이전에 해지시 예시된 금액과 다를 수 있습니다.</p>
          <p>ㆍ연금개시시점보다 계약일로부터 30년 경과시점이 먼저 도래할 경우, 30년 경과시점의 최저계약자적립액 보증을 반영한 금액이며, 계약해당일이 도래하기 이전에 해지시 예시된 금액과 다를 수 있습니다. 해약환급금 예시표는 연금개시시점 최저계약자적립액 보증을 반영한 금액입니다. 다만, 연금개시시점이 계약일로부터 30년 경과시점보다 먼저 도래할 경우 연금을 개시하는 경우에 한하여 보증해드립니다.</p>
          <p>ㆍ최저 계약자적립액 보증은 감액이 발생한 경우 기본보험료에 비례하여 감소합니다.</p>
          <p>ㆍ최저 계약자적립액 보증은 중도인출이 발생한 경우 보증금액에서 기본보험료에 의한 계약자적립액 인출금액 및 공시이율에 따라 해당 인출금액에 적립되는 이자를 차감하여 보증하며, 중도인출금액을 재납입하더라도 원복되지 않습니다.</p>
        </div>
      </div>

      {/* 적용이율 관련 */}
      <div className="mt-6 space-y-3">
        <h3 className="text-lg font-bold text-[#1e3a8a]">[적용이율 관련]</h3>
        <div className="space-y-2 text-xs md:text-sm text-gray-800">
          <p>ㆍ이 보험의 연금계약적립액 산출이 적용되는 공시이율은 매월 변동되며, 2026년 6월 현재 연복리  4.69%이고, 최저보증이율은 가입 후 5년 이내에 1.0%, 5년을 초과하는 경우에는 연복리 0.7%입니다. 회사는 운용자산이익률과 시장금리를 기준으로 향후 예상수익 등 경영환경을 고려하여 공시이율을 결정합니다.</p>
          <p>ㆍ동 이율은 납입보험료에서 사업비 (계약체결비용 및 계약관리비용) 및 최저계약자적립액 보증비용,  위험보장을 위한 보험료를 차감한 금액에 대해 적용됩니다.</p>
        </div>
      </div>
    </div>
  )
}
