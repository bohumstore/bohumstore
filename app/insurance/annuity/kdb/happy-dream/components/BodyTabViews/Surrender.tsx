import React from 'react'

export default function JoinNotice() {
  return (
    <div className="space-y-8 px-2 sm:px-4 md:px-8 py-4 md:py-6">
      <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">가입시 알아두실 사항</h2>

      {/* 보험계약의 기본사항 확인 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">보험계약의 기본사항 확인</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <p className="text-gray-700">계약자께서는 보험계약을 청약할 때 보험상품명, 보험기간, 보험료, 보험료납입기간, 피보험자 등을 반드시 확인하시기 바랍니다.</p>
        </div>
      </div>

      {/* 설명의무에 대한 안내 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">설명의무에 대한 안내</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <p className="text-gray-700">당사 및 모집종사자는 해당 상품에 대해 충분히 설명할 의무가 있으며, 계약자는 가입에 앞서 이에 대한 충분한 설명을 받으시기 바랍니다.</p>
        </div>
      </div>

      {/* 자필서명(전자서명 포함)의 중요성 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">자필서명(전자서명 포함)의 중요성</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <p className="text-gray-700">청약시 청약서 자필서명란에는 반드시 계약자와 피보험자 본인이 직접 서명하셔야만 보험금 지급이 보장됩니다.</p>
        </div>
      </div>

      {/* 계약 전 알릴 의무 위반시 불이익 사항 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">계약 전 알릴 의무 위반시 불이익 사항</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <p className="text-gray-700">피보험자의 건강상태, 직업 등 청약서에서 질문한 사항에 대하여 사실대로 알려야 합니다. 그렇지 않은 경우 보험금 지급이 거절되거나 계약이 해지될 수 있으며, 계약이 해지 된 경우 해약환급금을 지급합니다.</p>
        </div>
      </div>

      {/* 청약철회 청구제도 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">청약철회 청구제도</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <p className="text-gray-700">보험계약자는 보험증권을 받은 날부터 15일 이내(청약을 한 날부터 30일 이내(65세 이상 계약자가 전화를 이용하여 계약을 체결한 경우 청약을 한 날부터 45일 이내)에 한함)에 청약을 철회할 수 있으며, 이 경우 철회를 접수한 날부터 3영업일 이내에 보험료를 돌려 드립니다. 단, 회사가 건강상태 진단을 지원하는 계약, 보험기간이 90일 이내인 계약 또는 전문금융소비자가 체결한 계약은 청약을 철회할 수 없습니다. 청약철회 기간내에 청약철회를 하실 경우 납입한 보험료 전액을 돌려받으실 수 있습니다.</p>
        </div>
      </div>

      {/* 품질보증해지제도 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">품질보증해지제도</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <p className="text-gray-700">보험계약을 체결할 때 청약서에 자필서명(전자서명 포함)을 하지 않았거나 청약할 때 약관과 계약자 보관용 청약서를 전달받지 못한 경우 또는 약관의 중요한 내용을 설명받지 못한 경우에는 계약자는 계약이 성립한 날부터 3개월 이내에 계약을 취소할 수 있으며, 납입한 보험료 전액과 정해진 이자를 지급합니다.</p>
        </div>
      </div>

      {/* 위험직종에 따른 가입거절 및 제한 안내 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">위험직종에 따른 가입거절 및 제한 안내</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <p className="text-gray-700">피보험자의 건강상태나 직업(위험직종) 등에 따라 가입이 거절되거나 제한될 수 있으며, 고의사고, 가입전에 발생한 보험사고는 보장되지 않습니다.</p>
        </div>
      </div>

      {/* 기존계약 해지후 가입시 불이익사항에 대한 안내 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">기존계약 해지후 가입시 불이익사항에 대한 안내</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <p className="text-gray-700">기존에 체결했던 계약을 해지하고 다른 계약을 체결하는 경우에는 계약체결의 거부 또는 보험료 등 금융소비자의 지급비용이 인상되거나 보장내용이 변경될 수 있습니다.</p>
        </div>
      </div>

      {/* 해약환급금이 납입보험료보다 적은 이유 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">해약환급금이 납입보험료보다 적은 이유</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <p className="text-gray-700">보험은 은행의 저축과는 달리 위험보장과 저축을 겸하는 제도로서, 계약자가 납입한 보험료 중 일부는 불의의 사고를 당한 다른 가입자에게 보험금으로 지급되며, 또 다른 일부는 보험회사의 운영에 필요한 경비로 사용되므로 중도 해지시 지급되는 해약환급금은 납입한 보험료보다 적거나 없을 수도 있습니다.</p>
        </div>
      </div>

      {/* 실적배당형 상품에 대한 안내 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">실적배당형 상품에 대한 안내</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <p className="text-red-600">이 상품은 실적배당형 상품이므로 보험금 및 해약환급금이 특별계정의 운용실적에 따라 변동됩니다. 운용결과에 따라 납입원금의 손실이 발생할 수 있으며, 그 손실은 모두 계약자에게 귀속됩니다. 중도해지시 해약환급금에 대한 최저보증이 없으므로 원금손실이 발생할 수 있으며, 그 손실은 모두 계약자에게 귀속됩니다.</p>
        </div>
      </div>

      {/* 중도해지시 손실안내 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">중도해지시 손실안내</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <p className="text-red-600">중도해지시 해약환급금에 대한 최저보증이 없으므로 원금손실이 발생할 수 있으며, 그 손실은 모두 계약자에게 귀속됩니다.</p>
        </div>
      </div>

      {/* 예금자보호안내 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">예금자보호안내</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <p className="text-gray-700"><span className="text-red-600">이 보험계약은 예금자보호법에 의해 보호되지 않습니다.</span> 다만, 약관에서 보험회사가 최저보증하는 보험금 및 특약에 한하여 예금자보호법에 따라 보호됩니다. 보호한도는 해약환급금(또는 만기 시 보험금)에 기타지급금을 합하여 1인당 "5천만원까지"(본 보험회사의 여타 보호상품과 합산)이며, 이와 별도로 본 보험회사 보호상품의 사고보험금을 합산하여 1인당 "5천만원까지" 입니다. 다만, 보험계약자 및 보험료 납부자가 법인인 보험 계약은 「예금자보호법」에 따라 보호되지 않습니다.</p>
        </div>
      </div>

      {/* 광고관련 절차의 준수에 관한 사항 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">광고관련 절차의 준수에 관한 사항</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <p className="text-gray-700">본 안내는 법령 및 내부통제기준에 따른 광고관련 절차를 준수하여 제작되었습니다.</p>
        </div>
      </div>

      {/* 보험상담 및 분쟁조정 안내 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">보험상담 및 분쟁조정 안내</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <p className="text-gray-700">이 계약과 관련하여 문의사항 또는 불만(민원)이 있을 경우 해당 보험모집자나 콜센터(1588-4040) 또는 인터넷 홈페이지(www.kdblife.co.kr)에 문의할 수 있고, 분쟁이 발생한 경우에는 금융감독원, 1372 소비자상담센터 등의 도움을 받을 수 있습니다. 분쟁조정 과정에서 계약자는 관계 법령에 정하는 바에 따라 회사가 기록 및 유지·관리하는 자료의 열람(사본의 제공 또는 청취를 포함)을 요구할 수 있습니다. 단, 분쟁조정의 신청이후 또는 조정신청 사건의 처리절차의 진행 중에 일방당사자가 소를 제기한 경우에는 그 조정절차가 중지될 수 있습니다.</p>
          </div>
          <div className="mt-4">
            <table className="w-full border border-gray-200">
              <tbody>
                <tr>
                  <td className="w-1/2 align-top text-center border-r border-gray-200 py-4">
                    <div>당사 보험상담안내</div>
                    <div className="mt-1">1588 - 4040(전국)</div>
                  </td>
                  <td className="w-1/2 align-top text-center py-4">
                    <div>금융감독원 민원상담전화</div>
                    <div className="mt-1">(국번없이) 1332</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="text-sm text-red-600 mt-8">
        이 상품에 대한 보다 자세한 사항은 계약 체결 전에 보험약관 및 상품설명서를 반드시 확인하시기 바랍니다.
      </div>

      {/* 메타리치 보험스토어 안내 */}
      <div className="mt-8 pt-4 border-t border-gray-200 space-y-2 text-sm text-gray-600">
        <div>※ ㈜메타리치 보험스토어는 다수의 보험사와 계약 체결 및 대리·중개하는 대리점입니다.</div>
        <div>※ ㈜메타리치 보험스토어는 보험사로부터 보험계약체결권을 부여받지 아니한 금융상품판매 대리·중개업자임을 알려드립니다.</div>
        <div>※ ㈜메타리치 보험스토어는 금융소비자 보호에 관한 법률 및 회사 내부 통제기준에 따른 광고 관련 절차를 준수하고 있습니다.</div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-right">
            <span>㈜메타리치 대리점등록번호 : 2023070016</span>
          </div>
        </div>
      </div>
    </div>
  )
} 