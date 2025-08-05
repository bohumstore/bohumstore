import React from 'react'
import { useState } from 'react';

export default function ProductInfo() {
  const [showResultModal, setShowResultModal] = useState(false);

  return (
    <div className="space-y-8 px-2 sm:px-4 md:px-8 py-4 md:py-6">
      {/* 상품특징 제목 */}
      <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">상품특징</h2>

      {/* 01 연금기준금액 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">01 연금기준금액</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <p className="text-base leading-relaxed">
              투자수익률에 상관없이 계약일 이후부터 연금개시나이까지 주계약 기납입보험료를 최저연금기준금액비율로 부리한 금액을 최저연금기준금액으로 활용하고, 투자수익률이 좋아 연금개시시점의 계약자적립액이 최저연금기준금액을 초과할 경우에는 계약자적립액을 연금기준금액으로 활용합니다.
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
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">기본보험료 및 추가보험료의 매년 6/100<br/><span className="text-red-600">(연단리 6%기준)</span></td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div>※ 다만, 계약일부터 연금지급개시나이 계약해당일까지의 기간이 20년 미만인 경우 7/100로 적용합니다.</div>
              <div>※ 대표계약기준(40세 남성, 10년납, 연금개시나이 65세) 복리이자율로 환산시 연복리 4.32%</div>
            </div>
          </div>
        </div>
      </div>

      {/* 02 실적배당 종신연금 보증지급 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">02 실적배당 종신연금 보증지급</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <div className="space-y-2 text-sm">
              <div>※ 실적배당 종신연금 연지급액 보증금액 = 연금기준금액 X 실적배당 종신연금 지급률</div>
              <div>※ 단, 중도해지 시 해약환급금은 최저보증 되지 않음</div>
              <div>※ 실적배당 종신연금 보증비용</div>
            </div>
            <div>
              <div className="mb-2 text-sm">실적배당 종신연금 보증비용</div>
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
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">매년 최저연금기준금액의 3.3%</td>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">매년 최저연금기준금액의 1.7%</td>
                      <td className="border border-gray-300 p-2 sm:p-3 text-center text-xs sm:text-sm">매년 연금기준금액의 1.7%</td>
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
              펀드 운용실적과 관계없이 최저연금기준금액을 사망시 계약자 적립액으로 최저보증해 드립니다.
            </p>
            <div className="space-y-2 text-sm">
              <div className="text-red-600">※ 단, 연금개시 후에는 사망시점의 연금기준금액에서 기지급 된 실적배당 종신연금 연지급액의 합계를 차감한 금액을 사망시 계약자적립액으로 최저보증</div>
            </div>
            <div>
              <div className="mb-2 text-sm">최저사망적립액 보증비용</div>
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

      {/* 04 경제적 상황에 따라 유연한 자금운용 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">04 경제적 상황에 따라 유연한 자금운용</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <p className="text-base leading-relaxed">
              추가납입, 중도인출, 보험료납입일시중지제도, 선지급행복자금을 이용한 유연한 자금활용
            </p>
            <div className="space-y-2 text-sm">
              <div>중도인출시 연금기준금액 및 실적배당 종신연금액은 감소할 수 있습니다.</div>
              <div>- 중도인출수수료 없음 / 추가납입사업비 (추가보험료의 1.5%)</div>
              <div>- 중도인출은 계약일부터 1개월이 지난 이후 보험기간 중 보험년도 기준 연12회 가능</div>
              <div>- 보험료 납입 일시중지는 납입기간의 1/2이 지난후, 5회한도로 누적하여 36개월이내 가능</div>
              <div>- 선지급행복자금을 신청하는 경우 연금기준금액에 선지급행복자금 신청비율(0%~30%, 10%단위)을 곱한 금액을 일시금 또는 확정연금으로 지급하여 드립니다.</div>
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
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm font-semibold">선지급행복자금</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">유효한 계약에 한해 납입기간(다만, 납입일시중지에 따라 납입기간이 연장된 경우 연장된 납입기간 포함) 이후 연금개시나이 계약해당일 1개월 이전까지 계약자가 선지급행복자금을 신청하는 경우 선지급행복자금 신청비율에 따라 선지급행복자금 지급일에 '연금기준금액'에 선지급행복자금 신청비율을 곱한 금액을 선지급행복자금기간 동안에 확정연금으로 일시금 또는 확정연금으로 지급하는 것. 다만, 확정연금의 계산은 신공시이율(연금Ⅳ)를 적용하여 계산되므로, 신공시이율(연금Ⅳ)가 변경되면 연금액도 변경됨</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm font-semibold">선지급행복자금 신청 비율</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">최소 0%에서 30%까지 10%p 단위로 신청 가능</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm font-semibold">선지급행복자금 기간</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">확정연금 지급기간으로 일시금, 5년, 10년으로 선택가능</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm font-semibold">선지급행복자금 지급일</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">연금개시나이 계약해당일 이후 선지급행복자금기간 동안의 연단위 계약 해당일</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm font-semibold">선지급행복자금 지급개시일</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">선지급행복자금 지급이 시작되는 날로 연금개시나이 계약해당일</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm font-semibold">선지급행복자금 신청 후 제한사항</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">(1) 기본보험료 감액<br/>(2) 중도인출<br/>(3) 연금개시나이 변경</td>
                </tr>
              </tbody>
            </table>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <div className="text-red-600">※ 이 상품은 실적배당형 상품이므로 보험금 및 해약환급금이 특별계정의 운용실적에 따라 변동됩니다.</div>
              <div className="text-red-600">※ 중도해지시 해약환급금에 대한 최저보증이 없으므로 원금손실이 발생할 수 있으며, 그 손실은 모두 계약자에게 귀속됩니다.</div>
              <div className="text-red-600">※ 위 내용은 요약된 것으로 보다 자세한 내용은 보험약관 및 상품설명서를 확인하시기 바랍니다.</div>
            </div>
          </div>
        </div>
      </div>

      {/* 가입안내 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">가입안내</h3>
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
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm font-semibold">보험종류</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">변액연금보험</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm font-semibold">부가가능 특약</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">(무)신보험료납입면제특약 (3대질병형)<br/>※선택특약은 주계약 월납보험료 50만원 초과시 가입불가하며, 주계약 보험료 납입기간 5·7·10년 선택시에만 가입가능</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm font-semibold">가입나이</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">만15세 ~ 70세</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm font-semibold">연금개시나이</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">55세 ~ 80세 ※ 『보험료 납입기간 + 최소거치기간 + 가입나이』가 연금개시나이 범위 이내이어야 함.</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm font-semibold">보험기간</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">연금개시 전 보험기간 : 계약일부터 연금개시나이 계약해당일 전일까지<br/>연금개시 후 보험기간 : 연금개시나이 계약해당일부터 종신까지</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm font-semibold">보험료 납입기간</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">5·7·10·12·15·20년납</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm font-semibold">보험료 납입주기</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">월납</td>
                </tr>
                                                 <tr>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm font-semibold">추가정보</td>
                    <td className="border border-gray-300 p-2 sm:p-3 text-xs sm:text-sm">최소거치기간 : 5년</td>
                </tr>
              </tbody>
            </table>
            </div>
            <div className="mt-4 text-sm">
              <div className="text-red-600">※ 계약인수 관련 사항은 회사가 별도로 정한 기준에 따라 제한될 수 있습니다.</div>
            </div>
          </div>
        </div>
      </div>

       {/* 보험료계산 안내 */}
       <div className="space-y-4">
         <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
           <div className="space-y-2 text-sm">
             <div>연령별 주계약 및 특약 보험료, 해약환급금 등 기타 자세한 정보는 보험료계산을 통해 확인하실 수 있습니다.</div>
           </div>
         </div>
       </div>
    </div>
  )
} 