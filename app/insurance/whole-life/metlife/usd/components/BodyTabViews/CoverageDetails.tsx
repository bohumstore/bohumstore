import React from 'react'

export default function CoverageDetails() {
  return (
  <div className="space-y-6 sm:space-y-8 px-2 sm:px-4 md:px-8 py-4 md:py-6">
    {/* 보장내용 */}
    <h2 className="text-[#1e3a8a] text-xl sm:text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">보장내용</h2>
    
    <div className="space-y-4">
      {/* 보장내용표 */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[10px] sm:text-xs md:text-sm">
          <tbody>
            <tr>
              <td className="border border-gray-300 p-1 sm:p-2 bg-gray-100 text-center font-semibold">보장내용</td>
              <td className="border border-gray-300 p-1 sm:p-2" colSpan={3}>사망보험금</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-1 sm:p-2 bg-gray-100 text-center font-semibold">지급사유</td>
              <td className="border border-gray-300 p-1 sm:p-2" colSpan={3}>피보험자가 보험기간 중 사망하였을 경우</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-1 sm:p-2 bg-gray-100 text-center font-semibold">지급기준</td>
              <td className="border border-gray-300 p-1 sm:p-2 bg-gray-100 text-center font-semibold" colSpan={3}>지급금액</td>
            </tr>
            {/* 일반심사형 - 5년납 */}
            <tr>
              <td className="border border-gray-300 p-1 sm:p-2 text-center font-semibold bg-gray-50" rowSpan={9}>일반<br className="sm:hidden"/>심사형</td>
              <td className="border border-gray-300 p-1 sm:p-2 text-center font-semibold" rowSpan={3}>5년납</td>
              <td className="border border-gray-300 p-1 sm:p-2 text-center">계약일 ~ 계약일로부터 1년 경과시점 계약해당일의 전일</td>
              <td className="border border-gray-300 p-1 sm:p-2 text-center">보험가입금액의 105%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-1 sm:p-2 text-center">계약일로부터 1년 경과시점 계약해당일 ~ 계약일로부터 10년 경과시점 계약해당일의 전일</td>
              <td className="border border-gray-300 p-1 sm:p-2 text-center">보험가입금액의 105% + 계약일로부터 1년 경과시점 계약해당일부터 매년 계약해당일에 보험가입금액의 5%씩 체증한 금액</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-1 sm:p-2 text-center">계약일로부터 10년 경과시점 계약해당일 ~ 종신까지</td>
              <td className="border border-gray-300 p-1 sm:p-2 text-center">보험가입금액의 150%</td>
            </tr>
            {/* 일반심사형 - 7년납 */}
            <tr>
              <td className="border border-gray-300 p-1 sm:p-2 text-center font-semibold" rowSpan={3}>7년납</td>
              <td className="border border-gray-300 p-1 sm:p-2 text-center">계약일 ~ 계약일로부터 2년 경과시점 계약해당일의 전일</td>
              <td className="border border-gray-300 p-1 sm:p-2 text-center">보험가입금액의 100%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-1 sm:p-2 text-center">계약일로부터 2년 경과시점 계약해당일 ~ 계약일로부터 12년 경과시점 계약해당일의 전일</td>
              <td className="border border-gray-300 p-1 sm:p-2 text-center">보험가입금액의 100% + 계약일로부터 2년 경과시점 계약해당일부터 매년 계약해당일에 보험가입금액의 5%씩 체증한 금액</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-1 sm:p-2 text-center">계약일로부터 12년 경과시점 계약해당일 ~ 종신까지</td>
              <td className="border border-gray-300 p-1 sm:p-2 text-center">보험가입금액의 150%</td>
            </tr>
            {/* 일반심사형 - 10/15/20년납 */}
            <tr>
              <td className="border border-gray-300 p-1 sm:p-2 text-center font-semibold" rowSpan={3}>10/15/<br/>20년납</td>
              <td className="border border-gray-300 p-1 sm:p-2 text-center">계약일 ~ 계약일로부터 5년 경과시점 계약해당일의 전일</td>
              <td className="border border-gray-300 p-1 sm:p-2 text-center">보험가입금액의 100%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-1 sm:p-2 text-center">계약일로부터 5년 경과시점 계약해당일 ~ 계약일로부터 15년 경과시점 계약해당일의 전일</td>
              <td className="border border-gray-300 p-1 sm:p-2 text-center">보험가입금액의 100% + 계약일로부터 5년 경과시점 계약해당일부터 매년 계약해당일에 보험가입금액의 5%씩 체증한 금액</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-1 sm:p-2 text-center">계약일로부터 15년 경과시점 계약해당일 ~ 종신까지</td>
              <td className="border border-gray-300 p-1 sm:p-2 text-center">보험가입금액의 150%</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 주의사항 */}
      <div className="space-y-2 text-xs sm:text-sm text-gray-700">
        <p>• 보험료 납입기간 중 피보험자가 약관 별표4(장해분류표) 중 동일한 재해 또는 재해 이외의 동일한 원인으로 여러 신체부위의 장해지급률을 더하여 50% 이상인 장해상태가 되었을 때에는 차회 이후의 기본보험료 납입을 면제하여 드립니다.</p>
        <p>• 최초로 도래하는 유지보너스 발생일 이전에 피보험자에게 사망보험금의 지급사유가 발생한 경우에는 다음 중 가장 큰 금액을 지급합니다.</p>
        <p className="ml-4">· 사망보험금</p>
        <p className="ml-4">· 이미 납입한 보험료</p>
        <p className="ml-4">· 해약환급금</p>
        <p>• 최초로 도래하는 유지보너스 발생일 이후에 피보험자에게 사망보험금의 지급사유가 발생한 경우에는 다음 중 가장 큰 금액을 지급합니다.</p>
        <p className="ml-4">· 사망보험금과 이미 납입한 보험료 중 큰 금액에 유지보너스 발생후 적립액을 더한 금액</p>
        <p className="ml-4">· 해약환급금</p>
        <p>• 사망보험금의 지급 사유가 발생했을 때 원화고정납입용 추가보험료에 의한 적립액이 있는 경우, 사망보험금에 원화고정납입용 추가보험료에 의한 적립액을 가산하여 지급합니다.</p>
        <p className="text-red-500">• 고의적 사고 및 2년 이내 자살의 경우 사망보험금 지급이 제한됩니다.</p>
      </div>
    </div>
  </div>
  )
}
