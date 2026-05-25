import React from 'react'

export default function Surrender() {
  return (
    <div className="space-y-8 px-2 sm:px-4 md:px-8 py-4 md:py-6">
      <div className="mb-2">
        <div className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">해약환급금 예시표</div>
        <div className="text-xs text-gray-600 text-right ml-2 pb-0 mt-4">
          기준: 남자 40세, 일반심사형, 보험료형, 종신, 5년납, 월납, 30만원 (단위: 원, %)
        </div>
      </div>
      {/* 표 */}
      <div className="overflow-x-auto">
        <table className="w-full text-center text-xs md:text-sm">
          <thead>
            <tr className="bg-[#1e3a8a] text-white">
              <th className="border border-gray-300 p-1 sm:p-2">경과기간</th>
              <th className="border border-gray-300 p-1 sm:p-2">나이</th>
              <th className="border border-gray-300 p-1 sm:p-2">납입보험료누계</th>
              <th className="border border-gray-300 p-1 sm:p-2">사망보험금<br />(주계약)</th>
              <th className="border border-gray-300 p-1 sm:p-2">해약환급금</th>
              <th className="border border-gray-300 p-1 sm:p-2">환급률</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-gray-300 p-1 sm:p-2">3개월</td><td className="border border-gray-300 p-1 sm:p-2">40세</td><td className="border border-gray-300 p-1 sm:p-2">900,000</td><td className="border border-gray-300 p-1 sm:p-2">9,939,041</td><td className="border border-gray-300 p-1 sm:p-2">31,990</td><td className="border border-gray-300 p-1 sm:p-2">3.5</td></tr>
            <tr><td className="border border-gray-300 p-1 sm:p-2">6개월</td><td className="border border-gray-300 p-1 sm:p-2">40세</td><td className="border border-gray-300 p-1 sm:p-2">1,800,000</td><td className="border border-gray-300 p-1 sm:p-2">9,939,041</td><td className="border border-gray-300 p-1 sm:p-2">409,163</td><td className="border border-gray-300 p-1 sm:p-2">22.7</td></tr>
            <tr><td className="border border-gray-300 p-1 sm:p-2">9개월</td><td className="border border-gray-300 p-1 sm:p-2">40세</td><td className="border border-gray-300 p-1 sm:p-2">2,700,000</td><td className="border border-gray-300 p-1 sm:p-2">9,939,041</td><td className="border border-gray-300 p-1 sm:p-2">786,336</td><td className="border border-gray-300 p-1 sm:p-2">29.1</td></tr>
            <tr><td className="border border-gray-300 p-1 sm:p-2">1년</td><td className="border border-gray-300 p-1 sm:p-2">41세</td><td className="border border-gray-300 p-1 sm:p-2">3,600,000</td><td className="border border-gray-300 p-1 sm:p-2">9,939,041</td><td className="border border-gray-300 p-1 sm:p-2">1,163,509</td><td className="border border-gray-300 p-1 sm:p-2">32.3</td></tr>
            <tr><td className="border border-gray-300 p-1 sm:p-2">2년</td><td className="border border-gray-300 p-1 sm:p-2">42세</td><td className="border border-gray-300 p-1 sm:p-2">7,200,000</td><td className="border border-gray-300 p-1 sm:p-2">9,939,041</td><td className="border border-gray-300 p-1 sm:p-2">2,710,461</td><td className="border border-gray-300 p-1 sm:p-2">37.6</td></tr>
            <tr><td className="border border-gray-300 p-1 sm:p-2">3년</td><td className="border border-gray-300 p-1 sm:p-2">43세</td><td className="border border-gray-300 p-1 sm:p-2">10,800,000</td><td className="border border-gray-300 p-1 sm:p-2">10,800,000</td><td className="border border-gray-300 p-1 sm:p-2">4,296,772</td><td className="border border-gray-300 p-1 sm:p-2">39.7</td></tr>
            <tr><td className="border border-gray-300 p-1 sm:p-2">4년</td><td className="border border-gray-300 p-1 sm:p-2">44세</td><td className="border border-gray-300 p-1 sm:p-2">14,400,000</td><td className="border border-gray-300 p-1 sm:p-2">14,400,000</td><td className="border border-gray-300 p-1 sm:p-2">5,923,649</td><td className="border border-gray-300 p-1 sm:p-2">41.1</td></tr>
            <tr><td className="border border-gray-300 p-1 sm:p-2">5년</td><td className="border border-gray-300 p-1 sm:p-2">45세</td><td className="border border-gray-300 p-1 sm:p-2">18,000,000</td><td className="border border-gray-300 p-1 sm:p-2">18,000,000</td><td className="border border-gray-300 p-1 sm:p-2">16,200,001</td><td className="border border-gray-300 p-1 sm:p-2">90.0</td></tr>
            <tr><td className="border border-gray-300 p-1 sm:p-2">7년</td><td className="border border-gray-300 p-1 sm:p-2">47세</td><td className="border border-gray-300 p-1 sm:p-2">18,000,000</td><td className="border border-gray-300 p-1 sm:p-2">18,000,000</td><td className="border border-gray-300 p-1 sm:p-2">16,753,954</td><td className="border border-gray-300 p-1 sm:p-2">93.0</td></tr>
            <tr><td className="border border-gray-300 p-1 sm:p-2">9년</td><td className="border border-gray-300 p-1 sm:p-2">49세</td><td className="border border-gray-300 p-1 sm:p-2">18,000,000</td><td className="border border-gray-300 p-1 sm:p-2">18,000,000</td><td className="border border-gray-300 p-1 sm:p-2">17,337,932</td><td className="border border-gray-300 p-1 sm:p-2">96.3</td></tr>
            <tr className="bg-red-50">
              <td className="border border-gray-300 p-1 sm:p-2">10년</td>
              <td className="border border-gray-300 p-1 sm:p-2">50세</td>
              <td className="border border-gray-300 p-1 sm:p-2">18,000,000</td>
              <td className="border border-gray-300 p-1 sm:p-2">21,906,901</td>
              <td className="border border-gray-300 p-1 sm:p-2">21,690,001</td>
              <td className="border border-gray-300 p-1 sm:p-2">120.5</td>
            </tr>
            <tr><td className="border border-gray-300 p-1 sm:p-2">15년</td><td className="border border-gray-300 p-1 sm:p-2">55세</td><td className="border border-gray-300 p-1 sm:p-2">18,000,000</td><td className="border border-gray-300 p-1 sm:p-2">22,614,082</td><td className="border border-gray-300 p-1 sm:p-2">22,390,180</td><td className="border border-gray-300 p-1 sm:p-2">124.3</td></tr>
            <tr><td className="border border-gray-300 p-1 sm:p-2">19년</td><td className="border border-gray-300 p-1 sm:p-2">59세</td><td className="border border-gray-300 p-1 sm:p-2">18,000,000</td><td className="border border-gray-300 p-1 sm:p-2">23,212,852</td><td className="border border-gray-300 p-1 sm:p-2">22,983,022</td><td className="border border-gray-300 p-1 sm:p-2">127.6</td></tr>
            <tr><td className="border border-gray-300 p-1 sm:p-2">20년</td><td className="border border-gray-300 p-1 sm:p-2">60세</td><td className="border border-gray-300 p-1 sm:p-2">18,000,000</td><td className="border border-gray-300 p-1 sm:p-2">24,434,528</td><td className="border border-gray-300 p-1 sm:p-2">24,192,602</td><td className="border border-gray-300 p-1 sm:p-2">134.4</td></tr>
            <tr><td className="border border-gray-300 p-1 sm:p-2">25년</td><td className="border border-gray-300 p-1 sm:p-2">65세</td><td className="border border-gray-300 p-1 sm:p-2">18,000,000</td><td className="border border-gray-300 p-1 sm:p-2">25,306,941</td><td className="border border-gray-300 p-1 sm:p-2">25,056,378</td><td className="border border-gray-300 p-1 sm:p-2">139.2</td></tr>
            <tr><td className="border border-gray-300 p-1 sm:p-2">30년</td><td className="border border-gray-300 p-1 sm:p-2">70세</td><td className="border border-gray-300 p-1 sm:p-2">18,000,000</td><td className="border border-gray-300 p-1 sm:p-2">26,233,786</td><td className="border border-gray-300 p-1 sm:p-2">25,974,045</td><td className="border border-gray-300 p-1 sm:p-2">144.3</td></tr>
            <tr><td className="border border-gray-300 p-1 sm:p-2">35년</td><td className="border border-gray-300 p-1 sm:p-2">75세</td><td className="border border-gray-300 p-1 sm:p-2">18,000,000</td><td className="border border-gray-300 p-1 sm:p-2">27,215,540</td><td className="border border-gray-300 p-1 sm:p-2">26,946,079</td><td className="border border-gray-300 p-1 sm:p-2">149.7</td></tr>
            <tr><td className="border border-gray-300 p-1 sm:p-2">40년</td><td className="border border-gray-300 p-1 sm:p-2">80세</td><td className="border border-gray-300 p-1 sm:p-2">18,000,000</td><td className="border border-gray-300 p-1 sm:p-2">28,248,136</td><td className="border border-gray-300 p-1 sm:p-2">27,968,452</td><td className="border border-gray-300 p-1 sm:p-2">155.3</td></tr>
            <tr><td className="border border-gray-300 p-1 sm:p-2">45년</td><td className="border border-gray-300 p-1 sm:p-2">85세</td><td className="border border-gray-300 p-1 sm:p-2">18,000,000</td><td className="border border-gray-300 p-1 sm:p-2">29,325,174</td><td className="border border-gray-300 p-1 sm:p-2">29,034,826</td><td className="border border-gray-300 p-1 sm:p-2">161.3</td></tr>
            <tr><td className="border border-gray-300 p-1 sm:p-2">50년</td><td className="border border-gray-300 p-1 sm:p-2">90세</td><td className="border border-gray-300 p-1 sm:p-2">18,000,000</td><td className="border border-gray-300 p-1 sm:p-2">30,434,643</td><td className="border border-gray-300 p-1 sm:p-2">30,133,310</td><td className="border border-gray-300 p-1 sm:p-2">167.4</td></tr>
            <tr><td className="border border-gray-300 p-1 sm:p-2">55년</td><td className="border border-gray-300 p-1 sm:p-2">95세</td><td className="border border-gray-300 p-1 sm:p-2">18,000,000</td><td className="border border-gray-300 p-1 sm:p-2">31,555,620</td><td className="border border-gray-300 p-1 sm:p-2">31,243,188</td><td className="border border-gray-300 p-1 sm:p-2">173.5</td></tr>
            <tr><td className="border border-gray-300 p-1 sm:p-2">60년</td><td className="border border-gray-300 p-1 sm:p-2">100세</td><td className="border border-gray-300 p-1 sm:p-2">18,000,000</td><td className="border border-gray-300 p-1 sm:p-2">32,657,731</td><td className="border border-gray-300 p-1 sm:p-2">32,334,387</td><td className="border border-gray-300 p-1 sm:p-2">179.6</td></tr>
          </tbody>
        </table>
      </div>
      {/* 주석 */}
      <div className="space-y-2 text-xs sm:text-sm text-gray-600">
        <p>※ 이 보험계약을 중도 해지할 경우 해약환급금은 납입한 보험료에서 경과된 기간의 위험보험료, 계약체결비용(해약공제액 포함) 및 계약관리비용 등이 차감되므로 납입보험료보다 적거나 없을 수도 있습니다.</p>
        <p>※ 보험료 납입기간 이후 계약자적립액의 인출 및 추가납입 여부에 따라 <span className="text-red-600 font-medium">달라지거나 감소</span>할 수 있습니다.</p>
        <p>※ 위 해약환급금 예시는 가입금액의 감액, 계약내용의 변경 또는 보험금 지급사유 발생 등에 따라 <span className="text-red-600 font-medium">금액이 달라지거나 감소</span>할 수 있습니다.</p>
        <p>※ 위 예시표는 경과년도 계약해당일 직전 기준입니다.</p>
        <p>※ 사망당시에 이미 납입한 보험료가 사망보험금을 초과하는 경우, 이미 납입한 보험료를 사망보험금으로 지급하여 드립니다. 다만, 이때 이미 납입한 특약보험료는 제외합니다.</p>
        <p>※ 위 예시표는 <span className="text-red-600 font-medium">납입완료보너스 및 장기유지보너스가 반영된 예시</span>입니다. 자세한 사항은 상품설명서 가입시 알아두실 사항의 &apos;보너스에 관한 사항&apos;을 참조하여 주시기 바랍니다.</p>
        <p>※ 위 예시된 해약환급금은 세전 기준 금액입니다.</p>
        <br />
        <p className="text-red-600">- 상기 보험상품 관련 내용은 요약된 자료이므로 단순 안내자료로 참고하시기 바라며, 보다 자세한 사항은 약관 및 설명서를 참조하시기 바랍니다.</p>
        <p className="text-red-600">- 이 화면은 가입자의 이해를 돕기 위한 단순 안내자료이므로 실제 보험가입시 발생되는 상품설명서와 내용이 다를 수 있으며 보험금 지급을 위한 근거서류가 될 수 없습니다.</p>
      </div>
    </div>
  )
}
