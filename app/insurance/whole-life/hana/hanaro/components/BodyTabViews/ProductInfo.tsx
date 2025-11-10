import React from 'react'
import { useState } from 'react';

export default function ProductInfo() {
  const [showResultModal, setShowResultModal] = useState(false);

  return (
    <div className="space-y-8 px-2 sm:px-4 md:px-8 py-4 md:py-6">
      {/* 가입안내 제목 */}
      <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">가입안내</h2>

      {/* 상품명 및 상품유형 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">상품명 및 상품유형</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-gray-300 p-1 sm:p-2 md:p-3 text-xs sm:text-sm md:text-base">구분</th>
                <th className="border border-gray-300 p-1 sm:p-2 md:p-3 text-xs sm:text-sm md:text-base">상품명</th>
                <th className="border border-gray-300 p-1 sm:p-2 md:p-3 text-xs sm:text-sm md:text-base" colSpan={3}>상품유형</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2 md:p-3 text-center text-xs sm:text-sm md:text-base font-semibold" rowSpan={3}>주계약</td>
                <td className="border border-gray-300 p-1 sm:p-2 md:p-3 text-center text-xs sm:text-sm md:text-base leading-tight sm:leading-relaxed" rowSpan={3}>(무)하나로 THE 연결된 종신보험</td>
                <td className="border border-gray-300 p-1 sm:p-2 md:p-3 text-center text-xs sm:text-sm md:text-base leading-tight sm:leading-relaxed" rowSpan={2}>보장형 계약</td>
                <td className="border border-gray-300 p-1 sm:p-2 md:p-3 text-center text-xs sm:text-sm md:text-base leading-tight sm:leading-relaxed">1형(일반심사형)</td>
                <td className="border border-gray-300 p-1 sm:p-2 md:p-3 text-xs sm:text-sm md:text-base leading-tight sm:leading-relaxed">해약환급금 일부지급형, 일반형</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2 md:p-3 text-center text-xs sm:text-sm md:text-base leading-tight sm:leading-relaxed">2형(간편심사형)</td>
                <td className="border border-gray-300 p-1 sm:p-2 md:p-3 text-xs sm:text-sm md:text-base leading-tight sm:leading-relaxed">해약환급금 일부지급형, 일반형</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2 md:p-3 text-center text-xs sm:text-sm md:text-base leading-tight sm:leading-relaxed" colSpan={3}>적립형 계약</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2 md:p-3 text-center text-xs sm:text-sm md:text-base font-semibold" rowSpan={2}>선택특약</td>
                <td className="border border-gray-300 p-1 sm:p-2 md:p-3 text-center text-xs sm:text-sm md:text-base leading-tight sm:leading-relaxed">(무)3대질병 납입면제특약</td>
                <td className="border border-gray-300 p-1 sm:p-2 md:p-3 text-center text-xs sm:text-sm md:text-base leading-tight sm:leading-relaxed" colSpan={3}>일반심사형, 간편심사형</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2 md:p-3 text-center text-xs sm:text-sm md:text-base leading-tight sm:leading-relaxed">(무)3대질병진단 보험료환급특약</td>
                <td className="border border-gray-300 p-1 sm:p-2 md:p-3 text-center text-xs sm:text-sm md:text-base leading-tight sm:leading-relaxed" colSpan={3}>일반심사형, 간편심사형</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2 md:p-3 text-center text-xs sm:text-sm md:text-base font-semibold">제도성특약</td>
                <td className="border border-gray-300 p-1 sm:p-2 md:p-3 text-center text-xs sm:text-sm md:text-base leading-tight sm:leading-relaxed" colSpan={4}>(무)하나로 연결된 연금전환특약</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg space-y-2 text-sm">
          <p>*최초 가입시 주계약은 보장형 계약으로 체결됩니다.</p>
          <p>*일반형은 비교를 위한 종목으로 실제 판매하는 상품이 아닙니다.</p>
        </div>
      </div>

      {/* 상품 구성 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">상품 구성</h3>
        
        <h4 className="text-base font-semibold text-gray-600">· 주계약</h4>
        <p className="text-base font-semibold">(무)하나로 THE 연결된 종신보험(보장형 계약)</p>
        
        {/* 주계약 표 */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-gray-300 p-1 sm:p-2" rowSpan={3}>보험기간</th>
                <th className="border border-gray-300 p-1 sm:p-2" rowSpan={3}>납입기간</th>
                <th className="border border-gray-300 p-1 sm:p-2" colSpan={4}>가입나이</th>
                <th className="border border-gray-300 p-1 sm:p-2" rowSpan={3}>납입주기</th>
                <th className="border border-gray-300 p-1 sm:p-2" rowSpan={3}>가입금액</th>
              </tr>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-gray-300 p-1 sm:p-2" colSpan={2}>1형(일반심사형)</th>
                <th className="border border-gray-300 p-1 sm:p-2" colSpan={2}>2형(간편심사형)</th>
              </tr>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-gray-300 p-1 sm:p-2">남자</th>
                <th className="border border-gray-300 p-1 sm:p-2">여자</th>
                <th className="border border-gray-300 p-1 sm:p-2">남자</th>
                <th className="border border-gray-300 p-1 sm:p-2">여자</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2 text-center" rowSpan={5}>종신</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">5년납</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">만15세 ~ 60세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">만15세 ~ 64세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">30세 ~ 55세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">30세 ~ 60세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center" rowSpan={5}>월납</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center" rowSpan={5}>1천만원~최대 10억원<br />(10만원 단위)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">7년납</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">만15세 ~ 62세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">만15세 ~ 66세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">30세 ~ 57세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">30세 ~ 62세</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">10년납</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">만15세 ~ 65세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">만15세 ~ 69세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">30세 ~ 61세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">30세 ~ 65세</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">15년납</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">만15세 ~ 64세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">만15세 ~ 68세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">30세 ~ 59세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">30세 ~ 64세</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">20년납</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">만15세 ~ 60세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">만15세 ~ 64세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">30세 ~ 55세</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">30세 ~ 60세</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 선택특약 표 */}
        <h4 className="text-base font-semibold text-gray-600 mt-6">· 선택특약</h4>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-gray-300 p-1 sm:p-2" rowSpan={2}>특약 명칭</th>
                <th className="border border-gray-300 p-1 sm:p-2" rowSpan={2}>보험기간</th>
                <th className="border border-gray-300 p-1 sm:p-2" rowSpan={2}>납입기간</th>
                <th className="border border-gray-300 p-1 sm:p-2" rowSpan={2}>납입주기</th>
                <th className="border border-gray-300 p-1 sm:p-2" colSpan={2}>가입나이</th>
                <th className="border border-gray-300 p-1 sm:p-2" rowSpan={2}>가입금액</th>
              </tr>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-gray-300 p-1 sm:p-2">일반심사형</th>
                <th className="border border-gray-300 p-1 sm:p-2">간편심사형</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">(무)3대질병진단 보험료환급특약</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center" rowSpan={2}>5, 7, 10, 15, 20년 만기</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center" rowSpan={2}>전기납</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center" rowSpan={2}>월납</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center" colSpan={2} rowSpan={2}>주계약 가입나이와 동일</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">주계약의 총보험료</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">(무)3대질병 납입면제특약</td>
                <td className="border border-gray-300 p-1 sm:p-2 text-center">주계약 보험료</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg space-y-2 text-sm">
          <p>* (무)3대질병진단 보험료특약과 (무)3대질병 납입면제특약은 동시에 선택할 수 없습니다.</p>
          <p>* 선택특약의 납입기간, 납입주기 및 가입나이는 주계약과 동일하게 선택됩니다.</p>
        </div>
      </div>

      {/* 제도성 특약 */}
      <div className="space-y-4">
        <h4 className="text-base font-semibold text-gray-600">· 제도성 특약</h4>
        <p className="text-base font-semibold">(무)하나로 연결된 연금전환특약</p>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs sm:text-sm">
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 sm:p-3 bg-gray-100 font-semibold text-center w-[12%]" colSpan={2}>상품유형</td>
                <td className="border border-gray-300 p-2 sm:p-3 text-center" colSpan={2}>즉시형, 거치형</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 sm:p-3 bg-gray-100 font-semibold text-center" rowSpan={2} colSpan={2}>가입나이</td>
                <td className="border border-gray-300 p-2 sm:p-3 text-center" colSpan={2}>즉시형:35세~85세(단, 종신연금형:45세~85세)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 sm:p-3 text-center" colSpan={2}>거치형:20세~(연금지급개시나이-1)세</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 sm:p-3 bg-gray-100 font-semibold text-center" colSpan={2}>연금지급개시나이</td>
                <td className="border border-gray-300 p-2 sm:p-3 text-center" colSpan={2}>35세~85세(단, 종신연금형:45세~85세)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 sm:p-3 bg-gray-100 font-semibold text-center" colSpan={2}>연금지급형태</td>
                <td className="border border-gray-300 p-2 sm:p-3 text-center" colSpan={2}>종신연금형(10년보증, 20년보증, 100세보증)[정액형],<br />확정연금형(5년형, 10년형, 15년형, 20년형),<br />상속연금형</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 sm:p-3 bg-gray-100 font-semibold text-center w-[12%]" rowSpan={3}>보험기간</td>
                <td className="border border-gray-300 p-2 sm:p-3 bg-gray-100 font-semibold text-center w-[12%]">연금지급개시전</td>
                <td className="border border-gray-300 p-2 sm:p-3 text-center" colSpan={2}>보험계약일부터 연금지급개시나이 연계약해당일 전일까지</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 sm:p-3 bg-gray-100 font-semibold text-center" rowSpan={2}>연금지급개시후</td>
                <td className="border border-gray-300 p-2 sm:p-3 text-center w-[15%]">종신연금형,<br />상속연금형</td>
                <td className="border border-gray-300 p-2 sm:p-3 text-center">연금지급개시나이 연계약해당일부터 종신까지</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 sm:p-3 text-center">확정연금형</td>
                <td className="border border-gray-300 p-2 sm:p-3 text-center">연금지급개시나이 연계약해당일부터 확정연금의 최종 지급일까지</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 sm:p-3 bg-gray-100 font-semibold text-center" rowSpan={4} colSpan={2}>보험료</td>
                <td className="border border-gray-300 p-2 sm:p-3 text-center w-[15%]">납입주기</td>
                <td className="border border-gray-300 p-2 sm:p-3 text-center">일시납</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 sm:p-3 text-center" rowSpan={2}>기본보험료</td>
                <td className="border border-gray-300 p-2 sm:p-3 text-center">전환전계약의 지급금(해약환급금 또는 만기보험금)의 전부 또는 일부를 일시에 납입</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 sm:p-3 text-center">보험기간 중 '연금지급개시나이-2세' 연계약해당일까지 수시로 납입</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 sm:p-3 text-center">추가납입보험료</td>
                <td className="border border-gray-300 p-2 sm:p-3 text-center">*추가납입보험료 총 납입한도 = 기본보험료200% + 계약자적립액 인출금액의 합계(계약자적립액 인출금액은 기본보험료 계약자적립액의 인출금액, 추가납입보험료 계약자적립액의 인출금액을 포함)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg space-y-2 text-sm">
          <p>*(무)하나로 연결된 연금전환특약은 전환시의 기초서류 및 보험요율을 적용하며, 보험료는 전환일 현재 피보험자의 나이에 의하여 계산됩니다.</p>
          <p>*전환조건 등의 세부사항은 회사에서 정한 방침에 따릅니다.</p>
        </div>
      </div>

      {/* 상품의 유용한 기능 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">상품의 유용한 기능</h3>
        
        <h4 className="text-lg font-bold">유지보너스</h4>
        <p className="text-sm md:text-base">유지보너스는 계약일 이후 5년이 경과하고 유지보너스 발생일에 도달한 유효한 계약에 한하여 유지보너스 발생일에 납입기간별 유지보너스 금액을 적용이율을 적용하여 산출방법서에 정한 방법에 따라 적립합니다.</p>
        
        {/* (1) 납입기간 5년 */}
        <div className="space-y-2">
          <h4 className="text-base font-semibold">(1) 보험료 납입기간이 5년인 경우</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#1e3a8a] text-white">
                  <th className="border border-gray-300 p-2 text-center">구분</th>
                  <th className="border border-gray-300 p-2 text-center">발생일</th>
                  <th className="border border-gray-300 p-2 text-center">금액</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">유지보너스1</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">60회차 해당일*이후 최초로 도래하는 월계약해당일</td>
                  <td className="border border-gray-300 p-2">「"주계약 기본보험료x60x100.00%"에서 "계약일부터 7년이 경과된 월계약해당일 기준 기본보험료에 의한 해약환급금"을 차감한 금액」에 대해 적용이율을 연단위 복리로 2년간 할인한 금액</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">유지보너스2</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">120회차 해당일*이후 최초로 도래하는 월계약해당일</td>
                  <td className="border border-gray-300 p-2">"주계약 기본보험료x60x122.78%"에서 "유지보너스2 발생일 기준 기본보험료에 의한 해약환급금과 유지보너스1에 의한 해약환급금을 합산한 금액"을 차감한 금액</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">유지보너스3</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">180회차 해당일*이후 최초로 도래하는 월계약해당일</td>
                  <td className="border border-gray-300 p-2">"주계약 기본보험료x60x23.5%"에서 "유지보너스1 금액과 유지보너스2 금액"을 차감한 금액</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* (2) 납입기간 7년 */}
        <div className="space-y-2">
          <h4 className="text-base font-semibold">(2) 보험료 납입기간이 7년인 경우</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#1e3a8a] text-white">
                  <th className="border border-gray-300 p-2 text-center">구분</th>
                  <th className="border border-gray-300 p-2 text-center">발생일</th>
                  <th className="border border-gray-300 p-2 text-center">금액</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">유지보너스1</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">84회차 해당일*이후 최초로 도래하는 월계약해당일</td>
                  <td className="border border-gray-300 p-2">「"주계약 기본보험료x84x100.00%"에서 "유지보너스1 발생일 기준 기본보험료에 의한 해약환급금"을 차감한 금액</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">유지보너스2</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">120회차 해당일*이후 최초로 도래하는 월계약해당일</td>
                  <td className="border border-gray-300 p-2">"주계약 기본보험료x84x119.58"에서 "유지보너스2 발생일 기준 기본보험료에 의한 해약환급금과 유지보너스1에 의한 해약환급금을 합산한 금액"을 차감한 금액</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">유지보너스3</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">180회차 해당일*이후 최초로 도래하는 월계약해당일</td>
                  <td className="border border-gray-300 p-2">"주계약 기본보험료x84x25.5%"에서 "유지보너스1 금액과 유지보너스2 금액"을 차감한 금액</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* (3) 납입기간 10년 */}
        <div className="space-y-2">
          <h4 className="text-base font-semibold">(3) 보험료 납입기간이 10년인 경우</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#1e3a8a] text-white">
                  <th className="border border-gray-300 p-2 text-center">구분</th>
                  <th className="border border-gray-300 p-2 text-center">발생일</th>
                  <th className="border border-gray-300 p-2 text-center">금액</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">유지보너스1</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">120회차 해당일*이후 최초로 도래하는 월계약해당일</td>
                  <td className="border border-gray-300 p-2">"주계약 기본보험료x120x114.99%"에서 "유지보너스1 발생일 기준 기본보험료에 의한 해약환급금"을 차감한 금액</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">유지보너스2</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">180회차 해당일*이후 최초로 도래하는 월계약해당일</td>
                  <td className="border border-gray-300 p-2">"주계약 기본보험료x120x28.5%"에서 "유지보너스1 금액"을 차감한 금액</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* (4) 납입기간 15년 */}
        <div className="space-y-2">
          <h4 className="text-base font-semibold">(4) 보험료 납입기간이 15년인 경우</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#1e3a8a] text-white">
                  <th className="border border-gray-300 p-2 text-center">구분</th>
                  <th className="border border-gray-300 p-2 text-center">발생일</th>
                  <th className="border border-gray-300 p-2 text-center">금액</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">유지보너스1</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">60회차 해당일*이후 최초로 도래하는 월계약해당일</td>
                  <td className="border border-gray-300 p-2">주계약 기본보험료x60x9%</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">유지보너스2</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">180회차 해당일*이후 최초로 도래하는 월계약해당일</td>
                  <td className="border border-gray-300 p-2">주계약 기본보험료x180x25.5%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* (5) 납입기간 20년 */}
        <div className="space-y-2">
          <h4 className="text-base font-semibold">(5) 보험료 납입기간이 20년인 경우</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#1e3a8a] text-white">
                  <th className="border border-gray-300 p-2 text-center">구분</th>
                  <th className="border border-gray-300 p-2 text-center">발생일</th>
                  <th className="border border-gray-300 p-2 text-center">금액</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">유지보너스1</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">60회차 해당일*이후 최초로 도래하는 월계약해당일</td>
                  <td className="border border-gray-300 p-2">주계약 기본보험료x60x11%</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">유지보너스2</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">240회차 해당일*이후 최초로 도래하는 월계약해당일</td>
                  <td className="border border-gray-300 p-2">주계약 기본보험료x240x33%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg space-y-2 text-sm">
          <p>- 해당일*이라 함은 보험료 납입중에는 실제보험료 납입일(선납시 실제납입일이 아닌 해당회차 월계약해당일)을 말하며, 납입이 완료된 이후에는 월계약해당일을 말합니다.</p>
          <p>- 보험료 납입이 면제된 경우 보험료 납입기간 종료일까지 보험료가 납입된 것으로 하여 유지보너스를 계산합니다.</p>
          <p>- 기본보험료 금액이 변경될 경우에는 변경된 기본보험료 금액을 기준으로 계산합니다.</p>
        </div>
      </div>

      {/* 선납할인 */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold">선납할인</h3>
        <p className="text-sm md:text-base">3개월분(당월분 포함)이상의 보험료를 선납하는 경우에는 이 보험의 보험료 산출시 적용한 이율(10년 이내 연 2.75%, 10년 초과 연 1.75%)로 할인하며, 최대 12개월분(당월분 포함)까지 선납이 가능합니다.</p>
      </div>

      {/* 계약자적립액 인출 */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold">계약자적립액 인출(보장형 계약)</h3>
        <div className="space-y-2 text-sm md:text-base">
          <p>⁻ 계약자는 계약일 이후 1개월이 지난 후 부터 보험년도 기준 연 12회에 한하여 계약자적립액의 일부를 인출할 수 있습니다.</p>
          <p className="font-semibold">&lt;1회인출 한도&gt;=인출 당시 유지보너스에 의한 계약자적립액과 추가납입보험료에 의한 계약자적립액의 합산금액 이내</p>
          <p>⁻ 계약일부터 10년 이내에 인출하는 경우 계약일부터 각 인출시점까지의 인출금액의 합계는 계약자가 실제 납입한 보험료 총액(총납입한 기본보험료와 총납입한 추가납입보험료의 합계)을 초과할 수 없으며, 보험가입금액을 감액한 경우 감액후 기본보험료와 기본보험료 감액비율과 동일비율로 감액된 추가납입보험료 및 계약자적립액의 인출금액을 적용합니다.</p>
          <p>⁻ 계약자적립액을 인출할 경우 계약자적립액에서 인출금액을 차감하므로 해약환급금이 감소할 수 있습니다.</p>
        </div>
      </div>

      {/* 추가납입보험료 */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold">추가납입보험료(보장형 계약)</h3>
        <div className="space-y-2 text-sm md:text-base">
          <p>⁻ 보험기간 중 기본보험료 납입주기와 달리 수시로 추가납입보험료를 납입할 수 있습니다. 납입기간 중에는 해당월의 기본보험료가 납입된 경우에 한하여 추가납입보험료를 납입할 수 있습니다.(특약보험료는 추가납입보험료 납입한도에서 제외)</p>
          <p>⁻ 추가납입보험료는 적용이율(연2.5%)을 적용하여 산출방법서에서 정한 방법에 따라 적립합니다.</p>
          <p className="font-semibold">&lt;1회 납입 가능한 추가납입보험료 납입한도&gt;</p>
          <p>= 해당월까지 납입한 기본보험료 총액(선납포함)의 100% - 이미 납입한 추가납입보험료의 합계 + 계약자적립액의 인출금액의 합계 (계약자적립액의 인출금액은 유지보너스에 의한 계약자적립액 인출금액과 추가납입보험료에 의한 계약자적립액의 인출금액을 포함)</p>
        </div>
      </div>

      {/* 적립형 계약 전환 */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold">적립형 계약 전환</h3>
        <div className="space-y-2 text-sm md:text-base">
          <p>⁻ 이 상품은 가입시에 보장형 계약으로 체결되며, 다음의 조건을 모두 충족하는 유효한 보장형 계약의 경우 계약자는 적립형 계약으로 전환을 신청할 수 있습니다.</p>
          <div className="ml-4">
            <p>1. 보장형 계약의 보험료 납입이 완료된 계약</p>
            <p>2. 보장형 계약의 보험금 지급사유가 발생하지 않고 보험료 납입이 면제되지 않은 계약</p>
          </div>
          <p>⁻ 적립형 계약의 피보험자는 보장형 계약의 피보험자 또는 그의 배우자 또는 자녀로 합니다.</p>
          <p className="ml-4">(적립형 계약 전환일 기준의 보장형 계약 피보험자의 가족관계등록부 또는 주민등록상의 배우자 또는 자녀, 피보험자 나이 만 15세 이상)</p>
          <p>⁻ 계약자가 전환 신청시 회사는 전환 신청일부터 30일이내에 적립형 계약으로의 전환을 승낙 또는 거절하여야 하며, 30일 이내에 승낙 또는 거절의 통지가 없으면 승낙된 것으로 봅니다.</p>
          <p>⁻ 계약자가 적립형 계약 전환일 전일까지 적립형계약 전환 신청을 취소할 수 있으며, 적립형 계약 전환일 이후에는 전환 신청을 취소할 수 없습니다.</p>
          <p>⁻ 적립형 계약의 보장개시일은 적립형 계약 전환일로 하며, 그때부터 보장형 계약(부가된 특약 중 함께 전환을 신청한 특약 포함)은 더 이상 효력이 없습니다.</p>
        </div>
      </div>

      {/* 보험료 예시 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">보험료 예시</h3>
        <p className="text-sm md:text-base">이 상품은 "해약환급금 일부지급형"으로 보험료 납입기간 중 계약을 해지하는 경우 "일반형"의 해약환급금 대비 적은 해약환급금을 지급하는 대신 "일반형"보다 낮은 보험료로 동일한 보장을 받을 수 있도록 한 상품입니다.</p>
        <p className="text-sm md:text-base">아래 예시는 '해약환급금 일부지급형'과 '일반형'을 비교하였으니 보험료를 확인하시기 바랍니다.</p>
        <p className="text-sm text-gray-600">*일반형은 비교를 위한 종목으로 실제 판매하는 상품이 아닙니다.</p>

        {/* 주계약 */}
        <div className="space-y-2">
          <h4 className="text-base font-semibold text-gray-600">· 주계약</h4>
          <p className="text-xs text-gray-600 text-right">기준: 가입금액 5,000만원, 월납, 5년납 (단위:원)</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#1e3a8a] text-white">
                  <th className="border border-gray-300 p-2 text-center" rowSpan={3}>구분</th>
                  <th className="border border-gray-300 p-2 text-center" colSpan={4}>1형(일반심사형)</th>
                  <th className="border border-gray-300 p-2 text-center" colSpan={4}>2형(간편심사형)</th>
                </tr>
                <tr className="bg-[#1e3a8a] text-white">
                  <th className="border border-gray-300 p-2 text-center" colSpan={2}>해약환급금 일부지급형</th>
                  <th className="border border-gray-300 p-2 text-center" colSpan={2}>일반형*</th>
                  <th className="border border-gray-300 p-2 text-center" colSpan={2}>해약환급금 일부지급형</th>
                  <th className="border border-gray-300 p-2 text-center" colSpan={2}>일반형*</th>
                </tr>
                <tr className="bg-[#1e3a8a] text-white">
                  <th className="border border-gray-300 p-2 text-center">남자</th>
                  <th className="border border-gray-300 p-2 text-center">여자</th>
                  <th className="border border-gray-300 p-2 text-center">남자</th>
                  <th className="border border-gray-300 p-2 text-center">여자</th>
                  <th className="border border-gray-300 p-2 text-center">남자</th>
                  <th className="border border-gray-300 p-2 text-center">여자</th>
                  <th className="border border-gray-300 p-2 text-center">남자</th>
                  <th className="border border-gray-300 p-2 text-center">여자</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">30세</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">716,500</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">683,000</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">725,500</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">681,500</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">761,000</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">719,000</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">770,500</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">728,000</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">40세</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">794,500</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">756,000</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">804,500</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">765,500</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">845,000</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">797,000</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">855,500</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">807,000</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">50세</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">887,000</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">842,000</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">898,000</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">852,500</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">943,500</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">889,000</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">955,500</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">900,500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 선택특약 */}
        <h4 className="text-base font-semibold text-gray-600 mt-6">· 선택특약</h4>

        {/* (무)3대질병진단 보험료환급특약 */}
        <div className="space-y-2">
          <h4 className="text-base font-semibold">(무)3대질병진단 보험료환급특약</h4>
          <p className="text-xs text-gray-600 text-right">기준: 5년 만기, 전기납, 월납 (단위:원)</p>
          <div className="overflow-x-auto">
            <table className="min-w-[600px] w-full border-collapse text-[10px] sm:text-xs md:text-sm">
              <thead>
                <tr className="bg-[#1e3a8a] text-white">
                  <th className="border border-gray-300 p-1 sm:p-2 text-center" rowSpan={2} colSpan={2}>구분</th>
                  <th className="border border-gray-300 p-1 sm:p-2 text-center" colSpan={3}>남자</th>
                  <th className="border border-gray-300 p-1 sm:p-2 text-center" colSpan={3}>여자</th>
                </tr>
                <tr className="bg-[#1e3a8a] text-white">
                  <th className="border border-gray-300 p-1 sm:p-2 text-center">30세</th>
                  <th className="border border-gray-300 p-1 sm:p-2 text-center">40세</th>
                  <th className="border border-gray-300 p-1 sm:p-2 text-center">50세</th>
                  <th className="border border-gray-300 p-1 sm:p-2 text-center">30세</th>
                  <th className="border border-gray-300 p-1 sm:p-2 text-center">40세</th>
                  <th className="border border-gray-300 p-1 sm:p-2 text-center">50세</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center" rowSpan={2}>1형(일반심사형)</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">가입금액</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">42,990,000</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">47,670,000</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">53,220,000</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">40,980,000</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">45,360,000</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">50,520,000</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">보험료</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">5,718</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">13,967</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">31,985</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">4,467</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">8,210</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">15,055</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center" rowSpan={2}>2형(간편심사형)</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">가입금액</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">45,660,000</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">50,700,000</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">56,610,000</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">43,140,000</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">47,820,000</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">53,340,000</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">보험료</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">7,899</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">20,331</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">49,137</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">5,436</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">10,233</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">22,136</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-600">* 가입금액: 주계약 해약환급금 일부지급형의 총보험료</p>
        </div>

        {/* (무)3대질병 납입면제특약 */}
        <div className="space-y-2">
          <h4 className="text-base font-semibold">(무)3대질병 납입면제특약</h4>
          <p className="text-xs text-gray-600 text-right">기준: 5년 만기, 전기납, 월납 (단위:원)</p>
          <div className="overflow-x-auto">
            <table className="min-w-[600px] w-full border-collapse text-[10px] sm:text-xs md:text-sm">
              <thead>
                <tr className="bg-[#1e3a8a] text-white">
                  <th className="border border-gray-300 p-1 sm:p-2 text-center" rowSpan={2} colSpan={2}>구분</th>
                  <th className="border border-gray-300 p-1 sm:p-2 text-center" colSpan={3}>남자</th>
                  <th className="border border-gray-300 p-1 sm:p-2 text-center" colSpan={3}>여자</th>
                </tr>
                <tr className="bg-[#1e3a8a] text-white">
                  <th className="border border-gray-300 p-1 sm:p-2 text-center">30세</th>
                  <th className="border border-gray-300 p-1 sm:p-2 text-center">40세</th>
                  <th className="border border-gray-300 p-1 sm:p-2 text-center">50세</th>
                  <th className="border border-gray-300 p-1 sm:p-2 text-center">30세</th>
                  <th className="border border-gray-300 p-1 sm:p-2 text-center">40세</th>
                  <th className="border border-gray-300 p-1 sm:p-2 text-center">50세</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center" rowSpan={2}>1형(일반심사형)</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">가입금액</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">716,500</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">794,500</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">887,000</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">683,000</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">756,000</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">842,000</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">보험료</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">2,056</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">5,806</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">14,165</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">2,799</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">8,101</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">13,517</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center" rowSpan={2}>2형(간편심사형)</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">가입금액</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">761,000</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">845,000</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">943,500</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">719,000</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">797,000</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">889,000</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">보험료</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">3,049</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">8,748</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">22,188</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">3,942</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">10,933</td>
                  <td className="border border-gray-300 p-1 sm:p-2 text-center">19,578</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-600">* 가입금액: 주계약 해약환급금 일부지급형의 총보험료</p>
          <p className="text-xs text-red-600">* (무)3대질병진단 보험료환급특약과 (무)3대질병 납입면제특약은 동시에 선택할 수 없습니다.</p>
        </div>
      </div>
    </div>
  )
}
