import React from 'react'
import { useState } from 'react';

export default function ProductInfo() {
  const [showResultModal, setShowResultModal] = useState(false);

  return (
    <div className="space-y-8 px-2 sm:px-4 md:px-8 py-4 md:py-6">
      {/* 상품특징 제목 */}
      <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">상품특징</h2>

      {/* 01 최저연금기준금액 보증 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">01 최저연금기준금액 보증</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <p className="text-base leading-relaxed">
              계약일 이후부터 연금개시나이 계약해당일(단, 연금개시 전 보험기간 중 피보험자가 사망한 경우 피보험자가 사망한 날)까지 기준 보험료 및 기준 추가보험료에 기준 기본보험료 및 기준 추가보험료의 매년 최저연금기준금액비율 해당액을 해당보험료 납입일(해당 월계약해당일 이전에 납입한 기본보험료의 경우는 월계약해당일)을 기준으로 일자 계산하여 더한 금액을 최저연금기준금액으로 활용하고 연금개시시점의 계약자적립액이 최저연금기준금액을 초과할 경우 계약자적립액을 연금기준금액으로 활용합니다.
            </p>
            <div>
              <div className="mb-2">최저연금기준금액비율</div>
              <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1e3a8a] text-white">
                      <th className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">계약일부터 20년이 되는 계약해당일의 전일</th>
                      <th className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">20년 이후부터 연금개시나이 계약해당일까지</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">기본보험료 및 추가보험료의 매년 7/100<br/><span className="text-red-600">(연단리 7%기준)</span></td>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">기본보험료 및 추가보험료의 매년 5/100<br/><span className="text-red-600">(연단리 5%기준)</span></td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div>※ 다만, 계약일부터 연금지급개시나이 계약해당일까지의 기간이 20년 미만인 경우 7/100로 적용합니다.</div>
              <div>※ 대표계약기준(40세 남성, 10년납, 연금개시나이 65세) 복리이자율로 환산시 연복리 4.21%</div>
            </div>
          </div>
        </div>
      </div>

      {/* 02 금액보증연금 보증 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">02 금액보증연금 보증</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <p className="text-base leading-relaxed">
              연금개시 후 보험기간 중 피보험자가 매년 계약해당일에 살아있을 경우 장래 공시이율과 관계 없이 연금기준금액에 금액보증연금 지급률을 곱한 금액에 대해 지급을 보증하는 것을 말합니다.
            </p>
            <div>
              <div className="mb-2 text-sm">※ 금액보증연금 보증비용</div>
              <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1e3a8a] text-white">
                      <th className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">20년 중</th>
                      <th className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">20년 후</th>
                      <th className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">연금개시 후</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">매년 최저연금기준금액의 3.70%</td>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">매년 최저연금기준금액의 2.00%</td>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">매년 연금기준금액의 2.00%</td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="font-bold">※ 금액보증연금 연지급액 = MAX(연금기준금액, 연계약해당일 계약자적립액x금액보증연금 지급률)</div>
              <div>※ 금액보증연금 지급률 = 기본 지급률 x ( 1 + 장기유지 가산율)</div>
            </div>
            <div>
              <div className="mb-2">※ 기본지급률</div>
              <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1e3a8a] text-white">
                      <th className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">연금개시나이</th>
                      <th className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">남자</th>
                      <th className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">여자</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">55 ~ 59세</td>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">3.43%</td>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">3.31%</td>
                  </tr>
                  <tr>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">60 ~ 64세</td>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">3.78%</td>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">3.62%</td>
                  </tr>
                  <tr>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">65 ~ 69세</td>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">4.25%</td>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">4.04%</td>
                  </tr>
                  <tr>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">70 ~ 74세</td>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">4.78%</td>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">4.57%</td>
                  </tr>
                  <tr>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">75 ~ 80세</td>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">5.36%</td>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">5.15%</td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>
            {/* 장기유지가산율 표 부분 */}
            <div>
              <div className="mb-2">※ 장기유지가산율</div>
              <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1e3a8a] text-white">
                      <th className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">연금개시 전 보험기간<br/>(연금개시나이 - 가입나이)</th>
                      <th className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">가산율</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">10 ~ 24년</td>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">0%</td>
                  </tr>
                  <tr>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">25 ~ 39년</td>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">30%</td>
                  </tr>
                  <tr>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">40 ~ 54년</td>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">35%</td>
                  </tr>
                  <tr>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">55년 이상</td>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">40%</td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 03 최저사망적립액 보증 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">03 최저사망적립액 보증</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <p className="text-base leading-relaxed">
              장래 공시이율과 관계 없이 피보험자가 보험기간 중 사망하는 경우 사망시점의 최저연금기준금액을 계약자 적립액으로 최저보증해 드립니다.
            </p>
            <div className="space-y-2 text-sm">
              <div className="text-red-600">※ 다만, 연금개시 후 보험기간에 사망하였을 경우에는 연금기준금액에서 기지급된 금액보증연금 연지급액의 합계를 차감한 금액을 사망시 계약자적립액으로 최저보증(선지급행복자금 계약자적립액이 있는 경우 가산하여 지급하여 드립니다.)</div>
            </div>
            <div>
              <div className="mb-2">※ 최저사망적립액 보증비용</div>
              <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1e3a8a] text-white">
                      <th className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">20년 중</th>
                      <th className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">20년 후</th>
                      <th className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">연금개시 후</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">매년 최저연금기준금액의 0.4%</td>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">매년 최저연금기준금액의 0.25%</td>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">매년 연금기준금액의 0.25%</td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 04 보험료 납입면제 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">04 보험료 납입면제 [(무)신보험료납입면제특약 (3대질병형) 선택시]</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <p className="text-base leading-relaxed">
              암보장개시일 이후에 암(기타피부암, 갑상선암, 대장점막내암 및 비침습 방광암 제외), 보장개시일 이후에 뇌출혈 또는 급성심근경색증으로 진단이 확정되었을 경우 주계약, 대상이 되는 특약 및 이 특약의 차회 이후의 보험료 납입을 면제해드립니다.
            </p>
            <div className="space-y-2 text-sm">
              <div className="text-red-600">※ 암보장개시일은 계약일(부활(효력회복)일)부터 그 날을 포함하여 90일이 되는 날의 다음날입니다.</div>
            </div>
          </div>
        </div>
      </div>

      {/* 05 보험차익 비과세 혜택 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">05 보험차익 비과세 혜택</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <p className="text-base leading-relaxed">
              관련세법에서 정하는 요건에 부합하는 경우 보험차익 비과세 혜택을 받으실 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      {/* 06 선지급행복자금 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">06 선지급행복자금</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#1e3a8a] text-white">
                    <th className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">구분</th>
                    <th className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">내용</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">선지급행복자금</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm leading-relaxed">유효한 계약에 한해 납입기간(다만, 납입일시중지에 따라 납입기간이 연장된 경우 연장된 납입기간 포함) 이후 연금개시나이 계약해당일 1개월 이전까지 계약자가 선지급행복자금을 신청하는 경우 선지급행복자금 신청비율에 따라 선지급행복자금 지급일에 '연금기준금액'에 선지급행복자금 신청비율을 곱한 금액을 선지급행복자금기간 동안에 확정연금으로 일시금 또는 확정연금으로 지급하는 것. 다만, 확정연금의 계산은 신공시이율(연금Ⅳ)를 적용하여 계산되므로, 신공시이율(연금Ⅳ)가 변경되면 연금액도 변경됨</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">선지급행복자금<br/>신청 비율</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">최소 0%에서 30%까지 10%p 단위로 신청 가능</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">선지급행복자금 기간</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">확정연금 지급기간으로 일시금, 5년, 10년으로 선택가능</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">선지급행복자금 지급일</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">연금개시나이 계약해당일 이후 선지급행복자금기간 동안의 연단위 계약 해당일</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">선지급행복자금 지급개시일</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">선지급행복자금 지급이 시작되는 날로 연금개시나이 계약해당일</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">선지급행복자금<br/>신청 후 제한사항</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">(1) 기본보험료 감액<br/>(2) 중도인출<br/>(3) 연금개시나이 변경</td>
                </tr>
              </tbody>
            </table>
            </div>
            <div className="text-sm text-red-600">
              ※ 위 내용은 요약된 것으로 보다 자세한 내용은 보험약관 및 상품설명서를 확인하시기 바랍니다.
            </div>
          </div>
        </div>
      </div>

      {/* 가입안내 제목 */}
      <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">가입안내</h2>

      {/* 가입안내 내용 */}
      <div className="space-y-4">
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 font-bold text-xs sm:text-sm">보험종류</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">보증형 연금보험</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 font-bold text-xs sm:text-sm">부가가능 특약</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">(무)신보험료납입면제특약(3대질병형)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 font-bold text-xs sm:text-sm">가입나이</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">만 15세 ~ 70세</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 font-bold text-xs sm:text-sm">연금개시나이</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">55세 ~ 80세<br/>※ 다만, 「보험료 납입기간+최소거치기간+가입나이」가 연금개시나이 범위 이내이어야 함.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 font-bold text-xs sm:text-sm">보험기간</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">연금개시 전 보험기간 : 계약일부터 연금개시나이 계약해당일 전일까지<br/>연금개시 후 보험기간 : 연금개시나이 계약해당일부터 100세 최종연금 지급일까지</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 font-bold text-xs sm:text-sm">보험료 납입기간</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">5·7·10·12·15·20년납</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 font-bold text-xs sm:text-sm">보험료 납입주기</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">월납</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 font-bold text-xs sm:text-sm">추가정보</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">
                      <div>보험료 납입한도 : (기본보험료 기준, 1구좌 당) 건당 월납보험료 20만원 이상 100만원 이하</div>
                      <div>최소거치기간 : 5년</div>
                      <div>연금관련 지급형태 : 금액보증연금형, 100세 최종연금 지급일까지(* 100세 최종연금 지급일 : 피보험자의 99세 계약해당일)</div>
                      <div>연금관련 지급주기 : 매년(단, 월분할지급 선택가능)</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-sm text-red-600">
              ※ 계약인수 관련 사항은 회사가 별도로 정한 기준에 따라 제한될 수 있습니다.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 