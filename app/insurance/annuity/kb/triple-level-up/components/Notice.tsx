import React from 'react';
import StandardProductNotice from '@/components/product/StandardProductNotice';

interface NoticeProps {
  open: boolean;
  onClose: () => void;
}

export default function Notice({ open, onClose }: NoticeProps) {
  return <StandardProductNotice open={open} onClose={onClose} />;
}
