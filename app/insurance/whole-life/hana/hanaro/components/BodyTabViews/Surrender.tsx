import React from 'react'

export default function Surrender() {
  return (
    <div className="space-y-8 px-2 sm:px-4 md:px-8 py-4 md:py-6">
      <div className="mb-2">
        <div className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">해약환급금 예시</div>
        <p className="text-sm md:text-base mt-4 mb-6">
          이 상품은 "해약환급금 일부지급형"으로 보험료 납입기간 중 계약을 해지하는 경우 "일반형"의 해약환급금 대비 적은 해약환급금을 지급하는 대신 "일반형"보다 낮은 보험료로 동일한 보장을 받을 수 있도록 한 상품입니다.
        </p>
      </div>

      {/* 5년납 */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold">보험료 납입기간이 5년납인 경우</h3>
        <div className="text-xs text-gray-600 text-right">
          기준: 40세, 남자, 해약환급금 일부지급형, 주계약 가입금액 5,000만원, 종신, 5년납, 월납, 특약제외(단위:원)
        </div>
      <div className="overflow-x-auto">
        <table className="min-w-[700px] w-full text-center text-[10px] md:text-sm">
          <thead>
            <tr className="bg-[#1e3a8a] text-white align-middle">
              <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm" rowSpan={2}>경과<br className="md:hidden" />기간</th>
              <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm" colSpan={4}>1형(일반심사형)</th>
              <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm" colSpan={4}>2형(간편심사형)</th>
            </tr>
            <tr className="bg-[#1e3a8a] text-white">
              <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">사망<br className="md:hidden" />보험금</th>
              <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">납입<br className="md:hidden" />보험료</th>
              <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">해약<br className="md:hidden" />환급금</th>
              <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">환급률</th>
              <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">사망<br className="md:hidden" />보험금</th>
              <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">납입<br className="md:hidden" />보험료</th>
              <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">해약<br className="md:hidden" />환급금</th>
              <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">환급률</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3개월</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">50,000,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">2,361,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">-</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">0.00%</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">50,000,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">2,511,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">-</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">0.00%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">6개월</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">50,000,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">4,722,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">947,350</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">20.06%</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">50,000,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">5,022,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">974,250</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">19.40%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">9개월</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">50,000,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">7,083,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">2,032,150</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">28.69%</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">50,000,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">7,533,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">2,123,875</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">28.19%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1년</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">50,000,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">9,444,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,116,950</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">33.00%</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">50,000,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">10,044,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,273,500</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">32.59%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3년</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">55,000,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">28,332,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">12,138,850</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">42.85%</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">55,000,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">30,132,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">12,836,250</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">42.60%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">4년</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">57,500,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">37,776,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">16,828,050</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">44.55%</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">57,500,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">40,176,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">17,809,250</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">44.33%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">5년</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">62,052,084</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">47,220,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">45,334,584</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">96.01%</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">62,373,180</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">50,220,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">48,204,180</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">95.99%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">7년</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">67,166,500</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">47,220,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">47,220,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">100.00%</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">67,505,500</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">50,220,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">50,220,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">100.00%</td>
            </tr>
            <tr className="bg-red-50">
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">10년</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">81,545,766</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">47,220,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">56,914,266</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">120.53%</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">82,337,666</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">50,220,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">60,530,166</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">120.53%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">15년</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">87,214,509</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">47,220,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">62,666,509</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">132.71%</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">88,037,915</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">50,220,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">66,435,915</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">132.29%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">20년</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">88,321,346</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">47,220,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">66,505,846</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">140.84%</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">89,219,366</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">50,220,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">70,466,366</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">140.32%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">40년</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">93,846,750</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">47,220,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">83,380,250</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">176.58%</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">95,117,250</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">50,220,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">87,488,750</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">174.21%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">60년</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">101,663,971</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">47,220,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">98,541,971</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">208.69%</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">103,461,446</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">50,220,000</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">101,072,446</td>
              <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">201.26%</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>

      {/* 7년납 */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold">보험료 납입기간이 7년납인 경우</h3>
        <div className="text-xs text-gray-600 text-right">
          기준: 40세, 남자, 해약환급금 일부지급형, 주계약 가입금액 5,000만원, 종신, 7년납, 월납, 특약제외(단위:원)
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full text-center text-[10px] md:text-sm">
            <thead>
              <tr className="bg-[#1e3a8a] text-white align-middle">
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm" rowSpan={2}>경과<br className="md:hidden" />기간</th>
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm" colSpan={4}>1형(일반심사형)</th>
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm" colSpan={4}>2형(간편심사형)</th>
              </tr>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">사망<br className="md:hidden" />보험금</th>
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">납입<br className="md:hidden" />보험료</th>
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">해약<br className="md:hidden" />환급금</th>
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">환급률</th>
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">사망<br className="md:hidden" />보험금</th>
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">납입<br className="md:hidden" />보험료</th>
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">해약<br className="md:hidden" />환급금</th>
                <th className="border border-gray-300 p-0.5 text-[10px] md:text-sm">환급률</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3개월</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">50,000,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,777,500</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">-</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">0.00%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">50,000,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,893,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">-</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">0.00%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">6개월</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">50,000,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,555,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">345,929</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">9.73%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">50,000,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3,786,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">337,393</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">8.91%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">9개월</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">50,000,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">5,332,500</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,130,018</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">21.19%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">50,000,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">5,679,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,168,589</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">20.58%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1년</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">50,000,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">7,110,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,914,107</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">26.92%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">50,000,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">7,572,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">1,999,786</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">26.41%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">3년</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">55,000,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">21,330,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">8,433,321</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">39.54%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">55,000,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">22,716,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">8,909,857</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">39.22%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">5년</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">60,000,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">35,550,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">15,297,286</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">43.03%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">60,000,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">37,860,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">16,187,429</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">42.76%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">6년</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">62,500,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">42,660,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">18,864,893</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">44.22%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">62,500,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">45,432,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">19,971,714</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">43.96%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">7년</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">69,716,500</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">49,770,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">49,770,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">100.00%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">70,289,500</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">53,004,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">53,004,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">100.00%</td>
              </tr>
              <tr className="bg-red-50">
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">10년</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">83,190,882</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">49,770,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">58,559,382</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">117.66%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">84,172,006</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">53,004,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">62,364,506</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">117.66%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">15년</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">89,060,031</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">49,770,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">64,512,031</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">129.62%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">90,022,191</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">53,004,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">68,420,191</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">129.08%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">20년</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">90,334,103</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">49,770,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">68,518,603</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">137.67%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">91,383,451</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">53,004,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">72,630,451</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">137.03%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">40년</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">96,694,354</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">49,770,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">86,227,854</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">173.25%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">98,178,949</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">53,004,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">90,550,449</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">170.84%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">60년</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">105,692,699</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">49,770,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">102,570,699</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">206.09%</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">107,793,072</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">53,004,000</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">105,404,072</td>
                <td className="border border-gray-300 p-0.5 text-[10px] md:text-sm">198.86%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 주석 */}
      <div className="space-y-2 text-sm text-gray-600">
        <p>▶ 이 계약을 중도해지할 경우 해약환급금은 납입한 보험료에서 경과한 기간의 위험보험료, 계약체결비용 및 계약관리비용(해약공제액 포함) 등이 차감되므로 납입보험료 보다 적거나 없을 수도 있습니다.</p>
        <p className="text-red-600">▶ "해약환급금 일부지급형" 계약을 보험료 납입기간 중 해지할 경우 '기본보험료에 의한 해약환급금'은 "일반형 상품"의 '기본보험료에 의한 해약환급금'의 50%에 해당하는 금액이며, 보험료 납입이 완료된 이후에 계약이 해지되는 경우에는 "일반형 상품"의 '기본보험료에 의한 해약환급금'과 동일합니다.</p>
        <p>▶ 이 상품의 보험료 및 해약환급금 산출에 적용되는 이율은 10년 이내 연 2.75%, 10년 초과 연 1.75% 입니다.(보장형 계약)</p>
        <p>▶ 상기 사망보험금 및 해약환급금은 계약해당일 전일 기준의 해당 금액에서 유지보너스가 발생하는 해당년도의 유지보너스 해당 금액(계약해당일 기준)을 포함한 금액이며, 납입기간동안 보험료 납입을 정상적으로 하였을 경우를 기준으로 예시된 금액입니다.</p>
        <p>▶ 상기 해약환급금은 당해 보험년도 말 기준으로 예시된 금액입니다. 경과년도와 유지보너스가 발생하는 해당년도가 동일한 시점(예를 들어 주계약 납입기간이 7년인 경우 경과년도 7년 시점, 10년 시점, 15년 시점)의 해약환급금은 보험료 납입기간 경과시점 직후 연계약해당일 기준으로 예시됩니다. 따라서 연계약해당일 도래 전 사망 또는 해지시에는 금액이 달라질 수 있습니다.</p>
      </div>

      {/* 간편심사 관련 안내 */}
      <div className="space-y-4 mt-8">
        <h3 className="text-xl font-bold text-[#1e3a8a]">◦ 간편심사 관련 안내</h3>
        
        <div className="space-y-3 text-sm text-gray-700">
          <p>2형(간편심사형)은 '간편심사' 상품으로 유병력자 또는 연령제한 등으로 일반심사보험에 가입하기 어려운 피보험자를 대상으로 하므로, <span className="text-blue-700 font-semibold">일반심사보험보다 보험료가 비쌉니다.</span></p>
          
          <p>피보험자가 의사의 건강검진을 받거나 회사가 일반심사를 할 경우 그 결과에 따라 이 상품보다 저렴한 일반심사보험에 가입할 수 있습니다. 다만, 일반심사보험의 경우 피보험자의 건강상태 또는 나이에 따라 가입이 제한될 수 있으며 보험기간 및 보장하는 담보에는 차이가 있을 수 있습니다.</p>
        </div>

        {/* 비교표 */}
        <div className="mt-6">
          <h4 className="text-center text-base font-bold mb-4 text-[#1e3a8a]">간편심사형 VS 일반심사형 비교</h4>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#1e3a8a] text-white">
                  <th className="border border-gray-300 p-3 text-center w-1/6">구분</th>
                  <th className="border border-gray-300 p-3 text-center w-5/12">간편심사형</th>
                  <th className="border border-gray-300 p-3 text-center w-5/12">일반심사형</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-3 text-center font-semibold bg-gray-50">보장내용</td>
                  <td className="border border-gray-300 p-3 text-center">'보험금 지급기준' 참고</td>
                  <td className="border border-gray-300 p-3 text-center">'보험금 지급기준' 참고</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 text-center font-semibold bg-gray-50">계약승낙여부</td>
                  <td className="border border-gray-300 p-3 text-center">일반상품 대비 질문항목을 간소화하여,<br/>지병이나 기왕력이 있어도 가입 가능</td>
                  <td className="border border-gray-300 p-3 text-center">피보험자의 건강상태 및 작업에 따라서<br/>청약에 대한 승낙을 거절 가능</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3가지 질문 */}
        <div className="mt-6 space-y-3 text-sm">
          <p className="font-semibold">*아래 3가지 질문을 통과하면 유병력자도 2형(간편심사형) 가입이 가능합니다.</p>
          
          <div className="space-y-4 pl-4">
            <div>
              <p className="font-semibold mb-2">1. 최근 3개월 이내에 의사로부터 진찰 또는 검사(건강검진 포함)를 통하여 다음과 같은 의료행위를 받은 사실이 있습니까? (예, 아니오)</p>
              <div className="pl-4 space-y-1 text-gray-700">
                <p>1) 입원 필요 소견</p>
                <p>2) 수술 필요 소견</p>
                <p>3) 추가검사(재검사) 필요 소견</p>
                <p>4) 질병 확정 진단</p>
                <p>5) 질병 의심 소견</p>
                <p className="text-xs mt-2">*필요 소견, 질병 의심 소견: 의사가 진단서나 소견서 또는 진료의뢰서 등을 포함하여 서면(전자문서 포함)으로 교부한 경우</p>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">2. 최근 2년 이내에 질병이나 사고로 인하여 다음과 같은 의료행위를 받은 사실이 있습니까? (예, 아니오)</p>
              <div className="pl-4 space-y-1 text-gray-700">
                <p>1) 입원</p>
                <p>2) 수술(제왕절개 포함)</p>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">3. 최근 5년 이내에 의사로부터 진찰 또는 검사를 통하여 암으로 "진단"받거나 암으로 "입원 또는 수술"을 받은 적이 있습니까? (예, 아니오)</p>
              <p className="pl-4 text-xs text-gray-700">*암: 악성신생물, 백혈병 및 기타 혈액종양 포함</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
