import React from 'react';

export default function Surrender() {
  return (
    <div className="space-y-8 px-2 py-4 sm:px-4 md:px-8 md:py-6">
      <div className="mb-2">
        <h2 className="product-page-title">■ 해약환급금 예시표</h2>
        <div className="mt-2 flex flex-col gap-0.5">
          <span className="text-lg font-bold leading-tight text-product-primary md:text-xl">
            연금개시전 보험기간
          </span>
          <span className="text-warning-500 text-lg font-bold leading-tight md:text-xl">
            보증형
          </span>
        </div>
        <div className="product-caption ml-2 mt-2 pb-0.5 text-right">
          기준 : 주계약, 남자 40세, 보증형, 5년납, 60세 연금개시, 월보험료 50만원, 단위 : 만원
        </div>
      </div>
      {/* 표 */}
      <div className="overflow-x-auto">
        <table className="product-table table-fixed text-center text-xs md:text-sm">
          <colgroup>
            <col className="w-[9%]" />
            <col className="w-[7%]" />
            <col className="w-[11%]" />
            <col className="w-[11%]" />
            <col className="w-[11%]" />
            <col className="w-[14%]" />
            <col className="w-[12%]" />
            <col className="w-[11%]" />
            <col className="w-[12%]" />
          </colgroup>
          <thead>
            <tr className="product-table-header align-middle">
              <th className="product-table-th" rowSpan={2}>
                경과
                <br className="md:hidden" />
                기간
              </th>
              <th className="product-table-th" rowSpan={2}>
                나이
              </th>
              <th className="product-table-th" rowSpan={2}>
                납입보험료
                <br />
                누계 (A)
              </th>
              <th className="product-table-th" colSpan={2}>
                최저보증이율
              </th>
              <th className="product-table-th" colSpan={2}>
                평균공시이율
                <br />
                (2.75%)
              </th>
              <th className="product-table-th" colSpan={2}>
                공시이율
                <br />
                (2.47%)
              </th>
            </tr>
            <tr className="product-table-header">
              <th className="product-table-th">환급금(B)</th>
              <th className="product-table-th">
                환급률
                <br />
                (B/A)
              </th>
              <th className="product-table-th">환급금(C)</th>
              <th className="product-table-th">
                환급률
                <br />
                (C/A)
              </th>
              <th className="product-table-th">환급금(D)</th>
              <th className="product-table-th">
                환급률
                <br />
                (D/A)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="product-table-td-center">3개월</td>
              <td className="product-table-td-center">40</td>
              <td className="product-table-td-center">150</td>
              <td className="product-table-td-center">0</td>
              <td className="product-table-td-center">0.0%</td>
              <td className="product-table-td-center">0</td>
              <td className="product-table-td-center">0.0%</td>
              <td className="product-table-td-center">0</td>
              <td className="product-table-td-center">0.0%</td>
            </tr>
            <tr>
              <td className="product-table-td-center">6개월</td>
              <td className="product-table-td-center">40</td>
              <td className="product-table-td-center">300</td>
              <td className="product-table-td-center">52</td>
              <td className="product-table-td-center">17.4%</td>
              <td className="product-table-td-center">52</td>
              <td className="product-table-td-center">17.6%</td>
              <td className="product-table-td-center">52</td>
              <td className="product-table-td-center">17.6%</td>
            </tr>
            <tr>
              <td className="product-table-td-center">9개월</td>
              <td className="product-table-td-center">40</td>
              <td className="product-table-td-center">450</td>
              <td className="product-table-td-center">120</td>
              <td className="product-table-td-center">26.8%</td>
              <td className="product-table-td-center">122</td>
              <td className="product-table-td-center">27.1%</td>
              <td className="product-table-td-center">122</td>
              <td className="product-table-td-center">27.1%</td>
            </tr>
            <tr>
              <td className="product-table-td-center">1년</td>
              <td className="product-table-td-center">41</td>
              <td className="product-table-td-center">600</td>
              <td className="product-table-td-center">188</td>
              <td className="product-table-td-center">31.5%</td>
              <td className="product-table-td-center">191</td>
              <td className="product-table-td-center">31.9%</td>
              <td className="product-table-td-center">191</td>
              <td className="product-table-td-center">31.9%</td>
            </tr>
            <tr>
              <td className="product-table-td-center">2년</td>
              <td className="product-table-td-center">42</td>
              <td className="product-table-td-center">1,200</td>
              <td className="product-table-td-center">461</td>
              <td className="product-table-td-center">38.5%</td>
              <td className="product-table-td-center">470</td>
              <td className="product-table-td-center">39.2%</td>
              <td className="product-table-td-center">470</td>
              <td className="product-table-td-center">39.2%</td>
            </tr>
            <tr>
              <td className="product-table-td-center">3년</td>
              <td className="product-table-td-center">43</td>
              <td className="product-table-td-center">1,800</td>
              <td className="product-table-td-center">733</td>
              <td className="product-table-td-center">40.7%</td>
              <td className="product-table-td-center">751</td>
              <td className="product-table-td-center">41.8%</td>
              <td className="product-table-td-center">751</td>
              <td className="product-table-td-center">41.8%</td>
            </tr>
            <tr>
              <td className="product-table-td-center">4년</td>
              <td className="product-table-td-center">44</td>
              <td className="product-table-td-center">2,400</td>
              <td className="product-table-td-center">1,003</td>
              <td className="product-table-td-center">41.8%</td>
              <td className="product-table-td-center">1,035</td>
              <td className="product-table-td-center">43.1%</td>
              <td className="product-table-td-center">1,035</td>
              <td className="product-table-td-center">43.1%</td>
            </tr>
            <tr>
              <td className="product-table-td-center">5년</td>
              <td className="product-table-td-center">45</td>
              <td className="product-table-td-center">3,000</td>
              <td className="product-table-td-center">1,272</td>
              <td className="product-table-td-center">42.4%</td>
              <td className="product-table-td-center">1,322</td>
              <td className="product-table-td-center">44.1%</td>
              <td className="product-table-td-center">1,322</td>
              <td className="product-table-td-center">44.1%</td>
            </tr>
            <tr>
              <td className="product-table-td-center">6년</td>
              <td className="product-table-td-center">46</td>
              <td className="product-table-td-center">3,000</td>
              <td className="product-table-td-center">1,259</td>
              <td className="product-table-td-center">42.0%</td>
              <td className="product-table-td-center">1,331</td>
              <td className="product-table-td-center">44.4%</td>
              <td className="product-table-td-center">1,331</td>
              <td className="product-table-td-center">44.4%</td>
            </tr>
            <tr>
              <td className="product-table-td-center">7년</td>
              <td className="product-table-td-center">47</td>
              <td className="product-table-td-center">3,000</td>
              <td className="product-table-td-center">3,000</td>
              <td className="product-table-td-center">100.0%</td>
              <td className="product-table-td-center">3,000</td>
              <td className="product-table-td-center">100.0%</td>
              <td className="product-table-td-center">3,000</td>
              <td className="product-table-td-center">100.0%</td>
            </tr>
            <tr>
              <td className="product-table-td-center">8년</td>
              <td className="product-table-td-center">48</td>
              <td className="product-table-td-center">3,000</td>
              <td className="product-table-td-center">2,974</td>
              <td className="product-table-td-center">99.2%</td>
              <td className="product-table-td-center">3,025</td>
              <td className="product-table-td-center">100.8%</td>
              <td className="product-table-td-center">3,025</td>
              <td className="product-table-td-center">100.8%</td>
            </tr>
            <tr>
              <td className="product-table-td-center">9년</td>
              <td className="product-table-td-center">49</td>
              <td className="product-table-td-center">3,000</td>
              <td className="product-table-td-center">2,949</td>
              <td className="product-table-td-center">98.3%</td>
              <td className="product-table-td-center">3,051</td>
              <td className="product-table-td-center">101.7%</td>
              <td className="product-table-td-center">3,051</td>
              <td className="product-table-td-center">101.7%</td>
            </tr>
            <tr className="bg-red-50">
              <td className="product-table-td-center bg-red-50">10년</td>
              <td className="product-table-td-center bg-red-50">50</td>
              <td className="product-table-td-center bg-red-50">3,000</td>
              <td className="product-table-td-center bg-red-50">3,900</td>
              <td className="product-table-td-center bg-red-50">130.0%</td>
              <td className="product-table-td-center bg-red-50">3,900</td>
              <td className="product-table-td-center bg-red-50">130.0%</td>
              <td className="product-table-td-center bg-red-50">3,900</td>
              <td className="product-table-td-center bg-red-50">130.0%</td>
            </tr>
            <tr>
              <td className="product-table-td-center">11년</td>
              <td className="product-table-td-center">51</td>
              <td className="product-table-td-center">3,000</td>
              <td className="product-table-td-center">3,858</td>
              <td className="product-table-td-center">128.6%</td>
              <td className="product-table-td-center">3,934</td>
              <td className="product-table-td-center">131.1%</td>
              <td className="product-table-td-center">3,934</td>
              <td className="product-table-td-center">131.1%</td>
            </tr>
            <tr>
              <td className="product-table-td-center">12년</td>
              <td className="product-table-td-center">52</td>
              <td className="product-table-td-center">3,000</td>
              <td className="product-table-td-center">3,817</td>
              <td className="product-table-td-center">127.2%</td>
              <td className="product-table-td-center">3,968</td>
              <td className="product-table-td-center">132.3%</td>
              <td className="product-table-td-center">3,968</td>
              <td className="product-table-td-center">132.3%</td>
            </tr>
            <tr>
              <td className="product-table-td-center">13년</td>
              <td className="product-table-td-center">53</td>
              <td className="product-table-td-center">3,000</td>
              <td className="product-table-td-center">3,776</td>
              <td className="product-table-td-center">125.9%</td>
              <td className="product-table-td-center">4,003</td>
              <td className="product-table-td-center">133.4%</td>
              <td className="product-table-td-center">4,003</td>
              <td className="product-table-td-center">133.4%</td>
            </tr>
            <tr>
              <td className="product-table-td-center">14년</td>
              <td className="product-table-td-center">54</td>
              <td className="product-table-td-center">3,000</td>
              <td className="product-table-td-center">3,736</td>
              <td className="product-table-td-center">124.5%</td>
              <td className="product-table-td-center">4,038</td>
              <td className="product-table-td-center">134.6%</td>
              <td className="product-table-td-center">4,038</td>
              <td className="product-table-td-center">134.6%</td>
            </tr>
            <tr>
              <td className="product-table-td-center">15년</td>
              <td className="product-table-td-center">55</td>
              <td className="product-table-td-center">3,000</td>
              <td className="product-table-td-center">3,696</td>
              <td className="product-table-td-center">123.2%</td>
              <td className="product-table-td-center">4,073</td>
              <td className="product-table-td-center">135.8%</td>
              <td className="product-table-td-center">4,073</td>
              <td className="product-table-td-center">135.8%</td>
            </tr>
            <tr>
              <td className="product-table-td-center">16년</td>
              <td className="product-table-td-center">56</td>
              <td className="product-table-td-center">3,000</td>
              <td className="product-table-td-center">3,656</td>
              <td className="product-table-td-center">121.9%</td>
              <td className="product-table-td-center">4,109</td>
              <td className="product-table-td-center">137.0%</td>
              <td className="product-table-td-center">4,109</td>
              <td className="product-table-td-center">137.0%</td>
            </tr>
            <tr>
              <td className="product-table-td-center">17년</td>
              <td className="product-table-td-center">57</td>
              <td className="product-table-td-center">3,000</td>
              <td className="product-table-td-center">3,617</td>
              <td className="product-table-td-center">120.6%</td>
              <td className="product-table-td-center">4,145</td>
              <td className="product-table-td-center">138.2%</td>
              <td className="product-table-td-center">4,145</td>
              <td className="product-table-td-center">138.2%</td>
            </tr>
            <tr>
              <td className="product-table-td-center">18년</td>
              <td className="product-table-td-center">58</td>
              <td className="product-table-td-center">3,000</td>
              <td className="product-table-td-center">3,578</td>
              <td className="product-table-td-center">119.3%</td>
              <td className="product-table-td-center">4,181</td>
              <td className="product-table-td-center">139.4%</td>
              <td className="product-table-td-center">4,181</td>
              <td className="product-table-td-center">139.4%</td>
            </tr>
            <tr>
              <td className="product-table-td-center">19년</td>
              <td className="product-table-td-center">59</td>
              <td className="product-table-td-center">3,000</td>
              <td className="product-table-td-center">3,539</td>
              <td className="product-table-td-center">118.0%</td>
              <td className="product-table-td-center">4,218</td>
              <td className="product-table-td-center">140.6%</td>
              <td className="product-table-td-center">4,218</td>
              <td className="product-table-td-center">140.6%</td>
            </tr>
            <tr>
              <td className="product-table-td-center">20년</td>
              <td className="product-table-td-center">60</td>
              <td className="product-table-td-center">3,000</td>
              <td className="product-table-td-center">3,501</td>
              <td className="product-table-td-center">116.7%</td>
              <td className="product-table-td-center">4,255</td>
              <td className="product-table-td-center">141.9%</td>
              <td className="product-table-td-center">4,255</td>
              <td className="product-table-td-center">141.9%</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* 주석 */}
      <ol className="list-decimal space-y-1 pl-4 text-xs text-gray-800 md:text-sm">
        <li>
          계약일부터 경과기간이 지난 말 시점의 예시이며 나이는 경과기간에 따른 주계약 피보험자의
          나이로 보험나이와 차이가 있습니다.
        </li>
        <li>
          상기 예시금액은 감독규정 제 1-2조 제13호에 따른 현재 평균공시이율 2.75%, 현재
          (2025년09월)의 공시이율 2.47%을 기준으로 계산한 금액입니다.
        </li>
        <li>
          실제 해약환급금은 공시이율을 적용하여 계산되며, 공시이율 변동시 해약환급금도 변동됩니다.
        </li>
        <li>
          이 보험계약을 중도해지할 경우 해약환급금은 납입한 보험료에서 경과된 기간의 위험보험료,
          사업비(해약공제금액 포함), 최저사망적립액 보증비용, 트리플 레벨업 보증비용 등이 차감되므로
          납입한 보험료보다 적거나 없을 수도 있습니다.
        </li>
        <li>
          공시이율은 매1개월마다 변동될 수 있으며 최저보증이율은 계약 후 경과기간 5년 미만은 연복리
          1.0%, 5년 이상 10년 미만은 연복리 0.75%, 10년 이상은 연복리 0.5% 입니다.
        </li>
        <li>
          상기 환급률은 최저보증이율 및 현재 적용이율이 경과기간동안 유지된다고 가정하였을 때
          계약자가 납입한 보험료 대비 해약환급금의 비율입니다.
        </li>
        <li>상기 예시된 금액 및 환급률은 세금을 공제하지 않은 금액입니다.</li>
        <li>상기 예시된 금액 및 환급률 등이 미래의 수익을 보장하는 것은 아닙니다.</li>
        <li>
          평균공시이율(감독규정 제1-2조 제13호)은 감독원장이 정하는 바에 따라 산정한 전체 보험회사
          공시이율의 평균으로, 2025년09월 현재 2.75%입니다.
        </li>
        <li>
          상기 예시된 금액 및 환급률은{' '}
          <span className="text-status-red">
            7년 및 10년 경과 시점의 트리플 레벨업 보증을 반영한 금액
          </span>
          이며,{' '}
          <span className="text-status-red">
            계약해당일이 도래하기 이전에 해지 시 예시된 금액과 다를 수 있습니다.
          </span>
          <br />
          다만, 연금개시시점 트리플 레벨업 보증은 연금을 개시하는 경우에 한하여 보증해드리므로,{' '}
          <span className="text-status-red">
            연금개시시점 트리플 레벨업 보증은 반영하기 전 금액
          </span>
          입니다.
        </li>
        <li>
          트리플 레벨업 보증은 감액 또는 중도인출이 발생한 경우{' '}
          <span className="text-status-red">기본보험료 계약자적립액에 비례하여 감소</span>하며,{' '}
          <span className="text-status-red">중도인출금액을 재납입하더라도 원복되지 않습니다.</span>
        </li>
      </ol>
      {/* 두 번째 해약환급금 예시표 헤더 */}
      <div className="mb-2 mt-16">
        <h2 className="product-page-title">■ 연금지급액 예시표</h2>
        <div className="mt-2 flex flex-col gap-0.5">
          <span className="text-lg font-bold leading-tight text-[#222] md:text-xl">
            연금개시후 보험기간
          </span>
          <span className="text-warning-500 text-lg font-bold leading-tight md:text-xl">
            보증형
          </span>
        </div>
        <div className="product-caption ml-2 mt-2 pb-0.5 text-right">
          기준 : 주계약, 남자 40세, 보증형, 5년납, 60세 연금개시, 월보험료 50만원, 단위 : 원
        </div>
      </div>
      {/* 연금지급액 예시표 표 */}
      <div className="overflow-x-auto">
        <table className="product-table text-center text-xs md:text-sm">
          <thead>
            <tr className="product-table-header">
              <th className="product-table-th" colSpan={2}>
                구분
              </th>
              <th className="product-table-th">최저보증이율</th>
              <th className="product-table-th">
                2025년09월
                <br />
                평균공시이율2.75%가정
                <br />
                [공시이율(2.47%)을 상한으로 함]
              </th>
              <th className="product-table-th">
                2025년09월
                <br />
                현재공시이율(2.47%)
              </th>
            </tr>
            <tr>
              <td className="product-table-td-center" colSpan={2}>
                연금개시시점 계약자적립액
              </td>
              <td className="product-table-td-center">45,000,000</td>
              <td className="product-table-td-center">45,000,000</td>
              <td className="product-table-td-center">45,000,000</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="product-table-td-center font-bold" rowSpan={3}>
                종신연금형
              </td>
              <td className="product-table-td-center">20년 보증</td>
              <td className="product-table-td-center">1,350,092</td>
              <td className="product-table-td-center">1,861,273</td>
              <td className="product-table-td-center">1,861,273</td>
            </tr>
            <tr>
              <td className="product-table-td-center">100세 보증</td>
              <td className="product-table-td-center">1,181,618</td>
              <td className="product-table-td-center">1,684,947</td>
              <td className="product-table-td-center">1,684,947</td>
            </tr>
            <tr>
              <td className="product-table-td-center">기대여명보증</td>
              <td className="product-table-td-center">1,340,697</td>
              <td className="product-table-td-center">1,849,406</td>
              <td className="product-table-td-center">1,849,406</td>
            </tr>
            <tr>
              <td className="product-table-td-center font-bold" rowSpan={4}>
                확정연금형
              </td>
              <td className="product-table-td-center">5년 확정</td>
              <td className="product-table-td-center">8,999,999</td>
              <td className="product-table-td-center">9,350,957</td>
              <td className="product-table-td-center">9,350,957</td>
            </tr>
            <tr>
              <td className="product-table-td-center">10년 확정</td>
              <td className="product-table-td-center">4,556,106</td>
              <td className="product-table-td-center">4,960,328</td>
              <td className="product-table-td-center">4,960,328</td>
            </tr>
            <tr>
              <td className="product-table-td-center">15년 확정</td>
              <td className="product-table-td-center">3,075,116</td>
              <td className="product-table-td-center">3,504,020</td>
              <td className="product-table-td-center">3,504,020</td>
            </tr>
            <tr>
              <td className="product-table-td-center">20년 확정</td>
              <td className="product-table-td-center">2,334,851</td>
              <td className="product-table-td-center">2,781,251</td>
              <td className="product-table-td-center">2,781,251</td>
            </tr>
            <tr>
              <td className="product-table-td-center font-bold" colSpan={2}>
                상속연금형
              </td>
              <td className="product-table-td-center">221,664</td>
              <td className="product-table-td-center">1,073,968</td>
              <td className="product-table-td-center">1,073,968</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* 연금지급액 예시표 주석 */}
      <ol className="mt-2 list-decimal space-y-1 pl-4 text-xs text-gray-800 md:text-sm">
        <li>
          상기 예시금액은 최저보증이율, 평균공시이율 2.75%(현재공시이율 상한) 및 현재{' '}
          <span className="text-status-red">2025년09월</span>의 공시이율{' '}
          <span className="text-status-red">2.47</span>%을 기준으로 계산한 금액입니다.
        </li>
        <li>실제 연금액은 공시이율을 적용하여 계산되며, 공시이율 변동시 연금액도 변경됩니다.</li>
        <li>
          연금을 매월, 3개월, 6개월로 분할하여 지급할 경우 생존연금은「공시이율」로 부리한 금액을
          더하여 드립니다.
        </li>
        <li>
          공시이율은 매1개월마다 변동될 수 있으며, 최저보증이율은 경과기간 5년 미만은 연복리 1.0%,
          경과기간 5년 이상 10년미만은 연복리 0.75%, 경과기간 10년이상은 연복리 0.5% 입니다.
        </li>
        <li>
          계약체결시 연금지급형태는 '종신연금형'으로 정해지고, 계약자는 연금개시전에 연금지급방법 및
          연금개시 시기를 변경할 수 있습니다.
        </li>
        <li>
          상기 연금개시시점 계약자적립액은{' '}
          <span className="text-status-red">
            연금개시시점 트리플 레벨업 보증을 반영하여 예시한 금액
          </span>
          입니다.
        </li>
        <li>
          연금개시시점의 트리플 레벨업 보증은 연금을 개시할 경우에만 적용되며,{' '}
          <span className="text-status-red">연금을 개시하지 않을 경우 보증되지 않습니다.</span>
        </li>
        <li>
          상기 연금연액이 미래의 수익을 보장하는 것은 아니며, 향후 공시이율의 변경, 연급지급 개시
          당시 연금사망률 적용 등에 따라 변동될 수 있습니다.
        </li>
      </ol>
    </div>
  );
}
