import React from 'react'

export default function CoverageDetails() {
  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-8 py-3 md:py-4">
      <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">IBK 연금보험 보장내용</h2>

      {/* 연금기준금액 상세설명 */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">연금기준금액 상세설명</h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="space-y-3 text-sm text-gray-700">
            <p>※ 연금기준금액이란 연금개시 후 보험기간에 실적배당 종신연금 지급 및 최저사망계약자적립액 지급의 기준이 되는 금액으로서 연금지급개시나이 계약해당일의 최저연금기준금액과 연금지급개시나이 계약해당일의 계약자적립액 중 큰 금액을 말합니다.</p>
            <p>※ 최저연금기준금액은 계약일로부터 20년동안 기준 기본보험료 및 기준 추가보험료의 매년 8/100 해당액(20년이 지난 후부터 연금개시전까지 매년 5/100해당액)을 기준 기본보험료 및 기준 추가보험료에 일자 계산하여 더한 금액을 말합니다. 다만, 해당보험료 납입일을 기준으로 일할 계산합니다.</p>
            <p>※ 피보험자가 사망한 경우, 계약자적립액과 최저사망계약자적립액 중 큰 금액을 계약자에게 지급하여 드리고 이 계약은 더 이상 효력이 없습니다. 다만, 피보험자가 만 15세 이전에 사망한 경우의 최저사망계약자적립액은 이미 납입한 보험료로 합니다.</p>
            <p>※ 최저사망계약자적립액이라 함은 피보험자가 사망한 경우, 특별계정의 운용실적과 관계없이 보장하는 최저한도 금액으로서 사망시점의 최저연금기준금액을 말합니다. 다만, 연금개시 후 보험기간에는 사망시점의 연금기준금액에서 연금개시 후 보험기간 중 발생한 실적배당 종신연금 연지급액의 합계를 차감한 금액을 말하며, 이 금액이 '0'보다 적은 경우 '0'으로 합니다. 다만, 2형(미보증형)의 최저사망계약자적립액은 연금개시 전 보험기간에 한하여 이미 납입한 보험료로 합니다.</p>
            <p>※ 계약자적립액은 매일 특별계정의 운용실적을 적용하여 '보험료 및 해약환급금 산출방법서'에서 정한 방법에 따라 계산되기 때문에 특별계정의 운용실적이 변경되면 계약자적립액도 변경됩니다.</p>
            <p>※ 이미 납입한 보험료란 계약자가 회사에 납입한 기본보험료 및 추가납입보험료의 합계를 말합니다. 다만, 계약자가 납입한 보험료를 감액하거나 중도에 계약자적립액을 인출할 경우 "이미 납입한 보험료"는 제22조(계약내용의 변경 등) 제5항 및 제49조(중도인출) 제5항에 따라 계산된 보험료와 해당 감액 또는 중도인출 이후 납입된 보험료의 합계를 말합니다.</p>
          </div>
        </div>
      </div>

      {/* 복리이자율 정보 */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">복리이자율 정보</h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="space-y-3 text-sm text-gray-700">
            <p>※ 최저연금기준금액비율을 말하며, 복리이자율로 환산시 대표계약기준(40세,10년납,65세 연금개시) 계약일부터 연금개시나이 계약해당일까지 연복리 4.5%입니다.</p>
            <p>※ 다만, 추가납입, 중도인출 및 약관 제22조(계약 내용의 변경) 제1항에서 정한 계약내용의 변경 등이 있는 경우에는 예시된 복리이자율은 변경될 수 있습니다.</p>
          </div>
        </div>
      </div>

      {/* 실적배당종신연금형 상세정보 */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">실적배당종신연금형 상세정보</h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <div>
              <div className="mb-3 text-lg font-semibold text-[#1e3a8a]">실적배당종신연금형(1형(보증형)에 해당)</div>
          <div className="space-y-3">
                <p className="text-sm">연금개시후 보험기간 중 피보험자가 매년 보험계약해당일에 살아있을 경우 연금기준금액을 기준으로 실적배당 종신연금 지급률을 적용하여 계산한 연금액을 지급</p>
                <div className="text-sm text-red-600">※ 실적배당 종신연금 지급률 = 기본지급률 × (1 + 장기유지가산율)</div>
                
                <div>
                  <div className="mb-2 font-semibold">■ 기본지급률</div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-xs">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="border border-gray-300 p-2">연령</th>
                          <th className="border border-gray-300 p-2">남성</th>
                          <th className="border border-gray-300 p-2">여성</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="border border-gray-300 p-2">30세 이상 ~ 40세 미만</td><td className="border border-gray-300 p-2 text-center">2.40%</td><td className="border border-gray-300 p-2 text-center">2.20%</td></tr>
                        <tr><td className="border border-gray-300 p-2">40세 이상 ~ 50세 미만</td><td className="border border-gray-300 p-2 text-center">2.80%</td><td className="border border-gray-300 p-2 text-center">2.60%</td></tr>
                        <tr><td className="border border-gray-300 p-2">50세 이상 ~ 55세 미만</td><td className="border border-gray-300 p-2 text-center">3.05%</td><td className="border border-gray-300 p-2 text-center">2.85%</td></tr>
                        <tr><td className="border border-gray-300 p-2">55세 이상 ~ 60세 미만</td><td className="border border-gray-300 p-2 text-center">3.50%</td><td className="border border-gray-300 p-2 text-center">3.30%</td></tr>
                        <tr><td className="border border-gray-300 p-2">60세 이상 ~ 65세 미만</td><td className="border border-gray-300 p-2 text-center">4.20%</td><td className="border border-gray-300 p-2 text-center">4.00%</td></tr>
                        <tr><td className="border border-gray-300 p-2">65세 이상 ~ 70세 미만</td><td className="border border-gray-300 p-2 text-center">4.70%</td><td className="border border-gray-300 p-2 text-center">4.50%</td></tr>
                        <tr><td className="border border-gray-300 p-2">70세 이상 ~ 80세 미만</td><td className="border border-gray-300 p-2 text-center">5.05%</td><td className="border border-gray-300 p-2 text-center">4.85%</td></tr>
                        <tr><td className="border border-gray-300 p-2">80세</td><td className="border border-gray-300 p-2 text-center">5.05%</td><td className="border border-gray-300 p-2 text-center">4.85%</td></tr>
                      </tbody>
                    </table>
                  </div>
            </div>

                <div>
                  <div className="mb-2 font-semibold">■ 장기유지 가산율</div>
            <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                        <tr className="bg-gray-200">
                          <th className="border border-gray-300 p-2">유지기간</th>
                          <th className="border border-gray-300 p-2">가산율</th>
                </tr>
              </thead>
              <tbody>
                        <tr><td className="border border-gray-300 p-2">10년 이상 ~ 20년 미만</td><td className="border border-gray-300 p-2 text-center">0%</td></tr>
                        <tr><td className="border border-gray-300 p-2">20년 이상 ~ 25년 미만</td><td className="border border-gray-300 p-2 text-center">7%</td></tr>
                        <tr><td className="border border-gray-300 p-2">25년 이상 ~ 30년 미만</td><td className="border border-gray-300 p-2 text-center">16%</td></tr>
                        <tr><td className="border border-gray-300 p-2">30년 이상</td><td className="border border-gray-300 p-2 text-center">24%</td></tr>
              </tbody>
            </table>
            </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 연금지급형태 상세정보 */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">연금지급형태 상세정보</h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <div>
              <div className="mb-3 text-lg font-semibold text-[#1e3a8a]">연금지급 형태(2형(미보증형) 및 연금지급형태 변경 시 해당)</div>
          <div className="space-y-3">
            <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2">연금지급형태</th>
                        <th className="border border-gray-300 p-2">지급조건</th>
                        <th className="border border-gray-300 p-2">지급내용</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                        <td className="border border-gray-300 p-2 font-semibold">종신연금형<br/>기본연금형</td>
                        <td className="border border-gray-300 p-2">피보험자가 매년 보험계약해당일에 살아있을 때</td>
                        <td className="border border-gray-300 p-2">[연금개시시점의 계약자적립금 × 종신연금형 분할비율]을 계산한 금액을 기준으로 계산한 연금액을 지급<br/>(10년, 20년, 30년, 100세((101세-연금개시나이)년)보증, 기대여명 보증지급)</td>
                </tr>
                <tr>
                        <td className="border border-gray-300 p-2 font-semibold">조기집중형</td>
                        <td className="border border-gray-300 p-2">피보험자가 매년 보험계약해당일에 살아있을 때</td>
                        <td className="border border-gray-300 p-2">[연금개시시점의 계약자적립금 × 종신연금형 분할비율]을 계산한 금액을 기준으로 연금개시후 10년동안(10회까지)의 연금연액이 10년 이후(11회부터)의 연금연액의 1.5배, 2배 또는 3배가 되도록 계산한 연금액을 지급<br/>(10년, 20년, 30년, 100세((101세-연금개시나이)년) 보증지급)</td>
                </tr>
                <tr>
                        <td className="border border-gray-300 p-2 font-semibold">부부연금형</td>
                        <td className="border border-gray-300 p-2">피보험자가 매년 보험계약해당일에 살아있을 때</td>
                        <td className="border border-gray-300 p-2">[연금개시시점의 계약자적립금 × 종신연금형 분할비율]을 계산한 금액을 기준으로 계산한 연금액을 지급<br/>(10년, 20년, 30년, 100세((101세-연금개시나이)년)보증지급)<br/><br/>주피보험자가 연금개시 후에 사망하고, 종피보험자가 보증지급기간 이후에 매년 보험계약해당일에 살아있을 때<br/>주피보험자가 생존할 때 받은 연금연액의 70%를 기준으로 계산한 연금액을 지급</td>
                </tr>
                <tr>
                        <td className="border border-gray-300 p-2 font-semibold">확정연금형</td>
                        <td className="border border-gray-300 p-2">연금지급기간의 매년 보험계약해당일</td>
                        <td className="border border-gray-300 p-2">[연금개시시점의 계약자적립금 × 확정연금형 분할비율]을 계산한 금액을 기준으로 계약자가 선택한 연금지급기간동안 나누어 산출한 연금액을 피보험자의 생사여부와 관계없이 연금지급기간동안 지급<br/>(5년, 10년, 15년, 20년, 25년, 30년, 60년, 100세((101세-연금개시나이)년))</td>
                </tr>
                <tr>
                        <td className="border border-gray-300 p-2 font-semibold">상속연금형</td>
                        <td className="border border-gray-300 p-2">피보험자가 매년 보험계약해당일에 살아있을 때</td>
                        <td className="border border-gray-300 p-2">[연금개시시점의 계약자적립금 × 상속연금형 분할비율]을 계산한 금액을 기준으로 직전 1년간의 공시이율에 따라 계산한 이자를 연금액으로 지급</td>
                </tr>
                <tr>
                        <td className="border border-gray-300 p-2 font-semibold">일시생활자금형</td>
                        <td className="border border-gray-300 p-2">피보험자가 연금개시시점에 살아있을 때</td>
                        <td className="border border-gray-300 p-2">[연금개시시점의 계약자적립액 × 일시생활자금 분할비율]을 계약자적립액에서 인출하여 지급</td>
                </tr>
                <tr>
                        <td className="border border-gray-300 p-2 font-semibold">실적연금형<br/>(2형(미보증형)에 한함)</td>
                        <td className="border border-gray-300 p-2">연금지급기간의 매년 보험계약해당일</td>
                        <td className="border border-gray-300 p-2">[연금개시시점의 계약자적립금 × 실적연금형 분할비율]을 계산한 금액을 기준으로 계약자가 선택한 연금지급기간(5년 이상 계약자가 선택한 연단위 기간)동안 지급사유 발생일 현재 계약자 보유좌수를 연금지급횟수로 나누는 방식으로 계산한 연금액을 지급<br/>(별표2) "실적연금형에 관한 사항" 참조</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

            {/* 주요 안내사항 */}
            <div className="space-y-2 text-xs text-gray-700">
              <div>※ 일시생활자금 또는 2가지 이상의 연금지급형태를 선택하신 경우에는 연금개시시점의 계약자적립액에 선택하신 연금지급형태별 분할비율을 곱하여 일시생활자금 및 연금지급형태별 연금액을 계산하여 드립니다. 일시생활자금의 분할비율 및 연금지급형태별 분할비율의 합계는 100%가 되어야 합니다.</div>
              <div>※ 종신연금형의 경우 연금개시후 보증지급기간 안에 사망시에는 보증기간까지의 미지급된 연금연액을 "공시이율로 할인하여 계산한 금액을 일시금으로 지급받는 방법"과 "연금지급주기에 따라 지급받는 방법" 중 선택한 방법에 따라 해당 금액을 지급합니다.</div>
              <div>※ 확정연금형의 경우 연금개시후 생사여부와 관계없이 확정지급기간까지의 연금액을 드립니다.</div>
              <div>※ 종신연금형의 경우 생존연금 지급개시 후 보증지급횟수까지 지급되지 않은 생존연금을 보험료 및 해약환급금 산출방법서에 따라 공시이율로 할인하여 선지급할 수 있습니다.</div>
              <div>※ 연금지급형태의 100세 보증 및 100세 확정은 피보험자의 보험나이를 기준으로 하며, 100세 보험년도 말까지 보증 또는 확정 지급합니다.</div>
              <div>※ 상속연금형의 경우 연금개시후 피보험자가 사망하는 경우 그 시점의 상속연금형 계약자적립액을 지급합니다. 상속연금형 계약자적립액이란 연금개시시점의 계약자적립액을 공시이율로 적립한 금액에서 연금 발생분을 뺀 나머지 금액을 공시이율로 적립한 금액으로 이 보험의 보험료 및 해약환급금 산출방법서에서 정한 바에 따라 계산합니다.</div>
              <div>※ 연금을 매월, 매3개월, 매6개월로 나누어 지급할 경우에는 월, 3개월, 6개월 동안 공시이율로 적립한 이자를 더하여 드립니다.</div>
              <div>※ 연금개시전 보험기간 중 피보험자가 사망한 경우에는 최저사망계약자적립액과 사망한 날을 기준으로 계산한 계약자적립액 중 큰 금액을 지급합니다.</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
} 