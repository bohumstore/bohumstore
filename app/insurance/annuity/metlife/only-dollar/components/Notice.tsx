import Modal from '@/app/components/Modal'
import React from 'react'

interface NoticeProps {
  open: boolean;
  onClose: () => void;
}

export default function Notice({ open, onClose }: NoticeProps) {
  return (
    <Modal title="가입시 알아두실 사항" open={open} onClose={onClose}>
      <div className="overflow-y-auto px-6 py-4 text-sm leading-relaxed" style={{maxHeight:'60vh'}}>
        <div className="mb-4">
          <div className="font-bold mb-2">설명을 받을 수 있는 권리</div>
          <div>회사는 해당 상품에 대해 충분히 설명할 의무가 있으며, 가입자는 가입에 앞서 이에 대한 충분한 설명을 받으시기 바랍니다.</div>
        </div>

        <div className="mb-4">
          <div className="font-bold mb-2">청약할 때 보험계약 확인</div>
          <div>계약 청약 시 보험상품명, 보험기간, 보험료, 보험료 납입기간, 피보험자 등을 반드시 확인하시고 보험상품 내용을 설명 받으시기 바랍니다. 또한 해당 보험약관을 참조하시기 바랍니다.</div>
        </div>

        <div className="mb-4">
          <div className="font-bold mb-2">계약 전 알릴 의무</div>
          <div>계약자 또는 피보험자는 보험계약을 청약할 때 청약서에 질문한 사항(계약 전 알릴의무사항)에 대하여 사실대로 알려야 하며, 그렇지 않은 경우 보험계약이 해지되거나, 보장이 제한될 수 있습니다.</div>
        </div>

        <div className="mb-4">
          <div className="font-bold mb-2">청약철회 청구제도</div>
          <div>계약자는 보험증권을 받은 날부터 15일 이내에 그 청약을 철회할 수 있습니다. 단, 회사가 건강상태 진단을 지원하는 계약, 보험기간이 90일 이내인 계약, 전문금융소비자가 체결한 계약 또는 청약한 날부터 30일이 초과된 계약의 경우에는 청약을 철회할 수 없습니다.</div>
        </div>

        <div className="mb-4">
          <div className="font-bold mb-2">품질 보증 제도</div>
          <div>청약서상에 자필서명(전자서명 포함), 계약자 보관용 청약서 및 약관전달과 약관의 주요내용 설명 등을 이행하지 않은 계약에 대하여는 계약자가 계약성립일로부터 3개월 이내에 계약을 취소할 수 있습니다.</div>
        </div>

        <div className="mb-4">
          <div className="font-bold mb-2">보험료의 납입이 연체되는 경우 보험계약의 해지</div>
          <div>회사는 이 계약의 계약자가 제2회 이후의 기본보험료를 납입기일까지 납입하지 않아 보험료 납입이 연체 중인 경우, 14일 이상의 기간을 납입최고(독촉)기간으로 정하여 계약자에게 납입최고(독촉)기간 내에 보험료를 납입하여야 한다는 내용과 납입최고(독촉)기간이 끝나는 날까지 보험료를 납입하지 않을 경우 납입최고(독촉)기간이 끝나는 날의 다음 날에 계약이 해지됨을 알려드립니다. 단, 해지 전에 발생한 보험금 지급사유에 대하여 회사는 약정한 보험금을 지급하여 드립니다.</div>
        </div>

        <div className="mb-4">
          <div className="font-bold mb-2">세제 혜택</div>
          <div>보험차익(만기보험금 또는 해약환급금에서 이미 납입한 보험료를 차감한 금액)에 대한 이자소득세는 관련 세법에서 정하는 요건에 부합하는 경우에 비과세가 가능합니다.</div>
          <div className="text-red-600 mt-1">※ 세제와 관련된 사항은 관련 세법의 제·개정이나 폐지에 따라 변경될 수 있습니다.</div>
        </div>

        <div className="mb-4">
          <div className="font-bold mb-2">예금자보호 안내</div>
          <div className="text-red-600">이 보험계약은 예금자보호법에 따라 해약환급금(또는 만기 시 보험금)에 기타지급금을 합한 금액이 1인당 "1억원까지"(본 보험회사의 여타 보호상품과 합산) 보호됩니다. 이와 별도로 본 보험회사 보호상품의 사고보험금을 합산한 금액이 1인당 "1억원까지" 보호됩니다. 다만, 보험계약자 및 보험료납부자가 법인인 보험계약의 경우에는 보호되지 않습니다.</div>
          <br/>
          <img src="/1m.png" alt="예금자보호 안내" className="w-full max-w-28 mx-auto" />
        </div>

        <div className="mb-4">
          <div className="font-bold mb-2">다른 상품으로의 전환 가능</div>
          <div>이 보험을 연금보험 또는 원화보험으로 전환하여 줄 것을 신청한 경우, 이 계약의 해약환급금을 원화로 환산한 금액을 기준으로 하며, 환산기준율 및 기준환율은 원화환산납입서비스특약 및 원화환산지급서비스특약에 따릅니다. 이 보험을 달러연금보험으로 전환하여 줄 것을 신청한 경우, 이 계약의 해약환급금을 기준으로 합니다.</div>
        </div>

        <div className="mb-4">
          <div className="font-bold mb-2">기존계약 해지 후 신계약 체결시 불이익 사항</div>
          <div>보험계약자가 기존에 체결했던 보험계약을 해지하고 다른 보험계약을 체결하면, 보험인수가 거절되거나 보험료가 인상 또는 보장내용이 달라질 수 있습니다.</div>
        </div>

        <div className="mb-4">
          <div className="font-bold mb-2">해약환급금이 납입보험료 보다 적은 이유</div>
          <div>계약자가 납입한 보험료는 불의의 사고를 당한 다른 가입자에게 보험금으로 지급되고 보험회사 운영에 필요한 경비로 사용되므로 중도 해지하는 경우 지급되는 해약환급금은 납입한 보험료보다 적거나 없을 수 있습니다.</div>
        </div>

        <div className="mb-4">
          <div className="font-bold mb-2">보험 분쟁 및 상담안내</div>
          <div>생명보험에 대해 궁금하시거나 불만사항이 있는 경우 메트라이프생명 콜센터(1588-9600)로 문의하시면 성실히 안내해 드리겠습니다. 또한, 당사 상담결과에 이의가 있으시면 금융감독원(국번없이 1332, www.fss.or.kr)에 민원 또는 분쟁조정을 신청하실 수 있습니다.</div>
        </div>

        <div className="mb-4">
          <div className="font-bold mb-2">보험계약 관련 조회시스템 운영</div>
          <div>계약자께서는 본 상품에 대한 자세한 내용과 본 상품으로 보험설계를 하실 경우 또는 당사의 상품과 유사한 다른 회사의 상품을 비교하실 경우 아래 인터넷 사이트를 통해 확인하실 수 있습니다.</div>
          <div className="mt-1">• 보험상품 및 가격공시실 : www.metlife.co.kr (당사 홈페이지)</div>
          <div>• 보험상품 비교·공시 : www.klia.or.kr (생명보험협회 홈페이지)</div>
        </div>

        <div className="mb-4 text-red-600">
          <div>※ 이 보험상품은 달러상품이므로 원-달러 환율변동에 의해 원화 기준으로 환산 시 보험료, 보험금 및 해약환급금 등에 손실이 발생할 수 있으며 그 손실은 계약자에게 귀속됩니다.</div>
          <div>※ 이 보험상품은 금리연동형 상품으로 미국의 금리수준에 따라 해약환급금 등이 변동할 수 있습니다.</div>
          <div>※ 외화보험은 환테크를 위한 금융상품이 아닙니다.</div>
          <div>※ 외화보험은 보험료 납입, 보험금 수령 과정에서 환전수수료 등 거래비용이 발생할 수 있습니다.</div>
          <div>※ 기타 자세한 사항은 보험 계약 체결 전, 상품설명서 및 약관을 반드시 읽어보시기 바랍니다.</div>
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


