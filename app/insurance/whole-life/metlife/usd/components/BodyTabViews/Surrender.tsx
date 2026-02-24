import React from 'react';

export default function Surrender() {
  return (
    <div className="space-y-6 px-2 py-4 sm:space-y-8 sm:px-4 md:px-8 md:py-6">
      <h2 className="product-page-title">해약환급금 예시</h2>

      <div className="space-y-4">
        <h4 className="product-small-title">- 저해약환급금형Ⅰ</h4>
        <p className="product-caption text-right">
          예시기준 : 주계약 가입금액 1만달러, 가입나이 40세, 5년납, 월납, 단위 : 달러(달러미만절사)
        </p>
        <div className="overflow-x-auto">
          <table className="product-table-center">
            <thead>
              <tr className="product-table-header">
                <th className="product-table-th" rowSpan={2}>
                  경과
                  <br className="sm:hidden" />
                  기간
                </th>
                <th className="product-table-th" colSpan={3}>
                  남자
                </th>
                <th className="product-table-th" colSpan={3}>
                  여자
                </th>
              </tr>
              <tr className="product-table-header">
                <th className="product-table-th">
                  납입
                  <br className="sm:hidden" />
                  보험료
                </th>
                <th className="product-table-th">
                  해약
                  <br className="sm:hidden" />
                  환급금
                </th>
                <th className="product-table-th">
                  해약
                  <br className="sm:hidden" />
                  환급률
                </th>
                <th className="product-table-th">
                  납입
                  <br className="sm:hidden" />
                  보험료
                </th>
                <th className="product-table-th">
                  해약
                  <br className="sm:hidden" />
                  환급금
                </th>
                <th className="product-table-th">
                  해약
                  <br className="sm:hidden" />
                  환급률
                </th>
              </tr>
            </thead>
            <tbody className="product-table-body">
              <tr>
                <td className="product-table-td-center">1년</td>
                <td className="product-table-td-center">2,571</td>
                <td className="product-table-td-center">680</td>
                <td className="product-table-td-center">26.5%</td>
                <td className="product-table-td-center">2,505</td>
                <td className="product-table-td-center">664</td>
                <td className="product-table-td-center">26.5%</td>
              </tr>
              <tr>
                <td className="product-table-td-center">3년</td>
                <td className="product-table-td-center">7,714</td>
                <td className="product-table-td-center">2,716</td>
                <td className="product-table-td-center">35.2%</td>
                <td className="product-table-td-center">7,516</td>
                <td className="product-table-td-center">2,649</td>
                <td className="product-table-td-center">35.2%</td>
              </tr>
              <tr>
                <td className="product-table-td-center">5년</td>
                <td className="product-table-td-center">12,858</td>
                <td className="product-table-td-center">4,881</td>
                <td className="product-table-td-center">38.0%</td>
                <td className="product-table-td-center">12,528</td>
                <td className="product-table-td-center">4,758</td>
                <td className="product-table-td-center">38.0%</td>
              </tr>
              <tr>
                <td className="product-table-td-center">5년 1일</td>
                <td className="product-table-td-center">12,858</td>
                <td className="product-table-td-center">12,655</td>
                <td className="product-table-td-center">98.4%</td>
                <td className="product-table-td-center">12,528</td>
                <td className="product-table-td-center">12,336</td>
                <td className="product-table-td-center">98.5%</td>
              </tr>
              <tr>
                <td className="product-table-td-center">7년</td>
                <td className="product-table-td-center">12,858</td>
                <td className="product-table-td-center">12,846</td>
                <td className="product-table-td-center">99.9%</td>
                <td className="product-table-td-center">12,528</td>
                <td className="product-table-td-center">12,522</td>
                <td className="product-table-td-center">100.0%</td>
              </tr>
              <tr>
                <td className="product-table-td-center">10년</td>
                <td className="product-table-td-center">12,858</td>
                <td className="product-table-td-center">14,665</td>
                <td className="product-table-td-center">114.1%</td>
                <td className="product-table-td-center">12,528</td>
                <td className="product-table-td-center">14,296</td>
                <td className="product-table-td-center">114.1%</td>
              </tr>
              <tr className="bg-red-50">
                <td className="product-table-td-center">10년 1일</td>
                <td className="product-table-td-center">12,858</td>
                <td className="product-table-td-center">16,054</td>
                <td className="product-table-td-center">124.9%</td>
                <td className="product-table-td-center">12,528</td>
                <td className="product-table-td-center">15,649</td>
                <td className="product-table-td-center">124.9%</td>
              </tr>
              <tr>
                <td className="product-table-td-center">15년</td>
                <td className="product-table-td-center">12,858</td>
                <td className="product-table-td-center">16,689</td>
                <td className="product-table-td-center">129.8%</td>
                <td className="product-table-td-center">12,528</td>
                <td className="product-table-td-center">16,274</td>
                <td className="product-table-td-center">129.9%</td>
              </tr>
              <tr>
                <td className="product-table-td-center">20년</td>
                <td className="product-table-td-center">12,858</td>
                <td className="product-table-td-center">17,347</td>
                <td className="product-table-td-center">134.9%</td>
                <td className="product-table-td-center">12,528</td>
                <td className="product-table-td-center">16,927</td>
                <td className="product-table-td-center">135.1%</td>
              </tr>
              <tr>
                <td className="product-table-td-center">40년</td>
                <td className="product-table-td-center">12,858</td>
                <td className="product-table-td-center">20,073</td>
                <td className="product-table-td-center">156.1%</td>
                <td className="product-table-td-center">12,528</td>
                <td className="product-table-td-center">19,766</td>
                <td className="product-table-td-center">157.8%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="product-text mt-4 space-y-1">
          <p className="text-status-red">
            • 이 보험상품은 달러상품이므로 원-달러 환율변동에 의해 원화기준으로 환산 시 보험료,
            보험금 및 해약환급금 등에 손실이 발생할 수 있으며, 그 손실은 계약자에게 귀속됩니다.
          </p>
          <p>
            • [5년 1일]의 해약환급금은 계약일로부터 5년이 경과하고 최초로 도래하는 계약해당일의
            계약자적립액에 유지보너스금액을 더하여 산출한 금액입니다.
          </p>
          <p>
            • [10년 1일]의 해약환급금은 계약일로부터 10년이 경과하고 최초로 도래하는 계약해당일의
            계약자적립액에 유지보너스금액을 더하여 산출한 금액입니다.
          </p>
          <p>
            • 해약환급금은 이미 납입한 보험료보다 적거나 없을 수 있으며 기타보험료 및 해약환급금
            산출 관련사항은 상품요약서(당사 홈페이지 상품공시실 참조) 및 상품설명서에서 보다 자세히
            확인하실 수 있습니다.
          </p>
          <p>• 상기 해약환급금은 세전기준입니다.</p>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="product-small-title">- 저해약환급금형Ⅱ</h4>
        <p className="product-caption text-right">
          예시기준 : 주계약 가입금액 1만달러, 가입나이 40세, 10년납, 월납, 단위 : 달러(달러미만절사)
        </p>
        <div className="overflow-x-auto">
          <table className="product-table-center">
            <thead>
              <tr className="product-table-header">
                <th className="product-table-th" rowSpan={2}>
                  경과
                  <br className="sm:hidden" />
                  기간
                </th>
                <th className="product-table-th" colSpan={3}>
                  남자
                </th>
                <th className="product-table-th" colSpan={3}>
                  여자
                </th>
              </tr>
              <tr className="product-table-header">
                <th className="product-table-th">
                  납입
                  <br className="sm:hidden" />
                  보험료
                </th>
                <th className="product-table-th">
                  해약
                  <br className="sm:hidden" />
                  환급금
                </th>
                <th className="product-table-th">
                  해약
                  <br className="sm:hidden" />
                  환급률
                </th>
                <th className="product-table-th">
                  납입
                  <br className="sm:hidden" />
                  보험료
                </th>
                <th className="product-table-th">
                  해약
                  <br className="sm:hidden" />
                  환급금
                </th>
                <th className="product-table-th">
                  해약
                  <br className="sm:hidden" />
                  환급률
                </th>
              </tr>
            </thead>
            <tbody className="product-table-body">
              <tr>
                <td className="product-table-td-center">1년</td>
                <td className="product-table-td-center">1,360</td>
                <td className="product-table-td-center">234</td>
                <td className="product-table-td-center">17.2%</td>
                <td className="product-table-td-center">1,326</td>
                <td className="product-table-td-center">230</td>
                <td className="product-table-td-center">17.4%</td>
              </tr>
              <tr>
                <td className="product-table-td-center">3년</td>
                <td className="product-table-td-center">4,082</td>
                <td className="product-table-td-center">1,336</td>
                <td className="product-table-td-center">32.7%</td>
                <td className="product-table-td-center">3,978</td>
                <td className="product-table-td-center">1,304</td>
                <td className="product-table-td-center">32.8%</td>
              </tr>
              <tr>
                <td className="product-table-td-center">5년</td>
                <td className="product-table-td-center">6,804</td>
                <td className="product-table-td-center">2,506</td>
                <td className="product-table-td-center">36.8%</td>
                <td className="product-table-td-center">6,630</td>
                <td className="product-table-td-center">2,444</td>
                <td className="product-table-td-center">36.9%</td>
              </tr>
              <tr>
                <td className="product-table-td-center">7년</td>
                <td className="product-table-td-center">9,525</td>
                <td className="product-table-td-center">3,748</td>
                <td className="product-table-td-center">39.3%</td>
                <td className="product-table-td-center">9,282</td>
                <td className="product-table-td-center">3,655</td>
                <td className="product-table-td-center">39.4%</td>
              </tr>
              <tr>
                <td className="product-table-td-center">10년</td>
                <td className="product-table-td-center">13,608</td>
                <td className="product-table-td-center">5,631</td>
                <td className="product-table-td-center">41.4%</td>
                <td className="product-table-td-center">13,260</td>
                <td className="product-table-td-center">5,492</td>
                <td className="product-table-td-center">41.4%</td>
              </tr>
              <tr className="bg-red-50">
                <td className="product-table-td-center">10년 1일</td>
                <td className="product-table-td-center">13,608</td>
                <td className="product-table-td-center">16,434</td>
                <td className="product-table-td-center">120.8%</td>
                <td className="product-table-td-center">13,260</td>
                <td className="product-table-td-center">16,023</td>
                <td className="product-table-td-center">120.8%</td>
              </tr>
              <tr>
                <td className="product-table-td-center">15년</td>
                <td className="product-table-td-center">13,608</td>
                <td className="product-table-td-center">17,097</td>
                <td className="product-table-td-center">125.6%</td>
                <td className="product-table-td-center">13,260</td>
                <td className="product-table-td-center">16,671</td>
                <td className="product-table-td-center">125.7%</td>
              </tr>
              <tr>
                <td className="product-table-td-center">20년</td>
                <td className="product-table-td-center">13,608</td>
                <td className="product-table-td-center">17,775</td>
                <td className="product-table-td-center">130.6%</td>
                <td className="product-table-td-center">13,260</td>
                <td className="product-table-td-center">17,345</td>
                <td className="product-table-td-center">130.8%</td>
              </tr>
              <tr>
                <td className="product-table-td-center">40년</td>
                <td className="product-table-td-center">13,608</td>
                <td className="product-table-td-center">20,595</td>
                <td className="product-table-td-center">151.3%</td>
                <td className="product-table-td-center">13,260</td>
                <td className="product-table-td-center">20,276</td>
                <td className="product-table-td-center">152.9%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="product-text mt-4 space-y-1">
          <p className="text-status-red">
            • 이 보험상품은 달러상품이므로 원-달러 환율변동에 의해 원화기준으로 환산 시 보험료,
            보험금 및 해약환급금 등에 손실이 발생할 수 있으며, 그 손실은 계약자에게 귀속됩니다.
          </p>
          <p>
            • [10년 1일]의 해약환급금은 계약일로부터 10년이 경과하고 최초로 도래하는 계약해당일의
            계약자적립액에 유지보너스금액을 더하여 산출한 금액입니다.
          </p>
          <p>
            • 해약환급금은 이미 납입한 보험료보다 적거나 없을 수 있으며 기타보험료 및 해약환급금
            산출 관련사항은 상품요약서(당사 홈페이지 상품공시실 참조) 및 상품설명서에서 보다 자세히
            확인하실 수 있습니다.
          </p>
          <p>• 상기 해약환급금은 세전기준입니다.</p>
        </div>
      </div>

      <div className="product-caption mt-6 space-y-1">
        <p>
          ※ 이 상품의 보험기간은 종신이며, 납입기간은 저해약환급금형Ⅰ은 5년납, 저해약환급금형Ⅱ은
          7년납, 10년납, 15년납, 20년납이 있습니다.
        </p>
        <p>
          ※ 이 보험계약을 중도해지할 경우 해약환급금은 납입한 보험료에서 경과한 기간의 위험보험료,
          사업비(해약공제액포함)등이 차감되므로 납입 보험료보다 적거나 없을 수도 있습니다.
        </p>
        <p>
          ※ N년+1일의 해약환급금은 N년이 경과하고 최초로 도래하는 계약해당일의 계약자적립액에
          유지보너스 금액을 더하여 산출한 금액입니다.
        </p>
        <p>
          ※ 이 계약은 금리확정형 상품으로, 보험료 및 계약자적립액 산출 시 적용한 이율은 연복리
          10년이내3.25%, 10년초과 1.00%입니다.
        </p>
        <p>
          ※ 저해약환급금형은 보험료 납입기간 중 계약이 해지될 경우 일반형의 해약환급금 대비 적은
          해약환급금을 지급하는 대신 일반형보다 낮은 보험료로 동일한 보장을 받을 수 있도록 한
          상품입니다.
        </p>
        <p>
          ※ 저해약환급금형의 계약이 보험료 납입기간 중 해지될 경우 해약환급금은 일반형 해약환급금의
          50%에 해당하는 금액으로 합니다.
        </p>
        <p>
          ※ 다만, 보험료 납입기간이 완료된 이후에 유지보너스가 지급되면 일반저해약환급금형과
          유해약환급금형의 해약환급금 상이할 수 있습니다.
        </p>
        <p>
          ※ 상품안내장을 통해 유해약환급금형의 일반보험상품과 해약환급금을 비교 안내하고 있으므로
          가입 전 필히 확인하시기 바랍니다.
        </p>
        <p>
          ※ 유해약환급금형은 해약환급금을 계산할 때 기준이 되는 보험으로서 실제로 판매되지 않습니다.
        </p>
        <p className="product-text-primary">※ 외화보험은 환테크를 위한 금융상품이 아닙니다.</p>
        <p className="product-text-primary">
          ※ 외화보험의 경우 예시된 해약환급률은 달러 기준이며, 원화 환산 시 달러 기준 해약환급률
          보다 낮을 수 있습니다.
        </p>
        <p className="product-text-primary">
          ※ 외화보험은 보험료 납입, 보험금 수령 과정에서 환전 수수료 등 거래비용이 발생할 수
          있습니다.
        </p>
        <p className="product-text-primary">
          ※ 외화보험은 원-달러 환율변동에 의해 원화 기준으로 환산 시 보험료, 보험금 및 해약환급금
          등에 손실이 발생할 수 있으며 그 손실은 계약자에게 귀속됩니다.
        </p>
      </div>
    </div>
  );
}
