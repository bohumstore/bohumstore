import Modal from '@/app/components/Modal'
import React from 'react'

interface NoticeProps {
  open: boolean;
  onClose: () => void;
}

export default function Notice({ open, onClose }: NoticeProps) {
  return (
    <Modal title="가입시 알아두실 사항" open={open} onClose={onClose}>
      <div className="overflow-y-auto px-6 py-4 text-[15px] leading-relaxed" style={{maxHeight:'60vh'}}>
        <div className="mb-4">
          <div className="font-bold mb-2">보험계약 청약</div>
          <div>보험계약 청약시 보험상품명, 보험기간, 보험료 납입기간, 피보험자 등을 반드시 확인하시고 보험상품 내용을 설명 받으시기 바랍니다. 또한 해당 보험약관을 참조하시기 바랍니다.</div>
        </div>
        <div className="mb-4">
          <div className="font-bold mb-2">계약 전 알릴의무</div>
          <div>보험계약자 또는 피보험자는 보험계약 청약시 청약서에 질문한 사항 계약 전 알릴사항에 대하여 사실 대로 알려야 하며 보험계약자 및 피보험자는 청약서상의 자필서명란에 반드시 본인이 자필서명을 하셔야 합니다. 그렇지 않은 경우 보험금의 지급이 거절되거나 계약이 무효로 처리될 수 있습니다. 상법 제 651조에서 정하고 있는 의무, 보험계약자나 피보험자는 청약시에 회사가 서면으로 질문한 중요한 사항에 대해 사실대로 알려야 하며, 위반시 보험계약의 해지 또는 보험금부지급 등 불이익을 당할 수 있습니다.</div>
        </div>
        <div className="mb-4">
          <div className="font-bold mb-2">청약철회 청구제도</div>
          <div>보험계약자는 보험증권을 받은 날부터 15일 이내에 그 청약을 철회할 수 있으며, 이 경우에는 접수한 날부터 3영업일 이내에 납입한 보험료를 돌려 드립니다. 다만, 회사가 건강상태 진단을 지원하는 계약, 보험기간이 90일 이내인 계약, 전문금융소비자가 체결한 계약의 경우 또는 청약한 날부터 30일 (통신 판매 계약 중 전화를 이용하여 체결하는 경우 청약한 날의 계약자 나이가 만 65세 이상인 계약은 45일) 을 초과한 경우에는 철회할 수 없습니다.</div>
          <div className="mt-2 text-sm text-gray-600">※ 전문금융소비자 : 보험계약에 관한 전문성, 자산규모 등에 비추어 보험계약에 따른 위험감수 능력이 있는 자로서, 국가, 지방자치단체, 한국은행, 금융회사, 주권상장법인 등을 포함하여 금융소비자보호에 관한 법률에서 정하는 전문금융소비자를 말합니다.</div>
        </div>
        <div className="mb-4">
          <div className="font-bold mb-2">설명의무 관련 안내</div>
          <div>회사 및 모집종사자는 해당 상품에 대해 충분히 설명할 의무가 있으며, 가입자는 가입에 앞서 이에 대한 충분한 설명을 받으시기 바랍니다.</div>
        </div>
        <div className="mb-4">
          <div className="font-bold mb-2">품질보증제도</div>
          <div className="mb-2">보험계약자는 다음의 경우 계약성립일로부터 3개월 이내에 계약을 취소할 수 있으며, 이 경우 이미 납입한 보험료를 돌려드리며, 보험료를 받은 기간에 대하여 소정의 이자를 더하여 지급합니다.</div>
          <div className="ml-4">
            ①보험계약 청약시 약관과 계약자 보관용 청약서(청약서 부본)를 전달받지 못한 경우<br/>
            ②약관의 중요한 내용을 설명 받지 못한 경우<br/>
            ③청약서에 자필서명(전자서명 포함)을 하지 아니한 경우
          </div>
        </div>
        <div className="mb-4">
          <div className="font-bold mb-2">보험료를 납입에 관한 안내</div>
          <div>보험계약자가 보험료의 납입을 연체하는 경우 14일 이상의 기간을 납입 최고 독촉 기간으로 정하여 보험료의 납입을 최고 독촉 하고, 그 때까지 해당 보험료를 납입하지 않을 경우 계약이 해지됩니다.</div>
        </div>
        <div className="mb-4">
          <div className="font-bold mb-2">보험금 지급하지 않는 보험사고</div>
          <div className="mb-2">피보험자가 고의로 자신을 해친 경우</div>
          <div className="mb-2">보험수익자가 고의로 피보험자를 해친 경우</div>
          <div className="mb-2">보험계약자가 고의로 피보험자를 해친 경우</div>
          <div className="text-sm text-gray-600 mt-2">
            ※ 일반사망보험금의 경우 '고의적 사고 및 2년 이내 자살시' 지급 제한<br/>
            ※ 자세한 사항은 해당약관 참조
          </div>
        </div>
        <div className="mb-4">
          <div className="font-bold mb-2">기존 계약 해지 후, 신규 계약 체결 시 유의사항 안내</div>
          <div>보험계약자가 기존에 체결했던 보험계약을 해지하고, 다른 보험계약을 체결하면 보험인수가 거절되거나 보험료 인상 및 보장내용이 달라질 수 있습니다.</div>
        </div>
        <div className="mb-4">
          <div className="font-bold mb-2">해약환급금이 납입보험료보다 적은 이유</div>
          <div>보험계약자가 납입한 보험료는 불의의 사고를 당한 다른 가입자에게 보험금으로 지급되고 보험회사 운영에 필요한 경비로 사용되므로 중도 해지시 지급되는 해약환급금은 이미 납입한 보험료보다 적거나 없을 수 있습니다.</div>
        </div>
        <div className="mb-4">
          <div className="font-bold mb-2 text-red-600">예금자보호안내</div>
          <div className="text-red-600">이 보험계약은 예금자보호법에 따라 해약환급금(또는 만기 시 보험금)에 기타지급금을 합한 금액이 1인당 "1억원까지"(본 보험회사의 여타 보호상품과 합산) 보호됩니다. 이와 별도로 본 보험회사 보호상품의 사고보험금을 합산한 금액이 1인당 "1억원까지" 보호됩니다. 다만, 보험계약자 및 보험료납부자가 법인인 보험계약의 경우에는 보호되지 않습니다.</div>
        </div>
        <div className="mb-4">
          <div className="font-bold mb-2">보험상담 및 분쟁조정절차 안내</div>
          <div>가입하신 보험에 관하여 상담이 필요하거나, 불만사항이 있을 때에는 모바일, 당사 홈페이지 (www.imlifeins.co.kr) 또는 콜센터 (1588 4770) 로 연락주시면 신속히 해결해 드리겠습니다. 또한 저희 회사의 처리결과에 이의가 있으시면 금융감독원의 금융소비자보호센터 (국번없이 1332,www.fss.or.kr) 또는 생명보험협회 (02-2262-6565, www.klia.or.kr) 에 민원 또는 분쟁조정 등을 신청하실 수 있습니다.</div>
          <div className="mt-2">다만, 분쟁조정의 신청 이후 또는 조정신청사건의 처리 절차의 진행중에 일방당사자가 소를 제기한 경우에는 그 조정의 처리를 중지하고 이를 당사자 쌍방에게 통보합니다.</div>
        </div>
        <div className="mb-4">
          <div className="font-bold mb-2">[당사보험상담안내]</div>
          <div>전국어디서나 지역번호 없이 1588-4770</div>
        </div>
        <div className="mb-4">
          <div>보험계약과 관련하여 보다 자세한 내용을 알고 싶으신 경우 아래를 참조하여 확인하시기 바랍니다.</div>
          <div className="mt-2">본 안내장은 보험계약자의 이해를 돕기 위한 요약 자료입니다. 보험계약자께서는 본 상품에 대한 자세한 내용과 본 상품에 제시된 보장내용, 보험기간 등을 변경하여 보험설계를 하실 경우, 당사의 상품과 유사한 다른 회사의 상품을 비교하실 경우 아래에서 확인하실 수 있습니다.</div>
          <div className="mt-2">
            보험상품 및 가격공시실 : www.imlifeins.co.kr (당사홈페이지)<br/>
            보험상품 비교·공시 : www.klia.or.kr (생명보험협회)
          </div>
          <div className="mt-2">그 외 보험료 산출 기초가 되는 사항은 이 보험상품의 상품요약서에서 자세히 확인하실 수 있습니다.</div>
        </div>
        <div className="mb-4">
          <br/>
          <img src="/1m.png" alt="예금자보호 안내" className="w-full max-w-28 mx-auto" />
        </div>
        
        <div className="mb-4">
          <div className="text-sm text-gray-600">
            <hr className="my-3 border-gray-300" />
            <div className="mb-1">※ ㈜메타리치 보험스토어는 다수의 보험사와 계약 체결 및 대리·중개하는 대리점입니다.</div>
            <div className="mb-1">※ ㈜메타리치 보험스토어는 보험사로부터 보험계약체결권을 부여받지 아니한 금융상품판매 대리·중개업자임을 알려드립니다.</div>
            <div className="mb-1">※ ㈜메타리치 보험스토어는 금융소비자 보호에 관한 법률 및 회사 내부 통제기준에 따른 광고 관련 절차를 준수하고 있습니다.</div>
            <div className="text-right">㈜메타리치 대리점등록번호 : 2023070016</div>
          </div>
        </div>
      </div>
    </Modal>
  );
}


