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
          <div className="font-bold mb-2">■ 금융소비자 보호안내</div>
          <div className="text-blue-600">- 금융소비자보호법 제19조(설명의무) 1항에 따라 일반금융소비자는 충분한 설명을 받을 권리가 있으며, 상품의 설명을 이해한 후 거래하시기 바랍니다.</div>
        </div>
        
        <div className="mb-4">
          <div className="text-xl font-bold mb-2">■ 가입시 유의사항</div>
          <div className="mb-2">- 이 자료는 요약된 것으로, 가입전에 해당 상품의 약관 및 상품설명서를 자세히 확인하시기 바랍니다.</div>
          <div className="mb-2">- 기존에 체결했던 보험계약을 해지하고, 다른 보험계약을 체결하면 보험인수 거절, 보험료 인상, 보장내용 변경 등 불이익이 발생할 수 있습니다.</div>
          <div className="mb-2">- 청약시에는 보험계약의 주계약·특약별 주요내용을 자세하게 확인하여야 합니다.</div>
          <div className="mb-2">- (상품명, 가입금액, 보험기간, 보험료, 보험료 납입기간, 보장하는 범위, 보험금이 지급되지 않는 사유(면책) 및 기간 등)</div>
          <div className="mb-2">- 이 상품은 순수보장형으로 보험계약 만기 시 지급되는 금액(만기환급금)이 없으며, 무배당 상품으로 계약자 배당금이 없습니다.</div>
          <div className="mb-2">- 계약심사 및 관리단계에서 추가절차(적부, 진단, 실효안내 등)가 진행될 수 있으며, 연락두절이나 해외체류 등과 같이 해당 절차가 이행될 수 없는 경우 당사기준에 따라 가입이 거절될 수 있습니다.</div>
          <div className="mb-2">- 가입하신 보험과 관련하여 상담이 필요하거나 불만사항이 있으실 경우 콜센터(☎1588-5580), 디지털보험 상담사(☎1899-3820) 또는 홈페이지(www.shinhanlife.co.kr)에 문의할 수 있고, 분쟁이 발생한 경우 금융감독원(국번없이 1332,www.fss.or.kr), 1372소비자상담센터(국번없이 1372)등의 도움을 받을 수 있습니다.</div>
          <div className="mb-2">- 보험사기 (고의사고, 허위사고, 피해과장, 사고 후 보험가입 등)는 「보험사기방지 특별법」 및 「형법」상 금지된 범죄입니다.</div>
          <div className="mb-2">- 보험가입자가 본인의 보험가입 사실을 알지 못하거나 보험수익자 또는 유족(이하 "보험가입자 등")이 사망자의 보험가입 사실을 알지 못해 보험금을 청구하지 못하는 경우를 방지하기 위해, 손해보험협회 또는 생명보험협회에서 보험가입 내역을 조회할 수 있습니다.</div>
        </div>
        
        <div className="mb-4">
          <div className="text-xl font-bold mb-2">■ 금융소비자의 권리</div>
          <div className="mb-3">
            <div className="font-semibold mb-1">■ 보험계약 청약을 철회할 수 있는 권리</div>
            <div className="mb-2">- 보험계약자는 <span className="text-blue-600">보험증권을 받은 날부터 15일 이내</span>에 그 청약을 철회할 수 있으며, 이 경우 회사는 청약의 철회를 접수한 날부터 3영업일 이내에 납입한 보험료를 돌려드립니다. 다만 보험기간이 90일 이내인 계약, 전문금융소비자가 체결한 계약 또는 청약을 한 날부터 30일(만65세 이상인 계약자가 체결한 통신판매계약의 경우에는 45일)이 초과된 경우에는 청약을 철회할 수 없습니다.</div>
            <div className="mb-2">- 청약을 철회할 당시에 이미 보험금 지급사유가 발생하였으나 계약자가 그 보험금 지급사유의 발생사실을 알지 못한 경우에는 청약철회의 효력은 발생하지 않습니다.</div>
          </div>
          
          <div className="mb-3">
            <div className="font-semibold mb-1">■ 위법계약을 해지할 수 있는 권리</div>
            <div className="mb-2">- 계약자는 보험회사가 『금융소비자 보호에 관한 법률』에서 정하는 사항을 위반하여 체결한 계약에 대한 해지를 요구할 수 있습니다.</div>
            <div className="mb-2">- 계약을 해지하려면 위법 사실을 안 날부터 1년 이내(단, 해당 보험 계약 체결일부터 5년 이내의 계약에 한함)에 서면 등으로 해지요구서에 위반 사실을 증명하는 서류를 첨부하여 보험사에 제출해야 합니다.</div>
            <div className="mb-2">- 회사에 해지를 요구한 날부터 10일 이내에 수락 여부를 통지(거절할 때에는 거절사유를 함께 포함하여 통지)받을 수 있습니다.</div>
            <div className="mb-2">- 위법계약으로 계약이 해지되면 회사가 적립한 해지 당시의 계약자적립액을 돌려드립니다.</div>
          </div>
          
          <div className="mb-3">
            <div className="font-semibold mb-1">■ 보험계약을 취소할 수 있는 권리</div>
            <div className="mb-2">- 보험계약자는 다음의 경우 <span className="text-blue-600">계약이 성립한 날부터 3개월 이내</span>에 계약을 취소할 수 있으며, 이 경우 실제 납입한 보험료와 보험료를 받은 기간에 대하여 소정의 이자를 더하여 지급합니다.</div>
            <div className="mb-1">- 약관 및 계약자보관용 청약서를 전달받지 못한 경우</div>
            <div className="mb-1">- 약관의 중요한 내용을 설명받지 못한 경우</div>
            <div className="mb-1">- 청약서에 자필서명(전자서명 포함)을 하지 않은 경우</div>
          </div>
          
          <div className="mb-3">
            <div className="font-semibold mb-1">■ 자료열람을 요구할 수 있는 권리</div>
            <div className="mb-2">- 금융소비자는 분쟁조정 또는 소송의 수행 등 권리구제를 위한 목적으로 금융회사에게 기록 및 유지·관리하는자료에 대한 열람(사본 및 청취 포함)을 요구할 수 있습니다.</div>
            <div>- 자세한 사항은 대표홈페이지 소비자 권리사항(www.shinhanlife.co.kr/hp/cdhe0230.do)을 참고하시기 바랍니다.</div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="text-xl font-bold mb-2">■ 금융소비자에게 불이익이 발생할 수 있는 사항</div>
          <div className="mb-3">
            <div className="font-semibold mb-1">■ 보험계약 전 알릴 의무 및 위반 시 효과</div>
            <div className="mb-2">- 보험계약의 청약시 보험계약자 또는 피보험자는 청약서의 질문사항(중요사항)에 대하여 사실대로 기재하고 자필서명(전자서명 포함)을 하셔야 합니다.</div>
            <div className="mb-2">- 청약서의 질문사항과 과거 질병 치료사실 등을 고의 또는 중대한 과실로 중요한 사항에 대해 사실과 다르게 알린 경우 계약이 해지되거나 보험금을 지급 받지 못할 수 있습니다.</div>
          </div>
          
          <div className="mb-3">
            <div className="font-semibold mb-1">■ 보험료 납입연체 및 보험계약의 해지</div>
            <div className="mb-2">- 보험계약자가 보험료의 납입을 연체하는 경우 회사는 14일 이상의 기간을 납입최고(독촉)기간으로 정하여 보험료 납입을 최고(독촉)하고, 그 때까지 해당보험료를 납입하지 않을 경우 납입최고(독촉)기간이 끝나는 날의 다음날 계약이 해지됩니다.</div>
          </div>
          
          <div className="mb-3">
            <div className="font-semibold mb-1">■ 만기 및 중도해지 시 유의사항</div>
            <div className="mb-2">- 이 상품은 납입보험료에 보험회사가 경비로 사용하는 사업비(계약체결비용 및 계약관리비용)가 포함되어 있는 보험상품으로 은행의 연금신탁 또는 예·적금 등과 다르며 만기 또는 중도해지 시 사업비 차감, 위험보험료 등으로 납입보험료보다 환급금이 적거나 없을 수도 있습니다.</div>
          </div>
          
          <div className="mb-3">
            <div className="font-semibold mb-1">■ 보험금청구권 소멸시효</div>
            <div className="mb-2">- 보험금 지급사유 발생일로부터 3년이내 접수하지 않으면 보험금 청구권이 소멸됩니다. (상법 제662조)</div>
            <div>- 향후 관련법령이 개정된 경우 개정된 내용을 적용합니다.</div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="font-bold mb-2">■ 예금자 보호에 관한 사항</div>
          <div className="mb-1">- 이 보험계약은 예금자보호법에 따라 해약환급금(또는 만기 시 보험금)에 기타지급금을 합한 금액이 1인당 5천만원까지(본 보험회사의 여타 보호상품과 합산) 보호됩니다.</div>
          <div className="mb-1">- 이와 별도로 본 보험회사의 보호상품의 사고보험금을 합산한 금액이 1인당 5천만원까지 보호됩니다.</div>
          <div className="mb-1 text-red-600">- 단, 2025년 9월 1일부터 해당 보호 한도가 1억원으로 상향됩니다.</div>
          <div>- 다만, 보험계약자 및 보험료 납부자가 법인인 보험 계약은 「예금자보호법」에 따라 보호되지 않습니다.</div>
        </div>
        
        <div className="mb-4">
          <div className="text-sm text-gray-600">
            <div className="mb-2 text-red-600">※ 이 상품에 대한 보다 자세한 사항은 계약 체결 전에 보험약관 및 상품설명서를 반드시 확인하시기 바랍니다.</div>
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


