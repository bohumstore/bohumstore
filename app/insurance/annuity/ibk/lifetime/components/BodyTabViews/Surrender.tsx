import React from 'react'

export default function JoinNotice() {
  return (
    <div className="space-y-8 px-2 sm:px-4 md:px-8 py-4 md:py-6">
      <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">가입시 알아두실 사항</h2>

      {/* 일반금융소비자 권리 안내 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">일반금융소비자 권리 안내</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <p className="text-gray-700">일반금융소비자는 회사등으로부터 충분한 설명을 받을 권리가 있으며, 그 설명을 이해한 후 거래할 것을 권고합니다.</p>
        </div>
      </div>

      {/* 상품 특성 및 위험 안내 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">상품 특성 및 위험 안내</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-3 text-sm text-gray-700">
            <div className="text-red-600">● 이 상품은 실적 배당형 상품으로 운용결과에 따라 납입원금의 손실이 발생 할 수 있으며, 그 손실은 가입자에게 귀속됩니다.</div>
            <div className="text-red-600">● 과거운용실적 또는 투자수익률 가정에 따른 해약환급금, 보험금 예시가 미래의 수익을 보장하는 것은 아닙니다.</div>
            <div className="text-red-600">● 납입한 보험료 중 사업비(계약체결비용 및 계약관리비용)를 차감한 금액만 특별계정에서 운용됩니다.</div>
            <div className="text-red-600">● 이 보험계약은 예금자보호법에 따라 보호되지 않습니다. 다만, 약관에서 보험회사가 최저보증하는 보험금(보증형인 경우 : 최저사망계약자적립액 및 실적 배당 종신연금 / 미보증형인 경우 : 최저사망계약자적립액) 및 특약에 한하여 예금자보호법에 따라 보호됩니다. 보호 한도는 해약환급금(또는 만기 시 보험금)에 기타지급금을 합하여 1인당 "5천만원까지"(본 보험회사의 여타 보호상품과 합산)이며, 이와 별도로 본 보험회사 보호상품의 사고보험금을 합산하여 1인당 "5천만원까지" 입니다. (단, 보험계약자 및 보험료납부자가 법인인 경우에는 보호되지 않습니다.)</div>
            <div className="text-red-600">(※단, 2025년 9월 1일부터 해당 보호 한도가 1억원으로 상향됩니다.)</div>
            <div className="text-red-600">● 중도해지시 해약환급금에 대한 최저보증이 없으므로 원금손실이 발생할 수 있으며, 그 손실은 모두 계약자에게 귀속됩니다.</div>
          </div>
        </div>
      </div>

      {/* 계약 체결 시 주의사항 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">계약 체결 시 주의사항</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-3 text-sm text-gray-700">
            <div>● 청약시에는 보험계약의 기본사항을 반드시 확인하시기 바랍니다. 계약자께서는 보험계약 청약시에 보험상품명, 보험기간, 보험료, 보험료 납입기간, 피보험자 등을 반드시 확인하시고 보험상품 내용을 설명 받으시기 바랍니다.</div>
            <div>● 계약전 알릴 의무를 준수하셔야 하며 반드시 자필서명을 하셔야 합니다. 계약자 또는 피보험자는 보험계약 청약시 청약서에 질문한 사항(계약전 알릴사항)에 대하여 사실대로 알려야 하며 계약자 및 피보험자는 청약서 상의 자필서명란에 반드시 본인이 자필서명을 하셔야 합니다. 그렇지 않은 경우 보험금의 지급이 거절되거나 계약이 무효로 처리될 수 있습니다.</div>
            <div>● 계약자는 보험증권을 받은 날부터 15일 이내(청약을 한날부터 30일 이내에 한함)에 청약을 철회할 수 있습니다. 이 경우 회사는 청약의 철회를 접수한 날부터 3영업일 이내에 보험료를 돌려드립니다. 다만, 회사가 건강상태 진단을 지원하는 계약, 보험기간이 90일 이내인 계약 또는 전문금융소비자가 체결한 계약은 철회 할 수 없습니다. 청약철회 기간 내에 청약철회를 하실 경우 납입한 보험료 전액을 돌려받으실 수 있습니다.</div>
            <div>● 모집종사자가 계약에 관한 중요내용의 설명 등을 잘 이행했는지 확인하시기 바랍니다. 청약서상에 자필서명, 계약자보관용 청약서 및 약관전달과 약관의 주요내용 설명 등을 이행하지 아니한 계약에 대하여는 계약자가 계약이 성립한 날부터 3개월 이내에 계약을 취소할 수 있습니다.</div>
          </div>
        </div>
      </div>

      {/* 상품 특성 및 세제 안내 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">상품 특성 및 세제 안내</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-3 text-sm text-gray-700">
            <div className="text-red-600">● 은행의 예금·적금과 다릅니다. 이 보험계약은 납입보험료에 보험회사가 경비로 사용하는 사업비가 포함되어 있는 보험상품으로 은행의 연금신탁 또는 예금, 적금과 다릅니다.</div>
            <div>● 보험료 산출기초에 관한 사항 이 보험의 보험료 산출시 적용되는 이율은 연 단위 복리 2.75%입니다. 단,보험료 산출시 적용되는 이율이 계약자 적립액 및 해약환급금을 보증하는 이율은 아닙니다.</div>
            <div>※ 보험료 산출기초가 되는 이율, 위험률, 계약체결비용 및 계약관리비용은 이 보험의 상품요약서에서 보다 자세히 확인하실 수 있습니다.</div>
            <div>● 이 상품은 무배당 보험으로 배당이 없습니다.</div>
          </div>
        </div>
      </div>

      {/* 금융소비자보호 및 세제 안내 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">금융소비자보호 및 세제 안내</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-3 text-sm text-gray-700">
            <div>● 보험계약자는 금융소비자보호에 관한 법률 제47조 및 관련규정이 정하는 바에 따라 계약체결일로부터 5년을 초과하지 않는 범위 내에서 계약체결에 대한 위반사항을 안 날로부터 1년 이내에 서면 등으로 계약의 해지를 요구 할 수 있습니다.</div>
            <div>● 이 보험상품의 보험료는 세액공제혜택이 없습니다. 보험차익(만기보험금 또는 해약환급금에서 이미 납입한 보험료를 차감한 금액)에 대한 이자소득세는 관련 세법에서 정하는 요건에 부합하는 경우에 비과세가 가능합니다. 이 계약의 세제와 관련된 사항은 관련세법의 제·개정이나 폐지에 따라 변경 될 수 있습니다. (소득세법 제16조 및 동시행령 제25조 참조)</div>
          </div>
        </div>
      </div>

      {/* 해약환급금 및 계약 변경 안내 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">해약환급금 및 계약 변경 안내</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-3 text-sm text-gray-700">
            <div className="text-red-600">● 해약환급금이 납입보험료보다 적은 이유는 다음과 같습니다. 납입한 보험료 중 사업비를 차감한 후 운영 · 적립되고 해지 시에는 계약자 적립액에서 이미 지출한 사업비 해당액을 차감하는 경우가 있기 때문입니다.</div>
            <div>● 보험계약자가 기존에 체결했던 보험계약을 해지하고 다른 보험계약을 체결할 경우, 보험인수가 거절되거나 보험료가 인상되거나 또는 보장내용이 달라질 수 있습니다.</div>
          </div>
        </div>
      </div>



      {/* 안내자료 및 상품정보 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">안내자료 및 상품정보</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-3 text-sm text-gray-700">
            <div>● 해당 안내자료는 금융소비자보호에 관한 법률 등 관련법령 및 내부통제 기준을 준수하여, 제작 및 제공되었습니다.</div>
            <div>● 보험계약과 관련하여 보다 자세한 내용을 알고 싶으신 경우 아래를 참조하여 확인하시기 바랍니다. 본 안내장은 보험계약자의 이해를 돕기 위한 요약자료입니다. 보다 자세한 사항은 보험약관과 상품설명서를 참고하시기 바랍니다. 계약자께서는 본 상품에 대한 자세한 내용과 본 상품에 제시된 보장내용, 보험기간 등을 변경하여 보험설계를 하실 경우, 유사한 다른 회사의 상품을 비교하실 경우 아래에서 확인하실 수 있습니다.</div>

          </div>
        </div>
      </div>

      {/* 민원·상담·분쟁조정 연락처 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">민원·상담·분쟁조정 연락처</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-3 text-sm text-gray-700">
            <div>일반법인보험대리점이 보험계약자 또는 피보험자에게 대출과 연계하여 보험가입을 강요하거나 기존에 가입한 보험계약을 부당하게 해지하도록한 후 새로운 보험계약의 가입을 권유하는 등 부당한 요구를 한 경우, 금융감독원으로 신고하여 주시기 바랍니다.</div>
            <div>※ 금융감독원(Tel : 국번없이 1332, 홈페이지 : www.fss.or.kr)</div>
            <div>※ 민원 · 상담 : 1577-4117</div>
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