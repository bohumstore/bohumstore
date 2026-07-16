import React from 'react'

export default function ProductInfo() {
  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-8 py-3 md:py-4">
      {/* 보험종류 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">보험종류</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-2 text-sm">
            <div>• 하나생명 (무)하나뿐인 변액연금보험 – 적립형</div>
          </div>
        </div>
      </div>

      {/* 연금개시나이, 보험기간, 가입나이 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">연금개시나이, 보험기간 및 가입나이</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2">구분</th>
                    <th className="border border-gray-300 p-2">내용</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 font-semibold text-center">연금개시나이(Y)</td>
                    <td className="border border-gray-300 p-2 text-center">30세 ~ 85세</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-semibold text-center" rowSpan={2}>보험기간</td>
                    <td className="border border-gray-300 p-2">
                      <strong>연금개시전:</strong> 보험계약일부터 연금개시나이(Y) 계약해당일 전일까지
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">
                      <strong>연금개시후:</strong> 연금개시나이(Y) 계약해당일부터 종신까지
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-semibold text-center">가입나이</td>
                    <td className="border border-gray-300 p-2 text-center">0세 ~ (Y-M-최소거치기간)세<br />(최대 68세)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 보험료 납입기간 및 보험료 납입주기 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">보험료 납입기간 및 보험료 납입주기</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2">보험료 납입기간(M)</th>
                    <th className="border border-gray-300 p-2">보험료 납입주기</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center">5년납/7년납/10년납/12년납 이상</td>
                    <td className="border border-gray-300 p-2 text-center">월납</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 보험료 납입한도 - 기본보험료 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">보험료 납입한도 - 기본보험료</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <div>
              <div className="text-sm mb-3">보험계약을 체결할 때 또는 보험계약을 변경할 때 보험료 납입기간 중 매월 납입하기로 한 보험료를 말합니다.</div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 p-2">구분</th>
                      <th className="border border-gray-300 p-2">기본보험료</th>
                      <th className="border border-gray-300 p-2">최소거치기간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2 font-semibold text-center">5년납</td>
                      <td className="border border-gray-300 p-2 text-center">30만원 이상</td>
                      <td className="border border-gray-300 p-2 text-center">15년</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 font-semibold text-center">7년납</td>
                      <td className="border border-gray-300 p-2 text-center">30만원 이상</td>
                      <td className="border border-gray-300 p-2 text-center">13년</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 font-semibold text-center">10년납</td>
                      <td className="border border-gray-300 p-2 text-center">20만원 이상</td>
                      <td className="border border-gray-300 p-2 text-center">10년</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 font-semibold text-center">12년납 이상</td>
                      <td className="border border-gray-300 p-2 text-center">20만원 이상</td>
                      <td className="border border-gray-300 p-2 text-center">5년</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="text-sm text-gray-700 mt-2">※ 1구좌 기준 : 최저 20만원 이상 1,000만원 이하</div>
            </div>
          </div>
        </div>
      </div>

      {/* 보험료 납입한도 - 추가납입보험료 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">보험료 납입한도 - 추가납입보험료</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <div>
              <div className="text-sm mb-3">연금개시전 보험기간 중 기본보험료 납입주기와 달리 수시로 납입할 수 있는 보험료를 말하며, 납입기간 중에는 해당월의 기본보험료가 납입된 경우에 한하여 추가납입보험료를 납입할 수 있습니다.</div>
              <div className="p-3 rounded border border-gray-300 text-sm">
                <strong>1회 납입 가능한 추가납입보험료 납입한도</strong><br />
                = 해당월까지 납입한 기본보험료 총액(선납포함)의 200% - 이미 납입한 추가납입보험료의 합계 + 계약자적립액의 인출금액(자동인출금액 포함)의 합계
              </div>
              <div className="text-sm text-gray-700 mt-2">※ 계약자적립액의 인출금액(자동인출금액 포함)은 기본보험료에 의한 계약자적립액 인출금액과 추가납입보험료에 의한 계약자적립액의 인출금액을 포함</div>
            </div>

            <div className="text-sm">
              <div>• 기본보험료를 감액한 후, 위에 따라 한도를 계산할 경우 감액 후 기본보험료와 기본보험료 감액비율과 동일비율로 감액된 추가납입보험료 및 계약자적립액의 인출금액(자동인출금액 포함)을 적용합니다.</div>
            </div>
          </div>
        </div>
      </div>

      {/* 중요 안내사항 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">중요 안내사항</h3>
        <div className="p-6 rounded-lg border border-gray-300">
          <div className="space-y-2 text-sm">
            <div className="font-semibold text-red-600">연금개시후 보험기간에는 추가납입보험료를 납입할 수 없으며, 계약자적립액의 인출(자동인출, 노후자금 인출 포함)을 신청할 수 없습니다.</div>
          </div>
        </div>
      </div>

    </div>
  )
}
