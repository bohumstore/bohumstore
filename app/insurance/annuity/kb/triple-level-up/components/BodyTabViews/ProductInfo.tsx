import React from 'react'
import { useState } from 'react';

export default function ProductInfo() {
  const [showResultModal, setShowResultModal] = useState(false);

  return (
    <div className="space-y-8 px-2 sm:px-4 md:px-8 py-4 md:py-6">
      {/* 가입안내 제목 */}
      <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2 ">가입안내</h2>

      {/* 상품 구성 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3 ">상품 구성</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center border-b border-gray-200 pb-4 ">
              <div className="w-32 font-bold text-[#1e3a8a]">주계약</div>
              <div className="flex-1 space-y-1">
                <div className="">KB 트리플 레벨업 연금보험 무배당(보증형)</div>
                <div className="">KB 트리플 레벨업 연금보험 무배당(미보증형)</div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center ">
              <div className="w-32 font-bold text-[#1e3a8a]">제도성특약</div>
              <div>지정대리 청구서비스특약</div>
            </div>
          </div>
        </div>
      </div>

      {/* 연금지급형태, 연금개시나이, 보험기간 및 납입주기 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3 ">연금지급형태, 연금개시나이, 보험기간 및 납입주기</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row border-b border-gray-200 pb-4 ">
              <div className="w-32 font-bold text-[#1e3a8a]">연금지급형태</div>
              <div className="flex-1">
                종신연금형<br />
                ~ 20년보증, 100세보증 또는 기대여명보증
              </div>
            </div>
            <div className="flex flex-col md:flex-row border-b border-gray-200 pb-4 ">
              <div className="w-32 font-bold text-[#1e3a8a]">연금개시나이</div>
              <div>45세 ~ 85세</div>
            </div>
            <div className="flex flex-col md:flex-row border-b border-gray-200 pb-4 ">
              <div className="w-32 font-bold text-[#1e3a8a]">보험기간</div>
              <div className="flex-1 space-y-4">
                <div>
                  <div className="font-bold">연금개시전 보험기간</div>
                  <div>보장개시일부터 연금지급개시 계약해당일 전일까지</div>
                </div>
                <div>
                  <div className="font-bold">연금개시후 보험기간</div>
                  <div>연금지급개시 계약해당일로부터 최종연금지급일까지</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row ">
              <div className="w-32 font-bold text-[#1e3a8a]">보험료납입주기</div>
              <div>월납</div>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg space-y-2 text-sm">
          <p>주1) 보험가입시점의 연금지급형태는 종신연금형으로 정해지며, 계약자는 연금지급개시전까지 약관에 따라 연금지급형태를 변경할 수 있습니다.</p>
          <p>주2) '기대여명’은 통계법 제18조(통계작성의 승인)에 의해 통계청장이 승인하여 고시하는 가입시점 통계표에 따른 피보험자의 성별ㆍ연령별 기대여명연수(소수점 이하는 버림)를 말하며, 피보험자의 연금개시나이를 기준으로 산출합니다. 다만, 기대여명이 5년 미만일 경우 기대여명은 5년으로 하며, 이 경우에는 관련 세제혜택이 제한될 수 있습니다.</p>
        </div>
      </div>

      {/* 보험료 납입기간, 최소거치기간 및 가입나이 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3 ">보험료 납입기간, 최소거치기간 및 가입나이</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-[#1e3a8a] text-white ">
                <th className="border border-gray-300 p-2">보험료납입기간</th>
                <th className="border border-gray-300 p-2">최소거치기간</th>
                <th className="border border-gray-300 p-2">가입나이</th>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td className="border border-gray-300 p-2 text-center">5년납</td>
                <td className="border border-gray-300 p-2 text-center">10년</td>
                <td className="border border-gray-300 p-3 text-center" rowSpan={3}>
                  0세 ~ MIN [연금개시나이- 15, 70] 세
                </td>
              </tr>
              <tr className="">
                <td className="border border-gray-300 p-2 text-center">7년납</td>
                <td className="border border-gray-300 p-2 text-center">8년</td>
              </tr>
              <tr className="">
                <td className="border border-gray-300 p-2 text-center">10년납</td>
                <td className="border border-gray-300 p-2 text-center">5년</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600">※ 최소거치기간 : 보험료 납입완료후 연금지급개시시점까지의 최소기간</p>
      </div>

      {/* 보험료에 관한 사항 */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3 ">보험료에 관한 사항</h3>
        {/* 기본보험료 */}
        <div className="space-y-4">
          <h4 className="text-lg font-bold text-[#1e3a8a] border-b border-[#1e3a8a] pb-2 ">기본보험료</h4>
          <table className="w-full border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-[#1e3a8a] text-white ">
                <th className="border border-gray-300 p-2">보험료납입기간</th>
                <th className="border border-gray-300 p-2">가입나이</th>
                <th className="border border-gray-300 p-2">최소보험료(1구좌당)</th>
                <th className="border border-gray-300 p-2">최대보험료(1구좌당)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td className="border border-gray-300 p-2 text-center">5년납</td>
                <td className="border border-gray-300 p-2 text-center">0세 ~ 70세</td>
                <td className="border border-gray-300 p-2 text-center">30만원</td>
                <td className="border border-gray-300 p-3 text-center" rowSpan={3}>100만원</td>
              </tr>
              <tr className="">
                <td className="border border-gray-300 p-2 text-center">7년납</td>
                <td className="border border-gray-300 p-2 text-center">0세 ~ 70세</td>
                <td className="border border-gray-300 p-2 text-center">20만원</td>
              </tr>
              <tr className="">
                <td className="border border-gray-300 p-2 text-center">10년납</td>
                <td className="border border-gray-300 p-2 text-center">0세 ~ 70세</td>
                <td className="border border-gray-300 p-2 text-center">10만원</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm text-gray-600">※ 구좌란 보험금과 보장내용 등을 관리하기 위한 계약의 단위를 의미하며, 구좌당 최소ㆍ최대 보험료 등은 보험 상품마다 차이가 있으므로 자세한 내용은 약관을 참고해 주시길 바랍니다.</p>
        </div>

        {/* 추가납입보험료 */}
        <div className="space-y-4">
          <h4 className="text-lg font-bold text-[#1e3a8a] border-b border-[#1e3a8a] pb-2 ">추가납입보험료</h4>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
            <p>(1) 추가납입보험료는 해당월까지 납입 가능한 기본보험료 납입총액(선납 포함)의 200%를 한도로 납입할 수 있으며, 중도인출에 관한 사항에 의한 인출금액이 있을 경우에는 그 금액만큼 추가로 납입가능합니다.</p>
            <p>(2) 추가납입보험료는 해당월까지 기본보험료가 납입된 경우에 한하여 납입할 수 있으며, 기본보험료와 같이 자동이체 서비스를 이용하여 추가납입을 하는 경우에는 기본보험료의 200%를 한도로 납입해야 합니다.</p>
            <p>(3) 중도인출에 관한 사항에 의한 인출금액이 있을 경우, 그 금액만큼 재납입하는 경우에도 추가납입보험료로 합니다.</p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg space-y-3">
            <div className="text-red-600">[보험료 추가납입제도 안내]</div>
            <div className="text-red-600 space-y-2">
              <p>- 이 보험계약은 기본보험료 이외에 보험기간중에 추가로 납입할 수 있는 추가적립보험료 납입제도를 운영하고 있으며, 이미 보유하고 있는 저축성보험에 추가납입 하실 경우 사업비 절감효과로 새로운 저축성보험에 추가가입하는 것 보다 해약환급률 및 만기환급률을 높일 수 있습니다.</p>
              <p>- 다만, 추가납입한도 및 횟수, 납입가능 기간 등은 해당상품에 따라 제한될 수 있습니다.</p>
              <p>- 자세한 사항은 약관내용을 참조하시기 바랍니다.</p>
            </div>
          </div>
        </div>

        {/* 중도인출에 관한 사항 */}
        <div className="space-y-4">
          <h4 className="text-lg font-bold text-[#1e3a8a] border-b border-[#1e3a8a] pb-2 ">중도인출에 관한 사항</h4>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
            <p>(1) 연금개시전 보험기간 중 보험년도 기준 년12회(일 또는 월 횟수 제한 없음)에 한하여 1회당 인출신청시점 해약환급금(보험계약대출원금과 이자를 차감한 금액)의 80%범위 이내에서 연금계약 계약자적립액의 일부를 인출할 수 있습니다. 단, 인출금액은 10만원 이상 만원단위로 인출할 수 있습니다.</p>
            <p>(2) 연금계약 계약자적립액의 일부를 인출하기 위해서는 인출후 연금계약 계약자적립액(보험계약대출원금과 이자를 차감한 금액)이 1구좌당 300만원 이상이어야 합니다.</p>
            <p>(3) 계약일로부터 10년 이내에 연금계약 계약자적립액의 일부를 인출하는 경우 각 인출시점까지의 인출금액 총합계는 이미 납입한 보험료를 초과할 수 없습니다.</p>
            <p>(4) 중도인출은 추가납입보험료 계약자적립액에서 우선적으로 가능하며, 추가납입보험료 계약자적립액이 부족한 경우에 한하여 기본보험료 계약자적립액에서 인출할 수 있습니다.</p>
            <p>(5) 연금계약 계약자적립액의 일부를 인출하는 경우 수수료는 없으며, 인출된 금액은 연금계약의 계약자적립액에서 차감합니다.</p>
            <p className="text-red-600">(6) 연금계약 계약자적립액 인출 시 인출금액 및 인출금액에 적립되는 이자만큼 연금계약 계약자적립액에서 차감하여 지급하므로 연금액 및 해약환급금이 감소할 수 있습니다.</p>
          </div>
        </div>
      </div>

      {/* 최저사망적립금에 관한 사항 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3 ">최저사망적립금에 관한 사항</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <p>최저사망적립액이라 함은 「연금개시전 보험기간」 동안 피보험자 사망시 공시이율로 부리한 계약자적립액과 관계없이 보장하는 최저한도의 계약자적립액으로서 사망시점의 이미 납입한 보험료를 말합니다.</p>
        </div>
      </div>

      {/* 트리플 레벨업 보증에 관한 사항 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3 ">트리플 레벨업 보증에 관한 사항(보증형에 한함)</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <p className="mb-6">트리플 레벨업 보증이라 함은 공시이율로 부리한 계약자적립액과 관계없이 트리플 레벨업 보증시점에 보장하는 최저한도의 기본보험료 계약자적립액 보증으로서, 이 보험의 「보험료 및 해약환급금 산출방법서」에서 정한 방법에 따라 계산한 금액으로 합니다.</p>
        
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="text-center font-bold mb-4 text-[#1e3a8a]">트리플 레벨업 보증금액 = 트리플 레벨업 보증 기준금액 X 트리플 레벨업 보증비율</div>
            <table className="w-full border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-[#1e3a8a] text-white ">
                  <th className="border border-gray-300 p-2">트리플 레벨업<br />보증시점</th>
                  <th className="border border-gray-300 p-2">트리플 레벨업<br />보증 기준금액</th>
                  <th className="border border-gray-300 p-2" colSpan={3}>트리플 레벨업 보증비율</th>
                </tr>
                <tr className="bg-[#1e3a8a] text-white ">
                  <th className="border border-gray-300 p-2" colSpan={2}></th>
                  <th className="border border-gray-300 p-2">5년납</th>
                  <th className="border border-gray-300 p-2">7년납</th>
                  <th className="border border-gray-300 p-2">10년납</th>
                </tr>
              </thead>
              <tbody>
                <tr className="">
                  <td className="border border-gray-300 p-2">계약일부터 7년<br />경과시점의 연계약해당일</td>
                  <td className="border border-gray-300 p-3" rowSpan={2}>보증시점 전일까지의<br />"기초 기본보험료"</td>
                  <td className="border border-gray-300 p-2 text-center">100%</td>
                  <td className="border border-gray-300 p-2 text-center">100%</td>
                  <td className="border border-gray-300 p-2 text-center">100%</td>
                </tr>
                <tr className="">
                  <td className="border border-gray-300 p-2">계약일부터 10년<br />경과시점의 연계약해당일</td>
                  <td className="border border-gray-300 p-2 text-center">130%</td>
                  <td className="border border-gray-300 p-2 text-center">125%</td>
                  <td className="border border-gray-300 p-2 text-center">120%</td>
                </tr>
                <tr className="">
                  <td className="border border-gray-300 p-2">연금개시시점</td>
                  <td className="border border-gray-300 p-3 text-center" colSpan={4}>
                    계약일부터 10년 경과시점의 트리플 레벨업 보증비율<br />
                    + ("연금개시전 보험기간" - 10(년)) × 2%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <p>단, “트리플 레벨업 보증시점” 마다 각 시점까지 납입하기로 약정한 기본보험료 납입이 완료되지 않은 경우, “트리플 레벨업 보증시점”은 해당 기본보험료의 납입이 완료된 날로 하며, “트리플 레벨업 보증 기준금액”은 해당 기본보험료의 납입이 완료된 날까지의 “기준 기본보험료”를 말합니다.</p>
            <p className="text-red-500">※ 트리플 레벨업 보증 기준금액은 감액 또는 중도인출이 발생한 경우 기본보험료 계약자적립액에 비례하여 감소하며, 중도인출금액을 재납입하더라도 원복되지 않습니다.</p>
            <p className="text-red-600">※ 연금개시시점의 트리플 레벨업 보증은 연금을 개시할 경우에만 적용되며, 연금을 개시하지 않을 경우 보증되지 않습니다.</p>
          </div>
        </div>
      </div>

      {/* 연금지급개시시점의 연금계약 계약자적립금에 관한 사항 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3 ">연금지급개시시점의 연금계약 계약자적립금에 관한 사항</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
          <p>(1) 보증형 : 연금지급개시시점의 기본보험료 계약자적립액이 트리플 레벨업 보증에 관한 사항(보증형에 한함)에 의한 연금개시시점 트리플 레벨업 보증금액 이하일 경우 연금개시시점 트리플 레벨업 보증금액을 기본보험료 계약자적립액의 최저한도로 하여 연금계약 계약자적립액을 구합니다.</p>
          <p>(2) 미보증형 : 연금지급개시시점의 연금계약 계약자적립액이 「이미 납입한 보험료(연금계약 계약자적립액의 인출이 있었을 때에는 이를 차감한 금액) + 1,000원」이하일 경우 「이미 납입한 보험료(연금계약 계약자적립액의 인출이 있었을 때에는 이를 차감한 금액) + 1,000원」으로 합니다.</p>
        </div>
      </div>
    </div>
  )
}
