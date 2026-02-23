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
                <th className="border border-gray-300 p-3 text-sm md:text-base">구분</th>
                <th className="border border-gray-300 p-3 text-sm md:text-base">명칭</th>
                <th className="border border-gray-300 p-3 text-sm md:text-base">보험종목</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-3 text-center text-sm md:text-base">주계약</td>
                <td className="border border-gray-300 p-3 text-center text-sm md:text-base">동양생명 new알뜰플러스종신보험<br />(무배당, 해약환급금 일부지급형)</td>
                <td className="border border-gray-300 p-3 text-center text-sm md:text-base">해약환급금 일부지급형<br />일반심사형/간편심사형(회사 기준)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg space-y-2 text-sm">
          <p>주) 본 상품은 해약환급금 일부지급형으로, 중도 해지 시 환급금이 일반형 대비 적을 수 있습니다.</p>
          <p>주) 간편심사형/일반심사형의 가입 가능 여부 및 조건은 회사 심사기준에 따릅니다.</p>
        </div>
      </div>

      {/* 보험기간, 납입기간 및 피보험자 가입나이 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">보험기간, 납입기간 및 피보험자 가입나이</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#1e3a8a] text-white">
                <th className="border border-gray-300 p-3 text-sm md:text-base" colSpan={3}>구 분</th>
                <th className="border border-gray-300 p-3 text-sm md:text-base">보험기간</th>
                <th className="border border-gray-300 p-3 text-sm md:text-base">납입기간</th>
                <th className="border border-gray-300 p-3 text-sm md:text-base">가입나이</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-3 text-center text-sm md:text-base" rowSpan={2}>주계약</td>
                <td className="border border-gray-300 p-3 text-center text-sm md:text-base">동양생명 new알뜰플러스종신보험<br />(무배당, 해약환급금 일부지급형)</td>
                <td className="border border-gray-300 p-3 text-center text-sm md:text-base">일반심사형</td>
                <td className="border border-gray-300 p-3 text-center text-sm md:text-base" rowSpan={2}>종신</td>
                <td className="border border-gray-300 p-3 text-center text-sm md:text-base" rowSpan={2}>5/7/10년납</td>
                <td className="border border-gray-300 p-3 text-center text-sm md:text-base">회사 기준</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 text-center text-sm md:text-base">동양생명 new알뜰플러스종신보험<br />(무배당, 해약환급금 일부지급형)</td>
                <td className="border border-gray-300 p-3 text-center text-sm md:text-base">간편심사형</td>
                <td className="border border-gray-300 p-3 text-center text-sm md:text-base">회사 기준</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600">* 만나이가 아닌 나이는 보험나이를 말합니다. 보험나이에 대한 설명은 약관을 참고하시기 바랍니다.</p>
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
                <td className="border border-gray-300 p-3 text-center text-sm md:text-base">회사 기준</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 text-center text-sm md:text-base">간편심사형</td>
                <td className="border border-gray-300 p-3 text-center text-sm md:text-base">회사 기준</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600">* 주계약 가입한도는 회사 내부 기준 및 심사 결과에 따라 달라질 수 있습니다.</p>
      </div>

      {/* 건강진단 여부 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">건강진단 여부</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <p className="text-sm md:text-base"><span className="text-[#1e3a8a]">동양생명 new알뜰플러스종신보험(무배당, 해약환급금 일부지급형)</span>의 경우 기존 다른 보험 가입내역, 나이, 계약 전 알릴 의무 사항에 따라 건강진단이 필요할 수 있으며, 결과에 따라 가입 가능 여부가 결정됩니다.</p>
        </div>
      </div>
    </div>
  )
}
