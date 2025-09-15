"use client";
import { useEffect } from "react";

export default function DongyangTestPage() {
  useEffect(() => {
    // 메인페이지로 리다이렉트
    window.location.href = '/';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">페이지 준비 중입니다</h1>
        <p className="text-gray-600 mb-4">잠시 후 메인페이지로 이동합니다...</p>
        <a href="/" className="text-blue-600 hover:underline">메인페이지로 이동</a>
      </div>
    </div>
  );
}