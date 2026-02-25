import React from 'react';
import TabContentWrapper from '@/components/shared/TabContentWrapper';

export default function Surrender() {
  return (
    <TabContentWrapper>
      <div className="mb-2">
        <div className="product-page-title">해약환급금 예시</div>
        <p className="product-text mb-6 mt-4">
          이 상품은 "해약환급금 일부지급형"으로 보험료 납입기간 중 계약을 해지하는 경우 "일반형"의
          해약환급금 대비 적은 해약환급금을 지급하는 대신 "일반형"보다 낮은 보험료로 동일한 보장을
          받을 수 있도록 한 상품입니다.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="product-section-title">보험료 납입기간이 5년납인 경우</h3>
        <div className="product-caption text-right">
          기준: 40세, 남자, 해약환급금 일부지급형, 주계약 가입금액 5,000만원, 종신, 5년납, 월납,
          특약제외(단위:만원)
        </div>
        <div className="product-info-box">
          <div className="overflow-x-auto">
          <table className="product-table text-center">
            <thead>
              <tr className="product-table-header align-middle">
                <th className="product-table-th" rowSpan={2}>
                  경과
                  
                  기간
                </th>
                <th className="product-table-th" colSpan={4}>
                  1형(일반심사형)
                </th>
                <th className="product-table-th" colSpan={4}>
                  2형(간편심사형)
                </th>
              </tr>
              <tr className="product-table-header">
                <th className="product-table-th">
                  사망
                  
                  보험금
                </th>
                <th className="product-table-th">
                  납입
                  
                  보험료
                </th>
                <th className="product-table-th">
                  해약
                  
                  환급금
                </th>
                <th className="product-table-th">환급률</th>
                <th className="product-table-th">
                  사망
                  
                  보험금
                </th>
                <th className="product-table-th">
                  납입
                  
                  보험료
                </th>
                <th className="product-table-th">
                  해약
                  
                  환급금
                </th>
                <th className="product-table-th">환급률</th>
              </tr>
            </thead>
            <tbody className="product-table-body">
              <tr>
                <td className="product-table-td">3개월</td>
                <td className="product-table-td">50,000,000</td>
                <td className="product-table-td">2,383,500</td>
                <td className="product-table-td">0</td>
                <td className="product-table-td">0.00%</td>
                <td className="product-table-td">50,000,000</td>
                <td className="product-table-td">2,535,000</td>
                <td className="product-table-td">0</td>
                <td className="product-table-td">0.00%</td>
              </tr>
              <tr>
                <td className="product-table-td">6개월</td>
                <td className="product-table-td">50,000,000</td>
                <td className="product-table-td">4,767,000</td>
                <td className="product-table-td">947,350</td>
                <td className="product-table-td">19.87%</td>
                <td className="product-table-td">50,000,000</td>
                <td className="product-table-td">5,070,000</td>
                <td className="product-table-td">974,250</td>
                <td className="product-table-td">19.22%</td>
              </tr>
              <tr>
                <td className="product-table-td">9개월</td>
                <td className="product-table-td">50,000,000</td>
                <td className="product-table-td">7,150,500</td>
                <td className="product-table-td">2,032,150</td>
                <td className="product-table-td">28.42%</td>
                <td className="product-table-td">50,000,000</td>
                <td className="product-table-td">7,605,000</td>
                <td className="product-table-td">2,123,875</td>
                <td className="product-table-td">27.93%</td>
              </tr>
              <tr>
                <td className="product-table-td">1년</td>
                <td className="product-table-td">50,000,000</td>
                <td className="product-table-td">9,534,000</td>
                <td className="product-table-td">3,116,950</td>
                <td className="product-table-td">32.69%</td>
                <td className="product-table-td">50,000,000</td>
                <td className="product-table-td">10,140,000</td>
                <td className="product-table-td">3,273,500</td>
                <td className="product-table-td">32.28%</td>
              </tr>
              <tr>
                <td className="product-table-td">3년</td>
                <td className="product-table-td">55,000,000</td>
                <td className="product-table-td">28,602,000</td>
                <td className="product-table-td">12,138,850</td>
                <td className="product-table-td">42.44%</td>
                <td className="product-table-td">55,000,000</td>
                <td className="product-table-td">30,420,000</td>
                <td className="product-table-td">12,836,250</td>
                <td className="product-table-td">42.20%</td>
              </tr>
              <tr>
                <td className="product-table-td">4년</td>
                <td className="product-table-td">57,500,000</td>
                <td className="product-table-td">38,136,000</td>
                <td className="product-table-td">16,828,050</td>
                <td className="product-table-td">44.13%</td>
                <td className="product-table-td">57,500,000</td>
                <td className="product-table-td">40,560,000</td>
                <td className="product-table-td">17,809,250</td>
                <td className="product-table-td">43.91%</td>
              </tr>
              <tr>
                <td className="product-table-td">5년</td>
                <td className="product-table-td">62,478,318</td>
                <td className="product-table-td">47,670,000</td>
                <td className="product-table-td">45,760,818</td>
                <td className="product-table-td">96.00%</td>
                <td className="product-table-td">62,827,831</td>
                <td className="product-table-td">50,700,000</td>
                <td className="product-table-td">48,658,831</td>
                <td className="product-table-td">95.97%</td>
              </tr>
              <tr>
                <td className="product-table-td">7년</td>
                <td className="product-table-td">67,616,500</td>
                <td className="product-table-td">47,670,000</td>
                <td className="product-table-td">47,670,000</td>
                <td className="product-table-td">100.00%</td>
                <td className="product-table-td">67,985,500</td>
                <td className="product-table-td">50,700,000</td>
                <td className="product-table-td">50,700,000</td>
                <td className="product-table-td">100.00%</td>
              </tr>
              <tr className="bg-red-50">
                <td className="product-table-td">10년</td>
                <td className="product-table-td">83,160,726</td>
                <td className="product-table-td">47,670,000</td>
                <td className="product-table-td">58,529,226</td>
                <td className="product-table-td">122.78%</td>
                <td className="product-table-td">84,056,960</td>
                <td className="product-table-td">50,700,000</td>
                <td className="product-table-td">62,249,460</td>
                <td className="product-table-td">122.78%</td>
              </tr>
              <tr>
                <td className="product-table-td">15년</td>
                <td className="product-table-td">87,528,522</td>
                <td className="product-table-td">47,670,000</td>
                <td className="product-table-td">62,980,522</td>
                <td className="product-table-td">132.12%</td>
                <td className="product-table-td">88,372,560</td>
                <td className="product-table-td">50,700,000</td>
                <td className="product-table-td">66,770,560</td>
                <td className="product-table-td">131.70%</td>
              </tr>
              <tr>
                <td className="product-table-td">20년</td>
                <td className="product-table-td">88,663,814</td>
                <td className="product-table-td">47,670,000</td>
                <td className="product-table-td">66,848,314</td>
                <td className="product-table-td">140.23%</td>
                <td className="product-table-td">89,584,336</td>
                <td className="product-table-td">50,700,000</td>
                <td className="product-table-td">70,831,336</td>
                <td className="product-table-td">139.71%</td>
              </tr>
              <tr>
                <td className="product-table-td">40년</td>
                <td className="product-table-td">94,331,265</td>
                <td className="product-table-td">47,670,000</td>
                <td className="product-table-td">83,864,765</td>
                <td className="product-table-td">175.93%</td>
                <td className="product-table-td">95,633,600</td>
                <td className="product-table-td">50,700,000</td>
                <td className="product-table-td">88,005,100</td>
                <td className="product-table-td">173.58%</td>
              </tr>
              <tr>
                <td className="product-table-td">60년</td>
                <td className="product-table-td">102,349,453</td>
                <td className="product-table-td">47,670,000</td>
                <td className="product-table-td">99,227,453</td>
                <td className="product-table-td">208.15%</td>
                <td className="product-table-td">104,191,968</td>
                <td className="product-table-td">50,700,000</td>
                <td className="product-table-td">101,802,968</td>
                <td className="product-table-td">200.79%</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="product-section-title">보험료 납입기간이 7년납인 경우</h3>
        <div className="product-caption text-right">
          기준: 40세, 남자, 해약환급금 일부지급형, 주계약 가입금액 5,000만원, 종신, 7년납, 월납,
          특약제외(단위:만원)
        </div>
        <div className="product-info-box">
          <div className="overflow-x-auto">
          <table className="product-table text-center">
            <thead>
              <tr className="product-table-header align-middle">
                <th className="product-table-th" rowSpan={2}>
                  경과
                  
                  기간
                </th>
                <th className="product-table-th" colSpan={4}>
                  1형(일반심사형)
                </th>
                <th className="product-table-th" colSpan={4}>
                  2형(간편심사형)
                </th>
              </tr>
              <tr className="product-table-header">
                <th className="product-table-th">
                  사망
                  
                  보험금
                </th>
                <th className="product-table-th">
                  납입
                  
                  보험료
                </th>
                <th className="product-table-th">
                  해약
                  
                  환급금
                </th>
                <th className="product-table-th">환급률</th>
                <th className="product-table-th">
                  사망
                  
                  보험금
                </th>
                <th className="product-table-th">
                  납입
                  
                  보험료
                </th>
                <th className="product-table-th">
                  해약
                  
                  환급금
                </th>
                <th className="product-table-th">환급률</th>
              </tr>
            </thead>
            <tbody className="product-table-body">
              <tr>
                <td className="product-table-td">3개월</td>
                <td className="product-table-td">50,000,000</td>
                <td className="product-table-td">1,776,000</td>
                <td className="product-table-td">0</td>
                <td className="product-table-td">0.00%</td>
                <td className="product-table-td">50,000,000</td>
                <td className="product-table-td">1,891,500</td>
                <td className="product-table-td">0</td>
                <td className="product-table-td">0.00%</td>
              </tr>
              <tr>
                <td className="product-table-td">6개월</td>
                <td className="product-table-td">50,000,000</td>
                <td className="product-table-td">3,552,000</td>
                <td className="product-table-td">345,929</td>
                <td className="product-table-td">9.74%</td>
                <td className="product-table-td">50,000,000</td>
                <td className="product-table-td">3,783,000</td>
                <td className="product-table-td">337,393</td>
                <td className="product-table-td">8.92%</td>
              </tr>
              <tr>
                <td className="product-table-td">9개월</td>
                <td className="product-table-td">50,000,000</td>
                <td className="product-table-td">5,328,000</td>
                <td className="product-table-td">1,130,018</td>
                <td className="product-table-td">21.21%</td>
                <td className="product-table-td">50,000,000</td>
                <td className="product-table-td">5,674,000</td>
                <td className="product-table-td">1,168,589</td>
                <td className="product-table-td">20.59%</td>
              </tr>
              <tr>
                <td className="product-table-td">1년</td>
                <td className="product-table-td">50,000,000</td>
                <td className="product-table-td">7,104,000</td>
                <td className="product-table-td">1,914,107</td>
                <td className="product-table-td">26.94%</td>
                <td className="product-table-td">50,000,000</td>
                <td className="product-table-td">7,566,000</td>
                <td className="product-table-td">1,999,786</td>
                <td className="product-table-td">26.43%</td>
              </tr>
              <tr>
                <td className="product-table-td">3년</td>
                <td className="product-table-td">55,000,000</td>
                <td className="product-table-td">21,312,000</td>
                <td className="product-table-td">8,433,321</td>
                <td className="product-table-td">39.57%</td>
                <td className="product-table-td">55,000,000</td>
                <td className="product-table-td">22,698,000</td>
                <td className="product-table-td">8,909,857</td>
                <td className="product-table-td">39.25%</td>
              </tr>
              <tr>
                <td className="product-table-td">5년</td>
                <td className="product-table-td">60,000,000</td>
                <td className="product-table-td">35,520,000</td>
                <td className="product-table-td">15,297,286</td>
                <td className="product-table-td">43.07%</td>
                <td className="product-table-td">60,000,000</td>
                <td className="product-table-td">37,830,000</td>
                <td className="product-table-td">16,187,429</td>
                <td className="product-table-td">42.79%</td>
              </tr>
              <tr>
                <td className="product-table-td">6년</td>
                <td className="product-table-td">62,500,000</td>
                <td className="product-table-td">42,624,000</td>
                <td className="product-table-td">18,864,893</td>
                <td className="product-table-td">44.26%</td>
                <td className="product-table-td">62,500,000</td>
                <td className="product-table-td">45,396,000</td>
                <td className="product-table-td">19,971,714</td>
                <td className="product-table-td">43.99%</td>
              </tr>
              <tr>
                <td className="product-table-td">7년</td>
                <td className="product-table-td">69,674,500</td>
                <td className="product-table-td">49,728,000</td>
                <td className="product-table-td">49,728,000</td>
                <td className="product-table-td">100.00%</td>
                <td className="product-table-td">70,247,500</td>
                <td className="product-table-td">52,962,000</td>
                <td className="product-table-td">52,962,000</td>
                <td className="product-table-td">100.00%</td>
              </tr>
              <tr className="bg-red-50">
                <td className="product-table-td">10년</td>
                <td className="product-table-td">84,096,242</td>
                <td className="product-table-td">49,728,000</td>
                <td className="product-table-td">59,464,742</td>
                <td className="product-table-td">119.58%</td>
                <td className="product-table-td">85,139,460</td>
                <td className="product-table-td">52,962,000</td>
                <td className="product-table-td">63,331,960</td>
                <td className="product-table-td">119.58%</td>
              </tr>
              <tr>
                <td className="product-table-td">15년</td>
                <td className="product-table-td">89,127,800</td>
                <td className="product-table-td">49,728,000</td>
                <td className="product-table-td">64,579,800</td>
                <td className="product-table-td">129.87%</td>
                <td className="product-table-td">90,095,588</td>
                <td className="product-table-td">52,962,000</td>
                <td className="product-table-td">68,493,588</td>
                <td className="product-table-td">129.33%</td>
              </tr>
              <tr>
                <td className="product-table-td">20년</td>
                <td className="product-table-td">90,408,013</td>
                <td className="product-table-td">49,728,000</td>
                <td className="product-table-td">68,592,513</td>
                <td className="product-table-td">137.94%</td>
                <td className="product-table-td">91,463,498</td>
                <td className="product-table-td">52,962,000</td>
                <td className="product-table-td">72,710,498</td>
                <td className="product-table-td">137.29%</td>
              </tr>
              <tr>
                <td className="product-table-td">40년</td>
                <td className="product-table-td">96,798,921</td>
                <td className="product-table-td">49,728,000</td>
                <td className="product-table-td">86,332,421</td>
                <td className="product-table-td">173.61%</td>
                <td className="product-table-td">98,292,198</td>
                <td className="product-table-td">52,962,000</td>
                <td className="product-table-td">90,663,698</td>
                <td className="product-table-td">171.19%</td>
              </tr>
              <tr>
                <td className="product-table-td">60년</td>
                <td className="product-table-td">105,840,638</td>
                <td className="product-table-td">49,728,000</td>
                <td className="product-table-td">102,718,638</td>
                <td className="product-table-td">206.56%</td>
                <td className="product-table-td">107,953,294</td>
                <td className="product-table-td">52,962,000</td>
                <td className="product-table-td">105,564,294</td>
                <td className="product-table-td">199.32%</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>

      <div className="product-info-box">
        <p>
          ▶ 이 계약을 중도해지할 경우 해약환급금은 납입한 보험료에서 경과한 기간의 위험보험료,
          계약체결비용 및 계약관리비용(해약공제액 포함) 등이 차감되므로 납입보험료 보다 적거나 없을
          수도 있습니다.
        </p>
        <p className="text-status-red">
          ▶ "해약환급금 일부지급형" 계약을 보험료 납입기간 중 해지할 경우 '기본보험료에 의한
          해약환급금'은 "일반형 상품"의 '기본보험료에 의한 해약환급금'의 50%에 해당하는 금액이며,
          보험료 납입이 완료된 이후에 계약이 해지되는 경우에는 "일반형 상품"의 '기본보험료에 의한
          해약환급금'과 동일합니다.
        </p>
        <p>
          ▶ 이 상품의 보험료 및 해약환급금 산출에 적용되는 이율은 10년 이내 연 2.75%, 10년 초과 연
          1.75% 입니다.(보장형 계약)
        </p>
        <p>
          ▶ 상기 사망보험금 및 해약환급금은 계약해당일 전일 기준의 해당 금액에서 유지보너스가
          발생하는 해당년도의 유지보너스 해당 금액(계약해당일 기준)을 포함한 금액이며, 납입기간동안
          보험료 납입을 정상적으로 하였을 경우를 기준으로 예시된 금액입니다.
        </p>
        <p>
          ▶ 상기 해약환급금은 당해 보험년도 말 기준으로 예시된 금액입니다. 경과년도와 유지보너스가
          발생하는 해당년도가 동일한 시점(예를 들어 주계약 납입기간이 7년인 경우 경과년도 7년 시점,
          10년 시점, 15년 시점)의 해약환급금은 보험료 납입기간 경과시점 직후 연계약해당일 기준으로
          예시됩니다. 따라서 연계약해당일 도래 전 사망 또는 해지시에는 금액이 달라질 수 있습니다.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="product-section-title">◦ 간편심사 관련 안내</h3>

        <div className="product-text space-y-3">
          <p>
            2형(간편심사형)은 '간편심사' 상품으로 유병력자 또는 연령제한 등으로 일반심사보험에
            가입하기 어려운 피보험자를 대상으로 하므로,{' '}
            <span className="font-semibold text-blue-700">일반심사보험보다 보험료가 비쌉니다.</span>
          </p>

          <p>
            피보험자가 의사의 건강검진을 받거나 회사가 일반심사를 할 경우 그 결과에 따라 이 상품보다
            저렴한 일반심사보험에 가입할 수 있습니다. 다만, 일반심사보험의 경우 피보험자의 건강상태
            또는 나이에 따라 가입이 제한될 수 있으며 보험기간 및 보장하는 담보에는 차이가 있을 수
            있습니다.
          </p>
        </div>

        <div>
          <h4 className="product-small-title mb-4 text-center text-[#1e3a8a]">
            간편심사형 VS 일반심사형 비교
          </h4>

          <div className="product-info-box">
            <div className="overflow-x-auto">
              <table className="product-table">
                <thead>
                  <tr className="product-table-header">
                    <th className="product-table-th">구분</th>
                    <th className="product-table-th">간편심사형</th>
                    <th className="product-table-th">일반심사형</th>
                </tr>
              </thead>
              <tbody className="product-table-body">
                <tr>
                  <td className="product-table-td-center  font-semibold">보장내용</td>
                  <td className="product-table-td-center">'보험금 지급기준' 참고</td>
                  <td className="product-table-td-center">'보험금 지급기준' 참고</td>
                </tr>
                <tr>
                  <td className="product-table-td-center  font-semibold">계약승낙여부</td>
                  <td className="product-table-td-center">
                    일반상품 대비 질문항목을 간소화하여,
                    <br />
                    지병이나 기왕력이 있어도 가입 가능
                  </td>
                  <td className="product-table-td-center">
                    피보험자의 건강상태 및 작업에 따라서
                    <br />
                    청약에 대한 승낙을 거절 가능
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold text-text-primary">
            *아래 3가지 질문을 통과하면 유병력자도 2형(간편심사형) 가입이 가능합니다.
          </p>

          <div className="space-y-4 pl-4">
            <div>
              <p className="mb-2 font-semibold text-text-primary">
                1. 최근 3개월 이내에 의사로부터 진찰 또는 검사(건강검진 포함)를 통하여 다음과 같은
                의료행위를 받은 사실이 있습니까? (예, 아니오)
              </p>
              <div className="space-y-1 pl-4 text-text-primary">
                <p>1) 입원 필요 소견</p>
                <p>2) 수술 필요 소견</p>
                <p>3) 추가검사(재검사) 필요 소견</p>
                <p>4) 질병 확정 진단</p>
                <p>5) 질병 의심 소견</p>
                <p className="mt-2 text-xs">
                  *필요 소견, 질병 의심 소견: 의사가 진단서나 소견서 또는 진료의뢰서 등을 포함하여
                  서면(전자문서 포함)으로 교부한 경우
                </p>
              </div>
            </div>

            <div>
              <p className="mb-2 font-semibold text-text-primary">
                2. 최근 2년 이내에 질병이나 사고로 인하여 다음과 같은 의료행위를 받은 사실이
                있습니까? (예, 아니오)
              </p>
              <div className="space-y-1 pl-4 text-text-primary">
                <p>1) 입원</p>
                <p>2) 수술(제왕절개 포함)</p>
              </div>
            </div>

            <div>
              <p className="mb-2 font-semibold text-text-primary">
                3. 최근 5년 이내에 의사로부터 진찰 또는 검사를 통하여 암으로 "진단"받거나 암으로
                "입원 또는 수술"을 받은 적이 있습니까? (예, 아니오)
              </p>
              <p className="pl-4 text-xs text-text-primary">
                *암: 악성신생물, 백혈병 및 기타 혈액종양 포함
              </p>
            </div>
          </div>
        </div>
      </div>
    </TabContentWrapper>
  );
}
