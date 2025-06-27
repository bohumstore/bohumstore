import React, { ReactNode } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface ModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ title, open, onClose, children }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col relative">
        <div className="flex items-center justify-between px-6 pt-6 pb-2 border-b border-gray-200">
          <div className="text-xl font-bold">{title}</div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-700">
            <XMarkIcon className="w-7 h-7" />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-4" style={{ maxHeight: '60vh' }}>
          {children}
        </div>
        <div className="flex border-t border-gray-200">
          <button onClick={onClose} className="flex-1 py-4 text-lg font-bold bg-[#ffe15a] text-gray-900 border-r border-gray-200 hover:bg-yellow-200 transition">
            확인
          </button>
        </div>
      </div>
    </div>
  );
}