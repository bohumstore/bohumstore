import React from 'react'

export default function ProductInfo() {
  return (
    <div className="space-y-8 px-2 sm:px-4 md:px-8 py-4 md:py-6">
      <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">가입안내</h2>

      {/* 1. 보험종류 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">보험종류</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs md:text-sm">
            <tbody>
              <tr>
                <td className="border border-gray-300 p-3 text-center">무배당 AIA 달러로 받는 연금보험Ⅲ 1형 생활자금형, 10년 이율확정형</td>
                <td className="border border-gray-300 p-3 text-center">1종 (기본형)<br />2종 (연금강화형)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 text-center">무배당 AIA 달러로 받는 연금보험Ⅲ 2형 거치형, 10년 이율확정형</td>
                <td className="border border-gray-300 p-3 text-center">1종 (기본형)<br />2종 (연금강화형)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 text-center">무배당 AIA 달러로 받는 연금보험Ⅲ 3형 생활자금형, 20년 이율확정형</td>
                <td className="border border-gray-300 p-3 text-center">1종 (기본형)<br />2종 (연금강화형)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 text-center">무배당 AIA 달러로 받는 연금보험Ⅲ 4형 거치형, 20년 이율확정형</td>
                <td className="border border-gray-300 p-3 text-center">1종 (기본형)<br />2종 (연금강화형)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. 피보험자 가입나이, 연금개시나이, 보험료 납입기간 및 보험료 납입주기 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">피보험자 가입나이, 연금개시나이, 보험료 납입기간 및 보험료 납입주기</h3>

        <div className="text-sm text-gray-800 mt-2">▪ 피보험자 가입나이 및 연금개시나이</div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-gray-300 p-3 text-center" colSpan={2}>구분</th>
                <th className="border border-gray-300 p-3 text-center">가입나이(A)</th>
                <th className="border border-gray-300 p-3 text-center">연금개시나이</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-3 text-center">1형</td>
                <td className="border border-gray-300 p-3 text-center align-middle" rowSpan={2}>10년 이율확정형</td>
                <td className="border border-gray-300 p-3 text-center align-middle" rowSpan={2}>0세 ~ 85세</td>
                <td className="border border-gray-300 p-3 text-center align-middle" rowSpan={2}>"Max[(A+10)세, 45세] ~ 90세"<br />다만, 가입나이가81~85세인경우"(A+10)세~ 95세"</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 text-center">2형</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 text-center">3형</td>
                <td className="border border-gray-300 p-3 text-center align-middle" rowSpan={2}>20년 이율확정형</td>
                <td className="border border-gray-300 p-3 text-center align-middle" rowSpan={2}>0세 ~ 75세</td>
                <td className="border border-gray-300 p-3 text-center align-middle" rowSpan={2}>"Max[(A+20)세, 45세] ~ 90세"<br />다만, 가입나이가71 ~ 75세인경우"(A+20)세~ 95세"</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 text-center">4형</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="text-sm text-gray-800 mt-6">▪ 보험료 납입기간 및 보험료 납입주기: 일시납</div>
      </div>

      {/* 3. 연금지급형태 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">연금지급형태</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-gray-300 p-3 text-center">연금종류</th>
                <th className="border border-gray-300 p-3 text-center" colSpan={2}>보증유형</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-3 text-center align-middle" rowSpan={3}>종신연금형<sup>㈜</sup></td>
                <td className="border border-gray-300 p-3 text-center align-middle" rowSpan={2}>
                  <div>보증기간부</div>
                  <div>(보증지급기간: 10년/20년)</div>
                </td>
                <td className="border border-gray-300 p-3 text-center">정액형</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 text-center">체증형(5%/10%, 10년간 체증)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 text-center" colSpan={2}>보증금액부</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2 text-xs md:text-sm text-gray-700 leading-relaxed">
          <p>㈜ 1. 종신연금형의 경우 연금지급 개시 전 연금생명표의 개정 등에 따라 연금액이 증가하게 되는 경우에는 연금개시 당시의 연금생명표 및 계약자적립액을 기준으로 산출한 연금액을 지급하며, 이 경우 회사는 연금개시 3개월전까지 연금액 변동내역 및 연금지급형태 선택방법 등을 안내합니다.</p>
          <p>2. 보험가입시점에 선택한 연금종류를 약관에 따라 종신연금형 중 다른 보증유형으로 변경 또는 아래와 같이 연금개시일 전까지 변경할 수 있습니다.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-gray-300 p-3 text-center">연금종류</th>
                <th className="border border-gray-300 p-3 text-center">보증유형</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-3 text-center">확정연금형</td>
                <td className="border border-gray-300 p-3 text-center">보증기간 (10년/15년/20년)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 text-center">상속연금형</td>
                <td className="border border-gray-300 p-3 text-center">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. 보험기간 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">보험기간</h3>

        {/* 종신연금형 */}
        <div className="space-y-2">
          <div className="text-sm text-gray-800">- 종신연금형</div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs md:text-sm">
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-3 text-center align-middle bg-[#1e3a8a] text-white" rowSpan={2}>보험<br />기간</td>
                  <td className="border border-gray-300 p-3 text-center">연금개시전<br />보험기간</td>
                  <td className="border border-gray-300 p-3 text-center">계약일부터 연금개시나이 계약해당일 전일까지</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 text-center">연금개시후<br />보험기간</td>
                  <td className="border border-gray-300 p-3 text-center">연금개시나이 계약해당일부터 종신까지</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-xs text-gray-600 leading-relaxed pl-4">㈜ 계약자가 약관에 따라 연금지급형태를 변경하는 경우 연금개시후 보험기간은 다음에서 정하는 기간으로 합니다.</div>
        </div>

        {/* 확정연금형 */}
        <div className="space-y-2">
          <div className="text-sm text-gray-800">- 확정연금형</div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs md:text-sm">
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-3 text-center bg-[#1e3a8a] text-white">보험<br />기간</td>
                  <td className="border border-gray-300 p-3 text-center">연금개시후<br />보험기간</td>
                  <td className="border border-gray-300 p-3 text-center">연금개시나이 계약해당일부터 10년, 15년, 20년</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 상속연금형 */}
        <div className="space-y-2">
          <div className="text-sm text-gray-800">- 상속연금형</div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs md:text-sm">
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-3 text-center bg-[#1e3a8a] text-white">보험<br />기간</td>
                  <td className="border border-gray-300 p-3 text-center">연금개시후<br />보험기간</td>
                  <td className="border border-gray-300 p-3 text-center">연금개시나이 계약해당일부터 종신까지</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 5. 납입보험료의 한도 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">납입보험료의 한도</h3>
        <div className="text-sm text-gray-700 leading-relaxed">
          일시납 보험료 US$ 15,000 ~ US$ 80,000,000
        </div>
      </div>

      {/* 6. 건강진단 여부 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">건강진단 여부</h3>
        <div className="text-sm text-gray-700 leading-relaxed">
          무배당 AIA 달러로 받는 연금보험Ⅲ의 경우 기존 다른 보험상품의 가입유무, 피보험자의 나이, 청약서 상의 계약 전 알릴 의무 사항에 따라 건강진단을 시행할 수 있으며, 그 결과에 따라 보험가입 가능여부를 판정할 수 있습니다.
        </div>
      </div>
    </div>
  )
}
