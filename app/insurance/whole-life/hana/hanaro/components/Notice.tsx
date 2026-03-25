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
          <div className="mb-3 text-lg font-bold text-brand-primary">
            ※ 본 안내는 계약자의 이해를 돕기 위한 요약자료입니다. 보험계약 체결 전에 약관 및
            상품설명서를 반드시 확인하시기 바랍니다.
          </div>
          <div className="mb-2">
            계약자께서는 본 상품에 대한 자세한 내용과 본 상품에 제시된 보장내용, 보험기간등을
            변경하여 보험설계를 하실 경우, 당사의 상품과 유사한 다른 회사의 상품을 비교하실 경우
            아래에서 확인하실 수 있습니다.
          </div>
          <div className="mb-1 pl-4">
            하나생명보험㈜홈페이지 보험상품 및 가격공시실 : www.hanalife.co.kr
          </div>
          <div className="mb-1 pl-4">생명보험협회 보험상품 비교공시 : www.klia.or.kr</div>
        </div>

        <div className="mb-4">
          <div className="mb-3 bg-page-bg p-3 rounded-lg body-s text-text-secondary">
            <div className="mb-2">
              ※ 이 보험계약은 예금자보호법에 따라 해약환급금(또는 만기 시 보험금)에 기타지급금을
              합한 금액이 1인당 "1억원까지"(본 보험회사의 여타 보호상품과 합산) 보호됩니다. 이와 별도로 본
              보험회사 보호상품의 사고보험금을 합산한 금액이 1인당 "1억원까지" 보호됩니다. 
            </div>
            <div className="pl-3 font-bold">다만, 보험계약자 및 보험료 납부자가 법인인 경우에는 보호되지 않습니다.</div>
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
