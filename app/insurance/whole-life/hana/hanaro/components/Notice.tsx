import Modal from '@/app/components/Modal'
import React from 'react'

interface NoticeProps {
  open: boolean;
  onClose: () => void;
}

export default function Notice({ open, onClose }: NoticeProps) {
  return (
    <Modal title="가입시 알아두실 사항" open={open} onClose={onClose}>
      <div className="overflow-y-auto px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm md:text-[15px] leading-relaxed" style={{maxHeight:'70vh'}}>
        
        <div className="mb-4 sm:mb-6">
          <div className="font-bold mb-2 sm:mb-3 text-sm sm:text-base md:text-lg text-[#1e3a8a]">01. 청약 시 보험계약의 기본사항 확인</div>
          <div className="text-gray-700">계약자, 피보험자는 보험계약 청약 시에 보험상품명, 보험기간, 보험료, 보험료납입기간, 피보험자 등을 반드시 확인하시고 보험상품 내용을 설명 받으시기 바랍니다.</div>
        </div>

        <div className="mb-4 sm:mb-6">
          <div className="font-bold mb-2 sm:mb-3 text-sm sm:text-base md:text-lg text-[#1e3a8a]">02. 계약 전 알릴 의무 및 자필서명(전자서명 포함)</div>
          <div className="text-gray-700">계약자, 피보험자는 보험계약 청약 시 청약서에 질문한 사항(계약 전 알릴 사항)에 대하여 사실대로 알려야 하며 청약서상의 자필서명란에 반드시 본인이 자필서명을 하셔야 합니다. 그렇지 않은 경우 보험금의 지급이 거절되거나 계약이 무효로 처리될 수 있습니다.</div>
        </div>

        <div className="mb-4 sm:mb-6">
          <div className="font-bold mb-2 sm:mb-3 text-sm sm:text-base md:text-lg text-[#1e3a8a]">03. 청약의 철회</div>
          <div className="text-gray-700">계약자는 보험증권을 받은 날부터 15일 이내에 청약을 철회할 수 있으며, 이 경우 철회를 접수한 날부터 3영업일 이내에 보험료를 돌려드립니다. 다만, 회사가 건강상태 진단을 지원하는 계약, 전문금융소비자가 체결한 계약 및 청약을 한 날부터 30일을 초과하는 경우에는 청약을 철회할 수 없습니다.</div>
        </div>

        <div className="mb-4 sm:mb-6">
          <div className="font-bold mb-2 sm:mb-3 text-sm sm:text-base md:text-lg text-[#1e3a8a]">04. 3대 기본 지키기(보험품질보증제도)</div>
          <div className="text-gray-700">보험계약 체결 시 약관과 계약자 보관용 청약서를 전달받지 못하였거나 약관의 중요한 내용을 설명 받지 못한 때 또는 청약서에 자필서명(전자서명 포함)을 하지 않은 때에는 계약자는 계약이 성립한 날로부터 3개월 이내에 계약을 취소할 수 있습니다.</div>
        </div>

        <div className="mb-4 sm:mb-6">
          <div className="font-bold mb-2 sm:mb-3 text-sm sm:text-base md:text-lg text-[#1e3a8a]">05. 배당에 관한 안내</div>
          <div className="text-gray-700">이 상품은 무배당보험으로 배당금이 없습니다.</div>
        </div>

        <div className="mb-4 sm:mb-6">
          <div className="font-bold mb-2 sm:mb-3 text-sm sm:text-base md:text-lg text-[#1e3a8a]">06. 세제혜택</div>
          <div className="text-gray-700">근로소득자가 기본 공제대상자를 피보험자로 하여 가입 시, 당해 년도에 납입한 연간 납입보험료(100만원 한도)의 12%에 대해 세액공제 혜택을 받으실 수 있습니다.(관련 세법요건 충족시)</div>
        </div>

        <div className="mb-4 sm:mb-6">
          <div className="font-bold mb-2 sm:mb-3 text-sm sm:text-base md:text-lg text-[#1e3a8a]">07. 해약환급금이 납입보험료보다 적거나 없는 이유</div>
          <div className="text-gray-700">계약자가 납입한 보험료는 불의의 사고를 당한 다른 가입자에게 보험금으로 지급되고 보험회사 운영에 필요한 경비로 사용되므로 중도 해지 시 지급되는 해약환급금은 납입한 보험료보다 적거나 없을 수 있습니다.</div>
        </div>

        <div className="mb-4 sm:mb-6">
          <div className="font-bold mb-2 sm:mb-3 text-sm sm:text-base md:text-lg text-[#1e3a8a]">08. 보험금 지급 제한사항</div>
          <div className="text-gray-700">피보험자가 고의로 자신을 해친 경우, 보험수익자가 고의로 피보험자를 해친 경우, 계약자가 고의로 피보험자를 해친 경우 또는 피보험자가 2년이내 자살시, 회사는 보험금을 지급하지 않습니다.</div>
        </div>

        <div className="mb-4 sm:mb-6">
          <div className="font-bold mb-2 sm:mb-3 text-sm sm:text-base md:text-lg text-[#1e3a8a]">09. 보험상담 및 분쟁조정 안내</div>
          <div className="text-gray-700 mb-2">생명보험에 대해 궁금하시거나 당사에 불만사항이 있으시면 보험상담 및 분쟁조정을 신청하실 수 있습니다.</div>
          <div className="space-y-1 pl-3 sm:pl-4 text-gray-600">
            <div>• 당사 보험상담안내 : 고객센터(1577-1112)</div>
            <div>• 금융감독원 소비자보험센터 : 국번없이 1332</div>
            <div>• 생명보험협회 : 02) 2262-6565</div>
          </div>
        </div>

        <div className="mb-4 sm:mb-6 bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
          <div className="font-bold mb-2 sm:mb-3 text-sm sm:text-base md:text-lg text-[#1e3a8a]">10. 본 안내는 계약자의 이해를 돕기 위한 요약자료입니다. 보험계약 체결 전에 약관 및 상품설명서를 반드시 확인하시기 바랍니다.</div>
          <div className="text-gray-700 mb-2">계약자께서는 본 상품에 대한 자세한 내용과 본 상품에 제시된 보장내용, 보험기간등을 변경하여 보험설계를 하실 경우, 당사의 상품과 유사한 다른 회사의 상품을 비교하실 경우 아래에서 확인하실 수 있습니다.</div>
          <div className="space-y-1 pl-3 sm:pl-4 text-gray-600">
            <div>• 하나생명보험㈜홈페이지 보험상품 및 가격공시실 : www.hanalife.co.kr</div>
            <div>• 생명보험협회 보험상품 비교공시 : www.klia.or.kr</div>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4 mb-4">
          <div className="p-3 sm:p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
            <div className="text-gray-800 text-xs sm:text-sm leading-relaxed">
              <strong>※</strong> 이 보험계약은 예금자보호법에 따라 해약환급금(또는 만기 시 보험금)에 기타지급금을 합한 금액이 1인당 <strong className="text-red-600">"1억원까지"</strong>(본 보험회사의 여타 보호상품과 합산) 보호됩니다. 이와 별도로 본 보험회사 보호상품의 사고보험금을 합산한 금액이 1인당 <strong className="text-red-600">"1억원까지"</strong> 보호됩니다. 다만, 보험계약자 및 보험료 납부자가 법인인 경우에는 보호되지 않습니다.
            </div>
          </div>
          
          <div className="p-3 sm:p-4 bg-orange-50 border-l-4 border-orange-500 rounded">
            <div className="text-gray-800 text-xs sm:text-sm leading-relaxed">
              <strong>※</strong> 계약자가 기존에 체결했던 보험계약을 해지하고 다른 보험계약을 체결하면 보험인수가 거절되거나 보험료가 인상될 수 있으며 보장내용이 달라질 수 있습니다.
            </div>
          </div>
          
          <div className="p-3 sm:p-4 bg-green-50 border-l-4 border-green-500 rounded">
            <div className="text-gray-800 text-xs sm:text-sm leading-relaxed">
              <strong>※</strong> 판매회사 및 모집종사자는 해당 상품에 대해 충분히 설명할 의무가 있으며, 가입자는 가입에 앞서 이에 대한 충분한 설명을 받으시기 바랍니다.
            </div>
          </div>
        </div>

        <div className="border-t-2 border-gray-300 pt-3 sm:pt-4 mt-4">
          <div className="text-[10px] sm:text-xs md:text-sm text-gray-600 space-y-1.5">
            <div>※ ㈜메타리치 보험스토어는 다수의 보험사와 계약 체결 및 대리·중개하는 대리점입니다.</div>
            <div>※ ㈜메타리치 보험스토어는 보험사로부터 보험계약체결권을 부여받지 아니한 금융상품판매 대리·중개업자임을 알려드립니다.</div>
            <div>※ ㈜메타리치 보험스토어는 금융소비자 보호에 관한 법률 및 회사 내부 통제기준에 따른 광고 관련 절차를 준수하고 있습니다.</div>
            <div className="text-right font-semibold mt-2 sm:mt-3">㈜메타리치 대리점등록번호 : 2023070016</div>
          </div>
        </div>
      </div>
    </Modal>
  );
}


