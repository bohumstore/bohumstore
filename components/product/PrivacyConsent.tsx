import React, { useState } from 'react';
import Modal from '@/components/Modal';

interface PrivacyConsentProps {
  checked: boolean;
  onChange: (_checked: boolean) => void;
}

export default function PrivacyConsent({ checked, onChange }: PrivacyConsentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-1">
        <input
          type="checkbox"
          id="privacy-consent"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="w-[16px] h-[16px] flex-shrink-0 text-button border-border-default rounded focus:ring-button cursor-pointer"
        />
        <label htmlFor="privacy-consent" className="body-s cursor-pointer leading-snug flex items-center">
          <span className="text-text-muted">[필수] 개인정보수집처리방침 동의</span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            className="ml-1 caption-s text-text-muted underline underline-offset-2 hover:text-text-primary focus:outline-none"
          >
            (자세히 보기)
          </button>
        </label>
      </div>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} hideHeader hideFooter>
        {/* 모달 높이가 길어질 경우 대비해 스크롤 적용 */}
        <div className="px-6 py-8 relative max-h-[80vh] flex flex-col">
          <div className="heading-4 text-text-primary mb-5 shrink-0">
            약관 상세 보기
          </div>
          <div className="overflow-y-auto pr-3 flex-1 space-y-6">
            {/* 필수 1 */}
            <div className="space-y-2">
              <div className="body-l font-bold text-text-primary">[필수] 개인정보 수집·이용 동의</div>
              <div className="bg-page-bg rounded-lg p-4 body-s text-text-secondary leading-relaxed break-keep">
                <p className="mb-2">당사는 보험료 산출 및 상담 제공을 위해 아래와 같은 개인정보를 수집 및 이용합니다.</p>
                <ul className="list-disc pl-5 space-y-1 mb-3 text-text-primary">
                  <li>수집·이용 목적: <span className="font-bold underline text-brand-primary decoration-2 underline-offset-2 bg-blue-50">보험료 산출, 상담 진행 및 결과 안내</span></li>
                  <li>수집 항목: <span className="font-bold">성명, 성별, 생년월일, 연락처(휴대폰 번호)</span></li>
                  <li>보유 및 이용기간: <span className="font-bold underline text-brand-primary decoration-2 underline-offset-2 bg-blue-50">동의일로부터 1개월</span></li>
                </ul>
                <p className="caption-r text-status-red font-medium">※ 동의를 거부하실 권리가 있으나, 거부 시 보험료 산출 및 상담이 제한될 수 있습니다.</p>
              </div>
            </div>

          </div>

          <div className="pt-5 mt-2 shrink-0 border-t border-border-default">
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full bg-button text-white py-3.5 rounded-xl body-l font-bold transition-colors hover:bg-button-hover"
            >
              내용을 확인했습니다
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
