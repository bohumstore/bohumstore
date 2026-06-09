import React from 'react'
import { useState } from 'react';

export default function ProductInfo() {
  const [showResultModal, setShowResultModal] = useState(false);

  return (
    <div className="space-y-8 px-2 sm:px-4 md:px-8 py-4 md:py-6">
      {/* 보증여부에 따른 상품 비교 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">보증여부에 따른 상품 비교</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <p className="mb-4">무배당 오로지 연금을 위한 달러연금보험 (보증비용부과형)에 대해 계약자적립액을 최저보증하는 보증형과 보증하지 않는 미보증형을 판매하고 있습니다.</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-[#1e3a8a] text-white">
                  <th className="border border-gray-300 p-2"></th>
                  <th className="border border-gray-300 p-2">보증형</th>
                  <th className="border border-gray-300 p-2">미보증형</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 text-center font-bold">최저계약자적립액보증</td>
                  <td className="border border-gray-300 p-2 text-center">Ｏ</td>
                  <td className="border border-gray-300 p-2 text-center">X</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-4">* 보증비용부과형은 처음 가입 시 지급하기로 약속한 최저계약자적립액의 지급을 보증하기 위한 보증비용을 부과한다는 의미입니다.</p>
        </div>
      </div>

      {/* 가입안내 */}
      <div className="space-y-4">
        <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">가입안내</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-gray-300 p-2" rowSpan={3}>구분</th>
                <th className="border border-gray-300 p-2" rowSpan={3}>보험료<br />납입<br />기간</th>
                <th className="border border-gray-300 p-2" rowSpan={3}>가입나이</th>
                <th className="border border-gray-300 p-2" rowSpan={3}>연금지급<br />개시나이</th>
                <th className="border border-gray-300 p-2" rowSpan={3}>최소<br />거치<br />기간</th>
                <th className="border border-gray-300 p-2" colSpan={1}>최소보험료</th>
              </tr>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-gray-300 p-2" rowSpan={2}>월납</th>
              </tr>
              <tr className="bg-[#1e3a8a] text-white">
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 text-center font-bold" rowSpan={3}>보증형</td>
                <td className="border border-gray-300 p-2 text-center">5년납</td>
                <td className="border border-gray-300 p-2 text-center" rowSpan={3}>0세~70세</td>
                <td className="border border-gray-300 p-2 text-center" rowSpan={3}>(가입나이+20세)~90세</td>
                <td className="border border-gray-300 p-2 text-center">15년</td>
                <td className="border border-gray-300 p-2 text-center">200달러</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center">7년납</td>
                <td className="border border-gray-300 p-2 text-center">13년</td>
                <td className="border border-gray-300 p-2 text-center">150달러</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center">10년납</td>
                <td className="border border-gray-300 p-2 text-center">10년</td>
                <td className="border border-gray-300 p-2 text-center">100달러</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center font-bold" rowSpan={3}>미보증형</td>
                <td className="border border-gray-300 p-2 text-center">5년납</td>
                <td className="border border-gray-300 p-2 text-center" rowSpan={3}>0세~70세</td>
                <td className="border border-gray-300 p-2 text-center" rowSpan={3}>(가입나이+20세)~90세</td>
                <td className="border border-gray-300 p-2 text-center">15년</td>
                <td className="border border-gray-300 p-2 text-center">200달러</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center">7년납</td>
                <td className="border border-gray-300 p-2 text-center">13년</td>
                <td className="border border-gray-300 p-2 text-center">150달러</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center">10년납</td>
                <td className="border border-gray-300 p-2 text-center">10년</td>
                <td className="border border-gray-300 p-2 text-center">100달러</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="space-y-2 text-sm text-gray-600">
          <p>※ 가입나이 및 가입한도 등의 계약인수 관련 사항은 회사가 정한 기준에 따라 제한될 수 있습니다.</p>
          <p>※ 최소거치기간 : 납입기간 완료 후 연금지급 개시나이까지의 최소기간</p>
          <p>※ 연금지급 개시나이는 45세를 최저한도로 합니다.</p>
        </div>
      </div>

      {/* 최저계약자적립액 보증에 관한 사항 */}
      <div className="space-y-4">
        <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">최저계약자적립액 보증에 관한 사항 (보증형에 한함)</h2>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <p className="mb-4 text-sm leading-relaxed">
            최저계약자적립액 보증은 공시이율로 부리한 기본보험료에 의한 계약자적립액과 관계없이 최저계약자적립액 보증시점에 보증하는
            최저한도의 기본보험료에 의한 계약자적립액 보증으로서 이 보험의 "보험료 및 해약환급금 산출방법서"에서 정한 방법에 따라
            계산한 금액으로 한다.
          </p>
          <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="font-bold text-[#1e3a8a] mb-2">◉ 최저계약자적립액 보증금액 = 최저계약자적립액 보증기준금액 X 최저계약자적립액 보증비율</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-[#1e3a8a] text-white">
                  <th className="border border-gray-300 p-2">최저계약자적립액<br />보증기준금액</th>
                  <th className="border border-gray-300 p-2">최저계약자적립액<br />보증시점</th>
                  <th className="border border-gray-300 p-2" colSpan={3}>최저계약자적립액 보증비율</th>
                </tr>
                <tr className="bg-[#1e3a8a] text-white">
                  <th className="border border-gray-300 p-2"></th>
                  <th className="border border-gray-300 p-2"></th>
                  <th className="border border-gray-300 p-2">5년납</th>
                  <th className="border border-gray-300 p-2">7년납</th>
                  <th className="border border-gray-300 p-2">10년납</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 text-center" rowSpan={3}>보증시점 전일까지의<br />"기준 기본보험료"</td>
                  <td className="border border-gray-300 p-2">계약일로부터<br />7년 경과시점의 연계약해당일</td>
                  <td className="border border-gray-300 p-2 text-center">100%</td>
                  <td className="border border-gray-300 p-2 text-center">100%</td>
                  <td className="border border-gray-300 p-2 text-center">100%</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">계약일로부터<br />10년 경과시점의 연계약해당일</td>
                  <td className="border border-gray-300 p-2 text-center">130%</td>
                  <td className="border border-gray-300 p-2 text-center">127%</td>
                  <td className="border border-gray-300 p-2 text-center">120%</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">min(연금개시시점, 계약일로부터 30년 경과시점의<br />연계약해당일)</td>
                  <td className="border border-gray-300 p-2 text-center" colSpan={3}>
                    계약일로부터 10년 경과시점의 최저계약자적립액 보증비율<br />
                    + (min(연금개시 전 보험기간, 30년) - 10년) x 2.5%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="space-y-2 text-sm text-gray-600 mt-4">
            <p>※ "최저계약자적립액 보증시점"마다 각 시점까지 납입하기로 약정한 기본보험료 납입이 완료되지 않은 경우, "최저계약자적립액 보증시점"은 해당 기본보험료의 납입이 완료된 날로 하며, "최저계약자적립액 보증 기준금액"은 해당 기본보험료의 납입이 완료된 날까지의 "기준 기본보험료"를 말한다.</p>
            <p>※ 다만, 기본보험료에 의한 계약자적립액을 중도인출한 경우, "최저계약자적립액 보증금액"은 "기본보험료에 의한 계약자적립액 인출금액(인출 수수료 포함) 및 공시이율에 따라 해당 인출금액(인출수수료 포함)에 적립되는 이자"를 차감하여 계산하며, 해당 중도인출금액만큼 추가로 보험료를 납입하여도 보증금액이 원복되지 않습니다.</p>
          </div>
        </div>
      </div>

      {/* 보증비용 안내 */}
      <div className="space-y-4">
        <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">보증비용 안내</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-gray-300 p-2" colSpan={3} rowSpan={2}>구분</th>
                <th className="border border-gray-300 p-2" colSpan={3}>최저계약자적립액 보증비용 (매년)</th>
              </tr>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-gray-300 p-2">5년납</th>
                <th className="border border-gray-300 p-2">7년납</th>
                <th className="border border-gray-300 p-2">10년납</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 text-center font-bold" rowSpan={3}>보증형</td>
                <td className="border border-gray-300 p-2 text-center font-bold" rowSpan={3}>기본보험료<br />총액 비례</td>
                <td className="border border-gray-300 p-2">min(납입기간,7년) 이내</td>
                <td className="border border-gray-300 p-2 text-center">10.50%</td>
                <td className="border border-gray-300 p-2 text-center">7.40%</td>
                <td className="border border-gray-300 p-2 text-center">6.30%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">min(납입기간,7년) 이후 10년 이내</td>
                <td className="border border-gray-300 p-2 text-center">1.00%</td>
                <td className="border border-gray-300 p-2 text-center">1.60%</td>
                <td className="border border-gray-300 p-2 text-center">1.35%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">10년 이후</td>
                <td className="border border-gray-300 p-2 text-center">2.10%</td>
                <td className="border border-gray-300 p-2 text-center">2.10%</td>
                <td className="border border-gray-300 p-2 text-center">2.10%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center font-bold">미보증형</td>
                <td className="border border-gray-300 p-2 text-center" colSpan={2}>-</td>
                <td className="border border-gray-300 p-2 text-center">-</td>
                <td className="border border-gray-300 p-2 text-center">-</td>
                <td className="border border-gray-300 p-2 text-center">-</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600">* 기본보험료 총액 비례 : 계약자가 납입하기로 한 기본보험료 총액에 비례하여 부과합니다.</p>
      </div>

      {/* 추가납입보험료 */}
      <div className="space-y-4">
        <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">추가납입보험료</h2>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <p className="mb-4 text-sm">계약 성립 후부터 기본보험료 이외에 추가로 납입하는 보험료로, 추가납입보험료의 납입한도 및 납입조건은 아래와 같습니다.</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-[#1e3a8a] text-white">
                  <th className="border border-gray-300 p-2">구분</th>
                  <th className="border border-gray-300 p-2">납입한도</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">총 납입한도</td>
                  <td className="border border-gray-300 p-2">기본보험료 x 12 x 납입기간 x 200%</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">연간 납입 가능한<br />추가납입보험료 한도</td>
                  <td className="border border-gray-300 p-2">기본보험료 x 12 x 200%</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">1회 납입가능한<br />추가납입보험료 한도</td>
                  <td className="border border-gray-300 p-2">(기본보험료 × 경과월수 + 선납보험료) × 200%<br />- 이미 납입한 추가납입보험료의 합계</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="space-y-2 text-sm text-gray-600 mt-4">
            <p>※ 최소 추가납입보험료는 100달러이며, 1센트(1달러의 100분의 1) 단위로 납입할 수 있습니다. 단, (무)원화환산납입서비스특약의 [원화고정납입옵션]을 통해 납입되는 추가납입보험료는 상기 최소 추가납입보험료에 대한 제한이 적용되지 않습니다.</p>
            <p>※ 추가납입보험료로 납입할 수 있는 총 납입한도는 납입총액(기본보험료 × 12 × 납입기간)의 200%를 초과할 수 없습니다.</p>
            <p>※ 가입경과년수별 납입 가능한 추가납입보험료의 한도는 매년 기본보험료의 200%입니다. 가입 후 경과년수는 계약일 기준으로 매 1년이 지나는 때까지의 기간을 말합니다.</p>
            <p>※ 1회 납입 가능한 추가납입보험료는 해당 월까지의 납입한 기본보험료(선납보험료 포함)의 200%에서 이미 납입한 추가납입보험료의 합계를 차감한 금액 이내에서 납입할 수 있습니다.</p>
            <p>※ 계약자적립액의 인출이 있었을 경우에는 해당 인출금액만큼 추가로 보험료를 납입할 수 있습니다. 이 경우 추가로 납입한 보험료는 상기의 이미 납입한 추가납입보험료의 합계에 포함되지 않습니다.</p>
          </div>
        </div>
      </div>

      {/* 중도인출 */}
      <div className="space-y-4">
        <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">중도인출</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs md:text-sm">
            <tbody>
              <tr>
                <td className="border border-gray-300 p-3 bg-gray-100 font-bold w-1/4">인출가능시기</td>
                <td className="border border-gray-300 p-3">계약일 이후 1개월이 지난 후 연금지급 개시 전 보험기간</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 bg-gray-100 font-bold">인출가능금액</td>
                <td className="border border-gray-300 p-3">
                  <p className="mb-2"><strong>1회당 인출한도:</strong> 인출신청시점 해약환급금의 50% 범위 이내</p>
                  <p className="mb-1"><strong>기본보험료에 의한 계약자적립액 총 인출한도</strong></p>
                  <p className="ml-4">- 계약일로부터 7년 경과 이전: 계약자가 실제 납입한 기본보험료의 20% 이내</p>
                  <p className="ml-4">- 계약일로부터 7년 경과 이후: 계약자가 실제 납입한 기본보험료의 50% 이내</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="space-y-2 text-sm text-gray-600">
          <p className="text-red-600">※ 인출수수료는 인출금액의 0.2%와 2달러 중 적은 금액(단, 연4회까지는 인출수수료 면제)</p>
          <p>※ 단, 월계약해당일 기준 1개월 내 2회까지 인출가능</p>
          <p>※ 계약자적립액의 중도인출이 이루어졌을 경우 추가납입보험료에 의한 계약자적립액에서 우선적으로 인출하며, 추가납입보험료에 의한 계약자적립액이 부족한 경우에 한하여 기본보험료에 의한 계약자적립액에서 인출합니다.</p>
          <p className="text-red-600">※ 기본보험료에 의한 계약자적립액을 중도인출한 경우, "최저계약자적립액 보증금액"은 "기본보험료에 의한 계약자적립액 인출금액(인출 수수료 포함) 및 공시이율에 따라 해당 인출금액(인출수수료 포함)에 적립되는 이자"를 차감하여 계산하며, 해당 중도인출금액만큼 추가로 보험료를 납입하여도 보증금액이 원복되지 않습니다. (보증형에 한함)</p>
        </div>
      </div>

      {/* 연금개시 전, 생활자금 인출 */}
      <div className="space-y-4">
        <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">연금개시 전, 생활자금 인출 (정기 중도인출 서비스)</h2>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <p className="mb-4 text-sm">계약자는 계약자적립액 인출의 일환으로 다음에 정한 조건에 모두 해당되는 경우 생활자금인출서비스를 신청할 수 있습니다.</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs md:text-sm">
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-3 bg-gray-100 font-bold w-1/4">신청조건</td>
                  <td className="border border-gray-300 p-3">
                    <p>1. 보험료의 납입을 완료한 경우</p>
                    <p>2. 신청시점이 「연금지급 개시일 – 2년」 이전인 경우</p>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 bg-gray-100 font-bold">생활자금인출주기</td>
                  <td className="border border-gray-300 p-3">1개월, 3개월, 6개월, 1년 중 선택</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 bg-gray-100 font-bold">지급금액</td>
                  <td className="border border-gray-300 p-3">생활자금지급시에 계약자적립액 - 이미 납입한 보험료</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 연금개시 후, 노후행복자금 인출 */}
      <div className="space-y-4">
        <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">연금개시 후, 노후행복자금 인출</h2>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <p className="mb-4 text-sm leading-relaxed">
            연금지급 개시 시점의 계약자적립액 중 계약자가 선택한 일정비율의 계약자적립액을 연금으로 개시하지 않고
            자유롭게 노후생활에 필요한 목적자금(자녀결혼비용, 간병비, 부부여행자금 등)으로 활용할 수 있는 기능입니다.
          </p>
          <p className="text-sm font-semibold text-[#1e3a8a]">노후행복자금은 연 12회 범위 내에서 별도의 수수료 없이 인출하실 수 있습니다.</p>
        </div>
      </div>
    </div>
  )
}
