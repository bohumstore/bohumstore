import React from 'react'

export default function ProductInfo() {
  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-8 py-3 md:py-4">
      {/* 가입안내 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">가입안내</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[10px] sm:text-xs md:text-sm">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 bg-gray-100 font-semibold text-center align-middle w-1/4 leading-tight">피보험자<br className="sm:hidden" /> 가입나이</td>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight" colSpan={2}>0세 ~ (A-보험료 납입기간-최소거치기간)세</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 bg-gray-100 font-semibold text-center align-middle leading-tight">피보험자<br className="sm:hidden" /> 연금개시나이(A)</td>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight" colSpan={2}>30세 ~ 80세</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 bg-gray-100 font-semibold text-center align-middle leading-tight">기본보험료 및<br />최소거치기간</td>
                    <td className="border border-gray-300 p-0 text-center align-middle" colSpan={2}>
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-[#1e3a8a] text-white">
                            <th className="border border-gray-300 p-1.5 sm:p-2 md:p-3 font-semibold text-center align-middle leading-tight">납입기간</th>
                            <th className="border border-gray-300 p-1.5 sm:p-2 md:p-3 font-semibold text-center align-middle leading-tight">기본보험료</th>
                            <th className="border border-gray-300 p-1.5 sm:p-2 md:p-3 font-semibold text-center align-middle leading-tight">최소<br className="sm:hidden" />거치기간</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">5년납</td>
                            <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight" rowSpan={2}>30만원<br className="sm:hidden" /> 이상</td>
                            <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">7년</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">7년납</td>
                            <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight" rowSpan={2}>5년</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">10년납<br className="sm:hidden" /> 이상</td>
                            <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">20만원<br className="sm:hidden" /> 이상</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 bg-gray-100 font-semibold text-center align-middle leading-tight" rowSpan={2}>보험기간</td>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 bg-gray-100 font-semibold text-center align-middle leading-tight">연금개시 전<br />보험기간</td>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">계약일로부터 (A)세 계약해당일의 전일까지</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 bg-gray-100 font-semibold text-center align-middle leading-tight">연금개시 후<br />보험기간</td>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">(A)세 계약해당일부터 종신까지</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 bg-gray-100 font-semibold text-center align-middle leading-tight">납입주기</td>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight" colSpan={2}>월납</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 추가납입 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">추가납입</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[10px] sm:text-xs md:text-sm">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 bg-gray-100 font-semibold text-center align-middle w-1/4 leading-tight">납입한도</td>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">(해당월까지 납입한 기본보험료+선납보험료) X 200% - 이미 납입한 추가납입보험료의 합계<br />+ 중도인출금액의 합계 * 단, 연간 납입한도 존재</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 bg-gray-100 font-semibold text-center align-middle leading-tight">해당기간</td>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">보험계약 성립 후부터 납입기간 종료일까지</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-xs text-gray-700">
              ※ 연간납입한도 : 연간(보험연도 기준) 납입한 기본보험료의 2배까지만 가능(12개월치의 2배)
            </div>
          </div>
        </div>
      </div>

      {/* 중도인출 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">중도인출</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[10px] sm:text-xs md:text-sm">
                <thead>
                  <tr className="bg-[#1e3a8a] text-white">
                    <th className="border border-gray-300 p-1.5 sm:p-2 md:p-3 font-semibold text-center align-middle leading-tight">구분</th>
                    <th className="border border-gray-300 p-1.5 sm:p-2 md:p-3 font-semibold text-center align-middle leading-tight">연금개시 전</th>
                    <th className="border border-gray-300 p-1.5 sm:p-2 md:p-3 font-semibold text-center align-middle leading-tight">연금개시 후</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 bg-gray-100 font-semibold text-center align-middle leading-tight">기본사항</td>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">보험년도 기준 연 12회 인출가능<br />계약월 이후 1개월이 지난 후부터 인출 가능</td>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">상속연금형에 한하여<br />보험년도 기준 연 12회 인출 가능</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 bg-gray-100 font-semibold text-center align-middle leading-tight">인출수수료</td>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight" colSpan={2}>없음</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 bg-gray-100 font-semibold text-center align-middle leading-tight">인출후<br className="sm:hidden" /> 최소<br className="sm:hidden" /> 계약자적립액</td>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">Max<br />(기본보험료의 2배, 500만원)</td>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">500만원<br />(상속연금형 해약환급금 기준)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="space-y-1 text-xs text-gray-700">
              <div>※ 1회당 인출할 수 있는 최고한도는 인출 당시 해약환급금의 60%를 초과할 수 없습니다.</div>
              <div>※ "인출신청일 + 제2영업일"에 "인출신청일 + 제2영업일"의 기준가를 적용하여 지급합니다.</div>
            </div>
          </div>
        </div>
      </div>

      {/* 실적배당종신연금형 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">실적배당종신연금형에 해당</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[10px] sm:text-xs md:text-sm">
                <thead>
                  <tr className="bg-[#1e3a8a] text-white">
                    <th className="border border-gray-300 p-1.5 sm:p-2 md:p-3 font-semibold text-center align-middle leading-tight">구분</th>
                    <th className="border border-gray-300 p-1.5 sm:p-2 md:p-3 font-semibold text-center align-middle leading-tight">지급사유</th>
                    <th className="border border-gray-300 p-1.5 sm:p-2 md:p-3 font-semibold text-center align-middle leading-tight">지급액</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 bg-gray-100 font-semibold text-center align-middle leading-tight">실적배당<br />종신연금형</td>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">연금개시후 보험기간 중 피보험자가<br />매년 보험계약해당일에 살아있을 경우</td>
                    <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">연금기준금액을 기준으로 실적배당 종신연금<br />지급률을 적용하여 계산한 연금액을 지급<br />※ 실적배당 종신연금 지급률 = 기본지급률 X (1 + 장기유지가산률)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 기본지급률 */}
            <div className="mt-4">
              <h4 className="text-base font-bold mb-2">■ 기본지급률</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[10px] sm:text-xs md:text-sm">
                  <thead>
                    <tr className="bg-[#1e3a8a] text-white">
                      <th className="border border-gray-300 p-1.5 sm:p-2 md:p-3 font-semibold text-center align-middle leading-tight" rowSpan={2}>연금개시<br className="sm:hidden" /> 나이</th>
                      <th className="border border-gray-300 p-1.5 sm:p-2 md:p-3 font-semibold text-center align-middle leading-tight" colSpan={2}>피보험자 성별</th>
                    </tr>
                    <tr className="bg-[#1e3a8a] text-white">
                      <th className="border border-gray-300 p-1.5 sm:p-2 md:p-3 font-semibold text-center align-middle leading-tight">남자</th>
                      <th className="border border-gray-300 p-1.5 sm:p-2 md:p-3 font-semibold text-center align-middle leading-tight">여자</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">30세 이상 ~<br className="sm:hidden" /> 40세 미만</td>
                      <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">2.40%</td>
                      <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">2.20%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">40세 이상 ~<br className="sm:hidden" /> 50세 미만</td>
                      <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">2.80%</td>
                      <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">2.60%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">50세 이상 ~<br className="sm:hidden" /> 55세 미만</td>
                      <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">3.05%</td>
                      <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">2.85%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">55세 이상 ~<br className="sm:hidden" /> 60세 미만</td>
                      <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">3.50%</td>
                      <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">3.30%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">60세 이상 ~<br className="sm:hidden" /> 65세 미만</td>
                      <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">4.20%</td>
                      <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">4.00%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">65세 이상 ~<br className="sm:hidden" /> 70세 미만</td>
                      <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">4.70%</td>
                      <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">4.50%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">70세 이상 ~<br className="sm:hidden" /> 80세 미만</td>
                      <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">5.05%</td>
                      <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">4.85%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">80세</td>
                      <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">5.05%</td>
                      <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">4.85%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 장기유지 가산율 */}
            <div className="mt-4">
              <h4 className="text-base font-bold mb-2">■ 장기유지 가산율</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[10px] sm:text-xs md:text-sm">
                  <thead>
                    <tr className="bg-[#1e3a8a] text-white">
                      <th className="border border-gray-300 p-1.5 sm:p-2 md:p-3 font-semibold text-center align-middle leading-tight">연금개시 전<br className="sm:hidden" /> 보험기간</th>
                      <th className="border border-gray-300 p-1.5 sm:p-2 md:p-3 font-semibold text-center align-middle leading-tight">가산률</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">10년 이상 ~<br className="sm:hidden" /> 20년 미만</td>
                      <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">0%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">20년 이상 ~<br className="sm:hidden" /> 25년 미만</td>
                      <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">7%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">25년 이상 ~<br className="sm:hidden" /> 30년 미만</td>
                      <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">16%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">30년 이상</td>
                      <td className="border border-gray-300 p-1.5 sm:p-2 md:p-3 text-center align-middle leading-tight">24%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 유의사항 */}
            <div className="space-y-2 text-xs text-gray-700 mt-4">
              <div>※ 연금기준금액이란 연금개시 후 보험기간에 실적배당 종신연금 지급 및 최저사망계약자적립액 지급의 기준이 되는 금액으로서 연금지급개시나이 계약해당일의 최저연금기준금액과 연금지급개시나이 계약해당일의 계약자적립액 중 큰 금액을 말합니다.</div>
              <div className="text-blue-700">※ 최저연금기준금액은 계약일로부터 20년동안 기준 기본보험료 및 기준 추가보험료의 매년 8/100 해당액(20년이 지난 후부터 연금개시전까지 매년 5/100해당액)<sup className="text-red-600">주)</sup>을 기준 기본보험료 및 기준 추가보험료에 일자 계산하여 더한 금액을 말합니다. 다만, 해당보험료 납입일을 기준으로 일할 계산합니다.</div>
              <div>※ 피보험자가 사망한 경우, 계약자적립액과 최저사망계약자적립액 중 큰 금액을 계약자에게 지급하여 드리고 이 계약은 더 이상 효력이 없습니다. 다만, 피보험자가 만 15세 이전에 사망한 경우의 최저사망계약자적립액은 이미 납입한 보험료로 합니다.</div>
              <div className="text-blue-700">※ 최저사망계약자적립액이라 함은 피보험자가 사망한 경우, 특별계정의 운용실적과 관계없이 보장하는 최저한도 금액으로서 사망시점의 최저연금기준금액을 말합니다. 다만, 연금개시 후 보험기간에는 사망시점의 연금기준금액에서 연금개시 후 보험기간 중 발생한 실적배당 종신연금 연지급액의 합계를 차감한 금액을 말하며, 이 금액이 '0'보다 적은 경우 '0'으로 합니다. 다만, 2형(미보증형)의 최저사망계약자적립액은 연금개시 전 보험기간에 한하여 이미 납입한 보험료로 합니다.</div>
              <div>※ 계약자적립액은 매일 특별계정의 운용실적을 적용하여 '보험료 및 해약환급금 산출방법서'에서 정한 방법에 따라 계산되기 때문에 특별계정의 운용실적이 변경되면 계약자적립액도 변경됩니다.</div>
              <div>※ 이미 납입한 보험료란 계약자가 회사에 납입한 기본보험료 및 추가납입보험료의 합계를 말합니다. 다만, 계약자가 납입한 보험료를 감액하거나 중도에 계약자적립액을 인출할 경우 "이미 납입한 보험료"는 제22조(계약내용의 변경 등) 제5항 및 제49조(중도인출) 제5항에 따라 계산된 보험료와 해당 감액 또는 중도인출 이후 납입된 보험료의 합계를 말합니다.</div>
              <div className="border-t border-gray-300 mt-3 pt-3">
                <div className="text-xs text-gray-700"><sup className="text-red-600">주)</sup> 최저연금기준금액비율을 말하며, 복리이자율로 환산시 대표계약기준(40세,10년납,65세 연금개시) 계약일부터 연금개시나이 계약해당일까지 연복리 4.5%입니다. 다만, 추가납입, 중도인출 및 약관 제22조(계약내용의 변경) 제1항에서 정한 계약내용의 변경 등이 있는 경우에는 예시된 복리이자율은 변경될 수 있습니다.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}