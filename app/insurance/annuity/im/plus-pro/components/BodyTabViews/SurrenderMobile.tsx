import React from 'react'

export default function SurrenderMobile() {
  return (
    <div className="space-y-8 px-2 sm:px-4 md:px-8 py-4 md:py-6">
      <div className="mb-2">
        <div className="text-[#1e3a8a] text-2xl md:text-3xl font-extrabold mb-1">■ 해약환급금 및 계약자적립액 예시</div>
        <div className="w-full h-1 bg-[#1e3a8a] mb-3" />
        <div className="text-xs text-gray-600 ml-2 pb-0.5 mt-2">
          ■ 기준 : 개인형, 남자 40세, 60세연금개시, 납입기간 5년납, 월납, 기본보험료 월 30만원 (단위: 만원)
        </div>
      </div>

      {/* 최저보증이율 가정 */}
      <div className="space-y-2">
        <h3 className="text-base font-bold text-[#1e3a8a] border-b-2 border-[#1e3a8a] pb-1">최저보증이율 가정</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs border-collapse">
            <thead>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-gray-300 p-2">경과<br />기간</th>
                <th className="border border-gray-300 p-2">납입<br />보험료<br />(A)</th>
                <th className="border border-gray-300 p-2">해약<br />환급금<br />(B)</th>
                <th className="border border-gray-300 p-2">환급률<br />(B/A)</th>
                <th className="border border-gray-300 p-2">적립액<br />(C)</th>
                <th className="border border-gray-300 p-2">적립률<br />(C/A)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-gray-300 p-2">3개월</td><td className="border border-gray-300 p-2">90</td><td className="border border-gray-300 p-2">0</td><td className="border border-gray-300 p-2">0.0%</td><td className="border border-gray-300 p-2">39</td><td className="border border-gray-300 p-2">43.5%</td></tr>
              <tr><td className="border border-gray-300 p-2">6개월</td><td className="border border-gray-300 p-2">180</td><td className="border border-gray-300 p-2">40</td><td className="border border-gray-300 p-2">22.5%</td><td className="border border-gray-300 p-2">78</td><td className="border border-gray-300 p-2">43.5%</td></tr>
              <tr><td className="border border-gray-300 p-2">9개월</td><td className="border border-gray-300 p-2">270</td><td className="border border-gray-300 p-2">81</td><td className="border border-gray-300 p-2">30.2%</td><td className="border border-gray-300 p-2">117</td><td className="border border-gray-300 p-2">43.5%</td></tr>
              <tr><td className="border border-gray-300 p-2">1년</td><td className="border border-gray-300 p-2">360</td><td className="border border-gray-300 p-2">122</td><td className="border border-gray-300 p-2">34.1%</td><td className="border border-gray-300 p-2">156</td><td className="border border-gray-300 p-2">43.4%</td></tr>
              <tr><td className="border border-gray-300 p-2">2년</td><td className="border border-gray-300 p-2">720</td><td className="border border-gray-300 p-2">286</td><td className="border border-gray-300 p-2">39.8%</td><td className="border border-gray-300 p-2">311</td><td className="border border-gray-300 p-2">43.3%</td></tr>
              <tr><td className="border border-gray-300 p-2">3년</td><td className="border border-gray-300 p-2">1,080</td><td className="border border-gray-300 p-2">449</td><td className="border border-gray-300 p-2">41.6%</td><td className="border border-gray-300 p-2">466</td><td className="border border-gray-300 p-2">43.2%</td></tr>
              <tr><td className="border border-gray-300 p-2">4년</td><td className="border border-gray-300 p-2">1,440</td><td className="border border-gray-300 p-2">611</td><td className="border border-gray-300 p-2">42.5%</td><td className="border border-gray-300 p-2">620</td><td className="border border-gray-300 p-2">43.1%</td></tr>
              <tr><td className="border border-gray-300 p-2">5년</td><td className="border border-gray-300 p-2">1,800</td><td className="border border-gray-300 p-2">772</td><td className="border border-gray-300 p-2">42.9%</td><td className="border border-gray-300 p-2">772</td><td className="border border-gray-300 p-2">42.9%</td></tr>
              <tr><td className="border border-gray-300 p-2">6년</td><td className="border border-gray-300 p-2">1,800</td><td className="border border-gray-300 p-2">763</td><td className="border border-gray-300 p-2">42.4%</td><td className="border border-gray-300 p-2">763</td><td className="border border-gray-300 p-2">42.4%</td></tr>
              <tr className="bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-l-blue-500"><td className="border border-gray-300 p-2 font-bold text-blue-800">7년</td><td className="border border-gray-300 p-2 font-bold text-blue-800">1,800</td><td className="border border-gray-300 p-2 font-bold text-blue-800">1,800</td><td className="border border-gray-300 p-2 font-bold text-blue-800">100.0%</td><td className="border border-gray-300 p-2 font-bold text-blue-800">1,800</td><td className="border border-gray-300 p-2 font-bold text-blue-800">100.0%</td></tr>
              <tr><td className="border border-gray-300 p-2">8년</td><td className="border border-gray-300 p-2">1,800</td><td className="border border-gray-300 p-2">1,781</td><td className="border border-gray-300 p-2">99.0%</td><td className="border border-gray-300 p-2">1,781</td><td className="border border-gray-300 p-2">99.0%</td></tr>
              <tr><td className="border border-gray-300 p-2">9년</td><td className="border border-gray-300 p-2">1,800</td><td className="border border-gray-300 p-2">1,763</td><td className="border border-gray-300 p-2">98.0%</td><td className="border border-gray-300 p-2">1,763</td><td className="border border-gray-300 p-2">98.0%</td></tr>
              <tr className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-l-red-500"><td className="border border-gray-300 p-2 font-bold text-red-800">10년</td><td className="border border-gray-300 p-2 font-bold text-red-800">1,800</td><td className="border border-gray-300 p-2 font-bold text-red-800">2,394</td><td className="border border-gray-300 p-2 font-bold text-red-800">133.0%</td><td className="border border-gray-300 p-2 font-bold text-red-800">2,394</td><td className="border border-gray-300 p-2 font-bold text-red-800">133.0%</td></tr>
              <tr><td className="border border-gray-300 p-2">12년</td><td className="border border-gray-300 p-2">1,800</td><td className="border border-gray-300 p-2">2,360</td><td className="border border-gray-300 p-2">131.1%</td><td className="border border-gray-300 p-2">2,360</td><td className="border border-gray-300 p-2">131.1%</td></tr>
              <tr><td className="border border-gray-300 p-2">15년</td><td className="border border-gray-300 p-2">1,800</td><td className="border border-gray-300 p-2">2,309</td><td className="border border-gray-300 p-2">128.3%</td><td className="border border-gray-300 p-2">2,309</td><td className="border border-gray-300 p-2">128.3%</td></tr>
              <tr><td className="border border-gray-300 p-2">20년</td><td className="border border-gray-300 p-2">1,800</td><td className="border border-gray-300 p-2">2,227</td><td className="border border-gray-300 p-2">123.8%</td><td className="border border-gray-300 p-2">2,227</td><td className="border border-gray-300 p-2">123.8%</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 평균공시이율 가정 */}
      <div className="space-y-2">
        <h3 className="text-base font-bold text-[#1e3a8a] border-b-2 border-[#1e3a8a] pb-1">평균공시이율 가정</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs border-collapse">
            <thead>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-gray-300 p-2">경과<br />기간</th>
                <th className="border border-gray-300 p-2">납입<br />보험료<br />(A)</th>
                <th className="border border-gray-300 p-2">해약<br />환급금<br />(B)</th>
                <th className="border border-gray-300 p-2">환급률<br />(B/A)</th>
                <th className="border border-gray-300 p-2">적립액<br />(C)</th>
                <th className="border border-gray-300 p-2">적립률<br />(C/A)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-gray-300 p-2">3개월</td><td className="border border-gray-300 p-2">90</td><td className="border border-gray-300 p-2">0</td><td className="border border-gray-300 p-2">0.0%</td><td className="border border-gray-300 p-2">39</td><td className="border border-gray-300 p-2">43.6%</td></tr>
              <tr><td className="border border-gray-300 p-2">6개월</td><td className="border border-gray-300 p-2">180</td><td className="border border-gray-300 p-2">40</td><td className="border border-gray-300 p-2">22.7%</td><td className="border border-gray-300 p-2">78</td><td className="border border-gray-300 p-2">43.7%</td></tr>
              <tr><td className="border border-gray-300 p-2">9개월</td><td className="border border-gray-300 p-2">270</td><td className="border border-gray-300 p-2">82</td><td className="border border-gray-300 p-2">30.5%</td><td className="border border-gray-300 p-2">118</td><td className="border border-gray-300 p-2">43.7%</td></tr>
              <tr><td className="border border-gray-300 p-2">1년</td><td className="border border-gray-300 p-2">360</td><td className="border border-gray-300 p-2">123</td><td className="border border-gray-300 p-2">34.4%</td><td className="border border-gray-300 p-2">157</td><td className="border border-gray-300 p-2">43.8%</td></tr>
              <tr><td className="border border-gray-300 p-2">2년</td><td className="border border-gray-300 p-2">720</td><td className="border border-gray-300 p-2">291</td><td className="border border-gray-300 p-2">40.4%</td><td className="border border-gray-300 p-2">316</td><td className="border border-gray-300 p-2">43.9%</td></tr>
              <tr><td className="border border-gray-300 p-2">3년</td><td className="border border-gray-300 p-2">1,080</td><td className="border border-gray-300 p-2">459</td><td className="border border-gray-300 p-2">42.6%</td><td className="border border-gray-300 p-2">476</td><td className="border border-gray-300 p-2">44.1%</td></tr>
              <tr><td className="border border-gray-300 p-2">4년</td><td className="border border-gray-300 p-2">1,440</td><td className="border border-gray-300 p-2">629</td><td className="border border-gray-300 p-2">43.7%</td><td className="border border-gray-300 p-2">637</td><td className="border border-gray-300 p-2">44.3%</td></tr>
              <tr><td className="border border-gray-300 p-2">5년</td><td className="border border-gray-300 p-2">1,800</td><td className="border border-gray-300 p-2">800</td><td className="border border-gray-300 p-2">44.5%</td><td className="border border-gray-300 p-2">800</td><td className="border border-gray-300 p-2">44.5%</td></tr>
              <tr><td className="border border-gray-300 p-2">6년</td><td className="border border-gray-300 p-2">1,800</td><td className="border border-gray-300 p-2">803</td><td className="border border-gray-300 p-2">44.6%</td><td className="border border-gray-300 p-2">803</td><td className="border border-gray-300 p-2">44.6%</td></tr>
              <tr className="bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-l-blue-500"><td className="border border-gray-300 p-2 font-bold text-blue-800">7년</td><td className="border border-gray-300 p-2 font-bold text-blue-800">1,800</td><td className="border border-gray-300 p-2 font-bold text-blue-800">1,800</td><td className="border border-gray-300 p-2 font-bold text-blue-800">100.0%</td><td className="border border-gray-300 p-2 font-bold text-blue-800">1,800</td><td className="border border-gray-300 p-2 font-bold text-blue-800">100.0%</td></tr>
              <tr><td className="border border-gray-300 p-2">8년</td><td className="border border-gray-300 p-2">1,800</td><td className="border border-gray-300 p-2">1,811</td><td className="border border-gray-300 p-2">100.6%</td><td className="border border-gray-300 p-2">1,811</td><td className="border border-gray-300 p-2">100.6%</td></tr>
              <tr><td className="border border-gray-300 p-2">9년</td><td className="border border-gray-300 p-2">1,800</td><td className="border border-gray-300 p-2">1,822</td><td className="border border-gray-300 p-2">101.2%</td><td className="border border-gray-300 p-2">1,822</td><td className="border border-gray-300 p-2">101.2%</td></tr>
              <tr className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-l-red-500"><td className="border border-gray-300 p-2 font-bold text-red-800">10년</td><td className="border border-gray-300 p-2 font-bold text-red-800">1,800</td><td className="border border-gray-300 p-2 font-bold text-red-800">2,394</td><td className="border border-gray-300 p-2 font-bold text-red-800">133.0%</td><td className="border border-gray-300 p-2 font-bold text-red-800">2,394</td><td className="border border-gray-300 p-2 font-bold text-red-800">133.0%</td></tr>
              <tr><td className="border border-gray-300 p-2">12년</td><td className="border border-gray-300 p-2">1,800</td><td className="border border-gray-300 p-2">2,450</td><td className="border border-gray-300 p-2">136.1%</td><td className="border border-gray-300 p-2">2,450</td><td className="border border-gray-300 p-2">136.1%</td></tr>
              <tr><td className="border border-gray-300 p-2">15년</td><td className="border border-gray-300 p-2">1,800</td><td className="border border-gray-300 p-2">2,537</td><td className="border border-gray-300 p-2">141.0%</td><td className="border border-gray-300 p-2">2,537</td><td className="border border-gray-300 p-2">141.0%</td></tr>
              <tr><td className="border border-gray-300 p-2">20년</td><td className="border border-gray-300 p-2">1,800</td><td className="border border-gray-300 p-2">2,690</td><td className="border border-gray-300 p-2">149.5%</td><td className="border border-gray-300 p-2">2,690</td><td className="border border-gray-300 p-2">149.5%</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 공시이율 가정 */}
      <div className="space-y-2">
        <h3 className="text-base font-bold text-[#1e3a8a] border-b-2 border-[#1e3a8a] pb-1">공시이율 가정</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs border-collapse">
            <thead>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-gray-300 p-2">경과<br />기간</th>
                <th className="border border-gray-300 p-2">납입<br />보험료<br />(A)</th>
                <th className="border border-gray-300 p-2">해약<br />환급금<br />(B)</th>
                <th className="border border-gray-300 p-2">환급률<br />(B/A)</th>
                <th className="border border-gray-300 p-2">적립액<br />(C)</th>
                <th className="border border-gray-300 p-2">적립률<br />(C/A)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-gray-300 p-2">3개월</td><td className="border border-gray-300 p-2">90</td><td className="border border-gray-300 p-2">0</td><td className="border border-gray-300 p-2">0.0%</td><td className="border border-gray-300 p-2">39</td><td className="border border-gray-300 p-2">43.6%</td></tr>
              <tr><td className="border border-gray-300 p-2">6개월</td><td className="border border-gray-300 p-2">180</td><td className="border border-gray-300 p-2">40</td><td className="border border-gray-300 p-2">22.7%</td><td className="border border-gray-300 p-2">78</td><td className="border border-gray-300 p-2">43.7%</td></tr>
              <tr><td className="border border-gray-300 p-2">9개월</td><td className="border border-gray-300 p-2">270</td><td className="border border-gray-300 p-2">82</td><td className="border border-gray-300 p-2">30.5%</td><td className="border border-gray-300 p-2">118</td><td className="border border-gray-300 p-2">43.7%</td></tr>
              <tr><td className="border border-gray-300 p-2">1년</td><td className="border border-gray-300 p-2">360</td><td className="border border-gray-300 p-2">123</td><td className="border border-gray-300 p-2">34.4%</td><td className="border border-gray-300 p-2">157</td><td className="border border-gray-300 p-2">43.8%</td></tr>
              <tr><td className="border border-gray-300 p-2">2년</td><td className="border border-gray-300 p-2">720</td><td className="border border-gray-300 p-2">291</td><td className="border border-gray-300 p-2">40.4%</td><td className="border border-gray-300 p-2">316</td><td className="border border-gray-300 p-2">43.9%</td></tr>
              <tr><td className="border border-gray-300 p-2">3년</td><td className="border border-gray-300 p-2">1,080</td><td className="border border-gray-300 p-2">459</td><td className="border border-gray-300 p-2">42.6%</td><td className="border border-gray-300 p-2">476</td><td className="border border-gray-300 p-2">44.1%</td></tr>
              <tr><td className="border border-gray-300 p-2">4년</td><td className="border border-gray-300 p-2">1,440</td><td className="border border-gray-300 p-2">629</td><td className="border border-gray-300 p-2">43.7%</td><td className="border border-gray-300 p-2">637</td><td className="border border-gray-300 p-2">44.3%</td></tr>
              <tr><td className="border border-gray-300 p-2">5년</td><td className="border border-gray-300 p-2">1,800</td><td className="border border-gray-300 p-2">800</td><td className="border border-gray-300 p-2">44.5%</td><td className="border border-gray-300 p-2">800</td><td className="border border-gray-300 p-2">44.5%</td></tr>
              <tr><td className="border border-gray-300 p-2">6년</td><td className="border border-gray-300 p-2">1,800</td><td className="border border-gray-300 p-2">803</td><td className="border border-gray-300 p-2">44.6%</td><td className="border border-gray-300 p-2">803</td><td className="border border-gray-300 p-2">44.6%</td></tr>
              <tr className="bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-l-blue-500"><td className="border border-gray-300 p-2 font-bold text-blue-800">7년</td><td className="border border-gray-300 p-2 font-bold text-blue-800">1,800</td><td className="border border-gray-300 p-2 font-bold text-blue-800">1,800</td><td className="border border-gray-300 p-2 font-bold text-blue-800">100.0%</td><td className="border border-gray-300 p-2 font-bold text-blue-800">1,800</td><td className="border border-gray-300 p-2 font-bold text-blue-800">100.0%</td></tr>
              <tr><td className="border border-gray-300 p-2">8년</td><td className="border border-gray-300 p-2">1,800</td><td className="border border-gray-300 p-2">1,811</td><td className="border border-gray-300 p-2">100.6%</td><td className="border border-gray-300 p-2">1,811</td><td className="border border-gray-300 p-2">100.6%</td></tr>
              <tr><td className="border border-gray-300 p-2">9년</td><td className="border border-gray-300 p-2">1,800</td><td className="border border-gray-300 p-2">1,822</td><td className="border border-gray-300 p-2">101.2%</td><td className="border border-gray-300 p-2">1,822</td><td className="border border-gray-300 p-2">101.2%</td></tr>
              <tr className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-l-red-500"><td className="border border-gray-300 p-2 font-bold text-red-800">10년</td><td className="border border-gray-300 p-2 font-bold text-red-800">1,800</td><td className="border border-gray-300 p-2 font-bold text-red-800">2,394</td><td className="border border-gray-300 p-2 font-bold text-red-800">133.0%</td><td className="border border-gray-300 p-2 font-bold text-red-800">2,394</td><td className="border border-gray-300 p-2 font-bold text-red-800">133.0%</td></tr>
              <tr><td className="border border-gray-300 p-2">12년</td><td className="border border-gray-300 p-2">1,800</td><td className="border border-gray-300 p-2">2,450</td><td className="border border-gray-300 p-2">136.1%</td><td className="border border-gray-300 p-2">2,450</td><td className="border border-gray-300 p-2">136.1%</td></tr>
              <tr><td className="border border-gray-300 p-2">15년</td><td className="border border-gray-300 p-2">1,800</td><td className="border border-gray-300 p-2">2,537</td><td className="border border-gray-300 p-2">141.0%</td><td className="border border-gray-300 p-2">2,537</td><td className="border border-gray-300 p-2">141.0%</td></tr>
              <tr><td className="border border-gray-300 p-2">20년</td><td className="border border-gray-300 p-2">1,800</td><td className="border border-gray-300 p-2">2,690</td><td className="border border-gray-300 p-2">149.5%</td><td className="border border-gray-300 p-2">2,690</td><td className="border border-gray-300 p-2">149.5%</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 주석 */}
      <ol className="text-xs text-gray-800 space-y-1 pl-4 list-decimal mt-6">
        <li><span className="text-red-600">상기예시금액은 현재(2026년4월)의 공시이율 2.40%, 감독규정 제1-2조 제13호에 따른 현재(2026년) 평균공시이율 2.50%와 공시이율 중 작은 값(2.40%)을 기준으로 계산한 금액입니다. (평균공시이율은 판매시점의 공시이율을 한구도로 적용 예시함)</span></li>
        <li>계약자적립액을 계산할 때 적용되는 공시이율이 변동할 경우에는 해약환급금 및 계약자적립액도 변동됩니다.</li>
        <li>이 보험계약을 중도에 해지할 경우 해약환급금은 납입한 보험료에서 경과된 기간의 위험보험료, 계약체결비용 및 계약관리비용 등이 차감되므로 납입보험료보다 적거나 없을 수도 있습니다.</li>
        <li>평균공시이율은 금융감독원장이 정하는 바에 따라 산정한 전체 보험회사 공시이율의 평균으로, 전년도 9월말 기준 직전 12개월간 보험회사 평균공시이율을 말하며, 이 계약의 체결 시점의 평균공시이율은 2.50%입니다.</li>
        <li>공시이율은 매1개월마다 변동될 수 있으며, 매월 1일 회사가 정한 공시이율로 합니다.</li>
        <li>공시이율의 최저보증이율은 보험계약일부터 5년 이내 1%, 5년초과 10년 이내 0.75%, 10년 초과는 연복리 0.5%입니다.</li>
        <li>상기 환급률은 표기된 이율이 경과기간동안 유지된다고 가정하였을 때 납입한 보험료 대비 해약환급금의 비율입니다.</li>
        <li><span className="text-red-600">상기 예시된 금액 및 환급률 등이 미래의 수익을 보장하는 것은 아닙니다.</span></li>
        <li>위의 예시금액은 중도인출 및 추가납입은 고려하지 않고 산출한 금액으로, 중도인출 및 추가납입이 있을 때에는 해약환급금 및 계약자적립액이 변경됩니다.</li>
      </ol>
    </div>
  )
}
