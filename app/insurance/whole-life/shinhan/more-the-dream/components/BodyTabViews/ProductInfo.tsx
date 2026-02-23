import React from 'react'
import { useState } from 'react';

export default function ProductInfo() {
  const [showResultModal, setShowResultModal] = useState(false);

  return (
    <div className="space-y-8 px-2 sm:px-4 md:px-8 py-4 md:py-6">
      {/* 가입안내 제목 */}
      <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">가입안내</h2>

      {/* 보험종류 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">보험종류</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-gray-300 p-1 sm:p-2 md:p-3 text-xs sm:text-sm md:text-base">구분</th>
                <th className="border border-gray-300 p-1 sm:p-2 md:p-3 text-xs sm:text-sm md:text-base">명칭</th>
                <th className="border border-gray-300 p-1 sm:p-2 md:p-3 text-xs sm:text-sm md:text-base">보험종목</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2 md:p-3 text-center text-xs sm:text-sm md:text-base">주계약</td>
                <td className="border border-gray-300 p-1 sm:p-2 md:p-3 text-center text-xs sm:text-sm md:text-base leading-tight sm:leading-relaxed">신한(간편가입)모아더드림Plus종신보험<br />(무배당, 해약환급금 일부지급형) / <br />신한(간편가입)모아더드림Plus종신보험(무배당)</td>
                <td className="border border-gray-300 p-1 sm:p-2 md:p-3 text-center text-xs sm:text-sm md:text-base leading-tight sm:leading-relaxed">해약환급금 일부지급형/일반형<br />일반심사형/간편심사형</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg space-y-2 text-sm">
          <p>주1) 다만, "일반형"의 경우 "해약환급금 일부지급형"과 동일한 보장내용으로 해지율을 적용하지 않은 상품이며, 당사에서 판매하지 않고 "해약환급금 일부지급형"과 비교·안내를 위한 종목으로 운영합니다.</p>
          <p>주2) "간편심사형"의 경우 상품명 신한 다음에 "(간편가입)"을 부가합니다.</p>
        </div>
      </div>

      {/* 보험기간, 납입기간 및 피보험자 가입나이 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">보험기간, 납입기간 및 피보험자 가입나이</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-gray-300 p-1 sm:p-2 md:p-3 text-xs sm:text-sm md:text-base">구분</th>
                <th className="border border-gray-300 p-1 sm:p-2 md:p-3 text-xs sm:text-sm md:text-base">내용</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2 md:p-3 text-center text-xs sm:text-sm md:text-base font-semibold">보험기간</td>
                <td className="border border-gray-300 p-1 sm:p-2 md:p-3 text-xs sm:text-sm md:text-base leading-tight sm:leading-relaxed">종신</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2 md:p-3 text-center text-xs sm:text-sm md:text-base font-semibold">납입기간</td>
                <td className="border border-gray-300 p-1 sm:p-2 md:p-3 text-xs sm:text-sm md:text-base leading-tight sm:leading-relaxed">5년, 10년, 15년, 20년, 25년, 30년, 전기납(종신납)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 sm:p-2 md:p-3 text-center text-xs sm:text-sm md:text-base font-semibold">피보험자 가입나이</td>
                <td className="border border-gray-300 p-1 sm:p-2 md:p-3 text-xs sm:text-sm md:text-base leading-tight sm:leading-relaxed">만 20세 ~ 만 75세<br />(간편심사형: 만 40세 ~ 만 75세)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 보험료 납입주기 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">보험료 납입주기</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <th className="border border-gray-300 p-3 bg-[#1e3a8a] text-white w-24 md:w-40 text-sm md:text-base">납입주기</th>
                <td className="border border-gray-300 p-3 text-center text-sm md:text-base">월납</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 가입한도 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">가입한도</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-gray-300 p-3 text-sm md:text-base">구분</th>
                <th className="border border-gray-300 p-3 text-sm md:text-base">가입한도</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-3 text-center text-sm md:text-base">일반심사형</td>
                <td className="border border-gray-300 p-3 text-center text-sm md:text-base">1,000만원 ~ 30억원</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 text-center text-sm md:text-base">간편심사형</td>
                <td className="border border-gray-300 p-3 text-center text-sm md:text-base">1,000만원 ~ 20억원</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600">* 다만, 주계약 가입한도는 회사가 별도로 정한 기준에 따라 적용하며, 기존에 가입한 보험 가입내용 및 가입경로 등에 따라 주계약 가입한도는 조정될 수 있습니다.</p>
      </div>

      {/* 건강진단 여부 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">건강진단 여부</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <p className="text-sm md:text-base"><span className="text-[#1e3a8a]">신한(간편가입)모아더드림종신보험(무배당, 해약환급금 일부지급형)</span>의 경우 기존 다른 보험 상품의가입유무, 나이, 청약서의 계약 전 알릴 의무 사항에 따라 건강진단을 시행할 수 있으며, 그 결과에따라 보험가입 가능여부를 판정할 수 있습니다.</p>
        </div>
      </div>
    </div>
  )
}
