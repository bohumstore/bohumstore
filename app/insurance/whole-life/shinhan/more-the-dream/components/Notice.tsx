import StandardProductNotice from '@/components/product/StandardProductNotice';
import React from 'react';

interface NoticeProps {
  open: boolean;
  onClose: () => void;
}

export default function Notice({ open, onClose }: NoticeProps) {
  return (
    <StandardProductNotice open={open} onClose={onClose}>
        <div className="mb-6">
          <div className="mb-4">
            <div className="mb-2 font-bold">■ 금융소비자 보호안내</div>
            <div className="text-brand-primary">
              - 금융소비자보호법 제19조(설명의무) 1항에 따라 일반금융소비자는 충분한 설명을 받을
              권리가 있으며, 상품의 설명을 이해한 후 거래하시기 바랍니다.
            </div>
          </div>

          <div className="mb-4 text-brand-primary font-bold">
            ※ 가입하신 보험과 관련하여 상담이 필요하거나 불만사항이 있으실 경우 콜센터(☎1588-5580),
            디지털보험 상담사(☎1899-3820) 또는 홈페이지(www.shinhanlife.co.kr)에 문의할 수 있습니다.
          </div>

          <div className="mb-2">
            - 보험사기 (고의사고, 허위사고, 피해과장, 사고 후 보험가입 등)는 「보험사기방지 특별법」
            및 「형법」상 금지된 범죄입니다.
          </div>
        </div>

        <div className="mb-4">
          <div className="mb-3 bg-page-bg p-3 rounded-lg body-s text-text-secondary">
            <div className="mb-2">
              ※ 이 보험계약은 예금자보호법에 따라 해약환급금(또는 만기 시 보험금)에 기타지급금을
              합한 금액이 1인당 5천만원까지(본 보험회사의 여타 보호상품과 합산) 보호됩니다.
            </div>
            <div className="pl-3 font-bold text-status-red">단, 2025년 9월 1일부터 해당 보호 한도가 1억원으로 상향됩니다.</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm text-text-secondary">
            <hr className="my-3 border-border-default" />
            <div className="mb-1">
              ※ ㈜메타리치 보험스토어는 다수의 보험사와 계약 체결 및 대리·중개하는 대리점입니다.
            </div>
            <div className="mb-1">
              ※ ㈜메타리치 보험스토어는 보험사로부터 보험계약체결권을 부여받지 아니한 금융상품판매
              대리·중개업자임을 알려드립니다.
            </div>
            <div className="mb-1">
              ※ ㈜메타리치 보험스토어는 금융소비자 보호에 관한 법률 및 회사 내부 통제기준에 따른
              광고 관련 절차를 준수하고 있습니다.
            </div>
            <div className="text-right">㈜메타리치 대리점등록번호 : 2023070016</div>
          </div>
        </div>
    </StandardProductNotice>
  );
}
