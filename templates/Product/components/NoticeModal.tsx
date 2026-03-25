import Modal from '@/components/Modal';
import React, { ReactNode } from 'react';

interface NoticeModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  contentClassName?: string;
  maxHeight?: string;
}

export default function NoticeModal({
  open,
  onClose,
  title = '가입시 알아두실 사항',
  children,
  contentClassName = 'overflow-y-auto px-6 py-4 text-[15px] leading-relaxed',
  maxHeight = '60vh',
}: NoticeModalProps) {
  return (
    <Modal title={title} open={open} onClose={onClose}>
      <div className={contentClassName} style={{ maxHeight }}>
        {children}
      </div>
    </Modal>
  );
}
