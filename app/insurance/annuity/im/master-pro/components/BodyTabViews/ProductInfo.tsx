import React from 'react'

export default function ProductInfo() {
  return (
    <div className="space-y-8 px-2 sm:px-4 md:px-8 py-4 md:py-6">
      <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">가입안내</h2>

      {/* 보험종류 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">보험종류</h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-sm">iM 마스터PRO변액연금보험 무배당 2606</p>
        </div>
      </div>

      {/* 보험기간, 보험료 납입기간, 보험료 납입주기, 가입나이, 연금지급개시나이, 연금지급형태 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">보험기간, 보험료 납입기간, 보험료 납입주기, 가입나이, 연금지급개시나이, 연금지급형태</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs md:text-sm min-w-[240px]">
            <colgroup>
              <col className="w-[30%]" />
              <col className="w-[70%]" />
            </colgroup>
            <thead>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-gray-300 p-2 text-center text-xs md:text-sm">구분</th>
                <th className="border border-gray-300 p-2 text-center text-xs md:text-sm">내용</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm">연금지급형태</td>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm">평생연금</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm">연금지급개시나이(A)</td>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm">51세 ~ 80세</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm" rowSpan={2}>보험기간</td>
                <td className="border border-gray-300 p-2 text-xs md:text-sm"><span className="font-semibold">연금개시전 보험기간:</span> 보험계약일부터 연금지급개시나이 계약해당일 전일까지</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-xs md:text-sm"><span className="font-semibold">연금개시후 보험기간:</span> 연금지급개시나이 계약해당일부터 종신까지</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm">보험료 납입기간</td>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm">5, 7, 10, 12, 15, 20년납</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm">가입나이</td>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm">31세~(A–20)세<br />(단, (A-20)가 50이상인 경우, 50세)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm">보험료 납입주기</td>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm">월납</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>


      {/* 보험료 납입한도 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">보험료 납입한도</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
          <div>
            <div className="font-bold text-[#1e3a8a] mb-2">가. 기본보험료</div>
            <p className="text-sm mb-2">계약시점에 보험료 납입기간 중 매월 계속 납입하기로 한 월납보험료를 말하며, 납입금액은 1구좌 기준으로 100만원 이하 만원단위 금액으로 합니다.</p>
            <p className="text-sm">최소보험료는 월납보험료 20만원(다만, 납입기간이 5년, 7년인 경우 30만원)으로 합니다.</p>
          </div>
          <div>
            <div className="font-bold text-[#1e3a8a] mb-2">나. 추가납입보험료</div>
            <p className="text-sm mb-2">계약일 이후 1개월이 지난 후부터 보험료 납입기간 중 수시로 납입할 수 있는 보험료를 말하며, 납입 가능한 추가납입보험료의 한도는 기본보험료 총액의 200% 이내로 합니다.</p>
            <p className="text-sm mb-2">계약자적립액의 인출이 있는 경우에는 인출금액만큼 추가로 보험료 납입이 가능하며, 매회 납입할 때 최저한도는 1만원 이상 만원단위 금액으로 하며, 1회 납입할 수 있는 추가납입보험료의 한도는 다음과 같습니다.</p>
            <p className="text-sm mb-2">다만, 기본보험료 납입완료시점 이후에는 더 이상 추가납입보험료를 납입할 수 없습니다.</p>
            <div className="bg-white p-3 rounded border border-gray-300">
              <p className="text-sm font-medium mb-1">→ (월납 기본보험료 × 가입후 경과월수 + 선납보험료) × 200% - 이미 납입한 추가납입보험료 합계액 + 계약자적립액 인출금액의 합계액</p>
              <p className="text-xs text-gray-600">(다만, 경과월수는 가입할 때를 1개월로 하며, 보험료납입기간을 최고한도로 합니다)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
