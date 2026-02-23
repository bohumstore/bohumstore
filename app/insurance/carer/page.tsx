"use client";
import { useEffect, useState } from "react";
import React from "react";
import Slogan from "./components/Slogan";
import Footer from "@/app/components/shared/Footer";
import PrivacyConsent from "@/app/components/PrivacyConsent";
import Modal from "@/app/components/Modal";
import Notice from "./components/Notice";
import { supabase } from "@/app/api/supabase";
import { trackPageVisit } from "@/app/utils/visitorTracking";

export default function CarerInsurancePage() {
  const [showNotice, setShowNotice] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false);

  useEffect(() => {
    // 페이지 방문 시 자동 추적
    trackPageVisit();
    // getProduct()
  }, []);

  // 햄버거 메뉴 상태 수신
  useEffect(() => {
    const handleMenuChange = (e: CustomEvent<{ isOpen: boolean }>) => {
      setIsHeaderMenuOpen(e.detail.isOpen);
    };
    window.addEventListener('headerMenuChange', handleMenuChange as EventListener);
    return () => window.removeEventListener('headerMenuChange', handleMenuChange as EventListener);
  }, []);

  const getProduct = async () => {
    const { data, error } = await supabase.from('product').select('*');
    if (error) {
      console.error("Error fetching product data:", error);
      return null;
    }
    console.log(data);
    return data;
  }

  const handleFocus = (e: React.FocusEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      setIsInputFocused(true);
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    setTimeout(() => {
      const active = document.activeElement as HTMLElement;
      if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) {
        return;
      }
      setIsInputFocused(false);
    }, 100);
  };

  return (
    <>
      <style jsx global>{`
        @keyframes jump-glow {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 #dc2626); }
          30% { transform: scale(1.18) translateY(-6px); filter: drop-shadow(0 0 8px #fca5a5); }
          60% { transform: scale(0.95) translateY(2px); filter: drop-shadow(0 0 0 #dc2626); }
        }`}</style>
      <Notice open={showNotice} onClose={() => setShowNotice(false)} />
      <Modal title="개인정보 수집 및 이용 동의" open={showPrivacy} onClose={() => setShowPrivacy(false)}>
        <PrivacyConsent />
      </Modal>
      <div 
        className="font-sans min-h-screen bg-[#f8f8f8] flex flex-col items-center w-full"
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <Slogan onOpenPrivacy={() => setShowPrivacy(true)} onModalStateChange={setIsModalOpen} />
        
        {/* 히어로 이미지 배너 */}
        <div className="w-full md:py-12 lg:py-12 md:px-6 lg:px-8">
          <div className="w-full md:max-w-4xl lg:max-w-5xl mx-auto">
            <img 
              src="/carer_img.png" 
              alt="가족을 위한 든든한 지원군 - 전문 간병인 보험으로 안심을 선물하세요" 
              className="w-full h-auto object-cover md:rounded-2xl md:shadow-xl"
            />
          </div>
        </div>

        {/* 간병인보험 정보 섹션 */}
        <section className="w-full bg-white py-10 sm:py-6 md:py-12 lg:py-12">
          <div className="max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
{/* 
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">간병인보험이 필요한 이유</h2>
              <p className="text-gray-600 mb-2">실비보험으로는 해결할 수 없는 간병비 부담을 덜어드립니다</p>
            </div>
*/}
            
            {/* 간병인보험 상세 정보 */}
            <div className="bg-pink-50 rounded-xl p-6 mb-8 border-2 border-pink-200">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">🏥 간병인사용일당</h3>
                <p className="text-gray-600 mb-2">질병이나 상해 사고로 인하여 간병이 필요한 상황이 발생했을 때, 간병인을 먼저 고용하고 보험사에 청구하여 보상받는 보험입니다.</p>
                <p className="text-pink-600 font-medium">질병이나 상해 사고로 인하여 간병이 필요한 상황이 발생했을 때, 간병인을 먼저 고용하고 보험사에 청구하여 보상받는 보험입니다.</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg border-2 border-red-200">
                  <div className="text-center mb-3">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">👨‍⚕️</span>
                    </div>
                    <h4 className="font-bold text-red-600 text-lg">가족간병</h4>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="mb-2">가족이 직접 간병하는 경우에도 보험금 지급</p>
                    <p className="text-xs text-gray-500">* 해당 내용은 보험사별, 상품별 상이할 수 있습니다.</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
                  <div className="text-center mb-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">📋</span>
                    </div>
                    <h4 className="font-bold text-gray-600 text-lg">청구 방식</h4>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="mb-2">간병서비스 이용 후 영수증 등을 제출하여 보상</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
                  <div className="text-center mb-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">💰</span>
                    </div>
                    <h4 className="font-bold text-gray-600 text-lg">보장내용</h4>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="mb-1">간병인사용일당<span className="text-xs">(요양병원제외)</span> <span className="font-semibold text-red-600">15~20만원</span></p>
                    <p className="mb-1">요양병원 <span className="font-semibold text-orange-600">5~6만원</span></p>
                    <p className="mb-1">간호간병통합서비스병실 <span className="font-semibold text-purple-600">7만원</span></p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border-2 border-pink-300">
                <div className="text-center">
                  <h4 className="font-bold text-pink-600 mb-2">⭐ 핵심 포인트</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="text-left">
                      <p className="text-gray-700">✓ <span className="font-semibold">가족간병시에도 보험금 지급</span></p>
                      <p className="text-gray-700">✓ <span className="font-semibold">실손보험 보완</span> 역할</p>
                    </div>
                    <div className="text-left">
                      <p className="text-gray-700">✓ <span className="font-semibold">하루 15~20만원</span> 보장</p>
                      <p className="text-gray-700">✓ <span className="font-semibold">영수증 제출</span>로 간편 청구</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 감정적 어필 섹션 */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 md:p-8 mb-8 border border-orange-100">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">💝 소중한 가족을 위한 준비</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  "언젠가는 다가올 그 순간을 위해<br />
                  <span className="font-semibold text-orange-600">미리 준비하는 것이 진정한 사랑</span>입니다"
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">😔</span>
                    </div>
                    <h4 className="font-bold text-gray-800">준비하지 않았을 때</h4>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• 갑작스런 간병비 부담으로 가족 모두 힘들어해요</p>
                    <p>• 직장을 그만두고 간병해야 하는 상황</p>
                    <p>• 경제적 부담으로 인한 가족 갈등</p>
                    <p>• 충분한 간병 서비스를 받지 못하는 안타까움</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-5 shadow-sm border-2 border-green-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">😊</span>
                    </div>
                    <h4 className="font-bold text-gray-800">미리 준비했을 때</h4>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• 경제적 걱정 없이 최선의 간병 서비스 제공</p>
                    <p>• 가족들이 각자의 일상을 유지할 수 있어요</p>
                    <p>• 전문 간병인을 통한 체계적인 돌봄</p>
                    <p>• 온 가족이 안심하고 생활할 수 있어요</p>
                  </div>
                </div>
              </div>

              <div className="text-center bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-2xl">💚</span>
                  <p className="font-bold text-lg">가족을 지키는 현명한 선택</p>
                </div>
                <p className="text-sm text-green-100">지금 준비하면 든든한 미래가 보장됩니다</p>
              </div>
            </div>

            {/* 이런 분에게 필요 */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">이런 분에게 간병인보험이 필요합니다</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-left">
                  <div className="font-semibold text-blue-700 mb-2">👥 맞벌이 가정</div>
                  <p className="text-sm text-gray-600">직장 생활 중 가족 간병이 어려운 경우</p>
                  <p className="text-xs text-blue-600 mt-1">"일도 놓칠 수 없고, 가족도 돌봐야 하는 딜레마"</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-left">
                  <div className="font-semibold text-green-700 mb-2">👤 외동 자녀</div>
                  <p className="text-sm text-gray-600">혼자서 부모님을 돌봐야 하는 경우</p>
                  <p className="text-xs text-green-600 mt-1">"모든 책임이 나에게만 있다는 부담감"</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-left">
                  <div className="font-semibold text-purple-700 mb-2">👴 50대 이상</div>
                  <p className="text-sm text-gray-600">전문 간병인 도움이 필요한 연령대</p>
                  <p className="text-xs text-purple-600 mt-1">"자녀에게 부담 주기 싫은 마음"</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg text-left">
                  <div className="font-semibold text-orange-700 mb-2">💼 자영업자</div>
                  <p className="text-sm text-gray-600">사업 운영으로 간병이 어려운 경우</p>
                  <p className="text-xs text-orange-600 mt-1">"사업도 가족도 모두 지켜야 하는 현실"</p>
                </div>
              </div>
            </div>

            {/* 고객 후기 섹션 */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-8 border border-green-200">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">💬 실제 고객 후기</h3>
                <p className="text-gray-600">간병인보험으로 도움을 받으신 분들의 이야기</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">👩</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">김○○님 (50대 직장인)</h4>
                      <p className="text-xs text-gray-500">어머니 뇌졸중으로 간병보험 이용</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 leading-relaxed">
                    "갑자기 어머니가 쓰러지셨는데, 다행히 간병보험이 있어서 경제적 걱정 없이 전문 간병인을 모실 수 있었어요. 직장을 그만두지 않고도 어머니를 잘 돌볼 수 있어 정말 감사해요."
                  </div>
                  <div className="mt-3 flex justify-end">
                    <div className="flex text-yellow-400">
                      ⭐⭐⭐⭐⭐
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">👨</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">박○○님 (40대 자영업자)</h4>
                      <p className="text-xs text-gray-500">아버지 치매로 간병보험 이용</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 leading-relaxed">
                    "사업도 운영해야 하고 아버지 간병도 해야 하는 상황이었는데, 간병보험 덕분에 전문적인 케어를 받을 수 있었어요. 가족간병도 보험금이 나와서 큰 도움이 되었습니다."
                  </div>
                  <div className="mt-3 flex justify-end">
                    <div className="flex text-yellow-400">
                      ⭐⭐⭐⭐⭐
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <p className="text-xs text-gray-500">* 개인정보 보호를 위해 이름은 일부만 표기했습니다</p>
              </div>
            </div>

            {/* 긴급감 조성 섹션 */}
            <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl p-6 mb-8 border border-red-200">
              <div className="text-center">
                <h3 className="text-xl font-bold text-red-700 mb-4">⏰ 지금 바로 준비하세요!</h3>
                <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                  <p className="text-gray-800 leading-relaxed mb-2">
                    <span className="font-bold text-red-600">갑작스러운 간병 상황</span>은 언제든 찾아올 수 있습니다.
                  </p>
                  <p className="text-sm text-gray-600">
                    미리 준비하지 않으면 <span className="font-semibold">월 360만원</span>의 간병비 부담이 현실이 됩니다.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <button 
                    onClick={() => {
                      const consultationBox = document.getElementById('consultation-box');
                      if (consultationBox) {
                        consultationBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }}
                    className="bg-red-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-red-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    🚀 지금 무료 상담받기
                  </button>
                  <span className="text-sm text-gray-600">간단한 정보 입력으로 맞춤 설계</span>
                </div>
              </div>
            </div>

            {/* FAQ 섹션 */}
            <div className="bg-gray-50 rounded-xl p-6 mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">자주 묻는 질문 (FAQ)</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="font-semibold text-blue-600 mb-2">Q. 실비보험 있는데 꼭 필요해요?</div>
                  <p className="text-sm text-gray-600">네. 실비보험은 의료비만 보장하고 간병비는 보장하지 않습니다. 간병인보험은 실비보험으로 해결할 수 없는 간병비를 별도로 보장합니다.</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="font-semibold text-blue-600 mb-2">Q. 보험료 많이 비싸요?</div>
                  <p className="text-sm text-gray-600">대부분 월 2~5만원 수준으로 가입 가능합니다. 하루 간병비 12만원에 비해 매우 경제적입니다.</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="font-semibold text-blue-600 mb-2">Q. 기존 보험 있어도 상담 가능해요?</div>
                  <p className="text-sm text-gray-600">네. 기존 보험과의 중복·부족 여부를 무료로 점검해드리고, 최적의 보장 설계를 도와드립니다.</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="font-semibold text-blue-600 mb-2">Q. 가족이 간병해도 보험금 받나요?</div>
                  <p className="text-sm text-gray-600">간병비보험의 경우 가족간병시에도 보험금을 지급합니다. 다만 보험사별로 약관이 다르니 상담 시 확인해드립니다.</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="font-semibold text-blue-600 mb-2">Q. 치매보험과 간병보험의 차이점은?</div>
                  <p className="text-sm text-gray-600">치매보험은 치매 진단 시 진단비를 지급하고, 간병보험은 실제 간병서비스 이용 시 간병비를 지급합니다. 두 보험 모두 상호 보완적 역할을 합니다.</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="font-semibold text-blue-600 mb-2">Q. 장기요양등급 판정 전에도 보장받나요?</div>
                  <p className="text-sm text-gray-600">네. 간병보험은 장기요양등급 판정과 관계없이 의사의 간병 필요 소견서만으로도 보험금을 받을 수 있습니다.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 유의사항 박스 */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl mb-2 md:mb-4 lg:mb-6 mt-6 md:mt-8 lg:mt-10 px-6 py-0 text-xs md:text-sm text-gray-800">
            <div className="mb-1 font-bold">[ 유의사항 ]</div>
            <div className="text-red-500">※ 본 안내물은 지면관계상 상품의 개략적인 내용을 요약·정리한 것이오니 가입 전에 상품의 약관 및 상품설명서를 자세히 읽어보시기 바랍니다.</div>
            <div>※ 가입 시 보험계약의 기본사항(보험 상품명, 보험기간, 보험료, 보험료 납입기간 등)을 반드시 확인하시기 바랍니다.</div>
            <div>※ 피보험자의 과거 건강상태, 직업 등 계약 전 알릴 의무를 사실대로 고지하지 않으면 보험금 지급이 제한되거나 계약이 해지될 수 있습니다.</div>
            <div>※ 본 상품은 간병비를 보장하는 보장성보험으로, 저축성보험과 비교하여 위험보험료 및 사업비가 더 많이 차감되므로 저축 목적에는 적합하지 않습니다.</div>
            <div>※ 해약환급금은 경과기간 및 해약공제에 따라 납입보험료보다 적거나 없을 수 있습니다.</div>
            <div>※ 이 보험계약은 예금자보호법에 따라 해약환급금(또는 만기 시 보험금)에 기타지급금을 합한 금액이 1인당 "1억원까지"(본 보험회사의 여타 보호상품과 합산) 보호됩니다.</div>
            <div>※ 이와 별도로 본 보험회사 보호상품의 사고보험금을 합산한 금액이 1인당 "1억원까지" 보호됩니다. 단, 보험계약자 및 보험료 납부자가 법인이면 보호되지 않습니다.</div>
            <div>※ 본 상품은 무배당 상품으로, 배당금이 지급되지 않습니다.</div>
          </div>
        </div>
        {/* 구분선 */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl px-6">
            <hr className="border-gray-300 my-4" />
          </div>
        </div>
        {/* 필수안내사항 박스 */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl mb-2 md:mb-4 lg:mb-6 mt-2 md:mt-4 lg:mt-6 px-6 py-0 text-xs md:text-sm text-gray-800">
            <div className="mb-1 font-bold">[ 필수안내사항 ]</div>
            <div>※ 본 광고는 심의기준을 준수하였으며, 유효기간은 심의일로부터 1년입니다.</div>
            <div className="text-red-500">※ 본계약은 기존 보험계약을 해지하고 새로운 보험계약을 체결하는 과정에서</div>
            <div className="text-red-500">① 진행이력, 연령등에 따라 가입이 거절되거나 보험료가 인상될 수 있습니다.</div>
            <div className="text-red-500">② 가입 상품에 따라 새로운 면책기간 적용 및 보장 제한 등 기타 불이익이 발생할 수 있습니다.</div>
            <div>※ ㈜메타리치 심의필 25120102호 (2025.12.17~2026.12.16)</div>
          </div>
        </div>
        
        <Footer />
        
        {/* 오른쪽 하단 플로팅 액션 버튼들 - 모달이 열렸을 때는 숨김 */}
        {!isModalOpen && !showPrivacy && !showNotice && !isInputFocused && !isHeaderMenuOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 flex flex-col gap-2 sm:gap-3 z-50">
          {/* 상담신청 버튼 */}
          <button
            onClick={() => {
              const consultationBox = document.getElementById('consultation-box');
              if (consultationBox) {
                consultationBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }}
            className="bg-white text-gray-600 rounded-2xl px-2 py-2 sm:px-3 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-gray-50 border border-gray-200 flex flex-col items-center gap-1"
            aria-label="상담신청"
          >
            <span className="text-xs font-semibold">상담</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
          {/* 카톡상담 버튼 */}
          <button 
            onClick={() => window.open('https://pf.kakao.com/_lrubxb/chat', '_blank')}
            className="bg-white text-gray-600 rounded-2xl px-2 py-2 sm:px-3 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-gray-50 border border-gray-200 flex flex-col items-center gap-1"
            aria-label="카톡상담"
          >
            <span className="text-xs font-semibold">카톡</span>
            <img src="/kakaotalk.png" alt="카톡상담" className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          {/* 맨 위로 버튼 */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-white text-gray-600 rounded-full p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-gray-50 border border-gray-200"
            aria-label="맨 위로"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </button>
        </div>
        )}
      </div>
    </>
  );
}