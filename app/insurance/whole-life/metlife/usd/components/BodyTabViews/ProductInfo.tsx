import React from 'react'

export default function ProductInfo() {
  return (
    <div className="space-y-6 sm:space-y-8 px-2 sm:px-4 md:px-8 py-4 md:py-6">
      {/* 가입안내 제목 */}
      <h2 className="text-[#1e3a8a] text-xl sm:text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">가입안내</h2>

      {/* 기본 가입정보 */}
      <div className="space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2 md:p-3 bg-gray-100 font-semibold text-center text-[10px] sm:text-xs md:text-sm">보험기간</td>
                <td className="border border-gray-300 p-1 sm:p-2 md:p-3 text-center text-[10px] sm:text-xs md:text-sm">종신</td>
                <td className="border border-gray-300 p-1 sm:p-2 md:p-3 bg-gray-100 font-semibold text-center text-[10px] sm:text-xs md:text-sm">납입주기</td>
                <td className="border border-gray-300 p-1 sm:p-2 md:p-3 text-center text-[10px] sm:text-xs md:text-sm">월납</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2 md:p-3 bg-gray-100 font-semibold text-center text-[10px] sm:text-xs md:text-sm">납입기간</td>
                <td className="border border-gray-300 p-1 sm:p-2 md:p-3 text-center text-[10px] sm:text-xs md:text-sm" colSpan={3}>5년납 / 7년납 / 10년납 / 15년납 / 20년납</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2 md:p-3 bg-gray-100 font-semibold text-center text-[10px] sm:text-xs md:text-sm">가입한도</td>
                <td className="border border-gray-300 p-1 sm:p-2 md:p-3 text-center text-[10px] sm:text-xs md:text-sm" colSpan={3}>5천달러~ 500만달러</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 가입연령 */}
      <div className="space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[10px] sm:text-xs md:text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-1 sm:p-2" rowSpan={2} colSpan={3}>유형</th>
                <th className="border border-gray-300 p-1 sm:p-2" colSpan={2}>남자</th>
                <th className="border border-gray-300 p-1 sm:p-2" colSpan={2}>여자</th>
              </tr>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-1 sm:p-2">최소</th>
                <th className="border border-gray-300 p-1 sm:p-2">최대</th>
                <th className="border border-gray-300 p-1 sm:p-2">최소</th>
                <th className="border border-gray-300 p-1 sm:p-2">최대</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2 text-center font-semibold bg-gray-50" rowSpan={5}>가입<br className="sm:hidden"/>연령</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">저해약환급<br className="sm:hidden"/>금형Ⅰ</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">5년납</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">만15세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">70세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">만15세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">70세</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2 text-center" rowSpan={4}>저해약환급<br className="sm:hidden"/>금형Ⅱ</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">7년납</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">만15세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">70세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">만15세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">70세</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">10년납</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">만15세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">70세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">만15세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">70세</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">15년납</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">만15세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">65세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">만15세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">65세</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">20년납</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">만15세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">60세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">만15세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">60세</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-600">* 가입나이 및 가입한도 등의 계약인수 관련 사항은 회사가 정한 기준에 따라 제한될 수 있습니다.</p>
      </div>

      {/* 주계약 보험료 예시 - 저해약환급금형Ⅰ */}
      <h2 className="text-[#1e3a8a] text-xl sm:text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">주계약 보험료 예시</h2>
      <div className="space-y-4">
        
        <h4 className="text-base font-semibold">- 저해약환급금형Ⅰ</h4>
        <p className="text-xs text-gray-600 text-right">예시기준 : 주계약 가입금액 1만달러, 5년납, 월납, 단위 : 달러</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[10px] sm:text-xs md:text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-1 sm:p-2 text-center font-semibold">가입나이</th>
                <th className="border border-gray-300 p-1 sm:p-2 text-center font-semibold">남자</th>
                <th className="border border-gray-300 p-1 sm:p-2 text-center font-semibold">여자</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">30세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">200.1</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">195.0</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">40세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">214.3</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">208.8</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">50세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">230.3</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">224.0</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[10px] sm:text-xs text-gray-600">* 보험료는 가입나이, 성별, 납입기간 등에 따라 달라질 수 있습니다.</p>

        {/* 저해약환급금형Ⅱ */}
        <h4 className="text-sm sm:text-base font-semibold mt-6">- 저해약환급금형Ⅱ</h4>
        <p className="text-[10px] sm:text-xs text-gray-600 text-right">예시기준 : 주계약 가입금액 1만달러, 10년납, 월납, 단위 : 달러</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[10px] sm:text-xs md:text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-1 sm:p-2 text-center font-semibold">가입나이</th>
                <th className="border border-gray-300 p-1 sm:p-2 text-center font-semibold">남자</th>
                <th className="border border-gray-300 p-1 sm:p-2 text-center font-semibold">여자</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">30세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">105.8</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">103.1</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">40세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">113.4</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">110.5</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center">50세</td>
                <td className="border border-gray-300 p-2 text-center">122.1</td>
                <td className="border border-gray-300 p-2 text-center">118.7</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-600">* 보험료는 가입나이, 성별, 납입기간 등에 따라 달라질 수 있습니다.</p>
      </div>

      {/* 유지보너스 */}
      <h2 className="text-[#1e3a8a] text-xl sm:text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">유지보너스</h2>
      <div className="space-y-4">
        <p className="text-xs sm:text-sm md:text-base">보험료 납입이 완료되고 유지보너스 발생일에 유효한 계약에 한하여 다음과 같이 계산한 유지보너스를 계약자적립액에 가산합니다.</p>
        
        <div className="bg-blue-50 p-3 sm:p-4 rounded-lg space-y-2 text-xs sm:text-sm">
          <p className="font-semibold">* 유지보너스금액 : 주계약 기본보험료 × 12 × 보험료 납입기간(년수) × 유지보너스 지급률</p>
        </div>

        {/* 유지보너스 발생일 - 저해약환급금형Ⅰ */}
        <h4 className="text-base font-semibold mt-4 text-[#8B9A2B]">* 유지보너스 발생일</h4>
        <p className="text-sm font-semibold">- 저해약환급금형Ⅰ</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-gray-300 p-2 text-center">보험료 납입기간</th>
                <th className="border border-gray-300 p-2 text-center">유지보너스 발생일</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 text-center">5년납</td>
                <td className="border border-gray-300 p-2 text-center">계약일로부터 5년 경과시점 월계약해당일,<br/>계약일로부터 10년 경과시점 월계약해당일</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 유지보너스 발생일 - 저해약환급금형Ⅱ */}
        <p className="text-sm font-semibold mt-4">- 저해약환급금형Ⅱ</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-gray-300 p-2 text-center">보험료 납입기간</th>
                <th className="border border-gray-300 p-2 text-center">유지보너스 발생일</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 text-center">7년납</td>
                <td className="border border-gray-300 p-2 text-center">계약일로부터 7년 경과시점 월계약해당일,<br/>계약일로부터 10년 경과시점 월계약해당일</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center">10년납</td>
                <td className="border border-gray-300 p-2 text-center">계약일로부터 10년 경과시점 월계약해당일</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center">15년납</td>
                <td className="border border-gray-300 p-2 text-center">계약일로부터 15년 경과시점 월계약해당일</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center">20년납</td>
                <td className="border border-gray-300 p-2 text-center">계약일로부터 20년 경과시점 월계약해당일</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 유지보너스 지급률 - 저해약환급금형Ⅰ */}
        <h4 className="text-base font-semibold mt-4 text-[#8B9A2B]">* 유지보너스 지급률</h4>
        <p className="text-sm font-semibold">- 저해약환급금형Ⅰ</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-gray-300 p-2 text-center">보험료 납입기간</th>
                <th className="border border-gray-300 p-2 text-center">유지보너스 지급률</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 text-center">5년납</td>
                <td className="border border-gray-300 p-2 text-center">5년경과 22.5% / 10년경과 10.8%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 유지보너스 지급률 - 저해약환급금형Ⅱ */}
        <p className="text-sm font-semibold mt-4">- 저해약환급금형Ⅱ</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-gray-300 p-2 text-center">보험료 납입기간</th>
                <th className="border border-gray-300 p-2 text-center">유지보너스 지급률</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 text-center">7년납</td>
                <td className="border border-gray-300 p-2 text-center">7년경과 21.0% / 10년경과 15.8%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center">10년납</td>
                <td className="border border-gray-300 p-2 text-center">10년경과 38.0%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center">15년납</td>
                <td className="border border-gray-300 p-2 text-center">15년경과 38.0%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center">20년납</td>
                <td className="border border-gray-300 p-2 text-center">20년경과 38.0%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg space-y-2 text-sm">
          <p>• 납입기간 내 중도 해지시 지급하는 해약환급금에는 유지보너스가 가산되지 않습니다.</p>
        </div>
      </div>
    </div>
  )
}
