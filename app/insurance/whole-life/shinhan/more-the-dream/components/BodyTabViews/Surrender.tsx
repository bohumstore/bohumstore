import React from 'react';

export default function Surrender() {
  return (
    <div className="space-y-8 px-2 py-4 sm:px-4 md:px-8 md:py-6">
      <div className="mb-2">
        <h2 className="product-page-title">해약환급금 예시표</h2>
        <div className="product-caption ml-2 mt-4 pb-0 text-right">
          기준: 남자 40세, 일반심사형, 보험료형, 종신, 5년납, 월납, 30만원 (단위: 원, %)
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="product-table">
          <thead>
            <tr className="product-table-header">
              <th className="product-table-th">경과기간</th>
              <th className="product-table-th">나이</th>
              <th className="product-table-th">납입보험료누계</th>
              <th className="product-table-th">해약환급금</th>
              <th className="product-table-th">환급률</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="product-table-td-center">3개월</td>
              <td className="product-table-td-center">40세</td>
              <td className="product-table-td-center">900,000</td>
              <td className="product-table-td-center">29,407</td>
              <td className="product-table-td-center">3.2</td>
            </tr>
            <tr>
              <td className="product-table-td-center">6개월</td>
              <td className="product-table-td-center">40세</td>
              <td className="product-table-td-center">1,800,000</td>
              <td className="product-table-td-center">407,675</td>
              <td className="product-table-td-center">22.6</td>
            </tr>
            <tr>
              <td className="product-table-td-center">9개월</td>
              <td className="product-table-td-center">40세</td>
              <td className="product-table-td-center">2,700,000</td>
              <td className="product-table-td-center">785,944</td>
              <td className="product-table-td-center">29.1</td>
            </tr>
            <tr>
              <td className="product-table-td-center">1년</td>
              <td className="product-table-td-center">41세</td>
              <td className="product-table-td-center">3,600,000</td>
              <td className="product-table-td-center">1,164,212</td>
              <td className="product-table-td-center">32.3</td>
            </tr>
            <tr>
              <td className="product-table-td-center">2년</td>
              <td className="product-table-td-center">42세</td>
              <td className="product-table-td-center">7,200,000</td>
              <td className="product-table-td-center">2,717,795</td>
              <td className="product-table-td-center">37.7</td>
            </tr>
            <tr>
              <td className="product-table-td-center">3년</td>
              <td className="product-table-td-center">43세</td>
              <td className="product-table-td-center">10,800,000</td>
              <td className="product-table-td-center">4,313,103</td>
              <td className="product-table-td-center">39.9</td>
            </tr>
            <tr>
              <td className="product-table-td-center">4년</td>
              <td className="product-table-td-center">44세</td>
              <td className="product-table-td-center">14,400,000</td>
              <td className="product-table-td-center">5,951,474</td>
              <td className="product-table-td-center">41.3</td>
            </tr>
            <tr>
              <td className="product-table-td-center">5년</td>
              <td className="product-table-td-center">45세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">16,200,000</td>
              <td className="product-table-td-center">90.0</td>
            </tr>
            <tr>
              <td className="product-table-td-center">6년</td>
              <td className="product-table-td-center">46세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">16,486,799</td>
              <td className="product-table-td-center">91.5</td>
            </tr>
            <tr>
              <td className="product-table-td-center">7년</td>
              <td className="product-table-td-center">47세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">16,781,659</td>
              <td className="product-table-td-center">93.2</td>
            </tr>
            <tr>
              <td className="product-table-td-center">8년</td>
              <td className="product-table-td-center">48세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">17,084,856</td>
              <td className="product-table-td-center">94.9</td>
            </tr>
            <tr>
              <td className="product-table-td-center">9년</td>
              <td className="product-table-td-center">49세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">17,396,679</td>
              <td className="product-table-td-center">96.6</td>
            </tr>
            <tr className="bg-red-50">
              <td className="product-table-td-center bg-red-50">10년</td>
              <td className="product-table-td-center bg-red-50">50세</td>
              <td className="product-table-td-center bg-red-50">18,000,000</td>
              <td className="product-table-td-center bg-red-50">22,086,001</td>
              <td className="product-table-td-center bg-red-50">122.7</td>
            </tr>
            <tr>
              <td className="product-table-td-center">11년</td>
              <td className="product-table-td-center">51세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">22,261,007</td>
              <td className="product-table-td-center">123.6</td>
            </tr>
            <tr>
              <td className="product-table-td-center">12년</td>
              <td className="product-table-td-center">52세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">22,438,607</td>
              <td className="product-table-td-center">124.6</td>
            </tr>
            <tr>
              <td className="product-table-td-center">13년</td>
              <td className="product-table-td-center">53세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">22,618,835</td>
              <td className="product-table-td-center">125.6</td>
            </tr>
            <tr>
              <td className="product-table-td-center">14년</td>
              <td className="product-table-td-center">54세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">22,801,728</td>
              <td className="product-table-td-center">126.6</td>
            </tr>
            <tr>
              <td className="product-table-td-center">15년</td>
              <td className="product-table-td-center">55세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">22,987,322</td>
              <td className="product-table-td-center">127.7</td>
            </tr>
            <tr>
              <td className="product-table-td-center">16년</td>
              <td className="product-table-td-center">56세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">23,175,657</td>
              <td className="product-table-td-center">128.7</td>
            </tr>
            <tr>
              <td className="product-table-td-center">17년</td>
              <td className="product-table-td-center">57세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">23,366,769</td>
              <td className="product-table-td-center">129.8</td>
            </tr>
            <tr>
              <td className="product-table-td-center">18년</td>
              <td className="product-table-td-center">58세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">23,560,694</td>
              <td className="product-table-td-center">130.8</td>
            </tr>
            <tr>
              <td className="product-table-td-center">19년</td>
              <td className="product-table-td-center">59세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">23,757,461</td>
              <td className="product-table-td-center">131.9</td>
            </tr>
            <tr>
              <td className="product-table-td-center">20년</td>
              <td className="product-table-td-center">60세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">24,777,267</td>
              <td className="product-table-td-center">137.6</td>
            </tr>
            <tr>
              <td className="product-table-td-center">21년</td>
              <td className="product-table-td-center">61세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">24,992,107</td>
              <td className="product-table-td-center">138.8</td>
            </tr>
            <tr>
              <td className="product-table-td-center">22년</td>
              <td className="product-table-td-center">62세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">25,210,084</td>
              <td className="product-table-td-center">140.0</td>
            </tr>
            <tr>
              <td className="product-table-td-center">23년</td>
              <td className="product-table-td-center">63세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">25,431,228</td>
              <td className="product-table-td-center">141.2</td>
            </tr>
            <tr>
              <td className="product-table-td-center">24년</td>
              <td className="product-table-td-center">64세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">25,655,565</td>
              <td className="product-table-td-center">142.5</td>
            </tr>
            <tr>
              <td className="product-table-td-center">25년</td>
              <td className="product-table-td-center">65세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">25,883,129</td>
              <td className="product-table-td-center">143.7</td>
            </tr>
            <tr>
              <td className="product-table-td-center">26년</td>
              <td className="product-table-td-center">66세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">26,113,959</td>
              <td className="product-table-td-center">145.0</td>
            </tr>
            <tr>
              <td className="product-table-td-center">27년</td>
              <td className="product-table-td-center">67세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">26,348,092</td>
              <td className="product-table-td-center">146.3</td>
            </tr>
            <tr>
              <td className="product-table-td-center">28년</td>
              <td className="product-table-td-center">68세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">26,585,553</td>
              <td className="product-table-td-center">147.6</td>
            </tr>
            <tr>
              <td className="product-table-td-center">29년</td>
              <td className="product-table-td-center">69세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">26,826,361</td>
              <td className="product-table-td-center">149.0</td>
            </tr>
            <tr>
              <td className="product-table-td-center">30년</td>
              <td className="product-table-td-center">70세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">27,070,549</td>
              <td className="product-table-td-center">150.3</td>
            </tr>
            <tr>
              <td className="product-table-td-center">31년</td>
              <td className="product-table-td-center">71세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">27,318,156</td>
              <td className="product-table-td-center">151.7</td>
            </tr>
            <tr>
              <td className="product-table-td-center">32년</td>
              <td className="product-table-td-center">72세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">27,569,195</td>
              <td className="product-table-td-center">153.1</td>
            </tr>
            <tr>
              <td className="product-table-td-center">33년</td>
              <td className="product-table-td-center">73세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">27,823,633</td>
              <td className="product-table-td-center">154.5</td>
            </tr>
            <tr>
              <td className="product-table-td-center">34년</td>
              <td className="product-table-td-center">74세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">28,081,413</td>
              <td className="product-table-td-center">156.0</td>
            </tr>
            <tr>
              <td className="product-table-td-center">35년</td>
              <td className="product-table-td-center">75세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">28,342,505</td>
              <td className="product-table-td-center">157.4</td>
            </tr>
            <tr>
              <td className="product-table-td-center">36년</td>
              <td className="product-table-td-center">76세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">28,606,916</td>
              <td className="product-table-td-center">158.9</td>
            </tr>
            <tr>
              <td className="product-table-td-center">37년</td>
              <td className="product-table-td-center">77세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">28,874,649</td>
              <td className="product-table-td-center">160.4</td>
            </tr>
            <tr>
              <td className="product-table-td-center">38년</td>
              <td className="product-table-td-center">78세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">29,145,670</td>
              <td className="product-table-td-center">161.9</td>
            </tr>
            <tr>
              <td className="product-table-td-center">39년</td>
              <td className="product-table-td-center">79세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">29,419,910</td>
              <td className="product-table-td-center">163.4</td>
            </tr>
            <tr>
              <td className="product-table-td-center">40년</td>
              <td className="product-table-td-center">80세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">29,697,335</td>
              <td className="product-table-td-center">164.9</td>
            </tr>
            <tr>
              <td className="product-table-td-center">41년</td>
              <td className="product-table-td-center">81세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">29,977,941</td>
              <td className="product-table-td-center">166.5</td>
            </tr>
            <tr>
              <td className="product-table-td-center">42년</td>
              <td className="product-table-td-center">82세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">30,261,702</td>
              <td className="product-table-td-center">168.1</td>
            </tr>
            <tr>
              <td className="product-table-td-center">43년</td>
              <td className="product-table-td-center">83세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">30,548,526</td>
              <td className="product-table-td-center">169.7</td>
            </tr>
            <tr>
              <td className="product-table-td-center">44년</td>
              <td className="product-table-td-center">84세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">30,838,266</td>
              <td className="product-table-td-center">171.3</td>
            </tr>
            <tr>
              <td className="product-table-td-center">45년</td>
              <td className="product-table-td-center">85세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">31,130,838</td>
              <td className="product-table-td-center">172.9</td>
            </tr>
            <tr>
              <td className="product-table-td-center">46년</td>
              <td className="product-table-td-center">86세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">31,426,202</td>
              <td className="product-table-td-center">174.5</td>
            </tr>
            <tr>
              <td className="product-table-td-center">47년</td>
              <td className="product-table-td-center">87세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">31,724,281</td>
              <td className="product-table-td-center">176.2</td>
            </tr>
            <tr>
              <td className="product-table-td-center">48년</td>
              <td className="product-table-td-center">88세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">32,024,884</td>
              <td className="product-table-td-center">177.9</td>
            </tr>
            <tr>
              <td className="product-table-td-center">49년</td>
              <td className="product-table-td-center">89세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">32,327,740</td>
              <td className="product-table-td-center">179.5</td>
            </tr>
            <tr>
              <td className="product-table-td-center">50년</td>
              <td className="product-table-td-center">90세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">32,632,659</td>
              <td className="product-table-td-center">181.2</td>
            </tr>
            <tr>
              <td className="product-table-td-center">51년</td>
              <td className="product-table-td-center">91세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">32,939,537</td>
              <td className="product-table-td-center">182.9</td>
            </tr>
            <tr>
              <td className="product-table-td-center">52년</td>
              <td className="product-table-td-center">92세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">33,248,244</td>
              <td className="product-table-td-center">184.7</td>
            </tr>
            <tr>
              <td className="product-table-td-center">53년</td>
              <td className="product-table-td-center">93세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">33,558,523</td>
              <td className="product-table-td-center">186.4</td>
            </tr>
            <tr>
              <td className="product-table-td-center">54년</td>
              <td className="product-table-td-center">94세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">33,869,998</td>
              <td className="product-table-td-center">188.1</td>
            </tr>
            <tr>
              <td className="product-table-td-center">55년</td>
              <td className="product-table-td-center">95세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">34,182,420</td>
              <td className="product-table-td-center">189.9</td>
            </tr>
            <tr>
              <td className="product-table-td-center">56년</td>
              <td className="product-table-td-center">96세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">34,495,630</td>
              <td className="product-table-td-center">191.6</td>
            </tr>
            <tr>
              <td className="product-table-td-center">57년</td>
              <td className="product-table-td-center">97세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">34,809,384</td>
              <td className="product-table-td-center">193.3</td>
            </tr>
            <tr>
              <td className="product-table-td-center">58년</td>
              <td className="product-table-td-center">98세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">35,123,202</td>
              <td className="product-table-td-center">195.1</td>
            </tr>
            <tr>
              <td className="product-table-td-center">59년</td>
              <td className="product-table-td-center">99세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">35,436,436</td>
              <td className="product-table-td-center">196.8</td>
            </tr>
            <tr>
              <td className="product-table-td-center">60년</td>
              <td className="product-table-td-center">100세</td>
              <td className="product-table-td-center">18,000,000</td>
              <td className="product-table-td-center">35,748,615</td>
              <td className="product-table-td-center">198.6</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="product-text space-y-2">
        <p>
          ※ 이 보험계약을 중도 해지할 경우 해약환급금은 납입한 보험료에서 경과된 기간의 위험보험료,
          계약체결비용(해약공제액 포함) 및 계약관리비용 등이 차감되므로 납입보험료보다 적거나 없을
          수도 있습니다.
        </p>
        <p>
          ※ 위 해약환급금 예시는 가입금액의 감액, 특약의 해지, 계약내용의 변경 또는 보험금 지급사유
          발생 등에 따라 금액이 달라지거나 감소할 수 있습니다.
        </p>
        <p>
          ※ 위 예시표는 경과년도 계약해당일 직후 기준이며, 납입완료보너스 및 장기유지보너스가 반영된
          예시입니다. 보너스 관련 자세한 사항은 상품설명서 |가입시 알아두실 사항| 의 '보너스에 관한
          사항'을 참조하여 주시기 바랍니다.
        </p>
        <p>※ 위 예시된 해약환급금은 세전 기준 금액입니다.</p>
        <br />
        <p className="text-status-red">
          - 상기 보험상품 관련 내용은 요약된 자료이므로 단순 안내자료로 참고하시기 바라며, 보다
          자세한 사항은 약관 및 설명서를 참조하시기 바랍니다.
        </p>
        <p className="text-status-red">
          - 이 화면은 가입자의 이해를 돕기 위한 단순 안내자료이므로 실제 보험가입시 발생되는
          상품설명서와 내용이 다를 수 있으며 보험금 지급을 위한 근거서류가 될 수 없습니다.
        </p>
      </div>
    </div>
  );
}
