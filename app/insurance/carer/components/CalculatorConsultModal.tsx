'use client';

import React, { useState } from 'react';
import Modal from '@/components/Modal';
import Button from '@/components/shared/Button';
import TextField from '@/components/TextField';
import SelectChip from '@/components/SelectChip';
import PrivacyConsent from '@/components/product/PrivacyConsent';
import { ModalScrollBody, StepHeader } from '@/templates/Product/components/CalculatorConsultModalScaffold';

type ModalType = 'calculate' | 'consult';

interface CalculatorConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: ModalType;
}

export default function CalculatorConsultModal({ isOpen, onClose, type }: CalculatorConsultModalProps) {
  const [gender, setGender] = useState<'M' | 'F' | ''>('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const title = type === 'calculate' ? '간병인보험 정보 확인' : '간병인보험 상담 신청';

  const canSubmit = gender !== '' && name.trim() !== '' && birth.length === 8 && phone.length >= 10 && isChecked;

  const handleClose = () => {
    setGender('');
    setName('');
    setBirth('');
    setPhone('');
    setIsChecked(false);
    onClose();
  };

  const handleSubmit = () => {
    alert(type === 'calculate' ? '정보가 접수되었습니다.' : '상담 신청이 접수되었습니다.');
    handleClose();
  };

  return (
    <Modal open={isOpen} onClose={handleClose} hideHeader hideFooter>
      <ModalScrollBody className="relative py-10 px-6">
        <div className="space-y-5">
          <StepHeader title={title} description="정확한 안내를 위해 필수 정보를 입력해주세요." />

          <div className="grid grid-cols-2 gap-3">
            {(['M', 'F'] as const).map((value) => (
              <SelectChip
                key={value}
                active={gender === value}
                onClick={() => setGender(value)}
                className="h-[36px] w-auto"
              >
                {value === 'M' ? '남자' : '여자'}
              </SelectChip>
            ))}
          </div>

          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름"
            className="w-full"
          />
          <TextField
            value={birth}
            onChange={(e) => setBirth(e.target.value.replace(/[^0-9]/g, '').slice(0, 8))}
            placeholder="생년월일 8자리"
            inputMode="numeric"
            className="w-full"
          />
          <TextField
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 11))}
            placeholder="연락처"
            inputMode="numeric"
            className="w-full"
          />

          <PrivacyConsent checked={isChecked} onChange={setIsChecked} />

          <Button
            type="button"
            className="w-full"
            onClick={handleSubmit}
            disabled={!canSubmit}
          >
            {type === 'calculate' ? '확인 요청하기' : '상담 신청하기'}
          </Button>

          <button
            onClick={handleClose}
            className="w-full mt-3 py-3 body-m font-medium text-text-muted hover:text-text-primary transition text-center"
          >
            닫기
          </button>
        </div>
      </ModalScrollBody>
    </Modal>
  );
}
