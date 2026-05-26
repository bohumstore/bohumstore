import React from 'react'

export default function ProductInfo() {
  return (
    <div className="space-y-8 px-2 sm:px-4 md:px-8 py-4 md:py-6">
      <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">가입안내</h2>

      {/* 1) 보험기간 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">보험기간</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs md:text-sm min-w-[240px]">
            <colgroup>
              <col className="w-[8%]" />
              <col className="w-[10%]" />
              <col className="w-[18%]" />
              <col className="w-[35%]" />
              <col className="w-[35%]" />
            </colgroup>
            <thead>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-gray-300 p-2 text-center text-xs md:text-sm" colSpan={3}>구분</th>
                <th className="border border-gray-300 p-2 text-center text-xs md:text-sm">연금개시전<br />보험기간</th>
                <th className="border border-gray-300 p-2 text-center text-xs md:text-sm">연금개시후<br />보험기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm" rowSpan={3}>종신연금</td>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm" rowSpan={2}>기간<br />보증부</td>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm">기본형</td>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm" rowSpan={3}>보험계약일부터<br />연금개시나이<br />계약해당일 전일까지</td>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm" rowSpan={3}>연금개시나이<br />계약해당일부터<br />종신까지</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm">초기집중강화형</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm" colSpan={2}>금액보증부</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-600">※ 보험가입시점의 연금지급형태는 종신연금(기간보증부 또는 금액보증부)로 정해지며, 계약자가 연금지급형태를 변경하는 경우 보험기간은 다음에서 정하는 기간으로 합니다.</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs md:text-sm min-w-[300px]">
            <colgroup>
              <col className="w-[8%]" />
              <col className="w-[10%]" />
              <col className="w-[18%]" />
              <col className="w-[35%]" />
              <col className="w-[35%]" />
            </colgroup>
            <thead>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-gray-300 p-2 text-center text-xs md:text-sm" colSpan={3}>구분</th>
                <th className="border border-gray-300 p-2 text-center text-xs md:text-sm">연금개시전<br />보험기간</th>
                <th className="border border-gray-300 p-2 text-center text-xs md:text-sm">연금개시후<br />보험기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm" rowSpan={3}>종신연금</td>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm" rowSpan={2}>기간<br />보증부</td>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm">기본형</td>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm" rowSpan={5}>보험계약일부터<br />연금개시나이<br />계약해당일 전일까지</td>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm" rowSpan={3}>연금개시나이<br />계약해당일부터<br />종신까지</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm">초기집중강화형</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm" colSpan={2}>금액보증부</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm" colSpan={3}>확정연금</td>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm">연금개시나이<br />계약해당일부터<br />최종연금지급일까지</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm" colSpan={3}>상속연금</td>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm">연금개시나이<br />계약해당일부터<br />종신까지</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="text-xs text-gray-600">※ 2개의 연금지급형태를 선택한 경우 연금개시후 보험기간은 선택한 연금지급형태 중 가장 긴 보험기간으로 합니다.</div>
      </div>

      {/* 보험료 납입기간 및 납입주기 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">보험료 납입기간 및 납입주기</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs md:text-sm min-w-[240px]">
            <colgroup>
              <col className="w-[18%]" />
              <col className="w-[16%]" />
              <col className="w-[72%]" />
            </colgroup>
            <thead>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-gray-300 p-2 text-center text-xs md:text-sm" colSpan={2}>구 분</th>
                <th className="border border-gray-300 p-2 text-center text-xs md:text-sm">내 용</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm" colSpan={2}>보험료 납입기간</td>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm">5년납</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm" rowSpan={2}>보험료<br />납입주기</td>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm">기본보험료</td>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm">월납</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm">추가납입보험료</td>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm">수시납</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 가입나이, 연금지급개시나이 및 최소거치기간 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">가입나이, 연금지급개시나이 및 최소거치기간</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs md:text-sm min-w-[250px]">
            <colgroup>
              <col className="w-[30%]" />
              <col className="w-[70%]" />
            </colgroup>
            <thead>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-gray-300 p-2 text-center text-xs md:text-sm">구 분</th>
                <th className="border border-gray-300 p-2 text-center text-xs md:text-sm">내 용</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm">가입나이</td>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm">0세 ~ (A-15)세</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm">거치기간</td>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm">최소 15년 ~ 최대 85년</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm">연금지급개시나이(A)</td>
                <td className="border border-gray-300 p-2 text-center text-xs md:text-sm">45세 ~ 85세</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul className="text-xs text-gray-600 list-disc pl-5 space-y-1">
          <li>신부부형 남자의 경우 최소 연금지급개시나이는 48세로 합니다.</li>
          <li>종신연금(기간보증부) 80세보증의 경우 최대 연금지급개시나이는 70세로 합니다.</li>
          <li>종신연금(기간보증부) 30년보증 신부부형 여자의 경우 최대 연금지급개시나이는 84세로 합니다.</li>
        </ul>
      </div>

      {/* 연금지급형태 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">연금지급형태</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-6">
          {/* ① 계약을 체결할 때 */}
          <div className="space-y-2">
            <div className="font-bold text-[#1e3a8a] mb-1">① 계약을 체결할 때</div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs md:text-sm min-w-[240px]">
                <colgroup>
                  <col className="w-[18%]" />
                  <col className="w-[15%]" />
                  <col className="w-[22%]" />
                  <col className="w-[26%]" />
                  <col className="w-[25%]" />
                </colgroup>
                <thead>
                  <tr className="bg-[#1e3a8a] text-white">
                    <th className="border border-gray-300 p-2 text-center" colSpan={5}>연금유형</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center" rowSpan={4}>종신연금</td>
                    <td className="border border-gray-300 p-2 text-center" rowSpan={3}>기간<br />보증부</td>
                    <td className="border border-gray-300 p-2 text-center" rowSpan={2}>기본형</td>
                    <td className="border border-gray-300 p-2 text-center">정액형(개인형, 신부부형)</td>
                    <td className="border border-gray-300 p-2 text-center" rowSpan={3}>10년, 20년, 30년,<br />80세, 100세 보증</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center text-xs md:text-sm">체증형(5%, 10%) (개인형)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center" colSpan={2}>초기집중강화형(개인형, 신부부형)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center" colSpan={4}>금액보증부</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-xs text-gray-600">※ 체증형의 체증기간은 10년입니다.</div>
          </div>

          {/* ② 연금지급개시 이전에 연금지급형태를 변경할 때 */}
          <div className="space-y-2">
            <div className="font-bold text-[#1e3a8a] mb-1">② 연금지급개시 이전에 연금지급형태를 변경할 때</div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs md:text-sm min-w-[240px]">
                <colgroup>
                  <col className="w-[18%]" />
                  <col className="w-[15%]" />
                  <col className="w-[22%]" />
                  <col className="w-[26%]" />
                  <col className="w-[25%]" />
                </colgroup>
                <thead>
                  <tr className="bg-[#1e3a8a] text-white">
                    <th className="border border-gray-300 p-2 text-center" colSpan={5}>연금유형</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center" rowSpan={4}>종신연금</td>
                    <td className="border border-gray-300 p-2 text-center" rowSpan={3}>기간<br />보증부</td>
                    <td className="border border-gray-300 p-2 text-center" rowSpan={2}>기본형</td>
                    <td className="border border-gray-300 p-2 text-center">정액형(개인형, 신부부형)</td>
                    <td className="border border-gray-300 p-2 text-center" rowSpan={3}>10년, 20년, 30년,<br />80세, 100세 보증</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center text-xs md:text-sm">체증형 (5%, 10%) (개인형)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center" colSpan={2}>초기집중강화형(개인형, 신부부형)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center" colSpan={4}>금액보증부</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center text-xs md:text-sm" colSpan={5}>확정연금(10~60년[5년단위])</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 text-center text-xs md:text-sm" colSpan={5}>상속연금</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-xs text-gray-600">※ 체증형의 체증기간은 10년입니다.</div>
            <div className="text-xs text-gray-600">※ 초기집중강화형의 초기집중강화기간은 10년이며 초기집중강화기간의 지급배수는 2배입니다.</div>
          </div>
        </div>
      </div>

      {/* 보험료 납입한도 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">보험료 납입한도</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
          <div>
            <div className="font-bold text-[#1e3a8a] mb-1">① 기본보험료</div>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>계약시점에 보험료 납입기간 중 매월 계속 납입하기로 한 월납보험료를 말합니다.</li>
              <li>납입금액은 500만원 이하 만원단위 금액으로 합니다.</li>
              <li>최소보험료는 월납보험료 30만원입니다.</li>
            </ul>
          </div>
          <div>
            <div className="font-bold text-[#1e3a8a] mb-1">② 추가납입보험료</div>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>보험계약 성립 후부터 보험료 납입기간 중 기본보험료와 달리 수시로 납입할 수 있는 보험료를 말합니다.</li>
              <li>납입 가능한 추가납입보험료의 한도는 기본보험료 총액의 200% 이내입니다.</li>
              <li>계약자적립액의 인출이 있는 경우 인출금액만큼 추가로 납입이 가능하며 해당 보험료는 추가납입보험료로 합니다.</li>
              <li>기본보험료 납입완료시점 이후에는 더 이상 추가납입보험료를 납입할 수 없습니다.</li>
              <li>매회 납입 최저한도는 1만원 이상 만원단위 금액이며, 1회 납입 한도는 아래 산식과 같습니다.</li>
            </ul>
            <p className="text-sm">
              (월납 기본보험료 × 가입후 경과월수 + 선납보험료) × 200% - 이미 납입한 추가납입보험료 합계액 + 계약자적립액 인출금액의 합계액
              <span className="block text-xs text-gray-700 mt-1">* 다만, 경과월수는 가입할 때를 1개월로 하며, 보험료납입기간을 최고한도로 합니다.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
