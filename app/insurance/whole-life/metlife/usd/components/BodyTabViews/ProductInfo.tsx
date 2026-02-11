import React from 'react'

export default function ProductInfo() {
  return (
    <div className="space-y-6 sm:space-y-8 px-2 sm:px-4 md:px-8 py-4 md:py-6">
      {/* 가입안내 제목 */}
      <h2 className="product-page-title">가입안내</h2>

      {/* 기본 가입정보 */}
      <div className="space-y-4">
        <div className="overflow-x-auto">
          <table className="product-table">
            <tbody className="product-table-body">
              <tr>
                <td className="product-table-th bg-product-primary text-white font-semibold">보험기간</td>
                <td className="product-table-td-center">종신</td>
                <td className="product-table-th bg-product-primary text-white font-semibold">납입주기</td>
                <td className="product-table-td-center">월납</td>
              </tr>
              <tr>
                <td className="product-table-th bg-product-primary text-white font-semibold">납입기간</td>
                <td className="product-table-td-center" colSpan={3}>5년납 / 7년납 / 10년납 / 15년납 / 20년납</td>
              </tr>
              <tr>
                <td className="product-table-th bg-product-primary text-white font-semibold">가입한도</td>
                <td className="product-table-td-center" colSpan={3}>5천달러~ 500만달러</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 가입연령 */}
      <div className="space-y-4">
        <div className="overflow-x-auto">
          <table className="product-table">
            <thead>
              <tr className="product-table-header">
                <th className="product-table-th" rowSpan={2} colSpan={3}>유형</th>
                <th className="product-table-th" colSpan={2}>남자</th>
                <th className="product-table-th" colSpan={2}>여자</th>
              </tr>
              <tr className="product-table-header">
                <th className="product-table-th">최소</th>
                <th className="product-table-th">최대</th>
                <th className="product-table-th">최소</th>
                <th className="product-table-th">최대</th>
              </tr>
            </thead>
            <tbody className="product-table-body">
              <tr>
                <td className="product-table-td-center font-semibold bg-product-primary text-white" rowSpan={5}>가입<br className="sm:hidden"/>연령</td>
                <td className="product-table-td-center">저해약환급<br className="sm:hidden"/>금형Ⅰ</td>
                <td className="product-table-td-center">5년납</td>
                <td className="product-table-td-center">만15세</td>
                <td className="product-table-td-center">70세</td>
                <td className="product-table-td-center">만15세</td>
                <td className="product-table-td-center">70세</td>
              </tr>
              <tr>
                <td className="product-table-td-center" rowSpan={4}>저해약환급<br className="sm:hidden"/>금형Ⅱ</td>
                <td className="product-table-td-center">7년납</td>
                <td className="product-table-td-center">만15세</td>
                <td className="product-table-td-center">70세</td>
                <td className="product-table-td-center">만15세</td>
                <td className="product-table-td-center">70세</td>
              </tr>
              <tr>
                <td className="product-table-td-center">10년납</td>
                <td className="product-table-td-center">만15세</td>
                <td className="product-table-td-center">70세</td>
                <td className="product-table-td-center">만15세</td>
                <td className="product-table-td-center">70세</td>
              </tr>
              <tr>
                <td className="product-table-td-center">15년납</td>
                <td className="product-table-td-center">만15세</td>
                <td className="product-table-td-center">65세</td>
                <td className="product-table-td-center">만15세</td>
                <td className="product-table-td-center">65세</td>
              </tr>
              <tr>
                <td className="product-table-td-center">20년납</td>
                <td className="product-table-td-center">만15세</td>
                <td className="product-table-td-center">60세</td>
                <td className="product-table-td-center">만15세</td>
                <td className="product-table-td-center">60세</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="product-caption">* 가입나이 및 가입한도 등의 계약인수 관련 사항은 회사가 정한 기준에 따라 제한될 수 있습니다.</p>
      </div>

      {/* 주계약 보험료 예시 - 저해약환급금형Ⅰ */}
      <h2 className="product-page-title">주계약 보험료 예시</h2>
      <div className="space-y-4">
        
        <h4 className="product-small-title">- 저해약환급금형Ⅰ</h4>
        <p className="product-caption text-right">예시기준 : 주계약 가입금액 1만달러, 5년납, 월납, 단위 : 달러</p>
        <div className="overflow-x-auto">
          <table className="product-table">
            <thead>
              <tr className="product-table-header">
                <th className="product-table-th font-semibold">가입나이</th>
                <th className="product-table-th font-semibold">남자</th>
                <th className="product-table-th font-semibold">여자</th>
              </tr>
            </thead>
            <tbody className="product-table-body">
              <tr>
                <td className="product-table-td-center">30세</td>
                <td className="product-table-td-center">200.1</td>
                <td className="product-table-td-center">195.0</td>
              </tr>
              <tr>
                <td className="product-table-td-center">40세</td>
                <td className="product-table-td-center">214.3</td>
                <td className="product-table-td-center">208.8</td>
              </tr>
              <tr>
                <td className="product-table-td-center">50세</td>
                <td className="product-table-td-center">230.3</td>
                <td className="product-table-td-center">224.0</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="product-caption">* 보험료는 가입나이, 성별, 납입기간 등에 따라 달라질 수 있습니다.</p>

        {/* 저해약환급금형Ⅱ */}
        <h4 className="product-small-title mt-6">- 저해약환급금형Ⅱ</h4>
        <p className="product-caption text-right">예시기준 : 주계약 가입금액 1만달러, 10년납, 월납, 단위 : 달러</p>
        <div className="overflow-x-auto">
          <table className="product-table">
            <thead>
              <tr className="product-table-header">
                <th className="product-table-th font-semibold">가입나이</th>
                <th className="product-table-th font-semibold">남자</th>
                <th className="product-table-th font-semibold">여자</th>
              </tr>
            </thead>
            <tbody className="product-table-body">
              <tr>
                <td className="product-table-td-center">30세</td>
                <td className="product-table-td-center">105.8</td>
                <td className="product-table-td-center">103.1</td>
              </tr>
              <tr>
                <td className="product-table-td-center">40세</td>
                <td className="product-table-td-center">113.4</td>
                <td className="product-table-td-center">110.5</td>
              </tr>
              <tr>
                <td className="product-table-td-center">50세</td>
                <td className="product-table-td-center">122.1</td>
                <td className="product-table-td-center">118.7</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="product-caption">* 보험료는 가입나이, 성별, 납입기간 등에 따라 달라질 수 있습니다.</p>
      </div>

      {/* 유지보너스 */}
      <h2 className="product-page-title">유지보너스</h2>
      <div className="space-y-4">
        <p className="product-text">보험료 납입이 완료되고 유지보너스 발생일에 유효한 계약에 한하여 다음과 같이 계산한 유지보너스를 계약자적립액에 가산합니다.</p>
        
        <div className="product-info-box">
          <p className="font-semibold">* 유지보너스금액 : 주계약 기본보험료 × 12 × 보험료 납입기간(년수) × 유지보너스 지급률</p>
        </div>

        {/* 유지보너스 발생일 - 저해약환급금형Ⅰ */}
        <h4 className="product-small-title mt-4 text-[#8B9A2B]">* 유지보너스 발생일</h4>
        <p className="product-text font-semibold">- 저해약환급금형Ⅰ</p>
        <div className="overflow-x-auto">
          <table className="product-table">
            <thead>
              <tr className="product-table-header">
                <th className="product-table-th">보험료 납입기간</th>
                <th className="product-table-th">유지보너스 발생일</th>
              </tr>
            </thead>
            <tbody className="product-table-body">
              <tr>
                <td className="product-table-td-center">5년납</td>
                <td className="product-table-td-center">계약일로부터 5년 경과시점 월계약해당일,<br/>계약일로부터 10년 경과시점 월계약해당일</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 유지보너스 발생일 - 저해약환급금형Ⅱ */}
        <p className="product-text font-semibold mt-4">- 저해약환급금형Ⅱ</p>
        <div className="overflow-x-auto">
          <table className="product-table">
            <thead>
              <tr className="product-table-header">
                <th className="product-table-th">보험료 납입기간</th>
                <th className="product-table-th">유지보너스 발생일</th>
              </tr>
            </thead>
            <tbody className="product-table-body">
              <tr>
                <td className="product-table-td-center">7년납</td>
                <td className="product-table-td-center">계약일로부터 7년 경과시점 월계약해당일,<br/>계약일로부터 10년 경과시점 월계약해당일</td>
              </tr>
              <tr>
                <td className="product-table-td-center">10년납</td>
                <td className="product-table-td-center">계약일로부터 10년 경과시점 월계약해당일</td>
              </tr>
              <tr>
                <td className="product-table-td-center">15년납</td>
                <td className="product-table-td-center">계약일로부터 15년 경과시점 월계약해당일</td>
              </tr>
              <tr>
                <td className="product-table-td-center">20년납</td>
                <td className="product-table-td-center">계약일로부터 20년 경과시점 월계약해당일</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 유지보너스 지급률 - 저해약환급금형Ⅰ */}
        <h4 className="product-small-title mt-4 text-[#8B9A2B]">* 유지보너스 지급률</h4>
        <p className="product-text font-semibold">- 저해약환급금형Ⅰ</p>
        <div className="overflow-x-auto">
          <table className="product-table">
            <thead>
              <tr className="product-table-header">
                <th className="product-table-th">보험료 납입기간</th>
                <th className="product-table-th">유지보너스 지급률</th>
              </tr>
            </thead>
            <tbody className="product-table-body">
              <tr>
                <td className="product-table-td-center">5년납</td>
                <td className="product-table-td-center">5년경과 22.5% / 10년경과 10.8%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 유지보너스 지급률 - 저해약환급금형Ⅱ */}
        <p className="product-text font-semibold mt-4">- 저해약환급금형Ⅱ</p>
        <div className="overflow-x-auto">
          <table className="product-table">
            <thead>
              <tr className="product-table-header">
                <th className="product-table-th">보험료 납입기간</th>
                <th className="product-table-th">유지보너스 지급률</th>
              </tr>
            </thead>
            <tbody className="product-table-body">
              <tr>
                <td className="product-table-td-center">7년납</td>
                <td className="product-table-td-center">7년경과 21.0% / 10년경과 15.8%</td>
              </tr>
              <tr>
                <td className="product-table-td-center">10년납</td>
                <td className="product-table-td-center">10년경과 38.0%</td>
              </tr>
              <tr>
                <td className="product-table-td-center">15년납</td>
                <td className="product-table-td-center">15년경과 38.0%</td>
              </tr>
              <tr>
                <td className="product-table-td-center">20년납</td>
                <td className="product-table-td-center">20년경과 38.0%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="product-info-box">
          <p>• 납입기간 내 중도 해지시 지급하는 해약환급금에는 유지보너스가 가산되지 않습니다.</p>
        </div>
      </div>
    </div>
  )
}
